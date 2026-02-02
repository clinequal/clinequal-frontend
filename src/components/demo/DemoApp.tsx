"use client";

import { useState } from "react";
import { DatasetSelector } from "./DatasetSelector";
import { DemographicBiasView } from "./DemographicBiasView";
import { AttritionBiasView } from "./AttritionBiasView";
import { MetadataBiasView } from "./MetadataBiasView";
import { TrialSearch } from "./TrialSearch";

type DemoState =
  | "select"
  | "heart-disease-uci"
  | "depression-trial-synthetic"
  | "metadata-ctgov-example"
  | "metadata-search"
  | "metadata-analysis";

export function DemoApp() {
  const [state, setState] = useState<DemoState>("select");
  const [showIntro, setShowIntro] = useState(true);
  const [selectedNctId, setSelectedNctId] = useState<string | null>(null);

  const handleSelectDataset = (datasetId: string) => {
    if (datasetId === "metadata-ctgov-example") {
      setState("metadata-search");
    } else {
      setState(datasetId as DemoState);
    }
  };

  const handleTrialSelected = (nctId: string) => {
    setSelectedNctId(nctId);
    setState("metadata-analysis");
  };

  const handleBack = () => {
    setState("select");
    setSelectedNctId(null);
  };

  const handleBackToSearch = () => {
    setState("metadata-search");
    setSelectedNctId(null);
  };

  return (
    <div className="relative">
      {/* Preview Badge */}
      <div className="absolute top-0 right-0 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900 dark:bg-slate-700 text-white rounded-bl-lg">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
        </span>
      </div>

      {/* Intro Modal */}
      {showIntro && state === "select" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg mx-4 p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                Welcome to the Clinequal Demo
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Explore how bias affects clinical trial data using real-world dataset patterns.
                This preview demonstrates our bias detection capabilities at two different data depths.
              </p>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-slate-50">What you&apos;ll see:</strong>
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-300 mt-2 space-y-1">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Demographic bias in cardiovascular research
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Attrition bias in treatment trials
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Live trial lookup from ClinicalTrials.gov registry
                  </li>
                </ul>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                The full platform will allow you to upload your own datasets for analysis.
              </p>
              <button
                onClick={() => setShowIntro(false)}
                className="w-full py-3 px-6 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                Explore the Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="py-8">
        {state === "select" && (
          <DatasetSelector onSelect={handleSelectDataset} />
        )}

        {state === "heart-disease-uci" && (
          <DemographicBiasView onBack={handleBack} />
        )}

        {state === "depression-trial-synthetic" && (
          <AttritionBiasView onBack={handleBack} />
        )}

        {state === "metadata-ctgov-example" && (
          <MetadataBiasView onBack={handleBack} />
        )}

        {state === "metadata-search" && (
          <TrialSearch onSelect={handleTrialSelected} onBack={handleBack} />
        )}

        {state === "metadata-analysis" && selectedNctId && (
          <MetadataBiasView onBack={handleBackToSearch} nctId={selectedNctId} />
        )}
      </div>
    </div>
  );
}
