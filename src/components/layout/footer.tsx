import Link from "next/link";
import { Ornament } from "@/components/ui/ornament";

const sections: {
  heading: string;
  testidHeading: string;
  links: { href: string; label: string; testid: string }[];
}[] = [
  {
    heading: "The Houses",
    testidHeading: "footer-company-heading",
    links: [
      { href: "/search", label: "The Collection", testid: "footer-about-link" },
      { href: "/search", label: "New Openings", testid: "footer-careers-link" },
      { href: "/about", label: "About the House", testid: "footer-press-link" },
    ],
  },
  {
    heading: "Voyages",
    testidHeading: "footer-hosting-heading",
    links: [
      { href: "/host", label: "List Your Property", testid: "footer-host-link" },
      { href: "/host/resources", label: "Host Resources", testid: "footer-host-resources-link" },
      { href: "/host/community", label: "Community Forum", testid: "footer-host-community-link" },
    ],
  },
  {
    heading: "Reception",
    testidHeading: "footer-support-heading",
    links: [
      { href: "/help", label: "Concierge", testid: "footer-help-link" },
      { href: "/safety", label: "Safety & Comfort", testid: "footer-safety-link" },
      { href: "/cancellation", label: "Cancellation Options", testid: "footer-cancellation-link" },
    ],
  },
  {
    heading: "The House",
    testidHeading: "footer-legal-heading",
    links: [
      { href: "/privacy", label: "Privacy", testid: "footer-privacy-link" },
      { href: "/terms", label: "Terms of Service", testid: "footer-terms-link" },
      { href: "/accessibility", label: "Accessibility", testid: "footer-accessibility-link" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="border-t border-brass bg-parchment px-6 pb-8 pt-20 sm:px-10 lg:px-14"
      data-testid="footer"
    >
      <div className="mx-auto max-w-7xl">
        {/* Monogram + ornament */}
        <div className="text-center">
          <div
            className="font-serif text-[42px] sm:text-[48px] text-ink"
            style={{ letterSpacing: "0.2em" }}
          >
            BUNKLY
          </div>
          <div
            className="mt-2 font-caslon text-[12px] italic uppercase text-brass-deep"
            style={{ letterSpacing: "0.32em" }}
          >
            Travels of distinction &nbsp;&bull;&nbsp; Since MMXIV
          </div>
          <div className="mt-6">
            <Ornament />
          </div>
        </div>

        {/* Four-column link grid */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-4">
          {sections.map((section) => (
            <div key={section.heading} className="text-center">
              <h3
                className="font-serif text-[20px] text-ink"
                data-testid={section.testidHeading}
              >
                {section.heading}
              </h3>
              <div
                className="mt-2 font-caslon text-[11px] italic uppercase text-brass"
                style={{ letterSpacing: "0.26em" }}
                aria-hidden
              >
                ✦
              </div>
              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.testid}>
                    <Link
                      href={link.href}
                      className="font-caslon text-[14px] italic text-body-warm transition-colors hover:text-oxblood"
                      data-testid={link.testid}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div
          className="mt-16 border-t border-brass pt-6 text-center font-caslon text-[12px] italic uppercase text-brass-deep"
          style={{ letterSpacing: "0.24em" }}
          data-testid="footer-copyright"
        >
          &copy; MMXXVI &nbsp;&bull;&nbsp; Bunkly &amp; Co. &nbsp;&bull;&nbsp; A small family house of travel &nbsp;&bull;&nbsp; v0.2.0
        </div>
      </div>
    </footer>
  );
}
