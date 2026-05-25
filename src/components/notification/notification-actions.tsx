"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { markNotificationRead, markAllNotificationsRead, deleteNotification } from "@/lib/actions/notifications";
import { Check, Trash2, Loader2 } from "lucide-react";

export function MarkAllReadButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleMarkAll() {
    startTransition(async () => {
      await markAllNotificationsRead();
      router.refresh();
    });
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleMarkAll}
      disabled={isPending}
      data-testid="mark-all-read"
    >
      {isPending ? (
        <Loader2 className="mr-1 h-4 w-4 animate-spin" />
      ) : (
        <Check className="mr-1 h-4 w-4" />
      )}
      Mark all read
    </Button>
  );
}

export function NotificationItemActions({
  notificationId,
  isRead,
}: {
  notificationId: string;
  isRead: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleMarkRead() {
    startTransition(async () => {
      await markNotificationRead(notificationId);
      router.refresh();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteNotification(notificationId);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1">
      {!isRead && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkRead}
          disabled={isPending}
          data-testid={`mark-read-${notificationId}`}
        >
          {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
        data-testid={`delete-notification-${notificationId}`}
      >
        {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
      </Button>
    </div>
  );
}
