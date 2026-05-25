import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Privacy Policy — Bunkly",
};

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly, such as your name, email address, phone number, and payment details when you create an account or make a booking. We also collect usage data automatically, including browser type, IP address, pages visited, and interaction patterns to improve our services.`,
  },
  {
    title: "How We Use Your Information",
    content: `Your information is used to process bookings, communicate with you about your reservations, provide customer support, personalize your experience, and send relevant updates about our services. We may also use anonymized, aggregated data for analytics and service improvement.`,
  },
  {
    title: "Information Sharing",
    content: `We share your booking details with the property you've reserved to fulfill your stay. We do not sell your personal information to third parties. We may share data with trusted service providers who assist in operating our platform (payment processors, email services) under strict confidentiality agreements.`,
  },
  {
    title: "Data Security",
    content: `We employ industry-standard security measures including encryption in transit and at rest, regular security audits, and access controls. Payment information is processed through PCI-DSS compliant partners and is never stored on our servers.`,
  },
  {
    title: "Cookies & Tracking",
    content: `We use essential cookies to maintain your session and preferences. Analytics cookies help us understand how guests use our platform. You can manage your cookie preferences through your browser settings at any time.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, correct, or delete your personal data. You may also request a copy of your data in a portable format or opt out of marketing communications at any time. To exercise these rights, contact us at privacy@example.com.`,
  },
  {
    title: "Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide services. Booking records are kept for seven years for legal and accounting purposes. You may request deletion of your account at any time.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this privacy policy from time to time. We will notify you of significant changes via email or a prominent notice on our platform. Continued use of our services after changes constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1
              className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
              data-testid="privacy-title"
            >
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-foreground/40">
              Last updated: March 1, 2026
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-foreground/50">
            Bunkly (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
            committed to protecting your privacy. This policy explains how we
            collect, use, and safeguard your personal information when you use
            our platform.
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
              Questions about this policy? Contact us at{" "}
              <span className="text-foreground/60">privacy@example.com</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
