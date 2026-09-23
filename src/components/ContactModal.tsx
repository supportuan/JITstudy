import { X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { buildWhatsAppMessageUrl } from "../constants/whatsapp";

const EMPTY_CONTACT = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
  agreed: false,
};

const labelClass =
  "font-mono text-xs font-medium uppercase tracking-[0.08em] text-white";

const inputClass =
  "w-full rounded-2xl border border-white/20 bg-white/[0.08] px-3 py-2.5 font-sans text-sm text-white outline-none placeholder:text-white/45 backdrop-blur-md transition-colors focus:border-white/50 focus:bg-white/[0.12]";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm] = useState(EMPTY_CONTACT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) return;
    setForm(EMPTY_CONTACT);
    setErrors({});
    setSubmitted(false);
  }, [open]);

  const close = () => {
    setForm(EMPTY_CONTACT);
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = "First name is required";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    if (!form.email.trim()) next.email = "Mail id is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid mail id";
    }
    if (!form.agreed) next.agreed = "Please agree to the terms and condition";
    setErrors(next);
    if (Object.keys(next).length) return;

    const text = [
      "Hello, I would like to get in touch.",
      "",
      `First name: ${form.firstName.trim()}`,
      `Last name: ${form.lastName.trim() || "—"}`,
      `Phone number: ${form.phone.trim()}`,
      `Mail id: ${form.email.trim()}`,
      `Message: ${form.message.trim() || "—"}`,
    ].join("\n");

    window.open(buildWhatsAppMessageUrl(text), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center px-5 transition-all duration-300 ${
        open ? "visible" : "invisible pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={close}
        aria-hidden
      />
      <div
        className={`relative w-full max-w-[520px] overflow-hidden rounded-[32px] border border-white/25 bg-white/[0.1] px-6 py-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 md:px-8 md:py-7 ${
          open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        <button
          type="button"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close contact form"
          onClick={close}
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <h3
          id="contact-modal-title"
          className="mb-4 pr-10 text-xl font-medium tracking-tight text-white md:mb-5 md:text-2xl"
        >
          Contact us
        </h3>

        {submitted ? (
          <p className="rounded-2xl border border-white/20 bg-white/[0.08] px-4 py-4 text-sm leading-relaxed text-white/90">
            WhatsApp is opening — please tap Send to deliver your message.
          </p>
        ) : (
          <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>
                First name <span className="text-[#DA7E19]">*</span>
              </span>
              <input
                className={inputClass}
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="First name"
                autoComplete="given-name"
              />
              {errors.firstName && (
                <span className="text-[11px] text-red-300">{errors.firstName}</span>
              )}
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Last name</span>
              <input
                className={inputClass}
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Last name"
                autoComplete="family-name"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>
                Phone number <span className="text-[#DA7E19]">*</span>
              </span>
              <input
                className={inputClass}
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone number"
                autoComplete="tel"
              />
              {errors.phone && (
                <span className="text-[11px] text-red-300">{errors.phone}</span>
              )}
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>
                Mail id <span className="text-[#DA7E19]">*</span>
              </span>
              <input
                className={inputClass}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Mail id"
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-[11px] text-red-300">{errors.email}</span>
              )}
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Enter the message</span>
              <textarea
                className={`${inputClass} min-h-[72px] resize-none`}
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Enter the message"
              />
            </label>

            <label className="mt-1 flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/40 accent-[#DA7E19]"
                checked={form.agreed}
                onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
              />
              <span className="text-xs leading-relaxed text-white/85">
                I agree to terms and condition{" "}
                <span className="text-[#DA7E19]">*</span>
              </span>
            </label>
            {errors.agreed && (
              <span className="-mt-2 text-[11px] text-red-300">{errors.agreed}</span>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-full border border-white/60 bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-black transition-colors hover:bg-white/90"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
