type JitstudyBrandProps = {
  className?: string;
  titleClassName?: string;
  href?: string;
};

export function JitstudyBrand({
  className = "",
  titleClassName = "text-[30px] sm:text-1.5xl md:text-4xl",
  href = "#main",
}: JitstudyBrandProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 font-mono font-medium tracking-tight text-white drop-shadow-md sm:gap-2.5 ${titleClassName} ${className}`}
    >
      <img
        src="/jitstudy-logo.png"
        alt=""
        className="jitstudy-logo-knockout h-[calc(1em+10px)] w-auto shrink-0 object-contain"
        aria-hidden
      />
      <span className="leading-none">Jitstudy</span>
    </a>
  );
}
