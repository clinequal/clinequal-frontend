"use client";

import {
  depressionTrialMetadata,
  depressionTrialStats,
  depressionTrialAttritionBias,
  depressionTrialInsight,
  depressionTrialSample,
} from "@/lib/demo";
import { ScrollReveal, WalkthroughSection } from "./ScrollReveal";
import { DataTable } from "./DataTable";
import { PatientJourney } from "./PatientJourney";
import { StatCard } from "./StatCard";
import { BarChart } from "./BarChart";

interface AttritionBiasViewProps {
  onBack: () => void;
}

// Table data from sample
const tableData = depressionTrialSample.map((p) => ({
  id: p.id,
  age: p.age,
  gender: p.gender,
  income: p.incomeLevel,
  completed: p.completed ? "Yes" : "Dropped",
  remission: p.remission ? "Yes" : "No",
}));

// Patient journey data
const journeyPatients = depressionTrialSample.map((p) => ({
  id: p.id,
  incomeLevel: p.incomeLevel,
  weeksInStudy: p.completed ? 12 : Math.floor(Math.random() * 8) + 2,
  completed: p.completed,
}));

export function AttritionBiasView({ onBack }: AttritionBiasViewProps) {
  const stats = depressionTrialStats;
  const insight = depressionTrialInsight;

  return (
    <div className="space-y-4">
      {/* Header - Always visible */}
      <div className="flex items-start justify-between sticky top-0 bg-white/95 backdrop-blur-sm py-4 -mx-4 px-4 z-10 border-b border-slate-100">
        <div>
          <button
            onClick={onBack}
            className="text-sm text-slate-500 hover:text-primary mb-1 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-xl font-bold text-slate-900">
            {depressionTrialMetadata.name}
          </h1>
        </div>
        <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
          Attrition Bias
        </span>
      </div>

      {/* Section 1: Meet the Data */}
      <WalkthroughSection
        title="The Trial"
        subtitle="A 12-week depression treatment study with 200 enrolled patients."
      >
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <StatCard label="Enrolled" value={stats.totalPatients} />
          <StatCard label="Duration" value="12 weeks" />
          <StatCard label="Primary Outcome" value="Remission" subtext="Depression score improvement" />
        </div>

        <p className="text-slate-600 text-sm mb-4">
          This synthetic dataset mirrors patterns from the STAR*D trial, one of the largest
          depression treatment studies ever conducted. Here&apos;s a sample:
        </p>

        <DataTable
          columns={[
            { key: "id", label: "ID" },
            { key: "age", label: "Age" },
            { key: "gender", label: "Gender" },
            { key: "income", label: "Income", highlight: true },
            { key: "completed", label: "Status", highlight: true },
            { key: "remission", label: "Remission" },
          ]}
          data={tableData}
          highlightColumn="completed"
          highlightValues={{
            Yes: "bg-green-100 text-green-700",
            Dropped: "bg-red-100 text-red-700",
          }}
          maxRows={10}
        />
      </WalkthroughSection>

      {/* Section 2: Watch Who Leaves */}
      <WalkthroughSection
        title="Who Completes the Study?"
        subtitle="Watch each patient's journey through the 12-week trial."
      >
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <PatientJourney patients={journeyPatients} maxWeeks={12} />
        </div>

        <ScrollReveal delay={400} className="mt-4">
          <p className="text-sm text-slate-500 text-center">
            Notice how dropouts cluster among low-income patients (red lines).
          </p>
        </ScrollReveal>
      </WalkthroughSection>

      {/* Section 3: The Pattern */}
      <WalkthroughSection
        title="Dropout by Income Level"
        subtitle="The attrition is not random — it follows a clear pattern."
      >
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <BarChart
            data={[
              { label: "Low Income", value: stats.byIncomeLevel.low.dropoutRate, color: "#ef4444" },
              { label: "Middle Income", value: stats.byIncomeLevel.middle.dropoutRate, color: "#f59e0b" },
              { label: "High Income", value: stats.byIncomeLevel.high.dropoutRate, color: "#22c55e" },
            ]}
            maxValue={60}
          />
        </div>

        <ScrollReveal delay={300} className="mt-6">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
            <div className="flex gap-3">
              <div className="shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-purple-900 font-medium">
                  Low-income patients drop out at nearly 5x the rate of high-income patients.
                </p>
                <p className="text-purple-800 text-sm mt-1">
                  48% vs ~0% — this differential attrition will distort the study&apos;s conclusions.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </WalkthroughSection>

      {/* Section 4: The Hidden Effect */}
      <WalkthroughSection
        title="The Hidden Effect"
        subtitle="How dropout patterns inflate reported effectiveness."
      >
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Completers Only */}
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-2">If we only count completers...</div>
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-green-100 mb-3">
                <span className="text-4xl font-bold text-green-700">
                  {insight.reportedRate.toFixed(0)}%
                </span>
              </div>
              <div className="text-slate-700 font-medium">Remission Rate</div>
              <div className="text-sm text-slate-500 mt-1">
                {stats.remissionRates.completersOnly.remitted} of {stats.remissionRates.completersOnly.total}
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-xs text-slate-400 mt-1">vs.</span>
              </div>
            </div>

            {/* ITT */}
            <div className="text-center md:col-start-2">
              <div className="text-sm text-slate-500 mb-2">If we count everyone enrolled...</div>
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-amber-100 mb-3">
                <span className="text-4xl font-bold text-amber-700">
                  {insight.actualRate.toFixed(0)}%
                </span>
              </div>
              <div className="text-slate-700 font-medium">Remission Rate (ITT)</div>
              <div className="text-sm text-slate-500 mt-1">
                {stats.remissionRates.intentionToTreat.remitted} of {stats.remissionRates.intentionToTreat.total}
              </div>
            </div>
          </div>
        </div>

        <ScrollReveal delay={300} className="mt-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h4 className="font-medium text-red-900 mb-2">
              A {stats.remissionRates.difference.toFixed(0)} percentage point gap
            </h4>
            <p className="text-red-800 text-sm">
              The &quot;completers only&quot; analysis makes the treatment appear {((insight.inflationFactor - 1) * 100).toFixed(0)}% more effective
              than it actually is. Patients who struggle most with treatment — often those with fewer resources —
              simply disappear from the analysis.
            </p>
          </div>
        </ScrollReveal>
      </WalkthroughSection>

      {/* Section 5: Detailed Breakdown */}
      <WalkthroughSection
        title="By the Numbers"
        subtitle="How attrition affects each income group differently."
      >
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Group</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600">Enrolled</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600">Completed</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600">Dropout</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600">
                  <span className="text-green-600">Completers</span>
                </th>
                <th className="text-right py-3 px-4 font-medium text-slate-600">
                  <span className="text-amber-600">ITT</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {depressionTrialAttritionBias.map((row) => (
                <tr key={row.group} className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium">{row.group}</td>
                  <td className="py-3 px-4 text-right">{row.totalPatients}</td>
                  <td className="py-3 px-4 text-right">{row.completedPatients}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${
                      row.dropoutRate > 30 ? "text-red-600" :
                      row.dropoutRate > 15 ? "text-amber-600" : "text-green-600"
                    }`}>
                      {row.dropoutRate.toFixed(0)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-green-600">
                    {row.remissionRateCompleters.toFixed(0)}%
                  </td>
                  <td className="py-3 px-4 text-right text-amber-600 font-medium">
                    {row.remissionRateITT.toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-500 mt-4">
          <strong>ITT (Intention-to-Treat):</strong> Counts all enrolled patients, treating dropouts as treatment failures.
          This is the more conservative and realistic estimate of real-world effectiveness.
        </p>
      </WalkthroughSection>

      {/* Section 6: Summary */}
      <WalkthroughSection title="Summary">
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">
                {stats.droppedPatients}
              </div>
              <div className="text-slate-400 text-sm mt-1">
                Patients lost to follow-up
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">
                {stats.remissionRates.difference.toFixed(0)}pp
              </div>
              <div className="text-slate-400 text-sm mt-1">
                Effectiveness inflation
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                ~5x
              </div>
              <div className="text-slate-400 text-sm mt-1">
                Dropout disparity (low vs high income)
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4">
            <p className="text-slate-300 text-sm mb-2">
              <strong className="text-white">The takeaway:</strong> {insight.implication}
            </p>
            <p className="text-slate-400 text-xs">
              <strong>Source:</strong> {depressionTrialMetadata.citation}
            </p>
          </div>
        </div>
      </WalkthroughSection>

      {/* Scroll indicator */}
      <div className="text-center py-8 text-slate-400 text-sm">
        — End of analysis —
      </div>
    </div>
  );
}
