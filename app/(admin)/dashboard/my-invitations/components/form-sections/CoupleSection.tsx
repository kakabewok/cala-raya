"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { InvitationFormData } from "../../schema/FormSchema";
import FormInput from "../FormInput";

interface SectionProps {
  form: UseFormReturn<InvitationFormData>;
}

export default function CoupleSection({ form }: SectionProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Host One / Groom */}
        <div className="space-y-4 p-5 border border-border rounded-sm bg-card">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Grooms Information
          </h3>
          <div className="grid gap-4">
            <FormInput
              label="Full Name"
              required
              error={errors.host_one_name}
              {...register("host_one_name")}
            />
            <FormInput
              label="Nickname"
              required
              error={errors.host_one_nickname}
              {...register("host_one_nickname")}
            />
            <FormInput
              label="Additional Info"
              required
              error={errors.host_one_additional_info}
              placeholder="e.g. Son of Mr. X and Mrs. Y"
              {...register("host_one_additional_info")}
            />
            <FormInput
              label="Instagram Username"
              description='Without "@"'
              error={errors.host_one_social_media}
              {...register("host_one_social_media")}
            />
          </div>
        </div>

        {/* Host Two / Bride */}
        <div className="space-y-4 p-5 border border-border rounded-sm bg-card">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Brides Information
          </h3>
          <div className="grid gap-4">
            <FormInput
              label="Full Name"
              required
              error={errors.host_two_name}
              {...register("host_two_name")}
            />
            <FormInput
              label="Nickname"
              required
              error={errors.host_two_nickname}
              {...register("host_two_nickname")}
            />
            <FormInput
              label="Additional Info"
              required
              error={errors.host_two_additional_info}
              placeholder="e.g. Daughter of Mr. A and Mrs. B"
              {...register("host_two_additional_info")}
            />
            <FormInput
              label="Instagram Username"
              description='Without "@"'
              error={errors.host_two_social_media}
              {...register("host_two_social_media")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
