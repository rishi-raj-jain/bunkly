"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Hotel, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Simulate sending reset email
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-60 w-60 rounded-full bg-foreground/[0.04] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-foreground/[0.03] blur-[80px]" />
      </div>

      <Card
        className="relative w-full max-w-md border-border/50"
        data-testid="forgot-password-card"
      >
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto mb-4 flex items-center gap-2">
            <Hotel className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">
              Bunkly
            </span>
          </Link>
          <CardTitle data-testid="forgot-password-title">
            {submitted ? "Check your email" : "Reset your password"}
          </CardTitle>
          <CardDescription>
            {submitted
              ? `We've sent a password reset link to ${email}`
              : "Enter your email and we'll send you a reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>
              <p className="text-center text-sm text-muted">
                Didn&apos;t receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-accent hover:underline"
                >
                  try again
                </button>
              </p>
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign in
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="forgot-password-email"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                data-testid="forgot-password-submit"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Link
                href="/login"
                className="flex items-center justify-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Sign in
              </Link>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
