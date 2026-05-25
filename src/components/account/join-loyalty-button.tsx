"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { joinLoyaltyProgram } from "@/lib/actions/loyalty";
import { Loader2 } from "lucide-react";

export function JoinLoyaltyButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleJoin() {
    startTransition(async () => {
      await joinLoyaltyProgram();
      router.refresh();
    });
  }

  return (
    <Button
      variant="accent"
      size="sm"
      className="mt-4"
      onClick={handleJoin}
      disabled={isPending}
      data-testid="join-loyalty"
    >
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Join Now
    </Button>
  );
}
