"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

// Categories for bias classification
const categories = {
  selection: { name: "Selection & Sampling", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", legendColor: "bg-blue-500" },
  information: { name: "Information & Measurement", color: "bg-amber-500/20 text-amber-300 border-amber-500/30", legendColor: "bg-amber-500" },
  confounding: { name: "Confounding & Causation", color: "bg-red-500/20 text-red-300 border-red-500/30", legendColor: "bg-red-500" },
  temporal: { name: "Time-Related", color: "bg-purple-500/20 text-purple-300 border-purple-500/30", legendColor: "bg-purple-500" },
  analysis: { name: "Analysis & Statistical", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", legendColor: "bg-emerald-500" },
  publication: { name: "Publication & Reporting", color: "bg-slate-400/20 text-slate-300 border-slate-400/30", legendColor: "bg-slate-400" },
  design: { name: "Study Design", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30", legendColor: "bg-cyan-500" },
  demographic: { name: "Demographic", color: "bg-pink-500/20 text-pink-300 border-pink-500/30", legendColor: "bg-pink-500" },
  other: { name: "Other", color: "bg-orange-500/20 text-orange-300 border-orange-500/30", legendColor: "bg-orange-500" },
};

type CategoryKey = keyof typeof categories;

// 74 biases from Nicola's list, categorized
const biasTypes: { name: string; category: CategoryKey }[] = [
  // Selection & Sampling (blue)
  { name: "Selection bias", category: "selection" },
  { name: "Sampling bias", category: "selection" },
  { name: "Sample bias", category: "selection" },
  { name: "Volunteer (self-selection) bias", category: "selection" },
  { name: "Recruitment bias", category: "selection" },
  { name: "Participation bias", category: "selection" },
  { name: "Admission rate (Berkson) bias", category: "selection" },
  { name: "Healthy worker bias", category: "selection" },
  { name: "Membership bias", category: "selection" },
  { name: "Consent/non-consent bias", category: "selection" },
  { name: "Response/non-response bias", category: "selection" },
  { name: "Loss-to-follow-up bias", category: "selection" },
  { name: "Attrition bias", category: "selection" },
  { name: "Survival/survivor(ship) bias", category: "selection" },

  // Information & Measurement (amber)
  { name: "Information bias", category: "information" },
  { name: "Measurement bias", category: "information" },
  { name: "Observer bias", category: "information" },
  { name: "Interviewer bias", category: "information" },
  { name: "Investigator bias", category: "information" },
  { name: "Detection bias", category: "information" },
  { name: "Ascertainment bias", category: "information" },
  { name: "Recall bias", category: "information" },
  { name: "Respondent bias", category: "information" },
  { name: "Perception bias", category: "information" },
  { name: "Social desirability bias", category: "information" },
  { name: "Apprehension bias", category: "information" },
  { name: "Acceptability/unacceptability bias", category: "information" },

  // Confounding & Causation (red)
  { name: "Confounding bias", category: "confounding" },
  { name: "Confounding by indication bias", category: "confounding" },
  { name: "Collider bias", category: "confounding" },
  { name: "Collider-stratification bias", category: "confounding" },
  { name: "Simpson's paradox", category: "confounding" },
  { name: "Channeling bias", category: "confounding" },
  { name: "Indication bias", category: "confounding" },
  { name: "Protopathic bias", category: "confounding" },

  // Time-Related (purple)
  { name: "Immortal time bias", category: "temporal" },
  { name: "Lead-time bias", category: "temporal" },
  { name: "Length time bias", category: "temporal" },
  { name: "Temporal bias", category: "temporal" },
  { name: "Chronological bias", category: "temporal" },
  { name: "Disease latency bias", category: "temporal" },
  { name: "Prevalence-incidence (Neyman) bias", category: "temporal" },
  { name: "Wash-in/wash-out effect bias", category: "temporal" },

  // Analysis & Statistical (emerald)
  { name: "Data-dredging bias", category: "analysis" },
  { name: "Overfitting bias", category: "analysis" },
  { name: "Regression dilution bias", category: "analysis" },
  { name: "Small-study effect bias", category: "analysis" },
  { name: "Missing data bias", category: "analysis" },
  { name: "Stratification bias", category: "analysis" },
  { name: "Population stratification bias", category: "analysis" },
  { name: "Baseline imbalance bias", category: "analysis" },

  // Publication & Reporting (slate)
  { name: "Publication bias", category: "publication" },
  { name: "Language bias", category: "publication" },
  { name: "Reporting bias", category: "publication" },

  // Study Design (cyan)
  { name: "Allocation bias", category: "design" },
  { name: "Intervention bias", category: "design" },
  { name: "Non-contemporaneous/non-concurrent control bias", category: "design" },
  { name: "Testing bias", category: "design" },
  { name: "Verification bias", category: "design" },
  { name: "Incorporation bias", category: "design" },
  { name: "Spectrum effect bias", category: "design" },
  { name: "Diagnostic suspicion bias", category: "design" },
  { name: "Detection signal (unmasking) bias", category: "design" },
  { name: "Exposure bias", category: "design" },
  { name: "Exposure suspicion bias", category: "design" },

  // Demographic (pink)
  { name: "Gender bias", category: "demographic" },
  { name: "Racial(ized)/ethnic bias", category: "demographic" },
  { name: "Age mimicry bias", category: "demographic" },
  { name: "Sociodemographic bias", category: "demographic" },
  { name: "Family information bias", category: "demographic" },

  // Other (orange)
  { name: "Algorithmic bias", category: "other" },
  { name: "Availability bias", category: "other" },
  { name: "Risk perception bias", category: "other" },
  { name: "Unknown bias", category: "other" },
  { name: "Adherence/compliance bias", category: "other" },
];

const TOTAL_BIASES = biasTypes.length;

function BiasPill({ name, category, index, progress }: {
  name: string;
  category: CategoryKey;
  index: number;
  progress: MotionValue<number>;
}) {
  const isInitiallyVisible = index < 8;
  const appearAt = isInitiallyVisible ? 0 : 0.1 + (index - 8) * 0.012;
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
      className={`inline-flex px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium border ${categories[category].color} whitespace-nowrap`}
      style={{ opacity, scale }}
    >
      {name}
    </motion.span>
  );
}

function StaticBiasPill({ name, category }: { name: string; category: CategoryKey }) {
  return (
    <span
      className={`inline-flex px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium border ${categories[category].color} whitespace-nowrap`}
    >
      {name}
    </span>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6 pt-4 border-t border-white/10">
      {Object.entries(categories).map(([key, { name, legendColor }]) => (
        <div key={key} className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${legendColor}`} />
          <span className="text-xs text-slate-400">{name}</span>
        </div>
      ))}
    </div>
  );
}

export function BiasScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "start start"],
  });

  const count = useTransform(scrollYProgress, [0.1, 0.7], [8, TOTAL_BIASES]);
  const roundedCount = useTransform(count, (v) => Math.round(v));
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);
  const footerOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  // Reduced motion: show all biases statically
  if (prefersReducedMotion) {
    return (
      <Section background="dark" className="relative overflow-hidden">
        <Container>
          <div className="text-center mb-4 md:mb-8">
            <div className="text-5xl md:text-7xl font-bold text-white mb-1 md:mb-2">{TOTAL_BIASES}</div>
            <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-white">
              Documented Bias Types
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
              Manual review catches some. Regulatory checklists flag a few more.
              Clinequal systematically detects all of them.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-5xl mx-auto">
            {biasTypes.map((bias) => (
              <StaticBiasPill key={bias.name} name={bias.name} category={bias.category} />
            ))}
          </div>
          <Legend />
          <div className="text-center mt-4 md:mt-8">
            <p className="text-primary font-semibold text-base md:text-lg">
              Detected automatically. Explained clearly.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Mobile: collapsible view */}
      <Section background="dark" className="relative overflow-hidden md:hidden">
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
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white mb-1">{TOTAL_BIASES}</div>
            <h2 className="text-xl font-bold mb-2 text-white">
              Documented Bias Types
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto">
              Manual review catches some. Regulatory checklists flag a few more.
              Clinequal systematically detects all of them.
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 mx-auto mb-4 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
          >
            <span>{isExpanded ? "Hide all biases" : `View all ${TOTAL_BIASES} biases`}</span>
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
                <Legend />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mt-4">
            <p className="text-primary font-semibold text-base">
              Detected automatically. Explained clearly.
            </p>
          </div>
        </Container>
      </Section>

      {/* Desktop: scroll-driven animation */}
      <div ref={containerRef} className="relative hidden md:block">
        <Section background="dark" className="relative overflow-hidden">
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

          <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <Container className="relative">
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
                Manual review catches some. Regulatory checklists flag a few more.
                Clinequal systematically detects all of them.
              </p>
            </div>

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

            <motion.div style={{ opacity: footerOpacity }}>
              <Legend />
            </motion.div>

            <motion.div
              className="text-center mt-6"
              style={{ opacity: footerOpacity }}
            >
              <p className="text-primary font-semibold text-lg">
                Detected automatically. Explained clearly.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>
    </>
  );
}
