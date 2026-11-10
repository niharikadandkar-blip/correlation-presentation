import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, School, Sparkles, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';

interface SlideProps {
  onNext: () => void;
}

export const Slide01Title: React.FC<SlideProps> = ({ onNext }) => {
  // Editable metadata state with clean defaults
  const [college, setCollege] = useState('Department of Computer Science & Engineering');
  const [faculty, setFaculty] = useState('Faculty Guide: [Prof. Name / Department]');
  const [division, setDivision] = useState('Division: A | Batch: FY-CSE');
  const [academicYear, setAcademicYear] = useState('Academic Year: 2024–2025');

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 py-4 max-w-5xl mx-auto overflow-y-auto">
      {/* Top Academic Tag */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 mb-3 bg-white/90 border border-[#FFE0D2] px-4 py-1.5 rounded-full shadow-xs"
      >
        <BookOpen className="w-4 h-4 text-[#FF7E67]" />
        <span className="text-xs font-bold uppercase tracking-wider text-[#27334A]/80">
          Probability & Statistics • PBL Presentation
        </span>
      </motion.div>

      {/* Main Title & Subtitle */}
      <div className="text-center mb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 220 }}
          className="relative inline-block"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#27334A] tracking-tight font-display mb-1">
            CORRELATION
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
            className="h-3 bg-gradient-to-r from-[#FF7E67]/50 via-[#7C5CFC]/40 to-[#38BDF8]/50 rounded-full mx-auto -mt-2 -z-10"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="text-base sm:text-xl font-medium text-[#27334A]/85 max-w-2xl mx-auto mt-2 font-display"
        >
          Understanding the Relationship Between Two Variables
        </motion.p>
        <span className="inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full bg-[#E9E1FA] text-[#7C5CFC]">
          Programme: FY B.Tech — Computer Science and Engineering
        </span>
      </div>

      {/* Visual Direction: Three mini scatter plots (Positive, Negative, Zero) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="w-full max-w-3xl bg-white/90 rounded-3xl p-4 border border-[#E2E8F0] shadow-soft mb-4"
      >
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E2E8F0]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#27334A]/70 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#7C5CFC]" />
            Foundational Bivariate Patterns
          </span>
          <span className="text-[11px] text-[#7C5CFC] font-semibold bg-[#E9E1FA] px-2.5 py-0.5 rounded-full">
            Mathematical Preview
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Positive Scatter Plot Preview */}
          <div className="bg-[#FFF8EF] rounded-2xl p-3 border border-[#FFE0D2] flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-[#FF7E67]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Positive (r &gt; 0)</span>
            </div>
            <svg viewBox="0 0 100 70" className="w-full h-16 overflow-visible">
              <line x1="10" y1="60" x2="90" y2="60" stroke="#E2E8F0" strokeWidth="1.5" />
              <line x1="10" y1="60" x2="10" y2="10" stroke="#E2E8F0" strokeWidth="1.5" />
              <line x1="15" y1="55" x2="85" y2="15" stroke="#FF7E67" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              {[
                { x: 20, y: 52 }, { x: 32, y: 44 }, { x: 45, y: 38 },
                { x: 58, y: 28 }, { x: 70, y: 22 }, { x: 82, y: 16 }
              ].map((pt, i) => (
                <motion.circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="3.5"
                  fill="#FF7E67"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                />
              ))}
            </svg>
            <span className="text-[10px] text-[#27334A]/70 mt-1">Both variables climb together</span>
          </div>

          {/* Negative Scatter Plot Preview */}
          <div className="bg-[#E9E1FA]/40 rounded-2xl p-3 border border-[#D5C4F7]/60 flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-[#7C5CFC]">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Negative (r &lt; 0)</span>
            </div>
            <svg viewBox="0 0 100 70" className="w-full h-16 overflow-visible">
              <line x1="10" y1="60" x2="90" y2="60" stroke="#E2E8F0" strokeWidth="1.5" />
              <line x1="10" y1="60" x2="10" y2="10" stroke="#E2E8F0" strokeWidth="1.5" />
              <line x1="15" y1="15" x2="85" y2="55" stroke="#7C5CFC" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              {[
                { x: 20, y: 18 }, { x: 32, y: 26 }, { x: 45, y: 34 },
                { x: 58, y: 42 }, { x: 70, y: 50 }, { x: 82, y: 56 }
              ].map((pt, i) => (
                <motion.circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="3.5"
                  fill="#7C5CFC"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                />
              ))}
            </svg>
            <span className="text-[10px] text-[#27334A]/70 mt-1">One rises while other falls</span>
          </div>

          {/* Zero Scatter Plot Preview */}
          <div className="bg-[#DCEBFA]/40 rounded-2xl p-3 border border-[#B8D8F7]/60 flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-[#38BDF8]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Zero (r ≈ 0)</span>
            </div>
            <svg viewBox="0 0 100 70" className="w-full h-16 overflow-visible">
              <line x1="10" y1="60" x2="90" y2="60" stroke="#E2E8F0" strokeWidth="1.5" />
              <line x1="10" y1="60" x2="10" y2="10" stroke="#E2E8F0" strokeWidth="1.5" />
              {[
                { x: 22, y: 25 }, { x: 35, y: 50 }, { x: 48, y: 18 },
                { x: 62, y: 45 }, { x: 74, y: 22 }, { x: 80, y: 48 }
              ].map((pt, i) => (
                <motion.circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="3.5"
                  fill="#38BDF8"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                />
              ))}
            </svg>
            <span className="text-[10px] text-[#27334A]/70 mt-1">Random uncorrelated spread</span>
          </div>
        </div>
      </motion.div>

      {/* Presenters & Editable Placeholders Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.45 }}
        className="w-full max-w-3xl bg-white/80 rounded-2xl p-3.5 border border-[#FFE0D2] shadow-xs mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"
      >
        {/* Presenters */}
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-xl bg-[#FFE0D2] text-[#FF7E67] flex-shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#FF7E67] uppercase block tracking-wider">
              Project Team Presenters
            </span>
            <span className="font-extrabold text-[#27334A] text-sm">
              Niharika, Riya, Sukruti and Anushka
            </span>
            <span className="text-[11px] text-[#27334A]/70 block mt-0.5">
              Course: Probability & Statistics (FY B.Tech CSE)
            </span>
          </div>
        </div>

        {/* Editable Institutional Placeholders */}
        <div className="flex items-start gap-2.5 border-t sm:border-t-0 sm:border-l border-[#E2E8F0] pt-2 sm:pt-0 sm:pl-3">
          <div className="p-2 rounded-xl bg-[#E9E1FA] text-[#7C5CFC] flex-shrink-0">
            <School className="w-4 h-4" />
          </div>
          <div className="flex-1 space-y-1">
            <span className="text-[10px] font-bold text-[#7C5CFC] uppercase block tracking-wider">
              Academic Details (Editable)
            </span>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full bg-[#FFF8EF] border border-[#E2E8F0] rounded px-1.5 py-0.5 text-[11px] font-medium text-[#27334A] focus:outline-none focus:ring-1 focus:ring-[#7C5CFC]"
              title="Click to edit College / University Name"
            />
            <div className="grid grid-cols-2 gap-1">
              <input
                type="text"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full bg-[#FFF8EF] border border-[#E2E8F0] rounded px-1.5 py-0.5 text-[10px] text-[#27334A] focus:outline-none focus:ring-1 focus:ring-[#7C5CFC]"
                title="Click to edit Division"
              />
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full bg-[#FFF8EF] border border-[#E2E8F0] rounded px-1.5 py-0.5 text-[10px] text-[#27334A] focus:outline-none focus:ring-1 focus:ring-[#7C5CFC]"
                title="Click to edit Academic Year"
              />
            </div>
            <input
              type="text"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="w-full bg-[#FFF8EF] border border-[#E2E8F0] rounded px-1.5 py-0.5 text-[10px] text-[#27334A] focus:outline-none focus:ring-1 focus:ring-[#7C5CFC]"
              title="Click to edit Faculty Guide Name"
            />
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        onClick={onNext}
        className="group flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#7C5CFC] hover:bg-[#6847EB] text-white font-semibold text-sm shadow-soft hover:shadow-pastel transition-all transform hover:-translate-y-0.5 active:translate-y-0"
      >
        <span>Begin Presentation</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
};
