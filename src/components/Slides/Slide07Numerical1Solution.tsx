import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';

export const Slide07Numerical1Solution: React.FC = () => {
  const [stepIndex, setStepIndex] = useState<number>(3); // Default reveal complete

  const tableData = [
    { student: 'A', x: 2, y: 40, x2: 4, y2: 1600, xy: 80 },
    { student: 'B', x: 3, y: 45, x2: 9, y2: 2025, xy: 135 },
    { student: 'C', x: 4, y: 50, x2: 16, y2: 2500, xy: 200 },
    { student: 'D', x: 5, y: 60, x2: 25, y2: 3600, xy: 300 },
    { student: 'E', x: 6, y: 65, x2: 36, y2: 4225, xy: 390 },
  ];

  const plotPoints = [
    { id: 1, x: 2, y: 40 },
    { id: 2, x: 3, y: 45 },
    { id: 3, x: 4, y: 50 },
    { id: 4, x: 5, y: 60 },
    { id: 5, x: 6, y: 65 },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-2.5 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DDEFE1] text-[#27334A] border border-[#BDDEC4]">
            SLIDE 07 • STEP-BY-STEP SOLUTION
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Karl Pearson's Computation</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
              Example 1: Complete Mathematical Solution
            </h2>
            <p className="text-xs text-[#27334A]/70">
              Substitution of bivariate sums into Pearson's formula yields <strong>r ≈ +0.991</strong>.
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

      {/* Main Grid: Calculation Table on Left + Formula Substitution & Scatter Plot on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Left Column: Full Calculation Table */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C5CFC] block mb-1">
              Bivariate Summation Table (n = 5)
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="bg-[#DCEBFA]/50 text-[#27334A] font-bold border-b border-[#B8D8F7]">
                    <th className="py-1 px-1.5 text-left rounded-l-lg">Student</th>
                    <th className="py-1 px-1.5">X</th>
                    <th className="py-1 px-1.5">Y</th>
                    <th className="py-1 px-1.5">X²</th>
                    <th className="py-1 px-1.5">Y²</th>
                    <th className="py-1 px-1.5 rounded-r-lg">XY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {tableData.map((row) => (
                    <tr key={row.student} className="hover:bg-[#FFF8EF]/60">
                      <td className="py-1 px-1.5 text-left font-bold text-[#7C5CFC]">{row.student}</td>
                      <td className="py-1 px-1.5">{row.x}</td>
                      <td className="py-1 px-1.5">{row.y}</td>
                      <td className="py-1 px-1.5 text-[#27334A]/80">{row.x2}</td>
                      <td className="py-1 px-1.5 text-[#27334A]/80">{row.y2}</td>
                      <td className="py-1 px-1.5 font-bold text-[#FF7E67]">{row.xy}</td>
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr className="bg-[#FFF8EF] font-extrabold text-[#27334A] border-t-2 border-[#FF7E67]">
                    <td className="py-1 px-1.5 text-left">Total (Σ)</td>
                    <td className="py-1 px-1.5 text-[#7C5CFC]">20</td>
                    <td className="py-1 px-1.5 text-[#7C5CFC]">260</td>
                    <td className="py-1 px-1.5">90</td>
                    <td className="py-1 px-1.5">13950</td>
                    <td className="py-1 px-1.5 text-[#FF7E67]">1105</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Summary of Totals */}
          <div className="mt-2 p-2 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] grid grid-cols-3 gap-1 text-center text-[10px] text-[#27334A]">
            <div>ΣX = <strong>20</strong>, ΣY = <strong>260</strong></div>
            <div>ΣX² = <strong>90</strong>, ΣY² = <strong>13950</strong></div>
            <div>ΣXY = <strong>1105</strong>, n = <strong>5</strong></div>
          </div>
        </div>

        {/* Right Column: Substitution Steps & Result */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between space-y-2">
          
          {/* Step 1 & 2: Numerator & Denominator */}
          <div className="space-y-1.5 text-xs font-mono">
            {stepIndex >= 1 && (
              <div className="p-2 rounded-xl bg-[#FFF8EF] border border-[#FFE0D2]">
                <span className="text-[10px] font-bold text-[#7C5CFC] font-sans block">1. Calculate Numerator:</span>
                <div>= nΣXY − (ΣX)(ΣY)</div>
                <div>= 5(1105) − 20(260) = 5525 − 5200 = <strong className="text-[#FF7E67] text-sm font-bold">325</strong></div>
              </div>
            )}

            {stepIndex >= 2 && (
              <div className="p-2 rounded-xl bg-[#E9E1FA]/40 border border-[#D5C4F7]">
                <span className="text-[10px] font-bold text-[#7C5CFC] font-sans block">2. Calculate Denominator:</span>
                <div className="text-[11px] leading-tight">
                  = √[(5×90 − 20²)(5×13950 − 260²)]<br />
                  = √[(450 − 400)(69750 − 67600)]<br />
                  = √(50 × 2150) = √107500 ≈ <strong className="text-[#7C5CFC] text-sm font-bold">327.87</strong>
                </div>
              </div>
            )}

            {stepIndex >= 3 && (
              <div className="p-2 rounded-xl bg-[#DDEFE1]/50 border border-[#BDDEC4] flex items-center justify-between font-sans">
                <div>
                  <span className="text-[10px] font-bold text-[#27334A]/70 uppercase block">Final Coefficient</span>
                  <span className="text-base font-extrabold text-[#27334A]">
                    r = 325 / 327.87 ≈ <span className="text-[#FF7E67]">+0.991</span>
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-[#97CAA1] border border-[#BDDEC4]">
                  Very Strong Positive
                </span>
              </div>
            )}
          </div>

          {/* Statistical Interpretation */}
          <div className="p-2 rounded-xl bg-[#FFF8EF] border border-[#FFE0D2] text-[11px] text-[#27334A]">
            <strong>Statistical Interpretation:</strong> The result <strong>r ≈ +0.991</strong> indicates an exceptionally strong positive linear correlation between study hours and exam marks.
            <div className="flex items-center gap-1 text-[#FF7E67] font-semibold mt-0.5">
              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
              <span>Reminder: This shows strong association, not that study hours alone cause the marks.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

