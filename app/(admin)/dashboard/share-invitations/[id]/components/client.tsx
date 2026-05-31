"use client";

import { AlertModal } from "@/components/dashboard/AlertModal";
import { DataTable } from "@/components/dashboard/DataTable";
import { EditMessageModal } from "@/components/dashboard/EditMessageModal";
import { ExcelUploadModal } from "@/components/dashboard/ExcelUploadModal";
import { GuestInputModal } from "@/components/dashboard/GuestInputModal";
import { TooltipHover } from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import { GuestRefetchProvider } from "@/context/GuestRefetchContext";
import { useInvitationAdmin } from "@/hooks/use-invitation-admin";
import { GuestColumn } from "@/types/guest-column";
import InvitationData from "@/types/invitation-data";
import { formatDate } from "@/utils/format-date";
import { 
  Plus, 
  Upload, 
  MessageSquare, 
  Users,
  Calendar
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { columns } from "./columns";
import ChangeInvitationButton from "@/components/dashboard/ChangeInvitationButton";

interface GuestClientProps {
  guestData: GuestColumn[];
  selectedInvitation?: InvitationData;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  refetchGuests: () => Promise<void>;
}

export const GuestClient: React.FC<GuestClientProps> = ({
  guestData,
  selectedInvitation,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  refetchGuests,
}) => {
  const {
    loading,
    setLoading,
    invitationAdminData: invitations,
    refetchInvitations,
  } = useInvitationAdmin();
  const [isSubmittingGuest, setIsSubmittingGuest] = useState<boolean>(false);
  const [ids, setIds] = useState<number[]>([]);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState<boolean>(false);
  const [guestInputModalOpen, setGuestInputModalOpen] = useState<boolean>(false);
  const [excelUploadModalOpen, setExcelUploadModalOpen] = useState<boolean>(false);
  const [editMessageModalOpen, setEditMessageModalOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const bridesAndGrooms = `${selectedInvitation?.host_one_nickname} & ${selectedInvitation?.host_two_nickname}`;

  const handleBulkDelete = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setLoadingDelete(true);

    try {
      const res = await fetch(`/api/delete-guest`, {
        method: "DELETE",
        body: JSON.stringify({ ids }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      await refetchGuests();
      refetchInvitations();
      toast.success("Guests deleted", {
        position: "top-center",
      });

      setIds([]);
      setBulkDeleteModalOpen(false);
    } catch (error) {
      console.error("An error occurred: ", error);
      toast.error("Failed to delete");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleUpload = async (
    file: File | null,
    setFile: (file: File | null) => void
  ) => {
    if (!file) {
      toast.error("Please upload the file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("invitation_id", String(selectedInvitation?.id ?? ""));

    setIsUploading(true);

    try {
      const response = await fetch("/api/generate-message/upload-excel", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await refetchGuests();
        refetchInvitations();
        setExcelUploadModalOpen(false);
        toast.success("File uploaded successfully!");
        setFile(null);
      } else {
        toast.error("Upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while uploading.");
    } finally {
      setIsUploading(false);
    }
  };

  const openDeleteModal = (ids: number[]) => {
    setIds(ids);
    setBulkDeleteModalOpen(true);
  };

  const submitGuestInput = async (guestNames: string[]) => {
    try {
      setIsSubmittingGuest(true);
      setLoading(true);
      const res = await fetch("/api/generate-message/manual-guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guests: guestNames,
          invitationId: selectedInvitation?.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to add guests");

      await refetchGuests();
      refetchInvitations();
      setGuestInputModalOpen(false);

      toast.success("Guests added successfully", {
        position: "top-center",
      });
    } catch (err) {
      toast.error("Failed to add guest", {
        position: "top-center",
      });
      console.error(err);
    } finally {
      setIsSubmittingGuest(false);
      setLoading(false);
    }
  };

  const handleSaveTemplate = async (template: string) => {
    if (!selectedInvitation?.id) {
      toast.error("Invitation ID not found!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/template-message", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitationId: selectedInvitation?.id,
          template,
        }),
      });

      if (!res.ok) throw new Error("Failed to save template");

      await refetchGuests();
      refetchInvitations();

      toast.success("Template updated successfully!");
      setEditMessageModalOpen(false);
    } catch (err) {
      console.error("Save template error: ", err);
      toast.error("Failed to save template. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestRefetchProvider value={{ refetchGuests }}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-card rounded-sm border border-border overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Invitation Info */}
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                  {bridesAndGrooms}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {selectedInvitation?.event_date
                      ? formatDate(selectedInvitation.event_date)
                      : "No date set"}
                  </span>
                </div>
                {selectedInvitation?.additional_info && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedInvitation.additional_info}
                  </p>
                )}
              </div>

              {/* Change Invitation Button */}
              {invitations.length > 1 && (
                <div className="lg:self-start">
                  <ChangeInvitationButton url="/dashboard/share-invitations" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Guest Management Section */}
        <div className="bg-card rounded-sm border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Guest Count */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-md border border-border">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Guest List
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {totalCount} {totalCount === 1 ? "guest" : "guests"} registered
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <TooltipHover message="Upload Excel File">
                  <Button
                    onClick={() => setExcelUploadModalOpen(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="hidden sm:inline">Upload</span>
                  </Button>
                </TooltipHover>

                <TooltipHover message="Add Guest Manually">
                  <Button
                    onClick={() => setGuestInputModalOpen(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Guest</span>
                  </Button>
                </TooltipHover>

                <TooltipHover message="Edit Message Template">
                  <Button
                    onClick={() => setEditMessageModalOpen(true)}
                    size="sm"
                    className="flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Message Template</span>
                  </Button>
                </TooltipHover>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="p-6">
            <DataTable
              onDelete={openDeleteModal}
              searchKey="name"
              columns={columns}
              data={guestData}
              serverSidePagination={true}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <AlertModal
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        onConfirm={handleBulkDelete}
        loading={loadingDelete}
        description="All data under these guests will also be deleted."
      />
      <EditMessageModal
        isOpen={editMessageModalOpen}
        onClose={() => setEditMessageModalOpen(false)}
        onSubmit={handleSaveTemplate}
        initialTemplate={selectedInvitation?.message_template || ""}
        loading={loading}
      />
      <GuestInputModal
        isOpen={guestInputModalOpen}
        onClose={() => setGuestInputModalOpen(false)}
        onSubmit={submitGuestInput}
        loading={isSubmittingGuest || loading}
      />
      <ExcelUploadModal
        isOpen={excelUploadModalOpen}
        onClose={() => setExcelUploadModalOpen(false)}
        onUpload={handleUpload}
        loading={isUploading}
      />
    </GuestRefetchProvider>
  );
};
