import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, CloudSun, CheckCircle2 } from 'lucide-react';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';

export const Slide13ApplicationsAgriWeather: React.FC = () => {
  const [selectedField, setSelectedField] = useState<'agriculture' | 'weather'>('agriculture');

  const agriPairs = [
    { title: 'Rainfall and crop production', detail: 'Monsoon precipitation provides essential hydration for soil germination and yield volume.' },
    { title: 'Fertilizer quantity and crop growth', detail: 'Optimal nitrogen-phosphorus enrichment correlates with robust vegetative biomass.' },
    { title: 'Temperature and plant growth', detail: 'Photosynthetic enzymatic reactions flourish within species-specific thermal ranges.' },
  ];

  const weatherPairs = [
    { title: 'Temperature and electricity consumption', detail: 'High ambient summer temperatures prompt continuous cooling loads on the power grid.' },
    { title: 'Humidity and temperature', detail: 'Atmospheric moisture retention directly influences thermodynamic heat index perceptions.' },
    { title: 'Wind speed and wind energy generation', detail: 'Kinetic airflow velocity drives turbine megawatt output in wind farm installations.' },
  ];

  const agriPoints = [
    { id: 1, x: 400, y: 18 }, { id: 2, x: 550, y: 24 }, { id: 3, x: 700, y: 32 },
    { id: 4, x: 850, y: 38 }, { id: 5, x: 950, y: 44 }, { id: 6, x: 1100, y: 46 }
  ];

  const weatherPoints = [
    { id: 1, x: 22, y: 120 }, { id: 2, x: 26, y: 145 }, { id: 3, x: 30, y: 180 },
    { id: 4, x: 34, y: 230 }, { id: 5, x: 38, y: 290 }, { id: 6, x: 42, y: 360 }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-2.5 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DDEFE1] text-[#27334A] border border-[#BDDEC4]">
            SLIDE 13 • APPLICATIONS (PART 2)
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Environmental & Resource Systems</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
          Applications: Agriculture & Weather
        </h2>
        <p className="text-xs text-[#27334A]/70">
          Evaluating environmental influences on agricultural harvests and power grid demand.
        </p>
      </div>

      {/* Switcher Buttons */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setSelectedField('agriculture')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-2xl text-xs font-bold transition-all border ${
            selectedField === 'agriculture'
              ? 'bg-[#97CAA1] text-[#27334A] border-[#97CAA1] shadow-sm'
              : 'bg-white text-[#27334A]/80 border-[#E2E8F0] hover:bg-[#FFF8EF]'
          }`}
        >
          <Sprout className="w-4 h-4 text-[#27334A]" />
          <span>1. Agricultural Science</span>
        </button>

        <button
          onClick={() => setSelectedField('weather')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-2xl text-xs font-bold transition-all border ${
            selectedField === 'weather'
              ? 'bg-[#38BDF8] text-white border-[#38BDF8] shadow-sm'
              : 'bg-white text-[#27334A]/80 border-[#E2E8F0] hover:bg-[#FFF8EF]'
          }`}
        >
          <CloudSun className="w-4 h-4" />
          <span>2. Meteorology & Energy</span>
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
                src={selectedField === 'agriculture' ? '/images/agriculture-farm.jpg' : '/images/weather-forecasting.jpg'}
                alt={selectedField === 'agriculture' ? 'Green agricultural farm fields with growing crops' : 'Weather forecasting scene with sunshine and rain clouds'}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#27334A]/70 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/25 backdrop-blur-md">
                  {selectedField === 'agriculture' ? 'Agronomy & Crops' : 'Atmospheric Science'}
                </span>
                <p className="text-xs font-bold mt-0.5 drop-shadow-sm leading-tight">
                  {selectedField === 'agriculture' ? 'Farmland yields & environmental inputs' : 'Weather patterns & climatic shifts'}
                </p>
              </div>
            </div>

            {/* Paired Variables List */}
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C5CFC] block mb-1">
              Key Environmental Variables
            </span>
            <div className="space-y-1.5">
              {(selectedField === 'agriculture' ? agriPairs : weatherPairs).map((pair, idx) => (
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

          <div className="mt-2 p-1.5 bg-[#DDEFE1]/40 rounded-xl border border-[#BDDEC4] text-[10px] text-[#27334A]/80 text-center font-medium">
            {selectedField === 'agriculture'
              ? 'Supports farmers in improving irrigation and fertilizer efficiency.'
              : 'Helps utility operators predict peak electricity surges.'}
          </div>
        </div>

        {/* Right Column: Scatter Plot Visual & Narrative */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] text-xs">
              <span className="font-bold text-[#27334A]">
                {selectedField === 'agriculture' ? 'Seasonal Rainfall (mm) vs. Crop Yield' : 'Ambient Temp (°C) vs. Power Demand (MW)'}
              </span>
              <span className="text-[10px] text-[#97CAA1] font-bold bg-[#DDEFE1] px-2 py-0.5 rounded-full">
                Positive Correlation
              </span>
            </div>

            <p className="text-xs text-[#27334A]/85 mt-1.5 mb-1 leading-relaxed">
              {selectedField === 'agriculture'
                ? "Agricultural scientists study correlations between precipitation, soil hydration, and quintals of harvest to assist farmers in optimizing crop planning and irrigation cycles."
                : "Meteorologists and power engineers analyze temperature and humidity trends to anticipate city-wide electrical power requirements and prevent grid blackouts."}
            </p>

            <div className="my-1">
              <AnimatedScatterPlot
                data={selectedField === 'agriculture' ? agriPoints : weatherPoints}
                xLabel={selectedField === 'agriculture' ? 'Precipitation (mm)' : 'Temp (°C)'}
                yLabel={selectedField === 'agriculture' ? 'Crop Yield (Q/Ha)' : 'Grid Power (MW)'}
                showTrendLine={true}
                colorScheme={selectedField === 'agriculture' ? 'teal' : 'coral'}
                height={200}
                width={420}
              />
            </div>
          </div>

          <div className="p-2 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] text-[10px] text-[#27334A]/80">
            <strong>Key takeaway:</strong> Correlation helps us understand how agricultural and environmental factors are related through empirical statistical data.
          </div>
        </div>

      </div>
    </div>
  );
};
