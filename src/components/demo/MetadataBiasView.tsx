"use client";

import { useState, useEffect } from "react";
import { metadataExampleAnalysis } from "@/lib/demo";
import type { Flag, FlagStatus, MetadataAnalysisResult } from "@/lib/demo/datasets/metadata-example";
import { getTrialBias } from "@/lib/api/trials";
import { WalkthroughSection } from "./ScrollReveal";
import { StatCard } from "./StatCard";
import { DemoCTA } from "./DemoCTA";
import { RegulatoryBadge, RegulatoryNote } from "./RegulatoryBadge";
import { BackButton } from "./BackButton";

interface MetadataBiasViewProps {
  onBack: () => void;
  nctId?: string;
}

const statusConfig: Record<FlagStatus, { icon: React.ReactNode; color: string }> = {
  concern: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    color: "text-amber-500",
  },
  note: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-blue-500",
  },
  ok: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-green-500",
  },
};

function FlagRow({ flag }: { flag: Flag }) {
  const config = statusConfig[flag.status];
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
      <div className={`mt-0.5 ${config.color}`}>
        {config.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-medium text-sm text-slate-900 dark:text-slate-50">{flag.name}</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">{flag.explanation}</p>
        {flag.details && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{flag.details}</p>
        )}
      </div>
    </div>
  );
}

function SectionSummary({ flags }: { flags: Flag[] }) {
  const concerns = flags.filter(f => f.status === "concern").length;
  const notes = flags.filter(f => f.status === "note").length;

  if (concerns === 0 && notes === 0) {
    return <span className="text-xs text-green-600 dark:text-green-400 font-medium">No concerns</span>;
  }

  const parts: string[] = [];
  if (concerns > 0) parts.push(`${concerns} concern${concerns > 1 ? "s" : ""}`);
  if (notes > 0) parts.push(`${notes} note${notes > 1 ? "s" : ""}`);

  return (
    <span className={`text-xs font-medium ${concerns > 0 ? "text-amber-600 dark:text-amber-400" : "text-blue-600 dark:text-blue-400"}`}>
      {parts.join(", ")}
    </span>
  );
}

function FlagSectionHeader({ flags }: { flags: Flag[] }) {
  const concerns = flags.filter(f => f.status === "concern").length;
  const notes = flags.filter(f => f.status === "note").length;
  const allOk = concerns === 0 && notes === 0;

  if (allOk) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm font-medium">No issues detected</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
      concerns > 0
        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
        : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
    }`}>
      {concerns > 0 ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      <span className="text-sm font-medium">
        {concerns > 0 && `${concerns} concern${concerns > 1 ? "s" : ""}`}
        {concerns > 0 && notes > 0 && ", "}
        {notes > 0 && `${notes} note${notes > 1 ? "s" : ""}`}
      </span>
    </div>
  );
}

function FlagSection({ title, flags, badge }: { title: string; flags: Flag[]; badge?: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
          {badge}
        </div>
        <FlagSectionHeader flags={flags} />
      </div>
      <div className="px-6">
        {flags.map((flag) => (
          <FlagRow key={flag.name} flag={flag} />
        ))}
      </div>
    </div>
  );
}

function CollapsibleSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
      >
        <h3 className="font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          {children}
        </div>
      )}
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
        <BackButton onClick={onBack} />
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
        <BackButton onClick={onBack} />
        <div className="flex items-center justify-center py-20">
          <div className="max-w-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-3">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-1">Analysis failed</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{error}</p>
            <BackButton onClick={onBack} label="Back to search" />
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
          <div className="mb-2">
            <BackButton onClick={onBack} />
          </div>
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
            It flags potential concerns based on trial design metadata but cannot analyze
            actual patient outcomes, demographics, or attrition.{" "}
            <a href="#whats-missing" className="underline font-medium">
              What does patient-level data reveal?
            </a>
          </p>
        </div>
      </div>

      {/* Section 1: Study Overview */}
      <WalkthroughSection
        title="Study Overview"
        subtitle={trial.title}
      >
        {/* Brief Summary */}
        {trial.briefSummary && (
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{trial.briefSummary}</p>
        )}

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <StatCard label="NCT ID" value={trial.nctId} />
          <StatCard label="Status" value={trial.status} />
          <StatCard label="Enrollment" value={trial.enrollment.toLocaleString()} />
          <StatCard label="Sites" value={trial.locationCount} />
        </div>

        {/* Design Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {trial.phase && <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">{trial.phase}</span>}
          {trial.studyType && <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">{trial.studyType}</span>}
          {trial.primaryPurpose && <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{trial.primaryPurpose}</span>}
          {trial.interventionModel && <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{trial.interventionModel}</span>}
        </div>

        {/* Design Details */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Allocation</p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{trial.allocation || "Not specified"}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Masking</p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{trial.masking || "Not specified"}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Results Posted</p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{trial.hasResults ? "Yes" : "No"}</p>
          </div>
        </div>
      </WalkthroughSection>

      {/* Collapsible: Interventions */}
      {trial.interventions && trial.interventions.length > 0 && (
        <CollapsibleSection title={`Interventions (${trial.interventions.length})`}>
          <div className="divide-y divide-slate-100 dark:divide-slate-700 -my-4 -mx-6 px-6">
            {trial.interventions.map((intervention, i) => (
              <div key={i} className="py-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-50">{intervention.name}</span>
                  <span className="px-1.5 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded">{intervention.type}</span>
                </div>
                {intervention.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">{intervention.description}</p>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Collapsible: Outcomes */}
      {(trial.primaryOutcomes?.length > 0 || trial.secondaryOutcomes?.length > 0) && (
        <CollapsibleSection title={`Outcomes (${(trial.primaryOutcomes?.length || 0) + (trial.secondaryOutcomes?.length || 0)})`}>
          <div className="-my-4 -mx-6">
            {trial.primaryOutcomes?.length > 0 && (
              <>
                <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Primary Outcomes</h4>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {trial.primaryOutcomes.map((outcome, i) => (
                    <div key={i} className="px-6 py-3">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{outcome.measure}</p>
                      {outcome.timeFrame && <p className="text-xs text-slate-500 dark:text-slate-400">Measured at: {outcome.timeFrame}</p>}
                    </div>
                  ))}
                </div>
              </>
            )}
            {trial.secondaryOutcomes?.length > 0 && (
              <>
                <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Secondary Outcomes</h4>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {trial.secondaryOutcomes.map((outcome, i) => (
                    <div key={i} className="px-6 py-3">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{outcome.measure}</p>
                      {outcome.timeFrame && <p className="text-xs text-slate-500 dark:text-slate-400">Measured at: {outcome.timeFrame}</p>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </CollapsibleSection>
      )}

      {/* Collapsible: Eligibility */}
      <CollapsibleSection title="Eligibility">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Age</p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
              {trial.minimumAge || "N/A"} - {trial.maximumAge || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Sex</p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{trial.sex || "All"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Healthy Volunteers</p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">No</p>
          </div>
        </div>
        {trial.eligibilityCriteria && (
          <details className="group">
            <summary className="text-sm text-primary cursor-pointer hover:underline">Show full eligibility criteria</summary>
            <pre className="mt-3 text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap font-sans">{trial.eligibilityCriteria}</pre>
          </details>
        )}
      </CollapsibleSection>

      {/* Section 2: Publication & Reporting */}
      <WalkthroughSection title="Publication & Reporting">
        <FlagSection
          title="Publication Concerns"
          flags={analysis.publicationConcerns}
          badge={<RegulatoryBadge type="fda" text="FDAAA 801" />}
        />
        <RegulatoryNote>
          Flags based on results posting status, timing, and outcome reporting completeness.
        </RegulatoryNote>
      </WalkthroughSection>

      {/* Section 3: Methodology */}
      <WalkthroughSection title="Methodology">
        <FlagSection
          title="Methodological Limitations"
          flags={analysis.methodologicalLimitations}
          badge={<RegulatoryBadge type="cochrane" text="Risk of Bias" />}
        />
        <RegulatoryNote>
          Design factors affecting internal validity: randomization and blinding adequacy.
        </RegulatoryNote>
      </WalkthroughSection>

      {/* Section 4: Generalizability */}
      <WalkthroughSection title="Generalizability">
        <FlagSection
          title="Generalizability Notes"
          flags={analysis.generalizabilityNotes}
        />
        <RegulatoryNote>
          Factors affecting how broadly results apply: sample size, sites, demographics, eligibility.
        </RegulatoryNote>
      </WalkthroughSection>

      {/* Section 5: Recommendations */}
      {analysis.recommendations.length > 0 && (
        <WalkthroughSection title="Recommendations">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
            <ul className="space-y-3">
              {analysis.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </WalkthroughSection>
      )}

      {/* Section 6: What's Missing - Key differentiator */}
      <WalkthroughSection title="What&rsquo;s Missing?">
        <div id="whats-missing" className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white">
          <p className="text-sm text-slate-300 mb-6">
            Registry metadata reveals trial design concerns, but patient-level data exposes the actual impact
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
