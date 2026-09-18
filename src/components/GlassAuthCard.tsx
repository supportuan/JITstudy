import type { FormEvent, InputHTMLAttributes, ReactNode } from "react";

type GlassAuthCardProps = {
  title: string;
  children: ReactNode;
  footer: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
};

export function GlassAuthCard({
  title,
  children,
  footer,
  onSubmit,
  submitLabel,
}: GlassAuthCardProps) {
  return (
    <div className="liquid-glass glass-surface-dark w-full max-w-md rounded-[2rem] px-6 py-6 text-left md:px-8 md:py-10">
      <h1 className="mb-5 text-center font-heading text-xl font-medium tracking-tight text-white md:mb-8 md:text-2xl">
        {title}
      </h1>
      <form className="space-y-3 md:space-y-4" onSubmit={onSubmit}>
        {children}
        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-medium text-[hsl(var(--primary-foreground))]"
        >
          {submitLabel}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-white/75">{footer}</p>
    </div>
  );
}

export function GlassField({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/90">
        {label}
      </span>
      <input
        {...props}
        className="glass-field-dark w-full rounded-full px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/60 md:px-5 md:py-3"
      />
    </label>
  );
}
