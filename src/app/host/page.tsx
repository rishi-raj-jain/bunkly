import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Hotel,
  Globe,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";

export const metadata = {
  title: "List Your Property — Bunkly",
};

const benefits = [
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Reach over one million travelers worldwide searching for curated accommodations.",
  },
  {
    icon: TrendingUp,
    title: "Optimized Pricing",
    description:
      "Our smart pricing tools help you maximize revenue based on demand, seasonality, and local events.",
  },
  {
    icon: Shield,
    title: "Host Protection",
    description:
      "Comprehensive liability coverage and secure payment processing for every booking.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "A personal account manager and 24/7 host support line to help you succeed.",
  },
];

const steps = [
  {
    step: "01",
    title: "Create Your Listing",
    description: "Add your property details, photos, and set your availability.",
  },
  {
    step: "02",
    title: "Get Verified",
    description:
      "Our curation team reviews your property to ensure it meets our quality standards.",
  },
  {
    step: "03",
    title: "Start Hosting",
    description:
      "Once approved, your property goes live and you begin receiving bookings.",
  },
];

export default function HostPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/40">
              Become a Host
            </p>
            <h1
              className="mt-4 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
              data-testid="host-title"
            >
              List your property on{" "}
              <span className="text-foreground/70">Bunkly</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light text-foreground/50">
              Join our curated collection of exceptional properties and connect
              with travelers who appreciate quality.
            </p>
            <Link href="/register">
              <Button className="mt-8" size="lg" data-testid="get-started-btn">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Benefits */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <benefit.icon className="mx-auto h-6 w-6 text-foreground/40" />
                <h3 className="mt-4 font-serif text-base font-medium text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/50">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="mt-20">
            <h2 className="text-center font-serif text-2xl font-medium text-foreground">
              How It Works
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {steps.map((s) => (
                <Card key={s.step}>
                  <CardContent className="p-6">
                    <span className="text-xs font-medium tracking-widest text-foreground/20">
                      {s.step}
                    </span>
                    <h3 className="mt-3 font-serif text-lg font-medium text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/50">
                      {s.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 rounded-lg border border-border bg-secondary/50 p-10 text-center">
            <Hotel className="mx-auto h-6 w-6 text-foreground/40" />
            <h2 className="mt-4 font-serif text-xl font-medium text-foreground">
              Ready to host?
            </h2>
            <p className="mt-2 text-sm text-foreground/50">
              It takes less than 10 minutes to create your first listing.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link href="/register">
                <Button data-testid="start-listing-btn">
                  Start Your Listing
                </Button>
              </Link>
              <Link href="/host/resources">
                <Button variant="outline">View Host Resources</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
