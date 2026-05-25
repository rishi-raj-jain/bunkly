import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";
import {
  conversations,
  conversationParticipants,
  messages,
  properties,
} from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowRight,
  Inbox,
  Building2,
} from "lucide-react";

export const metadata = {
  title: "Messages — Bunkly",
};

export default async function MessagesPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/messages");
  }

  // Get conversations where the user is a participant
  const userParticipations = await db
    .select({
      conversationId: conversationParticipants.conversationId,
      lastReadAt: conversationParticipants.lastReadAt,
    })
    .from(conversationParticipants)
    .where(eq(conversationParticipants.userId, session.user.id));

  const conversationIds = userParticipations.map((p) => p.conversationId);
  const lastReadMap = new Map(
    userParticipations.map((p) => [p.conversationId, p.lastReadAt])
  );

  type ConversationSummary = {
    id: string;
    propertyName: string;
    lastMessageBody: string | null;
    lastMessageAt: Date | null;
    hasUnread: boolean;
  };

  const conversationList: ConversationSummary[] = [];

  for (const convId of conversationIds) {
    const [conv] = await db
      .select({
        id: conversations.id,
        lastMessageAt: conversations.lastMessageAt,
        propertyName: properties.name,
      })
      .from(conversations)
      .innerJoin(properties, eq(conversations.propertyId, properties.id))
      .where(eq(conversations.id, convId))
      .limit(1);

    if (!conv) continue;

    const [lastMsg] = await db
      .select({ body: messages.body, createdAt: messages.createdAt })
      .from(messages)
      .where(eq(messages.conversationId, convId))
      .orderBy(desc(messages.createdAt))
      .limit(1);

    const lastRead = lastReadMap.get(convId);
    const hasUnread = lastMsg?.createdAt
      ? !lastRead || lastMsg.createdAt > lastRead
      : false;

    conversationList.push({
      id: conv.id,
      propertyName: conv.propertyName,
      lastMessageBody: lastMsg?.body || null,
      lastMessageAt: conv.lastMessageAt,
      hasUnread,
    });
  }

  conversationList.sort((a, b) => {
    if (!a.lastMessageAt) return 1;
    if (!b.lastMessageAt) return -1;
    return b.lastMessageAt.getTime() - a.lastMessageAt.getTime();
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1
              className="text-3xl font-bold text-foreground"
              data-testid="messages-title"
            >
              Messages
            </h1>
            <p className="mt-1 text-muted">
              {conversationList.length} conversation{conversationList.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          {conversationList.length > 0 ? (
            <div className="space-y-3" data-testid="conversations-list">
              {conversationList.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/messages/${conv.id}`}
                  data-testid={`conversation-${conv.id}`}
                >
                  <Card className="group transition-all duration-200 hover:border-primary/50">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">{conv.propertyName}</p>
                          {conv.hasUnread && (
                            <span className="h-2 w-2 rounded-full bg-accent" data-testid="unread-indicator" />
                          )}
                        </div>
                        {conv.lastMessageBody && (
                          <p className="mt-0.5 truncate text-sm text-muted">
                            {conv.lastMessageBody}
                          </p>
                        )}
                        {conv.lastMessageAt && (
                          <p className="mt-0.5 text-xs text-muted">
                            {formatDate(conv.lastMessageAt)}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-secondary/50 py-16 text-center" data-testid="messages-empty">
              <Inbox className="mx-auto h-12 w-12 text-muted" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No messages yet</h3>
              <p className="mt-1 text-sm text-muted">
                When you book a property, you can message the host here.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
