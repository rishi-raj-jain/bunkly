"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cancelBooking } from "@/lib/actions/booking";
import { formatCurrency } from "@/lib/utils";
import { Loader2, AlertTriangle } from "lucide-react";

export function CancelBookingButton({
  bookingId,
  cancellationPolicy,
  total,
  checkIn,
}: {
  bookingId: string;
  cancellationPolicy: string | null;
  total: string | null;
  checkIn: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    refundAmount?: number;
    error?: string;
  } | null>(null);

  const daysUntilCheckIn = Math.ceil(
    (new Date(checkIn).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const totalAmount = parseFloat(total || "0");

  let refundEstimate = 0;
  switch (cancellationPolicy) {
    case "free":
      refundEstimate = daysUntilCheckIn >= 1 ? totalAmount : 0;
      break;
    case "moderate":
      refundEstimate = daysUntilCheckIn >= 5 ? totalAmount : totalAmount * 0.5;
      break;
    case "strict":
      refundEstimate = daysUntilCheckIn >= 7 ? totalAmount * 0.5 : 0;
      break;
    case "non_refundable":
      refundEstimate = 0;
      break;
    default:
      refundEstimate = totalAmount;
  }

  function handleCancel() {
    startTransition(async () => {
      const res = await cancelBooking(bookingId);
      if ("error" in res) {
        setResult({ error: res.error });
      } else {
        setResult({ success: true, refundAmount: res.refundAmount });
        router.refresh();
      }
    });
  }

  if (result?.success) {
    return (
      <div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
        <p className="text-sm font-medium text-foreground">
          Booking cancelled successfully
        </p>
        {result.refundAmount !== undefined && result.refundAmount > 0 && (
          <p className="mt-1 text-sm text-muted">
            Refund of {formatCurrency(result.refundAmount)} will be processed
          </p>
        )}
      </div>
    );
  }

  if (!showConfirm) {
    return (
      <Button
        variant="destructive"
        className="w-full"
        onClick={() => setShowConfirm(true)}
        data-testid="cancel-booking"
      >
        Cancel Booking
      </Button>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <div className="flex items-start gap-2">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
        <div>
          <p className="font-medium text-foreground">Cancel this booking?</p>
          <p className="mt-1 text-sm text-muted">
            {refundEstimate === totalAmount
              ? "You will receive a full refund."
              : refundEstimate > 0
              ? `You will receive a partial refund of ${formatCurrency(refundEstimate)}.`
              : "No refund will be issued."}
          </p>
        </div>
      </div>

      {result?.error && (
        <p className="text-sm text-destructive">{result.error}</p>
      )}

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setShowConfirm(false);
            setResult(null);
          }}
          disabled={isPending}
        >
          Keep Booking
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleCancel}
          disabled={isPending}
          data-testid="confirm-cancel"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {isPending ? "Cancelling..." : "Yes, Cancel"}
        </Button>
      </div>
    </div>
  );
}
