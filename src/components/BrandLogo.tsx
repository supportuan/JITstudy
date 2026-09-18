import { Link } from "react-router-dom";

type BrandLogoProps = {
  onNavigate?: () => void;
  className?: string;
  titleClassName?: string;
};

export function BrandLogo({
  onNavigate,
  className = "",
  titleClassName = "text-3xl md:text-4xl",
}: BrandLogoProps) {
  return (
    <Link
      to="/"
      className={`-translate-x-[30px] inline-flex items-center gap-2.5 md:gap-3 ${className}`}
      style={{ fontFamily: "var(--font-heading)" }}
      onClick={onNavigate}
    >
      <img
        src="/jitstudy-logo.png"
        alt=""
        className="h-[3em] w-auto shrink-0 object-contain"
        aria-hidden
      />
      <span className={`font-heading leading-none tracking-tight text-black ${titleClassName}`}>
        Jitstudy
      </span>
    </Link>
  );
}
