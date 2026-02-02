"use client";

import { patientLevelDatasets, metadataDatasets } from "@/lib/demo";

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
  search: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
};

const biasTypeConfig = {
  demographic: {
    label: "Demographic Bias",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  },
  attrition: {
    label: "Attrition Bias",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
  selection: {
    label: "Selection Bias",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  other: {
    label: "Other Bias",
    color: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  },
};

export function DatasetSelector({ onSelect }: DatasetSelectorProps) {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          Select a Trial to Analyze
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Explore how Clinequal detects and quantifies bias at different data depths.
        </p>
      </div>

      {/* Patient-Level Data Section */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-50">Patient-Level Data Analysis</h3>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Deep Analysis
            </span>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 ml-11">
          Individual patient records enable analysis of demographic representation,
          outcome disparities, and attrition patterns across subgroups.
        </p>

        <div className="grid md:grid-cols-2 gap-4 ml-11">
          {patientLevelDatasets.map((dataset) => {
            const biasConfig = biasTypeConfig[dataset.biasType];
            return (
              <button
                key={dataset.id}
                onClick={() => onSelect(dataset.id)}
                className="group p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary hover:shadow-lg transition-all text-left border-l-primary border-l-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    {icons[dataset.icon as keyof typeof icons]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{dataset.phase}</span>
                      <span className="text-slate-300 dark:text-slate-600">|</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{dataset.patients} patient records</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50 group-hover:text-primary transition-colors">
                      {dataset.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {dataset.shortDescription}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${biasConfig.color}`}>
                        {biasConfig.label}
                      </span>
                      <span className="text-xs text-red-600 dark:text-red-400 font-medium">High Risk</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-3xl mx-auto flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Different data depth</span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Registry Metadata Section */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-50">Trial Registry Metadata</h3>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              Metadata Only
            </span>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 ml-11">
          ClinicalTrials.gov provides trial design information &mdash; randomization method,
          blinding, sample size, eligibility criteria &mdash; but not individual patient data.
          Analysis is limited to structural risk indicators.
        </p>

        <div className="grid md:grid-cols-2 gap-4 ml-11">
          {metadataDatasets.map((dataset) => {
            const biasConfig = biasTypeConfig[dataset.biasType];
            return (
              <button
                key={dataset.id}
                onClick={() => onSelect(dataset.id)}
                className="group p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-lg transition-all text-left border-l-slate-300 dark:border-l-slate-600 border-l-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center group-hover:bg-slate-700 dark:group-hover:bg-slate-600 group-hover:text-white transition-colors">
                    {icons[dataset.icon as keyof typeof icons]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{dataset.phase}</span>
                      <span className="text-slate-300 dark:text-slate-600">|</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Registry Data</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                      {dataset.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {dataset.shortDescription}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${biasConfig.color}`}>
                        {biasConfig.label}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        Patient-level examples use simulated data based on real clinical trial patterns.
        The full platform analyzes your actual trial data.
      </p>
    </div>
  );
}
