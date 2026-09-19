import type { ReactNode } from "react";
import { HeroStageVideo } from "./HeroStageVideo";
import { SiteFooter } from "./SiteFooter";

type VideoBackgroundLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
  homeMobileStacked?: boolean;
  mobileBottomActions?: ReactNode;
};

export function VideoBackgroundLayout({
  children,
  header,
  homeMobileStacked = false,
  mobileBottomActions,
}: VideoBackgroundLayoutProps) {
  if (homeMobileStacked) {
    return (
      <div className="flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-[var(--mobile-sky)] md:relative md:bg-[hsl(var(--background))]">
        <HeroStageVideo variant="desktop" />
        <div className="absolute inset-0 hidden bg-black/5 md:block" aria-hidden />

        <div className="relative z-50 shrink-0 md:contents">{header}</div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col md:contents">
          <div className="flex min-h-0 flex-1 flex-col md:hidden">
            <div className="shrink-0 px-2 pt-[4.75rem]">{children}</div>
            <HeroStageVideo variant="mobile" />
          </div>

          <div className="relative hidden min-h-0 flex-1 flex-col overflow-hidden md:flex">
            {children}
          </div>
        </div>

        <div className="relative z-20 shrink-0 pb-[max(0px,env(safe-area-inset-bottom))] md:hidden">
          {mobileBottomActions ? (
            <div className="-translate-y-[65px] px-2 pb-1 pt-1">{mobileBottomActions}</div>
          ) : null}
          <SiteFooter stacked />
        </div>

        <div className="hidden md:block">
          <SiteFooter />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-[hsl(var(--background))]">
      <HeroStageVideo variant="desktop" />
      <div className="absolute inset-0 bg-black/5" aria-hidden />
      {header}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}
