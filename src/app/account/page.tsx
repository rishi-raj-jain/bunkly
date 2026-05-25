import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileForm, PreferencesForm } from "@/components/account/profile-form";
import { ChangePasswordDialog } from "@/components/account/change-password-dialog";
import { JoinLoyaltyButton } from "@/components/account/join-loyalty-button";
import { db } from "@/lib/db";
import { users, guestProfiles, loyaltyMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  User,
  Globe,
  Heart,
  Shield,
  Award,
  ChevronRight,
  Bell,
  CreditCard,
  Star,
  Tag,
} from "lucide-react";

export const metadata = {
  title: "Account — Bunkly",
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account");
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user) redirect("/login");

  const [profile] = await db
    .select()
    .from(guestProfiles)
    .where(eq(guestProfiles.userId, session.user.id))
    .limit(1);

  const [loyalty] = await db
    .select()
    .from(loyaltyMembers)
    .where(eq(loyaltyMembers.userId, session.user.id))
    .limit(1);

  const navItems = [
    { href: "/account/wishlists", label: "Wishlists", icon: Heart, desc: "Saved properties and collections" },
    { href: "/account/notifications", label: "Notifications", icon: Bell, desc: "Manage notification preferences" },
    { href: "/account/payment-methods", label: "Payment Methods", icon: CreditCard, desc: "Manage saved cards" },
    { href: "/account/reviews", label: "My Reviews", icon: Star, desc: "Reviews you've written" },
    { href: "/account/price-alerts", label: "Price Alerts", icon: Tag, desc: "Monitor price drops" },
  ];

  if (loyalty) {
    navItems.push({ href: "/account/loyalty", label: "Bunkly Rewards", icon: Award, desc: `${loyalty.pointsBalance.toLocaleString()} points` });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold text-foreground" data-testid="account-title">
              Account
            </h1>
            <p className="mt-1 text-muted">Manage your profile and preferences</p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left - Profile Card */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name || "Profile"}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-foreground" data-testid="user-name">
                    {user.name || "Guest"}
                  </h2>
                  <p className="text-sm text-muted">{user.email}</p>
                  <Badge variant="secondary" className="mt-2 capitalize" data-testid="user-role">
                    {user.role}
                  </Badge>
                  <p className="mt-3 text-xs text-muted">
                    Member since {formatDate(user.createdAt)}
                  </p>
                </CardContent>
              </Card>

              {/* Loyalty Card */}
              {loyalty ? (
                <Link href="/account/loyalty">
                  <Card className="border-accent/20 bg-gradient-to-br from-secondary to-secondary/50 transition-all hover:border-accent/40">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-accent" />
                        <h3 className="font-semibold text-foreground">Bunkly Rewards</h3>
                      </div>
                      <Badge variant="outline" className="mt-2 capitalize" data-testid="loyalty-tier">
                        {loyalty.tier}
                      </Badge>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-2xl font-bold text-accent" data-testid="points-balance">
                            {loyalty.pointsBalance.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted">Points</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {loyalty.qualifyingStays}
                          </p>
                          <p className="text-xs text-muted">Stays</p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-muted">
                        Member #{loyalty.memberNumber}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="mx-auto h-8 w-8 text-muted" />
                    <h3 className="mt-2 font-semibold text-foreground">Bunkly Rewards</h3>
                    <p className="mt-1 text-sm text-muted">
                      Join to earn points on every stay
                    </p>
                    <JoinLoyaltyButton />
                  </CardContent>
                </Card>
              )}

              {/* Quick Nav */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Card className="group transition-all hover:border-primary/50">
                      <CardContent className="flex items-center gap-3 p-4">
                        <item.icon className="h-5 w-5 text-accent" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-muted">{item.desc}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted group-hover:text-accent" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right - Profile Details */}
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5 text-accent" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProfileForm
                    name={user.name || ""}
                    phone={user.phone || ""}
                    dateOfBirth={profile?.dateOfBirth || ""}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5 text-accent" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PreferencesForm
                    locale={user.locale || "en"}
                    currency={user.currency || "USD"}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-accent" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
                    <div>
                      <p className="font-medium text-foreground">Password</p>
                      <p className="text-sm text-muted">Last changed: Never</p>
                    </div>
                    <ChangePasswordDialog />
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
                    <div>
                      <p className="font-medium text-foreground">Two-factor authentication</p>
                      <p className="text-sm text-muted">Not enabled</p>
                    </div>
                    <button
                      className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground hover:bg-secondary"
                      data-testid="enable-2fa"
                    >
                      Enable
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
