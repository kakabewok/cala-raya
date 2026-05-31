"use client";

import BadgeCorner from "@/components/BadgeCorner";
import GeneralLoading from "@/components/GeneralLoading";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useInvitationAdmin } from "@/hooks/use-invitation-admin";
import { useSelectedInvitation } from "@/hooks/use-selected-invitation";
import { formatDate } from "@/utils/format-date";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SelectInvitationGrid() {
  const { 
    invitationAdminData: invitations, 
    totalInvitations, 
    currentPage, 
    setCurrentPage, 
    pageSize 
  } = useInvitationAdmin();
  const { getInvitationId, setInvitationId, removeInvitationId } = useSelectedInvitation();
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const router = useRouter();

  const totalPages = Math.ceil(totalInvitations / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (totalInvitations === 1 && invitations.length === 1) {
      const firstInvitation = invitations[0];
      router.replace(`/dashboard/share-invitations/${firstInvitation.id}`);
      return;
    }

    if (totalInvitations > 1) {
      const id = getInvitationId();
      if (id) {
        // We only redirect if the id is found in the current fetched list 
        // OR we just let it be if we want full list. 
        // Actually, if we have pagination, we might not want to auto-redirect 
        // unless we are sure about the context.
        // For now, let's keep the logic but check if invitations exists.
        const exists = invitations.some(inv => inv.id === id);
        if (exists) {
          router.replace(`/dashboard/share-invitations/${id}`);
          return;
        }
      }
    }

    setShouldRender(true);
  }, [getInvitationId, invitations, totalInvitations, router, removeInvitationId]);

  if (!shouldRender) {
    return <GeneralLoading />;
  }

  if (totalInvitations === 0) {
    return (
      <div className="text-center text-muted-foreground py-20">
        You don&apos;t have any invitations yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="pt-2">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Pick an Invitation</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Select one to share with your friends and family ({totalInvitations})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {invitations.map((invitation) => (
          <Card
            key={invitation.id}
            className="overflow-hidden hover:bg-muted/30 relative p-5 rounded-sm border border-border cursor-pointer transition-colors"
            onClick={() => {
              setInvitationId(invitation.id);
              router.push(`/dashboard/share-invitations/${invitation.id}`);
            }}
          >
            {invitation.additional_info && (
              <BadgeCorner content={invitation.additional_info} />
            )}
            <h2 className="font-semibold text-base mb-1 text-foreground">
              {invitation.host_one_nickname} & {invitation.host_two_nickname}
            </h2>
            {invitation.themes?.name && (
              <span className="absolute bottom-3 right-3 bg-muted text-muted-foreground text-xs font-medium px-2 py-0.5 rounded-sm">
                {invitation.themes?.name}
              </span>
            )}
            <Separator className="bg-border" />
            <p className="text-sm text-muted-foreground">
              {formatDate(invitation.event_date)}
            </p>
          </Card>
        ))}
      </div>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{Math.min((currentPage - 1) * pageSize + 1, totalInvitations)}</span> to{" "}
            <span className="font-medium text-foreground">
              {Math.min(currentPage * pageSize, totalInvitations)}
            </span>{" "}
            of <span className="font-medium text-foreground">{totalInvitations}</span> invitations
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            
            <div className="hidden sm:flex items-center px-4 h-9 rounded-md bg-muted text-xs font-medium text-foreground border border-border">
              {currentPage} / {totalPages}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
