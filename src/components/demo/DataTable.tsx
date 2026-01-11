"use client";

import { useState } from "react";

interface DataTableProps {
  columns: {
    key: string;
    label: string;
    highlight?: boolean;
  }[];
  data: Record<string, string | number | boolean>[];
  highlightColumn?: string;
  highlightValues?: Record<string, string>; // value -> color class
  maxRows?: number;
}

export function DataTable({
  columns,
  data,
  highlightColumn,
  highlightValues = {},
  maxRows = 15,
}: DataTableProps) {
  const [showAll, setShowAll] = useState(false);
  const displayData = showAll ? data : data.slice(0, maxRows);
  const hasMore = data.length > maxRows;

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left py-3 px-4 font-medium text-slate-600 whitespace-nowrap ${
                    col.highlight ? "bg-primary/5" : ""
                  }`}
                >
                  {col.label}
                  {col.highlight && (
                    <span className="ml-1 text-primary">●</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                {columns.map((col) => {
                  const value = row[col.key];
                  const stringValue = String(value);
                  const highlightClass =
                    col.key === highlightColumn && highlightValues[stringValue]
                      ? highlightValues[stringValue]
                      : "";

                  return (
                    <td
                      key={col.key}
                      className={`py-2.5 px-4 whitespace-nowrap ${
                        col.highlight ? "bg-primary/5" : ""
                      }`}
                    >
                      {highlightClass ? (
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${highlightClass}`}
                        >
                          {stringValue}
                        </span>
                      ) : (
                        <span className="text-slate-700">{stringValue}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            {showAll
              ? "Show less"
              : `Show all ${data.length} rows`}
          </button>
          {!showAll && (
            <span className="text-sm text-slate-500 ml-2">
              Showing {maxRows} of {data.length}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
