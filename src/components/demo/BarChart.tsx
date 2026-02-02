"use client";

interface BarChartProps {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
  maxValue?: number;
  showPercentage?: boolean;
  height?: number;
}

export function BarChart({
  data,
  maxValue,
  showPercentage = true,
  height = 32,
}: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
            <span className="text-slate-600 dark:text-slate-300">
              {showPercentage ? `${item.value.toFixed(1)}%` : item.value}
            </span>
          </div>
          <div
            className="w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"
            style={{ height }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.color ?? (index === 0 ? "#0ea5e9" : "#64748b"),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
