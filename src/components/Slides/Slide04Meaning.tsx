import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, ArrowRightLeft, Database, Layers, Check } from 'lucide-react';
import { PastelCard } from '../Visuals/PastelCard';

export const Slide04Meaning: React.FC = () => {
  const [activeConcept, setActiveConcept] = useState<'variable' | 'relationship' | 'observation'>('variable');

  const concepts = [
    {
      id: 'variable',
      title: 'Variable',
      symbol: 'X or Y',
      tagColor: 'bg-[#DCEBFA] text-[#38BDF8]',
      summary: 'Any measurable quantity or attribute that can take different values across different subjects or times.',
      examples: 'E.g., Ambient Temperature, Engine Speed, House Area, Exam Score.',
    },
    {
      id: 'relationship',
      title: 'Relationship / Association',
      symbol: 'X ↔ Y',
      tagColor: 'bg-[#E9E1FA] text-[#7C5CFC]',
      summary: 'The mutual connection or co-variation between two variables showing whether they move in harmony or opposition.',
      examples: 'E.g., As studying hours increase, exam marks tend to rise.',
    },
    {
      id: 'observation',
      title: 'Observation (Data Pair)',
      symbol: '(Xᵢ, Yᵢ)',
      tagColor: 'bg-[#FFE0D2] text-[#FF7E67]',
      summary: 'A single recorded bivariate measurement taken together from one subject, day, or experiment.',
      examples: 'E.g., Day 1: Temperature = 28°C, Cold Drinks Sold = 20 units.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-4">
      {/* Slide Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCEBFA] text-[#38BDF8]">
            SLIDE 04 • CONCEPT DEFINITION
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Bivariate Statistics</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27334A] tracking-tight font-display">
          Meaning of Correlation
        </h2>
        <p className="text-sm text-[#27334A]/70 mt-1">
          A formal statistical window into how two numerical dimensions move in concert.
        </p>
      </div>

      {/* Formal Definition Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-soft mb-4 relative overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[#E9E1FA] text-[#7C5CFC] flex-shrink-0">
            <Link2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC] mb-1">
              Standard Academic Definition
            </div>
            <p className="text-base sm:text-lg font-bold text-[#27334A] leading-snug">
              "Correlation is a statistical measure that describes the <span className="text-[#FF7E67]">direction</span> and <span className="text-[#7C5CFC]">strength</span> of the relationship between two variables."
            </p>
            <p className="text-xs sm:text-sm text-[#27334A]/80 mt-2 bg-[#FFF8EF] p-2.5 rounded-xl border border-[#FFE0D2]/60">
              <span className="font-bold text-[#27334A]">In simple words:</span> It tells us whether two things are connected and whether one tends to go up or down when the other changes.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Visual Connection Diagram + 3 Interactive Concepts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left: Dynamic SVG Visual Flow X ↔ Y */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF8EF] to-[#F8DCE5]/30 rounded-3xl p-5 border border-[#FFE0D2] flex flex-col justify-between items-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#27334A]/60">
            Bivariate Interaction Model
          </span>

          <div className="my-3 py-4 w-full flex items-center justify-around">
            {/* Variable X Bubble */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 rounded-2xl bg-white border-2 border-[#7C5CFC] shadow-soft flex flex-col items-center justify-center p-2"
            >
              <span className="text-2xl font-black text-[#7C5CFC]">X</span>
              <span className="text-[10px] font-bold text-[#27334A]/70 uppercase">Variable 1</span>
              <span className="text-[9px] text-[#27334A]/50">e.g. Temperature</span>
            </motion.div>

            {/* Connecting Animated Waves */}
            <div className="flex flex-col items-center px-2">
              <motion.div
                animate={{ x: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="p-2 rounded-full bg-[#E9E1FA] text-[#7C5CFC] shadow-sm mb-1"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </motion.div>
              <span className="text-[10px] font-extrabold text-[#7C5CFC] tracking-tight">
                Correlation
              </span>
              <span className="text-[9px] text-[#27334A]/60">Direction & Strength</span>
            </div>

            {/* Variable Y Bubble */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 rounded-2xl bg-white border-2 border-[#FF7E67] shadow-soft flex flex-col items-center justify-center p-2"
            >
              <span className="text-2xl font-black text-[#FF7E67]">Y</span>
              <span className="text-[10px] font-bold text-[#27334A]/70 uppercase">Variable 2</span>
              <span className="text-[9px] text-[#27334A]/50">e.g. Drink Sales</span>
            </motion.div>
          </div>

          <p className="text-[11px] text-[#27334A]/70 leading-snug">
            Each dot on a correlation graph corresponds to a single joint observation <span className="font-bold text-[#27334A]">(Xᵢ, Yᵢ)</span>.
          </p>
        </div>

        {/* Right: 3 Concept Cards */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5">
          {concepts.map((c) => {
            const isSelected = activeConcept === c.id;
            return (
              <motion.div
                key={c.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setActiveConcept(c.id as any)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-[#7C5CFC] shadow-soft ring-2 ring-[#7C5CFC]/20'
                    : 'bg-white/70 hover:bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#27334A]">{c.title}</span>
                    <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${c.tagColor}`}>
                      {c.symbol}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#7C5CFC]" />}
                </div>
                <p className="text-xs text-[#27334A]/80 leading-relaxed">{c.summary}</p>
                <p className="text-[11px] text-[#7C5CFC] font-medium mt-1">{c.examples}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

