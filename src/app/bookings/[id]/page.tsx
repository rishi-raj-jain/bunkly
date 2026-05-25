import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CancelBookingButton } from "@/components/booking/cancel-booking-button";
import { WriteReviewDialog } from "@/components/review/write-review-dialog";
import { ModifyBookingDialog } from "@/components/booking/modify-booking-dialog";
import { AddonSelector } from "@/components/booking/addon-selector";
import { OnlineCheckinDialog } from "@/components/booking/online-checkin-dialog";
import { ServiceRequestDialog } from "@/components/booking/service-request-dialog";
import { db } from "@/lib/db";
import { bookings, properties, propertyImages, roomTypes, payments, bookingAddons, reviews, serviceRequests } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  Bed,
  Phone,
  Mail,
  ArrowLeft,
  MessageSquare,
  Star,
  Clock,
  Building2,
  User,
  Shield,
} from "lucide-react";

const STATUS_STYLES: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
  pending: { variant: "outline", label: "Pending" },
  confirmed: { variant: "default", label: "Confirmed" },
  checked_in: { variant: "default", label: "Checked In" },
  checked_out: { variant: "secondary", label: "Checked Out" },
  cancelled: { variant: "destructive", label: "Cancelled" },
  no_show: { variant: "destructive", label: "No Show" },
  waitlisted: { variant: "outline", label: "Waitlisted" },
};

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/bookings");
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
      infants: bookings.infants,
      pets: bookings.pets,
      guestName: bookings.guestName,
      guestEmail: bookings.guestEmail,
      guestPhone: bookings.guestPhone,
      specialRequests: bookings.specialRequests,
      subtotal: bookings.subtotal,
      taxes: bookings.taxes,
      fees: bookings.fees,
      discount: bookings.discount,
      total: bookings.total,
      currency: bookings.currency,
      cancellationPolicy: bookings.cancellationPolicy,
      createdAt: bookings.createdAt,
      propertyId: properties.id,
      propertyName: properties.name,
      propertySlug: properties.slug,
      propertyCity: properties.city,
      propertyCountry: properties.country,
      propertyAddress: properties.addressLine1,
      propertyType: properties.propertyType,
      propertyCheckInTime: properties.checkInTime,
      propertyCheckOutTime: properties.checkOutTime,
      roomTypeName: roomTypes.name,
      roomCategory: roomTypes.category,
      roomSize: roomTypes.sizeSqft,
      roomBedConfig: roomTypes.bedConfig,
    })
    .from(bookings)
    .innerJoin(properties, eq(bookings.propertyId, properties.id))
    .innerJoin(roomTypes, eq(bookings.roomTypeId, roomTypes.id))
    .where(eq(bookings.id, id))
    .limit(1);

  if (!booking || booking.guestEmail !== session.user.email) {
    notFound();
  }

  const [primaryImage] = await db
    .select({ url: propertyImages.url })
    .from(propertyImages)
    .where(eq(propertyImages.propertyId, booking.propertyId))
    .orderBy(propertyImages.sortOrder)
    .limit(1);

  const bookingPayments = await db
    .select()
    .from(payments)
    .where(eq(payments.bookingId, booking.id));

  const addons = await db
    .select()
    .from(bookingAddons)
    .where(eq(bookingAddons.bookingId, booking.id));

  // Check if user already reviewed this booking
  const [existingReview] = await db
    .select({ id: reviews.id })
    .from(reviews)
    .where(eq(reviews.bookingId, booking.id))
    .limit(1);

  // Get service requests
  const requests = await db
    .select()
    .from(serviceRequests)
    .where(eq(serviceRequests.bookingId, booking.id));

  const status = STATUS_STYLES[booking.status] || STATUS_STYLES.pending;
  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const cur = booking.currency || "USD";
  const bedConfig = booking.roomBedConfig as { type: string; count: number }[] | null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="relative h-48 sm:h-64">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={booking.propertyName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-secondary" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <Link
                href="/bookings"
                className="mb-3 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
                data-testid="back-to-bookings"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to My Trips
              </Link>
              <div className="flex items-end justify-between">
                <div>
                  <h1
                    className="text-2xl font-bold text-white sm:text-3xl"
                    data-testid="booking-detail-title"
                  >
                    {booking.propertyName}
                  </h1>
                  <p className="mt-1 flex items-center gap-1 text-white/70">
                    <MapPin className="h-4 w-4" />
                    {booking.propertyAddress}, {booking.propertyCity}, {booking.propertyCountry}
                  </p>
                </div>
                <Badge
                  variant={status.variant}
                  className="text-sm"
                  data-testid="booking-detail-status"
                >
                  {status.label}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Confirmation Banner */}
          <div
            className="mb-8 rounded-lg border border-accent/30 bg-accent/5 p-4"
            data-testid="confirmation-banner"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Confirmation Number</p>
                <p className="text-xl font-bold text-accent" data-testid="confirmation-no">
                  {booking.confirmationNo}
                </p>
              </div>
              <p className="text-sm text-muted">
                Booked {formatDate(booking.createdAt)}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Main Details */}
            <div className="space-y-6 lg:col-span-2">
              {/* Stay Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-accent" />
                    Stay Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-secondary/50 p-4" data-testid="checkin-details">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">Check-in</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {formatDate(booking.checkIn)}
                      </p>
                      <p className="text-sm text-muted">
                        After {booking.propertyCheckInTime || "3:00 PM"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-4" data-testid="checkout-details">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">Check-out</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {formatDate(booking.checkOut)}
                      </p>
                      <p className="text-sm text-muted">
                        Before {booking.propertyCheckOutTime || "11:00 AM"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                    <Clock className="h-4 w-4" />
                    {nights} night{nights !== 1 ? "s" : ""}
                  </div>
                </CardContent>
              </Card>

              {/* Room Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bed className="h-5 w-5 text-accent" />
                    Room Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground" data-testid="room-type-name">
                        {booking.roomTypeName}
                      </p>
                      <p className="text-sm capitalize text-muted">{booking.roomCategory}</p>
                    </div>
                    {booking.roomSize && (
                      <span className="text-sm text-muted">{booking.roomSize} sq ft</span>
                    )}
                  </div>
                  {bedConfig && bedConfig.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {bedConfig.map((bed, i) => (
                        <Badge key={i} variant="secondary">
                          {bed.count}x {bed.type} bed
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Guest Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5 text-accent" />
                    Guest Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted" />
                      <span className="text-foreground" data-testid="guest-name">{booking.guestName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted" />
                      <span className="text-foreground">{booking.guestEmail}</span>
                    </div>
                    {booking.guestPhone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted" />
                        <span className="text-foreground">{booking.guestPhone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-muted" />
                      <span className="text-foreground">
                        {booking.adults} adult{booking.adults !== 1 ? "s" : ""}
                        {booking.children ? `, ${booking.children} child${booking.children !== 1 ? "ren" : ""}` : ""}
                        {booking.infants ? `, ${booking.infants} infant${booking.infants !== 1 ? "s" : ""}` : ""}
                      </span>
                    </div>
                    {booking.specialRequests && (
                      <div className="mt-3 rounded-lg bg-secondary/50 p-3">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted">Special Requests</p>
                        <p className="mt-1 text-sm text-foreground">{booking.specialRequests}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Add-ons */}
              {addons.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Star className="h-5 w-5 text-accent" />
                      Add-ons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {addons.map((addon) => (
                        <div
                          key={addon.id}
                          className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
                        >
                          <div>
                            <p className="font-medium text-foreground">{addon.name}</p>
                            <p className="text-sm text-muted">
                              Qty: {addon.quantity || 1}
                            </p>
                          </div>
                          <span className="font-medium text-foreground">
                            {formatCurrency(parseFloat(addon.price), cur)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Price Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="h-5 w-5 text-accent" />
                    Price Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
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
                    {booking.discount && parseFloat(booking.discount) > 0 && (
                      <div className="flex justify-between text-foreground/70">
                        <span>Discount</span>
                        <span>-{formatCurrency(parseFloat(booking.discount), cur)}</span>
                      </div>
                    )}
                    <hr className="border-border" />
                    <div className="flex justify-between text-base font-bold" data-testid="booking-detail-total">
                      <span className="text-foreground">Total</span>
                      <span className="text-accent">
                        {booking.total
                          ? formatCurrency(parseFloat(booking.total), cur)
                          : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  {bookingPayments.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-border pt-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">Payments</p>
                      {bookingPayments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between text-sm">
                          <span className="text-muted">
                            {payment.cardBrand ? `${payment.cardBrand} ••${payment.cardLast4}` : "Payment"}
                          </span>
                          <Badge variant={payment.status === "captured" ? "default" : "outline"} className="text-xs">
                            {payment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Cancellation Policy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-accent" />
                    Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="capitalize" data-testid="cancellation-policy">
                    {(booking.cancellationPolicy || "moderate").replace("_", " ")} cancellation
                  </Badge>
                  <p className="mt-2 text-xs text-muted">
                    {booking.cancellationPolicy === "free"
                      ? "Free cancellation up to 24 hours before check-in."
                      : booking.cancellationPolicy === "moderate"
                      ? "Free cancellation up to 5 days before check-in. 50% refund after."
                      : booking.cancellationPolicy === "strict"
                      ? "50% refund up to 1 week before check-in. No refund after."
                      : "This reservation is non-refundable."}
                  </p>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="space-y-3 p-4">
                  {/* Online Check-in */}
                  {booking.status === "confirmed" && (
                    <OnlineCheckinDialog bookingId={booking.id} />
                  )}

                  {/* Service Request */}
                  {booking.status === "checked_in" && (
                    <ServiceRequestDialog bookingId={booking.id} />
                  )}

                  {/* Modify Booking */}
                  {(booking.status === "confirmed" || booking.status === "pending") && (
                    <ModifyBookingDialog
                      bookingId={booking.id}
                      currentCheckIn={booking.checkIn}
                      currentCheckOut={booking.checkOut}
                    />
                  )}

                  <Link href={`/properties/${booking.propertySlug}`} className="block">
                    <Button variant="outline" className="w-full" data-testid="view-property">
                      <Building2 className="mr-2 h-4 w-4" />
                      View Property
                    </Button>
                  </Link>
                  <Link href="/messages" className="block">
                    <Button variant="outline" className="w-full" data-testid="contact-property">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Property
                    </Button>
                  </Link>

                  {/* Write Review (for checked_out or past bookings) */}
                  {(booking.status === "checked_out" || booking.status === "confirmed") && !existingReview && (
                    <WriteReviewDialog
                      bookingId={booking.id}
                      propertyId={booking.propertyId}
                      propertyName={booking.propertyName}
                    />
                  )}

                  {(booking.status === "confirmed" || booking.status === "pending") && (
                    <CancelBookingButton
                      bookingId={booking.id}
                      cancellationPolicy={booking.cancellationPolicy}
                      total={booking.total}
                      checkIn={booking.checkIn}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Add-ons */}
              {(booking.status === "confirmed" || booking.status === "pending") && (
                <Card>
                  <CardContent className="p-4">
                    <AddonSelector
                      bookingId={booking.id}
                      existingAddons={addons.map((a) => ({
                        id: a.id,
                        addonType: a.addonType,
                        name: a.name,
                        price: a.price,
                      }))}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Service Requests Status */}
              {requests.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Service Requests</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {requests.map((req) => (
                      <div key={req.id} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3" data-testid={`service-request-${req.id}`}>
                        <div>
                          <p className="text-sm font-medium capitalize text-foreground">{req.type.replace("_", " ")}</p>
                          <p className="text-xs capitalize text-muted">{req.status}</p>
                        </div>
                        <Badge variant={req.status === "pending" ? "outline" : "default"} className="capitalize">
                          {req.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
