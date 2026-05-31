"use client";

import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { InvitationFormData } from "../../schema/FormSchema";
import FormInput from "../FormInput";
import { Settings, Layout, Info, ShieldCheck, Lock, Users } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Theme } from "@/types/invitation-data";

interface UserListItem {
  id: number;
  name: string | null;
  email: string | null;
  role: string | null;
}

interface SectionProps {
  form: UseFormReturn<InvitationFormData>;
  userRole?: string;
}

export default function SettingsSection({ form, userRole }: SectionProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const currentTheme = watch("themes.name");
  const isAdmin = userRole === "ADMIN";
  
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  // ── ADMIN: User list for assignment ──
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const selectedUserId = watch("user_id");

  useEffect(() => {
    fetch("/api/themes")
      .then(res => res.json())
      .then(data => {
        setThemes(data.themes || []);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch user list only when user is admin
  useEffect(() => {
    if (!isAdmin) return;

    setLoadingUsers(true);
    fetch("/api/users/list")
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
      })
      .catch(() => {
        setUsers([]);
      })
      .finally(() => setLoadingUsers(false));
  }, [isAdmin]);

  // Simplified previews for the UI
  const themePreviews: Record<string, string> = {
    netflix: "/assets/images/themes/netflix-preview.webp",
    stylishBold: "/assets/images/themes/stylish-bold-preview.webp",
    default: "/assets/images/themes/default-preview.webp",
    maroon: "/assets/images/themes/maroon-preview.webp",
    monochrome: "/assets/images/themes/monochrome-preview.webp",
  };

  const handleThemeChange = (themeName: string) => {
    setValue("themes.name", themeName, { shouldDirty: true, shouldValidate: true });
  };

  const handleUserChange = (userId: string) => {
    setValue("user_id", Number(userId), { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      {/* ── ADMIN: User Assignment Section ── */}
      {isAdmin && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-foreground/75" />
              <h3 className="text-lg font-semibold text-foreground">Assign to User</h3>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 border border-border bg-muted text-muted-foreground rounded-sm text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              ADMIN ONLY
            </div>
          </div>

          <div className="bg-muted/50 border border-border p-4 rounded-sm flex gap-3 items-start">
            <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">User Assignment</p>
              <p>Select which user will own this invitation. If not selected, the invitation will be assigned to you.</p>
            </div>
          </div>

          <div className="space-y-2 max-w-md">
            <label className="block text-sm font-semibold text-foreground">
              Select User
            </label>
            <Select 
              onValueChange={handleUserChange} 
              value={selectedUserId ? String(selectedUserId) : undefined}
            >
              <SelectTrigger className="w-full h-12 bg-card border border-border rounded-sm focus:ring-1 focus:ring-foreground">
                <SelectValue placeholder={loadingUsers ? "Loading users..." : "Select a user (optional)"} />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={String(user.id)} className="cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-sm bg-muted border border-border flex items-center justify-center text-foreground text-xs font-semibold shrink-0">
                        {(user.name || "?")[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{user.name || "Unnamed"}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                      {user.role === "ADMIN" && (
                        <span className="ml-auto bg-foreground text-background text-[10px] px-1.5 py-0.5 rounded-sm font-semibold">
                          ADMIN
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Leave empty to assign the invitation to yourself.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Settings className="w-5 h-5 text-foreground/75" />
          <h3 className="text-lg font-semibold text-foreground">General Settings</h3>
        </div>

        <div className="max-w-md">
          <FormInput
            label="Wedding Hashtag"
            placeholder="e.g. #NickJaneWedding"
            description="This will be displayed on several parts of your invitation."
            error={errors.hashtag}
            {...register("hashtag")}
          />
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <Layout className="w-5 h-5 text-foreground/75" />
            <h3 className="text-lg font-semibold text-foreground">Invitation Theme</h3>
          </div>
          {isAdmin ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 border border-border bg-muted text-muted-foreground rounded-sm text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              ADMIN ACCESS
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-0.5 border border-border bg-muted text-muted-foreground rounded-sm text-[10px] font-bold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              READ ONLY
            </div>
          )}
        </div>

        {!isAdmin ? (
          <div className="bg-muted/50 border border-border p-4 rounded-sm flex gap-3 items-start">
            <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Theme is locked</p>
              <p>Your invitation theme is assigned based on your purchase. To change the theme, please contact support or upgrade your package.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-md">
            <label className="block text-sm font-semibold text-foreground">
              Change Active Theme
            </label>
            <Select onValueChange={handleThemeChange} value={currentTheme}>
              <SelectTrigger className="w-full h-12 bg-card border border-border rounded-sm focus:ring-1 focus:ring-foreground">
                <SelectValue placeholder={loading ? "Loading themes..." : "Select a theme"} />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => (
                  <SelectItem key={theme.id} value={theme.name} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                       <span className="font-medium capitalize text-sm">{theme.name}</span>
                       {theme.name === 'netflix' && <span className="bg-red-600 text-[10px] text-white px-1.5 py-0.5 rounded-sm font-semibold">HOT</span>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Note: Changing themes may affect how your photos and rundown are displayed.
            </p>
          </div>
        )}

        <div className="mt-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Preview Selected Theme</p>
          <div className="relative group max-w-[260px] rounded-sm overflow-hidden border border-border shadow-sm">
            <div className="aspect-[9/16] relative bg-muted">
              {/* Fallback to a placeholder if preview not found */}
              <Image
                src={themePreviews[currentTheme] || "/placeholder.png"}
                alt={`Theme: ${currentTheme}`}
                fill
                className="object-cover transition-transform duration-75 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-5">
                <span className="text-[9px] font-medium tracking-wider text-white/60 uppercase mb-1">Active Template</span>
                <h4 className="text-2xl font-bold text-white capitalize tracking-tight">{currentTheme}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
