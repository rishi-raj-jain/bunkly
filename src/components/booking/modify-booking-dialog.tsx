"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { modifyBookingDates } from "@/lib/actions/booking-modifications";
import { Calendar, Loader2, X, Edit } from "lucide-react";

export function ModifyBookingDialog({
  bookingId,
  currentCheckIn,
  currentCheckOut,
}: {
  bookingId: string;
  currentCheckIn: string;
  currentCheckOut: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [newCheckIn, setNewCheckIn] = useState(currentCheckIn);
  const [newCheckOut, setNewCheckOut] = useState(currentCheckOut);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ priceDiff: number } | null>(null);

  function handleSubmit() {
    if (!newCheckIn || !newCheckOut) {
      setError("Both dates are required.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const res = await modifyBookingDates({
        bookingId,
        newCheckIn,
        newCheckOut,
      });

      if ("error" in res) {
        setError(res.error!);
      } else {
        setResult({ priceDiff: res.priceDiff! });
        setTimeout(() => {
          setOpen(false);
          router.refresh();
        }, 2000);
      }
    });
  }

  if (!open) {
    return (
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setOpen(true)}
        data-testid="modify-booking-button"
      >
        <Edit className="mr-2 h-4 w-4" />
        Modify Booking
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5" data-testid="modify-booking-dialog">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-foreground">
          <Calendar className="h-4 w-4 text-accent" />
          Modify Dates
        </h3>
        <button
          onClick={() => setOpen(false)}
          className="text-muted hover:text-foreground"
          data-testid="close-modify-dialog"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {result ? (
        <div className="mt-4 rounded-lg bg-accent/10 p-3 text-sm text-accent" data-testid="modify-success">
          Booking modified! Price difference: {result.priceDiff >= 0 ? "+" : ""}${result.priceDiff.toFixed(2)}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-sm font-medium text-muted">New Check-in</label>
            <Input
              type="date"
              value={newCheckIn}
              onChange={(e) => setNewCheckIn(e.target.value)}
              className="mt-1"
              data-testid="modify-checkin"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted">New Check-out</label>
            <Input
              type="date"
              value={newCheckOut}
              onChange={(e) => setNewCheckOut(e.target.value)}
              className="mt-1"
              data-testid="modify-checkout"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" data-testid="modify-error">
              {error}
            </p>
          )}

          <Button
            variant="accent"
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full"
            data-testid="submit-modification"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Changes
          </Button>
        </div>
      )}
    </div>
  );
}
