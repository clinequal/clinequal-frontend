"use client";

import type { BiasStage, ActiveBiasHighlight } from "@/lib/demo";

interface BiasTimelineProps {
  stages: BiasStage[];
  activeHighlights: ActiveBiasHighlight[];
  accentColor?: "amber" | "purple" | "red";
}

const accentStyles = {
  amber: {
    ring: "ring-amber-400",
    bg: "bg-amber-500",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    pulse: "bg-amber-400",
  },
  purple: {
    ring: "ring-purple-400",
    bg: "bg-purple-500",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    pulse: "bg-purple-400",
  },
  red: {
    ring: "ring-red-400",
    bg: "bg-red-500",
    badge: "bg-red-100 text-red-800 border-red-200",
    pulse: "bg-red-400",
  },
};

export function BiasTimeline({
  stages,
  activeHighlights,
  accentColor = "amber",
}: BiasTimelineProps) {
  const sorted = [...stages].sort((a, b) => a.order - b.order);
  const styles = accentStyles[accentColor];

  const highlightMap = new Map<string, ActiveBiasHighlight>();
  for (const h of activeHighlights) {
    highlightMap.set(h.stageId, h);
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-start gap-0 min-w-[600px] px-4 py-6">
        {sorted.map((stage, i) => {
          const highlight = highlightMap.get(stage.id);
          const isActive = !!highlight;
          const isLast = i === sorted.length - 1;

          return (
            <div key={stage.id} className="flex items-start flex-1">
              {/* Stage node + content */}
              <div className="flex flex-col items-center w-full">
                {/* Node */}
                <div className="relative">
                  {isActive && (
                    <span
                      className={`absolute inset-0 rounded-full ${styles.pulse} animate-ping opacity-30`}
                      style={{ margin: "-4px" }}
                    />
                  )}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold relative z-10 ${
                      isActive
                        ? `${styles.bg} text-white ring-4 ${styles.ring} ring-opacity-30`
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Stage label */}
                <span
                  className={`text-xs mt-2 text-center leading-tight ${
                    isActive ? "font-semibold text-slate-900" : "text-slate-500"
                  }`}
                >
                  {stage.label}
                </span>

                {/* Bias badge */}
                {highlight && (
                  <div className={`mt-2 px-2 py-1 text-xs font-medium rounded border ${styles.badge}`}>
                    {highlight.biasType}
                  </div>
                )}

                {/* Description */}
                {highlight && (
                  <p className="text-xs text-slate-500 mt-1 text-center max-w-[120px]">
                    {highlight.description}
                  </p>
                )}
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="flex items-center h-8 flex-shrink-0 -mx-1">
                  <div className="w-full h-0.5 bg-slate-200 min-w-[20px]" />
                  <svg className="w-3 h-3 text-slate-300 flex-shrink-0 -ml-1" viewBox="0 0 12 12">
                    <path d="M2 2 L10 6 L2 10" fill="none" stroke="currentColor" strokeWidth={2} />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
