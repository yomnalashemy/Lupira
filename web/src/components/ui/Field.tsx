import * as React from "react";

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-left [[dir=rtl]_&]:text-right">
      <span className="text-[13px] font-medium text-[var(--ink-2)]">{label}</span>
      {children}
      {error && <span className="text-[12px] text-[var(--critical)]">{error}</span>}
    </label>
  );
}

const inputBase =
  "w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--ring)]";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className || ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputBase} ${props.className || ""}`} />;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
  loading?: boolean;
}

export function Button({ variant = "primary", loading, disabled, children, className, ...rest }: ButtonProps) {
  const styles = {
    primary: "border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] hover:opacity-90",
    ghost: "border border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--faint)]",
    danger: "border border-[var(--critical)] text-[var(--critical)] hover:bg-[var(--critical)]/10",
  }[variant];

  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-2.5 text-[14px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className || ""}`}
    >
      {loading ? "…" : children}
    </button>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[0_1px_2px_rgba(43,30,36,0.05),0_10px_28px_-14px_rgba(43,30,36,0.22)] ${className || ""}`}
    >
      {children}
    </div>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="rounded-[10px] border border-[var(--critical)]/30 bg-[var(--critical)]/10 px-3.5 py-2.5 text-[13px] text-[var(--critical)]">
      {message}
    </div>
  );
}
