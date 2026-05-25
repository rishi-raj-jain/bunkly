"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { addBookingAddon, removeBookingAddon } from "@/lib/actions/booking-modifications";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus, Loader2, Coffee, Car, Shield, Sparkles } from "lucide-react";

const AVAILABLE_ADDONS = [
  { type: "breakfast", name: "Breakfast Package", price: 35, icon: <Coffee className="h-5 w-5" /> },
  { type: "airport_transfer", name: "Airport Transfer", price: 75, icon: <Car className="h-5 w-5" /> },
  { type: "travel_insurance", name: "Travel Insurance", price: 29, icon: <Shield className="h-5 w-5" /> },
  { type: "spa_credit", name: "Spa Credit ($50)", price: 50, icon: <Sparkles className="h-5 w-5" /> },
];

export function AddonSelector({
  bookingId,
  existingAddons,
}: {
  bookingId: string;
  existingAddons: { id: string; addonType: string; name: string; price: string }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  function handleAdd(addon: typeof AVAILABLE_ADDONS[0]) {
    setPendingAction(addon.type);
    startTransition(async () => {
      await addBookingAddon({
        bookingId,
        addonType: addon.type,
        name: addon.name,
        price: addon.price,
      });
      setPendingAction(null);
      router.refresh();
    });
  }

  function handleRemove(addonId: string, type: string) {
    setPendingAction(type);
    startTransition(async () => {
      await removeBookingAddon(addonId);
      setPendingAction(null);
      router.refresh();
    });
  }

  return (
    <div className="space-y-3" data-testid="addon-selector">
      <h3 className="text-sm font-semibold text-foreground">Add-ons & Extras</h3>
      {AVAILABLE_ADDONS.map((addon) => {
        const existing = existingAddons.find((a) => a.addonType === addon.type);
        const loading = isPending && pendingAction === addon.type;
        return (
          <div
            key={addon.type}
            className="flex items-center justify-between rounded-lg border border-border p-3"
            data-testid={`addon-${addon.type}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-accent">{addon.icon}</span>
              <div>
                <p className="text-sm font-medium text-foreground">{addon.name}</p>
                <p className="text-xs text-muted">{formatCurrency(addon.price)}</p>
              </div>
            </div>
            {existing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemove(existing.id, addon.type)}
                disabled={loading}
                data-testid={`remove-addon-${addon.type}`}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Minus className="h-4 w-4" />}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAdd(addon)}
                disabled={loading}
                data-testid={`add-addon-${addon.type}`}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
