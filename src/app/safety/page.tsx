import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  Phone,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "Safety Information — Bunkly",
};

const safetyFeatures = [
  {
    icon: Shield,
    title: "Verified Properties",
    description:
      "Every property on Bunkly undergoes a thorough verification process including on-site inspections, safety certifications, and compliance with local regulations.",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description:
      "All payments are processed through PCI-DSS compliant systems with end-to-end encryption. Your financial information is never shared with property hosts.",
  },
  {
    icon: Eye,
    title: "Reviewed & Rated",
    description:
      "Authentic guest reviews help you make informed decisions. Our moderation team ensures reviews are genuine and helpful.",
  },
  {
    icon: AlertTriangle,
    title: "24/7 Emergency Support",
    description:
      "Our safety team is available around the clock. If you experience any issues during your stay, immediate assistance is just a call away.",
  },
  {
    icon: CheckCircle,
    title: "Health & Hygiene Standards",
    description:
      "All listed properties adhere to enhanced cleaning protocols and hygiene standards, regularly audited for compliance.",
  },
  {
    icon: Phone,
    title: "Local Emergency Info",
    description:
      "Each booking includes local emergency contact numbers, nearest hospital information, and embassy details for international travelers.",
  },
];

export default function SafetyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/40">
              Your Security Matters
            </p>
            <h1
              className="mt-4 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
              data-testid="safety-title"
            >
              Safety Information
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light text-foreground/50">
              Your safety and peace of mind are our highest priorities. Learn
              about the measures we take to protect every guest.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {safetyFeatures.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <feature.icon className="h-6 w-6 text-foreground/40" />
                  <h3 className="mt-4 font-serif text-lg font-medium text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/50">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 rounded-lg border border-border bg-secondary/50 p-8 text-center">
            <AlertTriangle className="mx-auto h-6 w-6 text-foreground/40" />
            <h2 className="mt-4 font-serif text-xl font-medium text-foreground">
              Report a Safety Concern
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-foreground/50">
              If you feel unsafe or need to report an issue, contact our
              dedicated safety line immediately.
            </p>
            <p className="mt-4 text-lg font-medium text-foreground">
              +1 (800) 555-SAFE
            </p>
            <p className="mt-1 text-xs text-foreground/30">
              Available 24 hours a day, 7 days a week
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
