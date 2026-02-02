"use client";

interface BusinessImpactProps {
  riskLevel: "low" | "medium" | "high";
  riskDescription: string;
  costRange: string;
  costDescription: string;
  detectionPoint: string;
  detectionComparison: string;
  regulatoryNote?: string;
  prospectiveNote?: string;
}

const riskColors = {
  low: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  medium: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  high: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

const riskLabels = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
};

export function BusinessImpact({
  riskLevel,
  riskDescription,
  costRange,
  costDescription,
  detectionPoint,
  detectionComparison,
  regulatoryNote,
  prospectiveNote,
}: BusinessImpactProps) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="font-semibold text-slate-900 dark:text-slate-50">If This Were Your Trial</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Regulatory Risk */}
        <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">Regulatory Risk</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${riskColors[riskLevel]}`}>
              {riskLabels[riskLevel]}
            </span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">{riskDescription}</p>
        </div>

        {/* Cost Impact */}
        <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Estimated Cost of Late Discovery</div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-1">{costRange}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{costDescription}</p>
        </div>

        {/* Early Detection */}
        <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Clinequal Detection</div>
          <div className="text-xl font-bold text-primary mb-1">{detectionPoint}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{detectionComparison}</p>
        </div>
      </div>

      {regulatoryNote && (
        <div className="mt-4 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
          <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{regulatoryNote}</span>
        </div>
      )}

      {prospectiveNote && (
        <div className="mt-4 flex items-start gap-2 text-xs text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
          <svg className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{prospectiveNote}</span>
        </div>
      )}
    </div>
  );
}
