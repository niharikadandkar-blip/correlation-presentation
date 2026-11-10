import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, CupSoda, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { initialTempSalesData } from '../../utils/math';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';
import { DataPoint } from '../../types/presentation';

export const Slide05Variables: React.FC = () => {
  const [data] = useState<DataPoint[]>(initialTempSalesData);
  const [selectedPointId, setSelectedPointId] = useState<number | null>(3); // Default to observation 3 as in prompt

  const selectedPoint = data.find((d) => d.id === selectedPointId) || null;

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-4">
      {/* Slide Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE0D2] text-[#FF7E67]">
            SLIDE 05 • UNDERSTANDING VARIABLES
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Bivariate Pair Inspection</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27334A] tracking-tight font-display">
          Mapping X & Y From Table to Graph
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-[#27334A]/70">
            Click any point on the scatter plot or table row to inspect its values.
          </p>
          <span className="text-[10px] font-semibold text-[#FF7E67] bg-[#FFF8EF] border border-[#FFE0D2] px-2 py-0.5 rounded-full">
            *Illustrative values, not survey results
          </span>
        </div>
      </div>

      {/* Main Content Grid: Table + Scatter Plot + Detail Inspector Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left: Interactive Data Table & Info Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          
          {/* Table Container */}
          <div className="bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-soft">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-[#FF7E67]" />
                <span className="font-bold text-xs text-[#27334A]">Observation Dataset</span>
              </div>
              <span className="text-[10px] font-semibold text-[#7C5CFC] bg-[#E9E1FA] px-2 py-0.5 rounded-full">
                5 Observations
              </span>
            </div>

            {/* Table */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-12 text-[11px] font-bold text-[#27334A]/60 px-3 py-1.5 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2]/50">
                <span className="col-span-3">Obs</span>
                <span className="col-span-5 text-center">Temp (X)</span>
                <span className="col-span-4 text-right">Sales (Y)</span>
              </div>

              {data.map((item) => {
                const isSelected = selectedPointId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedPointId(item.id)}
                    className={`grid grid-cols-12 items-center px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#FFE0D2] border border-[#FF7E67] text-[#27334A] shadow-sm font-bold ring-1 ring-[#FF7E67]'
                        : 'bg-white hover:bg-[#FFF8EF] border border-[#E2E8F0] text-[#27334A]/80'
                    }`}
                  >
                    <span className="col-span-3 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#7C5CFC]" />
                      #{item.id}
                    </span>
                    <span className="col-span-5 text-center text-[#27334A]">
                      {item.x}°C
                    </span>
                    <span className="col-span-4 text-right text-[#FF7E67]">
                      {item.y} units
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Active Observation Inspector Callout */}
          <div className="bg-[#FFF8EF] rounded-3xl p-4 border border-[#FFE0D2] shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#FFE0D2]/70">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF7E67]">
                Selected Observation
              </span>
              {selectedPoint && (
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-white text-[#FF7E67] border border-[#FFE0D2]">
                  Point #{selectedPoint.id}
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              {selectedPoint ? (
                <motion.div
                  key={selectedPoint.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-2 text-xs"
                >
                  <div className="text-sm font-extrabold text-[#27334A]">
                    Observation {selectedPoint.id}
                  </div>
                  <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-[#27334A]/70 flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-[#FF7E67]" />
                      Temperature (X):
                    </span>
                    <span className="font-bold text-[#27334A]">{selectedPoint.x}°C</span>
                  </div>
                  <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-[#27334A]/70 flex items-center gap-1.5">
                      <CupSoda className="w-3.5 h-3.5 text-[#7C5CFC]" />
                      Cold drink sales (Y):
                    </span>
                    <span className="font-bold text-[#27334A]">{selectedPoint.y} units</span>
                  </div>
                  <p className="text-[11px] text-[#27334A]/70 pt-1">
                    Plotted at coordinate <strong className="text-[#27334A]">({selectedPoint.x}, {selectedPoint.y})</strong> on the Cartesian plane.
                  </p>
                </motion.div>
              ) : (
                <div className="text-xs text-[#27334A]/60 py-3 text-center">
                  Click any point on the graph to inspect its values.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Scatter Plot of Temperature vs Cold Drink Sales */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#27334A]">
                Temperature vs. Cold Drink Sales Plot
              </span>
              <span className="text-xs font-bold text-[#FF7E67]">
                Linear Positive Pattern
              </span>
            </div>

            <AnimatedScatterPlot
              data={data}
              selectedPointId={selectedPointId}
              onSelectPoint={(pt) => setSelectedPointId(pt ? pt.id : null)}
              xLabel="Temperature"
              yLabel="Cold Drink Sales"
              xUnit="°C"
              yUnit="units"
              showTrendLine={true}
              colorScheme="coral"
              height={310}
              width={480}
            />
          </div>

          <div className="mt-3 p-3 bg-[#DDEFE1]/40 rounded-2xl border border-[#BDDEC4]/50 flex items-center gap-2.5 text-xs">
            <CheckCircle2 className="w-4 h-4 text-[#97CAA1] flex-shrink-0" />
            <span className="text-[#27334A]">
              <strong>Clear visual insight:</strong> As temperature steps from 20°C up to 36°C, drink sales steadily rise from 10 to 30 units.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

