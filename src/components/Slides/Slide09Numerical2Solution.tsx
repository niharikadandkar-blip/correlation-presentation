import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, CheckCircle2, ArrowRightLeft } from 'lucide-react';

export const Slide09Numerical2Solution: React.FC = () => {
  const [stepIndex, setStepIndex] = useState<number>(3);

  const tableData = [
    { journey: 'A', x: 20, y: 5.0, x2: 400, y2: 25.00, xy: 100 },
    { journey: 'B', x: 25, y: 4.0, x2: 625, y2: 16.00, xy: 100 },
    { journey: 'C', x: 40, y: 2.5, x2: 1600, y2: 6.25, xy: 100 },
    { journey: 'D', x: 50, y: 2.0, x2: 2500, y2: 4.00, xy: 100 },
    { journey: 'E', x: 100, y: 1.0, x2: 10000, y2: 1.00, xy: 100 },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-2 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE0D2] text-[#27334A] border border-[#FFC8B3]">
            SLIDE 09 • STEP-BY-STEP SOLUTION
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Karl Pearson's Computation</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
              Example 2: Complete Mathematical Solution
            </h2>
            <p className="text-xs text-[#27334A]/70">
              Evaluating reciprocal mechanics: substitution yields <strong>r ≈ −0.890</strong>.
            </p>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => setStepIndex(s)}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold border ${
                  stepIndex === s
                    ? 'bg-[#7C5CFC] text-white border-[#7C5CFC]'
                    : 'bg-white text-[#27334A]/70 border-[#E2E8F0]'
                }`}
              >
                Step {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Calculation Table + Formula Substitution & Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Left Column: Calculation Table */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C5CFC] block mb-1">
              Bivariate Summation Table (n = 5)
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="bg-[#FFE0D2]/50 text-[#27334A] font-bold border-b border-[#FFC8B3]">
                    <th className="py-1 px-1.5 text-left rounded-l-lg">Trip</th>
                    <th className="py-1 px-1.5">X (Speed)</th>
                    <th className="py-1 px-1.5">Y (Time)</th>
                    <th className="py-1 px-1.5">X²</th>
                    <th className="py-1 px-1.5">Y²</th>
                    <th className="py-1 px-1.5 rounded-r-lg">XY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {tableData.map((row) => (
                    <tr key={row.journey} className="hover:bg-[#FFF8EF]/60">
                      <td className="py-1 px-1.5 text-left font-bold text-[#7C5CFC]">{row.journey}</td>
                      <td className="py-1 px-1.5">{row.x}</td>
                      <td className="py-1 px-1.5">{row.y.toFixed(1)}</td>
                      <td className="py-1 px-1.5 text-[#27334A]/80">{row.x2}</td>
                      <td className="py-1 px-1.5 text-[#27334A]/80">{row.y2.toFixed(2)}</td>
                      <td className="py-1 px-1.5 font-bold text-[#FF7E67]">{row.xy}</td>
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr className="bg-[#FFF8EF] font-extrabold text-[#27334A] border-t-2 border-[#7C5CFC]">
                    <td className="py-1 px-1.5 text-left">Total (Σ)</td>
                    <td className="py-1 px-1.5 text-[#7C5CFC]">235</td>
                    <td className="py-1 px-1.5 text-[#7C5CFC]">14.5</td>
                    <td className="py-1 px-1.5">15125</td>
                    <td className="py-1 px-1.5">52.25</td>
                    <td className="py-1 px-1.5 text-[#FF7E67]">500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Summary of Totals */}
          <div className="mt-2 p-2 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] grid grid-cols-3 gap-1 text-center text-[10px] text-[#27334A]">
            <div>ΣX = <strong>235</strong>, ΣY = <strong>14.5</strong></div>
            <div>ΣX² = <strong>15125</strong>, ΣY² = <strong>52.25</strong></div>
            <div>ΣXY = <strong>500</strong>, n = <strong>5</strong></div>
          </div>
        </div>

        {/* Right Column: Substitution Steps, Result, and Side-by-Side Comparison */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between space-y-2">
          
          {/* Step 1 & 2: Numerator & Denominator */}
          <div className="space-y-1.5 text-xs font-mono">
            {stepIndex >= 1 && (
              <div className="p-2 rounded-xl bg-[#FFF8EF] border border-[#FFE0D2]">
                <span className="text-[10px] font-bold text-[#7C5CFC] font-sans block">1. Calculate Numerator:</span>
                <div>= 5(500) − 235(14.5)</div>
                <div>= 2500 − 3407.5 = <strong className="text-[#FF7E67] text-sm font-bold">−907.5</strong></div>
              </div>
            )}

            {stepIndex >= 2 && (
              <div className="p-2 rounded-xl bg-[#E9E1FA]/40 border border-[#D5C4F7]">
                <span className="text-[10px] font-bold text-[#7C5CFC] font-sans block">2. Calculate Denominator:</span>
                <div className="text-[11px] leading-tight">
                  = √[(5×15125 − 235²)(5×52.25 − 14.5²)]<br />
                  = √[(75625 − 55225)(261.25 − 210.25)]<br />
                  = √(20400 × 51) = √1040400 = <strong className="text-[#7C5CFC] text-sm font-bold">1020</strong>
                </div>
              </div>
            )}

            {stepIndex >= 3 && (
              <div className="p-2 rounded-xl bg-[#FFE0D2]/50 border border-[#FFC8B3] flex items-center justify-between font-sans">
                <div>
                  <span className="text-[10px] font-bold text-[#27334A]/70 uppercase block">Final Coefficient</span>
                  <span className="text-base font-extrabold text-[#27334A]">
                    r = −907.5 / 1020 ≈ <span className="text-[#FF7E67]">−0.890</span>
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-[#FF7E67] border border-[#FFC8B3]">
                  Strong Negative
                </span>
              </div>
            )}
          </div>

          {/* Side-by-Side Comparison of Examples 1 & 2 */}
          <div className="p-2 rounded-2xl bg-[#FFF8EF] border border-[#FFE0D2]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C5CFC] block mb-1">
              Side-by-Side Example Comparison
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-1.5 rounded-xl bg-white border border-[#BDDEC4]">
                <strong className="text-[#97CAA1] block">Example 1 (Study/Marks)</strong>
                <span className="font-extrabold text-[#27334A]">r ≈ +0.991</span>
                <span className="text-[10px] text-[#27334A]/70 block mt-0.5">Very strong positive</span>
              </div>
              <div className="p-1.5 rounded-xl bg-white border border-[#FFC8B3]">
                <strong className="text-[#FF7E67] block">Example 2 (Speed/Time)</strong>
                <span className="font-extrabold text-[#27334A]">r ≈ −0.890</span>
                <span className="text-[10px] text-[#27334A]/70 block mt-0.5">Strong negative (reciprocal curve)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

