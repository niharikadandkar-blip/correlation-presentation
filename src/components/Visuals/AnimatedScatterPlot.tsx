import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataPoint } from '../../types/presentation';
import { calculateCorrelation } from '../../utils/math';

interface ScatterPlotProps {
  data: DataPoint[];
  selectedPointId?: number | null;
  onSelectPoint?: (point: DataPoint | null) => void;
  xLabel?: string;
  yLabel?: string;
  xUnit?: string;
  yUnit?: string;
  showTrendLine?: boolean;
  colorScheme?: 'coral' | 'violet' | 'teal' | 'sky' | 'mixed';
  height?: number;
  width?: number;
  interactive?: boolean;
  minDomainX?: number;
  maxDomainX?: number;
  minDomainY?: number;
  maxDomainY?: number;
}

export const AnimatedScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  selectedPointId = null,
  onSelectPoint,
  xLabel = 'X Variable',
  yLabel = 'Y Variable',
  xUnit = '',
  yUnit = '',
  showTrendLine = true,
  colorScheme = 'coral',
  height = 360,
  width = 540,
  interactive = true,
  minDomainX,
  maxDomainX,
  minDomainY,
  maxDomainY,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  // Determine domain bounds
  const xValues = data.map((d) => d.x);
  const yValues = data.map((d) => d.y);

  const rawMinX = minDomainX ?? (xValues.length > 0 ? Math.min(...xValues) : 0);
  const rawMaxX = maxDomainX ?? (xValues.length > 0 ? Math.max(...xValues) : 100);
  const rawMinY = minDomainY ?? (yValues.length > 0 ? Math.min(...yValues) : 0);
  const rawMaxY = maxDomainY ?? (yValues.length > 0 ? Math.max(...yValues) : 100);

  // Add 12% padding to domains so dots aren't on border edges
  const paddingX = Math.max(2, (rawMaxX - rawMinX) * 0.12);
  const paddingY = Math.max(2, (rawMaxY - rawMinY) * 0.12);

  const minX = Math.floor(rawMinX - paddingX);
  const maxX = Math.ceil(rawMaxX + paddingX);
  const minY = Math.floor(rawMinY - paddingY);
  const maxY = Math.ceil(rawMaxY + paddingY);

  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  // SVG coordinate transformation
  const padLeft = 65;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 55;

  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;

  const scaleX = (val: number) => padLeft + ((val - minX) / rangeX) * plotWidth;
  const scaleY = (val: number) => padTop + plotHeight - ((val - minY) / rangeY) * plotHeight;

  // Grid tick marks
  const xTicks = 5;
  const yTicks = 5;
  const xTickValues = Array.from({ length: xTicks }, (_, i) => Math.round(minX + (i * rangeX) / (xTicks - 1)));
  const yTickValues = Array.from({ length: yTicks }, (_, i) => Math.round(minY + (i * rangeY) / (yTicks - 1)));

  // Regression line calculation
  const stats = calculateCorrelation(data);
  const lineP1 = { x: minX, y: stats.slope * minX + stats.intercept };
  const lineP2 = { x: maxX, y: stats.slope * maxX + stats.intercept };

  const colorMap = {
    coral: { fill: '#FF7E67', stroke: '#E85338', glow: 'rgba(255, 126, 103, 0.4)' },
    violet: { fill: '#7C5CFC', stroke: '#5F39EA', glow: 'rgba(124, 92, 252, 0.4)' },
    teal: { fill: '#2DD4BF', stroke: '#0F766E', glow: 'rgba(45, 212, 191, 0.4)' },
    sky: { fill: '#38BDF8', stroke: '#0284C7', glow: 'rgba(56, 189, 248, 0.4)' },
    mixed: { fill: '#FF7E67', stroke: '#7C5CFC', glow: 'rgba(255, 126, 103, 0.3)' },
  };

  const currentTheme = colorMap[colorScheme];

  return (
    <div className="relative w-full max-w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto max-h-[460px] overflow-visible"
      >
        <defs>
          <linearGradient id="plotBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFDF9" stopOpacity="0.9" />
          </linearGradient>
          <filter id="pointGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={currentTheme.fill} floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Plot area background */}
        <rect
          x={padLeft}
          y={padTop}
          width={plotWidth}
          height={plotHeight}
          rx="12"
          fill="url(#plotBgGrad)"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />

        {/* Grid lines horizontal */}
        {yTickValues.map((val, idx) => {
          const y = scaleY(val);
          return (
            <g key={`y-grid-${idx}`}>
              <line
                x1={padLeft}
                y1={y}
                x2={padLeft + plotWidth}
                y2={y}
                stroke="#E2E8F0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={padLeft - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-[#27334A]/70 text-[11px] font-medium"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Grid lines vertical */}
        {xTickValues.map((val, idx) => {
          const x = scaleX(val);
          return (
            <g key={`x-grid-${idx}`}>
              <line
                x1={x}
                y1={padTop}
                x2={x}
                y2={padTop + plotHeight}
                stroke="#E2E8F0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={x}
                y={padTop + plotHeight + 20}
                textAnchor="middle"
                className="fill-[#27334A]/70 text-[11px] font-medium"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Axis Labels */}
        <text
          x={padLeft + plotWidth / 2}
          y={padTop + plotHeight + 42}
          textAnchor="middle"
          className="fill-[#27334A] text-[13px] font-semibold tracking-wide"
        >
          {xLabel} {xUnit ? `(${xUnit})` : ''} →
        </text>

        <text
          x={20}
          y={padTop + plotHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90, 20, ${padTop + plotHeight / 2})`}
          className="fill-[#27334A] text-[13px] font-semibold tracking-wide"
        >
          {yLabel} {yUnit ? `(${yUnit})` : ''} →
        </text>

        {/* Trend / Best-Fit line (if enabled and at least 2 points) */}
        {showTrendLine && data.length >= 2 && Math.abs(stats.r) >= 0.1 && (
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            x1={scaleX(lineP1.x)}
            y1={scaleY(lineP1.y)}
            x2={scaleX(lineP2.x)}
            y2={scaleY(lineP2.y)}
            stroke={stats.slope > 0 ? '#FF7E67' : '#7C5CFC'}
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
        )}

        {/* Plotted Data Points */}
        <AnimatePresence>
          {data.map((point, index) => {
            const cx = scaleX(point.x);
            const cy = scaleY(point.y);
            const isSelected = selectedPointId === point.id;
            const isHovered = hoveredPoint?.id === point.id;

            return (
              <g key={point.id} className={interactive ? 'cursor-pointer' : ''}>
                {/* Active selection ripple ring */}
                {isSelected && (
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r={18}
                    fill="none"
                    stroke="#FF7E67"
                    strokeWidth="2"
                    initial={{ scale: 0.6, opacity: 0.2 }}
                    animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0.4, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  />
                )}

                {/* Point dot with hover and spring animation */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 9 : isHovered ? 8 : 6.5}
                  fill={
                    isSelected
                      ? '#FF7E67'
                      : colorScheme === 'mixed'
                      ? index % 2 === 0
                        ? '#FF7E67'
                        : '#7C5CFC'
                      : currentTheme.fill
                  }
                  stroke={isSelected ? '#FFFFFF' : '#FFFFFF'}
                  strokeWidth={2}
                  filter={isSelected || isHovered ? 'url(#pointGlow)' : undefined}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 340,
                    damping: 20,
                    delay: Math.min(0.4, index * 0.04),
                  }}
                  whileHover={{ scale: 1.35 }}
                  onClick={() => {
                    if (interactive && onSelectPoint) {
                      onSelectPoint(isSelected ? null : point);
                    }
                  }}
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* Observation number tag inside point when selected */}
                {isSelected && (
                  <text
                    x={cx}
                    y={cy - 14}
                    textAnchor="middle"
                    className="fill-[#27334A] text-[11px] font-bold"
                  >
                    #{point.id}
                  </text>
                )}
              </g>
            );
          })}
        </AnimatePresence>
      </svg>

      {/* Floating Hover Tooltip */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 pointer-events-none px-3 py-1.5 rounded-lg bg-[#27334A] text-white text-xs shadow-md border border-white/20 whitespace-nowrap"
            style={{
              left: `${Math.max(10, Math.min(plotWidth + padLeft - 60, scaleX(hoveredPoint.x) - 40))}px`,
              top: `${Math.max(10, scaleY(hoveredPoint.y) - 45)}px`,
            }}
          >
            <div className="font-semibold text-[#FFE0D2]">Observation #{hoveredPoint.id}</div>
            <div>
              {xLabel}: <span className="font-bold text-white">{hoveredPoint.x}</span> {xUnit}
            </div>
            <div>
              {yLabel}: <span className="font-bold text-white">{hoveredPoint.y}</span> {yUnit}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

