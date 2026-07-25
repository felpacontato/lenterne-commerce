import type { ReactNode } from "react";
export function Logo({ compact = false }: { compact?: boolean }) { return <span className={`brand-logo-official${compact ? " compact" : ""}`}><img className="brand-logo-image" src="/brand/lenterne-logo-white.png" alt="Lenterne Brindes" /></span>; }
export function Arrow({ direction = "right" }: { direction?: "right" | "left" }) { return <span aria-hidden="true">{direction === "right" ? "→" : "←"}</span>; }
export function Field({ label, name, type = "text", required, children }: { label: string; name: string; type?: string; required?: boolean; children?: ReactNode }) { return <label className="field"><span>{label}{required ? " *" : ""}</span>{children ?? <input name={name} type={type} required={required} />}</label>; }
