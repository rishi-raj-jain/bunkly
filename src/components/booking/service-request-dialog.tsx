"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createServiceRequest } from "@/lib/actions/service-requests";
import { ConciergeBell, Loader2, X, Check } from "lucide-react";

const SERVICE_TYPES = [
  { value: "room_service", label: "Room Service" },
  { value: "housekeeping", label: "Housekeeping" },
  { value: "concierge", label: "Concierge" },
  { value: "maintenance", label: "Maintenance" },
  { value: "towels", label: "Extra Towels" },
  { value: "pillows", label: "Extra Pillows" },
];

export function ServiceRequestDialog({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState("normal");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit() {
    if (!serviceType) {
      setError("Please select a service type.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const result = await createServiceRequest({
        bookingId,
        type: serviceType,
        details,
        priority,
      });

      if ("error" in result) {
        setError(result.error!);
      } else {
        setSuccess(true);
        setTimeout(() => {
          setOpen(false);
          setSuccess(false);
          setServiceType("");
          setDetails("");
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
        data-testid="service-request-button"
      >
        <ConciergeBell className="mr-2 h-4 w-4" />
        Request Service
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5" data-testid="service-request-dialog">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-foreground">
          <ConciergeBell className="h-4 w-4 text-accent" />
          Service Request
        </h3>
        <button
          onClick={() => setOpen(false)}
          className="text-muted hover:text-foreground"
          data-testid="close-service-dialog"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {success ? (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent/10 p-3 text-sm text-accent" data-testid="service-success">
          <Check className="h-4 w-4" />
          Service request submitted!
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground">Service Type</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground"
              data-testid="service-type-select"
            >
              <option value="">Select a service...</option>
              {SERVICE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Any specific details or instructions..."
              rows={3}
              className="mt-1 w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
              data-testid="service-details-input"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Priority</label>
            <div className="mt-1 flex gap-2">
              {["normal", "high", "urgent"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`rounded-md border px-3 py-1.5 text-sm capitalize ${
                    priority === p
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                  data-testid={`priority-${p}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive" data-testid="service-error">
              {error}
            </p>
          )}

          <Button
            variant="accent"
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full"
            data-testid="submit-service-request"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Request
          </Button>
        </div>
      )}
    </div>
  );
}
