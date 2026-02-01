export {
  calculateRepresentationRatio,
  getBiasSeverity,
  describeDemographicBias,
  calculateRepresentativenessScore,
  getTrafficLight,
} from "./demographic-bias";
export type { TrafficLight } from "./demographic-bias";

export {
  calculateEffectivenessInflation,
  hasDifferentialAttrition,
  describeAttritionBias,
  calculateHiddenPopulation,
  sensitivityAnalysis,
} from "./attrition-bias";
