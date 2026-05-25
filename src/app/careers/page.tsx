import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export const metadata = {
  title: "Careers — Bunkly",
};

const openings = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "New York, NY",
    type: "Full-time",
  },
  {
    title: "Property Curation Specialist",
    team: "Operations",
    location: "London, UK",
    type: "Full-time",
  },
  {
    title: "Customer Experience Lead",
    team: "Support",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Data Analyst",
    team: "Analytics",
    location: "San Francisco, CA",
    type: "Full-time",
  },
  {
    title: "Marketing Manager, APAC",
    team: "Marketing",
    location: "Singapore",
    type: "Full-time",
  },
];

const values = [
  {
    title: "Guest First",
    description: "Every decision starts with the guest experience.",
  },
  {
    title: "Craft Over Speed",
    description: "We take pride in thoughtful, lasting work.",
  },
  {
    title: "Global Mindset",
    description: "We build for travelers everywhere, by a team from everywhere.",
  },
  {
    title: "Transparent by Default",
    description: "Open communication inside and out.",
  },
];

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/40">
              Join Our Team
            </p>
            <h1
              className="mt-4 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
              data-testid="careers-title"
            >
              Careers at Bunkly
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light text-foreground/50">
              Help us shape the future of travel. We&apos;re looking for people
              who care deeply about craft, hospitality, and building something
              meaningful.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Values */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="font-serif text-base font-medium text-foreground">
                  {value.title}
                </h3>
                <p className="mt-1 text-sm text-foreground/40">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Openings */}
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-medium text-foreground">
              Open Positions
            </h2>
            <p className="mt-2 text-sm text-foreground/40">
              {openings.length} roles currently available
            </p>
            <div className="mt-8 space-y-3">
              {openings.map((role) => (
                <Card
                  key={role.title}
                  className="group transition-all hover:border-foreground/20"
                >
                  <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-medium text-foreground group-hover:text-foreground/80">
                        {role.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-sm text-foreground/40">
                        <span>{role.team}</span>
                        <span className="text-foreground/15">|</span>
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{role.location}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {role.type}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-foreground/40">
              Don&apos;t see the right role? Send us your resume at{" "}
              <span className="text-foreground/60">careers@example.com</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
