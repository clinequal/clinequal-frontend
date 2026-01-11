import type { DemographicBiasResult } from "../types";

/**
 * Calculate representation ratio for a demographic group
 * < 1 means underrepresented, > 1 means overrepresented
 */
export function calculateRepresentationRatio(
  trialPercentage: number,
  populationPercentage: number
): number {
  if (populationPercentage === 0) return 0;
  return trialPercentage / populationPercentage;
}

/**
 * Determine bias severity based on representation ratio
 */
export function getBiasSeverity(
  ratio: number
): "none" | "mild" | "moderate" | "severe" {
  if (ratio >= 0.8 && ratio <= 1.2) return "none";
  if (ratio >= 0.6 && ratio <= 1.4) return "mild";
  if (ratio >= 0.4 && ratio <= 1.6) return "moderate";
  return "severe";
}

/**
 * Get human-readable description of demographic bias
 */
export function describeDemographicBias(result: DemographicBiasResult): string {
  const { category, representationRatio, absoluteGap } = result;

  if (representationRatio >= 0.9 && representationRatio <= 1.1) {
    return `${category} participants are adequately represented.`;
  }

  const direction = representationRatio < 1 ? "underrepresented" : "overrepresented";
  const percentage = Math.abs(Math.round((1 - representationRatio) * 100));

  return `${category} participants are ${direction} by ${percentage}% (${Math.abs(absoluteGap).toFixed(1)} percentage points from population baseline).`;
}

/**
 * Calculate overall dataset representativeness score (0-100)
 * 100 = perfectly representative, 0 = severely biased
 */
export function calculateRepresentativenessScore(
  results: DemographicBiasResult[]
): number {
  if (results.length === 0) return 100;

  const avgDeviation =
    results.reduce((sum, r) => sum + Math.abs(1 - r.representationRatio), 0) /
    results.length;

  // Convert deviation to score (0 deviation = 100, 1+ deviation = 0)
  return Math.max(0, Math.round((1 - avgDeviation) * 100));
}
