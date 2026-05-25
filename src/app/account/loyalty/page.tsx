import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { loyaltyMembers, pointsTransactions } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Award, ArrowLeft, TrendingUp, Star, Gift } from "lucide-react";

export const metadata = {
  title: "Bunkly Rewards — Bunkly",
};

const TIER_BENEFITS = {
  base: { nights: 0, perks: ["Earn 1 point per $1 spent", "Member-only rates"] },
  silver: { nights: 10, perks: ["Earn 1.5x points", "Late checkout", "Room upgrades (subject to availability)"] },
  gold: { nights: 25, perks: ["Earn 2x points", "Free breakfast", "Guaranteed room upgrade", "Welcome amenity"] },
  platinum: { nights: 50, perks: ["Earn 3x points", "Suite upgrades", "Free minibar", "Airport lounge access", "Personal concierge"] },
};

export default async function LoyaltyPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account/loyalty");
  }

  const [member] = await db
    .select()
    .from(loyaltyMembers)
    .where(eq(loyaltyMembers.userId, session.user.id))
    .limit(1);

  if (!member) {
    redirect("/account");
  }

  const transactions = await db
    .select()
    .from(pointsTransactions)
    .where(eq(pointsTransactions.memberId, member.id))
    .orderBy(desc(pointsTransactions.createdAt))
    .limit(20);

  const tiers = ["base", "silver", "gold", "platinum"] as const;
  const currentTierIndex = tiers.indexOf(member.tier);
  const nextTier = currentTierIndex < 3 ? tiers[currentTierIndex + 1] : null;
  const nextTierInfo = nextTier ? TIER_BENEFITS[nextTier] : null;
  const staysToNextTier = nextTierInfo ? nextTierInfo.nights - member.qualifyingStays : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-3">
              <Link href="/account" className="text-muted hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-3xl font-bold text-foreground" data-testid="loyalty-title">
                Bunkly Rewards
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Member Card */}
            <Card className="border-accent/20 bg-gradient-to-br from-secondary to-secondary/50">
              <CardContent className="p-6">
                <Award className="h-8 w-8 text-accent" />
                <Badge variant="outline" className="mt-3 capitalize text-lg" data-testid="loyalty-tier">
                  {member.tier}
                </Badge>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-bold text-accent" data-testid="points-balance">
                      {member.pointsBalance.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted">Points</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">
                      {member.qualifyingStays}
                    </p>
                    <p className="text-sm text-muted">Stays</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted" data-testid="member-number">
                  Member #{member.memberNumber}
                </p>
                {member.tierExpires && (
                  <p className="text-xs text-muted">
                    Tier expires: {formatDate(member.tierExpires)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Progress & Benefits */}
            <div className="space-y-6 lg:col-span-2">
              {/* Next Tier Progress */}
              {nextTier && (
                <Card data-testid="tier-progress">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Progress to {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="capitalize text-muted">{member.tier}</span>
                      <span className="capitalize text-muted">{nextTier}</span>
                    </div>
                    <div className="h-3 rounded-full bg-secondary">
                      <div
                        className="h-3 rounded-full bg-accent transition-all"
                        style={{
                          width: `${Math.min(100, (member.qualifyingStays / (nextTierInfo?.nights || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {staysToNextTier > 0
                        ? `${staysToNextTier} more stay${staysToNextTier !== 1 ? "s" : ""} to reach ${nextTier}`
                        : "You've qualified!"}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Tier Benefits */}
              <Card data-testid="tier-benefits">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Gift className="h-5 w-5 text-accent" />
                    Tier Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {tiers.map((tier) => (
                      <div
                        key={tier}
                        className={`rounded-lg border p-4 ${
                          tier === member.tier ? "border-accent bg-accent/5" : "border-border"
                        }`}
                        data-testid={`benefits-${tier}`}
                      >
                        <div className="flex items-center gap-2">
                          <Star className={`h-4 w-4 ${tier === member.tier ? "text-accent" : "text-muted"}`} />
                          <h4 className="font-semibold capitalize text-foreground">{tier}</h4>
                          {tier === member.tier && (
                            <Badge variant="default" className="text-xs">Current</Badge>
                          )}
                        </div>
                        <ul className="mt-2 space-y-1">
                          {TIER_BENEFITS[tier].perks.map((perk) => (
                            <li key={perk} className="text-xs text-muted">
                              • {perk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card data-testid="points-history">
                <CardHeader>
                  <CardTitle className="text-lg">Points History</CardTitle>
                </CardHeader>
                <CardContent>
                  {transactions.length > 0 ? (
                    <div className="space-y-2">
                      {transactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
                          data-testid={`transaction-${tx.id}`}
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {tx.description}
                            </p>
                            <p className="text-xs text-muted">
                              {formatDate(tx.createdAt)} • {tx.type}
                            </p>
                          </div>
                          <span
                            className={`font-bold ${
                              tx.points > 0 ? "text-accent" : "text-destructive"
                            }`}
                          >
                            {tx.points > 0 ? "+" : ""}
                            {tx.points}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted">No transactions yet</p>
                  )}
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
