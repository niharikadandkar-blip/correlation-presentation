import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, HelpCircle, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';
import { generateSyntheticPoints, generateZeroCorrelationPoints } from '../../utils/math';

export const Slide06Types: React.FC = () => {
  const [activeType, setActiveType] = useState<'positive' | 'negative' | 'zero'>('positive');

  // Datasets for each correlation type
  const positivePoints = React.useMemo(() => generateSyntheticPoints(0.88, 18, 12), []);
  const negativePoints = React.useMemo(() => generateSyntheticPoints(-0.88, 18, 55), []);
  const zeroPoints = React.useMemo(() => generateZeroCorrelationPoints(18, 3), []);

  const typeConfig = {
    positive: {
      title: 'Positive Correlation',
      subtitle: 'Both variables move in the same direction',
      badge: 'Direct Association (↑ ↑ or ↓ ↓)',
      badgeColor: 'bg-[#DDEFE1] text-[#27334A] border-[#BDDEC4]',
      desc: 'When Variable X increases, Variable Y also tends to increase. When X decreases, Y also tends to decrease.',
      formulaNote: 'Slope is positive (r > 0)',
      example: 'Example: Ambient Temperature vs. Ice Cream Sales',
      data: positivePoints,
      colorScheme: 'coral' as const,
      icon: TrendingUp,
    },
    negative: {
      title: 'Negative Correlation',
      subtitle: 'One variable increases while the other decreases',
      badge: 'Inverse Association (↑ ↓)',
      badgeColor: 'bg-[#FFE0D2] text-[#27334A] border-[#FFC8B3]',
      desc: 'When Variable X increases, Variable Y tends to decrease in response, and vice-versa.',
      formulaNote: 'Slope is negative (r < 0)',
      example: 'Example: Vehicle Speed vs. Travel Time on a fixed route',
      data: negativePoints,
      colorScheme: 'violet' as const,
      icon: TrendingDown,
    },
    zero: {
      title: 'Zero Correlation',
      subtitle: 'No apparent linear relationship between variables',
      badge: 'No Linear Association (r ≈ 0)',
      badgeColor: 'bg-[#E9E1FA] text-[#27334A] border-[#D5C4F7]',
      desc: 'Changes in Variable X give no clue or reliable linear prediction about what happens to Variable Y.',
      formulaNote: 'No discernible linear tilt (r ≈ 0)',
      example: 'Example: Shoe Size vs. Annual Rainfall',
      data: zeroPoints,
      colorScheme: 'sky' as const,
      icon: HelpCircle,
    },
  };

  const current = typeConfig[activeType];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-4">
      {/* Slide Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E9E1FA] text-[#7C5CFC]">
            SLIDE 06 • CLASSIFICATION
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Bivariate Directions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27334A] tracking-tight font-display">
          Three Types of Correlation
        </h2>
        <p className="text-sm text-[#27334A]/70 mt-1">
          Select a category below to morph the demonstration scatter plot.
        </p>
      </div>

      {/* 3 Selectable Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
        {(['positive', 'negative', 'zero'] as const).map((typeKey) => {
          const item = typeConfig[typeKey];
          const isSelected = activeType === typeKey;
          const Icon = item.icon;
          return (
            <motion.div
              key={typeKey}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveType(typeKey)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#7C5CFC] shadow-soft ring-2 ring-[#7C5CFC]/30'
                  : 'bg-white/70 hover:bg-white border-[#E2E8F0]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`p-2 rounded-xl ${item.badgeColor.split(' ')[0]} text-[#27334A]`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-[#7C5CFC] bg-[#E9E1FA] px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-[#27334A]">{item.title}</h4>
                <p className="text-[11px] text-[#27334A]/70 leading-snug mt-0.5">{item.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic Demonstration Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left: Interactive Scatter Plot */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-soft">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
            <span className="text-xs font-bold text-[#27334A]">Live Scatter Demonstration</span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${current.badgeColor}`}>
              {current.badge}
            </span>
          </div>

          <AnimatedScatterPlot
            data={current.data}
            xLabel="Variable X"
            yLabel="Variable Y"
            showTrendLine={activeType !== 'zero'}
            colorScheme={current.colorScheme}
            height={280}
            width={460}
          />
        </div>

        {/* Right: Educational Narrative & Key Math Rule */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="bg-[#FFF8EF] rounded-3xl p-5 border border-[#FFE0D2] shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF7E67] mb-1">
                Direction Analysis
              </div>
              <h3 className="text-lg font-extrabold text-[#27334A] mb-2">{current.title}</h3>
              <p className="text-xs leading-relaxed text-[#27334A]/80 mb-3">{current.desc}</p>
              
              <div className="bg-white p-3 rounded-2xl border border-[#FFE0D2] shadow-sm mb-3">
                <span className="text-[10px] font-bold text-[#27334A]/60 uppercase">Statistical Signature</span>
                <div className="text-xs font-bold text-[#7C5CFC] mt-0.5">{current.formulaNote}</div>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-[#FFE0D2] shadow-sm">
                <span className="text-[10px] font-bold text-[#27334A]/60 uppercase">Real Example</span>
                <div className="text-xs font-semibold text-[#27334A] mt-0.5">{current.example}</div>
              </div>
            </div>

            <p className="text-[11px] text-[#27334A]/70 pt-2 border-t border-[#FFE0D2]/60">
              Notice how the points cluster along the diagonal line or disperse completely into random territory.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

