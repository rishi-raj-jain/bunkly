"use server";

import { db } from "@/lib/db";
import { messages, conversations, conversationParticipants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function sendMessage(conversationId: string, body: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  if (!body.trim()) return { error: "Message cannot be empty." };

  const [msg] = await db
    .insert(messages)
    .values({
      conversationId,
      senderId: session.user.id,
      body: body.trim(),
      messageType: "text",
    })
    .returning({ id: messages.id });

  // Update last message timestamp
  await db
    .update(conversations)
    .set({ lastMessageAt: new Date() })
    .where(eq(conversations.id, conversationId));

  return { messageId: msg.id };
}

export async function createConversation(propertyId: string, initialMessage: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  const [conv] = await db
    .insert(conversations)
    .values({
      propertyId,
      lastMessageAt: new Date(),
    })
    .returning({ id: conversations.id });

  await db.insert(conversationParticipants).values({
    conversationId: conv.id,
    userId: session.user.id,
    role: "guest",
  });

  if (initialMessage.trim()) {
    await db.insert(messages).values({
      conversationId: conv.id,
      senderId: session.user.id,
      body: initialMessage.trim(),
      messageType: "text",
    });
  }

  return { conversationId: conv.id };
}

export async function archiveConversation(conversationId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "You must be logged in." };

  await db
    .update(conversations)
    .set({ archivedAt: new Date() })
    .where(eq(conversations.id, conversationId));

  return { success: true };
}
