"use client";

import { useEffect, useState } from "react";

interface Patient {
  id: string;
  incomeLevel: "Low" | "Middle" | "High";
  weeksInStudy: number;
  completed: boolean;
}

interface PatientJourneyProps {
  patients: Patient[];
  maxWeeks?: number;
}

const incomeColors = {
  Low: { bg: "bg-red-100", dot: "bg-red-500", text: "text-red-700" },
  Middle: { bg: "bg-amber-100", dot: "bg-amber-500", text: "text-amber-700" },
  High: { bg: "bg-green-100", dot: "bg-green-500", text: "text-green-700" },
};

export function PatientJourney({ patients, maxWeeks = 12 }: PatientJourneyProps) {
  const [animationWeek, setAnimationWeek] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationWeek((prev) => {
        if (prev >= maxWeeks) {
          clearInterval(interval);
          return maxWeeks;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [maxWeeks]);

  // Sort patients: completed first, then by dropout week
  const sortedPatients = [...patients].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return b.weeksInStudy - a.weeksInStudy;
  });

  // Calculate stats at current animation week
  const statsAtWeek = sortedPatients.reduce(
    (acc, p) => {
      const stillIn = p.weeksInStudy > animationWeek || (p.completed && animationWeek <= maxWeeks);
      if (stillIn || p.completed) {
        acc.remaining++;
      }
      if (!p.completed && p.weeksInStudy <= animationWeek) {
        acc.dropped++;
        acc[`dropped${p.incomeLevel}`]++;
      }
      return acc;
    },
    { remaining: 0, dropped: 0, droppedLow: 0, droppedMiddle: 0, droppedHigh: 0 }
  );

  return (
    <div>
      {/* Week indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-700">
            Week {animationWeek} of {maxWeeks}
          </span>
          <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(animationWeek / maxWeeks) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-sm">
          <span className="text-slate-500">Dropped: </span>
          <span className="font-medium text-red-600">{statsAtWeek.dropped}</span>
          <span className="text-slate-400"> / {patients.length}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        <span className="text-slate-500">Income level:</span>
        {(["High", "Middle", "Low"] as const).map((level) => (
          <div key={level} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${incomeColors[level].dot}`} />
            <span className="text-slate-600">{level}</span>
          </div>
        ))}
      </div>

      {/* Patient timelines */}
      <div className="space-y-1.5 max-h-80 overflow-y-auto pr-2">
        {sortedPatients.map((patient) => {
          const colors = incomeColors[patient.incomeLevel];
          const droppedAtWeek = !patient.completed ? patient.weeksInStudy : null;
          const isDroppedNow = droppedAtWeek !== null && droppedAtWeek <= animationWeek;

          return (
            <div key={patient.id} className="flex items-center gap-2 group">
              {/* Patient ID */}
              <span className="text-xs text-slate-400 w-10 shrink-0">
                {patient.id.slice(0, 4)}
              </span>

              {/* Timeline */}
              <div className="flex-1 flex items-center h-5 relative">
                {/* Background track */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                  <div className="w-full h-0.5 bg-slate-200" />
                </div>

                {/* Progress line */}
                <div
                  className={`absolute inset-y-0 left-0 flex items-center transition-all duration-300`}
                  style={{
                    width: `${(Math.min(patient.weeksInStudy, animationWeek) / maxWeeks) * 100}%`,
                  }}
                >
                  <div
                    className={`w-full h-1 rounded-full ${
                      isDroppedNow ? "bg-slate-300" : colors.dot
                    }`}
                  />
                </div>

                {/* End marker */}
                {animationWeek >= (droppedAtWeek || maxWeeks) && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{
                      left: `${((droppedAtWeek || maxWeeks) / maxWeeks) * 100}%`,
                    }}
                  >
                    {patient.completed ? (
                      <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    ) : (
                      <span className="text-red-500 text-xs">✕</span>
                    )}
                  </div>
                )}
              </div>

              {/* Status */}
              <span
                className={`text-xs w-16 text-right shrink-0 ${
                  isDroppedNow ? "text-red-500" : "text-slate-400"
                }`}
              >
                {isDroppedNow
                  ? `W${droppedAtWeek}`
                  : patient.completed && animationWeek >= maxWeeks
                    ? "Done"
                    : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {animationWeek >= maxWeeks && (
        <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Low income dropouts:</span>
            <span className="font-medium text-red-600">
              {statsAtWeek.droppedLow} patients
            </span>
          </div>
          <div className="flex justify-between text-slate-600 mt-1">
            <span>High income dropouts:</span>
            <span className="font-medium text-green-600">
              {statsAtWeek.droppedHigh} patients
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
