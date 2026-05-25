"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { setDefaultPaymentMethod, deletePaymentMethod } from "@/lib/actions/payment-methods";
import { Trash2, Star, Loader2 } from "lucide-react";

export function PaymentMethodActions({
  methodId,
  isDefault,
}: {
  methodId: string;
  isDefault: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function handleSetDefault() {
    startTransition(async () => {
      await setDefaultPaymentMethod(methodId);
      router.refresh();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deletePaymentMethod(methodId);
      router.refresh();
    });
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted">Delete?</span>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isPending}
          data-testid={`confirm-delete-pm-${methodId}`}
        >
          {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Yes"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirming(false)}
          data-testid={`cancel-delete-pm-${methodId}`}
        >
          No
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {!isDefault && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleSetDefault}
          disabled={isPending}
          data-testid={`set-default-pm-${methodId}`}
        >
          {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Star className="mr-1 h-3 w-3" />}
          Set Default
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setConfirming(true)}
        data-testid={`delete-pm-${methodId}`}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
}
