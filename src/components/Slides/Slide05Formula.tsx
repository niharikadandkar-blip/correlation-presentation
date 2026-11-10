import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import { PastelCard } from '../Visuals/PastelCard';
import { generateSyntheticPoints } from '../../utils/math';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';

export const Slide05Formula: React.FC = () => {
  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);
  const [sliderR, setSliderR] = useState<number>(0.85);

  const symbols = [
    { sym: 'r', meaning: 'Karl Pearson correlation coefficient' },
    { sym: 'n', meaning: 'Total number of paired observations' },
    { sym: 'X, Y', meaning: 'The two observed variables' },
    { sym: 'ΣX, ΣY', meaning: 'Sum of all X values and Y values' },
    { sym: 'ΣXY', meaning: 'Sum of products of paired X and Y values' },
    { sym: 'ΣX², ΣY²', meaning: 'Sum of squares of X values and Y values' },
  ];

  const simulatedPoints = React.useMemo(() => {
    return generateSyntheticPoints(sliderR, 16, 88);
  }, [sliderR]);

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-3 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCEBFA] text-[#7C5CFC]">
            SLIDE 05 • MATHEMATICAL FORMULA
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Karl Pearson's Direct Method</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
          Formula & The Correlation Coefficient (r)
        </h2>
        <p className="text-xs sm:text-sm text-[#27334A]/70 mt-0.5">
          The standardized mathematical metric for bivariate linear co-variation.
        </p>
      </div>

      {/* Main Grid: Formula & Symbols on Left, Interactive Scale & Mini Scatter on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Left: Formula Card + Symbols Table */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5">
          {/* Formula Display Box */}
          <div className="bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-soft">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C5CFC] block mb-2">
              Karl Pearson's Bivariate Formula
            </span>
            <div className="bg-[#FFF8EF] p-3 rounded-2xl border border-[#FFE0D2] text-center overflow-x-auto">
              <div className="inline-block text-sm sm:text-base font-extrabold text-[#27334A] font-mono tracking-wide">
                r = <span className="inline-block align-middle text-center mx-1">
                  <span className="block border-b-2 border-[#27334A] pb-0.5 px-2 text-[#7C5CFC]">
                    nΣXY − (ΣX)(ΣY)
                  </span>
                  <span className="block pt-0.5 px-2 text-[#FF7E67]">
                    √&#123;[nΣX² − (ΣX)²][nΣY² − (ΣY)²]&#125;
                  </span>
                </span>
              </div>
            </div>

            {/* Core Properties */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-2.5 text-center text-[10px] font-semibold text-[#27334A]">
              <div className="p-1.5 rounded-xl bg-[#E9E1FA]/50 border border-[#D5C4F7]">
                <strong className="text-[#7C5CFC] block">-1 ≤ r ≤ +1</strong>
                Strict bounds
              </div>
              <div className="p-1.5 rounded-xl bg-[#DDEFE1]/50 border border-[#BDDEC4]">
                <strong className="text-[#97CAA1] block">No Units</strong>
                Pure ratio
              </div>
              <div className="p-1.5 rounded-xl bg-[#FFE0D2]/50 border border-[#FFC8B3]">
                <strong className="text-[#FF7E67] block">Sign (+ / -)</strong>
                Direction
              </div>
              <div className="p-1.5 rounded-xl bg-[#DCEBFA]/50 border border-[#B8D8F7]">
                <strong className="text-[#38BDF8] block">Magnitude</strong>
                Strength
              </div>
            </div>
          </div>

          {/* Meaning of Symbols Table */}
          <div className="bg-white rounded-3xl p-3 border border-[#E2E8F0] shadow-soft">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#27334A]/70 block mb-1.5">
              Meaning of Symbols
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
              {symbols.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveSymbol(item.sym)}
                  className={`p-1.5 px-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    activeSymbol === item.sym
                      ? 'bg-[#E9E1FA] border-[#7C5CFC] font-bold text-[#7C5CFC]'
                      : 'bg-[#FFF8EF]/50 hover:bg-[#FFF8EF] border-[#FFE0D2]/60 text-[#27334A]'
                  }`}
                >
                  <span className="font-mono font-bold text-[#7C5CFC]">{item.sym}</span>
                  <span className="text-[11px] text-[#27334A]/80 text-right">{item.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive Scale Slider + Dynamic Preview Graph */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#27334A]">Interactive 'r' Scale</span>
              <span className="text-[10px] font-bold text-[#7C5CFC] bg-[#E9E1FA] px-2 py-0.5 rounded-full">
                Drag to inspect
              </span>
            </div>

            {/* Slider readout */}
            <div className="flex items-center justify-between bg-[#FFF8EF] p-2 rounded-xl border border-[#FFE0D2] mb-2">
              <span className="text-xs font-bold text-[#27334A]/80">Current r:</span>
              <span className="text-base font-extrabold text-[#7C5CFC]">
                {sliderR >= 0 ? `+${sliderR.toFixed(2)}` : sliderR.toFixed(2)}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                sliderR > 0.3 ? 'bg-[#DDEFE1] text-[#27334A]' : sliderR < -0.3 ? 'bg-[#FFE0D2] text-[#27334A]' : 'bg-[#E9E1FA] text-[#27334A]'
              }`}>
                {sliderR > 0.7 ? 'Strong Positive' : sliderR < -0.7 ? 'Strong Negative' : Math.abs(sliderR) <= 0.1 ? 'Zero / None' : sliderR > 0 ? 'Moderate Positive' : 'Moderate Negative'}
              </span>
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min="-1"
              max="1"
              step="0.05"
              value={sliderR}
              onChange={(e) => setSliderR(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#DCEBFA] rounded-lg appearance-none cursor-pointer accent-[#7C5CFC] mb-2"
            />

            {/* Miniature Dynamic Scatter Plot */}
            <AnimatedScatterPlot
              data={simulatedPoints}
              xLabel="Variable X"
              yLabel="Variable Y"
              showTrendLine={Math.abs(sliderR) >= 0.1}
              colorScheme={sliderR >= 0 ? 'coral' : 'violet'}
              height={180}
              width={340}
              interactive={false}
            />
          </div>

          <div className="p-2 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] text-[10px] text-[#27334A]/80 mt-1">
            *Demonstration illustrative slider: shows how linear alignment tightens as r approaches ±1.0.
          </div>
        </div>

      </div>
    </div>
  );
};

