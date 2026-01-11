export {
  heartDiseaseMetadata,
  heartDiseaseStats,
  heartDiseaseDemographicBias,
  heartDiseaseInsight,
  heartDiseaseSample,
} from "./heart-disease";

export {
  depressionTrialMetadata,
  depressionTrialStats,
  depressionTrialAttritionBias,
  depressionTrialInsight,
  dropoutTimeline,
  depressionTrialSample,
} from "./depression-trial";

// Dataset registry for the demo selector
export const datasets = [
  {
    id: "heart-disease-uci",
    name: "Heart Disease Study",
    biasType: "demographic" as const,
    shortDescription: "Gender representation in cardiovascular research",
    icon: "heart",
  },
  {
    id: "depression-trial-synthetic",
    name: "Depression Treatment Trial",
    biasType: "attrition" as const,
    shortDescription: "How dropout patterns mask treatment effectiveness",
    icon: "brain",
  },
];
