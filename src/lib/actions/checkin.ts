"use server";

import { db } from "@/lib/db";
import { checkinRecords, bookings } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function onlineCheckin(input: {
  bookingId: string;
  arrivalTime: string;
  roomPreferences: string[];
  idVerified: boolean;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  // Verify booking
  const [booking] = await db
    .select()
    .from(bookings)
    .where(and(eq(bookings.id, input.bookingId), eq(bookings.userId, session.user.id)))
    .limit(1);

  if (!booking) return { error: "Booking not found." };
  if (booking.status !== "confirmed") return { error: "Booking must be confirmed to check in." };

  const [record] = await db
    .insert(checkinRecords)
    .values({
      bookingId: input.bookingId,
      method: "online",
      idVerified: input.idVerified,
      arrivalTime: input.arrivalTime,
      roomPreferences: input.roomPreferences,
      digitalKeyActivated: true,
    })
    .returning({ id: checkinRecords.id });

  // Update booking status
  await db
    .update(bookings)
    .set({ status: "checked_in", checkedInAt: new Date() })
    .where(eq(bookings.id, input.bookingId));

  return { checkinId: record.id };
}
