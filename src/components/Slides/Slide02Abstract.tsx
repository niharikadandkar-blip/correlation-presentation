import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, HeartPulse, Sprout, CloudSun, Briefcase, Cpu, Link2, Sparkles } from 'lucide-react';
import { PastelCard } from '../Visuals/PastelCard';

export const Slide02Abstract: React.FC = () => {
  const collageItems = [
    { title: 'Education', img: '/images/student-studying.jpg', tag: 'Academic Analytics' },
    { title: 'Healthcare', img: '/images/healthcare-research.jpg', tag: 'Clinical Medicine' },
    { title: 'Agriculture', img: '/images/agriculture-farm.jpg', tag: 'Crop Science' },
    { title: 'Weather', img: '/images/weather-forecasting.jpg', tag: 'Meteorology' },
    { title: 'Business', img: '/images/business-sales.jpg', tag: 'Commerce & Sales' },
    { title: 'Engineering', img: '/images/engineering-systems.jpg', tag: 'Hardware Telemetry' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-2.5 overflow-y-auto">
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E9E1FA] text-[#7C5CFC]">
            SLIDE 02 • ABSTRACT
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Academic Synopsis</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
          Executive Abstract
        </h2>
        <p className="text-xs text-[#27334A]/70">
          A comprehensive study of bivariate relationships for FY B.Tech CSE.
        </p>
      </div>

      {/* Main Content Grid: Approved Narrative on Left + Photographic Domain Collage on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
        
        {/* Left: Approved Abstract Text in short readable sections */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-2">
          <PastelCard variant="white" className="p-3.5 flex-1 space-y-2.5">
            <div className="flex items-center gap-2 text-[#7C5CFC] font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Overview & Scope</span>
            </div>

            <p className="text-xs leading-relaxed text-[#27334A]/90">
              <strong className="text-[#FF7E67]">Correlation</strong> is a statistical method used to study the relationship between two variables. It helps us understand whether two variables tend to change together and whether their relationship is positive, negative, or has no clear linear pattern.
            </p>

            <div className="bg-[#FFF8EF] border-l-4 border-[#7C5CFC] p-2 rounded-r-xl text-xs text-[#27334A]/85 leading-relaxed">
              This presentation introduces the meaning and types of correlation, explains its strength, and demonstrates how scatter diagrams help represent relationships visually. It also explains <strong>Karl Pearson's coefficient of correlation</strong> and shows how it can be calculated through two numerical examples.
            </div>

            <p className="text-xs text-[#27334A]/80 leading-relaxed">
              Finally, it explores how correlation is used in areas such as education, healthcare, agriculture, weather, business, marketing, transportation, and engineering. Through simple explanations, graphs, examples, and interactive demonstrations, the presentation shows how correlation helps us identify patterns in data and understand relationships between variables.
            </p>
          </PastelCard>

          {/* Quick Pillars */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-1.5 rounded-xl bg-[#DDEFE1]/40 border border-[#BDDEC4] text-center">
              <div className="text-[9px] font-bold text-[#27334A]/60 uppercase">Concepts</div>
              <div className="text-xs font-bold text-[#27334A]">Types & Strength</div>
            </div>
            <div className="p-1.5 rounded-xl bg-[#E9E1FA]/40 border border-[#D5C4F7] text-center">
              <div className="text-[9px] font-bold text-[#27334A]/60 uppercase">Methods</div>
              <div className="text-xs font-bold text-[#7C5CFC]">Karl Pearson's r</div>
            </div>
            <div className="p-1.5 rounded-xl bg-[#FFE0D2]/40 border border-[#FFC8B3] text-center">
              <div className="text-[9px] font-bold text-[#27334A]/60 uppercase">Applications</div>
              <div className="text-xs font-bold text-[#FF7E67]">8 Key Domains</div>
            </div>
          </div>
        </div>

        {/* Right: Photographic Domain Collage representing the fields */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] mb-2">
              <span className="text-xs font-bold text-[#27334A]">Application Field Collage</span>
              <span className="text-[10px] text-[#7C5CFC] font-semibold bg-[#E9E1FA] px-2 py-0.5 rounded-full">
                Real-World Domains
              </span>
            </div>

            {/* 6-Card Photographic Collage */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {collageItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative h-24 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-2xs"
                >
                  <img
                    src={item.img}
                    alt={`${item.title} correlation application field`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#27334A]/85 via-[#27334A]/25 to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-2 text-white">
                    <span className="font-extrabold text-[11px] block leading-tight">{item.title}</span>
                    <span className="text-[9px] text-white/75 block truncate">{item.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Central Two Variables Connected Ribbon */}
          <div className="mt-2 p-2 bg-[#FFF8EF] rounded-2xl border border-[#FFE0D2] flex items-center justify-around text-center">
            <div className="text-xs font-bold text-[#7C5CFC]">Variable X (Input)</div>
            <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#27334A]">
              <Link2 className="w-3.5 h-3.5 text-[#FF7E67]" />
              <span>Statistical Correlation (r)</span>
            </div>
            <div className="text-xs font-bold text-[#FF7E67]">Variable Y (Response)</div>
          </div>
        </div>

      </div>
    </div>
  );
};
