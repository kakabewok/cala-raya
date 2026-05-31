"use client";

import ChangeInvitationButton from "@/components/dashboard/ChangeInvitationButton";
import { useInvitationAdmin } from "@/hooks/use-invitation-admin";
import InvitationData from "@/types/invitation-data";
import { RsvpColumn } from "@/types/rsvp-column";
import { formatDate } from "@/utils/format-date";
import {
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  UserCheck,
  UserX,
  Inbox,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo } from "react";

// Helper function to format date
const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  
  return `${month} ${day}, ${year} at ${hours}:${minutes}`;
};

interface RsvpClientProps {
  rsvpData: RsvpColumn[]; // Current page data
  selectedInvitation?: InvitationData;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export const RsvpClient: React.FC<RsvpClientProps> = ({
  rsvpData,
  selectedInvitation,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}) => {
  const { invitationAdminData: invitations } = useInvitationAdmin();

  const bridesAndGrooms = `${selectedInvitation?.host_one_nickname} & ${selectedInvitation?.host_two_nickname}`;

  // Calculate statistics from the invitation object (assuming it has some totals or we calculate from all)
  // For now, if selectedInvitation.rsvps is incomplete due to pagination, we might need a stats API.
  // But let's use what we have in selectedInvitation if it still has all (it might not if we optimize).
  const stats = useMemo(() => {
    const allRsvps = selectedInvitation?.rsvps || [];
    const attending = allRsvps.filter((r) => (r.total_guest || 0) > 0);
    const notAttending = allRsvps.filter((r) => !r.total_guest || r.total_guest === 0);
    const totalGuests = allRsvps.reduce((sum, rsvp) => sum + (rsvp.total_guest || 0), 0);

    return {
      total: allRsvps.length || totalCount, // Fallback to totalCount if rsvps array is empty
      attending: attending.length,
      notAttending: notAttending.length,
      totalGuests,
    };
  }, [selectedInvitation?.rsvps, totalCount]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-card rounded-sm border border-border overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title & Info */}
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                RSVP & Guest Messages
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{bridesAndGrooms}</span>
                {selectedInvitation?.event_date && (
                  <>
                    <span>•</span>
                    <span>{formatDate(selectedInvitation.event_date)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Change Invitation Button */}
            {invitations.length > 1 && (
              <div className="lg:self-start">
                <ChangeInvitationButton url="/dashboard/rsvp" />
              </div>
            )}
          </div>

          {/* Statistics Cards */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/30 rounded-sm border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-md border border-border">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {stats.total}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total Responses
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-sm border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-md border border-border">
                  <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {stats.attending}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Attending
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-sm border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-md border border-border">
                  <UserX className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {stats.notAttending}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Not Attending
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-sm border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-md border border-border">
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {stats.totalGuests}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total Guests
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP List */}
      <div className="bg-card rounded-sm border border-border overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Guest Responses ({totalCount})
            </h2>
          </div>

          {rsvpData.length === 0 ? (
            // Empty State
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-muted rounded-full mb-4">
                <Inbox className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1.5">
                No guest responses yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Guest responses will appear here once they RSVP to your invitation
              </p>
            </div>
          ) : (
            <>
              {/* RSVP Cards */}
              <div className="space-y-3">
                {rsvpData.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="p-5 border border-border rounded-sm hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        {/* Guest Name & Status */}
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-base font-semibold text-foreground">
                            {rsvp.guest_name}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium border ${
                              rsvp.total_guest > 0
                                ? "bg-muted text-foreground border-border"
                                : "bg-muted text-foreground border-border"
                            }`}
                          >
                            {rsvp.total_guest > 0 ? (
                              <>
                                <CheckCircle className="w-3 h-3 text-emerald-500" />
                                Hadir
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 text-red-500" />
                                Tidak Hadir
                              </>
                            )}
                          </span>
                          {rsvp.total_guest > 0 && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-muted text-muted-foreground rounded-sm text-xs font-medium border border-border">
                              <Users className="w-3 h-3" />
                              {rsvp.total_guest}{" "}
                              {rsvp.total_guest === 1 ? "guest" : "guests"}
                            </span>
                          )}
                        </div>

                        {/* Message */}
                        {rsvp.message && (
                          <div className="p-3.5 bg-muted/50 rounded-sm border border-border">
                            <p className="text-sm text-foreground leading-relaxed italic">
                              &quot;{rsvp.message}&quot;
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Timestamp */}
                      {rsvp.created_at && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {formatDateTime(rsvp.created_at)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
                  {/* Previous Button */}
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-sm hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === "number" && onPageChange(page)}
                        disabled={page === "..."}
                        className={`min-w-[40px] h-10 px-3 text-sm font-medium rounded-sm transition-colors ${
                          page === currentPage
                            ? "bg-foreground text-background"
                            : page === "..."
                            ? "text-muted-foreground cursor-default"
                            : "text-foreground bg-background border border-border hover:bg-muted"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-sm hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
