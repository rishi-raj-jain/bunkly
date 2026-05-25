"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/actions/messages";
import { Send, Loader2 } from "lucide-react";

export function SendMessageForm({ conversationId }: { conversationId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim()) return;

    startTransition(async () => {
      await sendMessage(conversationId, message);
      setMessage("");
      router.refresh();
    });
  }

  return (
    <div className="flex gap-3" data-testid="message-input-area">
      <Input
        placeholder="Type a message..."
        className="flex-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        data-testid="message-input"
      />
      <Button
        variant="accent"
        size="icon"
        onClick={handleSend}
        disabled={isPending || !message.trim()}
        data-testid="send-message"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
