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

export function Section({
  children,
  background = "white",
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${backgroundStyles[background]} ${className}`}
    >
      {children}
    </section>
  );
}
