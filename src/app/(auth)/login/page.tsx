"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hotel } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { signIn } = await import("next-auth/react");
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        window.location.href = "/";
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    const { signIn } = await import("next-auth/react");
    signIn("google", { callbackUrl: "/" });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-60 w-60 rounded-full bg-foreground/[0.04] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-foreground/[0.03] blur-[80px]" />
      </div>

      <Card className="relative w-full max-w-md border-border/50 glow-primary" data-testid="login-card">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto mb-4 flex items-center gap-2">
            <Hotel className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">Bunkly</span>
          </Link>
          <CardTitle data-testid="login-title">Welcome back</CardTitle>
          <CardDescription>Sign in to manage your bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive"
                data-testid="login-error"
              >
                {error}
              </div>
            )}
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
                data-testid="login-email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="login-password"
              />
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-accent hover:underline"
                data-testid="forgot-password-link"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-testid="login-submit"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            data-testid="google-signin"
          >
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-accent hover:underline"
              data-testid="register-link"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
