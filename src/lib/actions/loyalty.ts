"use server";

import { db } from "@/lib/db";
import { loyaltyMembers, pointsTransactions } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function joinLoyaltyProgram() {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  // Check if already a member
  const [existing] = await db
    .select()
    .from(loyaltyMembers)
    .where(eq(loyaltyMembers.userId, session.user.id))
    .limit(1);

  if (existing) return { error: "Already a member." };

  const memberNumber = `BC-${Date.now().toString(36).toUpperCase()}`;

  const [member] = await db
    .insert(loyaltyMembers)
    .values({
      userId: session.user.id,
      memberNumber,
      tier: "base",
      pointsBalance: 500, // welcome bonus
      lifetimePoints: 500,
    })
    .returning({ id: loyaltyMembers.id });

  // Record welcome bonus transaction
  await db.insert(pointsTransactions).values({
    memberId: member.id,
    type: "earn",
    points: 500,
    description: "Welcome bonus",
  });

  return { memberNumber };
}

export async function getPointsHistory() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const [member] = await db
    .select()
    .from(loyaltyMembers)
    .where(eq(loyaltyMembers.userId, session.user.id))
    .limit(1);

  if (!member) return [];

  return db
    .select()
    .from(pointsTransactions)
    .where(eq(pointsTransactions.memberId, member.id))
    .orderBy(desc(pointsTransactions.createdAt));
}

export async function redeemPoints(points: number) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [member] = await db
    .select()
    .from(loyaltyMembers)
    .where(eq(loyaltyMembers.userId, session.user.id))
    .limit(1);

  if (!member) return { error: "Not a loyalty member." };
  if (member.pointsBalance < points) return { error: "Insufficient points." };

  await db
    .update(loyaltyMembers)
    .set({ pointsBalance: member.pointsBalance - points })
    .where(eq(loyaltyMembers.id, member.id));

  await db.insert(pointsTransactions).values({
    memberId: member.id,
    type: "redeem",
    points: -points,
    description: "Points redemption",
  });

  return { success: true, discount: points / 100 }; // 100 points = $1
}
