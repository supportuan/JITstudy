type SiteFooterProps = {
  stacked?: boolean;
};

export function SiteFooter({ stacked = false }: SiteFooterProps) {
  if (stacked) {
    return (
      <footer
        className="px-2 pb-2 pt-0.5 text-center text-[10px] text-black"
        aria-label="Copyright"
      >
        © 2026 Jitstudy.com All rights reserved
      </footer>
    );
  }

  return (
    <footer
      className="pointer-events-none fixed bottom-3 left-0 right-0 z-40 px-4 text-center text-[10px] text-black md:bottom-4 md:left-auto md:right-8 md:px-0 md:text-right lg:right-16 md:text-[11px]"
      aria-label="Copyright"
    >
      © 2026 Jitstudy.com All rights reserved
    </footer>
  );
}
