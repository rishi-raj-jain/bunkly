import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchBar } from "@/components/search/search-bar";
import { PopularDestinations } from "@/components/search/popular-destinations";
import { Ornament } from "@/components/ui/ornament";

const HOUSES = [
  {
    id: "amangiri",
    slug: "amangiri",
    name: "Amangiri",
    location: "Canyon Point, Utah",
    category: "Desert Sanctuary",
    tagline: "Monolithic refuge carved into ancient desert rock",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    suites: 34,
    price: 3200,
    rating: 4.98,
  },
  {
    id: "raffles-paris",
    slug: "raffles-le-royal",
    name: "Raffles Le Royal",
    location: "Place Vendôme, Paris",
    category: "Historic Palace",
    tagline: "Belle Époque grandeur on Paris's most storied square",
    img: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=1200&q=80",
    suites: 149,
    price: 2450,
    rating: 4.96,
  },
  {
    id: "hoshinoya",
    slug: "hoshinoya-kyoto",
    name: "Hoshinoya Kyoto",
    location: "Arashiyama, Kyoto",
    category: "Riverside Ryokan",
    tagline: "A riverside ryokan reached only by private boat",
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80",
    suites: 25,
    price: 1880,
    rating: 4.99,
  },
  {
    id: "the-beaumont",
    slug: "the-beaumont",
    name: "The Beaumont",
    location: "Mayfair, London",
    category: "Art-Deco Townhouse",
    tagline: "Art-deco townhouse with a sculpted Antony Gormley suite",
    img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80",
    suites: 73,
    price: 1650,
    rating: 4.92,
  },
];

const numerals = ["i", "ii", "iii", "iv"];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative bg-ivory px-6 pb-24 pt-16 text-center sm:px-10 lg:px-14"
          data-testid="hero"
        >
          <div
            className="font-caslon text-[13px] italic uppercase text-brass-deep"
            style={{ letterSpacing: "0.3em" }}
          >
            The Spring Register &nbsp;&bull;&nbsp; Volume Four
          </div>
          <h1
            className="mx-auto mt-5 max-w-[1400px] font-serif text-ink"
            style={{
              fontSize: "clamp(56px, 9vw, 156px)",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.015em",
            }}
            data-testid="hero-title"
          >
            The <em className="not-italic text-oxblood">grand</em> hotels,
            <br />
            <span className="italic">kept beautifully.</span>
          </h1>
          <div className="my-9">
            <Ornament />
          </div>
          <p
            className="mx-auto max-w-2xl font-caslon text-[18px] italic leading-relaxed text-body-warm sm:text-[19px]"
            data-testid="hero-subtitle"
          >
            Forty-one legendary houses &mdash; from Place Vendôme to the
            Amalfi coast &mdash; reserved for a small, considerate clientele.
            Since 2014.
          </p>

          {/* Featured house image with floating card */}
          <div className="relative mt-16">
            <div className="mx-auto max-w-[1400px] overflow-hidden border border-brass">
              <div className="relative aspect-[21/9] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1549294413-26f195200c16?w=2000&q=85"
                  alt="Featured house at Place Vendôme"
                  fill
                  className="rosewood-photo object-cover"
                  priority
                  sizes="(max-width: 1400px) 100vw, 1400px"
                />
              </div>
            </div>
            <Link
              href="/search"
              className="absolute left-1/2 top-1/2 w-[420px] max-w-[86vw] -translate-x-1/2 -translate-y-1/2 border border-brass bg-ivory px-10 py-8 text-center shadow-rosewood-float transition-colors hover:border-oxblood sm:px-14"
              data-testid="featured-house-card"
            >
              <div
                className="font-caslon text-[11px] italic uppercase text-brass-deep"
                style={{ letterSpacing: "0.3em" }}
              >
                Featured House &mdash; Nº iv
              </div>
              <div className="mt-2 font-serif text-[38px] text-ink sm:text-[44px]" style={{ letterSpacing: "-0.01em" }}>
                Raffles Le Royal
              </div>
              <div className="mt-1 font-caslon text-[15px] italic text-oxblood">
                Place Vendôme, Paris
              </div>
              <div className="my-4">
                <Ornament width={120} />
              </div>
              <div
                className="font-caslon text-[13px] uppercase text-ink"
                style={{ letterSpacing: "0.22em" }}
              >
                Reserve &nbsp;·&nbsp; from $2,450
              </div>
            </Link>
          </div>
        </section>

        {/* Reservations Desk */}
        <section
          className="bg-parchment px-6 py-14 text-center sm:px-10 lg:px-14"
          data-testid="reservations-desk"
        >
          <div
            className="font-caslon text-[12px] italic uppercase text-brass-deep"
            style={{ letterSpacing: "0.32em" }}
          >
            Reservations Desk
          </div>
          <h2
            className="mt-3 font-serif text-ink"
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            Pray, <em>where shall we go?</em>
          </h2>
          <div className="mx-auto mt-8 max-w-[1280px]">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>
        </section>

        {/* Chapter the First — Legendary Houses */}
        <section
          className="bg-ivory px-6 py-24 sm:px-10 lg:px-14 lg:py-28"
          data-testid="legendary-houses"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="text-center">
              <div
                className="font-caslon text-[13px] italic uppercase text-brass-deep"
                style={{ letterSpacing: "0.3em" }}
              >
                Chapter the First
              </div>
              <h2
                className="mt-4 font-serif text-ink"
                style={{
                  fontSize: "clamp(40px, 6vw, 72px)",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                }}
              >
                Of certain <em className="text-oxblood">legendary</em> houses
              </h2>
              <div className="mt-6">
                <Ornament />
              </div>
            </div>

            <div className="mt-16 grid gap-14 lg:grid-cols-2">
              {HOUSES.map((h, i) => (
                <Link
                  key={h.id}
                  href={`/properties/${h.slug}`}
                  className="group block border border-brass bg-ivory-warm p-5 shadow-rosewood-card transition-all duration-300 hover:-translate-y-1 hover:shadow-rosewood-card-hover"
                  data-testid={`house-card-${h.slug}`}
                >
                  <div className="relative h-[360px] overflow-hidden sm:h-[420px]">
                    <Image
                      src={h.img}
                      alt={h.name}
                      fill
                      className="rosewood-photo object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                      sizes="(max-width: 1024px) 100vw, 700px"
                    />
                    <div
                      className="absolute bottom-4 left-4 border border-brass bg-ivory px-3 py-1.5 font-caslon text-[11px] italic uppercase text-ink"
                      style={{ letterSpacing: "0.22em" }}
                    >
                      House Nº {numerals[i]}
                    </div>
                  </div>
                  <div className="px-4 pt-6 text-center pb-3">
                    <div
                      className="font-caslon text-[11px] italic uppercase text-brass-deep"
                      style={{ letterSpacing: "0.26em" }}
                    >
                      {h.category}
                    </div>
                    <h3
                      className="mt-2 font-serif text-[36px] text-ink sm:text-[44px]"
                      style={{ letterSpacing: "-0.01em", fontWeight: 400 }}
                    >
                      {h.name}
                    </h3>
                    <div className="mt-1 font-caslon text-[15px] italic text-oxblood">
                      {h.location}
                    </div>
                    <div className="my-5">
                      <Ornament width={100} />
                    </div>
                    <p className="mx-auto max-w-md font-caslon text-[16px] leading-relaxed text-body-warm">
                      {h.tagline}.
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 border-t border-brass-light pt-5 text-center">
                    {[
                      ["Suites", h.suites.toString()],
                      ["From", `$${h.price.toLocaleString()}`],
                      ["Esteem", `★ ${h.rating}`],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <div
                          className="font-caslon text-[10px] italic uppercase text-brass-deep"
                          style={{ letterSpacing: "0.24em" }}
                        >
                          {k}
                        </div>
                        <div className="mt-1 font-serif text-[20px] text-ink">{v}</div>
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter the Second — Destinations (inverted) */}
        <section
          className="bg-ink px-6 py-28 text-ivory sm:px-10 lg:px-14"
          data-testid="destinations-section"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="text-center">
              <div
                className="font-caslon text-[13px] italic uppercase text-brass-light"
                style={{ letterSpacing: "0.32em" }}
              >
                Chapter the Second
              </div>
              <h2
                className="mt-4 font-serif"
                style={{
                  fontSize: "clamp(40px, 6vw, 72px)",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                }}
              >
                Where <em className="text-brass-light">the compass</em> points
              </h2>
              <div className="mt-6">
                <Ornament color="#d4b88a" />
              </div>
            </div>

            <div className="mt-16">
              <PopularDestinations />
            </div>
          </div>
        </section>

        {/* Service pull quote */}
        <section
          className="bg-ivory px-6 py-28 text-center sm:px-10 lg:px-14"
          data-testid="service-section"
        >
          <div className="mx-auto max-w-3xl">
            <div
              className="font-caslon text-[13px] italic uppercase text-brass-deep"
              style={{ letterSpacing: "0.3em" }}
            >
              A word on service
            </div>
            <blockquote
              className="mt-6 font-serif italic text-ink"
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                lineHeight: 1.35,
                letterSpacing: "-0.005em",
                fontWeight: 400,
              }}
            >
              &ldquo;Each Voyage is orchestrated by a named concierge &mdash; the
              same person who will, if you wish, arrange a private tour of the
              Uffizi at dusk, or simply post a letter.&rdquo;
            </blockquote>
            <div className="mt-8">
              <Ornament />
            </div>
            <div
              className="mt-8 font-caslon text-[14px] italic uppercase text-oxblood"
              style={{ letterSpacing: "0.2em" }}
            >
              &mdash; Mme. S. Ravel, Chief Concierge
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
