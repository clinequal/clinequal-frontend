// ============================================================
// MOCK DATA - ClinicalTrials.gov Metadata Analysis Example
// TODO: Replace with live backend API responses when available.
// This file exists purely for frontend visualization purposes.
// ============================================================

export type RiskLevel = "HIGH" | "MEDIUM" | "LOW" | "NONE";

export interface BiasIndicator {
  name: string;
  detected: boolean;
  riskLevel: RiskLevel;
  explanation: string;
  details?: string;
}

export interface MetadataTrialInfo {
  nctId: string;
  title: string;
  status: string;
  phase: string;
  studyType: string;
  enrollment: number;
  allocation: string;
  masking: string;
  locationCount: number;
  startDate: string;
  completionDate: string;
  hasResults: boolean;
  leadSponsor: string;
  conditions: string[];
}

export interface MetadataAnalysisResult {
  trial: MetadataTrialInfo;
  publicationBias: {
    indicators: BiasIndicator[];
    score: number;
    summary: string;
  };
  selectionBias: {
    indicators: BiasIndicator[];
    score: number;
    summary: string;
  };
  overallScore: number;
  overallRisk: RiskLevel;
  recommendations: string[];
}

// MOCK: Example trial metadata (based on a realistic completed trial scenario)
export const metadataExampleTrial: MetadataTrialInfo = {
  nctId: "NCT00000000",
  title: "A Phase III, Randomized, Open-Label Study of Drug X vs Standard of Care in Advanced Non-Small Cell Lung Cancer",
  status: "COMPLETED",
  phase: "Phase III",
  studyType: "INTERVENTIONAL",
  enrollment: 412,
  allocation: "RANDOMIZED",
  masking: "NONE (Open Label)",
  locationCount: 1,
  startDate: "March 2018",
  completionDate: "June 2021",
  hasResults: false,
  leadSponsor: "Example Pharma Inc.",
  conditions: ["Non-Small Cell Lung Cancer"],
};

// MOCK: Pre-computed analysis result for the example trial
export const metadataExampleAnalysis: MetadataAnalysisResult = {
  trial: metadataExampleTrial,

  publicationBias: {
    indicators: [
      {
        name: "Results Not Posted",
        detected: true,
        riskLevel: "HIGH",
        explanation: "Study completed but results not posted to ClinicalTrials.gov",
        details: "Study completed 3+ year(s) ago without posting results.",
      },
      {
        name: "Terminated Without Results",
        detected: false,
        riskLevel: "NONE",
        explanation: "Study was not terminated or results were posted",
      },
      {
        name: "Delayed Results Posting",
        detected: false,
        riskLevel: "NONE",
        explanation: "Results were posted within acceptable timeframe",
      },
      {
        name: "Missing Secondary Outcomes",
        detected: false,
        riskLevel: "NONE",
        explanation: "Outcome reporting appears complete",
      },
    ],
    score: 25.0,
    summary: "Publication bias concerns: 1 high-risk indicator(s).",
  },

  selectionBias: {
    indicators: [
      {
        name: "No Randomization",
        detected: false,
        riskLevel: "NONE",
        explanation: "Study uses randomized allocation",
      },
      {
        name: "No Blinding",
        detected: true,
        riskLevel: "MEDIUM",
        explanation: "Study is open-label with no blinding/masking",
        details: "Open-label studies may be subject to performance and detection bias.",
      },
      {
        name: "Restrictive Eligibility Criteria",
        detected: false,
        riskLevel: "NONE",
        explanation: "Eligibility criteria appear reasonable",
      },
      {
        name: "Small Sample Size",
        detected: false,
        riskLevel: "NONE",
        explanation: "Adequate sample size (n=412)",
      },
      {
        name: "Single-Center Study",
        detected: true,
        riskLevel: "LOW",
        explanation: "Study conducted at a single site",
        details: "Single-center studies may have limited generalizability.",
      },
      {
        name: "Narrow Demographics",
        detected: false,
        riskLevel: "NONE",
        explanation: "Demographic criteria appear inclusive",
      },
    ],
    score: 11.1,
    summary: "Selection bias concerns: 1 medium-risk indicator(s).",
  },

  overallScore: 19.4,
  overallRisk: "LOW",

  recommendations: [
    "Consider searching for published papers that may contain the study results.",
    "Open-label design may introduce performance bias. Consider results in context of blinding limitations.",
    "Look for multi-center replication studies to confirm generalizability.",
  ],
};
