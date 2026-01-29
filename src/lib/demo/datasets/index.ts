export {
  heartDiseaseMetadata,
  heartDiseaseStats,
  heartDiseaseDemographicBias,
  heartDiseaseInsight,
  heartDiseaseSample,
  heartDiseaseTrialContext,
} from "./heart-disease";

export {
  depressionTrialMetadata,
  depressionTrialStats,
  depressionTrialAttritionBias,
  depressionTrialInsight,
  dropoutTimeline,
  depressionTrialSample,
  depressionTrialContext,
} from "./depression-trial";

export {
  metadataExampleTrial,
  metadataExampleAnalysis,
} from "./metadata-example";

// Dataset registry for the demo selector
export const patientLevelDatasets = [
  {
    id: "heart-disease-uci",
    name: "Cardiovascular Phase III",
    biasType: "demographic" as const,
    shortDescription: "Demographic imbalance in multi-center RCT",
    phase: "Phase III",
    patients: 920,
    icon: "heart",
    dataSource: "patient-level" as const,
  },
  {
    id: "depression-trial-synthetic",
    name: "CNS Phase II/III - MDD",
    biasType: "attrition" as const,
    shortDescription: "Differential attrition masking efficacy",
    phase: "Phase II/III",
    patients: 200,
    icon: "brain",
    dataSource: "patient-level" as const,
  },
];

export const metadataDatasets = [
  {
    id: "metadata-ctgov-example",
    name: "ClinicalTrials.gov Registry Lookup",
    biasType: "selection" as const,
    shortDescription: "Publication & selection bias from trial design metadata",
    phase: "Phase III",
    icon: "search",
    dataSource: "metadata" as const,
  },
];

// Combined for backwards compatibility
export const datasets = [...patientLevelDatasets, ...metadataDatasets];
