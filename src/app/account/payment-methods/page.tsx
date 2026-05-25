import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { paymentMethods } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CreditCard, ArrowLeft } from "lucide-react";
import { AddPaymentMethodDialog } from "@/components/account/add-payment-method-dialog";
import { PaymentMethodActions } from "@/components/account/payment-method-actions";

export const metadata = {
  title: "Payment Methods — Bunkly",
};

export default async function PaymentMethodsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account/payment-methods");
  }

  const methods = await db
    .select()
    .from(paymentMethods)
    .where(eq(paymentMethods.userId, session.user.id));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Link href="/account" className="text-muted hover:text-foreground">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-3xl font-bold text-foreground" data-testid="payment-methods-title">
                  Payment Methods
                </h1>
              </div>
              <p className="mt-1 text-muted">
                {methods.length} saved card{methods.length !== 1 ? "s" : ""}
              </p>
            </div>
            <AddPaymentMethodDialog />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          {methods.length > 0 ? (
            <div className="space-y-3" data-testid="payment-methods-list">
              {methods.map((method) => (
                <Card key={method.id} data-testid={`payment-method-${method.id}`}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8 text-muted" />
                      <div>
                        <p className="font-medium text-foreground">
                          {method.cardBrand} ••••{method.cardLast4}
                        </p>
                        <p className="text-sm text-muted capitalize">{method.type?.replace("_", " ")}</p>
                      </div>
                      {method.isDefault && (
                        <Badge variant="default" data-testid={`default-badge-${method.id}`}>
                          Default
                        </Badge>
                      )}
                    </div>
                    <PaymentMethodActions
                      methodId={method.id}
                      isDefault={method.isDefault || false}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-secondary/50 py-16 text-center" data-testid="payment-methods-empty">
              <CreditCard className="mx-auto h-12 w-12 text-muted" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No payment methods</h3>
              <p className="mt-1 text-sm text-muted">
                Add a card to make booking easier
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
