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

// Dataset registry for the demo selector
export const datasets = [
  {
    id: "heart-disease-uci",
    name: "Cardiovascular Phase III",
    biasType: "demographic" as const,
    shortDescription: "Demographic imbalance in multi-center RCT",
    phase: "Phase III",
    patients: 920,
    icon: "heart",
  },
  {
    id: "depression-trial-synthetic",
    name: "CNS Phase II/III - MDD",
    biasType: "attrition" as const,
    shortDescription: "Differential attrition masking efficacy",
    phase: "Phase II/III",
    patients: 200,
    icon: "brain",
  },
];
