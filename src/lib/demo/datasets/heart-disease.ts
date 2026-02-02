import type {
  DatasetMetadata,
  DemographicBiasResult,
  DemographicBenchmark,
  RadarAxis,
  ActiveBiasHighlight,
  BiasInteraction,
  ProspectiveMilestone,
} from "../types";

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

  // Epidemiological baseline for demographic comparison
  // Source: GBD 2023 — IHD prevalence 137M male / 102M female of 239M total
  populationBaseline: {
    male: { percentage: 57.3 },
    female: { percentage: 42.7 },
  },

  heartDiseaseByGender: {
    male: { total: 726, withDisease: 459, rate: 63.2 },
    female: { total: 194, withDisease: 50, rate: 25.8 },
  },

  benchmarks: {
    epidemiological: {
      id: "epidemiological",
      label: "Disease Epidemiology (IHD)",
      description: "Global IHD prevalence by sex from the Global Burden of Disease study",
      source: {
        name: "GBD 2023 (JACC)",
        citation: "Lindstrom et al. (2025) Global, Regional, and National Burden of Cardiovascular Diseases, 1990-2023. JACC.",
        doi: "10.1016/j.jacc.2025.08.015",
        year: 2025,
      },
      values: { male: 57.3, female: 42.7 },
    } satisfies DemographicBenchmark,
    peerTrial: {
      id: "peer-trial",
      label: "Peer CV Trial Average",
      description: "Average sex distribution across 1,593 cardiovascular trials (2017-2023)",
      source: {
        name: "JAMA Network Open",
        citation: "Haering et al. (2024) Participation of Women in Cardiovascular Trials, 2017-2023. JAMA Netw Open.",
        doi: "10.1001/jamanetworkopen.2024.56498",
        year: 2024,
      },
      values: { male: 61.5, female: 38.5 },
    } satisfies DemographicBenchmark,
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

// Pre-computed demographic bias analysis (vs epidemiological baseline)
export const heartDiseaseDemographicBias: DemographicBiasResult[] = [
  {
    category: "Male",
    trialCount: 726,
    trialPercentage: 78.9,
    populationPercentage: 57.3,
    representationRatio: 1.38, // overrepresented vs epidemiology
    absoluteGap: 21.6,
    benchmarks: [
      {
        benchmarkId: "epidemiological",
        benchmarkLabel: "Disease Epidemiology",
        baselinePercentage: 57.3,
        representationRatio: 1.38,
        absoluteGap: 21.6,
        severity: "moderate",
      },
      {
        benchmarkId: "peer-trial",
        benchmarkLabel: "Peer CV Trial Average",
        baselinePercentage: 61.5,
        representationRatio: 1.28,
        absoluteGap: 17.4,
        severity: "mild",
      },
    ],
  },
  {
    category: "Female",
    trialCount: 194,
    trialPercentage: 21.1,
    populationPercentage: 42.7,
    representationRatio: 0.49, // underrepresented vs epidemiology
    absoluteGap: -21.6,
    benchmarks: [
      {
        benchmarkId: "epidemiological",
        benchmarkLabel: "Disease Epidemiology",
        baselinePercentage: 42.7,
        representationRatio: 0.49,
        absoluteGap: -21.6,
        severity: "moderate",
      },
      {
        benchmarkId: "peer-trial",
        benchmarkLabel: "Peer CV Trial Average",
        baselinePercentage: 38.5,
        representationRatio: 0.55,
        absoluteGap: -17.4,
        severity: "moderate",
      },
    ],
  },
];

// Key insight for the demo
export const heartDiseaseInsight = {
  headline: "Women are underrepresented by 51%",
  detail:
    "Ischemic heart disease affects men more than women (57% vs 43% of prevalent cases globally), " +
    "yet this trial's 21% female enrollment falls far below even that lower baseline. " +
    "Women are also underrepresented relative to peer cardiovascular trials, which average 38.5% female enrollment.",
  implication:
    "Treatment protocols developed from this data may miss female-specific symptoms and risk factors. " +
    "The gap persists even when accounting for the higher male disease prevalence.",
  biasScore: 0.49, // representation ratio for underrepresented group vs epidemiology
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

// Radar chart axes — this trial vs peer CV trial average
// Values are normalized 0-100. Sources: Haering et al. (2024) JAMA Netw Open for peer trial benchmarks.
export const heartDiseaseRadarAxes: RadarAxis[] = [
  {
    key: "female_enrollment",
    label: "Female %",
    trial: 21,
    benchmark: 39,
    description: "This trial: 21% female. Peer CV trials: 38.5% female.",
  },
  {
    key: "age_range",
    label: "Age Range",
    trial: 70,
    benchmark: 58,
    description: "This trial: 28-77 yrs. Peer CV trials typically 40-75.",
  },
  {
    key: "geographic_spread",
    label: "Regions",
    trial: 30,
    benchmark: 55,
    description: "This trial: 3 countries. Peer Phase III avg: ~8 countries.",
  },
  {
    key: "sample_size",
    label: "Sample Size",
    trial: 75,
    benchmark: 50,
    description: "This trial: 920 patients. Peer CV median: ~450.",
  },
  {
    key: "completion_rate",
    label: "Completion",
    trial: 88,
    benchmark: 85,
    description: "This trial: ~88% completion. Peer CV avg: ~85%.",
  },
];

// Active bias highlights for the trial stage timeline
export const heartDiseaseActiveBiases: ActiveBiasHighlight[] = [
  {
    stageId: "enrollment",
    biasType: "Selection Bias",
    severity: "high",
    description: "Female enrollment 21% vs 43% disease prevalence",
  },
];

// How biases cascade into downstream risks
export const heartDiseaseInteractions: BiasInteraction[] = [
  {
    from: "Selection Bias",
    to: "Generalizability Risk",
    description: "Underrepresentation limits external validity",
    strength: "strong",
  },
  {
    from: "Generalizability Risk",
    to: "Regulatory Delay",
    description: "FDA/EMA may require post-hoc subgroup analysis",
    strength: "moderate",
  },
  {
    from: "Regulatory Delay",
    to: "Market Limitation",
    description: "Label restrictions may limit approved population",
    strength: "moderate",
  },
];

// Prospective detection milestones
export const heartDiseaseProspective: ProspectiveMilestone[] = [
  {
    id: "enrollment-start",
    label: "Enrollment Begins",
    timepoint: "Week 0",
    description: "First patients screened and randomized",
    detected: false,
    traditional: false,
  },
  {
    id: "clinequal-detection",
    label: "Clinequal Flags Imbalance",
    timepoint: "Week 4",
    description: "Automated monitoring detects sex ratio deviation from epidemiological baseline",
    detected: true,
    traditional: false,
  },
  {
    id: "enrollment-complete",
    label: "Enrollment Complete",
    timepoint: "Month 18",
    description: "920 patients enrolled across 4 sites",
    detected: false,
    traditional: false,
  },
  {
    id: "analysis",
    label: "Statistical Analysis",
    timepoint: "Month 24",
    description: "Primary endpoint analysis completed",
    detected: false,
    traditional: false,
  },
  {
    id: "traditional-discovery",
    label: "Bias Discovered at Submission",
    timepoint: "NDA/MAA Filing",
    description: "Reviewer flags inadequate female representation during regulatory review",
    detected: false,
    traditional: true,
  },
];
