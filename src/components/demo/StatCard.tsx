interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
  highlight?: boolean;
}

export function StatCard({
  label,
  value,
  subtext,
  trend,
  highlight = false,
}: StatCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border ${
        highlight
          ? "bg-primary/5 border-primary/20"
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
      }`}
    >
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p
        className={`text-2xl font-bold ${
          highlight ? "text-primary" : "text-slate-900 dark:text-slate-50"
        }`}
      >
        {value}
        {trend && (
          <span
            className={`ml-2 text-sm ${
              trend === "up"
                ? "text-red-500"
                : trend === "down"
                  ? "text-green-500"
                  : "text-slate-400"
            }`}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </span>
        )}
      </p>
      {subtext && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtext}</p>}
    </div>
  );
}
