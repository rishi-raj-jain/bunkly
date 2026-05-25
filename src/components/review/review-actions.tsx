"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteReview } from "@/lib/actions/reviews";
import { Trash2, Loader2 } from "lucide-react";

export function ReviewActions({ reviewId }: { reviewId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function handleDelete() {
    startTransition(async () => {
      await deleteReview(reviewId);
      router.refresh();
    });
  }

  if (confirming) {
    return (
      <div className="mt-3 flex items-center gap-2">
        <p className="text-sm text-muted">Delete this review?</p>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isPending}
          data-testid={`confirm-delete-review-${reviewId}`}
        >
          {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Delete"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirming(false)}
          data-testid={`cancel-delete-review-${reviewId}`}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setConfirming(true)}
        data-testid={`delete-review-${reviewId}`}
      >
        <Trash2 className="mr-1 h-3 w-3" />
        Delete
      </Button>
    </div>
  );
}
