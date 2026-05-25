"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createReview } from "@/lib/actions/reviews";
import { Star, Loader2, X } from "lucide-react";

export function WriteReviewDialog({
  bookingId,
  propertyId,
  propertyName,
}: {
  bookingId: string;
  propertyId: string;
  propertyName: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const result = await createReview({
        bookingId,
        propertyId,
        rating,
        title,
        body,
      });

      if ("error" in result) {
        setError(result.error!);
      } else {
        setOpen(false);
        router.refresh();
      }
    });
  }

  if (!open) {
    return (
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        data-testid="write-review-button"
      >
        <Star className="mr-2 h-4 w-4" />
        Write Review
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6" data-testid="write-review-dialog">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Review {propertyName}
        </h3>
        <button
          onClick={() => setOpen(false)}
          className="text-muted hover:text-foreground"
          data-testid="close-review-dialog"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {/* Star Rating */}
        <div>
          <label className="text-sm font-medium text-foreground">Rating</label>
          <div className="mt-1 flex items-center gap-1" data-testid="review-star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5"
                data-testid={`review-star-${star}`}
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoverRating || rating)
                      ? "fill-accent text-accent"
                      : "text-border"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-muted">{rating}/5</span>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-sm font-medium text-foreground">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            className="mt-1"
            data-testid="review-title-input"
          />
        </div>

        {/* Body */}
        <div>
          <label className="text-sm font-medium text-foreground">Review</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Tell us about your stay..."
            rows={4}
            className="mt-1 w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            data-testid="review-body-input"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive" data-testid="review-error">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            data-testid="cancel-review"
          >
            Cancel
          </Button>
          <Button
            variant="accent"
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1"
            data-testid="submit-review"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}
