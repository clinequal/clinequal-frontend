"use client";

import {
  heartDiseaseMetadata,
  heartDiseaseStats,
  heartDiseaseDemographicBias,
  heartDiseaseInsight,
  heartDiseaseSample,
  heartDiseaseTrialContext,
  heartDiseaseRadarAxes,
  heartDiseaseActiveBiases,
  heartDiseaseInteractions,
  heartDiseaseProspective,
  trialStages,
} from "@/lib/demo";
import { ScrollReveal, WalkthroughSection } from "./ScrollReveal";
import { DataTable } from "./DataTable";
import { PatientGrid } from "./PatientGrid";
import { StatCard } from "./StatCard";
import { ComparisonChart } from "./ComparisonChart";
import { BusinessImpact } from "./BusinessImpact";
import { DemoCTA } from "./DemoCTA";
import { RegulatoryBadge, RegulatoryNote } from "./RegulatoryBadge";
import { RadarChart } from "./RadarChart";
import { BiasTimeline } from "./BiasTimeline";
import { BiasInteractions } from "./BiasInteractions";
import { ProspectiveTimeline } from "./ProspectiveTimeline";

interface DemographicBiasViewProps {
  onBack: () => void;
}

// Extended sample data for the table
const tableData = heartDiseaseSample.map((p) => ({
  id: `PT-${String(p.id).padStart(3, "0")}`,
  age: p.age,
  sex: p.sex,
  outcome: p.hasHeartDisease ? "Event" : "No Event",
}));

export function DemographicBiasView({ onBack }: DemographicBiasViewProps) {
  const stats = heartDiseaseStats;
  const insight = heartDiseaseInsight;
  const context = heartDiseaseTrialContext;

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
            {heartDiseaseMetadata.name}
          </h1>
          <p className="text-sm text-slate-500">{context.indication}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
            Demographic Bias Detected
          </span>
          <span className="text-xs text-slate-400">{context.phase} • {context.therapeuticArea}</span>
        </div>
      </div>

      {/* Section 1: Trial Overview */}
      <WalkthroughSection
        title="Trial Overview"
        subtitle={heartDiseaseMetadata.description}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Patients Enrolled" value={stats.totalPatients.toLocaleString()} />
          <StatCard label="Sites" value={context.sites} subtext={context.countries.join(", ")} />
          <StatCard label="Enrollment Period" value={context.enrollmentPeriod} />
          <StatCard label="Regulatory Target" value={context.regulatoryTarget} />
        </div>

        <p className="text-slate-600 text-sm mb-4">
          Review a sample of the enrolled patient population:
        </p>

        <DataTable
          columns={[
            { key: "id", label: "Patient ID" },
            { key: "age", label: "Age" },
            { key: "sex", label: "Sex", highlight: true },
            { key: "outcome", label: "Primary Endpoint" },
          ]}
          data={tableData}
          highlightColumn="sex"
          highlightValues={{
            Male: "bg-sky-100 text-sky-700",
            Female: "bg-pink-100 text-pink-700",
          }}
          maxRows={10}
        />
      </WalkthroughSection>

      {/* Section 2: Visualize the Population */}
      <WalkthroughSection
        title="Population Visualization"
        subtitle="Each dot represents one enrolled patient."
      >
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <PatientGrid
            maleCount={stats.genderDistribution.male.count}
            femaleCount={stats.genderDistribution.female.count}
            animateOnView={true}
          />
        </div>

        <ScrollReveal delay={200} className="mt-4">
          <RegulatoryNote>
            FDA Guidance (2020) requires sponsors to report demographic subgroups and explain any imbalances
            relative to disease epidemiology.
          </RegulatoryNote>
        </ScrollReveal>
      </WalkthroughSection>

      {/* Section 3: The Gap */}
      <WalkthroughSection
        title="Enrollment vs. Disease Epidemiology"
        subtitle="How does trial enrollment compare to who actually has the disease?"
      >
        <div className="flex flex-wrap gap-2 mb-4">
          <RegulatoryBadge type="fda" text="Demographic subgroup reporting required" />
          <RegulatoryBadge type="ema" text="Guideline on subgroup analysis" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <ComparisonChart
            data={[
              {
                label: "Male",
                trial: stats.genderDistribution.male.percentage,
                epidemiological: stats.benchmarks.epidemiological.values.male,
                peerTrial: stats.benchmarks.peerTrial.values.male,
              },
              {
                label: "Female",
                trial: stats.genderDistribution.female.percentage,
                epidemiological: stats.benchmarks.epidemiological.values.female,
                peerTrial: stats.benchmarks.peerTrial.values.female,
              },
            ]}
            trialLabel="This Trial"
            epidemiologicalLabel="Disease Prevalence (GBD)"
            peerTrialLabel="CV Trial Average"
          />

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
            <p className="text-xs text-slate-400">
              <strong className="text-slate-500">Disease prevalence:</strong>{" "}
              {stats.benchmarks.epidemiological.source.citation}
            </p>
            <p className="text-xs text-slate-400">
              <strong className="text-slate-500">Peer trial average:</strong>{" "}
              {stats.benchmarks.peerTrial.source.citation}
            </p>
          </div>
        </div>

        <ScrollReveal delay={300} className="mt-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex gap-3">
              <div className="shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-amber-900 font-medium">
                  {insight.headline}
                </p>
                <p className="text-amber-800 text-sm mt-1">
                  {insight.detail}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </WalkthroughSection>

      {/* Section 4: Clinical Implications */}
      <WalkthroughSection
        title="Clinical & Scientific Impact"
        subtitle="What this imbalance means for your trial conclusions."
      >
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="font-medium text-slate-900 mb-3">Endpoint Rates by Sex</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-sky-600">
                  {stats.heartDiseaseByGender.male.rate.toFixed(0)}%
                </div>
                <div className="text-sm text-slate-600 mt-1">Male event rate</div>
                <div className="text-xs text-slate-400">n={stats.heartDiseaseByGender.male.total}</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-pink-600">
                  {stats.heartDiseaseByGender.female.rate.toFixed(0)}%
                </div>
                <div className="text-sm text-slate-600 mt-1">Female event rate</div>
                <div className="text-xs text-slate-400">n={stats.heartDiseaseByGender.female.total}</div>
              </div>
            </div>
          </div>

          <ScrollReveal delay={200}>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h4 className="font-medium text-red-900 mb-2">Generalizability Risk</h4>
              <p className="text-red-800 text-sm">
                {insight.implication}
              </p>
              <p className="text-red-700 text-xs mt-2">
                Regulators may require label restrictions or post-marketing studies to address this gap.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </WalkthroughSection>

      {/* Section 5: Trial vs Peer Comparison */}
      <WalkthroughSection
        title="Trial vs Peer Comparison"
        subtitle="How does this trial compare to the average cardiovascular Phase III trial?"
      >
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <RadarChart
            axes={heartDiseaseRadarAxes}
            trialLabel="This Trial"
            benchmarkLabel="Peer CV Trial Avg"
          />
        </div>
      </WalkthroughSection>

      {/* Section 6: Where Bias Enters */}
      <WalkthroughSection
        title="Where Bias Enters the Trial"
        subtitle="Mapping detected biases to the trial lifecycle."
      >
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <BiasTimeline
            stages={trialStages}
            activeHighlights={heartDiseaseActiveBiases}
            accentColor="amber"
          />
        </div>

        <ScrollReveal delay={200} className="mt-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="font-medium text-slate-900 mb-4">How This Bias Cascades</h4>
            <BiasInteractions
              interactions={heartDiseaseInteractions}
              accentColor="amber"
            />
          </div>
        </ScrollReveal>
      </WalkthroughSection>

      {/* Section 7: Early Detection Advantage */}
      <WalkthroughSection
        title="Early Detection Advantage"
        subtitle="Clinequal's prospective monitoring catches bias during enrollment, not at submission."
      >
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <ProspectiveTimeline milestones={heartDiseaseProspective} />
        </div>
      </WalkthroughSection>

      {/* Section 8: Business Impact */}
      <WalkthroughSection
        title="Business Impact Assessment"
        subtitle="The cost of discovering this issue late in development."
      >
        <BusinessImpact
          riskLevel="high"
          riskDescription="FDA/EMA may require post-hoc subgroup analysis or label restrictions limiting approved population."
          costRange="$2M - $8M"
          costDescription="Protocol amendment + extended enrollment to balance demographics"
          detectionPoint="Week 4"
          detectionComparison="vs. discovered at NDA/MAA submission"
          regulatoryNote="In 2023, EMA flagged 23% of submissions for inadequate demographic representation. Early detection enables protocol amendments during enrollment."
          prospectiveNote="With Clinequal's prospective monitoring, this imbalance would be flagged at Week 4 of enrollment — enabling a protocol amendment before recruitment closes, rather than a costly post-submission response."
        />
      </WalkthroughSection>

      {/* Section 6: Summary */}
      <WalkthroughSection title="Bias Assessment Summary">
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Clinequal Analysis</h4>
            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">High Risk</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {heartDiseaseDemographicBias.map((row) => (
              <div key={row.category} className="text-center">
                <div className="text-3xl font-bold">
                  {row.representationRatio.toFixed(2)}x
                </div>
                <div className="text-slate-400 text-sm mt-1">
                  {row.category} representation
                </div>
                <div className={`text-xs mt-2 ${
                  row.representationRatio < 1 ? "text-red-400" : "text-amber-400"
                }`}>
                  {row.representationRatio < 1 ? "Underrepresented" : "Overrepresented"}
                </div>
              </div>
            ))}
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {Math.abs(heartDiseaseDemographicBias[1].absoluteGap).toFixed(0)}pp
              </div>
              <div className="text-slate-400 text-sm mt-1">
                Gap from epidemiology
              </div>
              <div className="text-xs text-slate-500 mt-2">
                percentage points
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
            <p className="text-slate-400 text-xs">
              <strong className="text-slate-300">Data source:</strong> {heartDiseaseMetadata.source}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Cochrane RoB: Selection Bias
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
