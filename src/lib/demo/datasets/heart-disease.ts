import type { DatasetMetadata, DemographicBiasResult } from "../types";

export const heartDiseaseMetadata: DatasetMetadata = {
  id: "heart-disease-uci",
  name: "Cardiovascular Phase III Trial",
  description:
    "Multi-center randomized controlled trial evaluating a novel lipid-lowering therapy for coronary artery disease prevention.",
  source: "Simulated from UCI Heart Disease Repository",
  sourceUrl: "https://archive.ics.uci.edu/dataset/45/heart+disease",
  citation:
    "Data patterns based on: Janosi et al. (1988). Heart Disease. UCI ML Repository. Recontextualized for demonstration.",
  biasType: "demographic",
  sampleSize: 920,
  variables: [
    "age",
    "sex",
    "chest pain type",
    "resting blood pressure",
    "cholesterol",
    "fasting blood sugar",
    "resting ECG",
    "max heart rate",
    "exercise angina",
    "ST depression",
    "slope",
    "major vessels",
    "thalassemia",
    "heart disease",
  ],
};

// Trial context for business framing
export const heartDiseaseTrialContext = {
  phase: "Phase III",
  therapeuticArea: "Cardiovascular",
  indication: "Coronary Artery Disease Prevention",
  sites: 4,
  countries: ["USA", "Hungary", "Switzerland"],
  enrollmentPeriod: "2019-2022",
  sponsor: "Simulated Pharma Co.",
  regulatoryTarget: "FDA / EMA",
};

// Pre-computed statistics from the full dataset
export const heartDiseaseStats = {
  totalPatients: 920,

  genderDistribution: {
    male: { count: 726, percentage: 78.9 },
    female: { count: 194, percentage: 21.1 },
  },

  // Real-world heart disease prevalence for comparison
  // Source: American Heart Association - roughly equal between sexes after age 65
  populationBaseline: {
    male: { percentage: 50 },
    female: { percentage: 50 },
  },

  heartDiseaseByGender: {
    male: { total: 726, withDisease: 459, rate: 63.2 },
    female: { total: 194, withDisease: 50, rate: 25.8 },
  },

  ageDistribution: {
    mean: 53.5,
    median: 54,
    min: 28,
    max: 77,
    byGender: {
      male: { mean: 52.8, median: 53 },
      female: { mean: 55.6, median: 56 },
    },
  },
};

// Pre-computed demographic bias analysis
export const heartDiseaseDemographicBias: DemographicBiasResult[] = [
  {
    category: "Male",
    trialCount: 726,
    trialPercentage: 78.9,
    populationPercentage: 50,
    representationRatio: 1.58, // overrepresented
    absoluteGap: 28.9,
  },
  {
    category: "Female",
    trialCount: 194,
    trialPercentage: 21.1,
    populationPercentage: 50,
    representationRatio: 0.42, // underrepresented
    absoluteGap: -28.9,
  },
];

// Key insight for the demo
export const heartDiseaseInsight = {
  headline: "Women are underrepresented by 58%",
  detail:
    "While heart disease affects men and women roughly equally, this dataset contains 79% male patients. Findings may not generalize to female patients.",
  implication:
    "Treatment protocols developed from this data may miss female-specific symptoms and risk factors.",
  biasScore: 0.42, // representation ratio for underrepresented group
};

// Sample of raw data for drill-down visualizations (50 patients, maintaining proportions)
export const heartDiseaseSample = [
  { id: 1, age: 63, sex: "Male" as const, hasHeartDisease: false },
  { id: 2, age: 67, sex: "Male" as const, hasHeartDisease: true },
  { id: 3, age: 67, sex: "Male" as const, hasHeartDisease: true },
  { id: 4, age: 37, sex: "Male" as const, hasHeartDisease: false },
  { id: 5, age: 41, sex: "Female" as const, hasHeartDisease: false },
  { id: 6, age: 56, sex: "Male" as const, hasHeartDisease: false },
  { id: 7, age: 62, sex: "Female" as const, hasHeartDisease: true },
  { id: 8, age: 57, sex: "Female" as const, hasHeartDisease: false },
  { id: 9, age: 63, sex: "Male" as const, hasHeartDisease: true },
  { id: 10, age: 53, sex: "Male" as const, hasHeartDisease: true },
  { id: 11, age: 57, sex: "Male" as const, hasHeartDisease: false },
  { id: 12, age: 56, sex: "Female" as const, hasHeartDisease: false },
  { id: 13, age: 56, sex: "Male" as const, hasHeartDisease: true },
  { id: 14, age: 44, sex: "Male" as const, hasHeartDisease: false },
  { id: 15, age: 52, sex: "Male" as const, hasHeartDisease: false },
  { id: 16, age: 57, sex: "Male" as const, hasHeartDisease: false },
  { id: 17, age: 48, sex: "Male" as const, hasHeartDisease: true },
  { id: 18, age: 54, sex: "Male" as const, hasHeartDisease: false },
  { id: 19, age: 48, sex: "Female" as const, hasHeartDisease: false },
  { id: 20, age: 49, sex: "Male" as const, hasHeartDisease: false },
  { id: 21, age: 64, sex: "Male" as const, hasHeartDisease: false },
  { id: 22, age: 58, sex: "Female" as const, hasHeartDisease: false },
  { id: 23, age: 58, sex: "Male" as const, hasHeartDisease: true },
  { id: 24, age: 58, sex: "Male" as const, hasHeartDisease: true },
  { id: 25, age: 60, sex: "Male" as const, hasHeartDisease: true },
  { id: 26, age: 50, sex: "Female" as const, hasHeartDisease: false },
  { id: 27, age: 58, sex: "Female" as const, hasHeartDisease: false },
  { id: 28, age: 66, sex: "Female" as const, hasHeartDisease: false },
  { id: 29, age: 43, sex: "Male" as const, hasHeartDisease: false },
  { id: 30, age: 40, sex: "Male" as const, hasHeartDisease: false },
  { id: 31, age: 69, sex: "Male" as const, hasHeartDisease: true },
  { id: 32, age: 60, sex: "Male" as const, hasHeartDisease: true },
  { id: 33, age: 64, sex: "Male" as const, hasHeartDisease: false },
  { id: 34, age: 59, sex: "Male" as const, hasHeartDisease: true },
  { id: 35, age: 44, sex: "Male" as const, hasHeartDisease: false },
  { id: 36, age: 42, sex: "Male" as const, hasHeartDisease: false },
  { id: 37, age: 43, sex: "Male" as const, hasHeartDisease: false },
  { id: 38, age: 57, sex: "Male" as const, hasHeartDisease: false },
  { id: 39, age: 55, sex: "Male" as const, hasHeartDisease: false },
  { id: 40, age: 61, sex: "Male" as const, hasHeartDisease: false },
  { id: 41, age: 65, sex: "Female" as const, hasHeartDisease: false },
  { id: 42, age: 40, sex: "Male" as const, hasHeartDisease: true },
  { id: 43, age: 71, sex: "Male" as const, hasHeartDisease: false },
  { id: 44, age: 59, sex: "Male" as const, hasHeartDisease: true },
  { id: 45, age: 61, sex: "Female" as const, hasHeartDisease: false },
  { id: 46, age: 58, sex: "Male" as const, hasHeartDisease: true },
  { id: 47, age: 51, sex: "Male" as const, hasHeartDisease: false },
  { id: 48, age: 50, sex: "Male" as const, hasHeartDisease: true },
  { id: 49, age: 65, sex: "Male" as const, hasHeartDisease: true },
  { id: 50, age: 53, sex: "Male" as const, hasHeartDisease: true },
];
