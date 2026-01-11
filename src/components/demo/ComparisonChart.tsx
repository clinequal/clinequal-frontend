"use client";

interface ComparisonChartProps {
  data: {
    label: string;
    trial: number;
    population: number;
  }[];
  trialLabel?: string;
  populationLabel?: string;
}

export function ComparisonChart({
  data,
  trialLabel = "In Trial",
  populationLabel = "Population",
}: ComparisonChartProps) {
  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-slate-600">{trialLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <span className="text-slate-600">{populationLabel}</span>
        </div>
      </div>

      {/* Bars */}
      <div className="space-y-4">
        {data.map((item) => {
          const gap = item.trial - item.population;
          const isOverrepresented = gap > 0;

          return (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span
                  className={`text-sm font-medium ${
                    Math.abs(gap) > 10
                      ? isOverrepresented
                        ? "text-amber-600"
                        : "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {gap > 0 ? "+" : ""}
                  {gap.toFixed(1)}pp
                </span>
              </div>

              <div className="relative h-10">
                {/* Population baseline */}
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="h-6 bg-slate-200 rounded"
                    style={{ width: `${item.population}%` }}
                  />
                </div>

                {/* Trial actual */}
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="h-6 bg-primary/80 rounded"
                    style={{ width: `${item.trial}%` }}
                  />
                </div>

                {/* Value labels */}
                <div className="absolute inset-0 flex items-center">
                  <span className="ml-2 text-xs font-medium text-white drop-shadow">
                    {item.trial.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
