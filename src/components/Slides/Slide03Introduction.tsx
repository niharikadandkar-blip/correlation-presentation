import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, CupSoda, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PastelCard } from '../Visuals/PastelCard';

export const Slide03Introduction: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-3 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE0D2] text-[#FF7E67]">
            SLIDE 03 • INTRODUCTION
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Bivariate Intuition</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#27334A] tracking-tight font-display">
          Understanding How Two Variables Are Related
        </h2>
        <p className="text-xs sm:text-sm text-[#27334A]/70 mt-0.5">
          Exploring co-variation through the classic temperature and cold drinks scenario.
        </p>
      </div>

      {/* Main Grid: Left (Real Photo + Variables), Right (Definition & Explanation) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Left Column: Real Summer Cold Drinks Image & Variable Badges */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] text-xs">
              <span className="font-bold text-[#FF7E67] uppercase tracking-wider text-[10px]">
                Summer Temperature Case
              </span>
              <span className="text-[10px] font-semibold text-[#7C5CFC] bg-[#E9E1FA] px-2 py-0.5 rounded-full">
                Observational Scenario
              </span>
            </div>

            {/* Real Photograph: Refreshing cold drinks on a hot summer day */}
            <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-[#E2E8F0] my-2 shadow-xs">
              <img
                src="/images/cold-drinks-summer.jpg"
                alt="Refreshing cold drinks with ice cubes and citrus on a hot summer day"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#27334A]/75 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-md">
                  Real-World Scenario
                </span>
                <p className="text-xs font-bold mt-0.5 drop-shadow-sm leading-tight">
                  Hot summer days naturally prompt increased cold beverage consumption
                </p>
              </div>
            </div>

            {/* The Two Variables */}
            <div className="grid grid-cols-2 gap-2 my-1">
              <div className="p-2 rounded-xl bg-[#FFF8EF] border border-[#FFE0D2] text-left">
                <span className="text-[9px] font-bold text-[#FF7E67] uppercase block">Variable (1)</span>
                <span className="text-xs font-bold text-[#27334A] flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#FF7E67]" />
                  Temperature
                </span>
              </div>
              <div className="p-2 rounded-xl bg-[#E9E1FA]/40 border border-[#D5C4F7] text-left">
                <span className="text-[9px] font-bold text-[#7C5CFC] uppercase block">Variable (2)</span>
                <span className="text-xs font-bold text-[#27334A] flex items-center gap-1">
                  <CupSoda className="w-3.5 h-3.5 text-[#7C5CFC]" />
                  Drink Sales
                </span>
              </div>
            </div>
          </div>

          <div className="p-2 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] text-[10px] text-[#27334A]/70 text-center">
            As ambient temperature rises, cold drink purchases follow an upward pattern.
          </div>
        </div>

        {/* Right Column: Definition & Academic Notes */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          
          <PastelCard variant="white" className="p-4 space-y-3 flex-1">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC] block mb-1">
                Formal Definition
              </span>
              <p className="text-sm sm:text-base font-bold text-[#27334A] leading-snug">
                "In statistics, <span className="text-[#FF7E67]">correlation</span> is used to study the relationship between two variables."
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#27334A]/85 leading-relaxed">
              <p>
                On hot days, people may prefer drinking more cold drinks. As temperature increases, retail cold beverage sales tend to increase in synchrony.
              </p>
              <p className="font-semibold text-[#27334A]">
                Correlation helps us understand:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-medium">
                <li className="flex items-center gap-1.5 p-2 rounded-xl bg-[#FFF8EF] border border-[#FFE0D2]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7E67] flex-shrink-0" />
                  <span>Whether two variables are related</span>
                </li>
                <li className="flex items-center gap-1.5 p-2 rounded-xl bg-[#E9E1FA]/40 border border-[#D5C4F7]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C5CFC] flex-shrink-0" />
                  <span>Whether they move together or inversely</span>
                </li>
                <li className="flex items-center gap-1.5 p-2 rounded-xl bg-[#DDEFE1]/40 border border-[#BDDEC4]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#97CAA1] flex-shrink-0" />
                  <span>The direction (+ or -) of association</span>
                </li>
                <li className="flex items-center gap-1.5 p-2 rounded-xl bg-[#DCEBFA]/40 border border-[#B8D8F7]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0" />
                  <span>The numerical strength of relationship</span>
                </li>
              </ul>
            </div>
          </PastelCard>

          {/* Important Academic Caveat: Association ≠ Causation */}
          <div className="bg-[#FFF8EF] rounded-2xl p-3 border-2 border-[#FF7E67]/40 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#FF7E67] flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#FF7E67] block">Important Note:</strong>
              <span className="text-[#27334A]/85">
                Correlation shows <strong>association</strong>; it does not necessarily mean that one variable causes the other.
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
