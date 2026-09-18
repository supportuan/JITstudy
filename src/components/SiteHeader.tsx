import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../constants/nav";
import { AuthNavActions } from "./AuthNavActions";

type SiteHeaderProps = {
  showNav?: boolean;
};

export function SiteHeader({ showNav = true }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-[30px] z-50 w-full px-6 md:px-8 lg:px-16">
        <div className="flex w-full items-center justify-between md:hidden">
          <Link
            to="/"
            className="font-heading text-3xl tracking-tight text-black"
            style={{ fontFamily: "var(--font-heading)" }}
            onClick={() => setMenuOpen(false)}
          >
            Jitstudy
          </Link>

          {showNav ? (
            <button
              type="button"
              className="liquid-glass glass-hover-pill inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/60 text-black"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="size-7" strokeWidth={2} aria-hidden />
              ) : (
                <Menu className="size-7" strokeWidth={2} aria-hidden />
              )}
            </button>
          ) : null}
        </div>

        <div className="hidden w-full grid-cols-[1fr_auto_1fr] items-center md:grid">
          <Link
            to="/"
            className="justify-self-start font-heading text-4xl tracking-tight text-black"
            style={{ fontFamily: "var(--font-heading)" }}
            onClick={() => setMenuOpen(false)}
          >
            Jitstudy
          </Link>

          {showNav ? (
            <nav
              className="liquid-glass flex items-center gap-8 rounded-full px-8 py-3"
              aria-label="Primary"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="glass-hover-pill text-sm font-medium text-[hsl(var(--foreground)/0.9)]"
                >
                  {link}
                </a>
              ))}
            </nav>
          ) : (
            <span aria-hidden />
          )}

          <div className="justify-self-end">
            <AuthNavActions />
          </div>
        </div>
      </header>

      {showNav && menuOpen ? (
        <div
          id="mobile-nav-menu"
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      ) : null}

      {showNav && menuOpen ? (
        <nav
          className="liquid-glass fixed left-1/2 top-[88px] z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-1 rounded-3xl px-4 py-4 md:hidden"
          aria-label="Mobile primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="glass-hover-pill rounded-full px-4 py-3 text-center text-sm font-medium text-[hsl(var(--foreground)/0.9)]"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </nav>
      ) : null}
    </>
  );
}
