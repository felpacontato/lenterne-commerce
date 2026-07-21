export function MotionBackdrop() {
  return <div className="motion-backdrop" aria-hidden="true">
    <video autoPlay muted loop playsInline preload="auto">
      <source src="/media/liquid-red.mp4" type="video/mp4" />
    </video>
    <span />
  </div>;
}
