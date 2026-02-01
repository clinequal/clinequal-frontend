import type { BiasStage } from "../types";

// General trial stage pipeline — shared by all demo datasets
export const trialStages: BiasStage[] = [
  { id: "design", label: "Protocol Design", order: 0 },
  { id: "screening", label: "Screening", order: 1 },
  { id: "enrollment", label: "Enrollment", order: 2 },
  { id: "treatment", label: "Treatment", order: 3 },
  { id: "analysis", label: "Analysis", order: 4 },
  { id: "submission", label: "Submission", order: 5 },
];
