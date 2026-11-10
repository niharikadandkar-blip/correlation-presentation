import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, BookOpen } from 'lucide-react';
import { PastelCard } from '../Visuals/PastelCard';

export const Slide06Numerical1Problem: React.FC = () => {
  const dataset = [
    { student: 'A', hours: 2, marks: 40 },
    { student: 'B', hours: 3, marks: 45 },
    { student: 'C', hours: 4, marks: 50 },
    { student: 'D', hours: 5, marks: 60 },
    { student: 'E', hours: 6, marks: 65 },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-2.5 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE0D2] text-[#FF7E67]">
            SLIDE 06 • NUMERICAL EXAMPLE 1
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Problem Statement</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
          Study Hours vs. Examination Marks
        </h2>
        <p className="text-xs text-[#27334A]/70">
          Step-by-step problem setup for calculating Karl Pearson's coefficient (r).
        </p>
      </div>

      {/* Main Grid: Left Column (Real Photo & Narrative), Right Column (Data Table & Inspection) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Left Column: Real Photograph & Problem Statement */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            {/* Real Photograph: Students studying in library/desk */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-[#E2E8F0] mb-2.5 shadow-xs">
              <img
                src="/images/student-library.jpg"
                alt="College students studying together in a university library with notebooks and laptops"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#27334A]/75 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 backdrop-blur-md">
                  Academic Example
                </span>
                <p className="text-xs font-bold mt-0.5 drop-shadow-sm leading-tight">
                  Investigating whether revision hours associate with test performance
                </p>
              </div>
            </div>

            <p className="text-xs text-[#27334A]/90 leading-relaxed mb-2">
              The following bivariate data shows the number of hours studied by five students and the corresponding marks obtained in an examination:
            </p>

            <div className="bg-[#FFF8EF] p-2.5 rounded-2xl border border-[#FFE0D2] space-y-1 text-xs text-[#27334A]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#27334A]/70">Variable 1 (X):</span>
                <span className="font-bold text-[#7C5CFC]">Daily Study Hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#27334A]/70">Variable 2 (Y):</span>
                <span className="font-bold text-[#FF7E67]">Marks (Out of 100)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#27334A]/70">Observations (n):</span>
                <span className="font-bold text-[#27334A]">5 paired students</span>
              </div>
            </div>
          </div>

          <div className="mt-2 p-1.5 bg-[#E9E1FA]/40 rounded-xl border border-[#D5C4F7] text-[10px] text-[#27334A]">
            <strong>Goal:</strong> Calculate Karl Pearson's coefficient r and interpret the direction and strength of association.
          </div>
        </div>

        {/* Right Column: Row-by-Row Table & Direction Expectation */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#27334A]">Dataset Table (n = 5)</span>
              <span className="text-[10px] font-bold text-[#FF7E67] bg-[#FFE0D2] px-2 py-0.5 rounded-full">
                Positive Direction Expected
              </span>
            </div>

            {/* Table */}
            <div className="space-y-1.5 my-2">
              <div className="grid grid-cols-12 text-[11px] font-bold text-[#27334A]/60 px-3 py-1.5 bg-[#DCEBFA]/40 rounded-xl border border-[#B8D8F7]">
                <span className="col-span-3">Student</span>
                <span className="col-span-5 text-center">Study Hours (X)</span>
                <span className="col-span-4 text-right">Marks (Y)</span>
              </div>

              {dataset.map((row, idx) => (
                <motion.div
                  key={row.student}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + idx * 0.1 }}
                  className="grid grid-cols-12 items-center px-3 py-2 rounded-xl text-xs bg-[#FFF8EF]/50 hover:bg-[#FFE0D2]/40 border border-[#FFE0D2] font-semibold text-[#27334A]"
                >
                  <span className="col-span-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#7C5CFC]" />
                    Student {row.student}
                  </span>
                  <span className="col-span-5 text-center text-[#7C5CFC] font-bold">
                    {row.hours} hrs
                  </span>
                  <span className="col-span-4 text-right text-[#FF7E67] font-bold">
                    {row.marks} marks
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Preliminary Inspection Box */}
          <div className="mt-2 p-2.5 bg-[#FFF8EF] rounded-2xl border border-[#FFE0D2] flex items-center justify-between">
            <div className="text-[11px]">
              <span className="text-[#27334A]/70 block font-medium">Preliminary Visual Inspection:</span>
              <strong className="text-[#FF7E67]">Steadily ascending linear trend</strong>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-[#7C5CFC]">
              <span>Next: Full Solution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
