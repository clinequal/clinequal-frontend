"use client";

import {
  heartDiseaseMetadata,
  heartDiseaseStats,
  heartDiseaseDemographicBias,
  heartDiseaseInsight,
  heartDiseaseSample,
} from "@/lib/demo";
import { ScrollReveal, WalkthroughSection } from "./ScrollReveal";
import { DataTable } from "./DataTable";
import { PatientGrid } from "./PatientGrid";
import { StatCard } from "./StatCard";
import { ComparisonChart } from "./ComparisonChart";

interface DemographicBiasViewProps {
  onBack: () => void;
}

// Extended sample data for the table
const tableData = heartDiseaseSample.map((p) => ({
  id: p.id,
  age: p.age,
  sex: p.sex,
  heartDisease: p.hasHeartDisease ? "Yes" : "No",
}));

export function DemographicBiasView({ onBack }: DemographicBiasViewProps) {
  const stats = heartDiseaseStats;
  const insight = heartDiseaseInsight;

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
        </div>
        <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
          Demographic Bias
        </span>
      </div>

      {/* Section 1: Meet the Data */}
      <WalkthroughSection
        title="The Dataset"
        subtitle="920 patients from the UCI Heart Disease study across four hospitals."
      >
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <StatCard label="Patients" value={stats.totalPatients.toLocaleString()} />
          <StatCard label="Variables" value="14" subtext="Demographics + clinical" />
          <StatCard label="Source" value="UCI ML Repository" />
        </div>

        <p className="text-slate-600 text-sm mb-4">
          This dataset is commonly used to train algorithms that predict heart disease risk.
          Take a look at a sample of the data:
        </p>

        <DataTable
          columns={[
            { key: "id", label: "ID" },
            { key: "age", label: "Age" },
            { key: "sex", label: "Sex", highlight: true },
            { key: "heartDisease", label: "Heart Disease" },
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
        title="Who's in the Study?"
        subtitle="Each dot represents one patient. Watch the gender distribution reveal itself."
      >
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <PatientGrid
            maleCount={stats.genderDistribution.male.count}
            femaleCount={stats.genderDistribution.female.count}
            animateOnView={true}
          />
        </div>
      </WalkthroughSection>

      {/* Section 3: The Comparison */}
      <WalkthroughSection
        title="Trial vs. Reality"
        subtitle="How does this compare to the general population?"
      >
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <ComparisonChart
            data={[
              {
                label: "Male",
                trial: stats.genderDistribution.male.percentage,
                population: stats.populationBaseline.male.percentage,
              },
              {
                label: "Female",
                trial: stats.genderDistribution.female.percentage,
                population: stats.populationBaseline.female.percentage,
              },
            ]}
            trialLabel="In Dataset"
            populationLabel="Expected (General Population)"
          />
        </div>

        <ScrollReveal delay={300} className="mt-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex gap-3">
              <div className="shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-amber-900 font-medium">
                  Women make up 50% of the population but only 21% of this dataset.
                </p>
                <p className="text-amber-800 text-sm mt-1">
                  That&apos;s a 29 percentage point gap — women are underrepresented by 58%.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </WalkthroughSection>

      {/* Section 4: Why It Matters */}
      <WalkthroughSection
        title="Why This Matters"
        subtitle="The clinical implications of this imbalance."
      >
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="font-medium text-slate-900 mb-3">Disease Rates in This Dataset</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-sky-600">
                  {stats.heartDiseaseByGender.male.rate.toFixed(0)}%
                </div>
                <div className="text-sm text-slate-600 mt-1">of men have heart disease</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-pink-600">
                  {stats.heartDiseaseByGender.female.rate.toFixed(0)}%
                </div>
                <div className="text-sm text-slate-600 mt-1">of women have heart disease</div>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              The apparent difference may reflect sampling bias rather than true clinical differences.
              With so few women, the model learns primarily from male patients.
            </p>
          </div>

          <ScrollReveal delay={200}>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h4 className="font-medium text-red-900 mb-2">The Problem</h4>
              <p className="text-red-800 text-sm">
                {insight.implication}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </WalkthroughSection>

      {/* Section 5: Summary */}
      <WalkthroughSection title="Summary">
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {heartDiseaseDemographicBias.map((row) => (
              <div key={row.category} className="text-center">
                <div className="text-3xl font-bold">
                  {row.representationRatio.toFixed(2)}x
                </div>
                <div className="text-slate-400 text-sm mt-1">
                  {row.category} representation ratio
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
                29pp
              </div>
              <div className="text-slate-400 text-sm mt-1">
                Gap from expected
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4">
            <p className="text-slate-300 text-sm">
              <strong className="text-white">Source:</strong> {heartDiseaseMetadata.citation}
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
