import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  description?: ReactNode;
  required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, description, required, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-semibold mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <input
          ref={ref}
          {...props}
          className={`
            flex h-10 w-full px-3 py-2 text-sm
            border border-border rounded-sm
            bg-background text-foreground
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
            transition-colors
            disabled:cursor-not-allowed disabled:opacity-50
            ${
              error
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
            ${className}
          `}
        />

        {description && !error && (
          <p className="text-muted-foreground text-xs mt-2">
            {description}
          </p>
        )}

        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
