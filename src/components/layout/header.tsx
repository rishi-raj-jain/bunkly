"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, Heart, Bell, MessageSquare } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="bg-ivory border-b border-brass"
      data-testid="header"
    >
      <div className="px-6 pb-4 pt-5 sm:px-10 lg:px-14">
        {/* Centered wordmark */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block"
            data-testid="logo"
          >
            <span
              className="block font-serif text-[32px] sm:text-[36px] text-ink"
              style={{ letterSpacing: "0.16em", fontWeight: 500 }}
            >
              BUNKLY
            </span>
          </Link>
          <div
            className="mt-1 font-caslon text-[11px] italic uppercase text-brass-deep"
            style={{ letterSpacing: "0.3em" }}
          >
            Established &nbsp;&bull;&nbsp; MMXXVI
          </div>
        </div>

        {/* Desktop nav bar — centered links with brass rule */}
        <nav
          className="mt-4 hidden items-center justify-center gap-6 border-t border-brass-light pt-4 font-caslon text-[11px] uppercase text-ink lg:flex xl:gap-10"
          style={{ letterSpacing: "0.24em" }}
          data-testid="desktop-nav"
        >
          <Link
            href="/search"
            className="hover:text-oxblood transition-colors"
            data-testid="nav-search"
          >
            The Houses
          </Link>
          <Link
            href="/search"
            className="hover:text-oxblood transition-colors"
            data-testid="nav-destinations"
          >
            Destinations
          </Link>
          <Link
            href="/about"
            className="hover:text-oxblood transition-colors"
            data-testid="nav-about"
          >
            The House
          </Link>
          <Link
            href="/help"
            className="hover:text-oxblood transition-colors"
            data-testid="nav-concierge"
          >
            Concierge
          </Link>
          <span className="text-brass" aria-hidden>
            ✦
          </span>
          <Link
            href="/messages"
            className="flex items-center gap-1.5 hover:text-oxblood transition-colors"
            data-testid="nav-messages"
          >
            <MessageSquare className="h-[13px] w-[13px]" />
            Messages
          </Link>
          <Link
            href="/account/wishlists"
            className="flex items-center gap-1.5 hover:text-oxblood transition-colors"
            data-testid="nav-wishlists"
          >
            <Heart className="h-[13px] w-[13px]" />
            Wishlists
          </Link>
          <Link
            href="/account/notifications"
            className="flex items-center gap-1.5 hover:text-oxblood transition-colors"
            data-testid="nav-notifications"
          >
            <Bell className="h-[13px] w-[13px]" />
            Notices
          </Link>
          <Link
            href="/bookings"
            className="hover:text-oxblood transition-colors"
            data-testid="nav-bookings"
          >
            My Voyages
          </Link>
          <Link
            href="/account"
            className="flex items-center gap-1.5 hover:text-oxblood transition-colors"
            data-testid="nav-account"
          >
            <User className="h-[13px] w-[13px]" />
            Account
          </Link>
          <Link
            href="/login"
            className="text-oxblood hover:text-ink transition-colors"
            data-testid="nav-login"
          >
            Reserve a Suite
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="absolute right-4 top-6 text-ink lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav
          className="border-t border-brass-light bg-ivory px-6 py-6 lg:hidden"
          data-testid="mobile-nav"
        >
          <div className="flex flex-col gap-1 font-caslon text-[12px] uppercase text-ink" style={{ letterSpacing: "0.22em" }}>
            {[
              ["/search", "The Houses", "search"],
              ["/search", "Destinations", "destinations"],
              ["/bookings", "My Voyages", "bookings"],
              ["/messages", "Messages", "messages"],
              ["/account/wishlists", "Wishlists", "wishlists"],
              ["/account/notifications", "Notices", "notifications"],
              ["/account/payment-methods", "Payment Methods", "payment-methods"],
              ["/account/reviews", "My Reviews", "reviews"],
              ["/account/price-alerts", "Price Alerts", "price-alerts"],
              ["/account", "Account", "account"],
            ].map(([href, label, key]) => (
              <Link
                key={key}
                href={href}
                className="px-3 py-3 hover:text-oxblood"
                data-testid={`mobile-nav-${key}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <hr className="my-3 border-brass-light" />
            <Link
              href="/login"
              className="px-3 py-3 text-oxblood hover:text-ink"
              data-testid="mobile-nav-login"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reserve a Suite
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
