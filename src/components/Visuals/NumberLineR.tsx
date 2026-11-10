import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedScatterPlot } from './AnimatedScatterPlot';
import { generateSyntheticPoints } from '../../utils/math';

export const NumberLineR: React.FC = () => {
  const [currentR, setCurrentR] = useState<number>(0.85);

  const presets = [
    { label: 'Perfect -1', value: -1.0, color: 'bg-[#FF7E67]' },
    { label: 'Strong -0.8', value: -0.8, color: 'bg-[#FFA788]' },
    { label: 'Moderate -0.5', value: -0.5, color: 'bg-[#FFE0D2]' },
    { label: 'Zero 0.0', value: 0.0, color: 'bg-[#E9E1FA]' },
    { label: 'Moderate +0.5', value: 0.5, color: 'bg-[#DDEFE1]' },
    { label: 'Strong +0.8', value: 0.8, color: 'bg-[#97CAA1]' },
    { label: 'Perfect +1', value: 1.0, color: 'bg-[#7C5CFC]' },
  ];

  const points = React.useMemo(() => {
    return generateSyntheticPoints(currentR, 20, 105);
  }, [currentR]);

  // Determine qualitative description
  const getInterpretation = (r: number) => {
    if (r === 1.0) {
      return {
        badge: 'Perfect Positive Linear',
        desc: 'All data points lie precisely on an upward straight line. As X increases, Y increases by a strictly proportional amount.',
        badgeColor: 'bg-[#7C5CFC] text-white',
      };
    }
    if (r === -1.0) {
      return {
        badge: 'Perfect Negative Linear',
        desc: 'All data points lie precisely on a downward straight line. As X increases, Y decreases in strict proportion.',
        badgeColor: 'bg-[#FF7E67] text-white',
      };
    }
    if (Math.abs(r) < 0.1) {
      return {
        badge: 'Zero / Negligible Linear',
        desc: 'Points are scattered without any clear straight-line pattern. Knowing X gives no linear prediction for Y.',
        badgeColor: 'bg-[#E9E1FA] text-[#27334A]',
      };
    }
    if (r > 0) {
      if (r >= 0.7) {
        return {
          badge: `Strong Positive (r = ${r.toFixed(2)})`,
          desc: 'Points cluster tightly along an upward sloping trend line. High values of X strongly accompany high values of Y.',
          badgeColor: 'bg-[#97CAA1] text-[#27334A]',
        };
      }
      return {
        badge: `Moderate Positive (r = ${r.toFixed(2)})`,
        desc: 'Points show a noticeable upward trend, with moderate spread or scatter around the line.',
        badgeColor: 'bg-[#DDEFE1] text-[#27334A]',
      };
    } else {
      if (r <= -0.7) {
        return {
          badge: `Strong Negative (r = ${r.toFixed(2)})`,
          desc: 'Points cluster tightly along a downward sloping line. High values of X strongly accompany lower values of Y.',
          badgeColor: 'bg-[#FF8A75] text-white',
        };
      }
      return {
        badge: `Moderate Negative (r = ${r.toFixed(2)})`,
        desc: 'Points show a distinct downward trend with noticeable dispersion.',
        badgeColor: 'bg-[#FFE0D2] text-[#27334A]',
      };
    }
  };

  const interpretation = getInterpretation(currentR);
  // Calculate slider percentage position: (-1 -> 0%, 0 -> 50%, +1 -> 100%)
  const percentage = ((currentR + 1) / 2) * 100;

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 items-center">
      {/* Interactive Controls & Number Line */}
      <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
        {/* Current Value Display */}
        <div className="flex items-center justify-between bg-white/90 p-4 rounded-2xl border border-[#E2E8F0] shadow-soft">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#27334A]/60">Correlation Coefficient</span>
            <div className="text-3xl font-extrabold text-[#27334A] tracking-tight">
              r = <span className={currentR > 0 ? 'text-[#7C5CFC]' : currentR < 0 ? 'text-[#FF7E67]' : 'text-slate-600'}>
                {currentR >= 0 ? `+${currentR.toFixed(2)}` : currentR.toFixed(2)}
              </span>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${interpretation.badgeColor}`}>
            {interpretation.badge}
          </span>
        </div>

        {/* Number Line Visual Track */}
        <div className="bg-white/90 p-5 rounded-2xl border border-[#E2E8F0] shadow-soft space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-[#27334A]/70">
            <span className="text-[#FF7E67] font-bold">-1.0 (Perfect -)</span>
            <span className="text-slate-500 font-bold">0.0 (None)</span>
            <span className="text-[#7C5CFC] font-bold">+1.0 (Perfect +)</span>
          </div>

          {/* Interactive slider gradient track */}
          <div className="relative py-2">
            <div className="h-4 rounded-full bg-gradient-to-r from-[#FF7E67] via-[#FFE0D2] via-50%-[#E9E1FA] via-70%-[#DDEFE1] to-[#7C5CFC] shadow-inner relative">
              {/* Center Zero tick */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#27334A]/50 -translate-x-1/2" />
            </div>

            {/* Range input element */}
            <input
              type="range"
              min="-1"
              max="1"
              step="0.05"
              value={currentR}
              onChange={(e) => setCurrentR(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {/* Animated marker pill */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none w-7 h-7 rounded-full bg-white border-2 border-[#27334A] shadow-md flex items-center justify-center font-bold text-[10px] text-[#27334A]"
              animate={{ left: `${percentage}%` }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              r
            </motion.div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => setCurrentR(p.value)}
                className={`text-[11px] font-semibold px-2 py-1 rounded-lg border transition-all ${
                  Math.abs(currentR - p.value) < 0.04
                    ? 'border-[#27334A] shadow-sm font-bold scale-105 bg-white text-[#27334A] ring-1 ring-[#27334A]'
                    : 'border-transparent text-[#27334A]/70 hover:bg-[#FFF8EF]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Educational Explanation */}
        <div className="bg-[#FFF8EF] p-4 rounded-2xl border border-[#FFE0D2] shadow-sm text-sm">
          <div className="font-semibold text-xs text-[#FF7E67] uppercase tracking-wider mb-1">
            Real-Time Statistical Interpretation
          </div>
          <p className="text-xs text-[#27334A]/85 leading-relaxed font-normal">
            {interpretation.desc}
          </p>
        </div>
      </div>

      {/* Synchronized Live Scatter Plot */}
      <div className="w-full md:w-1/2 bg-white/90 p-4 rounded-2xl border border-[#E2E8F0] shadow-soft flex flex-col items-center">
        <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]/70">
          <span className="text-xs font-semibold text-[#27334A]/70">Dynamic Point Arrangement</span>
          <span className="text-xs font-bold text-[#7C5CFC]">N = 20 simulated points</span>
        </div>
        <AnimatedScatterPlot
          data={points}
          xLabel="Variable X"
          yLabel="Variable Y"
          showTrendLine={Math.abs(currentR) > 0.05}
          colorScheme={currentR < 0 ? 'coral' : currentR > 0 ? 'violet' : 'sky'}
          height={260}
          width={400}
          interactive={true}
        />
      </div>
    </div>
  );
};

