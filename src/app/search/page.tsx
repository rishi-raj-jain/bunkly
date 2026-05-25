import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchBar } from "@/components/search/search-bar";
import { SearchResults } from "@/components/search/search-results";
import { FilterPanel } from "@/components/search/filter-panel";
import { searchProperties, type PropertyResult } from "@/lib/actions/booking";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const {
    destination,
    checkIn,
    checkOut,
    guests,
    amenities,
    propertyTypes,
    starRatings,
    minPrice,
    maxPrice,
    sortBy,
  } = params;

  let results: PropertyResult[];
  try {
    results = await searchProperties({
      destination: destination || undefined,
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      guests: guests ? parseInt(guests) : undefined,
      amenities: amenities ? amenities.split(",").filter(Boolean) : undefined,
      propertyTypes: propertyTypes ? propertyTypes.split(",").filter(Boolean) : undefined,
      starRatings: starRatings ? starRatings.split(",").map(Number).filter(Boolean) : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sortBy: sortBy || undefined,
    });
  } catch {
    results = [];
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="w-full lg:w-64 lg:shrink-0">
              <Suspense>
                <FilterPanel />
              </Suspense>
            </div>
            <div className="flex-1">
              <SearchResults
                properties={results}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
