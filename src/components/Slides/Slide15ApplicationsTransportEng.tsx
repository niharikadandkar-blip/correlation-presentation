import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Cpu, CheckCircle2 } from 'lucide-react';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';

export const Slide15ApplicationsTransportEng: React.FC = () => {
  const [selectedField, setSelectedField] = useState<'transport' | 'engineering'>('transport');

  const transportPairs = [
    { title: 'Vehicle speed and travel time for fixed distance', detail: 'Higher average velocity inversely reduces transit duration over a set mileage.' },
    { title: 'Traffic volume and travel time', detail: 'Increased vehicles per lane kilometer generate congestion delays, lengthening travel time.' },
    { title: 'Number of passengers and fuel consumption', detail: 'Greater mass load increases vehicular rolling resistance and engine fuel requirements.' },
  ];

  const engineeringPairs = [
    { title: 'Machine temperature and energy consumption', detail: 'Overheating components exhibit thermal friction losses, increasing kilowatt draw.' },
    { title: 'Input voltage and output voltage in a system', detail: 'Linear step-up/step-down transformers demonstrate strict electrical voltage correlation.' },
    { title: 'Internet usage and network traffic', detail: 'High concurrent user connections directly correlate with gigabit packet bandwidth throughput.' },
  ];

  const trafficPoints = [
    { id: 1, x: 200, y: 15 }, { id: 2, x: 500, y: 22 }, { id: 3, x: 900, y: 35 },
    { id: 4, x: 1400, y: 52 }, { id: 5, x: 1900, y: 75 }, { id: 6, x: 2400, y: 95 }
  ];

  const engPoints = [
    { id: 1, x: 40, y: 12 }, { id: 2, x: 55, y: 18 }, { id: 3, x: 70, y: 26 },
    { id: 4, x: 82, y: 38 }, { id: 5, x: 95, y: 54 }, { id: 6, x: 108, y: 72 }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-2.5 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E9E1FA] text-[#7C5CFC]">
            SLIDE 15 • APPLICATIONS (PART 4)
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Logistics & Technology Systems</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
          Applications: Transportation & Engineering
        </h2>
        <p className="text-xs text-[#27334A]/70">
          Applying bivariate statistics to transit networks, circuit telemetry, and machine diagnostics.
        </p>
      </div>

      {/* Switcher Buttons */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setSelectedField('transport')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-2xl text-xs font-bold transition-all border ${
            selectedField === 'transport'
              ? 'bg-[#38BDF8] text-white border-[#38BDF8] shadow-sm'
              : 'bg-white text-[#27334A]/80 border-[#E2E8F0] hover:bg-[#FFF8EF]'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>1. Transportation Planning</span>
        </button>

        <button
          onClick={() => setSelectedField('engineering')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-2xl text-xs font-bold transition-all border ${
            selectedField === 'engineering'
              ? 'bg-[#7C5CFC] text-white border-[#7C5CFC] shadow-sm'
              : 'bg-white text-[#27334A]/80 border-[#E2E8F0] hover:bg-[#FFF8EF]'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>2. Engineering & Technology</span>
        </button>
      </div>

      {/* Main Grid: Left Column (Real Photograph & Key Pairs), Right Column (Scatter Plot & Narrative) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
        
        {/* Left Column: Real Image & Paired Variables */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-3 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            {/* Real Photograph with rounded styling */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-[#E2E8F0] mb-2.5 shadow-xs">
              <img
                src={selectedField === 'transport' ? '/images/transportation-traffic.jpg' : '/images/engineering-systems.jpg'}
                alt={selectedField === 'transport' ? 'City highway traffic with multiple vehicles moving' : 'Engineer working with computer hardware and technical equipment'}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#27334A]/70 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/25 backdrop-blur-md">
                  {selectedField === 'transport' ? 'Urban Mobility' : 'Systems Engineering'}
                </span>
                <p className="text-xs font-bold mt-0.5 drop-shadow-sm leading-tight">
                  {selectedField === 'transport' ? 'Traffic density & transit time models' : 'Hardware diagnostics & power telemetry'}
                </p>
              </div>
            </div>

            {/* Paired Variables List */}
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C5CFC] block mb-1">
              Key Technical Variables
            </span>
            <div className="space-y-1.5">
              {(selectedField === 'transport' ? transportPairs : engineeringPairs).map((pair, idx) => (
                <div key={idx} className="p-1.5 px-2 rounded-xl bg-[#FFF8EF] border border-[#FFE0D2] text-[11px]">
                  <div className="flex items-center gap-1.5 font-bold text-[#27334A]">
                    <CheckCircle2 className="w-3 h-3 text-[#97CAA1] flex-shrink-0" />
                    <span>{pair.title}</span>
                  </div>
                  <p className="text-[10px] text-[#27334A]/70 pl-4 mt-0.5">{pair.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 p-1.5 bg-[#DCEBFA]/40 rounded-xl border border-[#B8D8F7] text-[10px] text-[#27334A]/80 text-center font-medium">
            {selectedField === 'transport'
              ? 'Supports civic road planning and public transit optimization.'
              : 'Assists engineers in predictive hardware cooling and network capacity.'}
          </div>
        </div>

        {/* Right Column: Scatter Plot Visual & Narrative */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] text-xs">
              <span className="font-bold text-[#27334A]">
                {selectedField === 'transport' ? 'Traffic Volume (Vehicles/Hr) vs. Delay (min)' : 'Machine Temp (°C) vs. Energy Draw (kWh)'}
              </span>
              <span className="text-[10px] text-[#38BDF8] font-bold bg-[#DCEBFA] px-2 py-0.5 rounded-full">
                Positive Trend
              </span>
            </div>

            <p className="text-xs text-[#27334A]/85 mt-1.5 mb-1 leading-relaxed">
              {selectedField === 'transport'
                ? "Transportation researchers model relationships between vehicular density and travel delays to optimize signal timing and prevent urban traffic bottlenecks."
                : "Engineers study bivariate thermal telemetry to identify optimal operating bounds, prevent component overheating, and maximize machinery lifespan."}
            </p>

            <div className="my-1">
              <AnimatedScatterPlot
                data={selectedField === 'transport' ? trafficPoints : engPoints}
                xLabel={selectedField === 'transport' ? 'Vehicles / Hr' : 'Machine Temp (°C)'}
                yLabel={selectedField === 'transport' ? 'Delay (Mins)' : 'Energy Draw (kWh)'}
                showTrendLine={true}
                colorScheme={selectedField === 'transport' ? 'sky' : 'violet'}
                height={200}
                width={420}
              />
            </div>
          </div>

          <div className="p-2 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] text-[10px] text-[#27334A]/80">
            <strong>Key takeaway:</strong> Correlation is useful wherever two or more technical or physical variables need to be analyzed simultaneously.
          </div>
        </div>

      </div>
    </div>
  );
};
