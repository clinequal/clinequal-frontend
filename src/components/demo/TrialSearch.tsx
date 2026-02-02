"use client";

import { useState, useCallback } from "react";
import { searchTrials, type TrialSummary, type SearchResponse } from "@/lib/api/trials";

interface TrialSearchProps {
  onSelect: (nctId: string) => void;
  onBack: () => void;
}

const PAGE_SIZE = 10;

const statusColors: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  RECRUITING: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "ACTIVE, NOT RECRUITING": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  TERMINATED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  WITHDRAWN: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
  SUSPENDED: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "NOT YET RECRUITING": "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400",
};

function TrialCard({ trial, onSelect }: { trial: TrialSummary; onSelect: (nctId: string) => void }) {
  const statusColor = statusColors[trial.status || ""] || "bg-slate-100 text-slate-600";

  return (
    <button
      onClick={() => onSelect(trial.nctId)}
      className="w-full text-left p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{trial.nctId}</span>
          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-50 mt-0.5 line-clamp-2">
            {trial.title}
          </h4>
        </div>
        {trial.status && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${statusColor}`}>
            {trial.status}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        {trial.phase && <span>{trial.phase}</span>}
        {trial.phase && trial.enrollment && <span className="text-slate-300 dark:text-slate-600">|</span>}
        {trial.enrollment && <span>n={trial.enrollment.toLocaleString()}</span>}
        {trial.conditions.length > 0 && (
          <>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="truncate">{trial.conditions.slice(0, 2).join(", ")}</span>
          </>
        )}
      </div>
    </button>
  );
}

export function TrialSearch({ onSelect, onBack }: TrialSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = useCallback(async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setCurrentPage(page);
    try {
      const data = await searchTrials(searchQuery.trim(), page);
      setResults(data);
      if (data.totalCount > 0) {
        setTotalCount(data.totalCount);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to search trials. Is the backend running?"
      );
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setTotalCount(0);
    handleSearch(query);
  };

  const handlePageChange = (newPage: number) => {
    handleSearch(query, newPage);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary mb-2 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
          Search ClinicalTrials.gov
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Search by disease, drug name, or NCT ID to analyze a trial&apos;s metadata for bias indicators.
        </p>
      </div>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. diabetes, pembrolizumab, NCT04267848..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-5 py-2.5 bg-slate-800 dark:bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-300 font-medium">Search failed</p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm">Searching ClinicalTrials.gov...</span>
          </div>
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">{totalCount.toLocaleString()}</span> trials found
            </p>
            {totalCount > PAGE_SIZE && (
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Page {currentPage} of {Math.ceil(totalCount / PAGE_SIZE)}
              </p>
            )}
          </div>

          {results.trials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 text-sm">No trials found for &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div className="space-y-2">
              {results.trials.map((trial) => (
                <TrialCard key={trial.nctId} trial={trial} onSelect={onSelect} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalCount > PAGE_SIZE && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-slate-500 dark:text-slate-400 px-2">
                {currentPage} / {Math.ceil(totalCount / PAGE_SIZE)}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalCount / PAGE_SIZE)}
                className="px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty state - no search yet */}
      {!results && !loading && !error && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 mb-3">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Search any registered clinical trial</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Results are fetched live from the ClinicalTrials.gov registry
          </p>
        </div>
      )}
    </div>
  );
}
