"use server";

import { db } from "@/lib/db";
import { priceAlerts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function createPriceAlert(input: {
  propertyId: string;
  targetPrice: number;
  checkIn?: string;
  checkOut?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [alert] = await db
    .insert(priceAlerts)
    .values({
      userId: session.user.id,
      propertyId: input.propertyId,
      targetPrice: input.targetPrice.toFixed(2),
      checkIn: input.checkIn || null,
      checkOut: input.checkOut || null,
      isActive: true,
    })
    .returning({ id: priceAlerts.id });

  return { alertId: alert.id };
}

export async function deletePriceAlert(alertId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .delete(priceAlerts)
    .where(and(eq(priceAlerts.id, alertId), eq(priceAlerts.userId, session.user.id)));

  return { success: true };
}

export async function togglePriceAlert(alertId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [alert] = await db
    .select()
    .from(priceAlerts)
    .where(and(eq(priceAlerts.id, alertId), eq(priceAlerts.userId, session.user.id)))
    .limit(1);

  if (!alert) return { error: "Alert not found." };

  await db
    .update(priceAlerts)
    .set({ isActive: !alert.isActive })
    .where(eq(priceAlerts.id, alertId));

  return { isActive: !alert.isActive };
}

export async function getUserPriceAlerts() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db
    .select()
    .from(priceAlerts)
    .where(eq(priceAlerts.userId, session.user.id));
}
