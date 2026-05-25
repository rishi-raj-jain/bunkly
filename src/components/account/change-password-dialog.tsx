"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/lib/actions/account";
import { Lock, Loader2, X, Check } from "lucide-react";

export function ChangePasswordDialog() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit() {
    if (!currentPassword) {
      setError("Current password is required.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const result = await changePassword({
        currentPassword,
        newPassword,
      });

      if ("error" in result) {
        setError(result.error!);
      } else {
        setSuccess(true);
        setTimeout(() => {
          setOpen(false);
          setSuccess(false);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }, 2000);
      }
    });
  }

  if (!open) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        data-testid="change-password"
      >
        Change
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5" data-testid="change-password-dialog">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-foreground">
          <Lock className="h-4 w-4 text-accent" />
          Change Password
        </h3>
        <button
          onClick={() => setOpen(false)}
          className="text-muted hover:text-foreground"
          data-testid="close-password-dialog"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {success ? (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent/10 p-3 text-sm text-accent">
          <Check className="h-4 w-4" />
          Password changed successfully!
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-sm font-medium text-muted">Current Password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1"
              data-testid="current-password-input"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1"
              data-testid="new-password-input"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted">Confirm New Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
              data-testid="confirm-password-input"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" data-testid="password-error">
              {error}
            </p>
          )}

          <Button
            variant="accent"
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full"
            data-testid="submit-password-change"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Password
          </Button>
        </div>
      )}
    </div>
  );
}
