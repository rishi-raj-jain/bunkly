"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile, updatePreferences } from "@/lib/actions/account";
import { Loader2, Check } from "lucide-react";

export function ProfileForm({
  name,
  phone,
  dateOfBirth,
}: {
  name: string;
  phone: string;
  dateOfBirth: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formName, setFormName] = useState(name);
  const [formPhone, setFormPhone] = useState(phone);
  const [formDob, setFormDob] = useState(dateOfBirth);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    startTransition(async () => {
      await updateProfile({
        name: formName,
        phone: formPhone,
        dateOfBirth: formDob,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    });
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-muted">Full Name</label>
          <Input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="mt-1"
            data-testid="input-name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted">Phone</label>
          <Input
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
            type="tel"
            className="mt-1"
            data-testid="input-phone"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted">Date of Birth</label>
          <Input
            value={formDob}
            onChange={(e) => setFormDob(e.target.value)}
            type="date"
            className="mt-1"
            data-testid="input-dob"
          />
        </div>
      </div>
      <Button className="mt-6" onClick={handleSave} disabled={isPending} data-testid="save-profile">
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : saved ? (
          <Check className="mr-2 h-4 w-4" />
        ) : null}
        {saved ? "Saved!" : "Save Changes"}
      </Button>
    </>
  );
}

export function PreferencesForm({
  locale,
  currency,
}: {
  locale: string;
  currency: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formLocale, setFormLocale] = useState(locale);
  const [formCurrency, setFormCurrency] = useState(currency);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    startTransition(async () => {
      await updatePreferences({ locale: formLocale, currency: formCurrency });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    });
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-muted">Language</label>
          <select
            value={formLocale}
            onChange={(e) => setFormLocale(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground"
            data-testid="select-locale"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="ja">日本語</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-muted">Currency</label>
          <select
            value={formCurrency}
            onChange={(e) => setFormCurrency(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground"
            data-testid="select-currency"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="AUD">AUD (A$)</option>
          </select>
        </div>
      </div>
      <Button className="mt-6" onClick={handleSave} disabled={isPending} data-testid="save-preferences">
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : saved ? (
          <Check className="mr-2 h-4 w-4" />
        ) : null}
        {saved ? "Saved!" : "Save Preferences"}
      </Button>
    </>
  );
}
