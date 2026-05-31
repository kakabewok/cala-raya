"use client";

import { useInvitationAdmin } from "@/hooks/use-invitation-admin";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { TutorialModal } from "@/components/dashboard/tutorial/TutorialModal";
import {
  Mail,
  Users,
  MessageSquare,
  UserCheck,
  UserX,
  Calendar,
  Plus,
  Clock,
  Inbox,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/format-date";
import InvitationData from "@/types/invitation-data";

// Helper function to format date time
const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getMonth()];
  const day = d.getDate();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  
  return `${month} ${day} at ${hours}:${minutes}`;
};

const DashboardPage = () => {
  const { data: session } = useSession();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const { invitationAdminData: invitations, globalStats } = useInvitationAdmin();

  const userRole = session?.user?.role || "USER";
  const isAdmin = userRole === "ADMIN";

  // Calculate accurate statistics from global database state
  const stats = useMemo(() => {
    if (globalStats) {
      return {
        ...globalStats,
        // Ensure responseRate is calculated for display
        responseRate: globalStats.totalGuests > 0 
          ? (globalStats.totalRsvps / globalStats.totalGuests) * 100 
          : 0
      };
    }

    // Default values while loading or if data is missing
    return {
      totalInvitations: 0,
      totalGuests: 0,
      totalRsvps: 0,
      attending: 0,
      notAttending: 0,
      totalGuestsAttending: 0,
      responseRate: 0
    };
  }, [globalStats]);

  // Get recent RSVPs (last 5)
  const recentRsvps = useMemo(() => {
    const allRsvps = invitations.flatMap((inv) =>
      (inv.rsvps || []).map((rsvp) => ({
        ...rsvp,
        invitationId: inv.id,
        eventTitle: inv.event_title,
        coupleNames: `${inv.host_one_nickname} & ${inv.host_two_nickname}`,
      }))
    );

    return allRsvps
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
      .slice(0, 5);
  }, [invitations]);

  // Get active invitations
  const activeInvitations = useMemo(() => {
    return invitations
      .filter((inv) => inv.is_active)
      .sort((a, b) => new Date(b.activated_at || 0).getTime() - new Date(a.activated_at || 0).getTime())
      .slice(0, 3);
  }, [invitations]);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="pt-2">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Welcome back, {session?.user?.name || "User"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {
              isAdmin && (
                <Link
                  href="/dashboard/my-invitations"
                  className="flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-md transition-colors hover:opacity-90 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  New Invitation
                </Link>
              )
            }
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Mail className="w-4 h-4" />}
          label="Invitations"
          value={stats.totalInvitations}
        />
        <StatCard
          icon={<Users className="w-4 h-4" />}
          label="Guests"
          value={stats.totalGuests}
        />
        <StatCard
          icon={<MessageSquare className="w-4 h-4" />}
          label="RSVP Responses"
          value={stats.totalRsvps}
          detail={`${Math.round(stats.responseRate)}% rate`}
        />
        <StatCard
          icon={<Clock className="w-4 h-4" />}
          label="Active"
          value={stats.totalInvitations}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats Detail */}
          <div className="bg-card rounded-sm border border-border">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">
                RSVP Breakdown
              </h3>
            </div>
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Attending</p>
                  <p className="text-lg font-semibold text-foreground">{stats.attending}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <UserX className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Not Attending</p>
                  <p className="text-lg font-semibold text-foreground">{stats.notAttending}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Guest Seats</p>
                  <p className="text-lg font-semibold text-foreground">{stats.totalGuestsAttending}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-sm border border-border">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Recent RSVP Activity</h3>
              <Link href="/dashboard/rsvp" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                View All
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentRsvps.length > 0 ? (
                recentRsvps.map((rsvp) => (
                  <div key={rsvp.id} className="px-6 py-4 flex items-start gap-3 hover:bg-muted/50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      rsvp.attendance_status 
                        ? "bg-emerald-500" 
                        : "bg-red-400"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-0.5">
                        <p className="text-sm font-medium text-foreground truncate">
                          {rsvp.guest_name}
                        </p>
                        <span className="text-[11px] text-muted-foreground">
                          {formatDateTime(rsvp.created_at)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1.5 truncate">
                        {rsvp.coupleNames} · {rsvp.attendance_status ? `Bringing ${rsvp.total_guest} guests` : "Declined"}
                      </p>
                      {rsvp.message && (
                        <p className="text-xs text-muted-foreground bg-muted/70 px-3 py-2 rounded-sm border border-border italic line-clamp-2">
                          {rsvp.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <Inbox className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No RSVP activities yet</p>
                  <Link href="/dashboard/share-invitations" className="text-xs text-foreground font-medium mt-2 inline-block hover:underline">
                    Start sharing your invitations
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar area */}
        <div className="space-y-6">
          {/* Active Invitations */}
          <div className="bg-card rounded-sm border border-border">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Active Invitations</h3>
            </div>
            <div className="p-2 space-y-0.5">
              {activeInvitations.length > 0 ? (
                activeInvitations.map((invitation: InvitationData) => (
                  <Link
                    key={invitation.id}
                    href={`/dashboard/my-invitations`}
                    className="flex flex-col p-4 rounded-sm hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">
                        {invitation.themes?.name || "Premium"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(invitation.event_date)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1 group-hover:text-foreground/80 transition-colors">
                      {invitation.host_one_nickname} & {invitation.host_two_nickname}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          {(invitation as InvitationData).guests?.length || 0}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare className="w-3 h-3" />
                          {(invitation as InvitationData).rsvps?.length || 0}
                        </div>
                      </div>
                      <ArrowRight className="w-3 h-3 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Calendar className="w-6 h-6 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">No active invitations</p>
                </div>
              )}
            </div>
            <div className="px-6 py-3 border-t border-border">
              <Link
                href="/dashboard/my-invitations"
                className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Manage All Invitations
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-sm border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              <h4 className="text-sm font-semibold text-foreground">Need Help?</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Check out our tutorial on how to customize your invitations and manage guest lists effectively.
            </p>
            <button 
              onClick={() => setIsTutorialOpen(true)}
              className="w-full bg-muted hover:bg-accent text-foreground text-xs font-medium py-2.5 rounded-sm transition-colors border border-border cursor-pointer"
            >
              View Tutorials
            </button>
          </div>
        </div>
      </div>

      {/* Tutorial Modal */}
      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
    </div>
  );
};

// Sub-component for individual stat cards
const StatCard = ({ icon, label, value, detail }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  detail?: string;
}) => {
  return (
    <div className="bg-card rounded-sm border border-border p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-muted-foreground">{icon}</span>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-semibold text-foreground tabular-nums">{value}</h3>
        {detail && (
          <span className="text-xs text-muted-foreground">{detail}</span>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
