"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { checkAvailability, type AvailabilityResult } from "@/lib/actions/booking";
import {
  Star,
  Loader2,
  Users as UsersIcon,
  Bed,
  Maximize,
  Check,
  X,
} from "lucide-react";

export function BookingSidebar({
  propertyId,
  lowestRate,
  avgRating,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}: {
  propertyId: string;
  lowestRate: number | null;
  avgRating: string | null;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [checkIn, setCheckIn] = useState(initialCheckIn || "");
  const [checkOut, setCheckOut] = useState(initialCheckOut || "");
  const [guests, setGuests] = useState(initialGuests || "2");
  const [availability, setAvailability] = useState<AvailabilityResult[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  function handleCheckAvailability() {
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      setError("Check-out must be after check-in.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const results = await checkAvailability(
        propertyId,
        checkIn,
        checkOut,
        parseInt(guests) || 2
      );
      setAvailability(results);
      setSelectedRoom(null);
    });
  }

  function handleBookNow() {
    if (!selectedRoom || !checkIn || !checkOut) return;
    const params = new URLSearchParams({
      propertyId,
      roomTypeId: selectedRoom,
      checkIn,
      checkOut,
      guests,
    });
    router.push(`/checkout?${params.toString()}`);
  }

  const selectedRoomData = availability?.find(
    (r) => r.roomTypeId === selectedRoom
  );
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <div className="sticky top-20 space-y-4">
      <Card className="border-accent/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-bold text-foreground">
                {lowestRate ? formatCurrency(lowestRate) : "—"}
              </span>
              <span className="text-sm text-muted"> / night</span>
            </div>
            {avgRating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-foreground text-foreground" />
                <span className="font-medium text-foreground">
                  {parseFloat(avgRating).toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <div className="mt-5 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border bg-secondary/50 p-3">
                <label className="text-xs text-muted">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    setAvailability(null);
                    setSelectedRoom(null);
                  }}
                  className="mt-1 w-full bg-transparent text-sm text-foreground"
                  data-testid="sidebar-checkin"
                />
              </div>
              <div className="rounded-lg border border-border bg-secondary/50 p-3">
                <label className="text-xs text-muted">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    setAvailability(null);
                    setSelectedRoom(null);
                  }}
                  className="mt-1 w-full bg-transparent text-sm text-foreground"
                  data-testid="sidebar-checkout"
                />
              </div>
            </div>
            <div className="rounded-lg border border-border bg-secondary/50 p-3">
              <label className="text-xs text-muted">Guests</label>
              <input
                type="number"
                min={1}
                max={16}
                value={guests}
                onChange={(e) => {
                  setGuests(e.target.value);
                  setAvailability(null);
                  setSelectedRoom(null);
                }}
                className="mt-1 w-full bg-transparent text-sm text-foreground"
                data-testid="sidebar-guests"
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-destructive" data-testid="availability-error">
              {error}
            </p>
          )}

          {!availability ? (
            <Button
              variant="accent"
              className="mt-5 w-full"
              size="lg"
              onClick={handleCheckAvailability}
              disabled={isPending}
              data-testid="check-availability"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Check Availability
            </Button>
          ) : selectedRoom ? (
            <Button
              variant="accent"
              className="mt-5 w-full"
              size="lg"
              onClick={handleBookNow}
              data-testid="book-now"
            >
              Book Now
            </Button>
          ) : (
            <p className="mt-5 text-center text-sm text-muted">
              Select a room below to continue
            </p>
          )}

          {/* Price summary when room selected */}
          {selectedRoomData && nights > 0 && (
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">
                  {formatCurrency(selectedRoomData.avgRate)} x {nights} night
                  {nights !== 1 ? "s" : ""}
                </span>
                <span className="text-foreground">
                  {formatCurrency(selectedRoomData.totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Taxes (12%)</span>
                <span className="text-foreground">
                  {formatCurrency(
                    Math.round(selectedRoomData.totalPrice * 0.12 * 100) / 100
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Service fee</span>
                <span className="text-foreground">{formatCurrency(25)}</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-accent">
                  {formatCurrency(
                    selectedRoomData.totalPrice +
                      Math.round(selectedRoomData.totalPrice * 0.12 * 100) /
                        100 +
                      25
                  )}
                </span>
              </div>
            </div>
          )}

          <p className="mt-3 text-center text-xs text-muted">
            You won&apos;t be charged yet
          </p>
        </CardContent>
      </Card>

      {/* Available Rooms */}
      {availability && (
        <div className="space-y-3" data-testid="availability-results">
          <h3 className="font-semibold text-foreground">
            Available Rooms for {nights} night{nights !== 1 ? "s" : ""}
          </h3>
          {availability.map((room) => {
            const beds = room.bedConfig;
            const isSelected = selectedRoom === room.roomTypeId;

            return (
              <Card
                key={room.roomTypeId}
                className={`cursor-pointer transition-all ${
                  !room.available
                    ? "opacity-50"
                    : isSelected
                    ? "border-accent ring-1 ring-accent"
                    : "hover:border-primary/50"
                }`}
                onClick={() => {
                  if (room.available) setSelectedRoom(room.roomTypeId);
                }}
                data-testid={`room-option-${room.roomTypeId}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">
                          {room.roomTypeName}
                        </h4>
                        <Badge
                          variant="secondary"
                          className="capitalize text-xs"
                        >
                          {room.category}
                        </Badge>
                        {room.available ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <UsersIcon className="h-3 w-3" />
                          Up to {room.maxOccupancy}
                        </span>
                        {room.sizeSqft && (
                          <span className="flex items-center gap-1">
                            <Maximize className="h-3 w-3" />
                            {room.sizeSqft} sq ft
                          </span>
                        )}
                        {beds?.map((bed, i) => (
                          <span key={i} className="flex items-center gap-1">
                            <Bed className="h-3 w-3" />
                            {bed.count}x {bed.type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        {formatCurrency(room.totalPrice)}
                      </p>
                      <p className="text-xs text-muted">total</p>
                      {!room.available && (
                        <p className="mt-1 text-xs text-destructive">
                          Sold out
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
