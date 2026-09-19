import { BACKGROUND_VIDEO_URL } from "../constants/media";

type HeroStageVideoProps = {
  variant: "mobile" | "desktop";
};

export function HeroStageVideo({ variant }: HeroStageVideoProps) {
  if (variant === "desktop") {
    return (
      <video
        className="hero-stage__video hero-stage__video--desktop"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={BACKGROUND_VIDEO_URL} type="video/mp4" />
      </video>
    );
  }

  return (
    <section className="hero-stage__video-container" aria-hidden>
      <video
        className="hero-stage__video"
        aria-label="Jitstudy product preview"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={BACKGROUND_VIDEO_URL} type="video/mp4" />
      </video>
    </section>
  );
}
