"use client";

import { getTrafficLight } from "@/lib/demo";

interface ComparisonChartProps {
  data: {
    label: string;
    trial: number;
    epidemiological: number;
    peerTrial?: number;
  }[];
  trialLabel?: string;
  epidemiologicalLabel?: string;
  peerTrialLabel?: string;
}

function BarRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 dark:text-slate-400 w-32 text-right shrink-0 hidden sm:block">
        {label}
      </span>
      <div className="flex-1 h-5 bg-slate-100 dark:bg-slate-700 rounded overflow-hidden">
        <div
          className={`h-full ${color} rounded transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-200 w-12 text-right">
        {value.toFixed(1)}%
      </span>
    </div>
  );
}

const trafficLightColors = {
  green: { dot: "bg-green-500", text: "text-green-600 dark:text-green-400" },
  amber: { dot: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
  red: { dot: "bg-red-500", text: "text-red-600 dark:text-red-400" },
};

export function ComparisonChart({
  data,
  trialLabel = "This Trial",
  epidemiologicalLabel = "Disease Prevalence",
  peerTrialLabel = "Peer Trial Average",
}: ComparisonChartProps) {
  const hasPeerTrial = data.some((d) => d.peerTrial != null);

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-slate-600 dark:text-slate-300">{trialLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-400" />
          <span className="text-slate-600 dark:text-slate-300">{epidemiologicalLabel}</span>
        </div>
        {hasPeerTrial && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-slate-600 dark:text-slate-300">{peerTrialLabel}</span>
          </div>
        )}
      </div>

      {/* Bars */}
      <div className="space-y-5">
        {data.map((item) => {
          const epiGap = item.trial - item.epidemiological;
          const ratio = item.trial / item.epidemiological;
          const light = getTrafficLight(ratio);
          const colors = trafficLightColors[light];

          return (
            <div
              key={item.label}
              className="space-y-1.5 pb-5 border-b border-slate-100 dark:border-slate-700/50 last:border-0 last:pb-0"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}
                  />
                  <span className={`text-sm font-medium ${colors.text}`}>
                    {epiGap > 0 ? "+" : ""}
                    {epiGap.toFixed(1)}pp
                  </span>
                </div>
              </div>

              <BarRow
                label={trialLabel}
                value={item.trial}
                color="bg-primary/80"
              />
              <BarRow
                label={epidemiologicalLabel}
                value={item.epidemiological}
                color="bg-slate-400"
              />
              {item.peerTrial != null && (
                <BarRow
                  label={peerTrialLabel}
                  value={item.peerTrial}
                  color="bg-amber-400"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
