import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hotel, MapPin, Users, Award } from "lucide-react";

export const metadata = {
  title: "About Us — Bunkly",
};

const stats = [
  { label: "Properties Worldwide", value: "2,500+" },
  { label: "Countries", value: "85" },
  { label: "Guests Served", value: "1M+" },
  { label: "Average Rating", value: "4.8" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2.5">
              <Hotel className="h-6 w-6 text-foreground/40" />
              <span className="font-serif text-xl tracking-wide text-foreground/60">
                Bunkly
              </span>
            </div>
            <h1
              className="mt-8 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
              data-testid="about-title"
            >
              Redefining the art of{" "}
              <em className="not-italic text-foreground/70">hospitality</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-foreground/50">
              Bunkly was founded on a simple belief: every journey deserves
              an extraordinary place to call home. We curate the world&apos;s
              finest accommodations — from boutique city hotels to secluded
              coastal retreats — so you can focus on what matters most.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl font-medium text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-foreground/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Story */}
          <div className="mx-auto mt-20 max-w-3xl space-y-12">
            <div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-foreground/30" />
                <h2 className="font-serif text-2xl font-medium text-foreground">
                  Our Story
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/50">
                What began as a small collection of hand-picked boutique hotels
                has grown into a global platform connecting discerning travelers
                with exceptional properties. Every listing in our portfolio is
                personally vetted by our curation team, ensuring consistent
                quality, character, and service.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-foreground/30" />
                <h2 className="font-serif text-2xl font-medium text-foreground">
                  Our Team
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/50">
                Our team spans six continents, bringing together hospitality
                veterans, technology innovators, and passionate travelers. We are
                united by a shared commitment to creating seamless, memorable
                experiences for every guest.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-foreground/30" />
                <h2 className="font-serif text-2xl font-medium text-foreground">
                  Our Promise
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/50">
                We stand behind every booking with our best-price guarantee,
                24/7 concierge support, and a commitment to transparency. No
                hidden fees, no surprises — just exceptional stays, every time.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
