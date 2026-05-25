"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { onlineCheckin } from "@/lib/actions/checkin";
import { LogIn, Loader2, X, Check, Key } from "lucide-react";

const ROOM_PREFERENCES = [
  "High floor",
  "Low floor",
  "Quiet room",
  "Near elevator",
  "City view",
  "Garden view",
];

export function OnlineCheckinDialog({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"preferences" | "verify" | "complete">("preferences");
  const [arrivalTime, setArrivalTime] = useState("15:00");
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);
  const [idVerified, setIdVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function togglePref(pref: string) {
    setSelectedPrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  }

  function handleVerify() {
    if (!idVerified) {
      setError("Please verify your identity.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const result = await onlineCheckin({
        bookingId,
        arrivalTime,
        roomPreferences: selectedPrefs,
        idVerified,
      });

      if ("error" in result) {
        setError(result.error!);
      } else {
        setStep("complete");
        setTimeout(() => {
          setOpen(false);
          router.refresh();
        }, 3000);
      }
    });
  }

  if (!open) {
    return (
      <Button
        variant="accent"
        className="w-full"
        onClick={() => setOpen(true)}
        data-testid="online-checkin-button"
      >
        <LogIn className="mr-2 h-4 w-4" />
        Check In Online
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5" data-testid="online-checkin-dialog">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Online Check-in</h3>
        <button
          onClick={() => setOpen(false)}
          className="text-muted hover:text-foreground"
          data-testid="close-checkin-dialog"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {step === "complete" ? (
        <div className="mt-4 text-center" data-testid="checkin-complete">
          <Key className="mx-auto h-12 w-12 text-accent" />
          <h4 className="mt-3 text-lg font-semibold text-foreground">Welcome!</h4>
          <p className="mt-1 text-sm text-muted">
            Your digital key has been activated. Show this to the front desk.
          </p>
        </div>
      ) : step === "preferences" ? (
        <div className="mt-4 space-y-4" data-testid="checkin-step-preferences">
          <div>
            <label className="text-sm font-medium text-foreground">Estimated Arrival</label>
            <input
              type="time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground"
              data-testid="checkin-arrival-time"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Room Preferences</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {ROOM_PREFERENCES.map((pref) => (
                <label
                  key={pref}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-2 text-sm"
                  data-testid={`checkin-pref-${pref.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPrefs.includes(pref)}
                    onChange={() => togglePref(pref)}
                    className="h-4 w-4 rounded border-border text-primary"
                  />
                  {pref}
                </label>
              ))}
            </div>
          </div>
          <Button
            variant="accent"
            className="w-full"
            onClick={() => setStep("verify")}
            data-testid="checkin-continue-verify"
          >
            Continue
          </Button>
        </div>
      ) : (
        <div className="mt-4 space-y-4" data-testid="checkin-step-verify">
          <div>
            <label className="flex cursor-pointer items-center gap-3" data-testid="checkin-id-verify">
              <input
                type="checkbox"
                checked={idVerified}
                onChange={(e) => setIdVerified(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary"
              />
              <span className="text-sm text-foreground">
                I confirm my identity and agree to the hotel&apos;s terms and conditions
              </span>
            </label>
          </div>

          {error && (
            <p className="text-sm text-destructive" data-testid="checkin-error">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep("preferences")}
              data-testid="checkin-back"
            >
              Back
            </Button>
            <Button
              variant="accent"
              className="flex-1"
              onClick={handleVerify}
              disabled={isPending}
              data-testid="checkin-submit"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}
              Complete Check-in
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
