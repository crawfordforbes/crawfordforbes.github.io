import { memo, useEffect, useRef, useState } from "react";

type VideoPlayerProps = {
  src: string;
  poster?: string;
  className?: string;
  alt?: string;
  autoplay?: boolean; // default: true
  loop?: boolean;     // default: true
  muted?: boolean;    // default: true (helps autoplay succeed)
  controls?: boolean; // if true, always show controls
  playsInline?: boolean;
};

function VideoPlayer({
  src,
  poster,
  className = "",
  alt,
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
  playsInline = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Ensure attributes are in sync
    v.muted = muted;
    v.loop = loop;
    v.playsInline = playsInline;

    // Try to autoplay when requested. If the browser blocks it,
    // surface controls so the user can play manually.
    if (autoplay) {
      const playPromise = v.play();
      if (playPromise && typeof (playPromise as Promise<void>).catch === "function") {
        (playPromise as Promise<void>).catch(() => {
          setAutoplayBlocked(true);
        });
      }
    } else {
      // If autoplay is disabled, ensure we don't show blocked state
      setAutoplayBlocked(false);
    }
    // keep dependency list minimal to avoid repeated attempts
  }, [src, autoplay, muted, loop, playsInline]);

  const showControls = controls || autoplayBlocked;
  // derive base (strip known extensions if provided) so we can try .webm first
  const srcBase = src.replace(/\.(mp4|m4v|mov|webm|mkv|avi)(\?.*)?$/i, '');

  return (
    <div className={`video-player ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        aria-label={alt ?? "Video"}
        muted={muted}
        loop={loop}
        controls={showControls}
        playsInline={playsInline}
        preload={autoplay ? "auto" : "metadata"}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        {/* Try modern webm first, then mp4 fallback. If caller passed an exact src with extension,
            we still derive a base and try both .webm and .mp4. */}
        <source src={`${srcBase}.webm`} type="video/webm" />
        <source src={`${srcBase}.mp4`} type="video/mp4" />
        {/* final fallback: direct src as provided */}
        <source src={src} />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}

export default memo(VideoPlayer);