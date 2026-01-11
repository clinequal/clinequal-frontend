import type { AttritionBiasResult } from "../types";

/**
 * Calculate the difference between completer and ITT remission rates
 * This shows how much dropout bias inflates reported effectiveness
 */
export function calculateEffectivenessInflation(
  completersRate: number,
  ittRate: number
): {
  absoluteDifference: number;
  relativeDifference: number;
  inflationFactor: number;
} {
  return {
    absoluteDifference: completersRate - ittRate,
    relativeDifference:
      ittRate > 0 ? ((completersRate - ittRate) / ittRate) * 100 : 0,
    inflationFactor: ittRate > 0 ? completersRate / ittRate : 1,
  };
}

/**
 * Determine if differential attrition is present
 * Returns true if dropout rates vary significantly across groups
 */
export function hasDifferentialAttrition(
  results: AttritionBiasResult[],
  threshold: number = 15 // percentage point difference
): boolean {
  if (results.length < 2) return false;

  const rates = results.map((r) => r.dropoutRate);
  const maxRate = Math.max(...rates);
  const minRate = Math.min(...rates);

  return maxRate - minRate > threshold;
}

/**
 * Get human-readable description of attrition bias
 */
export function describeAttritionBias(results: AttritionBiasResult[]): string {
  if (!hasDifferentialAttrition(results)) {
    return "Dropout rates are similar across groups. Attrition bias is minimal.";
  }

  const sorted = [...results].sort((a, b) => b.dropoutRate - a.dropoutRate);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  const ratio =
    lowest.dropoutRate > 0
      ? (highest.dropoutRate / lowest.dropoutRate).toFixed(1)
      : "significantly higher";

  return `${highest.group} patients dropped out at ${ratio}x the rate of ${lowest.group} patients (${highest.dropoutRate.toFixed(0)}% vs ${lowest.dropoutRate.toFixed(0)}%). This differential attrition may bias study conclusions.`;
}

/**
 * Calculate the "hidden" population - patients whose outcomes are unknown due to dropout
 */
export function calculateHiddenPopulation(results: AttritionBiasResult[]): {
  totalDropped: number;
  percentageHidden: number;
  mostAffectedGroup: string;
} {
  const totalPatients = results.reduce((sum, r) => sum + r.totalPatients, 0);
  const totalDropped = results.reduce((sum, r) => sum + r.droppedPatients, 0);

  const sorted = [...results].sort((a, b) => b.dropoutRate - a.dropoutRate);

  return {
    totalDropped,
    percentageHidden: (totalDropped / totalPatients) * 100,
    mostAffectedGroup: sorted[0]?.group || "Unknown",
  };
}

/**
 * Calculate what the remission rate would be under different dropout assumptions
 */
export function sensitivityAnalysis(
  completersRemitted: number,
  completersTotal: number,
  dropped: number
): {
  bestCase: number; // All dropouts would have remitted
  worstCase: number; // No dropouts would have remitted
  midCase: number; // Dropouts same rate as completers
} {
  const total = completersTotal + dropped;
  const completersRate = completersRemitted / completersTotal;

  return {
    bestCase: ((completersRemitted + dropped) / total) * 100,
    worstCase: (completersRemitted / total) * 100,
    midCase: ((completersRemitted + dropped * completersRate) / total) * 100,
  };
}
