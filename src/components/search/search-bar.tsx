"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  const [guests, setGuests] = useState(searchParams.get("guests") || "2");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    router.push(`/search?${params.toString()}`);
  }

  const fieldLabel =
    "font-caslon text-[11px] italic uppercase text-brass-deep";

  const fieldInput =
    "w-full border-0 bg-transparent p-0 font-serif text-[18px] text-ink placeholder:italic placeholder:text-brass-deep/70 focus:outline-none focus:ring-0";

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto flex w-full max-w-[1280px] flex-col border border-brass bg-ivory shadow-rosewood-card sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:items-stretch"
      data-testid="search-bar"
    >
      {/* Destination */}
      <div className="flex-1 border-b border-brass-light px-6 py-4 text-left sm:border-b-0 sm:border-r">
        <label
          htmlFor="destination"
          className={fieldLabel}
          style={{ letterSpacing: "0.22em" }}
        >
          Destination
        </label>
        <input
          id="destination"
          type="text"
          placeholder="Where shall we go?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className={`${fieldInput} mt-1`}
          data-testid="search-destination"
        />
      </div>

      {/* Check-in */}
      <div className="flex-1 border-b border-brass-light px-6 py-4 text-left sm:border-b-0 sm:border-r">
        <label
          htmlFor="check-in"
          className={fieldLabel}
          style={{ letterSpacing: "0.22em" }}
        >
          Arrival
        </label>
        <input
          id="check-in"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className={`${fieldInput} mt-1`}
          data-testid="search-checkin"
        />
      </div>

      {/* Check-out */}
      <div className="flex-1 border-b border-brass-light px-6 py-4 text-left sm:border-b-0 sm:border-r">
        <label
          htmlFor="check-out"
          className={fieldLabel}
          style={{ letterSpacing: "0.22em" }}
        >
          Departure
        </label>
        <input
          id="check-out"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className={`${fieldInput} mt-1`}
          data-testid="search-checkout"
        />
      </div>

      {/* Guests */}
      <div className="flex-1 border-b border-brass-light px-6 py-4 text-left sm:border-b-0">
        <label
          htmlFor="guests"
          className={fieldLabel}
          style={{ letterSpacing: "0.22em" }}
        >
          Guests
        </label>
        <input
          id="guests"
          type="number"
          min="1"
          max="16"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className={`${fieldInput} mt-1`}
          data-testid="search-guests"
        />
      </div>

      {/* Enquire Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        className="h-auto w-full sm:w-auto"
        data-testid="search-submit"
      >
        Enquire ✦
      </Button>
    </form>
  );
}
