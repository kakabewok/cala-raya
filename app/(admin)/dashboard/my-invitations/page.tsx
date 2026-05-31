"use client";

import { useInvitationAdmin } from "@/hooks/use-invitation-admin";
import { useEffect, useState } from "react";
import GeneralLoading from "@/components/GeneralLoading";
import InvitationCard from "./components/InvitationCard";
import { Plus, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const InvitationPage = () => {
  const { data: session } = useSession();
  const userRole = session?.user?.role || "USER";
  const isAdmin = userRole === "ADMIN";

  const { 
    invitationAdminData: invitations, 
    refetchInvitations,
    totalInvitations,
    currentPage,
    setCurrentPage,
    pageSize
  } = useInvitationAdmin();
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  const totalPages = Math.ceil(totalInvitations / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleInvitationDeleted = () => {
    // Refresh the invitation list after deletion
    refetchInvitations();
  };

  if (!shouldRender) {
    return <GeneralLoading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 pt-2">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            My Invitations
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your digital invitations ({totalInvitations})
          </p>
        </div>
        {
           isAdmin && (
            <Link href="/dashboard/my-invitations/create">
              <Button className="bg-foreground text-background hover:opacity-90 transition-opacity">
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
            </Link>
           )
        }
      </div>

      {/* Invitations Grid */}
      {!invitations || invitations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-card rounded-sm border border-border">
          <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1.5">
            No invitations yet
          </h3>
          <p className="text-muted-foreground text-sm text-center mb-6 max-w-md">
            Create your first digital invitation to get started
          </p>
          <Link href="/dashboard/my-invitations/create">
            <Button className="bg-foreground text-background hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Invitation
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {invitations.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                onDelete={handleInvitationDeleted}
              />
            ))}
          </div>

          {/* Pagination */}
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
      )}
    </div>
  );
};

export default InvitationPage;
