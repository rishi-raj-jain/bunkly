import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { priceAlerts, properties } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Bell, ArrowLeft, Tag } from "lucide-react";
import { PriceAlertActions } from "@/components/price-alert/price-alert-actions";

export const metadata = {
  title: "Price Alerts — Bunkly",
};

export default async function PriceAlertsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account/price-alerts");
  }

  const alerts = await db
    .select({
      id: priceAlerts.id,
      targetPrice: priceAlerts.targetPrice,
      checkIn: priceAlerts.checkIn,
      checkOut: priceAlerts.checkOut,
      isActive: priceAlerts.isActive,
      createdAt: priceAlerts.createdAt,
      propertyName: properties.name,
      propertySlug: properties.slug,
    })
    .from(priceAlerts)
    .innerJoin(properties, eq(priceAlerts.propertyId, properties.id))
    .where(eq(priceAlerts.userId, session.user.id));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <Link href="/account" className="text-muted hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-3xl font-bold text-foreground" data-testid="price-alerts-title">
                Price Alerts
              </h1>
            </div>
            <p className="mt-1 text-muted">
              {alerts.length} alert{alerts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          {alerts.length > 0 ? (
            <div className="space-y-3" data-testid="price-alerts-list">
              {alerts.map((alert) => (
                <Card key={alert.id} data-testid={`price-alert-${alert.id}`}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <Tag className="h-5 w-5 text-accent" />
                      <div>
                        <Link
                          href={`/properties/${alert.propertySlug}`}
                          className="font-medium text-foreground hover:text-accent"
                        >
                          {alert.propertyName}
                        </Link>
                        <p className="text-sm text-muted">
                          Target: {alert.targetPrice ? formatCurrency(parseFloat(alert.targetPrice)) : "—"} / night
                        </p>
                        {alert.checkIn && alert.checkOut && (
                          <p className="text-xs text-muted">
                            {formatDate(alert.checkIn)} — {formatDate(alert.checkOut)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={alert.isActive ? "default" : "secondary"}>
                        {alert.isActive ? "Active" : "Paused"}
                      </Badge>
                      <PriceAlertActions alertId={alert.id} isActive={alert.isActive!} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-secondary/50 py-16 text-center" data-testid="price-alerts-empty">
              <Bell className="mx-auto h-12 w-12 text-muted" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No price alerts</h3>
              <p className="mt-1 text-sm text-muted">
                Set alerts on properties to get notified when prices drop
              </p>
              <Link href="/search">
                <Button variant="accent" className="mt-6" data-testid="explore-properties-cta">
                  Explore Properties
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

