"use client";

import { useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  Plane,
  Clock,
  XCircle,
  ChevronDown,
} from "lucide-react";

type BookingSummary = {
  id: string;
  confirmationNo: string;
  status: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number | null;
  guestName: string;
  total: string | null;
  currency: string | null;
  propertyName: string;
  propertySlug: string;
  propertyCity: string;
  propertyCountry: string;
  propertyType: string;
  roomTypeName: string;
  roomCategory: string;
  imageUrl: string | null;
};

const STATUS_STYLES: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> =
  {
    pending: { variant: "outline", label: "Pending" },
    confirmed: { variant: "default", label: "Confirmed" },
    checked_in: { variant: "default", label: "Checked In" },
    checked_out: { variant: "secondary", label: "Checked Out" },
    cancelled: { variant: "destructive", label: "Cancelled" },
    no_show: { variant: "destructive", label: "No Show" },
    waitlisted: { variant: "outline", label: "Waitlisted" },
  };

type TripTab = "upcoming" | "past" | "cancelled";

function BookingCard({ booking }: { booking: BookingSummary }) {
  const status = STATUS_STYLES[booking.status] || STATUS_STYLES.pending;
  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <Link href={`/bookings/${booking.id}`} data-testid={`booking-card-${booking.confirmationNo}`}>
      <Card className="group transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg sm:h-auto sm:w-48 sm:rounded-l-lg sm:rounded-tr-none">
              {booking.imageUrl ? (
                <img
                  src={booking.imageUrl}
                  alt={booking.propertyName}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-secondary">
                  <Plane className="h-8 w-8 text-muted" />
                </div>
              )}
              <Badge
                variant={status.variant}
                className="absolute left-3 top-3"
                data-testid={`booking-status-${booking.confirmationNo}`}
              >
                {status.label}
              </Badge>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className="text-lg font-semibold text-foreground"
                      data-testid={`booking-property-${booking.confirmationNo}`}
                    >
                      {booking.propertyName}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-sm text-muted">
                      <MapPin className="h-3.5 w-3.5" />
                      {booking.propertyCity}, {booking.propertyCountry}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </div>
                <p className="mt-2 text-sm text-muted">
                  {booking.roomTypeName} · {booking.confirmationNo}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <span
                  className="flex items-center gap-1.5 text-foreground"
                  data-testid={`booking-dates-${booking.confirmationNo}`}
                >
                  <Calendar className="h-4 w-4 text-accent" />
                  {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}
                </span>
                <span className="flex items-center gap-1.5 text-muted">
                  <Clock className="h-4 w-4" />
                  {nights} night{nights !== 1 ? "s" : ""}
                </span>
                <span className="flex items-center gap-1.5 text-muted">
                  <Users className="h-4 w-4" />
                  {booking.adults} adult{booking.adults !== 1 ? "s" : ""}
                  {booking.children ? `, ${booking.children} child${booking.children !== 1 ? "ren" : ""}` : ""}
                </span>
                {booking.total && (
                  <span
                    className="ml-auto font-semibold text-foreground"
                    data-testid={`booking-total-${booking.confirmationNo}`}
                  >
                    {formatCurrency(parseFloat(booking.total), booking.currency || "USD")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function BookingSectionEmpty({
  variant,
}: {
  variant: TripTab;
}) {
  return (
    <div
      className="rounded-lg border border-dashed border-border bg-secondary/40 py-12 text-center"
      data-testid={`bookings-empty-${variant}`}
    >
      {variant === "upcoming" && (
        <>
          <Plane className="mx-auto h-12 w-12 text-muted" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No upcoming trips</h3>
          <p className="mt-1 text-sm text-muted">Time to plan your next adventure!</p>
          <Link href="/search">
            <Button variant="accent" className="mt-6" data-testid="search-cta">
              Search Properties
            </Button>
          </Link>
        </>
      )}
      {variant === "past" && (
        <>
          <Clock className="mx-auto h-12 w-12 text-muted" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No past trips</h3>
          <p className="mt-1 text-sm text-muted">Your travel history will appear here.</p>
        </>
      )}
      {variant === "cancelled" && (
        <>
          <XCircle className="mx-auto h-12 w-12 text-muted" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No cancelled trips</h3>
          <p className="mt-1 text-sm text-muted">Nothing to see here — that&apos;s a good thing!</p>
        </>
      )}
    </div>
  );
}

export function BookingsList({
  upcoming,
  past,
  cancelled,
}: {
  upcoming: BookingSummary[];
  past: BookingSummary[];
  cancelled: BookingSummary[];
}) {
  const upcomingRef = useRef<HTMLElement>(null);
  const pastRef = useRef<HTMLElement>(null);
  const cancelledRef = useRef<HTMLElement>(null);

  const jumps: {
    key: TripTab;
    label: string;
    count: number;
    icon: React.ReactNode;
    ref: React.RefObject<HTMLElement | null>;
  }[] = [
    { key: "upcoming", label: "Upcoming", count: upcoming.length, icon: <Plane className="h-4 w-4" />, ref: upcomingRef },
    { key: "past", label: "Past", count: past.length, icon: <Clock className="h-4 w-4" />, ref: pastRef },
    { key: "cancelled", label: "Cancelled", count: cancelled.length, icon: <XCircle className="h-4 w-4" />, ref: cancelledRef },
  ];

  function scrollToSection(ref: React.RefObject<HTMLElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderSection(bookings: BookingSummary[], tab: TripTab) {
    return (
      <>
        {bookings.length > 0 ? (
          <div className="space-y-4" data-testid={`bookings-list-${tab}`}>
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <BookingSectionEmpty variant={tab} />
        )}
      </>
    );
  }

  return (
    <div>
      {/* Jump navigation: scroll feed instead of swapping a single tab panel */}
      <div
        className="sticky top-0 z-10 -mx-1 mb-8 flex flex-wrap items-center gap-2 border-b border-border bg-background pb-4 pt-1"
        data-testid="bookings-jump-nav"
      >
        {jumps.map((j) => (
          <button
            key={j.key}
            type="button"
            onClick={() => scrollToSection(j.ref)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:border-primary hover:bg-secondary/90"
            data-testid={`tab-${j.key}`}
          >
            {j.icon}
            {j.label}
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{j.count}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground opacity-70" aria-hidden />
          </button>
        ))}
      </div>

      <div className="space-y-16">
        <section ref={upcomingRef} id="bookings-upcoming" className="scroll-mt-28" data-testid="bookings-section-upcoming">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-semibold text-foreground">Upcoming trips</h2>
            <p className="text-sm text-muted">Where you&apos;re headed next.</p>
          </div>
          {renderSection(upcoming, "upcoming")}
        </section>

        <section ref={pastRef} id="bookings-past" className="scroll-mt-28" data-testid="bookings-section-past">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-semibold text-foreground">Past stays</h2>
            <p className="text-sm text-muted">Completed journeys and receipts.</p>
          </div>
          {renderSection(past, "past")}
        </section>

        <section ref={cancelledRef} id="bookings-cancelled" className="scroll-mt-28 pb-8" data-testid="bookings-section-cancelled">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-semibold text-foreground">Cancelled</h2>
            <p className="text-sm text-muted">Reservations you ended early.</p>
          </div>
          {renderSection(cancelled, "cancelled")}
        </section>
      </div>
    </div>
  );
}
