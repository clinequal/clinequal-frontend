"use client";

import type { ProspectiveMilestone } from "@/lib/demo";

interface ProspectiveTimelineProps {
  milestones: ProspectiveMilestone[];
}

export function ProspectiveTimeline({ milestones }: ProspectiveTimelineProps) {
  const detectedIdx = milestones.findIndex((m) => m.detected);
  const traditionalIdx = milestones.findIndex((m) => m.traditional);
  const hasSavings = detectedIdx >= 0 && traditionalIdx >= 0 && traditionalIdx > detectedIdx;

  return (
    <div className="space-y-0">
      {milestones.map((milestone, i) => {
        const isDetected = milestone.detected;
        const isTraditional = milestone.traditional;
        const isNeutral = !isDetected && !isTraditional;
        const isLast = i === milestones.length - 1;

        // Determine if this milestone is in the "savings" zone
        const inSavingsZone = hasSavings && i > detectedIdx && i < traditionalIdx;

        return (
          <div key={milestone.id}>
            {/* Savings zone indicator — shown before milestones between detection and traditional */}
            {hasSavings && i === detectedIdx + 1 && (
              <div className="flex">
                <div className="flex flex-col items-center w-8 shrink-0">
                  <div className="flex-1 w-0.5 bg-green-300 dark:bg-green-700" />
                </div>
                <div className="flex-1 py-2 pl-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-3 py-2 inline-flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-xs font-semibold text-green-800 dark:text-green-300">
                      Time saved with early detection
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Milestone row */}
            <div className="flex">
              {/* Left column: dot + connector line */}
              <div className="flex flex-col items-center w-8 shrink-0">
                {/* Dot */}
                {isDetected ? (
                  <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center ring-4 ring-green-100 dark:ring-green-900/50 shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : isTraditional ? (
                  <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center ring-4 ring-red-100 dark:ring-red-900/50 shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                  </div>
                )}

                {/* Connector line */}
                {!isLast && (
                  <div className={`flex-1 w-0.5 min-h-[16px] ${
                    inSavingsZone || (hasSavings && i === detectedIdx)
                      ? "bg-green-300 dark:bg-green-700"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`} />
                )}
              </div>

              {/* Right column: content */}
              <div className={`flex-1 pl-4 ${isLast ? "" : "pb-5"}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs font-bold uppercase tracking-wide ${
                      isDetected
                        ? "text-green-600 dark:text-green-400"
                        : isTraditional
                        ? "text-red-600 dark:text-red-400"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {milestone.timepoint}
                  </span>
                  {isDetected && (
                    <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-0.5 rounded-full font-medium">
                      Clinequal
                    </span>
                  )}
                  {isTraditional && (
                    <span className="text-[10px] bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-2 py-0.5 rounded-full font-medium">
                      Traditional
                    </span>
                  )}
                </div>
                <h4
                  className={`text-sm font-medium mt-0.5 ${
                    isNeutral ? "text-slate-600 dark:text-slate-400" : "text-slate-900 dark:text-slate-50"
                  }`}
                >
                  {milestone.label}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
