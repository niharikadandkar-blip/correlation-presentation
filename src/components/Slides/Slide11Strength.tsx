import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Layers, Sparkles, Check, HelpCircle } from 'lucide-react';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';
import { generateSyntheticPoints } from '../../utils/math';

export const Slide11Strength: React.FC = () => {
  const [selectedStrength, setSelectedStrength] = useState<'strong' | 'moderate' | 'weak'>('strong');

  // Datasets for each strength with constant positive direction
  const strongPoints = React.useMemo(() => generateSyntheticPoints(0.95, 20, 201), []);
  const moderatePoints = React.useMemo(() => generateSyntheticPoints(0.60, 20, 201), []);
  const weakPoints = React.useMemo(() => generateSyntheticPoints(0.25, 20, 201), []);

  const strengthConfig = {
    strong: {
      id: 'strong',
      title: 'Strong Correlation',
      badge: '|r| ≥ 0.70 (Tight Clustering)',
      badgeColor: 'bg-[#DDEFE1] text-[#27334A] border-[#BDDEC4]',
      rEstimate: 'r ≈ +0.95',
      desc: 'Data points cluster very tightly around a straight imaginary line. There is very little scatter or deviation.',
      takeaway: 'High predictive reliability. Knowing X provides a sharp, dependable forecast for Y.',
      data: strongPoints,
      colorScheme: 'coral' as const,
    },
    moderate: {
      id: 'moderate',
      title: 'Moderate Correlation',
      badge: '0.35 ≤ |r| < 0.70 (Noticeable Trend)',
      badgeColor: 'bg-[#DCEBFA] text-[#27334A] border-[#B8D8F7]',
      rEstimate: 'r ≈ +0.60',
      desc: 'Points demonstrate a distinct upward trend, but with visible spread and dispersion around the line.',
      takeaway: 'Useful general tendency, but individual observations have reasonable variance.',
      data: moderatePoints,
      colorScheme: 'violet' as const,
    },
    weak: {
      id: 'weak',
      title: 'Weak Correlation',
      badge: '|r| < 0.35 (Wide Dispersion)',
      badgeColor: 'bg-[#FFE0D2] text-[#27334A] border-[#FFC8B3]',
      rEstimate: 'r ≈ +0.25',
      desc: 'Points are widely scattered with only a faint tilt. The linear association is barely discernible.',
      takeaway: 'Low predictive power. Other external factors or noise dominate the variation.',
      data: weakPoints,
      colorScheme: 'sky' as const,
    },
  };

  const current = strengthConfig[selectedStrength];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-4">
      {/* Slide Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E9E1FA] text-[#7C5CFC] border border-[#D5C4F7]">
            SLIDE 11 • STRENGTH OF CORRELATION
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Clustering & Tightness</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27334A] tracking-tight font-display">
          How Closely Do Points Follow a Line?
        </h2>
        <p className="text-sm text-[#27334A]/70 mt-1">
          <strong>Strength</strong> measures how tightly data hugs a straight line, while <strong>direction</strong> determines whether it points up or down.
        </p>
      </div>

      {/* Interactive Strength Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {(['strong', 'moderate', 'weak'] as const).map((key) => {
          const item = strengthConfig[key];
          const isSelected = selectedStrength === key;
          return (
            <motion.div
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedStrength(key)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                isSelected
                  ? 'bg-white border-[#7C5CFC] shadow-soft ring-2 ring-[#7C5CFC]/30'
                  : 'bg-white/70 hover:bg-white border-[#E2E8F0]'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#27334A]">{item.title}</h4>
                </div>
                <div className="text-[11px] font-semibold text-[#7C5CFC] mt-0.5">
                  {item.rEstimate}
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                {isSelected ? 'Active View' : 'Select'}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Main Showcase: Morphing Scatter Plot + Qualitative Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Animated Scatter Plot of Chosen Strength */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#27334A]">
                Clustering Demonstration ({current.title})
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${current.badgeColor}`}>
                {current.badge}
              </span>
            </div>

            <AnimatedScatterPlot
              data={current.data}
              xLabel="Predictor Variable X"
              yLabel="Response Variable Y"
              showTrendLine={true}
              colorScheme={current.colorScheme}
              height={280}
              width={460}
            />
          </div>

          <div className="mt-2 p-2.5 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] flex items-center justify-between text-xs">
            <span className="text-[#27334A]/80 font-medium">
              Direction is kept constant (positive) while point spread demonstrates strength.
            </span>
            <span className="text-[11px] text-[#7C5CFC] font-extrabold">{current.rEstimate}</span>
          </div>
        </div>

        {/* Right: Educational Explanation & Critical Rule */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="bg-[#FFF8EF] rounded-3xl p-5 border border-[#FFE0D2] shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF7E67] mb-1">
                Degree of Association
              </div>
              <h3 className="text-lg font-extrabold text-[#27334A] mb-2">{current.title}</h3>
              <p className="text-xs leading-relaxed text-[#27334A]/85 mb-3">{current.desc}</p>
              
              <div className="bg-white p-3.5 rounded-2xl border border-[#FFE0D2] shadow-sm mb-3">
                <span className="text-[10px] font-bold text-[#27334A]/60 uppercase">Practical Meaning</span>
                <p className="text-xs font-semibold text-[#27334A] mt-1 leading-snug">{current.takeaway}</p>
              </div>
            </div>

            {/* Vital Distinction Alert */}
            <div className="p-3 rounded-2xl bg-white border border-[#FFE0D2] text-[11px] text-[#27334A]">
              <strong className="text-[#FF7E67] block mb-0.5">Golden Engineering Rule:</strong>
              Never confuse <em>strength</em> with <em>direction</em>. A correlation of -0.90 is just as strong as +0.90; the negative sign merely indicates an inverse direction!
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

