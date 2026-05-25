"use server";

import { db } from "@/lib/db";
import {
  properties,
  propertyImages,
  propertyAmenities,
  roomTypes,
  roomInventory,
  bookings,
  payments,
} from "@/lib/db/schema";
import { eq, and, gte, lt, ilike, or, sql, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { generateConfirmationNo } from "@/lib/utils";
// ── Search Properties ──

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  propertyType?: string;
  propertyTypes?: string[];
  amenities?: string[];
  starRatings?: number[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
};

export type PropertyResult = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  propertyType: string;
  starRating: number | null;
  city: string;
  country: string;
  avgRating: string | null;
  reviewCount: number;
  cancellationPolicy: string;
  imageUrl: string | null;
  lowestRate: number | null;
  amenities: string[];
};

export async function searchProperties(
  params: SearchParams
): Promise<PropertyResult[]> {
  const { destination, checkIn, checkOut, guests, propertyType, propertyTypes, amenities, starRatings, minPrice, maxPrice, sortBy } = params;

  // Base query for active properties
  const conditions = [eq(properties.status, "active")];

  if (destination) {
    conditions.push(
      or(
        ilike(properties.city, `%${destination}%`),
        ilike(properties.country, `%${destination}%`),
        ilike(properties.name, `%${destination}%`)
      )!
    );
  }

  if (propertyType) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conditions.push(eq(properties.propertyType, propertyType as any));
  }

  if (propertyTypes && propertyTypes.length > 0) {
    conditions.push(
      or(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...propertyTypes.map((t) => eq(properties.propertyType, t as any))
      )!
    );
  }

  if (starRatings && starRatings.length > 0) {
    conditions.push(
      or(
        ...starRatings.map((r) => eq(properties.starRating, r))
      )!
    );
  }

  const allProperties = await db
    .select()
    .from(properties)
    .where(and(...conditions))
    .orderBy(desc(properties.avgRating));

  const results: PropertyResult[] = [];

  for (const property of allProperties) {
    // Get primary image
    const [primaryImage] = await db
      .select({ url: propertyImages.url })
      .from(propertyImages)
      .where(
        and(
          eq(propertyImages.propertyId, property.id),
          eq(propertyImages.isPrimary, true)
        )
      )
      .limit(1);

    // If no primary image, get first image
    const imageUrl = primaryImage?.url || null;

    // Get amenities
    const propAmenities = await db
      .select({ amenity: propertyAmenities.amenity })
      .from(propertyAmenities)
      .where(eq(propertyAmenities.propertyId, property.id));

    // Get room types for this property
    const rooms = await db
      .select()
      .from(roomTypes)
      .where(eq(roomTypes.propertyId, property.id));

    if (rooms.length === 0) continue;

    // Filter by guest capacity
    const suitableRooms = guests
      ? rooms.filter((r) => r.maxOccupancy >= guests)
      : rooms;

    if (guests && suitableRooms.length === 0) continue;

    // Check availability if dates provided
    let availableRate: number | null = null;

    if (checkIn && checkOut) {
      for (const room of suitableRooms) {
        const inventory = await db
          .select()
          .from(roomInventory)
          .where(
            and(
              eq(roomInventory.roomTypeId, room.id),
              gte(roomInventory.date, checkIn),
              lt(roomInventory.date, checkOut),
              eq(roomInventory.status, "available")
            )
          );

        const nightsNeeded = Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        );

        // Check all nights have availability
        const allAvailable =
          inventory.length >= nightsNeeded &&
          inventory.every((inv) => inv.totalRooms - inv.bookedRooms > 0);

        if (allAvailable) {
          const avgRate =
            inventory.reduce((sum, inv) => sum + parseFloat(inv.rate), 0) /
            inventory.length;
          if (availableRate === null || avgRate < availableRate) {
            availableRate = avgRate;
          }
        }
      }

      // If dates specified but no availability, skip this property
      if (availableRate === null) continue;
    } else {
      // No dates — show base rate
      const rates = suitableRooms.map((r) => parseFloat(r.baseRate));
      availableRate = Math.min(...rates);
    }

    // Filter by price range
    if (minPrice && availableRate < minPrice) continue;
    if (maxPrice && availableRate > maxPrice) continue;

    const amenityList = propAmenities.map((a) => a.amenity);

    // Filter by amenities
    if (amenities && amenities.length > 0) {
      const hasAll = amenities.every((a) => (amenityList as string[]).includes(a));
      if (!hasAll) continue;
    }

    results.push({
      id: property.id,
      name: property.name,
      slug: property.slug,
      description: property.description,
      propertyType: property.propertyType,
      starRating: property.starRating,
      city: property.city,
      country: property.country,
      avgRating: property.avgRating,
      reviewCount: property.reviewCount,
      cancellationPolicy: property.cancellationPolicy,
      imageUrl,
      lowestRate: availableRate,
      amenities: amenityList,
    });
  }

  // Sort results
  if (sortBy === "price_asc") {
    results.sort((a, b) => (a.lowestRate || 0) - (b.lowestRate || 0));
  } else if (sortBy === "price_desc") {
    results.sort((a, b) => (b.lowestRate || 0) - (a.lowestRate || 0));
  } else if (sortBy === "rating") {
    results.sort((a, b) => parseFloat(b.avgRating || "0") - parseFloat(a.avgRating || "0"));
  }

  return results;
}

// ── Check Availability ──

export type AvailabilityResult = {
  roomTypeId: string;
  roomTypeName: string;
  category: string;
  description: string | null;
  maxOccupancy: number;
  bedConfig: { type: string; count: number }[] | null;
  sizeSqft: number | null;
  amenities: string[] | null;
  available: boolean;
  nightlyRates: { date: string; rate: number }[];
  totalPrice: number;
  avgRate: number;
};

export async function checkAvailability(
  propertyId: string,
  checkIn: string,
  checkOut: string,
  guests: number
): Promise<AvailabilityResult[]> {
  const rooms = await db
    .select()
    .from(roomTypes)
    .where(eq(roomTypes.propertyId, propertyId));

  const nightsNeeded = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (nightsNeeded <= 0) return [];

  const results: AvailabilityResult[] = [];

  for (const room of rooms) {
    const inventory = await db
      .select()
      .from(roomInventory)
      .where(
        and(
          eq(roomInventory.roomTypeId, room.id),
          gte(roomInventory.date, checkIn),
          lt(roomInventory.date, checkOut)
        )
      )
      .orderBy(roomInventory.date);

    const allAvailable =
      inventory.length >= nightsNeeded &&
      inventory.every(
        (inv) =>
          inv.status === "available" && inv.totalRooms - inv.bookedRooms > 0
      );

    const nightlyRates = inventory.map((inv) => ({
      date: inv.date,
      rate: parseFloat(inv.rate),
    }));

    const totalPrice = nightlyRates.reduce((sum, nr) => sum + nr.rate, 0);
    const avgRate = nightlyRates.length > 0 ? totalPrice / nightlyRates.length : parseFloat(room.baseRate);

    results.push({
      roomTypeId: room.id,
      roomTypeName: room.name,
      category: room.category,
      description: room.description,
      maxOccupancy: room.maxOccupancy,
      bedConfig: room.bedConfig,
      sizeSqft: room.sizeSqft,
      amenities: room.amenities,
      available: allAvailable && room.maxOccupancy >= guests,
      nightlyRates,
      totalPrice: allAvailable ? totalPrice : nightsNeeded * parseFloat(room.baseRate),
      avgRate,
    });
  }

  // Sort: available first, then by price
  results.sort((a, b) => {
    if (a.available && !b.available) return -1;
    if (!a.available && b.available) return 1;
    return a.totalPrice - b.totalPrice;
  });

  return results;
}

// ── Create Booking ──

export type CreateBookingInput = {
  propertyId: string;
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
};

export async function createBooking(input: CreateBookingInput) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to book." };
  }

  const {
    propertyId,
    roomTypeId,
    checkIn,
    checkOut,
    adults,
    children,
    guestName,
    guestEmail,
    guestPhone,
    specialRequests,
  } = input;

  // Validate dates
  const nightsNeeded = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  if (nightsNeeded <= 0) {
    return { error: "Invalid date range." };
  }

  // Check availability one more time
  const inventory = await db
    .select()
    .from(roomInventory)
    .where(
      and(
        eq(roomInventory.roomTypeId, roomTypeId),
        gte(roomInventory.date, checkIn),
        lt(roomInventory.date, checkOut),
        eq(roomInventory.status, "available")
      )
    )
    .orderBy(roomInventory.date);

  const allAvailable =
    inventory.length >= nightsNeeded &&
    inventory.every((inv) => inv.totalRooms - inv.bookedRooms > 0);

  if (!allAvailable) {
    return { error: "Room is no longer available for the selected dates." };
  }

  // Get property for cancellation policy
  const [property] = await db
    .select()
    .from(properties)
    .where(eq(properties.id, propertyId))
    .limit(1);

  if (!property) {
    return { error: "Property not found." };
  }

  // Calculate pricing
  const nightlyRates = inventory.map((inv) => ({
    date: inv.date,
    rate: parseFloat(inv.rate),
  }));
  const subtotal = nightlyRates.reduce((sum, nr) => sum + nr.rate, 0);
  const taxRate = 0.12; // 12% taxes
  const taxes = Math.round(subtotal * taxRate * 100) / 100;
  const fees = 25; // flat service fee
  const total = subtotal + taxes + fees;

  const confirmationNo = generateConfirmationNo();

  // Create booking
  const [booking] = await db
    .insert(bookings)
    .values({
      confirmationNo,
      userId: session.user.id,
      propertyId,
      roomTypeId,
      status: "confirmed",
      checkIn,
      checkOut,
      adults,
      children,
      guestName,
      guestEmail,
      guestPhone: guestPhone || null,
      specialRequests: specialRequests || null,
      nightlyRates,
      subtotal: subtotal.toFixed(2),
      taxes: taxes.toFixed(2),
      fees: fees.toFixed(2),
      discount: "0.00",
      total: total.toFixed(2),
      currency: "USD",
      cancellationPolicy: property.cancellationPolicy,
    })
    .returning({ id: bookings.id });

  // Update inventory (increment booked rooms)
  for (const inv of inventory) {
    await db
      .update(roomInventory)
      .set({ bookedRooms: inv.bookedRooms + 1 })
      .where(eq(roomInventory.id, inv.id));
  }

  // Create payment record (simulated)
  await db.insert(payments).values({
    bookingId: booking.id,
    amount: total.toFixed(2),
    currency: "USD",
    status: "captured",
    paymentMethod: "credit_card",
    cardBrand: "Visa",
    cardLast4: "4242",
    stripePaymentIntentId: `pi_demo_${Date.now()}`,
  });

  return { bookingId: booking.id, confirmationNo };
}

// ── Cancel Booking ──

export async function cancelBooking(bookingId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in." };
  }

  const [booking] = await db
    .select()
    .from(bookings)
    .where(
      and(eq(bookings.id, bookingId), eq(bookings.userId, session.user.id))
    )
    .limit(1);

  if (!booking) {
    return { error: "Booking not found." };
  }

  if (booking.status === "cancelled") {
    return { error: "Booking is already cancelled." };
  }

  if (booking.status === "checked_in" || booking.status === "checked_out") {
    return { error: "Cannot cancel a booking that has already been checked in." };
  }

  // Cancel the booking
  await db
    .update(bookings)
    .set({
      status: "cancelled",
      cancelledAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, bookingId));

  // Release inventory
  const nightlyRates = booking.nightlyRates as { date: string; rate: number }[] | null;
  if (nightlyRates) {
    for (const nr of nightlyRates) {
      await db
        .update(roomInventory)
        .set({
          bookedRooms: sql`GREATEST(${roomInventory.bookedRooms} - 1, 0)`,
        })
        .where(
          and(
            eq(roomInventory.roomTypeId, booking.roomTypeId),
            eq(roomInventory.date, nr.date)
          )
        );
    }
  }

  // Calculate refund based on policy
  const total = parseFloat(booking.total || "0");
  let refundAmount = 0;
  const daysUntilCheckIn = Math.ceil(
    (new Date(booking.checkIn).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  switch (booking.cancellationPolicy) {
    case "free":
      refundAmount = daysUntilCheckIn >= 1 ? total : 0;
      break;
    case "moderate":
      refundAmount = daysUntilCheckIn >= 5 ? total : total * 0.5;
      break;
    case "strict":
      refundAmount = daysUntilCheckIn >= 7 ? total * 0.5 : 0;
      break;
    case "non_refundable":
      refundAmount = 0;
      break;
    default:
      refundAmount = total;
  }

  // Update payment to refunded if applicable
  if (refundAmount > 0) {
    const [payment] = await db
      .select()
      .from(payments)
      .where(eq(payments.bookingId, bookingId))
      .limit(1);

    if (payment) {
      await db
        .update(payments)
        .set({
          status: refundAmount === total ? "refunded" : "partially_refunded",
        })
        .where(eq(payments.id, payment.id));
    }
  }

  return { success: true, refundAmount };
}
