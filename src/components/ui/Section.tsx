import { ReactNode } from "react";

type SectionBackground = "white" | "gray" | "dark" | "primary";

interface SectionProps {
  children: ReactNode;
  background?: SectionBackground;
  className?: string;
  id?: string;
}

const backgroundStyles: Record<SectionBackground, string> = {
  white: "bg-white text-slate-900",
  gray: "bg-slate-50 text-slate-900",
  dark: "bg-slate-900 text-slate-50",
  primary: "bg-primary text-white",
};

const hasTexture: Record<SectionBackground, boolean> = {
  white: true,
  gray: true,
  dark: false,
  primary: false,
};

export function Section({
  children,
  background = "white",
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 relative ${backgroundStyles[background]} ${className}`}
    >
      {hasTexture[background] && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #94A3B8 0.6px, transparent 0.6px)",
            backgroundSize: "18px 18px",
            opacity: 0.4,
          }}
        />
      )}
      {children}
    </section>
  );
}
