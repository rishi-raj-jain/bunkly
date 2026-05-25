import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Terms of Service — Bunkly",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using Bunkly's platform, you agree to be bound by these Terms of Service. If you do not agree, you may not use our services. We reserve the right to update these terms at any time, with notice provided through our platform.`,
  },
  {
    title: "Account Registration",
    content: `You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account. You must be at least 18 years old to create an account and make bookings.`,
  },
  {
    title: "Bookings & Reservations",
    content: `When you complete a booking, you enter into a direct agreement with the property host for the accommodation described. Bunkly acts as an intermediary platform facilitating this transaction. All bookings are subject to availability and the specific terms set by each property.`,
  },
  {
    title: "Payments",
    content: `Payment is collected at the time of booking unless otherwise specified. All prices are displayed in the selected currency and include applicable taxes and fees shown at checkout. You agree to pay all charges associated with your booking, including any additional fees for extra services or damages.`,
  },
  {
    title: "Cancellations & Refunds",
    content: `Cancellation terms vary by property and are clearly displayed before you confirm your booking. Refunds are processed according to the applicable cancellation policy. Processing times for refunds vary by payment method but typically take 5–10 business days.`,
  },
  {
    title: "Guest Responsibilities",
    content: `As a guest, you agree to treat the property with respect, adhere to house rules set by the host, and leave the property in reasonable condition. You are financially responsible for any damage caused during your stay beyond normal wear and tear.`,
  },
  {
    title: "Intellectual Property",
    content: `All content on the Bunkly platform — including text, graphics, logos, and software — is the property of Bunkly or its licensors. You may not reproduce, distribute, or create derivative works without our written permission.`,
  },
  {
    title: "Limitation of Liability",
    content: `Bunkly provides a platform connecting guests with property hosts. We are not liable for the condition of any property, the actions of hosts or guests, or any indirect, incidental, or consequential damages arising from the use of our services.`,
  },
  {
    title: "Dispute Resolution",
    content: `Any disputes arising from these terms or your use of our services will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You agree to waive your right to participate in class action lawsuits.`,
  },
  {
    title: "Governing Law",
    content: `These terms are governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.`,
  },
];

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1
              className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
              data-testid="terms-title"
            >
              Terms of Service
            </h1>
            <p className="mt-4 text-sm text-foreground/40">
              Last updated: March 1, 2026
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-foreground/50">
            Welcome to Bunkly. These Terms of Service govern your use of our
            platform and services. Please read them carefully before using our
            website or making a booking.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section, i) => (
              <div key={section.title}>
                <h2 className="font-serif text-xl font-medium text-foreground">
                  {i + 1}. {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/50">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-border pt-8 text-sm text-foreground/40">
            <p>
              Questions about these terms? Contact us at{" "}
              <span className="text-foreground/60">legal@example.com</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
