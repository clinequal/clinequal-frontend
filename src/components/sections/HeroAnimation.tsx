"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

const SPRING_CONFIG = { stiffness: 100, damping: 30, restDelta: 0.001 };

function HeroContent() {
  return (
    <Container>
      <div className="max-w-3xl mx-auto text-center">
        {/* Logo Icon */}
        <div className="mb-8">
          <Image
            src="/Payoff.svg"
            alt=""
            width={80}
            height={80}
            className="mx-auto brightness-0 invert opacity-80"
          />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight md:whitespace-nowrap">
          <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
            Clinical Trials
          </span>
          <span className="bg-gradient-to-r from-primary via-primary-light to-white bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(47,128,237,0.4)]">
            {" "}
            Without Bias
          </span>
        </h1>

        {/* Subheadline */}
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

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG);

  // --- Text: fades out quickly so next section can take over ---
  const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.3], [1, 1.15]);

  // --- Image halves: soft-mask split + zoom + separate ---
  const leftHandX = useTransform(smoothProgress, [0, 0.6], ["0vw", "-30vw"]);
  const rightHandX = useTransform(smoothProgress, [0, 0.6], ["0vw", "30vw"]);
  const imageScale = useTransform(smoothProgress, [0, 0.6], [1, 1.6]);
  const imageOpacity = useTransform(smoothProgress, [0.4, 0.7], [1, 0]);

  // --- Center glow: appears where the hands separate ---
  const glowOpacity = useTransform(
    smoothProgress,
    [0.05, 0.25, 0.5, 0.7],
    [0, 0.6, 0.6, 0]
  );
  const glowScale = useTransform(smoothProgress, [0.05, 0.5], [0.3, 2.5]);

  // --- Final darkening (subtle — next section slides over the top) ---
  const darkOverlayOpacity = useTransform(smoothProgress, [0.5, 0.8], [0, 0.6]);

  // Reduced motion: static full-screen hero, no scroll pinning
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
      {/* Sticky viewport — pins to screen during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#060e1a]">
        {/* Layer 0: Left hand half — feathered mask edge */}
        <motion.div
          className="absolute inset-0 z-0"
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

        {/* Layer 0: Right hand half — feathered mask edge */}
        <motion.div
          className="absolute inset-0 z-0"
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

        {/* Layer 0.5: Center glow — appears at the separation point */}
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

        {/* Layer 1: Dark overlay + primary tint (static) */}
        <div className="absolute inset-0 z-[2] bg-[#060e1a]/80 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-primary/10 pointer-events-none" />

        {/* Layer 2: Gradient vignette (static) */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-[#060e1a]/70 via-primary/5 to-[#060e1a]/80 pointer-events-none" />

        {/* Layer 3: Content (fades out + scales up on scroll) */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ opacity: textOpacity, scale: textScale }}
        >
          <HeroContent />
        </motion.div>

        {/* Layer 4: Dark transition overlay (fades in at end) */}
        <motion.div
          className="absolute inset-0 z-20 bg-[#060e1a] pointer-events-none"
          style={{ opacity: darkOverlayOpacity }}
        />
      </div>
    </div>
  );
}
