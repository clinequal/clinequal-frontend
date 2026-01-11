"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { PilotRequestModal } from "@/components/PilotRequestModal";

export function DemoCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <div className="bg-white border-2 border-slate-200 rounded-xl p-8 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600 mb-4">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Preview Mode
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        This is a simplified preview
      </h3>

      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        The full Clinequal platform analyzes your actual trial data with comprehensive
        bias detection, correction recommendations, and regulatory-ready reporting.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto text-left">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-slate-700">Upload your trial data</span>
        </div>
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-slate-700">Regulatory-ready reports</span>
        </div>
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-slate-700">Real-time monitoring</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button size="lg" onClick={() => setIsModalOpen(true)}>
          Request a Pilot
        </Button>
        <Button href="/#contact" variant="outline" size="lg">
          Learn More
        </Button>
      </div>

      {/* Report Preview Teaser */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <p className="text-xs text-slate-500 mb-4">Sample output from the full platform:</p>
        <div className="bg-slate-50 rounded-lg p-4 max-w-sm mx-auto border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium text-sm text-slate-900">Bias Assessment Report</span>
            </div>
            <span className="text-xs text-slate-400">PDF</span>
          </div>
          <div className="space-y-2 text-left">
            <div className="h-2 bg-slate-200 rounded w-full" />
            <div className="h-2 bg-slate-200 rounded w-4/5" />
            <div className="h-2 bg-slate-200 rounded w-3/5" />
            <div className="flex gap-2 mt-3">
              <div className="h-8 bg-slate-200 rounded flex-1" />
              <div className="h-8 bg-slate-200 rounded flex-1" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            EMA/FDA-aligned documentation
          </p>
        </div>
      </div>
    </div>

    <PilotRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
