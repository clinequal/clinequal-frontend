"use client";

import type { RadarAxis } from "@/lib/demo";

interface RadarChartProps {
  axes: RadarAxis[];
  trialLabel?: string;
  benchmarkLabel?: string;
  size?: number;
}

function getPoint(
  cx: number,
  cy: number,
  radius: number,
  index: number,
  total: number
): [number, number] {
  // Start from top (-90°) and go clockwise
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}

function polygonPoints(
  cx: number,
  cy: number,
  radius: number,
  values: number[],
  maxValue: number
): string {
  return values
    .map((v, i) => {
      const r = (v / maxValue) * radius;
      const [x, y] = getPoint(cx, cy, r, i, values.length);
      return `${x},${y}`;
    })
    .join(" ");
}

function gridPolygon(
  cx: number,
  cy: number,
  radius: number,
  sides: number
): string {
  return Array.from({ length: sides })
    .map((_, i) => {
      const [x, y] = getPoint(cx, cy, radius, i, sides);
      return `${x},${y}`;
    })
    .join(" ");
}

function scoreColor(score: number): string {
  if (score >= 70) return "#22c55e"; // green-500
  if (score >= 50) return "#f59e0b"; // amber-500
  return "#ef4444"; // red-500
}

export function RadarChart({
  axes,
  trialLabel = "This Trial",
  benchmarkLabel = "Target",
  size = 300,
}: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;
  const n = axes.length;
  const maxValue = 100;
  const gridLevels = [20, 40, 60, 80, 100];
  const labelOffset = size * 0.46;

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="max-w-full h-auto"
      >
        {/* Grid rings */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={gridPolygon(cx, cy, (level / maxValue) * radius, n)}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={level === 100 ? 1 : 0.5}
          />
        ))}

        {/* Axis lines */}
        {axes.map((_, i) => {
          const [x, y] = getPoint(cx, cy, radius, i, n);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Benchmark polygon */}
        <polygon
          points={polygonPoints(cx, cy, radius, axes.map((a) => a.benchmark), maxValue)}
          fill="none"
          stroke="#94a3b8"
          strokeWidth={1.5}
          strokeDasharray="6 3"
          opacity={0.7}
        />

        {/* Trial polygon */}
        <polygon
          points={polygonPoints(cx, cy, radius, axes.map((a) => a.trial), maxValue)}
          fill="hsl(var(--primary))"
          fillOpacity={0.15}
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />

        {/* Trial data points */}
        {axes.map((axis, i) => {
          const r = (axis.trial / maxValue) * radius;
          const [x, y] = getPoint(cx, cy, r, i, n);
          return (
            <circle
              key={axis.key}
              cx={x}
              cy={y}
              r={4}
              fill={scoreColor(axis.trial)}
              stroke="white"
              strokeWidth={1.5}
            />
          );
        })}

        {/* Axis labels */}
        {axes.map((axis, i) => {
          const [x, y] = getPoint(cx, cy, labelOffset, i, n);
          const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
          const isLeft = Math.cos(angle) < -0.1;
          const isRight = Math.cos(angle) > 0.1;

          return (
            <text
              key={axis.key}
              x={x}
              y={y}
              textAnchor={isLeft ? "end" : isRight ? "start" : "middle"}
              dominantBaseline={Math.sin(angle) < -0.1 ? "auto" : Math.sin(angle) > 0.1 ? "hanging" : "central"}
              className="fill-slate-600"
              fontSize={11}
              fontWeight={500}
            >
              {axis.label}
            </text>
          );
        })}

        {/* Score labels on data points */}
        {axes.map((axis, i) => {
          const r = (axis.trial / maxValue) * radius;
          const [x, y] = getPoint(cx, cy, r, i, n);
          return (
            <text
              key={`score-${axis.key}`}
              x={x}
              y={y - 10}
              textAnchor="middle"
              fontSize={9}
              fontWeight={600}
              className="fill-slate-700"
            >
              {axis.trial}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-primary" />
          <span className="text-slate-600">{trialLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 border-t-2 border-dashed border-slate-400" />
          <span className="text-slate-600">{benchmarkLabel}</span>
        </div>
      </div>

      {/* Score key */}
      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Good (70+)
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          Concern (50-69)
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Risk (&lt;50)
        </div>
      </div>
    </div>
  );
}
