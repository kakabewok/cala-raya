"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  invitationFormSchema,
  InvitationFormData,
  ImageType,
} from "../schema/FormSchema";
import InvitationData from "@/types/invitation-data";
import { useRouter } from "next/navigation";
import { 
  Save, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Clock, 
  Image as ImageIcon, 
  Music, 
  Sparkles, 
  Settings,
  AlertTriangle
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useInvitationAdmin } from "@/hooks/use-invitation-admin";
import toast from "react-hot-toast";
import { slugify } from "@/lib/utils";

// Sections
import CoupleSection from "./form-sections/CoupleSection";
import RundownSection from "./form-sections/RundownSection";
import GallerySection from "./form-sections/GallerySection";
import MusicSection from "./form-sections/MusicSection";
import AdditionalSection from "./form-sections/AdditionalSection";
import SettingsSection from "./form-sections/SettingsSection";

interface InvitationFormProps {
  invitationData?: InvitationData;
  onSuccess?: () => void;
}

export function InvitationForm({
  invitationData,
  onSuccess,
}: InvitationFormProps) {
  const { refetchInvitations, setCurrentPage } = useInvitationAdmin();
  const router = useRouter();
  const { data: session } = useSession();
  const userRole = session?.user?.role || "USER";
  const isEditMode = !!invitationData;
  const [activeTab, setActiveTab] = useState<string>("couple");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize form with default values or existing data
  const form = useForm<InvitationFormData>({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: isEditMode
      ? {
          host_one_name: invitationData.host_one_name || "",
          host_one_nickname: invitationData.host_one_nickname || "",
          host_one_additional_info: invitationData.host_one_additional_info || "",
          host_one_social_media: invitationData.host_one_social_media || "",
          host_two_name: invitationData.host_two_name || "",
          host_two_nickname: invitationData.host_two_nickname || "",
          host_two_additional_info: invitationData.host_two_additional_info || "",
          host_two_social_media: invitationData.host_two_social_media || "",
          hashtag: invitationData.hashtag || "",
          themes: invitationData.themes || { name: "default" },
          web_url: process.env.NEXT_PUBLIC_APP_URL_PROD!,
          music: invitationData.music ? { 
            title: invitationData.music.title || "", 
            artist: invitationData.music.artist || "", 
            url: invitationData.music.url || "",
            public_id: invitationData.music.public_id || undefined,
            resource_type: invitationData.music.resource_type || undefined,
          } : { title: "", artist: "", url: "" },
          images: (invitationData.images || []).map((img) => ({
            url: img.url,
            type: img.type as ImageType,
            public_id: img.public_id || undefined,
            resource_type: img.resource_type || undefined,
            order_number: img.order_number ? Number(img.order_number) : undefined,
          })),
          rundowns: (invitationData.rundowns || []).map((r) => ({
            title: r.title,
            location: r.location,
            location_detail: r.location_detail || undefined,
            location_url: r.location_url || "",
            date: r.date,
            start_time: r.start_time,
            end_time: r.end_time || undefined,
            time_zone: r.time_zone,
            image_url: r.image_url || undefined,
            public_id: r.public_id || undefined,
            resource_type: r.resource_type || undefined,
            order_number: r.order_number,
          })),
          gift_infos: (invitationData.gift_infos || []).map((g) => ({
            provider_name: g.provider_name,
            account_number: g.account_number,
            account_holder: g.account_holder,
            gift_delivery_address: g.gift_delivery_address || undefined,
          })),
          stories: (invitationData.stories || []).map((s) => ({
            title: s.title,
            content: s.content,
            image_url: s.image_url,
            public_id: s.public_id || undefined,
            resource_type: s.resource_type || undefined,
            story_date: s.story_date,
            order_number: s.order_number,
          })),
          // Pre-fill user_id so admin doesn't have to re-select the owner
          user_id: invitationData.user_id ?? invitationData.user?.id ?? undefined,
        }
      : {
          host_one_name: "",
          host_one_nickname: "",
          host_one_additional_info: "",
          host_one_social_media: "",
          host_two_name: "",
          host_two_nickname: "",
          host_two_additional_info: "",
          host_two_social_media: "",
          hashtag: "",
          themes: { name: "default" },
          web_url: `${process.env.NEXT_PUBLIC_APP_URL_PROD!}`,
          music: { title: "", artist: "", url: "" },
          images: [],
          rundowns: [],
          gift_infos: [],
          stories: [],
        },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = async (data: InvitationFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditMode && !invitationData?.id) {
        throw new Error("Unable to save: Invitation ID is missing.");
      }

      const url = isEditMode ? `/api/invitations/${invitationData.id}` : "/api/invitations";
      const method = isEditMode ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to save invitation");
      }

      // const result = await response.json();
      onSuccess?.();
      
      // Refresh list to show new/updated data
      await refetchInvitations();
      
      if (!isEditMode) {
        toast.success("Invitation published successfully!");
        setCurrentPage(1); // Go to first page to see the newest
      } else {
        toast.success("Changes saved successfully");
      }
      
      // Always redirect to list after success (both create and edit)
      router.push("/dashboard/my-invitations");
      
    } catch (error: unknown) {
      console.error("Error saving invitation:", error);
      const err = error as Error;
      toast.error(err.message || "An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: "couple", label: "Couple", icon: <Heart className="w-4 h-4" /> },
    { id: "rundown", label: "Rundown", icon: <Clock className="w-4 h-4" /> },
    { id: "gallery", label: "Gallery", icon: <ImageIcon className="w-4 h-4" /> },
    { id: "music", label: "Music", icon: <Music className="w-4 h-4" /> },
    { id: "additional", label: "Additional", icon: <Sparkles className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  // Check if a tab has validation errors
  const hasTabErrors = (tabId: string): boolean => {
    const errorKeys = Object.keys(errors);
    
    switch (tabId) {
      case "couple":
        return errorKeys.some(key => 
          key.startsWith("host_one_") || key.startsWith("host_two_")
        );
      case "rundown":
        return errorKeys.includes("rundowns");
      case "gallery":
        return errorKeys.includes("images");
      case "music":
        return errorKeys.includes("music");
      case "additional":
        return errorKeys.some(key => key === "gift_infos" || key === "stories");
      case "settings":
        return errorKeys.some(key => key === "hashtag" || key === "themes");
      default:
        return false;
    }
  };

  const currentIndex = tabs.findIndex(t => t.id === activeTab);

  const nextTab = () => {
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevTab = () => {
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="pb-20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tab-Based Navigation */}
        <div className="bg-card rounded-sm border border-border overflow-hidden">
          {/* Horizontal Tabs */}
          <div className="border-b border-border bg-muted/30">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max px-4 md:px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 md:px-6 py-4 text-sm font-semibold transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`transition-colors ${
                      activeTab === tab.id 
                        ? "text-foreground" 
                        : "text-muted-foreground"
                    }`}>
                      {tab.icon}
                    </span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    
                    {/* Validation Error Indicator */}
                    {hasTabErrors(tab.id) && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                    )}
                    
                    {/* Active Tab Indicator */}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-t-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 min-h-[500px] transition-all duration-300 ease-in-out">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Calculate dynamic folder for Cloudinary uploads */}
              {(() => {
                const hostOne = watch("host_one_nickname") || "host1";
                const hostTwo = watch("host_two_nickname") || "host2";
                const mediaFolder = `invitation_media/${slugify(hostOne)}-${slugify(hostTwo)}`;

                return (
                  <>
                    {activeTab === "couple" && <CoupleSection form={form} />}
                    {activeTab === "rundown" && <RundownSection form={form} folder={mediaFolder} />}
                    {activeTab === "gallery" && <GallerySection form={form} folder={mediaFolder} />}
                    {activeTab === "music" && <MusicSection form={form} folder={mediaFolder} />}
                    {activeTab === "additional" && <AdditionalSection form={form} folder={mediaFolder} />}
                    {activeTab === "settings" && <SettingsSection form={form} userRole={userRole} />}
                  </>
                );
              })()}
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="px-6 py-4 border-t border-border bg-muted/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              type="button"
              onClick={prevTab}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed font-semibold hover:bg-background rounded-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTab === tab.id
                      ? "bg-foreground w-8"
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to ${tab.label}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={nextTab}
                disabled={currentIndex === tabs.length - 1}
                className="flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-sm font-semibold hover:bg-foreground/90 transition-colors shadow-sm disabled:opacity-30"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Global Action Footer - Sticky for Desktop, Persistent for Mobile */}
        <div className="sticky bottom-6 mt-10 z-30">
          <div className="bg-card border border-border p-4 rounded-sm shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-sm border border-border text-foreground">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</p>
                <p className="text-sm font-semibold text-foreground">
                  {isEditMode ? "Editing Invitation" : "New Invitation"}
                </p>
              </div>
            </div>

            <div className="flex w-full md:w-auto gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-10 py-3 bg-foreground text-background rounded-sm font-semibold hover:bg-foreground/90 transition-colors shadow-sm disabled:opacity-50 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>{isEditMode ? "Save All Changes" : "Publish Invitation"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
          
          {/* Validation Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="p-5 bg-red-50 dark:bg-red-950/30 border-2 border-red-100 dark:border-red-900/30 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="text-red-800 dark:text-red-400 font-black text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" /> Some fields need your attention:
              </p>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
                {Object.entries(errors).map(([key, error]) => (
                  <div key={key} className="text-xs text-red-600 dark:text-red-400 py-1 border-b border-red-100/50 dark:border-red-900/20 last:border-0 flex justify-between">
                    <span className="font-bold capitalize">{key.replace(/_/g, " ")}:</span>
                    <span className="italic">{(error as Error).message || "Invalid value"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
  );
}
