"use client";

import type { BiasInteraction } from "@/lib/demo";

interface BiasInteractionsProps {
  interactions: BiasInteraction[];
  accentColor?: "amber" | "purple" | "red";
}

const accentStyles = {
  amber: { node: "bg-amber-100 border-amber-300 text-amber-900" },
  purple: { node: "bg-purple-100 border-purple-300 text-purple-900" },
  red: { node: "bg-red-100 border-red-300 text-red-900" },
};

const strengthWidth: Record<string, string> = {
  weak: "border-t",
  moderate: "border-t-2",
  strong: "border-t-[3px]",
};

export function BiasInteractions({
  interactions,
  accentColor = "amber",
}: BiasInteractionsProps) {
  const styles = accentStyles[accentColor];

  // Extract unique nodes in order
  const nodes: string[] = [];
  for (const edge of interactions) {
    if (!nodes.includes(edge.from)) nodes.push(edge.from);
    if (!nodes.includes(edge.to)) nodes.push(edge.to);
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center gap-3 min-w-[500px] px-2 py-4">
        {nodes.map((node, i) => {
          const isFirst = i === 0;
          const isLast = i === nodes.length - 1;
          const edge = i < interactions.length ? interactions[i] : null;

          return (
            <div key={node} className="flex items-center flex-1 min-w-0">
              {/* Node */}
              <div
                className={`px-4 py-3 rounded-lg border text-sm font-medium text-center min-w-[100px] flex-shrink-0 ${
                  isFirst
                    ? styles.node
                    : isLast
                    ? "bg-red-50 border-red-300 text-red-900"
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                {node}
              </div>

              {/* Arrow + description */}
              {edge && (
                <div className="flex flex-col items-center mx-1 flex-shrink-0">
                  <p className="text-[10px] text-slate-500 text-center max-w-[120px] leading-tight mb-1">
                    {edge.description}
                  </p>
                  <div className="flex items-center w-12">
                    <div
                      className={`flex-1 ${strengthWidth[edge.strength]} border-slate-400`}
                    />
                    <svg className="w-2.5 h-2.5 text-slate-400 flex-shrink-0 -ml-0.5" viewBox="0 0 10 10">
                      <path d="M1 2 L8 5 L1 8" fill="none" stroke="currentColor" strokeWidth={1.5} />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
