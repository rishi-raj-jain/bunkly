import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { notifications, notificationPreferences } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  Bell,
  BellOff,
  ArrowLeft,
  Calendar,
  CreditCard,
  MessageSquare,
  Tag,
  AlertCircle,
} from "lucide-react";
import { MarkAllReadButton, NotificationItemActions } from "@/components/notification/notification-actions";
import { NotificationPreferencesForm } from "@/components/notification/notification-preferences";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  booking_confirmation: <Calendar className="h-5 w-5" />,
  booking_reminder: <Calendar className="h-5 w-5" />,
  booking_cancelled: <AlertCircle className="h-5 w-5" />,
  payment_received: <CreditCard className="h-5 w-5" />,
  payment_failed: <AlertCircle className="h-5 w-5" />,
  message_received: <MessageSquare className="h-5 w-5" />,
  price_alert: <Tag className="h-5 w-5" />,
  promotion: <Tag className="h-5 w-5" />,
};

export const metadata = {
  title: "Notifications — Bunkly",
};

export default async function NotificationsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account/notifications");
  }

  const userNotifications = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, session.user.id))
    .orderBy(desc(notifications.createdAt))
    .limit(50);

  const preferences = await db
    .select()
    .from(notificationPreferences)
    .where(eq(notificationPreferences.userId, session.user.id));

  const unreadCount = userNotifications.filter((n) => !n.isRead).length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Link href="/account" className="text-muted hover:text-foreground">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-3xl font-bold text-foreground" data-testid="notifications-title">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <Badge variant="default" data-testid="unread-count">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
            </div>
            {unreadCount > 0 && <MarkAllReadButton />}
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Notification Preferences */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <NotificationPreferencesForm
                preferences={preferences.map((p) => ({
                  category: p.category,
                  emailEnabled: p.emailEnabled ?? true,
                  pushEnabled: p.pushEnabled ?? true,
                  smsEnabled: p.smsEnabled ?? false,
                }))}
              />
            </CardContent>
          </Card>

          {/* Notification List */}
          {userNotifications.length > 0 ? (
            <div className="space-y-2" data-testid="notifications-list">
              {userNotifications.map((notif) => (
                <Card
                  key={notif.id}
                  className={`transition-all ${
                    !notif.isRead ? "border-accent/30 bg-accent/5" : ""
                  }`}
                  data-testid={`notification-${notif.id}`}
                >
                  <CardContent className="flex items-start gap-4 p-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        !notif.isRead ? "bg-accent/20 text-accent" : "bg-secondary text-muted"
                      }`}
                    >
                      {TYPE_ICONS[notif.type] || <Bell className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`font-medium ${
                            !notif.isRead ? "text-foreground" : "text-muted"
                          }`}
                        >
                          {notif.title}
                        </p>
                        <NotificationItemActions
                          notificationId={notif.id}
                          isRead={notif.isRead ?? false}
                        />
                      </div>
                      {notif.body && (
                        <p className="mt-0.5 text-sm text-muted">{notif.body}</p>
                      )}
                      <div className="mt-1 flex items-center gap-2">
                        <p className="text-xs text-muted">{formatDate(notif.createdAt)}</p>
                        <Badge variant="outline" className="text-xs capitalize">
                          {notif.channel.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-secondary/50 py-16 text-center" data-testid="notifications-empty">
              <BellOff className="mx-auto h-12 w-12 text-muted" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No notifications</h3>
              <p className="mt-1 text-sm text-muted">
                You&apos;re all caught up! Notifications about bookings, messages, and deals will appear here.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
