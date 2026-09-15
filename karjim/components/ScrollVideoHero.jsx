"use client";

import { useEffect, useRef, useState } from "react";
import FogLayer from "@/components/FogLayer";

export default function ScrollVideoHero({ children, revealContent }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const [duration, setDuration] = useState(0);

  // Load video metadata (duration) once.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => setDuration(video.duration || 0);

    if (video.readyState >= 1 && video.duration) {
      onLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", onLoadedMetadata);
    }

    // iOS Safari won't decode/paint a frame until the video has played at
    // least once, even if muted+paused. A near-instant play/pause forces
    // that first frame to render so scrubbing has something to show.
    const primeIOS = async () => {
      try {
        await video.play();
        video.pause();
        video.currentTime = 0;
      } catch {
        // Autoplay was blocked - not fatal, scrubbing still works once the
        // user scrolls, most browsers decode on seek anyway.
      }
    };
    primeIOS();

    return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
  }, []);

  // Drive video.currentTime from scroll position within the sticky section.
  // Seeking a <video> is not instant - if we fire a new currentTime write
  // before the browser finishes the previous seek, seeks queue up and the
  // playback visibly stutters/lags behind the scroll. So we only ever have
  // one seek in flight: scroll just records the latest target, and the
  // 'seeked' handler chases it once the current seek completes.
  //
  // `progress` (0..1) covers only the sticky pin itself. The video scrubs
  // across the whole range, and starting the fade partway through
  // (FADE_START) - rather than only once the video is done - means it's
  // already darkening while still playing. Both the fade-out and
  // `revealContent` fading in on top of it (via --reveal) finish exactly at
  // progress===1, i.e. while the video is STILL pinned/on screen - so the
  // reveal is fully visible before any further scrolling carries the
  // (by-then-empty) hero away and on to whatever comes next.
  useEffect(() => {
    if (!duration) return;
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const FADE_START = 0.4;

    let pendingTime = video.currentTime;
    let isSeeking = false;

    const computeProgress = () => {
      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return null;
      return Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
    };

    const seekTo = (time) => {
      isSeeking = true;
      video.currentTime = time;
    };

    const onSeeked = () => {
      isSeeking = false;
      if (Math.abs(pendingTime - video.currentTime) > 0.02) {
        seekTo(pendingTime);
      }
    };

    const updateFrame = () => {
      rafRef.current = null;
      const progress = computeProgress();
      if (progress === null || !Number.isFinite(progress)) return;

      pendingTime = progress * duration;
      if (!isSeeking) {
        seekTo(pendingTime);
      }

      const fade =
        Math.min(Math.max((progress - FADE_START) / (1 - FADE_START), 0), 1);
      video.style.opacity = String(1 - fade);
      container.style.setProperty("--reveal", String(fade));
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(updateFrame);
    };

    video.addEventListener("seeked", onSeeked);
    updateFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration]);

  return (
    <div ref={containerRef} className="relative isolate h-[190vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-zinc-950">
        {/* Sits below the (opaque, while playing) video - only becomes
            visible once the video fades out, right alongside revealContent. */}
        <FogLayer className="absolute inset-0" />

        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          Tarayıcınız video etiketini desteklemiyor.
        </video>

        {children}

        {/* Fades in on top of the video as it darkens (driven by --reveal,
            set above) - so the next section is already fully in place, on
            screen, superimposed on the hero, by the time the video is gone.
            No separate scroll is needed to "reach" it afterward. */}
        {revealContent && (
          <div
            className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 sm:pb-10"
            style={{
              opacity: "var(--reveal, 0)",
              transform: "translateY(calc((1 - var(--reveal, 0)) * 24px))",
            }}
          >
            <div className="pointer-events-auto w-full">{revealContent}</div>
          </div>
        )}
      </div>
    </div>
  );
}
