import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export const metadata = {
  title: "Press — Bunkly",
};

const pressItems = [
  {
    date: "March 2026",
    source: "Travel + Leisure",
    headline: "Bunkly Expands Luxury Portfolio with 200 New Properties in Asia-Pacific",
  },
  {
    date: "January 2026",
    source: "Bloomberg",
    headline: "How Bunkly Is Redefining Boutique Hospitality for the Modern Traveler",
  },
  {
    date: "November 2025",
    source: "Condé Nast Traveler",
    headline: "The 10 Best Hotel Booking Platforms of 2025 — Bunkly Takes the Top Spot",
  },
  {
    date: "September 2025",
    source: "Forbes",
    headline: "Bunkly Raises $85M Series C to Fuel Global Expansion",
  },
  {
    date: "June 2025",
    source: "The New York Times",
    headline: "A New Wave of Hotel Platforms Puts Curation Over Quantity",
  },
];

export default function PressPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/40">
              Newsroom
            </p>
            <h1
              className="mt-4 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
              data-testid="press-title"
            >
              Press
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light text-foreground/50">
              The latest news, announcements, and media coverage about Bunkly.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {pressItems.map((item) => (
              <Card key={item.headline}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-xs text-foreground/30">
                    <span>{item.date}</span>
                    <span className="text-foreground/15">|</span>
                    <span className="text-foreground/50">{item.source}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-medium leading-snug text-foreground">
                    {item.headline}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 rounded-lg border border-border bg-secondary/50 p-8 text-center">
            <Mail className="mx-auto h-5 w-5 text-foreground/40" />
            <h2 className="mt-4 font-serif text-xl font-medium text-foreground">
              Media Inquiries
            </h2>
            <p className="mt-2 text-sm text-foreground/50">
              For press inquiries, interviews, or media assets, please contact
              our communications team.
            </p>
            <p className="mt-4 text-sm text-foreground/60">
              press@example.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
