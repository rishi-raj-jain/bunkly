"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Dumbbell,
  Waves,
  Sparkles,
  Coffee,
  Dog,
  Building2,
} from "lucide-react";
import type { PropertyResult } from "@/lib/actions/booking";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  pool: <Waves className="h-3.5 w-3.5" />,
  breakfast: <Coffee className="h-3.5 w-3.5" />,
  parking: <Car className="h-3.5 w-3.5" />,
  fitness: <Dumbbell className="h-3.5 w-3.5" />,
  spa: <Sparkles className="h-3.5 w-3.5" />,
  wifi: <Wifi className="h-3.5 w-3.5" />,
  pet_friendly: <Dog className="h-3.5 w-3.5" />,
};

function PropertyCard({
  property,
  checkIn,
  checkOut,
  guests,
}: {
  property: PropertyResult;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}) {
  const params = new URLSearchParams();
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);
  if (guests) params.set("guests", guests);
  const qs = params.toString();
  const href = `/properties/${property.slug}${qs ? `?${qs}` : ""}`;

  return (
    <Link href={href} data-testid={`property-card-${property.slug}`}>
      <Card className="group overflow-hidden transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative h-52 w-full overflow-hidden sm:h-auto sm:w-64">
              {property.imageUrl ? (
                <img
                  src={property.imageUrl}
                  alt={property.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-secondary">
                  <Building2 className="h-10 w-10 text-muted" />
                </div>
              )}
              <Badge
                variant="secondary"
                className="absolute left-3 top-3 capitalize"
              >
                {property.propertyType.replace("_", " ")}
              </Badge>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {property.name}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-sm text-muted">
                      <MapPin className="h-3.5 w-3.5" />
                      {property.city}, {property.country}
                    </p>
                  </div>
                  {property.avgRating && (
                    <div className="flex items-center gap-1 rounded-lg bg-accent/10 px-2 py-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-bold text-foreground">
                        {parseFloat(property.avgRating).toFixed(1)}
                      </span>
                      <span className="text-xs text-muted">
                        ({property.reviewCount})
                      </span>
                    </div>
                  )}
                </div>

                {property.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-foreground/70">
                    {property.description}
                  </p>
                )}

                {/* Amenities */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {property.amenities.slice(0, 5).map((amenity) => (
                    <span
                      key={amenity}
                      className="flex items-center gap-1 text-xs text-muted"
                    >
                      {AMENITY_ICONS[amenity] || null}
                      <span className="capitalize">
                        {amenity.replace("_", " ")}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-end justify-between">
                <Badge variant="outline" className="capitalize text-xs">
                  {property.cancellationPolicy.replace("_", " ")} cancellation
                </Badge>
                <div className="text-right">
                  {property.lowestRate !== null && (
                    <>
                      <span className="text-2xl font-bold text-foreground">
                        {formatCurrency(property.lowestRate)}
                      </span>
                      <span className="text-sm text-muted"> / night</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function SearchResults({
  properties,
  checkIn,
  checkOut,
  guests,
}: {
  properties: PropertyResult[];
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}) {
  if (properties.length === 0) {
    return (
      <div
        className="rounded-lg border border-border bg-secondary/50 py-16 text-center"
        data-testid="no-results"
      >
        <Building2 className="mx-auto h-12 w-12 text-muted" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          No properties found
        </h3>
        <p className="mt-1 text-sm text-muted">
          Try adjusting your search filters or dates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="search-results">
      <p className="text-sm text-muted">
        {properties.length} propert{properties.length === 1 ? "y" : "ies"} found
      </p>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
        />
      ))}
    </div>
  );
}
