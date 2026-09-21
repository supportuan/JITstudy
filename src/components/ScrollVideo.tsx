import { useEffect, useRef } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_104107_121bfb5a-b1df-4e0d-8240-25b81f7cc85d.mp4";

/** Avoid empty/black first keyframe on some encodes */
const START_TIME = 0.05;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preferSimpleLoop =
      window.matchMedia("(max-width: 768px)").matches ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    let reverseRaf = 0;
    let reverseMode: "native" | "manual" | "loop" = preferSimpleLoop
      ? "loop"
      : "native";
    let manualReverse = false;
    let lastReverseTs = 0;

    const endTime = () =>
      Math.max((Number.isFinite(video.duration) ? video.duration : 0) - 0.08, START_TIME);

    const playForward = async () => {
      video.playbackRate = 1;
      if (video.currentTime < START_TIME) video.currentTime = START_TIME;
      try {
        await video.play();
      } catch {
        /* autoplay blocked until user gesture */
      }
    };

    const stopManualReverse = () => {
      manualReverse = false;
      cancelAnimationFrame(reverseRaf);
      reverseRaf = 0;
    };

    const manualReverseTick = (ts: number) => {
      if (!manualReverse) return;
      if (!lastReverseTs) lastReverseTs = ts;
      const dt = Math.min((ts - lastReverseTs) / 1000, 0.05);
      lastReverseTs = ts;

      video.currentTime = clamp(video.currentTime - dt, 0, endTime());

      if (video.currentTime <= START_TIME + 0.02) {
        stopManualReverse();
        void playForward();
        return;
      }

      reverseRaf = requestAnimationFrame(manualReverseTick);
    };

    const startReverse = () => {
      stopManualReverse();

      if (reverseMode === "loop") {
        video.currentTime = START_TIME;
        void playForward();
        return;
      }

      if (reverseMode === "native") {
        video.playbackRate = -1;
        void video.play().catch(() => {
          reverseMode = "manual";
          startReverse();
        });
        return;
      }

      manualReverse = true;
      lastReverseTs = 0;
      video.pause();
      reverseRaf = requestAnimationFrame(manualReverseTick);
    };

    const onEnded = () => {
      if (reduceMotion.matches) return;
      startReverse();
    };

    const onTimeUpdate = () => {
      if (reverseMode !== "native" || video.playbackRate >= 0) return;
      if (video.currentTime <= START_TIME + 0.03) {
        stopManualReverse();
        void playForward();
      }
    };

    const onLoadedData = () => {
      if (video.currentTime < START_TIME) video.currentTime = START_TIME;
      if (!reduceMotion.matches) void playForward();
    };

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
        stopManualReverse();
        return;
      }
      if (reduceMotion.matches) return;
      if (manualReverse) {
        reverseRaf = requestAnimationFrame(manualReverseTick);
        return;
      }
      if (video.paused) void playForward();
    };

    const onReduceMotion = () => {
      if (reduceMotion.matches) {
        video.pause();
        stopManualReverse();
      } else {
        void playForward();
      }
    };

    reduceMotion.addEventListener("change", onReduceMotion);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdate);
    document.addEventListener("visibilitychange", onVisibility);

    if (preferSimpleLoop) video.loop = true;

    if (video.readyState >= 2) onLoadedData();

    return () => {
      stopManualReverse();
      reduceMotion.removeEventListener("change", onReduceMotion);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        muted
        playsInline
        autoPlay
        preload="auto"
        loop={true}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden />
    </div>
  );
}
