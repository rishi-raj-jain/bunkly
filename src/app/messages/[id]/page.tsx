import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import { SendMessageForm } from "@/components/messaging/send-message-form";
import { db } from "@/lib/db";
import {
  conversations,
  conversationParticipants,
  messages,
  properties,
  users,
} from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Pin,
  AlertTriangle,
} from "lucide-react";

export default async function ConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/messages");
  }

  const { id } = await params;

  // Verify user is a participant
  const [participant] = await db
    .select()
    .from(conversationParticipants)
    .where(eq(conversationParticipants.conversationId, id))
    .limit(1);

  if (!participant) notFound();

  const [conv] = await db
    .select({
      id: conversations.id,
      propertyName: properties.name,
      propertySlug: properties.slug,
    })
    .from(conversations)
    .innerJoin(properties, eq(conversations.propertyId, properties.id))
    .where(eq(conversations.id, id))
    .limit(1);

  if (!conv) notFound();

  const conversationMessages = await db
    .select({
      id: messages.id,
      body: messages.body,
      messageType: messages.messageType,
      isUrgent: messages.isUrgent,
      isPinned: messages.isPinned,
      createdAt: messages.createdAt,
      senderId: messages.senderId,
      senderName: users.name,
      senderAvatar: users.avatarUrl,
    })
    .from(messages)
    .leftJoin(users, eq(messages.senderId, users.id))
    .where(eq(messages.conversationId, id))
    .orderBy(asc(messages.createdAt));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Conversation Header */}
        <div className="border-b border-border bg-secondary px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl items-center gap-4">
            <Link
              href="/messages"
              className="text-muted hover:text-foreground"
              data-testid="back-to-messages"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Link
                href={`/properties/${conv.propertySlug}`}
                className="font-semibold text-foreground hover:text-accent"
                data-testid="conversation-property-name"
              >
                {conv.propertyName}
              </Link>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-4" data-testid="message-list">
            {conversationMessages.length > 0 ? (
              conversationMessages.map((msg) => {
                const isOwn = msg.senderId === session.user?.id;
                const isSystem = msg.messageType === "system";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isSystem ? "justify-center" : isOwn ? "justify-end" : "justify-start"}`}
                    data-testid={`message-${msg.id}`}
                  >
                    {isSystem ? (
                      <p className="rounded-full bg-secondary px-4 py-1.5 text-xs text-muted">
                        {msg.body}
                      </p>
                    ) : (
                      <div className={`max-w-[75%] ${isOwn ? "items-end" : "items-start"}`}>
                        {!isOwn && (
                          <p className="mb-1 text-xs font-medium text-muted">{msg.senderName}</p>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2.5 ${
                            isOwn
                              ? "bg-primary text-white"
                              : "bg-secondary text-foreground"
                          }`}
                        >
                          {msg.isUrgent && (
                            <span className="mb-1 flex items-center gap-1 text-xs font-medium text-foreground">
                              <AlertTriangle className="h-3 w-3" />
                              Urgent
                            </span>
                          )}
                          {msg.isPinned && (
                            <span className="mb-1 flex items-center gap-1 text-xs text-muted">
                              <Pin className="h-3 w-3" />
                              Pinned
                            </span>
                          )}
                          <p className="text-sm">{msg.body}</p>
                        </div>
                        <p className="mt-1 text-xs text-muted">
                          {formatDate(msg.createdAt)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-muted" data-testid="no-messages">
                <p>No messages yet. Start a conversation!</p>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="mt-6">
            <SendMessageForm conversationId={id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
