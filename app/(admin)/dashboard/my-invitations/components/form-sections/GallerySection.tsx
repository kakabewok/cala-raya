"use client";

import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  ImageType,
  InvitationFormData,
  getImageTypesForTheme,
  getMaxImagesForType,
} from "../../schema/FormSchema";
import CloudinaryButton from "../CloudinaryButton";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../SortableItem";
import Image from "next/image";
import { Trash2, GripVertical, Image as ImageIcon, Check, AlertCircle } from "lucide-react";

interface SectionProps {
  form: UseFormReturn<InvitationFormData>;
  folder: string;
}

export default function GallerySection({ form, folder }: SectionProps) {
  const { control, watch, setValue, trigger } = form;

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
    move: moveImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  // Derive visible image types from current theme
  const currentThemeName = watch("themes.name") || "default";
  const visibleImageTypes = getImageTypesForTheme(currentThemeName);

  const handleDragEnd = (event: DragEndEvent, type: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeIndex = imageFields.findIndex((f) => f.id === active.id);
    const overIndex = imageFields.findIndex((f) => f.id === over.id);

    moveImage(activeIndex, overIndex);

    // Sync order numbers
    setTimeout(() => {
      const items = form.getValues("images");
      let order = 0;
      items.forEach((item, idx) => {
        if (item.type === type) {
          setValue(`images.${idx}.order_number`, order);
          order++;
        }
      });
      trigger("images");
    }, 10);
  };

  return (
    <div className="space-y-10">
      {visibleImageTypes.map((type) => {
        const typeImages = imageFields.filter(
          (_, idx) => watch(`images.${idx}.type`) === type
        );
        const maxAllowed = getMaxImagesForType(type);
        const isGallery = type === "gallery";
        const hasReachedLimit = maxAllowed !== null && typeImages.length >= maxAllowed;

        return (
          <div key={type} className="space-y-4">
            <div className="flex justify-between items-end border-b pb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold capitalize text-foreground">
                    {type.replace(/-/g, " ")}
                  </h3>
                  {/* Upload limit badge */}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      hasReachedLimit
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {hasReachedLimit ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> UPLOADED
                      </span>
                    ) : (
                      isGallery ? `${typeImages.length}/${maxAllowed}` : `MAX 1`
                    )}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isGallery
                    ? `Add photos for your gallery (max ${maxAllowed})`
                    : `Upload ${type.replace(/-/g, " ")} image (max 1)`}
                </p>
              </div>

              {/* Upload button: hidden when limit reached */}
              {!hasReachedLimit && (
                <CloudinaryButton
                  type="image"
                  folder={folder}
                  onSuccess={(data) => {
                    appendImage({
                      url: data.url,
                      public_id: data.public_id,
                      resource_type: data.resource_type,
                      type: type as ImageType,
                      order_number: typeImages.length,
                    });
                  }}
                  isMultiple={isGallery}
                  maxFiles={maxAllowed ? maxAllowed - typeImages.length : 1}
                  label={typeImages.length > 0 ? "Add More" : "Upload"}
                  className="bg-foreground hover:bg-foreground/90 text-background px-4 py-2 rounded-sm text-sm font-medium transition-colors cursor-pointer"
                />
              )}
            </div>

            {typeImages.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => handleDragEnd(e, type)}
              >
                <div
                  className={`grid gap-4 ${
                    isGallery
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                      : "grid-cols-1 max-w-xs"
                  }`}
                >
                  <SortableContext
                    items={typeImages.map((f) => f.id)}
                    strategy={rectSortingStrategy}
                  >
                    {imageFields.map((field, idx) => {
                      if (watch(`images.${idx}.type`) !== type) return null;

                      return (
                        <SortableItem key={field.id} id={field.id}>
                          <div className="group relative aspect-[4/3] rounded-sm overflow-hidden border border-border hover:border-foreground transition-all shadow-sm bg-muted/30">
                            <Image
                              src={watch(`images.${idx}.url`) || "/placeholder.png"}
                              alt={`Image ${idx}`}
                              fill
                              className="object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                              {isGallery && (
                                <div className="bg-white/90 p-2 rounded-full cursor-grab active:cursor-grabbing text-slate-800">
                                  <GripVertical className="w-5 h-5" />
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="bg-red-500/90 p-2 rounded-full text-white hover:bg-red-600 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Order Badge (gallery only) */}
                            {isGallery && (
                              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-md">
                                #{watch(`images.${idx}.order_number`) || 0}
                              </div>
                            )}
                          </div>
                        </SortableItem>
                      );
                    })}
                  </SortableContext>
                </div>
              </DndContext>
            ) : (
              <div className="h-32 border border-dashed border-border rounded-sm flex flex-col items-center justify-center text-muted-foreground bg-muted/30">
                <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">
                  No images uploaded for this section
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Validation Error Banner */}
      {form.formState.errors.images && (
        <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-sm text-sm text-destructive">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{form.formState.errors.images.message || "Please check your image uploads."}</span>
        </div>
      )}
    </div>
  );
}
