"use server";

import { db } from "@/lib/db";
import { reviews, reviewVotes, properties, bookings } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function createReview(input: {
  bookingId: string;
  propertyId: string;
  rating: number;
  title: string;
  body: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const { bookingId, propertyId, rating, title, body } = input;

  if (rating < 1 || rating > 5) return { error: "Rating must be between 1 and 5." };
  if (!title.trim()) return { error: "Title is required." };

  // Verify booking belongs to user and is checked out
  const [booking] = await db
    .select()
    .from(bookings)
    .where(and(eq(bookings.id, bookingId), eq(bookings.userId, session.user.id)))
    .limit(1);

  if (!booking) return { error: "Booking not found." };

  const [review] = await db
    .insert(reviews)
    .values({
      bookingId,
      userId: session.user.id,
      propertyId,
      rating,
      title: title.trim(),
      body: body.trim(),
      status: "published",
    })
    .returning({ id: reviews.id });

  // Update property avg rating and review count
  const allReviews = await db
    .select({ rating: reviews.rating })
    .from(reviews)
    .where(and(eq(reviews.propertyId, propertyId), eq(reviews.status, "published")));

  const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

  await db
    .update(properties)
    .set({
      avgRating: avgRating.toFixed(2),
      reviewCount: allReviews.length,
    })
    .where(eq(properties.id, propertyId));

  return { reviewId: review.id };
}

export async function updateReview(input: {
  reviewId: string;
  rating: number;
  title: string;
  body: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const { reviewId, rating, title, body } = input;

  await db
    .update(reviews)
    .set({
      rating,
      title: title.trim(),
      body: body.trim(),
      updatedAt: new Date(),
    })
    .where(and(eq(reviews.id, reviewId), eq(reviews.userId, session.user.id)));

  return { success: true };
}

export async function deleteReview(reviewId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [review] = await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.id, reviewId), eq(reviews.userId, session.user.id)))
    .limit(1);

  if (!review) return { error: "Review not found." };

  await db.delete(reviews).where(eq(reviews.id, reviewId));

  // Update property stats
  const allReviews = await db
    .select({ rating: reviews.rating })
    .from(reviews)
    .where(and(eq(reviews.propertyId, review.propertyId), eq(reviews.status, "published")));

  const avgRating = allReviews.length > 0
    ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    : null;

  await db
    .update(properties)
    .set({
      avgRating: avgRating?.toFixed(2) || null,
      reviewCount: allReviews.length,
    })
    .where(eq(properties.id, review.propertyId));

  return { success: true };
}

export async function toggleReviewVote(reviewId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [existing] = await db
    .select()
    .from(reviewVotes)
    .where(and(eq(reviewVotes.reviewId, reviewId), eq(reviewVotes.userId, session.user.id)))
    .limit(1);

  const [review] = await db
    .select({ helpfulCount: reviews.helpfulCount })
    .from(reviews)
    .where(eq(reviews.id, reviewId))
    .limit(1);

  if (!review) return { error: "Review not found." };

  if (existing) {
    await db.delete(reviewVotes).where(eq(reviewVotes.id, existing.id));
    await db
      .update(reviews)
      .set({ helpfulCount: Math.max(0, (review.helpfulCount ?? 0) - 1) })
      .where(eq(reviews.id, reviewId));
    return { voted: false };
  } else {
    await db.insert(reviewVotes).values({
      reviewId,
      userId: session.user.id,
      isHelpful: true,
    });
    await db
      .update(reviews)
      .set({ helpfulCount: (review.helpfulCount ?? 0) + 1 })
      .where(eq(reviews.id, reviewId));
    return { voted: true };
  }
}

export async function getUserReviews() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db
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
}
