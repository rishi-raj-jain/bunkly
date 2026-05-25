"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Star,
  Waves,
  Coffee,
  Car,
  Dumbbell,
  Sparkles,
  Wifi,
  Dog,
  X,
} from "lucide-react";

const AMENITY_OPTIONS = [
  { value: "pool", label: "Pool", icon: <Waves className="h-4 w-4" /> },
  { value: "breakfast", label: "Breakfast", icon: <Coffee className="h-4 w-4" /> },
  { value: "parking", label: "Parking", icon: <Car className="h-4 w-4" /> },
  { value: "fitness", label: "Fitness", icon: <Dumbbell className="h-4 w-4" /> },
  { value: "spa", label: "Spa", icon: <Sparkles className="h-4 w-4" /> },
  { value: "wifi", label: "WiFi", icon: <Wifi className="h-4 w-4" /> },
  { value: "pet_friendly", label: "Pet Friendly", icon: <Dog className="h-4 w-4" /> },
];

const PROPERTY_TYPES = [
  { value: "hotel", label: "Hotel" },
  { value: "resort", label: "Resort" },
  { value: "boutique", label: "Boutique" },
  { value: "bnb", label: "B&B" },
  { value: "hostel", label: "Hostel" },
  { value: "vacation_rental", label: "Vacation Rental" },
];

const STAR_RATINGS = [5, 4, 3, 2];

const SORT_OPTIONS = [
  { value: "", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedAmenities = searchParams.get("amenities")?.split(",").filter(Boolean) || [];
  const selectedTypes = searchParams.get("propertyTypes")?.split(",").filter(Boolean) || [];
  const selectedStars = searchParams.get("starRatings")?.split(",").map(Number).filter(Boolean) || [];
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sortBy = searchParams.get("sortBy") || "";

  const hasActiveFilters =
    selectedAmenities.length > 0 ||
    selectedTypes.length > 0 ||
    selectedStars.length > 0 ||
    minPrice ||
    maxPrice;

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams]
  );

  function toggleAmenity(amenity: string) {
    const next = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    updateParams({ amenities: next.length > 0 ? next.join(",") : null });
  }

  function togglePropertyType(type: string) {
    const next = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    updateParams({ propertyTypes: next.length > 0 ? next.join(",") : null });
  }

  function toggleStarRating(star: number) {
    const next = selectedStars.includes(star)
      ? selectedStars.filter((s) => s !== star)
      : [...selectedStars, star];
    updateParams({
      starRatings: next.length > 0 ? next.join(",") : null,
    });
  }

  function handleMinPriceChange(value: string) {
    updateParams({ minPrice: value || null });
  }

  function handleMaxPriceChange(value: string) {
    updateParams({ maxPrice: value || null });
  }

  function handleSortChange(value: string) {
    updateParams({ sortBy: value || null });
  }

  function clearAllFilters() {
    updateParams({
      amenities: null,
      propertyTypes: null,
      starRatings: null,
      minPrice: null,
      maxPrice: null,
    });
  }

  return (
    <aside className="space-y-6" data-testid="filter-panel">
      {/* Sort */}
      <div>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/40">
          Sort By
        </h3>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground"
          data-testid="sort-select"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/40">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label htmlFor="min-price" className="sr-only">
              Minimum price
            </label>
            <input
              id="min-price"
              type="number"
              placeholder="Min"
              min="0"
              value={minPrice}
              onChange={(e) => handleMinPriceChange(e.target.value)}
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted"
              data-testid="filter-min-price"
            />
          </div>
          <span className="text-muted">—</span>
          <div className="flex-1">
            <label htmlFor="max-price" className="sr-only">
              Maximum price
            </label>
            <input
              id="max-price"
              type="number"
              placeholder="Max"
              min="0"
              value={maxPrice}
              onChange={(e) => handleMaxPriceChange(e.target.value)}
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted"
              data-testid="filter-max-price"
            />
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/40">
          Star Rating
        </h3>
        <div className="space-y-2">
          {STAR_RATINGS.map((star) => (
            <label
              key={star}
              className="flex cursor-pointer items-center gap-2"
              data-testid={`filter-star-${star}`}
            >
              <input
                type="checkbox"
                checked={selectedStars.includes(star)}
                onChange={() => toggleStarRating(star)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="flex items-center gap-0.5">
                {Array.from({ length: star }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-accent text-accent"
                  />
                ))}
              </span>
              <span className="text-sm text-foreground">
                {star} star{star !== 1 ? "s" : ""}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/40">
          Property Type
        </h3>
        <div className="space-y-2">
          {PROPERTY_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex cursor-pointer items-center gap-2"
              data-testid={`filter-type-${type.value}`}
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type.value)}
                onChange={() => togglePropertyType(type.value)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/40">
          Amenities
        </h3>
        <div className="space-y-2">
          {AMENITY_OPTIONS.map((amenity) => (
            <label
              key={amenity.value}
              className="flex cursor-pointer items-center gap-2"
              data-testid={`filter-amenity-${amenity.value}`}
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity.value)}
                onChange={() => toggleAmenity(amenity.value)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-muted">{amenity.icon}</span>
              <span className="text-sm text-foreground">{amenity.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear All */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={clearAllFilters}
          data-testid="filter-clear-all"
        >
          <X className="mr-1.5 h-3.5 w-3.5" />
          Clear All Filters
        </Button>
      )}
    </aside>
  );
}
