import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Fuel, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import { HealthcareIndicators, TransportationFuel, RealEstateProperty } from '../Visuals/TopicIllustrations';

export const Slide15Applications2: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<number>(4);

  const applications = [
    {
      id: 4,
      title: 'Healthcare & Biomedical Research',
      category: 'Medical Analytics & Epidemiology',
      variables: {
        x: 'Subject Age (Years)',
        y: 'Resting Systolic Blood Pressure (mmHg)',
      },
      possibleRel: 'Moderate positive in general populations',
      explanation:
        'With normal human aging, arterial vascular compliance gradually diminishes, leading to an observed statistical rise in average systolic pressure. However, lifestyle, diet, genetics, and medication act as significant confounding variables, meaning age alone never dictates blood pressure.',
      illustration: <HealthcareIndicators className="w-32 h-32 mx-auto" />,
      color: 'bg-[#F8DCE5] text-[#27334A] border-[#F2BDCE]',
      caution: 'Biomedical relationships have high individual variance; correlation is observational, not absolute fate.',
    },
    {
      id: 5,
      title: 'Transportation & Logistics Engineering',
      category: 'Fleet Operations & Energy',
      variables: {
        x: 'Distance Travelled on Journey (km)',
        y: 'Total Fuel Consumed (Liters)',
      },
      possibleRel: 'Strong positive in typical driving',
      explanation:
        'Covering a longer physical route requires vehicle engines to perform continuous mechanical work against friction and aerodynamic drag, consuming more fuel. Factors like highway versus stop-and-go city traffic, terrain gradient, and vehicle payload also influence the exact rate.',
      illustration: <TransportationFuel className="w-32 h-32 mx-auto" />,
      color: 'bg-[#DDEFE1] text-[#27334A] border-[#BDDEC4]',
      caution: 'City traffic and vehicle tuning alter the slope, but the positive relationship remains intact.',
    },
    {
      id: 6,
      title: 'Urban Planning & Real Estate Valuation',
      category: 'Housing Economics & Construction',
      variables: {
        x: 'Total Usable Floor Area (Square Feet)',
        y: 'Residential Market Property Price (₹ / $)',
      },
      possibleRel: 'Strong positive within the same city sector',
      explanation:
        'Larger floor plans provide greater living utility, require more building materials, and occupy more land, commanding higher market transactions. However, geographic location (e.g. downtown versus distant suburb) is an overwhelming cofactor.',
      illustration: <RealEstateProperty className="w-32 h-32 mx-auto" />,
      color: 'bg-[#E9E1FA] text-[#27334A] border-[#D5C4F7]',
      caution: 'Location is a dominant third variable: a 500 sq ft downtown studio may cost more than a 2000 sq ft rural home.',
    },
  ];

  const current = applications.find((a) => a.id === selectedApp) || applications[0];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-4">
      {/* Slide Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E9E1FA] text-[#7C5CFC] border border-[#D5C4F7]">
            SLIDE 15 • REAL-WORLD APPLICATIONS (PART 2)
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Domain Case Studies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27334A] tracking-tight font-display">
          Modern Engineering & Economic Systems
        </h2>
        <p className="text-sm text-[#27334A]/70 mt-1">
          Click an application below to examine bivariate relationships and statistical caveats.
        </p>
      </div>

      {/* 3 Interactive Selection Cards */}
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
                  {app.possibleRel.split(' ')[0]} Association
                </span>
                {isSelected && (
                  <span className="text-[10px] font-bold text-[#7C5CFC]">Inspecting</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Application Detailed Breakdown */}
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

          {/* Explanation Text & Variables */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">
                Empirical Evaluation
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${current.color}`}>
                {current.possibleRel}
              </span>
            </div>

            {/* Variables Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#DCEBFA]/40 border border-[#B8D8F7]">
                <span className="text-[10px] font-bold text-[#27334A]/70 uppercase block">Independent Metric (X)</span>
                <span className="font-bold text-[#27334A]">{current.variables.x}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FFE0D2]/40 border border-[#FFC8B3]">
                <span className="text-[10px] font-bold text-[#27334A]/70 uppercase block">Dependent Metric (Y)</span>
                <span className="font-bold text-[#27334A]">{current.variables.y}</span>
              </div>
            </div>

            {/* Explanation paragraph */}
            <div className="bg-[#FFF8EF] p-3 rounded-2xl border border-[#FFE0D2] text-xs text-[#27334A]/85 leading-relaxed">
              <strong className="text-[#27334A] block mb-1">Analytical Explanation:</strong>
              {current.explanation}
            </div>

            {/* Caveat alert */}
            <div className="p-2.5 bg-[#FFFDF9] rounded-xl border border-[#FFE0D2] flex items-center gap-2 text-[11px] text-[#27334A]/80">
              <AlertCircle className="w-4 h-4 text-[#FF7E67] flex-shrink-0" />
              <span>{current.caution}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

