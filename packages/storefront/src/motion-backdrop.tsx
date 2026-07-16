"use client";

import { useEffect, useRef, useState } from "react";

export function MotionBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const play = () => {
      if (!paused) void videoRef.current?.play().catch(() => undefined);
    };
    play();
    window.addEventListener("pageshow", play);
    document.addEventListener("visibilitychange", play);
    return () => {
      window.removeEventListener("pageshow", play);
      document.removeEventListener("visibilitychange", play);
    };
  }, [paused]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => setPaused(false)).catch(() => undefined);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return <>
    <div className="motion-backdrop" aria-hidden="true">
      <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/media/liquid-red-poster.jpg" onCanPlay={() => { if (!paused) void videoRef.current?.play().catch(() => undefined); }}>
        <source src="/media/liquid-red.mp4" type="video/mp4" />
      </video>
      <span />
    </div>
    <button className="motion-control" type="button" onClick={togglePlayback} aria-label={paused ? "Reproduzir fundo animado" : "Pausar fundo animado"} title={paused ? "Reproduzir fundo animado" : "Pausar fundo animado"}>
      {paused ? "Reproduzir fundo" : "Pausar fundo"}
    </button>
  </>;
}
