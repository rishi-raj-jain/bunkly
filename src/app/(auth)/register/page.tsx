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
import { Hotel } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed");
        return;
      }

      // Auto sign in after registration
      const { signIn } = await import("next-auth/react");
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-1/3 h-60 w-60 rounded-full bg-foreground/[0.04] blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 h-40 w-40 rounded-full bg-foreground/[0.03] blur-[80px]" />
      </div>

      <Card className="relative w-full max-w-md border-border/50 glow-primary" data-testid="register-card">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto mb-4 flex items-center gap-2">
            <Hotel className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">Bunkly</span>
          </Link>
          <CardTitle data-testid="register-title">Create your account</CardTitle>
          <CardDescription>
            Join Bunkly to start booking amazing stays
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive"
                data-testid="register-error"
              >
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Full name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                data-testid="register-name"
              />
            </div>
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
                data-testid="register-email"
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
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                data-testid="register-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-testid="register-submit"
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-accent hover:underline"
              data-testid="login-link"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
