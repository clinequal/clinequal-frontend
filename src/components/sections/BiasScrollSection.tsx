"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

const biasTypes = [
  // Population & Selection (blue)
  { name: "Selection bias", category: "population" },
  { name: "Volunteer bias", category: "population" },
  { name: "Admission rate bias (Berkson's)", category: "population" },
  { name: "Referral filter bias", category: "population" },
  { name: "Prevalence-incidence (Neyman) bias", category: "population" },
  { name: "Racial bias", category: "population" },
  { name: "Spectrum bias", category: "population" },
  { name: "Centripetal bias", category: "population" },
  { name: "Non-response bias", category: "population" },
  { name: "Diagnostic access bias", category: "population" },

  // Measurement & Detection (amber)
  { name: "Detection bias", category: "measurement" },
  { name: "Observer bias", category: "measurement" },
  { name: "Recall bias", category: "measurement" },
  { name: "Information bias", category: "measurement" },
  { name: "Misclassification bias", category: "measurement" },
  { name: "Ascertainment bias", category: "measurement" },
  { name: "Diagnostic suspicion bias", category: "measurement" },
  { name: "Verification bias", category: "measurement" },
  { name: "Incorporation bias", category: "measurement" },
  { name: "Insensitive measure bias", category: "measurement" },
  { name: "Perception bias", category: "measurement" },
  { name: "Hawthorne effect", category: "measurement" },
  { name: "Apprehension bias", category: "measurement" },

  // Protocol & Design (green)
  { name: "Allocation bias", category: "protocol" },
  { name: "Performance bias", category: "protocol" },
  { name: "Lack of blinding", category: "protocol" },
  { name: "Non-contemporaneous control bias", category: "protocol" },
  { name: "Wrong sample size bias", category: "protocol" },
  { name: "Early stopping bias", category: "protocol" },
  { name: "Starting time bias", category: "protocol" },
  { name: "Chronological bias", category: "protocol" },

  // Attrition & Compliance (purple)
  { name: "Attrition bias", category: "attrition" },
  { name: "Adherence bias", category: "attrition" },
  { name: "Compliance bias", category: "attrition" },

  // Analysis & Statistical (red)
  { name: "Confounding", category: "analysis" },
  { name: "Confounding by indication", category: "analysis" },
  { name: "Collider bias", category: "analysis" },
  { name: "Immortal time bias", category: "analysis" },
  { name: "Lead time bias", category: "analysis" },
  { name: "Length time bias", category: "analysis" },
  { name: "Data-dredging bias", category: "analysis" },
  { name: "Differential reference bias", category: "analysis" },
  { name: "Partial reference bias", category: "analysis" },
  { name: "Informed presence bias", category: "analysis" },

  // Reporting & Publication (slate)
  { name: "Reporting biases", category: "reporting" },
  { name: "Publication bias", category: "reporting" },
  { name: "Outcome reporting bias", category: "reporting" },
  { name: "Positive results bias", category: "reporting" },
  { name: "Language bias", category: "reporting" },
  { name: "One-sided reference bias", category: "reporting" },
  { name: "Spin bias", category: "reporting" },
  { name: "All's well literature bias", category: "reporting" },
  { name: "Hot stuff bias", category: "reporting" },
  { name: "Novelty bias", category: "reporting" },
  { name: "Popularity bias", category: "reporting" },
  { name: "Review biases", category: "reporting" },
  { name: "Biases of rhetoric", category: "reporting" },

  // Other/Contextual (cyan)
  { name: "Industry sponsorship bias", category: "other" },
  { name: "Confirmation bias", category: "other" },
  { name: "Previous opinion bias", category: "other" },
  { name: "Availability bias", category: "other" },
  { name: "Hypothetical bias", category: "other" },
  { name: "Mimicry bias", category: "other" },
  { name: "Unacceptability bias", category: "other" },
  { name: "Unacceptable disease bias", category: "other" },
  { name: "Unmasking (detection signal) bias", category: "other" },
  { name: "Substitution game bias", category: "other" },
];

const categoryColors: Record<string, string> = {
  population: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  measurement: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  protocol: "bg-green-500/20 text-green-300 border-green-500/30",
  attrition: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  analysis: "bg-red-500/20 text-red-300 border-red-500/30",
  reporting: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  other: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

function BiasPill({ name, category, index, progress }: {
  name: string;
  category: string;
  index: number;
  progress: MotionValue<number>;
}) {
  // Stagger the appearance based on index
  // First 6 are always visible, rest fade in progressively
  const isInitiallyVisible = index < 6;
  const appearAt = isInitiallyVisible ? 0 : 0.1 + (index - 6) * 0.012;
  const opacity = useTransform(
    progress,
    [appearAt, Math.min(appearAt + 0.08, 1)],
    [isInitiallyVisible ? 1 : 0, 1]
  );
  const scale = useTransform(
    progress,
    [appearAt, Math.min(appearAt + 0.08, 1)],
    [isInitiallyVisible ? 1 : 0.8, 1]
  );

  return (
    <motion.span
      className={`inline-flex px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium border ${categoryColors[category]} whitespace-nowrap`}
      style={{ opacity, scale }}
    >
      {name}
    </motion.span>
  );
}

function StaticBiasPill({ name, category }: { name: string; category: string }) {
  return (
    <span
      className={`inline-flex px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium border ${categoryColors[category]} whitespace-nowrap`}
    >
      {name}
    </span>
  );
}

export function BiasScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "start start"],
  });

  // All transforms must be at top level (hooks rules)
  const count = useTransform(scrollYProgress, [0.1, 0.7], [6, 67]);
  const roundedCount = useTransform(count, (v) => Math.round(v));
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);
  const footerOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  // Reduced motion: show all biases statically
  if (prefersReducedMotion) {
    return (
      <Section background="dark" className="relative overflow-hidden">
        <Container>
          <div className="text-center mb-4 md:mb-8">
            <div className="text-5xl md:text-7xl font-bold text-white mb-1 md:mb-2">67</div>
            <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-white">
              Documented Bias Types
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
              Your team checks for a handful. Regulators catch a few more.
              We systematically detect all of them.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-5xl mx-auto">
            {biasTypes.map((bias) => (
              <StaticBiasPill key={bias.name} name={bias.name} category={bias.category} />
            ))}
          </div>
          <div className="text-center mt-4 md:mt-8">
            <p className="text-primary font-semibold text-base md:text-lg">
              Detected automatically. Explained clearly.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  // SSR/initial render: show static version until we know mobile/desktop
  if (isMobile === null) {
    return (
      <Section background="dark" className="relative overflow-hidden">
        <Container>
          <div className="text-center mb-4 md:mb-8">
            <div className="text-5xl md:text-7xl font-bold text-white mb-1 md:mb-2">67</div>
            <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-white">
              Documented Bias Types
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
              Your team checks for a handful. Regulators catch a few more.
              We systematically detect all of them.
            </p>
          </div>
          <div className="text-center mt-4 md:mt-8">
            <p className="text-primary font-semibold text-base md:text-lg">
              Detected automatically. Explained clearly.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  // Mobile: collapsible view
  if (isMobile) {
    return (
      <Section background="dark" className="relative overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="bias-grid-mobile" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bias-grid-mobile)" />
          </svg>
        </div>

        <Container className="relative">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white mb-1">67</div>
            <h2 className="text-xl font-bold mb-2 text-white">
              Documented Bias Types
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto">
              Your team checks for a handful. Regulators catch a few more.
              We systematically detect all of them.
            </p>
          </div>

          {/* Expand/collapse button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 mx-auto mb-4 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
          >
            <span>{isExpanded ? "Hide all biases" : "View all 67 biases"}</span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          {/* Collapsible bias pills */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap justify-center gap-1.5 max-w-5xl mx-auto pb-4">
                  {biasTypes.map((bias) => (
                    <StaticBiasPill key={bias.name} name={bias.name} category={bias.category} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer message */}
          <div className="text-center mt-4">
            <p className="text-primary font-semibold text-base">
              Detected automatically. Explained clearly.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  // Desktop: scroll-driven animation
  return (
    <div ref={containerRef} className="relative">
      <Section background="dark" className="relative overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="bias-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bias-grid)" />
          </svg>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="text-7xl font-bold text-white mb-2"
              style={{ opacity: headerOpacity }}
            >
              <motion.span>{roundedCount}</motion.span>
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Documented Bias Types
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Your team checks for a handful. Regulators catch a few more.
              We systematically detect all of them.
            </p>
          </div>

          {/* Bias pills grid */}
          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto min-h-[300px]">
            {biasTypes.map((bias, index) => (
              <BiasPill
                key={bias.name}
                name={bias.name}
                category={bias.category}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>

          {/* Footer message */}
          <motion.div
            className="text-center mt-8"
            style={{ opacity: footerOpacity }}
          >
            <p className="text-primary font-semibold text-lg">
              Detected automatically. Explained clearly.
            </p>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
