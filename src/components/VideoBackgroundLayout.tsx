import type { ReactNode } from "react";
import { BACKGROUND_VIDEO_URL } from "../constants/media";
import { SiteFooter } from "./SiteFooter";

type VideoBackgroundLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
};

export function VideoBackgroundLayout({
  children,
  header,
}: VideoBackgroundLayoutProps) {
  return (
    <div className="relative flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-[hsl(var(--background))]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={BACKGROUND_VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/5" aria-hidden />
      {header}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}
