"use client";

import React, { useEffect, useState, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { InvitationFormData } from "../../schema/FormSchema";
import FormInput from "../FormInput";
import CloudinaryButton from "../CloudinaryButton";
import { Trash2, Music, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Music as MusicType } from "@/types/invitation-data";

interface SectionProps {
  form: UseFormReturn<InvitationFormData>;
  folder: string;
}

export default function MusicSection({ form, folder }: SectionProps) {
  const { watch, setValue, register, formState: { errors } } = form;
  const [rawMusicLibrary, setRawMusicLibrary] = useState<MusicType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectionMode, setSelectionMode] = useState<"library" | "upload">("library");

  const currentUrl = watch("music.url");

  // Deduplicate music library by URL to prevent duplicate key errors
  const musicLibrary = useMemo(() => {
    const seen = new Set();
    return rawMusicLibrary.filter((m) => {
      if (!m.url || seen.has(m.url)) return false;
      seen.add(m.url);
      return true;
    });
  }, [rawMusicLibrary]);

  useEffect(() => {
    fetch("/api/music-library")
      .then((res) => res.json())
      .then((data) => {
        const music = data.music || [];
        setRawMusicLibrary(music);
        
        // If current music URL matched one in library, set mode to library
        if (currentUrl && music.some((m: MusicType) => m.url === currentUrl)) {
          setSelectionMode("library");
        } else if (currentUrl) {
          setSelectionMode("upload");
        }
      })
      .catch((err) => console.error("Failed to fetch music library:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleLibrarySelect = (url: string) => {
    // If selecting the placeholder/empty option
    if (!url) {
      setValue("music.url", "", { shouldDirty: true, shouldValidate: true });
      setValue("music.title", "", { shouldDirty: true });
      setValue("music.artist", "", { shouldDirty: true });
      setValue("music.public_id", "", { shouldDirty: true });
      setValue("music.resource_type", "", { shouldDirty: true });
      return;
    }

    const selected = musicLibrary.find((m) => m.url === url);
    if (selected) {
      setValue("music.url", selected.url, { shouldDirty: true, shouldValidate: true });
      setValue("music.title", selected.title || "", { shouldDirty: true });
      setValue("music.artist", selected.artist || "", { shouldDirty: true });
      setValue("music.public_id", selected.public_id || "", { shouldDirty: true });
      setValue("music.resource_type", selected.resource_type || "video", { shouldDirty: true });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setSelectionMode("library")}
          className={`flex-1 py-3 px-4 rounded-sm border transition-colors flex items-center justify-center gap-2 text-sm font-semibold ${
            selectionMode === "library"
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          <Music className="w-4 h-4" />
          <span>Choose from Library</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectionMode("upload")}
          className={`flex-1 py-3 px-4 rounded-sm border transition-colors flex items-center justify-center gap-2 text-sm font-semibold ${
            selectionMode === "upload"
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload Custom Music</span>
        </button>
      </div>

      <div className="p-6 border border-border rounded-sm bg-card shadow-sm space-y-6">
        {selectionMode === "library" ? (
          <div className="space-y-4">
            <label className="block text-sm font-semibold">Select Background Music</label>
            <Select onValueChange={handleLibrarySelect} value={currentUrl || undefined}>
              <SelectTrigger className="w-full h-12 py-6">
                <SelectValue placeholder={loading ? "Loading music..." : "Select a music"} />
              </SelectTrigger>
              <SelectContent>
                {musicLibrary.map((song, idx) => (
                  <SelectItem 
                    key={`song-${song.id || idx}-${song.public_id || 'new'}`} 
                    value={song.url} 
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{song.title}</span>
                      <span className="text-xs text-gray-500 ">{song.artist}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.music?.url && (
              <p className="text-red-500 text-sm mt-1">{errors.music.url.message}</p>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Upload Music (MP3/WAV/OGG)
              </label>
              <div className="flex gap-2">
                <input
                  {...register("music.url")}
                  className="flex-1 px-3 py-2 border border-border rounded-sm bg-muted text-muted-foreground cursor-not-allowed text-sm"
                  readOnly
                  placeholder="No file uploaded"
                />
                <CloudinaryButton
                  type="music"
                  label="Upload"
                  folder={folder}
                  className="bg-foreground hover:bg-foreground/90 text-background px-6 py-2 rounded-sm text-sm font-medium transition-colors whitespace-nowrap"
                  onSuccess={(data) => {
                    setValue("music.url", data.url, { shouldDirty: true, shouldValidate: true });
                    setValue("music.public_id", data.public_id, { shouldDirty: true });
                    setValue("music.resource_type", data.resource_type, { shouldDirty: true });
                  }}
                  isMultiple={false}
                />
              </div>
              {errors.music?.url && (
                <p className="text-destructive text-sm mt-1">{errors.music.url.message}</p>
              )}
            </div>

            <FormInput
              label="Title"
              placeholder="e.g. My Custom Wedding Song"
              error={errors.music?.title}
              {...register("music.title")}
            />
            <FormInput
              label="Artist"
              placeholder="e.g. Jen Maliq"
              error={errors.music?.artist}
              {...register("music.artist")}
            />
          </div>
        )}

        {/* Audio Player Preview */}
        {currentUrl && (
          <div className="mt-8 border-t border-border pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted border border-border rounded-sm flex items-center justify-center">
                  <Music className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{watch("music.title") || "Unknown Title"}</p>
                  <p className="text-xs text-muted-foreground">{watch("music.artist") || "Unknown Artist"}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setValue("music.url", "", { shouldDirty: true, shouldValidate: true });
                  setValue("music.title", "");
                  setValue("music.artist", "");
                  setValue("music.public_id", "");
                  setValue("music.resource_type", "");
                }}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-sm transition-colors"
                title="Remove Music"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <audio controls src={currentUrl} className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-muted/50 border border-border rounded-sm">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Tip: Recommended music file size is under 1MB for faster loading. You can compress your MP3 files at <a href="https://www.onlineconverter.com/compress-mp3" target="_blank" className="underline font-medium text-foreground">onlineconverter.com</a>.
        </p>
      </div>
    </div>
  );
}
