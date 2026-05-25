"use client";

import { useState, useTransition } from "react";
import { toggleReviewVote } from "@/lib/actions/reviews";
import { ThumbsUp, Loader2 } from "lucide-react";

export function ReviewVoteButton({
  reviewId,
  helpfulCount,
}: {
  reviewId: string;
  helpfulCount: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [voted, setVoted] = useState(false);
  const [count, setCount] = useState(helpfulCount);

  function handleVote() {
    startTransition(async () => {
      const result = await toggleReviewVote(reviewId);
      if ("voted" in result) {
        setVoted(!!result.voted);
        setCount((c) => (result.voted ? c + 1 : c - 1));
      }
    });
  }

  return (
    <button
      onClick={handleVote}
      disabled={isPending}
      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors ${
        voted
          ? "bg-accent/10 text-accent"
          : "bg-secondary text-muted hover:bg-secondary/80"
      }`}
      data-testid={`vote-review-${reviewId}`}
    >
      {isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <ThumbsUp className={`h-3.5 w-3.5 ${voted ? "fill-accent" : ""}`} />
      )}
      Helpful {count > 0 && `(${count})`}
    </button>
  );
}
