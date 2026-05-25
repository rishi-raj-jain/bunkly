import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Cancellation Options — Bunkly",
};

const policies = [
  {
    name: "Free Cancellation",
    badge: "Most Flexible",
    description:
      "Cancel up to 24 hours before check-in for a full refund. Perfect for travelers who value flexibility.",
    details: [
      "Full refund if cancelled 24+ hours before check-in",
      "No refund for no-shows or same-day cancellations",
      "Refund processed within 5–10 business days",
    ],
  },
  {
    name: "Moderate",
    badge: "Balanced",
    description:
      "Cancel up to 5 days before check-in for a full refund, or receive a 50% refund for later cancellations.",
    details: [
      "Full refund if cancelled 5+ days before check-in",
      "50% refund if cancelled less than 5 days before check-in",
      "No refund for no-shows",
    ],
  },
  {
    name: "Strict",
    badge: "Best Rates",
    description:
      "Cancel at least 7 days before check-in for a 50% refund. Often paired with the lowest available rates.",
    details: [
      "50% refund if cancelled 7+ days before check-in",
      "No refund if cancelled less than 7 days before check-in",
      "No refund for no-shows",
    ],
  },
  {
    name: "Non-Refundable",
    badge: "Lowest Price",
    description:
      "Locked-in rate with no cancellation refund. Ideal when you are certain of your travel dates.",
    details: [
      "No refund for cancellations at any time",
      "Booking modifications may be available at some properties",
      "Travel insurance is recommended",
    ],
  },
];

export default function CancellationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/40">
              Flexibility & Peace of Mind
            </p>
            <h1
              className="mt-4 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
              data-testid="cancellation-title"
            >
              Cancellation Options
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light text-foreground/50">
              We offer a range of cancellation policies so you can book with
              confidence, no matter your plans.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {policies.map((policy) => (
              <Card key={policy.name}>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-foreground">
                        {policy.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/50">
                        {policy.description}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {policy.badge}
                    </Badge>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {policy.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-sm text-foreground/40"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/20" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center text-sm text-foreground/40">
            <p>
              The specific cancellation policy for your booking is shown during
              checkout and in your booking confirmation email.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
