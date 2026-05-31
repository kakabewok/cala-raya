"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import InvitationData from "@/types/invitation-data";
import { formatDate } from "@/utils/format-date";
import BadgeCorner from "@/components/BadgeCorner";
import Link from "next/link";
import { Trash2, Edit, Eye, Share2, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { encode } from "@/utils/hash";
import { useSelectedInvitation } from "@/hooks/use-selected-invitation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface InvitationCardProps {
  invitation: InvitationData;
  onDelete?: () => void;
}

const InvitationCard = ({ invitation, onDelete }: InvitationCardProps) => {
  const router = useRouter();
  const { getInvitationId, removeInvitationId } = useSelectedInvitation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/invitations/${invitation.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete invitation");
      }

      // Clean up localStorage if the deleted invitation was the selected one
      if (getInvitationId() === invitation.id) {
        removeInvitationId();
      }

      toast.success("Invitation deleted successfully");
      setDeleteDialogOpen(false);
      
      // Call onDelete callback if provided
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting invitation:", error);
      toast.error("Failed to delete invitation");
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Preview using the default "Calaraya" guest.
   * Fetches the guest ID from the API, encodes it into the URL token,
   * and opens the invitation exactly as a real guest would see it.
   */
  const handleView = async () => {
    if (!invitation.web_url || !invitation.slug) {
      toast.error("Invitation URL not available");
      return;
    }

    setIsPreviewing(true);

    try {
      const res = await fetch(`/api/invitations/${invitation.id}/preview-guest`);
      if (!res.ok) throw new Error("Failed to fetch preview guest");

      const { guest } = await res.json();
      const token = encode([invitation.id, guest.id]);
      const url = `${invitation.web_url}/${invitation.slug}?id=${token}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating preview URL:", error);
      toast.error("Failed to generate preview link");
    } finally {
      setIsPreviewing(false);
    }
  };

  const handleShare = () => {
    router.push(`/dashboard/share-invitations/${invitation.id}`);
  };

  return (
    <>
      <div className="overflow-hidden relative bg-card p-5 rounded-sm border border-border transition-colors hover:bg-muted/30 group">
        {invitation.additional_info && (
          <BadgeCorner content={invitation.additional_info} />
        )}
        
        {/* Content */}
        <div className="mb-3 pr-16">
          <h2 className="font-semibold text-base mb-1 text-foreground">
            {invitation.host_one_nickname} & {invitation.host_two_nickname}
          </h2>
          <p className="text-sm text-muted-foreground">
            {formatDate(invitation.event_date)}
          </p>
        </div>

        <Separator className="bg-border my-3" />

        {/* Theme Badge */}
        {invitation.themes?.name && (
          <div className="mb-3">
            <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-sm">
              {invitation.themes.name}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleView}
            disabled={isPreviewing}
            className="h-8 px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Preview invitation"
          >
            {isPreviewing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-8 px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Share invitation"
          >
            <Share2 className="w-4 h-4" />
          </Button>

          <Link href={`/dashboard/my-invitations/${invitation.id}/edit`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Edit invitation"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
            className="h-8 px-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Delete invitation"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the invitation for{" "}
              <span className="font-semibold">
                {invitation.host_one_nickname} & {invitation.host_two_nickname}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default InvitationCard;
