"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface WalkthroughSectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function WalkthroughSection({
  children,
  title,
  subtitle,
  className = "",
}: WalkthroughSectionProps) {
  return (
    <ScrollReveal className={`py-12 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{title}</h2>
          )}
          {subtitle && (
            <p className="text-slate-600 dark:text-slate-300 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </ScrollReveal>
  );
}
