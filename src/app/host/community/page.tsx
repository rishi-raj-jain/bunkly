import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  Calendar,
  Award,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "Community Forum — Bunkly",
};

const categories = [
  {
    icon: MessageSquare,
    title: "General Discussion",
    description: "Connect with fellow hosts, share experiences, and ask questions.",
    topics: 342,
    posts: "2.1K",
  },
  {
    icon: Award,
    title: "Best Practices",
    description: "Proven strategies from top-rated hosts around the world.",
    topics: 189,
    posts: "1.4K",
  },
  {
    icon: Calendar,
    title: "Events & Meetups",
    description: "Local host gatherings, webinars, and Bunkly conferences.",
    topics: 56,
    posts: "430",
  },
  {
    icon: Users,
    title: "New Hosts",
    description: "Getting started? Find mentorship and onboarding tips here.",
    topics: 278,
    posts: "1.8K",
  },
];

export default function HostCommunityPage() {
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
              data-testid="host-community-title"
            >
              Community Forum
            </h1>
            <p className="mt-4 max-w-xl text-lg font-light text-foreground/50">
              A space for hosts to learn from each other, share insights, and
              grow together.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {categories.map((category) => (
              <Card
                key={category.title}
                className="group transition-all hover:border-foreground/20"
              >
                <CardContent className="flex items-start gap-4 p-6">
                  <category.icon className="mt-0.5 h-6 w-6 shrink-0 text-foreground/40 transition-colors group-hover:text-foreground/70" />
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-medium text-foreground">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/50">
                      {category.description}
                    </p>
                  </div>
                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-sm text-foreground/60">
                      {category.topics} topics
                    </p>
                    <p className="text-xs text-foreground/30">
                      {category.posts} posts
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center text-sm text-foreground/40">
            <p>
              Community guidelines apply to all posts. Be respectful and
              constructive.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
