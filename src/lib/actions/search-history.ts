"use server";

import { db } from "@/lib/db";
import { searchHistory } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function saveSearch(input: {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}) {
  const session = await auth();
  if (!session?.user?.id) return;

  await db.insert(searchHistory).values({
    userId: session.user.id,
    destination: input.destination || null,
    checkIn: input.checkIn || null,
    checkOut: input.checkOut || null,
    guests: input.guests ? { adults: input.guests } : null,
  });
}

export async function getRecentSearches() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db
    .select()
    .from(searchHistory)
    .where(eq(searchHistory.userId, session.user.id))
    .orderBy(desc(searchHistory.createdAt))
    .limit(5);
}

export async function clearSearchHistory() {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .delete(searchHistory)
    .where(eq(searchHistory.userId, session.user.id));

  return { success: true };
}
