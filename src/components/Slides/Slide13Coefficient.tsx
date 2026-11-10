import React from 'react';
import { motion } from 'framer-motion';
import { NumberLineR } from '../Visuals/NumberLineR';

export const Slide13Coefficient: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-3">
      {/* Slide Header */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E9E1FA] text-[#7C5CFC] border border-[#D5C4F7]">
            SLIDE 13 • COEFFICIENT OF CORRELATION (r)
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Standardized Scale</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
              The Correlation Coefficient: Standardized Metric (r)
            </h2>
            <p className="text-xs sm:text-sm text-[#27334A]/70 mt-0.5">
              Quantifying both direction (+ or -) and strength on a universal continuum from <strong>-1.0 to +1.0</strong>.
            </p>
          </div>

          <div className="bg-white px-3 py-1.5 rounded-2xl border border-[#E2E8F0] shadow-sm text-xs font-bold text-[#27334A] flex items-center gap-2">
            <span>Range:</span>
            <span className="text-base text-[#7C5CFC] font-extrabold">-1 ≤ r ≤ +1</span>
          </div>
        </div>
      </div>

      {/* Interactive Number Line & Synchronized Scatter Plot Component */}
      <div className="flex-1 flex flex-col justify-center">
        <NumberLineR />
      </div>

      {/* Bottom pedagogical footnote */}
      <div className="mt-3 p-2 bg-white/70 rounded-xl border border-[#E2E8F0] text-[11px] text-[#27334A]/70 text-center">
        💡 Drag the slider or click the presets above to watch the simulated points adjust their slope and clustering live.
      </div>
    </div>
  );
};

