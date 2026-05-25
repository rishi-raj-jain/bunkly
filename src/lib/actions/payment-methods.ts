"use server";

import { db } from "@/lib/db";
import { paymentMethods } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function getPaymentMethods() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db
    .select()
    .from(paymentMethods)
    .where(eq(paymentMethods.userId, session.user.id));
}

export async function addPaymentMethod(input: {
  cardNumber: string;
  cardExpiry: string;
  cardName: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const last4 = input.cardNumber.replace(/\s/g, "").slice(-4);
  const brand = input.cardNumber.startsWith("4")
    ? "Visa"
    : input.cardNumber.startsWith("5")
    ? "Mastercard"
    : input.cardNumber.startsWith("3")
    ? "Amex"
    : "Card";

  // Check if user has any existing methods
  const existing = await db
    .select()
    .from(paymentMethods)
    .where(eq(paymentMethods.userId, session.user.id));

  const [method] = await db
    .insert(paymentMethods)
    .values({
      userId: session.user.id,
      stripePaymentMethodId: `pm_demo_${Date.now()}`,
      type: "credit_card",
      cardBrand: brand,
      cardLast4: last4,
      isDefault: existing.length === 0, // first card is default
    })
    .returning({ id: paymentMethods.id });

  return { paymentMethodId: method.id };
}

export async function setDefaultPaymentMethod(methodId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  // Unset all defaults first
  await db
    .update(paymentMethods)
    .set({ isDefault: false })
    .where(eq(paymentMethods.userId, session.user.id));

  // Set new default
  await db
    .update(paymentMethods)
    .set({ isDefault: true })
    .where(and(eq(paymentMethods.id, methodId), eq(paymentMethods.userId, session.user.id)));

  return { success: true };
}

export async function deletePaymentMethod(methodId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .delete(paymentMethods)
    .where(and(eq(paymentMethods.id, methodId), eq(paymentMethods.userId, session.user.id)));

  return { success: true };
}
