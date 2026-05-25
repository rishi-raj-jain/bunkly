import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Accessibility, Monitor, Ear, Eye, Hand, Globe } from "lucide-react";

export const metadata = {
  title: "Accessibility — Bunkly",
};

const commitments = [
  {
    icon: Monitor,
    title: "Screen Reader Support",
    description:
      "Our platform is built with semantic HTML and ARIA attributes to ensure compatibility with popular screen readers.",
  },
  {
    icon: Eye,
    title: "Visual Accessibility",
    description:
      "High-contrast color schemes, resizable text, and clear visual hierarchy make our platform easy to navigate for users with low vision.",
  },
  {
    icon: Hand,
    title: "Keyboard Navigation",
    description:
      "Every feature on our platform is fully accessible via keyboard, with visible focus indicators and logical tab order.",
  },
  {
    icon: Ear,
    title: "Accessible Media",
    description:
      "Property descriptions provide text alternatives for images, ensuring all guests can understand what each property offers.",
  },
  {
    icon: Globe,
    title: "Accessible Property Search",
    description:
      "Filter search results by accessibility features like wheelchair access, elevator availability, and accessible bathrooms.",
  },
  {
    icon: Accessibility,
    title: "WCAG 2.1 Compliance",
    description:
      "We strive to meet WCAG 2.1 Level AA standards across our entire platform and continuously audit for compliance.",
  },
];

export default function AccessibilityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/40">
              Inclusive by Design
            </p>
            <h1
              className="mt-4 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
              data-testid="accessibility-title"
            >
              Accessibility
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light text-foreground/50">
              We believe exceptional hospitality starts with an experience
              everyone can enjoy. Our commitment to accessibility is ongoing.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <item.icon className="h-6 w-6 text-foreground/40" />
                  <h3 className="mt-4 font-serif text-lg font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/50">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-serif text-xl font-medium text-foreground">
              Feedback
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-foreground/50">
              We welcome feedback on the accessibility of our platform. If you
              encounter any barriers, please let us know so we can improve.
            </p>
            <p className="mt-4 text-sm text-foreground/60">
              accessibility@example.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
