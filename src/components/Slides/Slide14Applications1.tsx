import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, TrendingUp, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import { AgricultureRainCrop, AdvertisingAndSales, TemperatureAndEnergy } from '../Visuals/TopicIllustrations';

export const Slide14Applications1: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<number>(1);

  const applications = [
    {
      id: 1,
      title: 'Agriculture & Agronomy',
      category: 'Food Security & Farming',
      variables: {
        x: 'Precipitation / Seasonal Rainfall (mm)',
        y: 'Agricultural Crop Yield (Quintals/Hectare)',
      },
      possibleRel: 'Positive in moderate conditions',
      explanation:
        'Sufficient seasonal rain provides essential soil moisture required for germination and crop vegetative growth. However, in extreme flood scenarios, excessive water can cause crop inundation, illustrating how real-world correlations can be conditional.',
      illustration: <AgricultureRainCrop className="w-32 h-32 mx-auto" />,
      color: 'bg-[#DDEFE1] text-[#27334A] border-[#BDDEC4]',
      tagBg: 'bg-[#DDEFE1]',
    },
    {
      id: 2,
      title: 'Business & Commercial Marketing',
      category: 'Corporate Growth & Revenue',
      variables: {
        x: 'Advertising & Marketing Expenditure ($ / ₹)',
        y: 'Quarterly Sales Revenue ($ / ₹)',
      },
      possibleRel: 'Positive in many market environments',
      explanation:
        'Higher promotional spend widens customer awareness, drives leads, and boosts retail sales volume. However, after high market saturation, the law of diminishing marginal returns often sets in.',
      illustration: <AdvertisingAndSales className="w-32 h-32 mx-auto" />,
      color: 'bg-[#FFE0D2] text-[#27334A] border-[#FFC8B3]',
      tagBg: 'bg-[#FFE0D2]',
    },
    {
      id: 3,
      title: 'Weather & Energy Infrastructure',
      category: 'Power Grids & Thermodynamics',
      variables: {
        x: 'Daily Maximum Temperature (°C)',
        y: 'Peak Electricity Consumption (Megawatts)',
      },
      possibleRel: 'Strong positive during heatwaves',
      explanation:
        'When ambient summer temperatures spike, households and commercial centers run air conditioners and industrial chillers at maximum capacity, driving electrical power grid demand sharply upward.',
      illustration: <TemperatureAndEnergy className="w-32 h-32 mx-auto" />,
      color: 'bg-[#DCEBFA] text-[#27334A] border-[#B8D8F7]',
      tagBg: 'bg-[#DCEBFA]',
    },
  ];

  const current = applications.find((a) => a.id === selectedApp) || applications[0];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-4">
      {/* Slide Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DDEFE1] text-[#27334A] border border-[#BDDEC4]">
            SLIDE 14 • REAL-WORLD APPLICATIONS (PART 1)
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Domain Case Studies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27334A] tracking-tight font-display">
          Engineering & Everyday Applications
        </h2>
        <p className="text-sm text-[#27334A]/70 mt-1">
          Click any case card below to reveal variables and statistical explanations.
        </p>
      </div>

      {/* 3 Interactive Horizontal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
        {applications.map((app) => {
          const isSelected = selectedApp === app.id;
          return (
            <motion.div
              key={app.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedApp(app.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#7C5CFC] shadow-soft ring-2 ring-[#7C5CFC]/30'
                  : 'bg-white/70 hover:bg-white border-[#E2E8F0]'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold text-[#27334A]/60 uppercase tracking-wide">
                  {app.category}
                </span>
                <h4 className="font-extrabold text-sm text-[#27334A] mt-0.5">{app.title}</h4>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E2E8F0]">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${app.color}`}>
                  {app.possibleRel.split(' ')[0]} Relationship
                </span>
                {isSelected && (
                  <span className="text-[10px] font-bold text-[#7C5CFC]">Inspecting</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Active Application Detailed Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-5 items-center"
        >
          {/* Artwork Container */}
          <div className="lg:col-span-4 bg-[#FFF8EF] rounded-2xl p-4 border border-[#FFE0D2] flex flex-col items-center justify-center">
            {current.illustration}
            <span className="text-xs font-bold text-[#27334A] mt-2">{current.title}</span>
          </div>

          {/* Explanation Text & Variable Breakdown */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">
                Statistical Breakdown
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${current.color}`}>
                Relationship: {current.possibleRel}
              </span>
            </div>

            {/* Variables Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#DCEBFA]/40 border border-[#B8D8F7]">
                <span className="text-[10px] font-bold text-[#27334A]/70 uppercase block">Independent Variable (X)</span>
                <span className="font-bold text-[#27334A]">{current.variables.x}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FFE0D2]/40 border border-[#FFC8B3]">
                <span className="text-[10px] font-bold text-[#27334A]/70 uppercase block">Dependent Variable (Y)</span>
                <span className="font-bold text-[#27334A]">{current.variables.y}</span>
              </div>
            </div>

            {/* Explanation paragraph */}
            <div className="bg-[#FFF8EF] p-3 rounded-2xl border border-[#FFE0D2] text-xs text-[#27334A]/85 leading-relaxed">
              <strong className="text-[#27334A] block mb-1">Analytical Explanation:</strong>
              {current.explanation}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

