"use server";

import { db } from "@/lib/db";
import { serviceRequests, bookings } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function createServiceRequest(input: {
  bookingId: string;
  type: string;
  details: string;
  priority: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [booking] = await db
    .select()
    .from(bookings)
    .where(and(eq(bookings.id, input.bookingId), eq(bookings.userId, session.user.id)))
    .limit(1);

  if (!booking) return { error: "Booking not found." };

  const [request] = await db
    .insert(serviceRequests)
    .values({
      bookingId: input.bookingId,
      type: input.type,
      details: { notes: input.details },
      priority: input.priority,
    })
    .returning({ id: serviceRequests.id });

  return { requestId: request.id };
}

export async function getServiceRequests(bookingId: string) {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db
    .select()
    .from(serviceRequests)
    .where(eq(serviceRequests.bookingId, bookingId));
}
