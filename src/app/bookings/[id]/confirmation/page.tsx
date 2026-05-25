import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { bookings, properties, roomTypes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Clock,
  Shield,
  Mail,
} from "lucide-react";

export const metadata = {
  title: "Booking Confirmed — Bunkly",
};

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const [booking] = await db
    .select({
      id: bookings.id,
      confirmationNo: bookings.confirmationNo,
      status: bookings.status,
      checkIn: bookings.checkIn,
      checkOut: bookings.checkOut,
      adults: bookings.adults,
      children: bookings.children,
      guestName: bookings.guestName,
      guestEmail: bookings.guestEmail,
      guestPhone: bookings.guestPhone,
      specialRequests: bookings.specialRequests,
      subtotal: bookings.subtotal,
      taxes: bookings.taxes,
      fees: bookings.fees,
      total: bookings.total,
      currency: bookings.currency,
      cancellationPolicy: bookings.cancellationPolicy,
      createdAt: bookings.createdAt,
      propertyName: properties.name,
      propertySlug: properties.slug,
      propertyCity: properties.city,
      propertyCountry: properties.country,
      propertyAddress: properties.addressLine1,
      checkInTime: properties.checkInTime,
      checkOutTime: properties.checkOutTime,
      roomTypeName: roomTypes.name,
      roomCategory: roomTypes.category,
    })
    .from(bookings)
    .innerJoin(properties, eq(bookings.propertyId, properties.id))
    .innerJoin(roomTypes, eq(bookings.roomTypeId, roomTypes.id))
    .where(eq(bookings.id, id))
    .limit(1);

  if (!booking || booking.guestEmail !== session.user.email) {
    notFound();
  }

  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const cur = booking.currency || "USD";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Success Banner */}
          <div className="text-center" data-testid="confirmation-success">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-foreground">
              Booking Confirmed!
            </h1>
            <p className="mt-2 text-muted">
              Your reservation at {booking.propertyName} has been confirmed.
            </p>
          </div>

          {/* Confirmation Number */}
          <div
            className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6 text-center"
            data-testid="confirmation-number"
          >
            <p className="text-sm text-muted">Confirmation Number</p>
            <p className="mt-1 text-3xl font-bold tracking-wider text-accent">
              {booking.confirmationNo}
            </p>
            <p className="mt-2 text-sm text-muted">
              A confirmation email has been sent to {booking.guestEmail}
            </p>
          </div>

          {/* Booking Details */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property */}
              <div>
                <h3 className="font-semibold text-foreground">
                  {booking.propertyName}
                </h3>
                <p className="flex items-center gap-1 text-sm text-muted">
                  <MapPin className="h-3.5 w-3.5" />
                  {booking.propertyAddress && `${booking.propertyAddress}, `}
                  {booking.propertyCity}, {booking.propertyCountry}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="secondary" className="capitalize text-xs">
                    {booking.roomCategory}
                  </Badge>
                  <span className="text-sm text-foreground">
                    {booking.roomTypeName}
                  </span>
                </div>
              </div>

              {/* Dates */}
              <div className="grid gap-4 rounded-lg bg-secondary/50 p-4 sm:grid-cols-3">
                <div className="flex items-start gap-2">
                  <Calendar className="mt-0.5 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted">Check-in</p>
                    <p className="font-semibold text-foreground">
                      {formatDate(booking.checkIn)}
                    </p>
                    <p className="text-xs text-muted">
                      After {booking.checkInTime || "3:00 PM"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="mt-0.5 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted">Check-out</p>
                    <p className="font-semibold text-foreground">
                      {formatDate(booking.checkOut)}
                    </p>
                    <p className="text-xs text-muted">
                      Before {booking.checkOutTime || "11:00 AM"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted">Duration</p>
                    <p className="font-semibold text-foreground">
                      {nights} night{nights !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Guest Info */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted" />
                  <span className="text-foreground">
                    {booking.adults} adult{booking.adults !== 1 ? "s" : ""}
                    {booking.children
                      ? `, ${booking.children} child${booking.children !== 1 ? "ren" : ""}`
                      : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted" />
                  <span className="text-foreground">{booking.guestEmail}</span>
                </div>
              </div>

              {booking.specialRequests && (
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    Special Requests
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {booking.specialRequests}
                  </p>
                </div>
              )}

              {/* Price Summary */}
              <div className="space-y-2 border-t border-border pt-4 text-sm">
                {booking.subtotal && (
                  <div className="flex justify-between">
                    <span className="text-muted">
                      Room ({nights} night{nights !== 1 ? "s" : ""})
                    </span>
                    <span className="text-foreground">
                      {formatCurrency(parseFloat(booking.subtotal), cur)}
                    </span>
                  </div>
                )}
                {booking.taxes && parseFloat(booking.taxes) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">Taxes & fees</span>
                    <span className="text-foreground">
                      {formatCurrency(parseFloat(booking.taxes), cur)}
                    </span>
                  </div>
                )}
                {booking.fees && parseFloat(booking.fees) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">Service fee</span>
                    <span className="text-foreground">
                      {formatCurrency(parseFloat(booking.fees), cur)}
                    </span>
                  </div>
                )}
                <hr className="border-border" />
                <div className="flex justify-between text-base font-bold">
                  <span className="text-foreground">Total Paid</span>
                  <span className="text-accent">
                    {booking.total
                      ? formatCurrency(parseFloat(booking.total), cur)
                      : "—"}
                  </span>
                </div>
              </div>

              {/* Cancellation */}
              <div className="flex items-start gap-2 rounded-lg border border-border p-3">
                <Shield className="mt-0.5 h-4 w-4 text-accent" />
                <div>
                  <p className="text-sm font-medium capitalize text-foreground">
                    {(booking.cancellationPolicy || "moderate").replace("_", " ")}{" "}
                    cancellation
                  </p>
                  <p className="text-xs text-muted">
                    {booking.cancellationPolicy === "free"
                      ? "Free cancellation up to 24 hours before check-in."
                      : booking.cancellationPolicy === "moderate"
                      ? "Free cancellation up to 5 days before check-in."
                      : booking.cancellationPolicy === "strict"
                      ? "50% refund up to 1 week before check-in."
                      : "This reservation is non-refundable."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/bookings/${booking.id}`} className="flex-1">
              <Button variant="accent" className="w-full" size="lg" data-testid="view-booking">
                View Booking Details
              </Button>
            </Link>
            <Link href="/bookings" className="flex-1">
              <Button variant="outline" className="w-full" size="lg" data-testid="view-all-trips">
                View All Trips
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
