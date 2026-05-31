"use client";

import InputError from "@/components/dashboard/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/invitation-data";
import { useState } from "react";
import { User as UserIcon, Mail as MailIcon, Save, Loader2 } from "lucide-react";

const UpdateProfile = ({ user }: { user: User | null }) => {
  const [name, setName] = useState<string | undefined>(user?.name);
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [processing, setProcessing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const clearMessage = (duration: number) => {
    setTimeout(() => {
      setMessage("");
    }, duration);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    setMessage("");

    try {
      const res = await fetch("/api/user/update-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.error || {});
        setMessage(data.message || "Failed to update profile");
        clearMessage(4000);
      } else {
        setMessage(data.message || "Profile updated successfully");
        clearMessage(4000);
      }
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "An unexpected error occurred");
      clearMessage(4000);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="border-border overflow-hidden bg-card rounded-sm">
      <CardHeader className="border-b border-border bg-muted/30 p-5 md:p-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Profile Information
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm mt-0.5">
              Keep your contact details up to date
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 md:p-8">
        <form onSubmit={submit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-medium text-foreground ml-0.5">
                Display Name
              </Label>
              <div className="relative group">
                <Input
                  id="name"
                  className="pl-11"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                />
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 group-focus-within:text-foreground transition-colors" />
              </div>
              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-foreground ml-0.5">
                Legal Email Address
              </Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  className="pl-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                />
                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 group-focus-within:text-foreground transition-colors" />
              </div>
              <InputError className="mt-2" message={errors.email} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-border">
            <div className="flex-1 min-h-[24px]">
              {message && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm font-medium animate-in fade-in slide-in-from-left-2 ${
                  message.toLowerCase().includes("failed") || message.toLowerCase().includes("error") || message.toLowerCase().includes("not found")
                    ? "text-destructive bg-destructive/10" 
                    : "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                }`}>
                  {message}
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={processing}
              className="bg-foreground text-background hover:bg-foreground/90 min-w-[140px]"
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateProfile;
