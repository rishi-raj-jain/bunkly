"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createWishlist, deleteWishlist, toggleWishlistSharing, renameWishlist } from "@/lib/actions/wishlists";
import { Plus, Loader2, X, Trash2, Share2, Edit, Check } from "lucide-react";

export function CreateWishlistButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleCreate() {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await createWishlist(name);
      if ("error" in result) {
        setError(result.error!);
      } else {
        setOpen(false);
        setName("");
        router.refresh();
      }
    });
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)} data-testid="create-wishlist">
        <Plus className="mr-1 h-4 w-4" />
        New List
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2" data-testid="create-wishlist-form">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="List name"
        className="w-48"
        data-testid="wishlist-name-input"
        autoFocus
      />
      <Button size="sm" onClick={handleCreate} disabled={isPending} data-testid="submit-wishlist">
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
      </Button>
      <Button size="sm" variant="outline" onClick={() => setOpen(false)} data-testid="cancel-create-wishlist">
        <X className="h-4 w-4" />
      </Button>
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
}

export function WishlistActions({
  wishlistId,
  isShared,
  shareToken,
}: {
  wishlistId: string;
  isShared: boolean;
  shareToken: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState("");
  const [confirming, setConfirming] = useState(false);

  function handleToggleShare() {
    startTransition(async () => {
      await toggleWishlistSharing(wishlistId);
      router.refresh();
    });
  }

  function handleRename() {
    if (!newName.trim()) return;
    startTransition(async () => {
      await renameWishlist(wishlistId, newName);
      setRenaming(false);
      router.refresh();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteWishlist(wishlistId);
      router.refresh();
    });
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2 p-2" onClick={(e) => e.stopPropagation()}>
        <span className="text-sm text-muted">Delete list?</span>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending} data-testid={`confirm-delete-wl-${wishlistId}`}>
          {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Yes"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => setConfirming(false)} data-testid={`cancel-delete-wl-${wishlistId}`}>
          No
        </Button>
      </div>
    );
  }

  if (renaming) {
    return (
      <div className="flex items-center gap-2 p-2" onClick={(e) => e.stopPropagation()}>
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-32" data-testid={`rename-input-${wishlistId}`} />
        <Button size="sm" onClick={handleRename} disabled={isPending} data-testid={`submit-rename-${wishlistId}`}>
          <Check className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => setRenaming(false)}>
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 p-2" onClick={(e) => e.stopPropagation()}>
      <Button variant="outline" size="sm" onClick={() => setRenaming(true)} data-testid={`rename-wl-${wishlistId}`}>
        <Edit className="h-3 w-3" />
      </Button>
      <Button variant="outline" size="sm" onClick={handleToggleShare} disabled={isPending} data-testid={`share-wl-${wishlistId}`}>
        <Share2 className="h-3 w-3" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => setConfirming(true)} data-testid={`delete-wl-${wishlistId}`}>
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
}
