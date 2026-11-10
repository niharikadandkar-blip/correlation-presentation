import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Clock, ArrowRight, Navigation } from 'lucide-react';
import { PastelCard } from '../Visuals/PastelCard';

export const Slide08Numerical2Problem: React.FC = () => {
  const dataset = [
    { journey: 'A', speed: 20, time: 5.0 },
    { journey: 'B', speed: 25, time: 4.0 },
    { journey: 'C', speed: 40, time: 2.5 },
    { journey: 'D', speed: 50, time: 2.0 },
    { journey: 'E', speed: 100, time: 1.0 },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-2.5 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE0D2] text-[#FF7E67]">
            SLIDE 08 • NUMERICAL EXAMPLE 2
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Problem Statement</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
          Vehicle Speed vs. Travel Time
        </h2>
        <p className="text-xs text-[#27334A]/70">
          Fixed distance of 100 km: demonstrating an inverse (negative) linear correlation.
        </p>
      </div>

      {/* Main Grid: Left (Real Speedometer/Road Image & Context), Right (Dataset Table & Inspection) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Left Column: Real Photograph & Narrative */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            {/* Real Photograph: Speedometer / Highway road */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-[#E2E8F0] mb-2.5 shadow-xs">
              <img
                src="/images/speedometer-travel.jpg"
                alt="Automotive speedometer and highway road illustrating vehicle speed and travel time"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#27334A]/75 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 backdrop-blur-md">
                  Kinematic Scenario
                </span>
                <p className="text-xs font-bold mt-0.5 drop-shadow-sm leading-tight">
                  Fixed 100 km distance: higher vehicle speed reduces travel duration
                </p>
              </div>
            </div>

            <p className="text-xs text-[#27334A]/90 leading-relaxed mb-2">
              A vehicle travels a fixed distance of <strong>100 km</strong> at different speeds. The corresponding journey durations recorded in hours are shown in the table.
            </p>

            <div className="bg-[#FFF8EF] p-2.5 rounded-2xl border border-[#FFE0D2] space-y-1 text-xs text-[#27334A]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#27334A]/70">Variable 1 (X):</span>
                <span className="font-bold text-[#7C5CFC]">Vehicle Speed (km/h)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#27334A]/70">Variable 2 (Y):</span>
                <span className="font-bold text-[#FF7E67]">Travel Time (Hours)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#27334A]/70">Fixed Constraint:</span>
                <span className="font-bold text-[#27334A]">Route Distance d = 100 km</span>
              </div>
            </div>
          </div>

          <div className="mt-2 p-1.5 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] text-[10px] text-[#27334A]/80">
            For a fixed distance, higher velocity cuts remaining travel time, showing an opposite-direction trend.
          </div>
        </div>

        {/* Right Column: Table & Next Step */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#27334A]">Fixed 100 km Dataset (n = 5)</span>
              <span className="text-[10px] font-bold text-[#7C5CFC] bg-[#E9E1FA] px-2 py-0.5 rounded-full">
                Inverse Trend Expected
              </span>
            </div>

            {/* Table */}
            <div className="space-y-1.5 my-2">
              <div className="grid grid-cols-12 text-[11px] font-bold text-[#27334A]/60 px-3 py-1.5 bg-[#DCEBFA]/40 rounded-xl border border-[#B8D8F7]">
                <span className="col-span-3">Journey</span>
                <span className="col-span-5 text-center">Speed (X) km/h</span>
                <span className="col-span-4 text-right">Time (Y) hrs</span>
              </div>

              {dataset.map((row, idx) => (
                <motion.div
                  key={row.journey}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + idx * 0.1 }}
                  className="grid grid-cols-12 items-center px-3 py-2 rounded-xl text-xs bg-[#FFF8EF]/50 hover:bg-[#FFE0D2]/40 border border-[#FFE0D2] font-semibold text-[#27334A]"
                >
                  <span className="col-span-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#7C5CFC]" />
                    Trip {row.journey}
                  </span>
                  <span className="col-span-5 text-center text-[#7C5CFC] font-bold">
                    {row.speed} km/h
                  </span>
                  <span className="col-span-4 text-right text-[#FF7E67] font-bold">
                    {row.time.toFixed(1)} hrs
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-2 p-2 bg-[#FFF8EF] rounded-2xl border border-[#FFE0D2] flex items-center justify-between">
            <div className="text-xs">
              <span className="font-bold text-[#27334A] block">Speed ↑ implies Time ↓</span>
              <span className="text-[10px] text-[#27334A]/70">Next: Complete Step-by-Step Solution</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-[#7C5CFC]">
              <span>Proceed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
