// Dataset 1: Heart Disease (UCI) - Demographic Bias Demo
export interface HeartDiseasePatient {
  id: number;
  age: number;
  sex: "Male" | "Female";
  dataset: string;
  chestPainType: "typical angina" | "atypical angina" | "non-anginal" | "asymptomatic";
  restingBP: number | null;
  cholesterol: number | null;
  fastingBloodSugar: boolean | null;
  restingECG: "normal" | "lv hypertrophy" | "st-t abnormality" | null;
  maxHeartRate: number | null;
  exerciseAngina: boolean | null;
  oldpeak: number | null;
  slope: "upsloping" | "flat" | "downsloping" | null;
  numMajorVessels: number | null;
  thalassemia: "normal" | "fixed defect" | "reversable defect" | null;
  hasHeartDisease: boolean;
}

// Dataset 2: Depression Trial (Synthetic) - Attrition Bias Demo
export interface DepressionTrialPatient {
  patientId: string;
  age: number;
  gender: "Male" | "Female";
  race: "White" | "Black" | "Hispanic" | "Asian" | "Other";
  incomeLevel: "Low" | "Middle" | "High";
  education: "High School" | "Some College" | "Bachelor" | "Graduate";
  treatmentArm: "Treatment" | "Placebo";
  baselineSeverity: "Mild" | "Moderate" | "Severe";
  weeksInStudy: number;
  completed: boolean;
  remission: boolean;
}

// Analysis Results
export interface DemographicBiasResult {
  category: string;
  trialCount: number;
  trialPercentage: number;
  populationPercentage: number;
  representationRatio: number; // < 1 means underrepresented
  absoluteGap: number;
}

export interface AttritionBiasResult {
  group: string;
  totalPatients: number;
  completedPatients: number;
  droppedPatients: number;
  dropoutRate: number;
  remissionRateCompleters: number;
  remissionRateITT: number;
}

export interface DatasetMetadata {
  id: string;
  name: string;
  description: string;
  source: string;
  sourceUrl?: string;
  citation?: string;
  biasType: "demographic" | "attrition" | "selection" | "other";
  sampleSize: number;
  variables: string[];
}
