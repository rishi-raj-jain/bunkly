"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addPaymentMethod } from "@/lib/actions/payment-methods";
import { CreditCard, Loader2, X, Plus } from "lucide-react";

export function AddPaymentMethodDialog() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardName, setCardName] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    if (!cardNumber.trim() || !cardExpiry.trim() || !cardName.trim()) {
      setError("All fields are required.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const result = await addPaymentMethod({
        cardNumber: cardNumber.replace(/\s/g, ""),
        cardExpiry,
        cardName,
      });

      if ("error" in result) {
        setError(result.error!);
      } else {
        setOpen(false);
        setCardNumber("");
        setCardExpiry("");
        setCardName("");
        router.refresh();
      }
    });
  }

  if (!open) {
    return (
      <Button
        variant="accent"
        onClick={() => setOpen(true)}
        data-testid="add-payment-method"
      >
        <Plus className="mr-1 h-4 w-4" />
        Add Card
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5" data-testid="add-payment-dialog">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-foreground">
          <CreditCard className="h-4 w-4 text-accent" />
          Add Payment Method
        </h3>
        <button
          onClick={() => setOpen(false)}
          className="text-muted hover:text-foreground"
          data-testid="close-payment-dialog"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-sm font-medium text-muted">Name on Card</label>
          <Input
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            className="mt-1"
            data-testid="pm-card-name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted">Card Number</label>
          <Input
            value={cardNumber}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 16);
              setCardNumber(v.replace(/(\d{4})(?=\d)/g, "$1 ").trim());
            }}
            placeholder="4242 4242 4242 4242"
            className="mt-1"
            data-testid="pm-card-number"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted">Expiry Date</label>
          <Input
            value={cardExpiry}
            onChange={(e) => {
              let v = e.target.value.replace(/\D/g, "").slice(0, 4);
              if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
              setCardExpiry(v);
            }}
            placeholder="MM/YY"
            className="mt-1"
            data-testid="pm-card-expiry"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive" data-testid="pm-error">
            {error}
          </p>
        )}

        <Button
          variant="accent"
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full"
          data-testid="submit-payment-method"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Card
        </Button>

        <p className="text-xs text-muted">
          This is a demo app. No real card will be charged.
        </p>
      </div>
    </div>
  );
}
