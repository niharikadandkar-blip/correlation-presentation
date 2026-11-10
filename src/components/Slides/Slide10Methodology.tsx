import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Database, Table, LineChart, Calculator, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { PastelCard } from '../Visuals/PastelCard';

export const Slide10Methodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: 'Identify Variables',
      desc: 'Select the two variables to be studied (e.g., study hours & marks).',
      detail: 'Determine the independent (input) and dependent (observed) attributes of interest.',
      icon: Eye,
      color: 'bg-[#DCEBFA] text-[#38BDF8] border-[#B8D8F7]',
    },
    {
      num: 2,
      title: 'Collect Paired Data',
      desc: 'Gather joint observations through surveys, experiments, or records.',
      detail: 'Ensure observations are recorded in simultaneous pairs (Xᵢ, Yᵢ) under identical conditions.',
      icon: Database,
      color: 'bg-[#E9E1FA] text-[#7C5CFC] border-[#D5C4F7]',
    },
    {
      num: 3,
      title: 'Organise the Data',
      desc: 'Arrange the paired X and Y values in a structured bivariate table.',
      detail: 'Sort observations, verify data cleanliness, and check for obvious recording anomalies.',
      icon: Table,
      color: 'bg-[#FFE0D2] text-[#FF7E67] border-[#FFC8B3]',
    },
    {
      num: 4,
      title: 'Scatter Diagram',
      desc: 'Plot each pair as a dot on Cartesian axes to observe visual patterns.',
      detail: 'Inspect for upward/downward slope, linear clustering, curvature, or extreme outliers.',
      icon: LineChart,
      color: 'bg-[#DDEFE1] text-[#97CAA1] border-[#BDDEC4]',
    },
    {
      num: 5,
      title: 'Mathematical Analysis',
      desc: "Calculate correlation coefficient r using Karl Pearson's method.",
      detail: 'Compute summations (ΣX, ΣY, ΣX², ΣY², ΣXY) and apply Pearson or Spearman formula.',
      icon: Calculator,
      color: 'bg-[#F8DCE5] text-[#FF8A75] border-[#F2BDCE]',
    },
    {
      num: 6,
      title: 'Interpret the Result',
      desc: 'Identify the direction and strength of relationship (-1 to +1).',
      detail: 'Synthesize statistical insights and communicate conclusions without false causality.',
      icon: CheckCircle2,
      color: 'bg-[#DDEFE1] text-[#27334A] border-[#BDDEC4]',
    },
  ];

  const current = steps.find((s) => s.num === activeStep) || steps[0];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-3 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCEBFA] text-[#7C5CFC]">
            SLIDE 10 • METHODOLOGY
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Systematic Statistical Workflow</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
          How Do We Study Correlation?
        </h2>
        <p className="text-xs sm:text-sm text-[#27334A]/70 mt-0.5">
          The six-step scientific methodology for investigating bivariate relationships.
        </p>
      </div>

      {/* Six Step Animated Flowchart */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-3">
        {steps.map((st) => {
          const isSelected = activeStep === st.num;
          const Icon = st.icon;
          return (
            <motion.div
              key={st.num}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStep(st.num)}
              className={`p-2.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#7C5CFC] shadow-soft ring-2 ring-[#7C5CFC]/30'
                  : 'bg-white/70 hover:bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center ${
                  isSelected ? 'bg-[#7C5CFC] text-white' : 'bg-[#E9E1FA] text-[#7C5CFC]'
                }`}>
                  {st.num}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#7C5CFC]' : 'text-[#27334A]/40'}`} />
              </div>
              <h4 className="font-bold text-xs text-[#27334A] leading-tight line-clamp-1">{st.title}</h4>
            </motion.div>
          );
        })}
      </div>

      {/* Active Step Showcase Card + Three Classical Methods Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Left: Active Step Deep Dive */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">
                Step 0{current.num} Investigation Phase
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${current.color}`}>
                Phase {current.num} of 6
              </span>
            </div>

            <h3 className="text-base font-extrabold text-[#27334A] mb-1">{current.title}</h3>
            <p className="text-xs text-[#27334A]/85 leading-relaxed mb-2 font-medium">{current.desc}</p>
            
            <div className="bg-[#FFF8EF] p-3 rounded-2xl border border-[#FFE0D2] text-xs text-[#27334A]/80 leading-relaxed">
              <strong className="text-[#FF7E67] block mb-0.5">Engineering Procedure:</strong>
              {current.detail}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#27334A]/70">
            <span>Flow: Variables → Data → Table → Scatter Plot → Pearson r → Interpretation</span>
            <span className="text-[#7C5CFC] font-semibold">Organized Workflow</span>
          </div>
        </div>

        {/* Right: Three Principal Methods Overview */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF8EF] to-[#E9E1FA]/40 rounded-3xl p-4 border border-[#FFE0D2] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-[#FFE0D2]">
              <Sparkles className="w-4 h-4 text-[#7C5CFC]" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#27334A]">
                Three Core Methods in the Field
              </h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 bg-white rounded-xl border border-[#FFE0D2]">
                <strong className="text-[#FF7E67] block">1. Scatter Diagram Method</strong>
                <span className="text-[11px] text-[#27334A]/80">Visual, non-mathematical inspection to spot trends and clusters.</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-[#E9E1FA]">
                <strong className="text-[#7C5CFC] block">2. Karl Pearson's Method</strong>
                <span className="text-[11px] text-[#27334A]/80">Standard quantitative formula giving exact linear coefficient r.</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-[#BDDEC4]">
                <strong className="text-[#97CAA1] block">3. Spearman's Rank Method</strong>
                <span className="text-[11px] text-[#27334A]/80">Rank-based formula for qualitative attributes and non-linear monotonic data.</span>
              </div>
            </div>
          </div>

          <div className="mt-2 p-2 bg-white/80 rounded-xl border border-[#FFE0D2] text-[10px] text-[#27334A]/80 text-center font-medium">
            Next: Slide 11 features our full interactive hands-on graph demonstration!
          </div>
        </div>

      </div>
    </div>
  );
};

