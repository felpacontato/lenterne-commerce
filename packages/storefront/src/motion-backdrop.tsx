"use client";

import { useEffect, useRef } from "react";

export function MotionBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => { if (media.matches || !visible) videoRef.current?.pause(); else void videoRef.current?.play().catch(() => undefined); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { rootMargin: "120px" });
    if (rootRef.current) observer.observe(rootRef.current);
    media.addEventListener("change", sync);
    return () => { observer.disconnect(); media.removeEventListener("change", sync); };
  }, []);
  return <div ref={rootRef} className="motion-backdrop" aria-hidden="true"><video ref={videoRef} muted loop playsInline preload="metadata" poster="/media/liquid-red-poster.jpg"><source src="/media/liquid-red.mp4" type="video/mp4" /></video><span /></div>;
}
