"use server";

import { db } from "@/lib/db";
import { users, guestProfiles, notificationPreferences } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function updateProfile(input: {
  name: string;
  phone: string;
  dateOfBirth: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .update(users)
    .set({
      name: input.name.trim() || null,
      phone: input.phone.trim() || null,
      updatedAt: new Date(),
    })
    .where(eq(users.id, session.user.id));

  // Upsert guest profile for DOB
  if (input.dateOfBirth) {
    const [existing] = await db
      .select()
      .from(guestProfiles)
      .where(eq(guestProfiles.userId, session.user.id))
      .limit(1);

    if (existing) {
      await db
        .update(guestProfiles)
        .set({ dateOfBirth: input.dateOfBirth })
        .where(eq(guestProfiles.userId, session.user.id));
    } else {
      await db.insert(guestProfiles).values({
        userId: session.user.id,
        dateOfBirth: input.dateOfBirth,
      });
    }
  }

  return { success: true };
}

export async function updatePreferences(input: {
  locale: string;
  currency: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .update(users)
    .set({
      locale: input.locale,
      currency: input.currency,
      updatedAt: new Date(),
    })
    .where(eq(users.id, session.user.id));

  return { success: true };
}

export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  if (input.newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }

  // In a real app, verify current password and hash new one
  // For demo purposes, just accept it
  await db
    .update(users)
    .set({
      passwordHash: `demo_hashed_${input.newPassword}`,
      updatedAt: new Date(),
    })
    .where(eq(users.id, session.user.id));

  return { success: true };
}

export async function updateNotificationPreference(input: {
  category: string;
  emailEnabled?: boolean;
  pushEnabled?: boolean;
  smsEnabled?: boolean;
  quietStart?: string;
  quietEnd?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [existing] = await db
    .select()
    .from(notificationPreferences)
    .where(
      and(
        eq(notificationPreferences.userId, session.user.id),
        eq(notificationPreferences.category, input.category)
      )
    )
    .limit(1);

  if (existing) {
    await db
      .update(notificationPreferences)
      .set({
        emailEnabled: input.emailEnabled ?? existing.emailEnabled,
        pushEnabled: input.pushEnabled ?? existing.pushEnabled,
        smsEnabled: input.smsEnabled ?? existing.smsEnabled,
        quietStart: input.quietStart ?? existing.quietStart,
        quietEnd: input.quietEnd ?? existing.quietEnd,
      })
      .where(eq(notificationPreferences.id, existing.id));
  } else {
    await db.insert(notificationPreferences).values({
      userId: session.user.id,
      category: input.category,
      emailEnabled: input.emailEnabled ?? true,
      pushEnabled: input.pushEnabled ?? true,
      smsEnabled: input.smsEnabled ?? false,
      quietStart: input.quietStart || null,
      quietEnd: input.quietEnd || null,
    });
  }

  return { success: true };
}

export async function getNotificationPreferences() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db
    .select()
    .from(notificationPreferences)
    .where(eq(notificationPreferences.userId, session.user.id));
}
