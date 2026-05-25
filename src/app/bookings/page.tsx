import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { db } from "@/lib/db";
import { bookings, properties, propertyImages, roomTypes } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BookingsList } from "@/components/booking/bookings-list";

export const metadata = {
  title: "My Trips — Bunkly",
};

export default async function BookingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/bookings");
  }

  const today = new Date().toISOString().split("T")[0];

  const userBookings = await db
    .select({
      id: bookings.id,
      confirmationNo: bookings.confirmationNo,
      status: bookings.status,
      checkIn: bookings.checkIn,
      checkOut: bookings.checkOut,
      adults: bookings.adults,
      children: bookings.children,
      guestName: bookings.guestName,
      total: bookings.total,
      currency: bookings.currency,
      specialRequests: bookings.specialRequests,
      createdAt: bookings.createdAt,
      propertyName: properties.name,
      propertySlug: properties.slug,
      propertyCity: properties.city,
      propertyCountry: properties.country,
      propertyType: properties.propertyType,
      roomTypeName: roomTypes.name,
      roomCategory: roomTypes.category,
    })
    .from(bookings)
    .innerJoin(properties, eq(bookings.propertyId, properties.id))
    .innerJoin(roomTypes, eq(bookings.roomTypeId, roomTypes.id))
    .where(eq(bookings.userId, session.user.id))
    .orderBy(desc(bookings.checkIn));

  // Fetch primary images for all properties in the bookings
  const images = await db
    .select({
      propertyId: propertyImages.propertyId,
      url: propertyImages.url,
      altText: propertyImages.altText,
    })
    .from(propertyImages)
    .innerJoin(properties, eq(propertyImages.propertyId, properties.id))
    .where(eq(propertyImages.isPrimary, true));

  const imageMap = new Map(
    images.map((img) => [img.propertyId, img.url])
  );

  const enrichedBookings = userBookings.map((b) => ({
    ...b,
    imageUrl: imageMap.get(b.propertySlug) || null,
  }));

  const upcoming = enrichedBookings.filter(
    (b) => b.checkIn >= today && b.status !== "cancelled" && b.status !== "checked_out"
  );
  const past = enrichedBookings.filter(
    (b) => b.checkIn < today || b.status === "checked_out"
  );
  const cancelled = enrichedBookings.filter((b) => b.status === "cancelled");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h1
              className="text-3xl font-bold text-foreground"
              data-testid="bookings-title"
            >
              My Trips
            </h1>
            <p className="mt-1 text-muted" data-testid="bookings-subtitle">
              {upcoming.length} upcoming · {past.length} past · {cancelled.length} cancelled
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <BookingsList
            upcoming={upcoming}
            past={past}
            cancelled={cancelled}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
