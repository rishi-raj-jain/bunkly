import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";
import { reviews, properties } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Star, ArrowLeft, MessageSquare } from "lucide-react";
import { ReviewActions } from "@/components/review/review-actions";

export const metadata = {
  title: "My Reviews — Bunkly",
};

export default async function MyReviewsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account/reviews");
  }

  const userReviews = await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      title: reviews.title,
      body: reviews.body,
      createdAt: reviews.createdAt,
      propertyName: properties.name,
      propertySlug: properties.slug,
    })
    .from(reviews)
    .innerJoin(properties, eq(reviews.propertyId, properties.id))
    .where(eq(reviews.userId, session.user.id))
    .orderBy(desc(reviews.createdAt));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <Link href="/account" className="text-muted hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-3xl font-bold text-foreground" data-testid="my-reviews-title">
                My Reviews
              </h1>
            </div>
            <p className="mt-1 text-muted">
              {userReviews.length} review{userReviews.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          {userReviews.length > 0 ? (
            <div className="space-y-4" data-testid="reviews-list">
              {userReviews.map((review) => (
                <Card key={review.id} data-testid={`my-review-${review.id}`}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/properties/${review.propertySlug}`}
                          className="font-semibold text-foreground hover:text-accent"
                        >
                          {review.propertyName}
                        </Link>
                        <p className="text-xs text-muted">{formatDate(review.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-accent text-accent"
                                : "text-border"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.title && (
                      <h4 className="mt-2 font-medium text-foreground">{review.title}</h4>
                    )}
                    {review.body && (
                      <p className="mt-1 text-sm text-foreground/80">{review.body}</p>
                    )}
                    <ReviewActions reviewId={review.id} />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-secondary/50 py-16 text-center" data-testid="reviews-empty">
              <MessageSquare className="mx-auto h-12 w-12 text-muted" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No reviews yet</h3>
              <p className="mt-1 text-sm text-muted">
                Reviews you write about your stays will appear here
              </p>
              <Link href="/bookings">
                <Button variant="accent" className="mt-6" data-testid="view-bookings-cta">
                  View My Trips
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
