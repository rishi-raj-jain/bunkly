import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CheckoutForm } from "@/components/booking/checkout-form";
import { checkAvailability } from "@/lib/actions/booking";
import { db } from "@/lib/db";
import { properties, propertyImages } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";

export const metadata = {
  title: "Checkout — Bunkly",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    const params = await searchParams;
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    redirect(`/login?callbackUrl=/checkout?${encodeURIComponent(qs)}`);
  }

  const params = await searchParams;
  const { propertyId, roomTypeId, checkIn, checkOut, guests } = params;

  if (!propertyId || !roomTypeId || !checkIn || !checkOut) {
    redirect("/search");
  }

  // Get property info
  const [property] = await db
    .select()
    .from(properties)
    .where(eq(properties.id, propertyId))
    .limit(1);

  if (!property) notFound();

  // Get property image
  const [primaryImage] = await db
    .select({ url: propertyImages.url })
    .from(propertyImages)
    .where(
      and(
        eq(propertyImages.propertyId, propertyId),
        eq(propertyImages.isPrimary, true)
      )
    )
    .limit(1);

  // Get availability to get pricing
  const guestsNum = parseInt(guests || "2");
  const availability = await checkAvailability(
    propertyId,
    checkIn,
    checkOut,
    guestsNum
  );

  const selectedRoom = availability.find((r) => r.roomTypeId === roomTypeId);
  if (!selectedRoom || !selectedRoom.available) {
    redirect(`/properties/${property.slug}?error=unavailable`);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <CheckoutForm
          propertyId={propertyId}
          propertyName={property.name}
          propertySlug={property.slug}
          propertyCity={property.city}
          propertyCountry={property.country}
          propertyImage={primaryImage?.url || null}
          cancellationPolicy={property.cancellationPolicy}
          checkInTime={property.checkInTime}
          checkOutTime={property.checkOutTime}
          roomTypeId={roomTypeId}
          roomTypeName={selectedRoom.roomTypeName}
          roomCategory={selectedRoom.category}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guestsNum}
          nightlyRates={selectedRoom.nightlyRates}
          totalPrice={selectedRoom.totalPrice}
          userName={session.user.name || null}
          userEmail={session.user.email || null}
        />
      </main>
      <Footer />
    </div>
  );
}
