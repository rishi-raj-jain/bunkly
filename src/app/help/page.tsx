import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CreditCard,
  CalendarX,
  Home,
  Shield,
  Globe,
  HelpCircle,
} from "lucide-react";

export const metadata = {
  title: "Help Center — Bunkly",
};

const topics = [
  {
    icon: CalendarX,
    title: "Booking & Reservations",
    description:
      "How to book, modify, or cancel your reservation. Manage your upcoming stays.",
  },
  {
    icon: CreditCard,
    title: "Payments & Refunds",
    description:
      "Accepted payment methods, billing questions, and refund timelines.",
  },
  {
    icon: Home,
    title: "Property & Room Info",
    description:
      "Amenities, check-in/check-out times, accessibility features, and property policies.",
  },
  {
    icon: Shield,
    title: "Account & Security",
    description:
      "Password resets, two-factor authentication, and account management.",
  },
  {
    icon: Globe,
    title: "Bunkly Rewards",
    description:
      "Points balance, tier status, earning and redeeming rewards.",
  },
  {
    icon: HelpCircle,
    title: "General Inquiries",
    description:
      "Everything else — we're here to help with any questions you may have.",
  },
];

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/40">
              Support
            </p>
            <h1
              className="mt-4 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
              data-testid="help-title"
            >
              Help Center
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light text-foreground/50">
              Find answers, get in touch, or browse our most common topics
              below.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Card
                key={topic.title}
                className="group transition-all hover:border-foreground/20"
              >
                <CardContent className="p-6">
                  <topic.icon className="h-6 w-6 text-foreground/40 transition-colors group-hover:text-foreground/70" />
                  <h3 className="mt-4 font-serif text-lg font-medium text-foreground">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/50">
                    {topic.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20">
            <h2 className="text-center font-serif text-2xl font-medium text-foreground">
              Contact Us
            </h2>
            <p className="mt-2 text-center text-sm text-foreground/50">
              Our concierge team is available around the clock
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <Phone className="mx-auto h-5 w-5 text-foreground/40" />
                  <h3 className="mt-3 text-sm font-medium text-foreground">
                    Phone
                  </h3>
                  <p className="mt-1 text-sm text-foreground/50">
                    +1 (800) 555-8659
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Mail className="mx-auto h-5 w-5 text-foreground/40" />
                  <h3 className="mt-3 text-sm font-medium text-foreground">
                    Email
                  </h3>
                  <p className="mt-1 text-sm text-foreground/50">
                    support@example.com
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="mx-auto h-5 w-5 text-foreground/40" />
                  <h3 className="mt-3 text-sm font-medium text-foreground">
                    Live Chat
                  </h3>
                  <p className="mt-1 text-sm text-foreground/50">
                    Available 24/7
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-foreground/30">
              <Clock className="h-3.5 w-3.5" />
              <span>Average response time: under 5 minutes</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
