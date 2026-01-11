"use client";

interface BusinessImpactProps {
  riskLevel: "low" | "medium" | "high";
  riskDescription: string;
  costRange: string;
  costDescription: string;
  detectionPoint: string;
  detectionComparison: string;
  regulatoryNote?: string;
}

const riskColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  high: "bg-red-100 text-red-800 border-red-200",
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
}: BusinessImpactProps) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="font-semibold text-slate-900">If This Were Your Trial</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Regulatory Risk */}
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500">Regulatory Risk</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${riskColors[riskLevel]}`}>
              {riskLabels[riskLevel]}
            </span>
          </div>
          <p className="text-sm text-slate-700">{riskDescription}</p>
        </div>

        {/* Cost Impact */}
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="text-sm text-slate-500 mb-2">Estimated Cost of Late Discovery</div>
          <div className="text-xl font-bold text-slate-900 mb-1">{costRange}</div>
          <p className="text-xs text-slate-500">{costDescription}</p>
        </div>

        {/* Early Detection */}
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="text-sm text-slate-500 mb-2">Clinequal Detection</div>
          <div className="text-xl font-bold text-primary mb-1">{detectionPoint}</div>
          <p className="text-xs text-slate-500">{detectionComparison}</p>
        </div>
      </div>

      {regulatoryNote && (
        <div className="mt-4 flex items-start gap-2 text-xs text-slate-600 bg-white rounded-lg p-3 border border-slate-200">
          <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{regulatoryNote}</span>
        </div>
      )}
    </div>
  );
}
