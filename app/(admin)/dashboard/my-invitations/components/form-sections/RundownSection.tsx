"use client";

import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { InvitationFormData, SECTION_LIMITS } from "../../schema/FormSchema";
import FormInput from "../FormInput";
import { Trash2, Plus, GripVertical, Clock, AlertTriangle } from "lucide-react";

interface SectionProps {
  form: UseFormReturn<InvitationFormData>;
  folder: string;
}

export default function RundownSection({ form }: SectionProps) {
  const { control, register, formState: { errors }, watch } = form;

  const {
    fields: rundownFields,
    append: appendRundown,
    remove: removeRundown,
    move: moveRundown,
  } = useFieldArray({
    control,
    name: "rundowns",
  });

  const addRundown = () => {
    appendRundown({
      title: "",
      location: "",
      location_detail: "",
      location_url: "",
      date: "",
      start_time: "",
      end_time: "",
      time_zone: "WIB",
      order_number: rundownFields.length,
      image_url: "",
      public_id: "",
      resource_type: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Event Rundown</h2>
          <p className="text-sm text-muted-foreground">
            Add segments for your wedding events (Ceremony, Reception, etc.)
            <span className="ml-2 font-medium text-foreground">
              {rundownFields.length}/{SECTION_LIMITS.rundowns}
            </span>
          </p>
        </div>
        {rundownFields.length < SECTION_LIMITS.rundowns && (
          <button
            type="button"
            onClick={addRundown}
            className="flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background px-4 py-2 rounded-sm font-medium transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {rundownFields.map((field, idx) => (
          <div key={field.id} className="relative bg-card border border-border rounded-sm p-6 transition-all shadow-sm">
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-muted text-muted-foreground w-8 h-8 rounded-sm flex items-center justify-center font-bold text-sm border border-border">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-semibold capitalize text-foreground">
                  {watch(`rundowns.${idx}.title`) || "Untitled Event"}
                </h3>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex bg-muted rounded-sm p-1 border border-border">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveRundown(idx, idx - 1)}
                    className="p-1 hover:bg-background rounded disabled:opacity-30 transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <GripVertical className="w-4 h-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === rundownFields.length - 1}
                    onClick={() => moveRundown(idx, idx + 1)}
                    className="p-1 hover:bg-background rounded disabled:opacity-30 transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <GripVertical className="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeRundown(idx)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-sm transition-colors border border-transparent hover:border-destructive/20"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Event Title"
                placeholder="e.g. Akad Nikah"
                required
                error={errors.rundowns?.[idx]?.title}
                {...register(`rundowns.${idx}.title`)}
              />

              <FormInput
                label="Date"
                type="date"
                required
                error={errors.rundowns?.[idx]?.date}
                {...register(`rundowns.${idx}.date`)}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormInput
                  label="Start Time"
                  type="time"
                  required
                  error={errors.rundowns?.[idx]?.start_time}
                  {...register(`rundowns.${idx}.start_time`)}
                />
                <FormInput
                  label="End Time"
                  type="time"
                  error={errors.rundowns?.[idx]?.end_time}
                  {...register(`rundowns.${idx}.end_time`)}
                />
              </div>

              <FormInput
                label="Venue Name"
                placeholder="e.g. Masjid Al-Ikhlas"
                required
                error={errors.rundowns?.[idx]?.location}
                {...register(`rundowns.${idx}.location`)}
              />

              <FormInput
                label="Location URL"
                placeholder="Google Maps link"
                error={errors.rundowns?.[idx]?.location_url}
                {...register(`rundowns.${idx}.location_url`)}
              />

              <FormInput
                label="Time Zone"
                placeholder="WIB"
                required
                error={errors.rundowns?.[idx]?.time_zone}
                {...register(`rundowns.${idx}.time_zone`)}
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Location Detail
                </label>
                <textarea
                  {...register(`rundowns.${idx}.location_detail`)}
                  placeholder="e.g. Jl. Raya Sudirman No. 123, Gedung Serbaguna Lt. 2"
                  rows={2}
                  className="flex min-h-[80px] w-full px-3 py-2 text-sm border border-border rounded-sm bg-background text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none placeholder:text-muted-foreground"
                />
                {errors.rundowns?.[idx]?.location_detail && (
                  <p className="mt-1 text-xs text-destructive">{errors.rundowns?.[idx]?.location_detail?.message}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {rundownFields.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border rounded-sm bg-muted/30">
            <Clock className="w-12 h-12 text-foreground opacity-20 mx-auto mb-4" />
            <p className="text-muted-foreground">No events added yet. Start by adding your first event segment.</p>
            <button
              type="button"
              onClick={addRundown}
              className="mt-4 text-foreground font-semibold hover:underline"
            >
              + Add First Event
            </button>
          </div>
        )}
      </div>

      {errors.rundowns && (
        <p className="text-destructive text-sm mt-4 font-bold bg-destructive/10 p-4 rounded-sm border border-destructive/20 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" /> 
          {errors.rundowns.message || "Please fix errors in the rundown section"}
        </p>
      )}
    </div>
  );
}
