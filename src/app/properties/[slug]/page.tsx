import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookingSidebar } from "@/components/property/booking-sidebar";
import { db } from "@/lib/db";
import {
  properties,
  propertyAmenities,
  propertyImages,
  roomTypes,
  reviews,
  users,
} from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ReviewVoteButton } from "@/components/review/review-vote-button";
import { CreatePriceAlertButton } from "@/components/price-alert/create-price-alert";
import Link from "next/link";
import {
  Star,
  MapPin,
  Clock,
  Wifi,
  Car,
  Dumbbell,
  UtensilsCrossed,
  Waves,
  Sparkles,
  Coffee,
  Dog,
  Briefcase,
  Shirt,
  Wine,
  Zap,
  Snowflake,
  ConciergeBell,
  Users as UsersIcon,
  Bed,
  Maximize,
  ChevronLeft,
  Heart,
  Share2,
  Shield,
} from "lucide-react";

const AMENITY_ICONS: Record<string, { icon: React.ReactNode; label: string }> = {
  pool: { icon: <Waves className="h-5 w-5" />, label: "Pool" },
  breakfast: { icon: <Coffee className="h-5 w-5" />, label: "Breakfast" },
  parking: { icon: <Car className="h-5 w-5" />, label: "Parking" },
  fitness: { icon: <Dumbbell className="h-5 w-5" />, label: "Fitness Center" },
  spa: { icon: <Sparkles className="h-5 w-5" />, label: "Spa" },
  restaurant: { icon: <UtensilsCrossed className="h-5 w-5" />, label: "Restaurant" },
  wifi: { icon: <Wifi className="h-5 w-5" />, label: "Free WiFi" },
  ac: { icon: <Snowflake className="h-5 w-5" />, label: "Air Conditioning" },
  pet_friendly: { icon: <Dog className="h-5 w-5" />, label: "Pet Friendly" },
  room_service: { icon: <ConciergeBell className="h-5 w-5" />, label: "Room Service" },
  business_center: { icon: <Briefcase className="h-5 w-5" />, label: "Business Center" },
  laundry: { icon: <Shirt className="h-5 w-5" />, label: "Laundry" },
  bar: { icon: <Wine className="h-5 w-5" />, label: "Bar" },
  ev_charging: { icon: <Zap className="h-5 w-5" />, label: "EV Charging" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-foreground text-foreground" : "text-border"}`}
        />
      ))}
    </div>
  );
}

export default async function PropertyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const [property] = await db
    .select()
    .from(properties)
    .where(eq(properties.slug, slug))
    .limit(1);

  if (!property) notFound();

  const [images, amenities, rooms, propertyReviews] = await Promise.all([
    db
      .select()
      .from(propertyImages)
      .where(eq(propertyImages.propertyId, property.id))
      .orderBy(propertyImages.sortOrder),
    db
      .select()
      .from(propertyAmenities)
      .where(eq(propertyAmenities.propertyId, property.id)),
    db
      .select()
      .from(roomTypes)
      .where(eq(roomTypes.propertyId, property.id)),
    db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        title: reviews.title,
        body: reviews.body,
        createdAt: reviews.createdAt,
        hostResponse: reviews.hostResponse,
        helpfulCount: reviews.helpfulCount,
        userName: users.name,
        userAvatar: users.avatarUrl,
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.propertyId, property.id))
      .orderBy(desc(reviews.createdAt))
      .limit(10),
  ]);

  const lowestRate = rooms.length
    ? Math.min(...rooms.map((r) => parseFloat(r.baseRate)))
    : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Image Gallery */}
        <div className="relative">
          <div className="grid h-64 grid-cols-1 gap-1 sm:h-96 sm:grid-cols-4 sm:grid-rows-2">
            {images[0] && (
              <div className="relative sm:col-span-2 sm:row-span-2">
                <img
                  src={images[0].url}
                  alt={images[0].altText || property.name}
                  className="h-full w-full object-cover"
                  data-testid="property-hero-image"
                />
              </div>
            )}
            {images.slice(1, 5).map((img, i) => (
              <div key={img.id} className="hidden sm:block">
                <img
                  src={img.url}
                  alt={img.altText || `${property.name} photo ${i + 2}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute left-4 top-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-1 rounded-md bg-background/80 px-3 py-1.5 text-sm text-foreground backdrop-blur-sm hover:bg-background"
              data-testid="back-to-search"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
          </div>
          <div className="absolute right-4 top-4 flex gap-2">
            <CreatePriceAlertButton propertyId={property.id} />
            <button
              className="rounded-md bg-background/80 p-2 text-foreground backdrop-blur-sm hover:bg-background"
              data-testid="share-property"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              className="rounded-md bg-background/80 p-2 text-foreground backdrop-blur-sm hover:bg-background"
              data-testid="save-property"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Title & Overview */}
              <div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="capitalize" data-testid="property-type">
                    {property.propertyType.replace("_", " ")}
                  </Badge>
                  {property.starRating && <StarRating rating={property.starRating} />}
                </div>
                <h1
                  className="mt-3 text-3xl font-bold text-foreground"
                  data-testid="property-name"
                >
                  {property.name}
                </h1>
                <p className="mt-2 flex items-center gap-1 text-muted" data-testid="property-location">
                  <MapPin className="h-4 w-4" />
                  {property.addressLine1 && `${property.addressLine1}, `}
                  {property.city}, {property.country}
                </p>

                {/* Rating Summary */}
                <div className="mt-4 flex items-center gap-4" data-testid="property-rating">
                  {property.avgRating && (
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
                        {parseFloat(property.avgRating).toFixed(1)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {parseFloat(property.avgRating) >= 4.5
                            ? "Exceptional"
                            : parseFloat(property.avgRating) >= 4
                            ? "Excellent"
                            : parseFloat(property.avgRating) >= 3.5
                            ? "Very Good"
                            : "Good"}
                        </p>
                        <p className="text-xs text-muted">
                          {property.reviewCount} review{property.reviewCount !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {property.description && (
                  <p className="mt-6 leading-relaxed text-foreground/80" data-testid="property-description">
                    {property.description}
                  </p>
                )}
              </div>

              {/* Check-in/out Times */}
              <div className="flex gap-6 rounded-lg border border-border bg-secondary/50 p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted">Check-in</p>
                    <p className="font-medium text-foreground">{property.checkInTime || "3:00 PM"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted">Check-out</p>
                    <p className="font-medium text-foreground">{property.checkOutTime || "11:00 AM"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted">Cancellation</p>
                    <p className="font-medium capitalize text-foreground">
                      {property.cancellationPolicy.replace("_", " ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {amenities.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground" data-testid="amenities-title">
                    Amenities
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {amenities.map((a) => {
                      const info = AMENITY_ICONS[a.amenity] || {
                        icon: <Star className="h-5 w-5" />,
                        label: a.amenity,
                      };
                      return (
                        <div
                          key={a.id}
                          className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                          data-testid={`amenity-${a.amenity}`}
                        >
                          <span className="text-accent">{info.icon}</span>
                          <span className="text-sm text-foreground">{info.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Room Types */}
              <div>
                <h2 className="text-xl font-semibold text-foreground" data-testid="rooms-title">
                  Room Types
                </h2>
                <div className="mt-4 space-y-4">
                  {rooms.map((room) => {
                    const beds = room.bedConfig as { type: string; count: number }[] | null;
                    return (
                      <Card key={room.id} data-testid={`room-type-${room.slug}`}>
                        <CardContent className="p-5">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold text-foreground">
                                  {room.name}
                                </h3>
                                <Badge variant="secondary" className="capitalize text-xs">
                                  {room.category}
                                </Badge>
                              </div>
                              {room.description && (
                                <p className="mt-1 text-sm text-muted">{room.description}</p>
                              )}
                              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted">
                                <span className="flex items-center gap-1">
                                  <UsersIcon className="h-4 w-4" />
                                  Up to {room.maxOccupancy}
                                </span>
                                {room.sizeSqft && (
                                  <span className="flex items-center gap-1">
                                    <Maximize className="h-4 w-4" />
                                    {room.sizeSqft} sq ft
                                  </span>
                                )}
                                {beds && beds.map((bed, i) => (
                                  <span key={i} className="flex items-center gap-1">
                                    <Bed className="h-4 w-4" />
                                    {bed.count}x {bed.type}
                                  </span>
                                ))}
                              </div>
                              {room.amenities && (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {(room.amenities as string[]).slice(0, 6).map((a) => (
                                    <Badge key={a} variant="outline" className="text-xs">
                                      {a}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <div className="text-right">
                                <p className="text-2xl font-bold text-foreground">
                                  {formatCurrency(parseFloat(room.baseRate))}
                                </p>
                                <p className="text-xs text-muted">per night</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Reviews */}
              {propertyReviews.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground" data-testid="reviews-title">
                    Guest Reviews
                  </h2>
                  <div className="mt-4 space-y-4">
                    {propertyReviews.map((review) => (
                      <Card key={review.id} data-testid={`review-${review.id}`}>
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                                {review.userName?.charAt(0) || "?"}
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{review.userName}</p>
                                <p className="text-xs text-muted">{formatDate(review.createdAt)}</p>
                              </div>
                            </div>
                            <StarRating rating={review.rating} />
                          </div>
                          {review.title && (
                            <h4 className="mt-3 font-semibold text-foreground">{review.title}</h4>
                          )}
                          {review.body && (
                            <p className="mt-1 text-sm leading-relaxed text-foreground/80">{review.body}</p>
                          )}
                          {review.hostResponse && (
                            <div className="mt-3 rounded-lg bg-secondary/50 p-3">
                              <p className="text-xs font-medium text-muted">Property Response</p>
                              <p className="mt-1 text-sm text-foreground/80">{review.hostResponse}</p>
                            </div>
                          )}
                          <div className="mt-3">
                            <ReviewVoteButton
                              reviewId={review.id}
                              helpfulCount={review.helpfulCount ?? 0}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar - Booking CTA */}
            <div>
              <BookingSidebar
                propertyId={property.id}
                lowestRate={lowestRate}
                avgRating={property.avgRating}
                initialCheckIn={sp.checkIn}
                initialCheckOut={sp.checkOut}
                initialGuests={sp.guests}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
