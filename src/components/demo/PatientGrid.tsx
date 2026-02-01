"use client";

import { useEffect, useState } from "react";

interface PatientGridProps {
  maleCount: number;
  femaleCount: number;
  animateOnView?: boolean;
}

export function PatientGrid({
  maleCount,
  femaleCount,
  animateOnView = true,
}: PatientGridProps) {
  const total = maleCount + femaleCount;
  const [visibleCount, setVisibleCount] = useState(animateOnView ? 0 : total);

  // Create array of patients, shuffled but deterministic
  const patients = [];
  for (let i = 0; i < maleCount; i++) {
    patients.push({ id: i, gender: "male" as const });
  }
  for (let i = 0; i < femaleCount; i++) {
    patients.push({ id: maleCount + i, gender: "female" as const });
  }

  // Simple shuffle using seed for consistency
  const shuffled = [...patients].sort((a, b) => {
    const hashA = (a.id * 2654435761) % total;
    const hashB = (b.id * 2654435761) % total;
    return hashA - hashB;
  });

  useEffect(() => {
    if (!animateOnView) return;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= total) {
          clearInterval(interval);
          return total;
        }
        return Math.min(prev + Math.ceil(total / 50), total);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [animateOnView, total]);

  // Calculate running totals
  const visiblePatients = shuffled.slice(0, visibleCount);
  const visibleMale = visiblePatients.filter((p) => p.gender === "male").length;
  const visibleFemale = visiblePatients.filter((p) => p.gender === "female").length;

  return (
    <div>
      {/* Legend and Counter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sky-500" />
            <span className="text-slate-600">Male</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500" />
            <span className="text-slate-600">Female</span>
          </div>
        </div>

        <div className="text-sm font-medium">
          <span className="text-sky-600">{visibleMale}</span>
          <span className="text-slate-400 mx-1">/</span>
          <span className="text-pink-600">{visibleFemale}</span>
          <span className="text-slate-400 ml-2">
            ({((visibleMale / (visibleMale + visibleFemale || 1)) * 100).toFixed(0)}% male)
          </span>
        </div>
      </div>

      {/* Patient Grid */}
      <div className="bg-slate-50 rounded-xl p-4 overflow-hidden">
        <div className="flex flex-wrap gap-1">
          {shuffled.map((patient, index) => (
            <div
              key={patient.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index < visibleCount
                  ? patient.gender === "male"
                    ? "bg-sky-500"
                    : "bg-pink-500"
                  : "bg-slate-200"
              }`}
              style={{
                opacity: index < visibleCount ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 text-center text-sm text-slate-500">
        {visibleCount >= total ? (
          <span>
            Each dot represents one patient in the dataset.{" "}
            <strong className="text-slate-700">
              {((femaleCount / total) * 100).toFixed(0)}% are female
            </strong>{" "}
            — expected ~43% based on disease epidemiology.
          </span>
        ) : (
          <span>Loading patients...</span>
        )}
      </div>
    </div>
  );
}
