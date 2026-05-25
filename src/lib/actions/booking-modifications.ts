"use server";

import { db } from "@/lib/db";
import { bookingModifications, bookings, bookingAddons } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function modifyBookingDates(input: {
  bookingId: string;
  newCheckIn: string;
  newCheckOut: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [booking] = await db
    .select()
    .from(bookings)
    .where(and(eq(bookings.id, input.bookingId), eq(bookings.userId, session.user.id)))
    .limit(1);

  if (!booking) return { error: "Booking not found." };

  const oldNights = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const newNights = Math.ceil(
    (new Date(input.newCheckOut).getTime() - new Date(input.newCheckIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (newNights <= 0) return { error: "Invalid date range." };

  const nightlyRate = parseFloat(booking.subtotal || "0") / oldNights;
  const newSubtotal = nightlyRate * newNights;
  const priceDiff = newSubtotal - parseFloat(booking.subtotal || "0");

  // Record modification
  await db.insert(bookingModifications).values({
    bookingId: input.bookingId,
    fieldChanged: "dates",
    oldValue: { checkIn: booking.checkIn, checkOut: booking.checkOut },
    newValue: { checkIn: input.newCheckIn, checkOut: input.newCheckOut },
    priceDiff: priceDiff.toFixed(2),
    modifiedBy: session.user.id,
  });

  // Update booking
  const taxes = Math.round(newSubtotal * 0.12 * 100) / 100;
  const fees = 25;
  const newTotal = newSubtotal + taxes + fees;

  await db
    .update(bookings)
    .set({
      checkIn: input.newCheckIn,
      checkOut: input.newCheckOut,
      subtotal: newSubtotal.toFixed(2),
      taxes: taxes.toFixed(2),
      total: newTotal.toFixed(2),
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, input.bookingId));

  return { success: true, priceDiff };
}

export async function addBookingAddon(input: {
  bookingId: string;
  addonType: string;
  name: string;
  price: number;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [addon] = await db
    .insert(bookingAddons)
    .values({
      bookingId: input.bookingId,
      addonType: input.addonType,
      name: input.name,
      price: input.price.toFixed(2),
      quantity: 1,
    })
    .returning({ id: bookingAddons.id });

  // Update booking total
  const [booking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, input.bookingId))
    .limit(1);

  if (booking) {
    const newTotal = parseFloat(booking.total || "0") + input.price;
    await db
      .update(bookings)
      .set({ total: newTotal.toFixed(2), updatedAt: new Date() })
      .where(eq(bookings.id, input.bookingId));
  }

  return { addonId: addon.id };
}

export async function removeBookingAddon(addonId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [addon] = await db
    .select()
    .from(bookingAddons)
    .where(eq(bookingAddons.id, addonId))
    .limit(1);

  if (!addon) return { error: "Add-on not found." };

  // Update booking total
  const [booking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, addon.bookingId))
    .limit(1);

  if (booking) {
    const newTotal = parseFloat(booking.total || "0") - parseFloat(addon.price);
    await db
      .update(bookings)
      .set({ total: newTotal.toFixed(2), updatedAt: new Date() })
      .where(eq(bookings.id, addon.bookingId));
  }

  await db.delete(bookingAddons).where(eq(bookingAddons.id, addonId));

  return { success: true };
}
