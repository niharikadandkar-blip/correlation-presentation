import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Calculator, Award, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { PastelCard } from '../Visuals/PastelCard';

export const Slide12Methods: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<number>(1);

  const methods = [
    {
      id: 1,
      title: 'Scatter Diagram Method',
      tag: 'Graphical & Visual',
      badgeColor: 'bg-[#DCEBFA] text-[#38BDF8] border-[#B8D8F7]',
      icon: LineChart,
      bullets: [
        'A purely graphical technique where paired data points are plotted on a 2D Cartesian coordinate plane.',
        'Provides an immediate, intuitive visual check of whether a relationship exists, its general shape, and any outliers.',
        'Simple and non-mathematical, though it gives only an approximate visual impression without an exact numerical score.',
      ],
      bestFor: 'Initial exploratory data analysis and quick preliminary checks.',
    },
    {
      id: 2,
      title: "Karl Pearson's Method",
      tag: 'Mathematical & Parametric',
      badgeColor: 'bg-[#E9E1FA] text-[#7C5CFC] border-[#D5C4F7]',
      icon: Calculator,
      bullets: [
        'A quantitative mathematical formula that calculates the linear correlation coefficient, denoted by r.',
        'Measures the precise strength and direction of linear association for quantitative, interval- or ratio-scale data.',
        'Yields a standardized numerical result strictly bounded between -1.0 and +1.0 for unambiguous comparison.',
      ],
      bestFor: 'Continuous numerical variables that satisfy approximate linearity.',
    },
    {
      id: 3,
      title: "Spearman's Rank Method",
      tag: 'Rank-Based & Non-Parametric',
      badgeColor: 'bg-[#FFE0D2] text-[#FF7E67] border-[#FFC8B3]',
      icon: Award,
      bullets: [
        'A non-parametric method denoted by ρ (rho) based on the relative rankings or positions of observations.',
        'Ideal when data is qualitative or ranked, such as student contest ranks, beauty pageants, leadership scores, or consumer preferences.',
        'Does not assume a linear relationship, but rather checks for monotonic relationships where values consistently increase or decrease.',
      ],
      bestFor: 'Ranked, ordinal data, or data with non-linear monotonic trends.',
    },
  ];

  const current = methods.find((m) => m.id === activeMethod) || methods[0];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-4">
      {/* Slide Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCEBFA] text-[#27334A] border border-[#B8D8F7]">
            SLIDE 12 • METHODOLOGIES
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Measurement Approaches</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27334A] tracking-tight font-display">
          Methods of Studying Correlation
        </h2>
        <p className="text-sm text-[#27334A]/70 mt-1">
          Three primary ways statisticians inspect, compute, and rank bivariate relationships.
        </p>
      </div>

      {/* Main Grid: 3 Interactive Method Selection Cards + In-depth Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Column: 3 Clickable Method Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          {methods.map((m) => {
            const Icon = m.icon;
            const isSelected = activeMethod === m.id;
            return (
              <motion.div
                key={m.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActiveMethod(m.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-[#7C5CFC] shadow-soft ring-2 ring-[#7C5CFC]/20'
                    : 'bg-white/70 hover:bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl ${m.badgeColor.split(' ')[0]} text-[#27334A] flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#27334A]">{m.title}</h4>
                      {isSelected && (
                        <span className="text-[10px] font-bold text-[#7C5CFC] bg-[#E9E1FA] px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 inline-block ${m.badgeColor}`}>
                      {m.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Detailed Card for Selected Method */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">
                    Methodology #0{current.id}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${current.badgeColor}`}>
                    {current.tag}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#27334A] mb-3">{current.title}</h3>

                {/* Bullets */}
                <div className="space-y-3">
                  {current.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#E9E1FA] text-[#7C5CFC] font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-[#27334A]/85 leading-relaxed">{b}</p>
                    </div>
                  ))}
                </div>

                {/* Recommended Use */}
                <div className="mt-4 p-3 bg-[#FFF8EF] rounded-2xl border border-[#FFE0D2] flex items-center gap-2 text-xs">
                  <Sparkles className="w-4 h-4 text-[#FF7E67] flex-shrink-0" />
                  <span className="text-[#27334A]">
                    <strong>Best suited for:</strong> {current.bestFor}
                  </span>
                </div>
              </div>

              {/* Note on upcoming topic 2 */}
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] text-[#27334A]/60 flex items-center justify-between">
                <span>*Detailed mathematical derivations belong to Topic 2: Coefficient of Correlation.</span>
                <span className="text-[#7C5CFC] font-semibold">Conceptual Overview</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

