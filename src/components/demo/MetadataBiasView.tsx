"use client";

import { useState, useEffect } from "react";
import { metadataExampleAnalysis } from "@/lib/demo";
import type { BiasIndicator, RiskLevel, MetadataAnalysisResult } from "@/lib/demo/datasets/metadata-example";
import { getTrialBias } from "@/lib/api/trials";
import { WalkthroughSection } from "./ScrollReveal";
import { StatCard } from "./StatCard";
import { DemoCTA } from "./DemoCTA";
import { RegulatoryBadge, RegulatoryNote } from "./RegulatoryBadge";

interface MetadataBiasViewProps {
  onBack: () => void;
  nctId?: string;
}

const riskColors: Record<RiskLevel, string> = {
  HIGH: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  MEDIUM: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  LOW: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  NONE: "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400",
};

const riskBarColors: Record<RiskLevel, string> = {
  HIGH: "bg-red-500",
  MEDIUM: "bg-amber-500",
  LOW: "bg-yellow-400",
  NONE: "bg-slate-200 dark:bg-slate-700",
};

function IndicatorRow({ indicator }: { indicator: BiasIndicator }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
      {/* Status icon */}
      <div className="mt-0.5">
        {indicator.detected ? (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-medium text-sm text-slate-900 dark:text-slate-50">{indicator.name}</span>
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${riskColors[indicator.riskLevel]}`}>
            {indicator.riskLevel}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">{indicator.explanation}</p>
        {indicator.details && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{indicator.details}</p>
        )}
      </div>
    </div>
  );
}

function BiasScoreBar({ score, label }: { score: number; label: string }) {
  const risk: RiskLevel = score >= 50 ? "HIGH" : score >= 25 ? "MEDIUM" : score > 0 ? "LOW" : "NONE";
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">{score.toFixed(1)}</span>
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${riskColors[risk]}`}>
            {risk}
          </span>
        </div>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${riskBarColors[risk]}`}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
    </div>
  );
}

export function MetadataBiasView({ onBack, nctId }: MetadataBiasViewProps) {
  const [analysis, setAnalysis] = useState<MetadataAnalysisResult | null>(
    nctId ? null : metadataExampleAnalysis
  );
  const [loading, setLoading] = useState(!!nctId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nctId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    getTrialBias(nctId)
      .then((data) => {
        if (!cancelled) setAnalysis(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load bias analysis");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [nctId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm">Analyzing {nctId}...</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">Fetching trial metadata and running bias analysis</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex items-center justify-center py-20">
          <div className="max-w-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-3">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-1">Analysis failed</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{error}</p>
            <button
              onClick={onBack}
              className="px-4 py-2 text-sm bg-slate-800 dark:bg-slate-600 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-500"
            >
              Back to search
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  const trial = analysis.trial;

  return (
    <div className="space-y-4">
      {/* Header - Always visible */}
      <div className="flex items-start justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm py-4 -mx-4 px-4 z-10 border-b border-slate-100 dark:border-slate-800">
        <div>
          <button
            onClick={onBack}
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary mb-1 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 max-w-xl">
            Registry Metadata Analysis
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{trial.conditions.join(", ")}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="px-3 py-1 text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">
            Metadata Only
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{trial.phase} &bull; {trial.studyType}</span>
        </div>
      </div>

      {/* Data Source Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-sm text-blue-900 dark:text-blue-200 font-medium mb-1">
            This analysis uses trial registration data from ClinicalTrials.gov
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300">
            It assesses the trial&apos;s design for bias risk indicators but cannot analyze
            actual patient outcomes, demographics, or attrition.{" "}
            <a href="#whats-missing" className="underline font-medium">
              What does patient-level data reveal?
            </a>
          </p>
        </div>
      </div>

      {/* Section 1: Trial Overview */}
      <WalkthroughSection
        title="Trial Overview"
        subtitle={trial.title}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* MOCK: These values come from the mock data file */}
          <StatCard label="NCT ID" value={trial.nctId} />
          <StatCard label="Status" value={trial.status} />
          <StatCard label="Enrollment" value={trial.enrollment.toLocaleString()} />
          <StatCard label="Sites" value={trial.locationCount} />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Allocation</p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{trial.allocation}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Masking</p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{trial.masking}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Results Posted</p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{trial.hasResults ? "Yes" : "No"}</p>
          </div>
        </div>
      </WalkthroughSection>

      {/* Section 2: Publication Bias */}
      <WalkthroughSection title="Publication Bias Assessment">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <RegulatoryBadge type="fda" text="FDAAA 801 - Results reporting" />
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-4">
          {analysis.publicationBias.indicators.map((indicator) => (
            <IndicatorRow key={indicator.name} indicator={indicator} />
          ))}
        </div>

        <BiasScoreBar score={analysis.publicationBias.score} label="Publication Bias Score" />

        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">{analysis.publicationBias.summary}</p>
      </WalkthroughSection>

      {/* Section 3: Selection Bias */}
      <WalkthroughSection title="Selection Bias Assessment">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <RegulatoryBadge type="cochrane" text="Risk of Bias framework" />
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-4">
          {analysis.selectionBias.indicators.map((indicator) => (
            <IndicatorRow key={indicator.name} indicator={indicator} />
          ))}
        </div>

        <BiasScoreBar score={analysis.selectionBias.score} label="Selection Bias Score" />

        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">{analysis.selectionBias.summary}</p>
      </WalkthroughSection>

      {/* Section 4: Overall Score */}
      <WalkthroughSection title="Overall Assessment">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Overall Bias Risk Score</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{analysis.overallScore.toFixed(1)}</p>
            </div>
            <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${riskColors[analysis.overallRisk]}`}>
              {analysis.overallRisk} RISK
            </span>
          </div>

          <BiasScoreBar score={analysis.overallScore} label="Combined Score (60% publication + 40% selection)" />
        </div>

        {analysis.recommendations.length > 0 && (
          <div>
            <h3 className="font-medium text-slate-900 dark:text-slate-50 mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        <RegulatoryNote>
          Scores are derived from trial design metadata only. The weighting (60% publication / 40% selection)
          and indicator weights are heuristic-based, not a validated clinical scoring system.
        </RegulatoryNote>
      </WalkthroughSection>

      {/* Section 5: What's Missing - Key differentiator */}
      <WalkthroughSection title="What&rsquo;s Missing?">
        <div id="whats-missing" className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white">
          <p className="text-sm text-slate-300 mb-6">
            Registry metadata reveals trial design risks, but patient-level data exposes the actual impact
            on study conclusions. Here&apos;s what each data depth provides:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: What metadata tells us */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-600 text-slate-300">
                  Metadata
                </span>
                <span className="text-sm font-medium text-slate-300">What registry data tells us</span>
              </div>
              <ul className="space-y-2">
                {[
                  "Trial design structure",
                  "Randomization method",
                  "Sample size",
                  "Blinding approach",
                  "Eligibility criteria structure",
                  "Results posting compliance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                    <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: What patient-level data reveals */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-700 text-emerald-200">
                  Patient-Level
                </span>
                <span className="text-sm font-medium text-white">What patient data reveals</span>
              </div>
              <ul className="space-y-2">
                {[
                  "Actual demographic representation gaps",
                  "Differential dropout rates by subgroup",
                  "ITT vs completer efficacy discrepancy",
                  "Outcome disparities across populations",
                  "Real-world generalizability assessment",
                  "Quantified business & regulatory impact",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700">
            <p className="text-sm text-slate-400">
              See the difference with our{" "}
              <button onClick={onBack} className="text-primary underline hover:text-primary-light">
                patient-level demos
              </button>
              , or request a pilot to analyze your own trial data.
            </p>
          </div>
        </div>
      </WalkthroughSection>

      {/* CTA */}
      <WalkthroughSection>
        <DemoCTA />
      </WalkthroughSection>
    </div>
  );
}
