"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPriceAlert } from "@/lib/actions/price-alerts";
import { Bell, Loader2, X, Check } from "lucide-react";

export function CreatePriceAlertButton({ propertyId }: { propertyId: string }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [targetPrice, setTargetPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleCreate() {
    const price = parseFloat(targetPrice);
    if (!price || price <= 0) {
      setError("Please enter a valid price.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const result = await createPriceAlert({
        propertyId,
        targetPrice: price,
      });

      if ("error" in result) {
        setError(result.error!);
      } else {
        setSuccess(true);
        setTimeout(() => {
          setOpen(false);
          setSuccess(false);
          setTargetPrice("");
        }, 2000);
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-background/80 p-2 text-foreground backdrop-blur-sm hover:bg-background"
        data-testid="create-price-alert"
      >
        <Bell className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="absolute right-4 top-4 z-10 rounded-lg border border-border bg-card p-4 shadow-lg" data-testid="price-alert-form">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Set Price Alert</span>
        <button onClick={() => setOpen(false)} className="text-muted hover:text-foreground" data-testid="close-price-alert">
          <X className="h-4 w-4" />
        </button>
      </div>
      {success ? (
        <div className="mt-2 flex items-center gap-1 text-sm text-accent">
          <Check className="h-4 w-4" />
          Alert created!
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          <Input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder="Target price per night"
            min="0"
            data-testid="price-alert-target"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button size="sm" variant="accent" onClick={handleCreate} disabled={isPending} className="w-full" data-testid="submit-price-alert">
            {isPending ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Bell className="mr-1 h-3 w-3" />}
            Set Alert
          </Button>
        </div>
      )}
    </div>
  );
}
