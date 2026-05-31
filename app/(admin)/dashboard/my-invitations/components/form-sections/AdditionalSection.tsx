"use client";

import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { InvitationFormData, getThemeFeatures, SECTION_LIMITS } from "../../schema/FormSchema";
import FormInput from "../FormInput";
import { Trash2, Plus, Gift, BookOpen, Info } from "lucide-react";
import CloudinaryButton from "../CloudinaryButton";
import Image from "next/image";

interface SectionProps {
  form: UseFormReturn<InvitationFormData>;
  folder: string;
}

export default function AdditionalSection({ form, folder }: SectionProps) {
  const { control, register, formState: { errors }, setValue, watch } = form;

  // Derive theme feature flags
  const currentThemeName = watch("themes.name") || "default";
  const themeFeatures = getThemeFeatures(currentThemeName);

  // Gift Info
  const {
    fields: giftFields,
    append: appendGift,
    remove: removeGift,
  } = useFieldArray({
    control,
    name: "gift_infos",
  });

  // Story
  const {
    fields: storyFields,
    append: appendStory,
    remove: removeStory,
    move: moveStory,
  } = useFieldArray({
    control,
    name: "stories",
  });

  return (
    <div className="space-y-10">
      {/* Gift Info Section — always visible */}
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-foreground/75" />
            <h3 className="text-lg font-semibold text-foreground">Wedding Gift / Digital Wallet</h3>
            <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded-sm">
              {giftFields.length}/{SECTION_LIMITS.gift_infos}
            </span>
          </div>
          {giftFields.length < SECTION_LIMITS.gift_infos && (
            <button
              type="button"
              onClick={() => appendGift({ provider_name: "", account_number: "", account_holder: "", gift_delivery_address: "" })}
              className="flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background px-4 py-2 rounded-sm text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Account</span>
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {giftFields.map((field, idx) => (
            <div key={field.id} className="relative p-5 border border-border rounded-sm bg-card shadow-sm">
              <button
                type="button"
                onClick={() => removeGift(idx)}
                className="absolute top-4 right-4 text-destructive hover:text-destructive/80 transition-colors p-1.5 hover:bg-destructive/10 rounded-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="space-y-4 pt-4">
                <FormInput
                  label="Provider (BCA / Mandiri / OVO / etc.)"
                  required
                  error={errors.gift_infos?.[idx]?.provider_name}
                  {...register(`gift_infos.${idx}.provider_name`)}
                />
                <FormInput
                  label="Account Number"
                  required
                  error={errors.gift_infos?.[idx]?.account_number}
                  {...register(`gift_infos.${idx}.account_number`)}
                />
                <FormInput
                  label="Account Holder Name"
                  required
                  error={errors.gift_infos?.[idx]?.account_holder}
                  {...register(`gift_infos.${idx}.account_holder`)}
                />
                <FormInput
                  label="Shipping Address (Optional for Physical Gifts)"
                  error={errors.gift_infos?.[idx]?.gift_delivery_address}
                  {...register(`gift_infos.${idx}.gift_delivery_address`)}
                />
              </div>
            </div>
          ))}
        </div>

        {giftFields.length === 0 && (
          <div className="bg-muted/50 p-8 rounded-sm border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground text-sm">
            <p>No gift information added. Guests wont see digital wallet info.</p>
          </div>
        )}
      </div>

      {/* Love Story Section — ONLY visible for themes with stories feature */}
      {themeFeatures.stories ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-foreground/75" />
              <h3 className="text-lg font-semibold text-foreground">Our Journey / Love Story</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-red-600 text-white">
                NETFLIX
              </span>
              <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded-sm">
                {storyFields.length}/{SECTION_LIMITS.stories}
              </span>
            </div>
            {storyFields.length < SECTION_LIMITS.stories && (
              <button
                type="button"
                onClick={() => appendStory({ title: "", content: "", image_url: "", story_date: "", order_number: storyFields.length })}
                className="flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background px-4 py-2 rounded-sm text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Story</span>
              </button>
            )}
          </div>

          <div className="space-y-6">
            {storyFields.map((field, idx) => (
              <div key={field.id} className="p-5 border border-border rounded-sm bg-card shadow-sm space-y-4 relative">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-foreground">Story Moment #{idx + 1}</h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveStory(idx, idx - 1)}
                      className="p-1.5 border border-border rounded-sm bg-card hover:bg-muted text-foreground disabled:opacity-30 disabled:hover:bg-card transition-colors"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={idx === storyFields.length - 1}
                      onClick={() => moveStory(idx, idx + 1)}
                      className="p-1.5 border border-border rounded-sm bg-card hover:bg-muted text-foreground disabled:opacity-30 disabled:hover:bg-card transition-colors"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeStory(idx)}
                      className="p-1.5 text-destructive hover:bg-destructive/10 rounded-sm transition-colors ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormInput
                      label="Story Title"
                      required
                      error={errors.stories?.[idx]?.title}
                      {...register(`stories.${idx}.title`)}
                    />
                    <FormInput
                      label="Date"
                      type="date"
                      required
                      error={errors.stories?.[idx]?.story_date}
                      {...register(`stories.${idx}.story_date`)}
                    />
                    <div>
                      <label className="block text-sm font-semibold mb-2">Content / Story Detail</label>
                      <textarea
                        {...register(`stories.${idx}.content`)}
                        rows={4}
                        className="w-full px-3 py-2 border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground text-sm"
                        placeholder="Tell the story of this moment..."
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="block text-sm font-semibold">Memory Photo</label>
                    <div className="flex gap-2">
                      <input
                        {...register(`stories.${idx}.image_url`)}
                        className="flex-1 px-3 py-2 border border-border rounded-sm bg-muted text-muted-foreground cursor-not-allowed text-xs"
                        readOnly
                        placeholder="Upload photo..."
                      />
                      <CloudinaryButton
                        type="image"
                        label="Upload"
                        folder={folder}
                        onSuccess={(data) => {
                          setValue(`stories.${idx}.image_url`, data.url, { shouldDirty: true, shouldValidate: true });
                          setValue(`stories.${idx}.public_id`, data.public_id, { shouldDirty: true });
                          setValue(`stories.${idx}.resource_type`, data.resource_type, { shouldDirty: true });
                        }}
                        className="bg-foreground hover:bg-foreground/90 text-background px-4 py-2 rounded-sm text-sm font-medium transition-colors whitespace-nowrap"
                      />
                    </div>

                    {watch(`stories.${idx}.image_url`) && (
                      <div className="relative aspect-video rounded-sm overflow-hidden border border-border bg-muted">
                        <Image
                          src={watch(`stories.${idx}.image_url`) || "/placeholder-image.png"}
                          alt="Story"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {errors.stories?.[idx]?.image_url && <p className="text-red-500 text-sm">{errors.stories[idx].image_url.message}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {storyFields.length === 0 && (
            <div className="bg-muted/50 p-8 rounded-sm border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground text-sm">
              <p>Share your love story with your guests!</p>
            </div>
          )}
        </div>
      ) : (
        /* Info banner when stories are not available for this theme */
        <div className="bg-muted/50 border border-border p-4 rounded-sm flex gap-3 items-start">
          <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-bold text-foreground">Love Story not available</p>
            <p>
              The Love Story / Journey section is only available for the <span className="font-bold text-foreground">Netflix</span> theme.
              Switch to Netflix in Settings to enable this feature.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
