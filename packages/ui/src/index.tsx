import type { ReactNode } from "react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return <span className="logo" aria-label="Lenterne"><span className="logo-mark" aria-hidden="true">L</span><span>{compact ? "Lenterne" : "Lenterne"}</span></span>;
}

export function Arrow({ direction = "right" }: { direction?: "right" | "left" }) {
  return <span aria-hidden="true">{direction === "right" ? "→" : "←"}</span>;
}

export function Field({ label, name, type = "text", required, children }: { label: string; name: string; type?: string; required?: boolean; children?: ReactNode }) {
  return <label className="field"><span>{label}{required ? " *" : ""}</span>{children ?? <input name={name} type={type} required={required} />}</label>;
}
