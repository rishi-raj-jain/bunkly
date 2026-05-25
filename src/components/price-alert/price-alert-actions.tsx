"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { togglePriceAlert, deletePriceAlert } from "@/lib/actions/price-alerts";
import { Pause, Play, Trash2, Loader2 } from "lucide-react";

export function PriceAlertActions({
  alertId,
  isActive,
}: {
  alertId: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      await togglePriceAlert(alertId);
      router.refresh();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deletePriceAlert(alertId);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        disabled={isPending}
        data-testid={`toggle-alert-${alertId}`}
      >
        {isPending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : isActive ? (
          <Pause className="h-3 w-3" />
        ) : (
          <Play className="h-3 w-3" />
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
        data-testid={`delete-alert-${alertId}`}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
}
