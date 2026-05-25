import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import {
  wishlists,
  wishlistItems,
  properties,
  propertyImages,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  Share2,
  MapPin,
  Star,
  ArrowLeft,
} from "lucide-react";
import { CreateWishlistButton, WishlistActions } from "@/components/wishlist/create-wishlist-dialog";

export const metadata = {
  title: "Wishlists — Bunkly",
};

export default async function WishlistsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account/wishlists");
  }

  const userWishlists = await db
    .select()
    .from(wishlists)
    .where(eq(wishlists.userId, session.user.id));

  // Enrich each wishlist with items and preview images
  const enrichedWishlists = await Promise.all(
    userWishlists.map(async (wl) => {
      const items = await db
        .select({
          propertyId: wishlistItems.propertyId,
          propertyName: properties.name,
          propertySlug: properties.slug,
          propertyCity: properties.city,
          propertyCountry: properties.country,
          avgRating: properties.avgRating,
        })
        .from(wishlistItems)
        .innerJoin(properties, eq(wishlistItems.propertyId, properties.id))
        .where(eq(wishlistItems.wishlistId, wl.id));

      // Get primary image for the first property as preview
      let previewUrl: string | null = null;
      if (items.length > 0) {
        const [img] = await db
          .select({ url: propertyImages.url })
          .from(propertyImages)
          .where(eq(propertyImages.propertyId, items[0].propertyId))
          .orderBy(propertyImages.sortOrder)
          .limit(1);
        previewUrl = img?.url || null;
      }

      return {
        ...wl,
        itemCount: items.length,
        items,
        previewUrl,
      };
    })
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Link href="/account" className="text-muted hover:text-foreground">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-3xl font-bold text-foreground" data-testid="wishlists-title">
                  Wishlists
                </h1>
              </div>
              <p className="mt-1 text-muted">
                {enrichedWishlists.length} collection{enrichedWishlists.length !== 1 ? "s" : ""}
              </p>
            </div>
            <CreateWishlistButton />
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {enrichedWishlists.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="wishlists-grid">
              {enrichedWishlists.map((wl) => (
                <Card key={wl.id} className="group overflow-hidden transition-all hover:border-primary/50" data-testid={`wishlist-${wl.id}`}>
                  <div className="relative h-40 overflow-hidden">
                    {wl.previewUrl ? (
                      <img
                        src={wl.previewUrl}
                        alt={wl.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-secondary">
                        <Heart className="h-8 w-8 text-muted" />
                      </div>
                    )}
                    {wl.isShared && (
                      <Badge variant="secondary" className="absolute right-3 top-3">
                        <Share2 className="mr-1 h-3 w-3" />
                        Shared
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground">{wl.name}</h3>
                    <p className="text-sm text-muted">
                      {wl.itemCount} propert{wl.itemCount !== 1 ? "ies" : "y"}
                    </p>
                    {wl.items.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {wl.items.slice(0, 3).map((item) => (
                          <Link
                            key={item.propertyId}
                            href={`/properties/${item.propertySlug}`}
                            className="flex items-center gap-2 text-sm text-muted hover:text-accent"
                          >
                            <MapPin className="h-3 w-3" />
                            {item.propertyName}
                            {item.avgRating && (
                              <span className="ml-auto flex items-center gap-0.5 text-xs">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {parseFloat(item.avgRating).toFixed(1)}
                              </span>
                            )}
                          </Link>
                        ))}
                        {wl.items.length > 3 && (
                          <p className="text-xs text-muted">+{wl.items.length - 3} more</p>
                        )}
                      </div>
                    )}
                    <WishlistActions
                      wishlistId={wl.id}
                      isShared={wl.isShared || false}
                      shareToken={wl.shareToken}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-secondary/50 py-16 text-center" data-testid="wishlists-empty">
              <Heart className="mx-auto h-12 w-12 text-muted" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No wishlists yet</h3>
              <p className="mt-1 text-sm text-muted">
                Save properties you love to collections
              </p>
              <Link href="/search">
                <Button variant="accent" className="mt-6" data-testid="explore-cta">
                  Explore Properties
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
