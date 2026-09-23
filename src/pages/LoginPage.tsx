import type { FormEvent } from "react";
import { JitstudyBrand } from "../components/JitstudyBrand";
import { LOGIN_VIDEO_URL } from "../constants/media";

const fieldClass =
  "w-full rounded-xl border border-white/25 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none placeholder:text-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors focus:border-white/40 focus:bg-white/[0.06]";

const labelClass = "mb-1 block text-xs text-white/90";

export function LoginPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 py-10">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={LOGIN_VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/15" aria-hidden />

      <div className="relative z-10 w-full max-w-[320px] overflow-hidden rounded-[24px] border border-white/30 bg-white/[0.04] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.06),0_12px_40px_rgba(0,0,0,0.18)] md:max-w-[340px] md:px-6 md:py-6">
        <div
          className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.14] via-white/[0.03] to-white/[0.01]"
          aria-hidden
        />
        <div className="relative z-10">
        <JitstudyBrand to="/" titleClassName="text-lg md:text-xl" />

        <h1 className="mt-4 text-lg leading-tight tracking-tight text-white md:text-xl">
          <span className="font-bold">Login</span> into Your Dreams
        </h1>

        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              className={fieldClass}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email"
              required
            />
          </label>

          <label className="block">
            <span className={labelClass}>Password</span>
            <input
              className={fieldClass}
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
            />
          </label>

          <div className="pt-1">
            <a
              href="mailto:agents@jitstudy.com?subject=Forgot%20password"
              className="text-xs text-white/75 underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              Forgot password
            </a>
          </div>

          <button
            type="submit"
            className="mt-1 w-full rounded-full border border-white/40 bg-white/[0.06] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition-all duration-300 hover:border-white/55 hover:bg-white/[0.12] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(255,255,255,0.08)]"
          >
            Login
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
