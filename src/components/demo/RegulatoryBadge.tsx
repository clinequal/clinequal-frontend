interface RegulatoryBadgeProps {
  type: "fda" | "ema" | "cochrane" | "ich";
  text: string;
}

const badges = {
  fda: {
    label: "FDA",
    color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  },
  ema: {
    label: "EMA",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800",
  },
  cochrane: {
    label: "Cochrane",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800",
  },
  ich: {
    label: "ICH",
    color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
  },
};

export function RegulatoryBadge({ type, text }: RegulatoryBadgeProps) {
  const badge = badges[type];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${badge.color}`}>
      <span className="font-semibold">{badge.label}</span>
      <span className="opacity-75">{text}</span>
    </div>
  );
}

interface RegulatoryNoteProps {
  children: React.ReactNode;
}

export function RegulatoryNote({ children }: RegulatoryNoteProps) {
  return (
    <div className="flex items-start gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
      <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>{children}</span>
    </div>
  );
}
