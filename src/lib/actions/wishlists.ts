"use server";

import { db } from "@/lib/db";
import { wishlists, wishlistItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function createWishlist(name: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  if (!name.trim()) return { error: "Name is required." };

  const shareToken = `wl_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const [wl] = await db
    .insert(wishlists)
    .values({
      userId: session.user.id,
      name: name.trim(),
      shareToken,
    })
    .returning({ id: wishlists.id });

  return { wishlistId: wl.id };
}

export async function renameWishlist(wishlistId: string, name: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .update(wishlists)
    .set({ name: name.trim() })
    .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, session.user.id)));

  return { success: true };
}

export async function deleteWishlist(wishlistId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .delete(wishlists)
    .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, session.user.id)));

  return { success: true };
}

export async function toggleWishlistSharing(wishlistId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [wl] = await db
    .select()
    .from(wishlists)
    .where(and(eq(wishlists.id, wishlistId), eq(wishlists.userId, session.user.id)))
    .limit(1);

  if (!wl) return { error: "Wishlist not found." };

  await db
    .update(wishlists)
    .set({ isShared: !wl.isShared })
    .where(eq(wishlists.id, wishlistId));

  return { isShared: !wl.isShared, shareToken: wl.shareToken };
}

export async function addToWishlist(wishlistId: string, propertyId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  try {
    await db.insert(wishlistItems).values({ wishlistId, propertyId });
    return { success: true };
  } catch {
    return { error: "Property already in wishlist." };
  }
}

export async function removeFromWishlist(wishlistId: string, propertyId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .delete(wishlistItems)
    .where(
      and(
        eq(wishlistItems.wishlistId, wishlistId),
        eq(wishlistItems.propertyId, propertyId)
      )
    );

  return { success: true };
}

export async function getUserWishlists() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db
    .select({ id: wishlists.id, name: wishlists.name })
    .from(wishlists)
    .where(eq(wishlists.userId, session.user.id));
}
