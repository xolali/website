import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-md border border-white/15 bg-slate-800/60 px-3.5 py-2.5 text-sm text-quartz placeholder:text-slate-400 transition-colors focus:border-aurora focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora";

export function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-quartz">
        {label}
        {required && <span className="ml-1 text-aurora">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldBase, "min-h-[140px] resize-y", className)} {...props} />;
}

export function SelectInput({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldBase, className)} {...props}>
      {children}
    </select>
  );
}
