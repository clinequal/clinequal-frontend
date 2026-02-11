// ============================================================
// Metadata Analysis Types & Mock Data
// Aligned with backend API (Feb 2026 refactor)
// ============================================================

export type FlagStatus = "concern" | "note" | "ok";

export interface Flag {
  name: string;
  status: FlagStatus;
  explanation: string;
  details?: string;
}

export interface Intervention {
  name: string;
  type: string;
  description?: string;
}

export interface Outcome {
  measure: string;
  timeFrame?: string;
  description?: string;
}

export interface Location {
  facility: string;
  city?: string;
  country?: string;
  status?: string | null;
}

export interface MetadataTrialInfo {
  // Identification
  nctId: string;
  title: string;
  officialTitle: string;
  briefSummary: string;

  // Status & Dates
  status: string;
  phase: string;
  startDate: string;
  completionDate: string;
  lastUpdateDate: string;
  whyStopped: string;

  // Design
  studyType: string;
  allocation: string;
  masking: string;
  primaryPurpose: string;
  interventionModel: string;

  // Enrollment & Eligibility
  enrollment: number;
  sex: string;
  minimumAge: string;
  maximumAge: string;
  eligibilityCriteria: string;

  // Interventions & Outcomes
  interventions: Intervention[];
  primaryOutcomes: Outcome[];
  secondaryOutcomes: Outcome[];
  hasResults: boolean;

  // Locations & Sponsors
  locations: Location[];
  locationCount: number;
  leadSponsor: string;
  collaborators: string[];
  conditions: string[];
}

export interface MetadataAnalysisResult {
  trial: MetadataTrialInfo;
  publicationConcerns: Flag[];
  methodologicalLimitations: Flag[];
  generalizabilityNotes: Flag[];
  recommendations: string[];
}

// MOCK: Example trial metadata
export const metadataExampleTrial: MetadataTrialInfo = {
  nctId: "NCT00000000",
  title: "A Phase III, Randomized, Open-Label Study of Drug X vs Standard of Care in Advanced Non-Small Cell Lung Cancer",
  officialTitle: "A Phase III, Randomized, Open-Label Study Comparing Drug X to Standard of Care Treatment in Patients With Advanced Non-Small Cell Lung Cancer",
  briefSummary: "This study evaluates the efficacy and safety of Drug X compared to standard of care in patients with advanced non-small cell lung cancer who have progressed after first-line therapy.",
  status: "COMPLETED",
  phase: "Phase III",
  startDate: "2018-03-01",
  completionDate: "2021-06-30",
  lastUpdateDate: "2022-01-15",
  whyStopped: "",
  studyType: "INTERVENTIONAL",
  allocation: "RANDOMIZED",
  masking: "NONE (Open Label)",
  primaryPurpose: "TREATMENT",
  interventionModel: "PARALLEL",
  enrollment: 412,
  sex: "ALL",
  minimumAge: "18 Years",
  maximumAge: "N/A",
  eligibilityCriteria: "Inclusion Criteria:\n- Histologically confirmed NSCLC\n- Stage IIIB or IV disease\n- ECOG performance status 0-1\n\nExclusion Criteria:\n- Prior treatment with Drug X\n- Active brain metastases",
  interventions: [
    { name: "Drug X", type: "DRUG", description: "200mg IV every 3 weeks" },
    { name: "Standard of Care", type: "DRUG", description: "Docetaxel 75mg/m² IV every 3 weeks" },
  ],
  primaryOutcomes: [
    { measure: "Overall Survival", timeFrame: "Up to 36 months", description: "Time from randomization to death from any cause" },
  ],
  secondaryOutcomes: [
    { measure: "Progression-Free Survival", timeFrame: "Up to 36 months" },
    { measure: "Objective Response Rate", timeFrame: "Up to 36 months" },
  ],
  hasResults: false,
  locations: [
    { facility: "Example Cancer Center", city: "Boston", country: "United States", status: null },
  ],
  locationCount: 1,
  leadSponsor: "Example Pharma Inc.",
  collaborators: [],
  conditions: ["Non-Small Cell Lung Cancer"],
};

// MOCK: Pre-computed analysis result for the example trial
export const metadataExampleAnalysis: MetadataAnalysisResult = {
  trial: metadataExampleTrial,

  publicationConcerns: [
    {
      name: "Results Not Posted",
      status: "concern",
      explanation: "Trial completed but results not posted to ClinicalTrials.gov",
      details: "Study completed 3+ years ago without posting results.",
    },
    {
      name: "Results Timing",
      status: "ok",
      explanation: "No delay concerns beyond missing results",
    },
    {
      name: "Outcome Reporting",
      status: "ok",
      explanation: "All registered outcomes appear accounted for",
    },
  ],

  methodologicalLimitations: [
    {
      name: "Randomization",
      status: "ok",
      explanation: "Study uses randomized allocation",
    },
    {
      name: "Blinding",
      status: "note",
      explanation: "Study is open-label with no blinding/masking",
      details: "Open-label studies may be subject to performance and detection bias.",
    },
  ],

  generalizabilityNotes: [
    {
      name: "Sample Size",
      status: "ok",
      explanation: "Adequate sample size (n=412)",
    },
    {
      name: "Study Sites",
      status: "note",
      explanation: "Single-center study",
      details: "Results from 1 site may have limited generalizability.",
    },
    {
      name: "Demographics",
      status: "ok",
      explanation: "Demographic criteria appear inclusive",
    },
    {
      name: "Eligibility Criteria",
      status: "ok",
      explanation: "Eligibility criteria appear reasonable",
    },
  ],

  recommendations: [
    "Consider searching for published papers that may contain the study results.",
    "Open-label design may introduce performance bias. Consider results in context of blinding limitations.",
    "Look for multi-center replication studies to confirm generalizability.",
  ],
};
