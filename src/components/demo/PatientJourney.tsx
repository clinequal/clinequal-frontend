"use client";

import { useEffect, useState, useCallback } from "react";

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
  Low: { bg: "bg-red-100 dark:bg-red-900/30", dot: "bg-red-500", text: "text-red-700 dark:text-red-400" },
  Middle: { bg: "bg-amber-100 dark:bg-amber-900/30", dot: "bg-amber-500", text: "text-amber-700 dark:text-amber-400" },
  High: { bg: "bg-green-100 dark:bg-green-900/30", dot: "bg-green-500", text: "text-green-700 dark:text-green-400" },
};

export function PatientJourney({ patients, maxWeeks = 12 }: PatientJourneyProps) {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePrevWeek = useCallback(() => {
    setCurrentWeek((prev) => Math.max(0, prev - 1));
    setIsPlaying(false);
  }, []);

  const handleNextWeek = useCallback(() => {
    setCurrentWeek((prev) => Math.min(maxWeeks, prev + 1));
    setIsPlaying(false);
  }, [maxWeeks]);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWeek(Number(e.target.value));
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (currentWeek >= maxWeeks) {
      setCurrentWeek(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [currentWeek, maxWeeks]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentWeek((prev) => {
        if (prev >= maxWeeks) {
          setIsPlaying(false);
          return maxWeeks;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isPlaying, maxWeeks]);

  const animationWeek = currentWeek;

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
      {/* Week controls */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        {/* Play/Pause */}
        <button
          onClick={togglePlayPause}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Prev */}
        <button
          onClick={handlePrevWeek}
          disabled={currentWeek === 0}
          className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous week"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Slider */}
        <div className="flex-1 flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={maxWeeks}
            value={currentWeek}
            onChange={handleSliderChange}
            className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-24 text-right">
            Week {currentWeek} / {maxWeeks}
          </span>
        </div>

        {/* Next */}
        <button
          onClick={handleNextWeek}
          disabled={currentWeek === maxWeeks}
          className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next week"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">
          <span className="text-slate-500 dark:text-slate-400">Dropped: </span>
          <span className="font-medium text-red-600 dark:text-red-400">{statsAtWeek.dropped}</span>
          <span className="text-slate-400"> / {patients.length}</span>
        </div>
        <div className="text-sm">
          <span className="text-slate-500 dark:text-slate-400">Remaining: </span>
          <span className="font-medium text-green-600 dark:text-green-400">{statsAtWeek.remaining}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        <span className="text-slate-500 dark:text-slate-400">Income level:</span>
        {(["High", "Middle", "Low"] as const).map((level) => (
          <div key={level} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${incomeColors[level].dot}`} />
            <span className="text-slate-600 dark:text-slate-300">{level}</span>
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
              <span className="text-xs text-slate-400 dark:text-slate-500 w-10 shrink-0">
                {patient.id.slice(0, 4)}
              </span>

              {/* Timeline */}
              <div className="flex-1 flex items-center h-5 relative">
                {/* Background track */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                  <div className="w-full h-0.5 bg-slate-200 dark:bg-slate-700" />
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
                      isDroppedNow ? "bg-slate-300 dark:bg-slate-600" : colors.dot
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
        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-sm">
          <div className="flex justify-between text-slate-600 dark:text-slate-300">
            <span>Low income dropouts:</span>
            <span className="font-medium text-red-600 dark:text-red-400">
              {statsAtWeek.droppedLow} patients
            </span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-300 mt-1">
            <span>High income dropouts:</span>
            <span className="font-medium text-green-600 dark:text-green-400">
              {statsAtWeek.droppedHigh} patients
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
