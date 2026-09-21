import { useEffect, useRef, useState } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_104107_121bfb5a-b1df-4e0d-8240-25b81f7cc85d.mp4";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function scrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  return clamp(window.scrollY / maxScroll, 0, 1);
}

export function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLVideoElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const smoothedRef = useRef(0);
  const lastFrameIndexRef = useRef(-1);
  const rafRef = useRef(0);
  const objectUrlRef = useRef<string | null>(null);
  const seekingRef = useRef(false);
  const durationRef = useRef(0);
  const [framesReady, setFramesReady] = useState(false);

  useEffect(() => {
    const cancelled = { value: false };

    async function extractFrames() {
      try {
        const response = await fetch(VIDEO_URL);
        const blob = await response.blob();
        if (cancelled.value) return;

        const objectUrl = URL.createObjectURL(blob);
        objectUrlRef.current = objectUrl;

        const video = document.createElement("video");
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.src = objectUrl;

        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => resolve();
          video.onerror = () => reject(new Error("Video metadata failed"));
        });

        if (cancelled.value) return;

        const duration = Math.max(video.duration - 0.05, 0.1);
        durationRef.current = video.duration;
        const scale = Math.min(1, 1280 / video.videoWidth);
        const width = Math.round(video.videoWidth * scale);
        const height = Math.round(video.videoHeight * scale);
        const frameCount = clamp(Math.round(duration * 24), 30, 120);
        const bitmaps: ImageBitmap[] = [];

        for (let i = 0; i < frameCount; i++) {
          if (cancelled.value) break;

          const time =
            frameCount === 1 ? 0 : (i / (frameCount - 1)) * duration;
          await new Promise<void>((resolve) => {
            video.onseeked = () => resolve();
            video.currentTime = time;
          });

          const bitmap = await createImageBitmap(video, {
            resizeWidth: width,
            resizeHeight: height,
            resizeQuality: "high",
          });
          bitmaps.push(bitmap);
        }

        if (cancelled.value) {
          bitmaps.forEach((b) => b.close());
          return;
        }

        framesRef.current = bitmaps;
        setFramesReady(true);
      } catch {
        setFramesReady(false);
      }
    }

    void extractFrames();

    return () => {
      cancelled.value = true;
      framesRef.current.forEach((bitmap) => bitmap.close());
      framesRef.current = [];
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastFrameIndexRef.current = -1;
    };

    const drawCover = (bitmap: ImageBitmap) => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const scale = Math.max(cw / bitmap.width, ch / bitmap.height);
      const dw = bitmap.width * scale;
      const dh = bitmap.height * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(bitmap, dx, dy, dw, dh);
    };

    const scrubFallback = (progress: number) => {
      const video = fallbackRef.current;
      if (!video || !durationRef.current || seekingRef.current) return;
      const targetTime = progress * Math.max(durationRef.current - 0.05, 0);
      if (Math.abs(video.currentTime - targetTime) <= 0.001) return;
      seekingRef.current = true;
      video.currentTime = targetTime;
    };

    const tick = () => {
      const target = scrollProgress();
      smoothedRef.current += (target - smoothedRef.current) * 0.1;

      if (framesReady && framesRef.current.length > 0) {
        const index = Math.round(
          smoothedRef.current * (framesRef.current.length - 1),
        );
        if (index !== lastFrameIndexRef.current) {
          lastFrameIndexRef.current = index;
          drawCover(framesRef.current[index]);
        }
      } else {
        scrubFallback(smoothedRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      /* progress read in rAF */
    };

    const onSeeked = () => {
      seekingRef.current = false;
    };

    const fallback = fallbackRef.current;
    fallback?.addEventListener("seeked", onSeeked);
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", onScroll);
      fallback?.removeEventListener("seeked", onSeeked);
    };
  }, [framesReady]);

  useEffect(() => {
    const video = fallbackRef.current;
    if (!video) return;

    const onMetadata = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        durationRef.current = video.duration;
      }
    };

    video.addEventListener("loadedmetadata", onMetadata);
    onMetadata();

    return () => video.removeEventListener("loadedmetadata", onMetadata);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {!framesReady ? (
        <video
          ref={fallbackRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
      ) : null}
      <div className="absolute inset-0 bg-black/20" aria-hidden />
    </div>
  );
}
