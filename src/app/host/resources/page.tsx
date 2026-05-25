import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Camera,
  DollarSign,
  Star,
  FileText,
  BarChart,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "Host Resources — Bunkly",
};

const resources = [
  {
    icon: Camera,
    title: "Photography Guide",
    description:
      "Tips for capturing stunning property photos that attract more bookings. Lighting, composition, and staging advice from professionals.",
  },
  {
    icon: DollarSign,
    title: "Pricing Strategy",
    description:
      "How to set competitive rates, use dynamic pricing, and optimize for seasonal demand to maximize your revenue.",
  },
  {
    icon: Star,
    title: "5-Star Guest Experience",
    description:
      "Best practices for welcoming guests, maintaining quality, and earning top reviews consistently.",
  },
  {
    icon: FileText,
    title: "Listing Optimization",
    description:
      "Write compelling descriptions, choose the right amenities to highlight, and make your listing stand out in search results.",
  },
  {
    icon: BarChart,
    title: "Performance Analytics",
    description:
      "Understand your dashboard metrics — views, conversion rate, occupancy, and revenue trends.",
  },
  {
    icon: MessageSquare,
    title: "Guest Communication",
    description:
      "Templates and tips for pre-arrival messages, check-in instructions, and handling special requests.",
  },
];

export default function HostResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/host"
              className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/60 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Hosting
            </Link>
            <h1
              className="mt-4 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
              data-testid="host-resources-title"
            >
              Host Resources
            </h1>
            <p className="mt-4 max-w-xl text-lg font-light text-foreground/50">
              Everything you need to create an exceptional listing and deliver
              a memorable guest experience.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Card
                key={resource.title}
                className="group transition-all hover:border-foreground/20"
              >
                <CardContent className="p-6">
                  <resource.icon className="h-6 w-6 text-foreground/40 transition-colors group-hover:text-foreground/70" />
                  <h3 className="mt-4 font-serif text-lg font-medium text-foreground">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/50">
                    {resource.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
