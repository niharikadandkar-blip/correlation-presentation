import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, HelpCircle, AlertTriangle, CheckCircle2, Footprints, CloudRain } from 'lucide-react';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';
import { RandomObjectsShoeRain } from '../Visuals/TopicIllustrations';
import { generateZeroCorrelationPoints } from '../../utils/math';

export const Slide09Zero: React.FC = () => {
  const [seedOffset, setSeedOffset] = useState<number>(1);

  // Generate zero correlation points based on seed offset
  const zeroPoints = React.useMemo(() => {
    return generateZeroCorrelationPoints(22, seedOffset);
  }, [seedOffset]);

  const handleShuffle = () => {
    setSeedOffset((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-4">
      {/* Slide Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E9E1FA] text-[#7C5CFC] border border-[#D5C4F7]">
            SLIDE 09 • ZERO CORRELATION
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Absence of Linear Association</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27334A] tracking-tight font-display">
              Zero Correlation (No Linear Link)
            </h2>
            <p className="text-sm text-[#27334A]/70 mt-1">
              Changes in one variable provide <strong>no predictable clue</strong> regarding changes in the other.
            </p>
          </div>
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-[#27334A] hover:bg-[#FFF8EF] shadow-sm transition-all active:scale-95"
            title="Randomize points to see another uncorrelated pattern"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Shuffle Data Points</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Random Scatter Plot + Conceptual & Caution Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left: Random Scatter Plot (Shoe size vs Rainfall) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                <span className="text-xs font-bold text-[#27334A]">Shoe Size (UK) vs. City Rainfall (mm)</span>
              </div>
              <span className="text-[11px] font-bold text-[#27334A] bg-[#E9E1FA] px-2.5 py-0.5 rounded-full border border-[#D5C4F7]">
                r ≈ 0.00
              </span>
            </div>

            <AnimatedScatterPlot
              data={zeroPoints}
              xLabel="Shoe Size"
              yLabel="Annual Rainfall"
              xUnit="UK"
              yUnit="mm"
              showTrendLine={false}
              colorScheme="sky"
              height={290}
              width={470}
            />
          </div>

          <div className="mt-2 p-2.5 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] flex items-center justify-between text-xs">
            <span className="text-[#27334A]/80 font-medium">
              Points are scattered randomly like a starry night sky without any line tilt.
            </span>
            <span className="text-[11px] text-[#38BDF8] font-bold">r ≈ 0</span>
          </div>
        </div>

        {/* Right: Artwork + Important Statistical Caution */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          
          {/* Artwork Card */}
          <div className="bg-white rounded-3xl p-3 border border-[#E2E8F0] shadow-soft flex items-center justify-around">
            <RandomObjectsShoeRain className="w-28 h-28" />
            <div className="text-left max-w-[190px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#38BDF8]">
                Absurd Relationship
              </span>
              <h4 className="font-extrabold text-xs text-[#27334A] mt-0.5">Shoe Size & Rain</h4>
              <p className="text-[11px] text-[#27334A]/70 leading-snug mt-1">
                A student's foot size has zero plausible influence on atmospheric monsoon clouds.
              </p>
            </div>
          </div>

          {/* Statistical Caveat Box (Crucial for first-year engineers!) */}
          <div className="bg-[#FFF8EF] rounded-3xl p-4 border border-[#FFE0D2] shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF7E67] uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Important Statistical Caveat</span>
              </div>
              
              <h4 className="text-xs font-extrabold text-[#27334A] mb-1">
                Zero Linear ≠ Zero Relationship!
              </h4>
              
              <p className="text-xs text-[#27334A]/85 leading-relaxed">
                Karl Pearson's correlation specifically tests for a <strong>linear</strong> (straight-line) association.
              </p>

              <div className="mt-2 p-2.5 rounded-xl bg-white border border-[#FFE0D2] text-[11px] text-[#27334A]/80">
                A dataset shaped like an inverted U (e.g. stress vs performance) or a circle can have <strong className="text-[#FF7E67]">r = 0</strong> even though a strong <em>non-linear</em> relationship exists!
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-2 text-[11px] text-[#27334A]/70 border-t border-[#FFE0D2]/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#97CAA1]" />
              <span>Always visually inspect scatter plots before concluding!</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

