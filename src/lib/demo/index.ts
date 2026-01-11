// Types
export type {
  HeartDiseasePatient,
  DepressionTrialPatient,
  DemographicBiasResult,
  AttritionBiasResult,
  DatasetMetadata,
} from "./types";

// Datasets
export {
  datasets,
  heartDiseaseMetadata,
  heartDiseaseStats,
  heartDiseaseDemographicBias,
  heartDiseaseInsight,
  heartDiseaseSample,
  depressionTrialMetadata,
  depressionTrialStats,
  depressionTrialAttritionBias,
  depressionTrialInsight,
  dropoutTimeline,
  depressionTrialSample,
} from "./datasets";

// Analysis functions
export {
  calculateRepresentationRatio,
  getBiasSeverity,
  describeDemographicBias,
  calculateRepresentativenessScore,
  calculateEffectivenessInflation,
  hasDifferentialAttrition,
  describeAttritionBias,
  calculateHiddenPopulation,
  sensitivityAnalysis,
} from "./analysis";
