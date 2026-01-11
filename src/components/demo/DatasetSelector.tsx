"use client";

import { datasets } from "@/lib/demo";

interface DatasetSelectorProps {
  onSelect: (datasetId: string) => void;
}

const icons = {
  heart: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  brain: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
};

const biasTypeConfig = {
  demographic: {
    label: "Demographic Bias",
    color: "bg-amber-100 text-amber-700",
  },
  attrition: {
    label: "Attrition Bias",
    color: "bg-purple-100 text-purple-700",
  },
  selection: {
    label: "Selection Bias",
    color: "bg-blue-100 text-blue-700",
  },
  other: {
    label: "Other Bias",
    color: "bg-slate-100 text-slate-700",
  },
};

export function DatasetSelector({ onSelect }: DatasetSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Select a Trial to Analyze
        </h2>
        <p className="text-slate-600">
          Explore how Clinequal detects and quantifies bias in clinical trial data.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {datasets.map((dataset) => {
          const biasConfig = biasTypeConfig[dataset.biasType];

          return (
            <button
              key={dataset.id}
              onClick={() => onSelect(dataset.id)}
              className="group p-6 rounded-xl border-2 border-slate-200 bg-white hover:border-primary hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  {icons[dataset.icon as keyof typeof icons]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-slate-500">{dataset.phase}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">{dataset.patients} patients</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                    {dataset.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {dataset.shortDescription}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${biasConfig.color}`}>
                      {biasConfig.label}
                    </span>
                    <span className="text-xs text-red-600 font-medium">High Risk</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-500 max-w-md mx-auto">
        These examples use simulated data based on real clinical trial patterns.
        The full platform analyzes your actual trial data.
      </p>
    </div>
  );
}
