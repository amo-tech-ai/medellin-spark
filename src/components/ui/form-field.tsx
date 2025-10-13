import * as React from "react";
import { cn } from "@/lib/utils";

interface FormFieldWrapperProps {
  label?: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormFieldWrapper = ({
  label,
  required,
  helper,
  error,
  children,
  className,
}: FormFieldWrapperProps) => {
  return (
    <div className={cn("form-field", className)}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {children}
      {helper && !error && <p className="form-helper">{helper}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  helper?: string;
  error?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, required, helper, error, className, ...props }, ref) => {
    return (
      <FormFieldWrapper label={label} required={required} helper={helper} error={error}>
        <input ref={ref} className={cn("form-input", className)} {...props} />
      </FormFieldWrapper>
    );
  }
);
FormInput.displayName = "FormInput";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  helper?: string;
  error?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, required, helper, error, className, ...props }, ref) => {
    return (
      <FormFieldWrapper label={label} required={required} helper={helper} error={error}>
        <textarea
          ref={ref}
          className={cn("form-input min-h-[120px] py-3", className)}
          {...props}
        />
      </FormFieldWrapper>
    );
  }
);
FormTextarea.displayName = "FormTextarea";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  helper?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, required, helper, error, options, className, ...props }, ref) => {
    return (
      <FormFieldWrapper label={label} required={required} helper={helper} error={error}>
        <select ref={ref} className={cn("form-input", className)} {...props}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormFieldWrapper>
    );
  }
);
FormSelect.displayName = "FormSelect";
