import type {
  DatasetMetadata,
  AttritionBiasResult,
  RadarAxis,
  ActiveBiasHighlight,
  BiasInteraction,
  ProspectiveMilestone,
} from "../types";

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

// Radar chart axes — this trial vs peer MDD trial average
// Values are normalized 0-100. Peer benchmarks based on published MDD trial meta-analyses.
export const depressionTrialRadarAxes: RadarAxis[] = [
  {
    key: "completion_rate",
    label: "Completion",
    trial: 78,
    benchmark: 85,
    description: "This trial: 77.5% completion. Peer MDD trials: ~85%.",
  },
  {
    key: "racial_diversity",
    label: "Racial Diversity",
    trial: 31,
    benchmark: 25,
    description: "This trial: 31% non-white. Peer MDD trials: ~25%.",
  },
  {
    key: "sample_size",
    label: "Sample Size",
    trial: 35,
    benchmark: 55,
    description: "This trial: 200 patients. Peer Phase II/III median: ~350.",
  },
  {
    key: "trial_duration",
    label: "Duration",
    trial: 50,
    benchmark: 65,
    description: "This trial: 12 weeks. Peer MDD avg: ~16 weeks.",
  },
  {
    key: "uniform_attrition",
    label: "Uniform Attrition",
    trial: 20,
    benchmark: 65,
    description: "This trial: 5x differential dropout. Peer avg: ~1.5x.",
  },
];

// Active bias highlights for the trial stage timeline
export const depressionTrialActiveBiases: ActiveBiasHighlight[] = [
  {
    stageId: "treatment",
    biasType: "Attrition Bias",
    severity: "high",
    description: "Differential dropout by SES inflates efficacy",
  },
];

// How biases cascade into downstream risks
export const depressionTrialInteractions: BiasInteraction[] = [
  {
    from: "Attrition Bias",
    to: "Efficacy Inflation",
    description: "Non-random dropout inflates apparent remission rate",
    strength: "strong",
  },
  {
    from: "Efficacy Inflation",
    to: "Publication Bias",
    description: "Inflated results shape clinical guidelines",
    strength: "moderate",
  },
  {
    from: "Publication Bias",
    to: "Prescribing Errors",
    description: "Overstated efficacy leads to inappropriate treatment decisions",
    strength: "moderate",
  },
];

// Prospective detection milestones
export const depressionTrialProspective: ProspectiveMilestone[] = [
  {
    id: "enrollment-start",
    label: "Enrollment Begins",
    timepoint: "Week 0",
    description: "200 patients randomized across 12 sites",
    detected: false,
    traditional: false,
  },
  {
    id: "early-dropouts",
    label: "Early Dropouts Begin",
    timepoint: "Week 2",
    description: "First wave of discontinuations, predominantly low-SES",
    detected: false,
    traditional: false,
  },
  {
    id: "clinequal-detection",
    label: "Clinequal Flags Differential Attrition",
    timepoint: "Week 6",
    description: "Automated monitoring detects SES-correlated dropout pattern exceeding threshold",
    detected: true,
    traditional: false,
  },
  {
    id: "trial-complete",
    label: "12-Week Trial Complete",
    timepoint: "Week 12",
    description: "155 of 200 patients complete study; 45 discontinued",
    detected: false,
    traditional: false,
  },
  {
    id: "traditional-discovery",
    label: "Bias Discovered During FDA Review",
    timepoint: "FDA Review",
    description: "Statistical reviewer identifies completer vs ITT discrepancy and requests reanalysis",
    detected: false,
    traditional: true,
  },
];
