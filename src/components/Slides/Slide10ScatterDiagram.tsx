import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Edit3, CheckCircle, Sparkles } from 'lucide-react';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';
import { DatasetEditor } from '../Visuals/DatasetEditor';
import { initialTempSalesData, calculateCorrelation } from '../../utils/math';
import { DataPoint } from '../../types/presentation';

export const Slide10ScatterDiagram: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>(initialTempSalesData);
  const [selectedPointId, setSelectedPointId] = useState<number | null>(3);

  const stats = calculateCorrelation(data);
  const selectedPoint = data.find((d) => d.id === selectedPointId) || null;

  const handleReset = () => {
    setData(initialTempSalesData);
    setSelectedPointId(3);
  };

  const steps = [
    { num: '1', title: 'Horizontal Axis', desc: 'Assign Independent / Input Variable X' },
    { num: '2', title: 'Vertical Axis', desc: 'Assign Dependent / Output Variable Y' },
    { num: '3', title: 'Plot Dots', desc: 'Place a dot at each joint coordinate (Xᵢ, Yᵢ)' },
    { num: '4', title: 'Inspect Pattern', desc: 'Observe upward, downward, or scattered cloud' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-3">
      {/* Slide Header */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCEBFA] text-[#27334A] border border-[#B8D8F7]">
            SLIDE 10 • SCATTER DIAGRAM & LIVE EDITOR
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Graphical Inspection Method</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
              The Scatter Diagram
            </h2>
            <p className="text-xs sm:text-sm text-[#27334A]/70 mt-0.5">
              The primary graphical technique to visualize the relationship between two numerical variables.
            </p>
          </div>
          
          {/* Live Recalculated Metric Badge */}
          <div className="hidden sm:flex items-center gap-3 bg-white px-3 py-1.5 rounded-2xl border border-[#E2E8F0] shadow-sm text-xs">
            <div>
              <span className="text-[10px] text-[#27334A]/60 font-semibold block">Calculated r</span>
              <span className="font-extrabold text-[#7C5CFC] text-sm">
                {stats.r >= 0 ? `+${stats.r}` : stats.r}
              </span>
            </div>
            <div className="w-[1px] h-6 bg-[#E2E8F0]" />
            <div>
              <span className="text-[10px] text-[#27334A]/60 font-semibold block">Direction</span>
              <span className={`font-bold ${stats.r > 0 ? 'text-[#FF7E67]' : stats.r < 0 ? 'text-[#7C5CFC]' : 'text-slate-500'}`}>
                {stats.direction}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Step Methodology Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {steps.map((st) => (
          <div
            key={st.num}
            className="bg-white/80 p-2 rounded-xl border border-[#E2E8F0] flex items-center gap-2 shadow-xs"
          >
            <span className="w-5 h-5 rounded-full bg-[#E9E1FA] text-[#7C5CFC] font-extrabold text-xs flex items-center justify-center flex-shrink-0">
              {st.num}
            </span>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-[#27334A] truncate">{st.title}</div>
              <div className="text-[10px] text-[#27334A]/65 truncate">{st.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Interaction Arena: Scatter Plot (Center/Left) + Editable Dataset Table (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch flex-1 min-h-0">
        
        {/* Scatter Plot with Point Highlighting */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#27334A]">
                Dynamic Scatter Plot ({data.length} observations)
              </span>
              {selectedPoint ? (
                <span className="text-xs font-bold text-[#FF7E67] bg-[#FFE0D2]/70 px-2 py-0.5 rounded-lg border border-[#FFC8B3]">
                  Selected: #{selectedPoint.id} (X: {selectedPoint.x}, Y: {selectedPoint.y})
                </span>
              ) : (
                <span className="text-xs text-[#27334A]/60">Click any dot to select</span>
              )}
            </div>

            <AnimatedScatterPlot
              data={data}
              selectedPointId={selectedPointId}
              onSelectPoint={(pt) => setSelectedPointId(pt ? pt.id : null)}
              xLabel="Variable X"
              yLabel="Variable Y"
              showTrendLine={true}
              colorScheme="coral"
              height={260}
              width={460}
            />
          </div>

          <div className="p-2 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] flex items-center justify-between text-[11px] text-[#27334A]">
            <span>
              Best-fit slope: <strong>{stats.slope}</strong> &nbsp;|&nbsp; Intercept: <strong>{stats.intercept}</strong>
            </span>
            <span className="text-[#FF7E67] font-semibold">Live recomputed</span>
          </div>
        </div>

        {/* Dataset Editor: Edit values, Add, Delete, Reset */}
        <div className="lg:col-span-5 flex flex-col">
          <DatasetEditor
            data={data}
            onChangeData={setData}
            onReset={handleReset}
            selectedPointId={selectedPointId}
            onSelectPoint={setSelectedPointId}
            xLabel="X Val"
            yLabel="Y Val"
          />
        </div>

      </div>
    </div>
  );
};

