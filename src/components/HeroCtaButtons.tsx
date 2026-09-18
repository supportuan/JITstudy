import { ArrowRight } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroCtaButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      <Link
        to="/register"
        className="hero-cta-solid glass-hover-pill inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-5 py-2.5 text-sm font-medium text-[hsl(var(--primary-foreground))] transition-all duration-300 md:px-6 md:py-3 md:text-base"
      >
        Register
        <ArrowRight className="size-4" aria-hidden />
      </Link>
      <Link
        to="/login"
        className="liquid-glass auth-login-glass glass-hover-pill inline-flex items-center gap-2 rounded-full border border-white/70 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 md:px-6 md:py-3 md:text-base"
      >
        Login
        <ArrowUpRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
