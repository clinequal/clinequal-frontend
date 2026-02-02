"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface PilotRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  company: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
};

export function PilotRequestModal({ isOpen, onClose }: PilotRequestModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/pilot-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setStatus("success");
      setFormData(initialFormData);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email us directly.");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Request Received</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Thank you for your interest in Clinequal. We&apos;ll be in touch within 24 hours.
              </p>
              <Button onClick={handleClose}>Close</Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Request a Pilot</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Tell us about your trial and we&apos;ll set up a personalized pilot program.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Company name (optional)"
                  />
                </div>

                {status === "error" && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                    {errorMessage}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    * Required fields
                  </p>
                  <Button type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </form>

              <p className="text-xs text-slate-400 mt-4 text-center">
                Or email us directly at{" "}
                <a href="mailto:info@clinequal.com" className="text-primary hover:underline">
                  info@clinequal.com
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
