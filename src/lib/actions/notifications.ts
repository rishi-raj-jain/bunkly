"use server";

import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function markNotificationRead(notificationId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .update(notifications)
    .set({ isRead: true, readAt: new Date() })
    .where(
      and(
        eq(notifications.id, notificationId),
        eq(notifications.userId, session.user.id)
      )
    );

  return { success: true };
}

export async function markAllNotificationsRead() {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .update(notifications)
    .set({ isRead: true, readAt: new Date() })
    .where(
      and(
        eq(notifications.userId, session.user.id),
        eq(notifications.isRead, false)
      )
    );

  return { success: true };
}

export async function deleteNotification(notificationId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .delete(notifications)
    .where(
      and(
        eq(notifications.id, notificationId),
        eq(notifications.userId, session.user.id)
      )
    );

  return { success: true };
}
