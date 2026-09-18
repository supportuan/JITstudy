import { ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AuthNavActions() {
  const { pathname } = useLocation();
  const onLogin = pathname === "/login";
  const onRegister = pathname === "/register";

  return (
    <div className="flex items-center gap-3">
      {onLogin ? (
        <span
          className="liquid-glass inline-flex items-center gap-1.5 rounded-full border border-white/70 px-5 py-2 text-sm font-medium text-white opacity-90"
          aria-current="page"
        >
          Login
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      ) : (
        <Link
          to="/login"
          className="liquid-glass auth-login-glass glass-hover-pill inline-flex items-center gap-1.5 rounded-full border border-white/70 px-5 py-2 text-sm font-medium text-white transition-all duration-300"
        >
          Login
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      )}

      {onRegister ? (
        <span className="inline-flex rounded-full bg-[hsl(var(--primary))] px-5 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))]">
          Register
        </span>
      ) : (
        <Link
          to="/register"
          className="hero-cta-solid glass-hover-pill inline-flex rounded-full bg-[hsl(var(--primary))] px-5 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] transition-all duration-300"
        >
          Register
        </Link>
      )}
    </div>
  );
}
