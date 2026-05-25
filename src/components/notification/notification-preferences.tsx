"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateNotificationPreference } from "@/lib/actions/account";
import { Loader2 } from "lucide-react";

const CATEGORIES = [
  { key: "bookings", label: "Booking Updates", desc: "Confirmation, reminders, cancellations" },
  { key: "promotions", label: "Promotions & Deals", desc: "Special offers and discounts" },
  { key: "messages", label: "Messages", desc: "New messages from properties" },
  { key: "price_alerts", label: "Price Alerts", desc: "Notifications when prices drop" },
];

type Pref = {
  category: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
};

export function NotificationPreferencesForm({
  preferences,
}: {
  preferences: Pref[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  function getPref(category: string) {
    return (
      preferences.find((p) => p.category === category) || {
        category,
        emailEnabled: true,
        pushEnabled: true,
        smsEnabled: false,
      }
    );
  }

  function handleToggle(
    category: string,
    field: "emailEnabled" | "pushEnabled" | "smsEnabled",
    currentValue: boolean
  ) {
    setPendingKey(`${category}-${field}`);
    startTransition(async () => {
      await updateNotificationPreference({
        category,
        [field]: !currentValue,
      });
      setPendingKey(null);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4" data-testid="notification-preferences">
      {/* Header Row */}
      <div className="grid grid-cols-4 gap-4 text-xs font-medium uppercase tracking-wider text-muted">
        <span>Category</span>
        <span className="text-center">Email</span>
        <span className="text-center">Push</span>
        <span className="text-center">SMS</span>
      </div>

      {CATEGORIES.map((cat) => {
        const pref = getPref(cat.key);
        return (
          <div
            key={cat.key}
            className="grid grid-cols-4 items-center gap-4 rounded-lg bg-secondary/50 p-3"
            data-testid={`notif-pref-${cat.key}`}
          >
            <div>
              <p className="text-sm font-medium text-foreground">{cat.label}</p>
              <p className="text-xs text-muted">{cat.desc}</p>
            </div>

            {(["emailEnabled", "pushEnabled", "smsEnabled"] as const).map((field) => {
              const key = `${cat.key}-${field}`;
              const isLoading = isPending && pendingKey === key;
              const value = pref[field];
              return (
                <div key={field} className="flex justify-center">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted" />
                  ) : (
                    <button
                      type="button"
                      role="switch"
                      aria-checked={value}
                      onClick={() => handleToggle(cat.key, field, value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? "bg-accent" : "bg-border"
                      }`}
                      data-testid={`toggle-${cat.key}-${field.replace("Enabled", "")}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                          value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
