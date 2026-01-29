import type { MetadataAnalysisResult } from "@/lib/demo/datasets/metadata-example";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export interface TrialSummary {
  nctId: string;
  title: string;
  status: string | null;
  phase: string | null;
  conditions: string[];
  interventions: string[];
  enrollment: number | null;
  startDate: string | null;
  completionDate: string | null;
}

export interface SearchResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  trials: TrialSummary[];
}

export async function searchTrials(
  query: string,
  page: number = 1,
  pageSize: number = 10
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    query,
    page: String(page),
    page_size: String(pageSize),
  });
  const res = await fetch(`${API_BASE}/api/trials/search?${params}`);
  if (!res.ok) {
    throw new Error(`Search failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getTrialBias(nctId: string): Promise<MetadataAnalysisResult> {
  const res = await fetch(`${API_BASE}/api/trials/${nctId}/bias`);
  if (!res.ok) {
    throw new Error(`Bias analysis failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
