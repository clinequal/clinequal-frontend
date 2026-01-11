import type { DatasetMetadata, AttritionBiasResult } from "../types";

export const depressionTrialMetadata: DatasetMetadata = {
  id: "depression-trial-synthetic",
  name: "CNS Phase II/III - Antidepressant Efficacy",
  description:
    "Randomized, double-blind, placebo-controlled trial evaluating a novel SSRI for major depressive disorder in adults.",
  source: "Simulated (based on published STAR*D patterns)",
  citation:
    "Patterns based on: Trivedi et al. (2006). STAR*D Study. Am J Psychiatry. Recontextualized for demonstration.",
  biasType: "attrition",
  sampleSize: 200,
  variables: [
    "age",
    "gender",
    "race",
    "income level",
    "education",
    "treatment arm",
    "baseline severity",
    "weeks in study",
    "completed",
    "remission",
  ],
};

// Trial context for business framing
export const depressionTrialContext = {
  phase: "Phase II/III",
  therapeuticArea: "CNS / Psychiatry",
  indication: "Major Depressive Disorder (MDD)",
  sites: 12,
  countries: ["USA"],
  enrollmentPeriod: "2021-2023",
  sponsor: "Simulated Pharma Co.",
  regulatoryTarget: "FDA",
  primaryEndpoint: "HAM-D remission at Week 12",
};

// Pre-computed statistics
export const depressionTrialStats = {
  totalPatients: 200,
  completedPatients: 155,
  droppedPatients: 45,
  overallDropoutRate: 22.5,

  byIncomeLevel: {
    high: { total: 67, completed: 67, dropped: 0, dropoutRate: 0 },
    middle: { total: 70, completed: 55, dropped: 15, dropoutRate: 21.4 },
    low: { total: 63, completed: 33, dropped: 30, dropoutRate: 47.6 },
  },

  byRace: {
    white: { total: 138, completed: 119, dropped: 19, dropoutRate: 13.8 },
    black: { total: 28, completed: 13, dropped: 15, dropoutRate: 53.6 },
    hispanic: { total: 26, completed: 15, dropped: 11, dropoutRate: 42.3 },
    asian: { total: 8, completed: 8, dropped: 0, dropoutRate: 0 },
  },

  remissionRates: {
    completersOnly: { remitted: 103, total: 155, rate: 66.5 },
    intentionToTreat: { remitted: 103, total: 200, rate: 51.5 },
    difference: 15.0, // percentage points
  },
};

// Pre-computed attrition bias analysis
export const depressionTrialAttritionBias: AttritionBiasResult[] = [
  {
    group: "High Income",
    totalPatients: 67,
    completedPatients: 67,
    droppedPatients: 0,
    dropoutRate: 0,
    remissionRateCompleters: 71.6,
    remissionRateITT: 71.6,
  },
  {
    group: "Middle Income",
    totalPatients: 70,
    completedPatients: 55,
    droppedPatients: 15,
    dropoutRate: 21.4,
    remissionRateCompleters: 63.6,
    remissionRateITT: 50.0,
  },
  {
    group: "Low Income",
    totalPatients: 63,
    completedPatients: 33,
    droppedPatients: 30,
    dropoutRate: 47.6,
    remissionRateCompleters: 57.6,
    remissionRateITT: 30.2,
  },
];

// Key insight for the demo
export const depressionTrialInsight = {
  headline: "Dropout bias inflates effectiveness by 15 percentage points",
  detail:
    "When only counting patients who completed the trial, remission appears to be 67%. But lower-income patients dropped out at 4x the rate of higher-income patients. Counting dropouts as treatment failures reveals true effectiveness of 52%.",
  implication:
    "Published efficacy rates may significantly overestimate real-world treatment effectiveness, especially for disadvantaged populations who are most likely to discontinue treatment.",
  reportedRate: 66.5,
  actualRate: 51.5,
  inflationFactor: 1.29,
};

// Dropout timeline for visualization
export const dropoutTimeline = [
  { week: 1, cumulative: 0, newDropouts: 0 },
  { week: 2, cumulative: 8, newDropouts: 8 },
  { week: 3, cumulative: 18, newDropouts: 10 },
  { week: 4, cumulative: 28, newDropouts: 10 },
  { week: 5, cumulative: 33, newDropouts: 5 },
  { week: 6, cumulative: 37, newDropouts: 4 },
  { week: 7, cumulative: 40, newDropouts: 3 },
  { week: 8, cumulative: 43, newDropouts: 3 },
  { week: 9, cumulative: 44, newDropouts: 1 },
  { week: 10, cumulative: 44, newDropouts: 0 },
  { week: 11, cumulative: 45, newDropouts: 1 },
  { week: 12, cumulative: 45, newDropouts: 0 },
];

// Sample patient data for visualizations
export const depressionTrialSample = [
  { id: "P001", age: 34, gender: "Female" as const, incomeLevel: "High" as const, completed: true, remission: true },
  { id: "P004", age: 28, gender: "Male" as const, incomeLevel: "Low" as const, completed: false, remission: false },
  { id: "P006", age: 39, gender: "Male" as const, incomeLevel: "Low" as const, completed: false, remission: false },
  { id: "P011", age: 42, gender: "Female" as const, incomeLevel: "Middle" as const, completed: false, remission: false },
  { id: "P015", age: 35, gender: "Female" as const, incomeLevel: "Low" as const, completed: false, remission: false },
  { id: "P021", age: 24, gender: "Female" as const, incomeLevel: "Low" as const, completed: true, remission: false },
  { id: "P024", age: 33, gender: "Male" as const, incomeLevel: "Low" as const, completed: false, remission: false },
  { id: "P032", age: 25, gender: "Male" as const, incomeLevel: "Low" as const, completed: false, remission: false },
  { id: "P034", age: 38, gender: "Male" as const, incomeLevel: "Middle" as const, completed: false, remission: false },
  { id: "P043", age: 35, gender: "Female" as const, incomeLevel: "Middle" as const, completed: false, remission: false },
  { id: "P050", age: 42, gender: "Male" as const, incomeLevel: "High" as const, completed: true, remission: true },
  { id: "P058", age: 58, gender: "Male" as const, incomeLevel: "High" as const, completed: true, remission: true },
  { id: "P062", age: 36, gender: "Male" as const, incomeLevel: "Low" as const, completed: false, remission: false },
  { id: "P074", age: 32, gender: "Male" as const, incomeLevel: "Low" as const, completed: false, remission: false },
  { id: "P077", age: 46, gender: "Female" as const, incomeLevel: "Middle" as const, completed: false, remission: false },
  { id: "P089", age: 39, gender: "Female" as const, incomeLevel: "High" as const, completed: true, remission: true },
  { id: "P098", age: 44, gender: "Male" as const, incomeLevel: "Middle" as const, completed: false, remission: false },
  { id: "P105", age: 49, gender: "Female" as const, incomeLevel: "High" as const, completed: true, remission: true },
  { id: "P116", age: 29, gender: "Male" as const, incomeLevel: "Low" as const, completed: false, remission: false },
  { id: "P121", age: 40, gender: "Female" as const, incomeLevel: "Middle" as const, completed: false, remission: false },
];
