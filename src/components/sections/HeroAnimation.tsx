"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

function HeroContent() {
  return (
    <Container>
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <Image
            src="/Payoff.svg"
            alt=""
            width={80}
            height={80}
            className="mx-auto brightness-0 invert opacity-80"
          />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight md:whitespace-nowrap">
          <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
            Clinical Trials
          </span>
          <span className="bg-gradient-to-r from-primary via-primary-light to-white bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(47,128,237,0.4)]">
            {" "}
            Without Bias
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
          The first end-to-end platform for clinical trial bias management.
          From demographic underrepresentation to methodological flaws, detect
          issues early and correct them before regulatory submission.
        </p>
      </div>
    </Container>
  );
}

const IMAGE_CLASS =
  "object-cover object-[center_40%] invert brightness-[0.5] contrast-[1.5] saturate-[0.3] opacity-[0.7]";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // No useSpring — direct scroll tracking is lighter and feels
  // more natural on touch devices. Hardware-accelerated transforms
  // keep it smooth on desktop too.
  const progress = scrollYProgress;

  // --- Text ---
  const textOpacity = useTransform(progress, [0, 0.3], [1, 0]);
  const textScale = useTransform(progress, [0, 0.3], [1, 1.15]);

  // --- Desktop: split halves with masks ---
  const leftHandX = useTransform(progress, [0, 0.6], ["0vw", "-30vw"]);
  const rightHandX = useTransform(progress, [0, 0.6], ["0vw", "30vw"]);

  // --- Mobile: single image, just zoom + fade (no split, no mask) ---
  const imageScale = useTransform(progress, [0, 0.6], [1, 1.6]);
  const imageOpacity = useTransform(progress, [0.4, 0.7], [1, 0]);

  // --- Center glow (desktop only) ---
  const glowOpacity = useTransform(
    progress,
    [0.05, 0.25, 0.5, 0.7],
    [0, 0.6, 0.6, 0]
  );
  const glowScale = useTransform(progress, [0.05, 0.5], [0.3, 2.5]);

  // --- Final darkening ---
  const darkOverlayOpacity = useTransform(progress, [0.5, 0.8], [0, 0.6]);

  if (prefersReducedMotion) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-[#060e1a]">
        <Image
          src="/hero-creation-data.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={IMAGE_CLASS}
        />
        <div className="absolute inset-0 z-[1] bg-[#060e1a]/80 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-primary/10 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#060e1a]/70 via-primary/5 to-[#060e1a]/80 pointer-events-none" />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <HeroContent />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#060e1a]">
        {isDesktop ? (
          <>
            {/* Desktop: two halves with feathered masks */}
            <motion.div
              className="absolute inset-0 z-0 will-change-transform"
              style={{
                x: leftHandX,
                scale: imageScale,
                opacity: imageOpacity,
                WebkitMaskImage:
                  "linear-gradient(to right, black 35%, transparent 55%)",
                maskImage:
                  "linear-gradient(to right, black 35%, transparent 55%)",
              }}
            >
              <Image
                src="/hero-creation-data.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className={IMAGE_CLASS}
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 z-0 will-change-transform"
              style={{
                x: rightHandX,
                scale: imageScale,
                opacity: imageOpacity,
                WebkitMaskImage:
                  "linear-gradient(to left, black 35%, transparent 55%)",
                maskImage:
                  "linear-gradient(to left, black 35%, transparent 55%)",
              }}
            >
              <Image
                src="/hero-creation-data.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className={IMAGE_CLASS}
              />
            </motion.div>

            {/* Center glow */}
            <motion.div
              className="absolute z-[1] pointer-events-none"
              style={{
                top: "35%",
                left: "50%",
                width: "300px",
                height: "300px",
                marginLeft: "-150px",
                marginTop: "-150px",
                opacity: glowOpacity,
                scale: glowScale,
                background:
                  "radial-gradient(circle, rgba(47,128,237,0.3) 0%, rgba(47,128,237,0.1) 40%, transparent 70%)",
                borderRadius: "50%",
              }}
            />
          </>
        ) : (
          /* Mobile: single image, zoom + fade only — no split, no mask */
          <motion.div
            className="absolute inset-0 z-0 will-change-transform"
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            <Image
              src="/hero-creation-data.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className={IMAGE_CLASS}
            />
          </motion.div>
        )}

        {/* Overlays (static, no animation cost) */}
        <div className="absolute inset-0 z-[2] bg-[#060e1a]/80 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-primary/10 pointer-events-none" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-[#060e1a]/70 via-primary/5 to-[#060e1a]/80 pointer-events-none" />

        {/* Content */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center will-change-transform"
          style={{ opacity: textOpacity, scale: textScale }}
        >
          <HeroContent />
        </motion.div>

        {/* Dark transition overlay */}
        <motion.div
          className="absolute inset-0 z-20 bg-[#060e1a] pointer-events-none"
          style={{ opacity: darkOverlayOpacity }}
        />
      </div>
    </div>
  );
}
