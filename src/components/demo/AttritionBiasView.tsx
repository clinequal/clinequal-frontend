"use client";

import {
  depressionTrialMetadata,
  depressionTrialStats,
  depressionTrialAttritionBias,
  depressionTrialInsight,
  depressionTrialSample,
  depressionTrialContext,
  depressionTrialRadarAxes,
  depressionTrialActiveBiases,
  depressionTrialInteractions,
  depressionTrialProspective,
  trialStages,
} from "@/lib/demo";
import { ScrollReveal, WalkthroughSection } from "./ScrollReveal";
import { DataTable } from "./DataTable";
import { PatientJourney } from "./PatientJourney";
import { StatCard } from "./StatCard";
import { BarChart } from "./BarChart";
import { BusinessImpact } from "./BusinessImpact";
import { DemoCTA } from "./DemoCTA";
import { RegulatoryBadge, RegulatoryNote } from "./RegulatoryBadge";
import { RadarChart } from "./RadarChart";
import { BiasTimeline } from "./BiasTimeline";
import { BiasInteractions } from "./BiasInteractions";
import { ProspectiveTimeline } from "./ProspectiveTimeline";

interface AttritionBiasViewProps {
  onBack: () => void;
}

// Table data from sample
const tableData = depressionTrialSample.map((p) => ({
  id: p.id,
  age: p.age,
  gender: p.gender,
  income: p.incomeLevel,
  status: p.completed ? "Completed" : "Discontinued",
  outcome: p.completed ? (p.remission ? "Remission" : "No Remission") : "—",
}));

// Patient journey data with deterministic weeks
const journeyPatients = depressionTrialSample.map((p, i) => ({
  id: p.id,
  incomeLevel: p.incomeLevel,
  weeksInStudy: p.completed ? 12 : [2, 3, 4, 5, 6, 7, 8][i % 7],
  completed: p.completed,
}));

export function AttritionBiasView({ onBack }: AttritionBiasViewProps) {
  const stats = depressionTrialStats;
  const insight = depressionTrialInsight;
  const context = depressionTrialContext;

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
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            {depressionTrialMetadata.name}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{context.indication}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-full">
            Attrition Bias Detected
          </span>
          <span className="text-xs text-slate-400">{context.phase} • {context.therapeuticArea}</span>
        </div>
      </div>

      {/* Section 1: Trial Overview */}
      <WalkthroughSection
        title="Trial Overview"
        subtitle={depressionTrialMetadata.description}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Patients Enrolled" value={stats.totalPatients} />
          <StatCard label="Sites" value={context.sites} subtext={context.countries.join(", ")} />
          <StatCard label="Duration" value="12 weeks" subtext={context.primaryEndpoint} />
          <StatCard label="Regulatory Target" value={context.regulatoryTarget} />
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
          Review patient disposition and outcomes:
        </p>

        <DataTable
          columns={[
            { key: "id", label: "Subject ID" },
            { key: "age", label: "Age" },
            { key: "gender", label: "Sex" },
            { key: "income", label: "SES", highlight: true },
            { key: "status", label: "Disposition", highlight: true },
            { key: "outcome", label: "Primary Endpoint" },
          ]}
          data={tableData}
          highlightColumn="status"
          highlightValues={{
            Completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
            Discontinued: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
          }}
          maxRows={10}
        />
      </WalkthroughSection>

      {/* Section 2: Patient Journeys */}
      <WalkthroughSection
        title="Patient Disposition Over Time"
        subtitle="Visualize when and which patients discontinue the study."
      >
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <PatientJourney patients={journeyPatients} maxWeeks={12} />
        </div>

        <ScrollReveal delay={400} className="mt-4">
          <RegulatoryNote>
            ICH E9 Guidelines require sensitivity analyses to assess the impact of missing data
            and discontinuations on primary efficacy conclusions.
          </RegulatoryNote>
        </ScrollReveal>
      </WalkthroughSection>

      {/* Section 3: Differential Attrition */}
      <WalkthroughSection
        title="Differential Attrition Analysis"
        subtitle="Dropout rates vary significantly across socioeconomic subgroups."
      >
        <div className="flex flex-wrap gap-2 mb-4">
          <RegulatoryBadge type="ich" text="E9(R1) estimands framework" />
          <RegulatoryBadge type="cochrane" text="High risk - attrition bias" />
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <BarChart
            data={[
              { label: "Low SES", value: stats.byIncomeLevel.low.dropoutRate, color: "#ef4444" },
              { label: "Middle SES", value: stats.byIncomeLevel.middle.dropoutRate, color: "#f59e0b" },
              { label: "High SES", value: stats.byIncomeLevel.high.dropoutRate, color: "#22c55e" },
            ]}
            maxValue={60}
          />
        </div>

        <ScrollReveal delay={300} className="mt-6">
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-5">
            <div className="flex gap-3">
              <div className="shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-purple-900 dark:text-purple-200 font-medium">
                  Low-SES patients discontinue at ~5x the rate of high-SES patients.
                </p>
                <p className="text-purple-800 dark:text-purple-300 text-sm mt-1">
                  This non-random attrition introduces systematic bias that inflates apparent treatment efficacy.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </WalkthroughSection>

      {/* Section 4: Efficacy Impact */}
      <WalkthroughSection
        title="Impact on Efficacy Conclusions"
        subtitle="How differential attrition inflates reported treatment effectiveness."
      >
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Completers Only */}
            <div className="text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Completers Analysis</div>
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-green-100 dark:bg-green-900/30 mb-3">
                <span className="text-4xl font-bold text-green-700 dark:text-green-400">
                  {insight.reportedRate.toFixed(0)}%
                </span>
              </div>
              <div className="text-slate-700 dark:text-slate-200 font-medium">Remission Rate</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {stats.remissionRates.completersOnly.remitted}/{stats.remissionRates.completersOnly.total} patients
              </div>
            </div>

            {/* ITT */}
            <div className="text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Intention-to-Treat</div>
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-3">
                <span className="text-4xl font-bold text-amber-700 dark:text-amber-400">
                  {insight.actualRate.toFixed(0)}%
                </span>
              </div>
              <div className="text-slate-700 dark:text-slate-200 font-medium">Remission Rate</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {stats.remissionRates.intentionToTreat.remitted}/{stats.remissionRates.intentionToTreat.total} patients
              </div>
            </div>
          </div>
        </div>

        <ScrollReveal delay={300} className="mt-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5">
            <h4 className="font-medium text-red-900 dark:text-red-200 mb-2">
              {stats.remissionRates.difference.toFixed(0)} percentage point efficacy inflation
            </h4>
            <p className="text-red-800 dark:text-red-300 text-sm">
              {insight.implication}
            </p>
            <p className="text-red-700 dark:text-red-400 text-xs mt-2">
              FDA reviewers routinely request ITT analyses and sensitivity analyses for missing data.
              Unexplained discrepancies between completer and ITT results raise regulatory concerns.
            </p>
          </div>
        </ScrollReveal>
      </WalkthroughSection>

      {/* Section 5: Trial vs Peer Comparison */}
      <WalkthroughSection
        title="Trial vs Peer Comparison"
        subtitle="How does this trial compare to the average MDD Phase II/III trial?"
      >
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <RadarChart
            axes={depressionTrialRadarAxes}
            trialLabel="This Trial"
            benchmarkLabel="Peer MDD Trial Avg"
          />
        </div>
      </WalkthroughSection>

      {/* Section 6: Where Bias Enters */}
      <WalkthroughSection
        title="Where Bias Enters the Trial"
        subtitle="Mapping detected biases to the trial lifecycle."
      >
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <BiasTimeline
            stages={trialStages}
            activeHighlights={depressionTrialActiveBiases}
            accentColor="purple"
          />
        </div>

        <ScrollReveal delay={200} className="mt-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
            <h4 className="font-medium text-slate-900 dark:text-slate-50 mb-4">How This Bias Cascades</h4>
            <BiasInteractions
              interactions={depressionTrialInteractions}
              accentColor="purple"
            />
          </div>
        </ScrollReveal>
      </WalkthroughSection>

      {/* Section 7: Early Detection Advantage */}
      <WalkthroughSection
        title="Early Detection Advantage"
        subtitle="Clinequal's prospective monitoring catches attrition bias during the trial, not at review."
      >
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <ProspectiveTimeline milestones={depressionTrialProspective} />
        </div>
      </WalkthroughSection>

      {/* Section 8: Business Impact */}
      <WalkthroughSection
        title="Business Impact Assessment"
        subtitle="The cost of discovering attrition bias at submission."
      >
        <BusinessImpact
          riskLevel="high"
          riskDescription="FDA may issue Complete Response Letter requesting additional analyses or new studies in underrepresented populations."
          costRange="$5M - $15M"
          costDescription="Post-hoc analyses, advisory committee prep, potential bridging studies"
          detectionPoint="Week 6"
          detectionComparison="vs. discovered during FDA review (12-18 months delay)"
          regulatoryNote="The STAR*D trial's initial 67% remission rate was revised to 35% after ITT reanalysis — a difference that reshaped clinical guidelines. Early detection prevents such revisions."
          prospectiveNote="With Clinequal's prospective monitoring, differential attrition would be flagged at Week 6 — allowing mid-trial interventions like retention programs for at-risk subgroups, rather than discovering the bias during FDA review."
        />
      </WalkthroughSection>

      {/* Section 6: Detailed Analysis */}
      <WalkthroughSection
        title="Subgroup Analysis"
        subtitle="Efficacy estimates by socioeconomic stratum."
      >
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Subgroup</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">N</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Completed</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Attrition</th>
                <th className="text-right py-3 px-4 font-medium text-green-600 dark:text-green-400">Completers</th>
                <th className="text-right py-3 px-4 font-medium text-amber-600 dark:text-amber-400">ITT</th>
              </tr>
            </thead>
            <tbody>
              {depressionTrialAttritionBias.map((row) => (
                <tr key={row.group} className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-50">{row.group}</td>
                  <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-300">{row.totalPatients}</td>
                  <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-300">{row.completedPatients}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${
                      row.dropoutRate > 30 ? "text-red-600 dark:text-red-400" :
                      row.dropoutRate > 15 ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"
                    }`}>
                      {row.dropoutRate.toFixed(0)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-green-600 dark:text-green-400">
                    {row.remissionRateCompleters.toFixed(0)}%
                  </td>
                  <td className="py-3 px-4 text-right text-amber-600 dark:text-amber-400 font-medium">
                    {row.remissionRateITT.toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
          <strong>ITT (Intention-to-Treat):</strong> Conservative estimate treating all discontinuations
          as treatment failures. Required by FDA for primary efficacy analysis per ICH E9 guidelines.
        </p>
      </WalkthroughSection>

      {/* Section 7: Summary */}
      <WalkthroughSection title="Bias Assessment Summary">
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Clinequal Analysis</h4>
            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">High Risk</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">
                {stats.droppedPatients}
              </div>
              <div className="text-slate-400 text-sm mt-1">
                Patients discontinued
              </div>
              <div className="text-xs text-slate-500 mt-2">
                {stats.overallDropoutRate.toFixed(0)}% attrition rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">
                {stats.remissionRates.difference.toFixed(0)}pp
              </div>
              <div className="text-slate-400 text-sm mt-1">
                Efficacy inflation
              </div>
              <div className="text-xs text-slate-500 mt-2">
                completer vs. ITT gap
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                ~5x
              </div>
              <div className="text-slate-400 text-sm mt-1">
                Differential attrition
              </div>
              <div className="text-xs text-slate-500 mt-2">
                low vs. high SES
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
            <p className="text-slate-400 text-xs">
              <strong className="text-slate-300">Data source:</strong> {depressionTrialMetadata.source}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              Cochrane RoB: Attrition Bias
            </div>
          </div>
        </div>
      </WalkthroughSection>

      {/* CTA Section */}
      <WalkthroughSection>
        <DemoCTA />
      </WalkthroughSection>
    </div>
  );
}
