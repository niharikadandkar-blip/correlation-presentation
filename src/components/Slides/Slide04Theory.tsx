import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, HelpCircle, Activity, LineChart, AlertCircle, Compass } from 'lucide-react';
import { PastelCard } from '../Visuals/PastelCard';

export const Slide04Theory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'types' | 'strength' | 'diagram' | 'coefficient'>('types');

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-3 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E9E1FA] text-[#7C5CFC]">
            SLIDE 04 • THEORY
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Core Theoretical Framework</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
          Theory of Correlation
        </h2>
        <p className="text-xs sm:text-sm text-[#27334A]/70 mt-0.5">
          Types, strength, graphical scatter diagrams, and the coefficient scale.
        </p>
      </div>

      {/* 4 Interactive Category Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {[
          { id: 'types', label: '1. Types (Pos/Neg/Zero)' },
          { id: 'strength', label: '2. Strength of Spread' },
          { id: 'diagram', label: '3. Scatter Diagram' },
          { id: 'coefficient', label: '4. Coefficient (r)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all border ${
              activeTab === tab.id
                ? 'bg-[#7C5CFC] text-white border-[#7C5CFC] shadow-sm'
                : 'bg-white/80 text-[#27334A]/80 border-[#E2E8F0] hover:bg-[#FFF8EF]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area Based on Active Category */}
      <div className="bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-soft min-h-[350px] flex flex-col justify-between">
        {activeTab === 'types' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">
                Three Directional Types
              </span>
              <span className="text-[11px] text-[#27334A]/60">How variables move relative to one another</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Positive */}
              <div className="p-3 rounded-2xl bg-[#FFF8EF] border border-[#FFE0D2] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF7E67] mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Positive Correlation</span>
                  </div>
                  <p className="text-xs text-[#27334A]/85 leading-snug">
                    Two variables tend to move in the <strong>same direction</strong> (↑ ↑ or ↓ ↓).
                  </p>
                  <p className="text-[11px] text-[#FF7E67] font-semibold mt-1">
                    E.g., Temperature & Cold Drink Sales
                  </p>
                </div>
                {/* Mini SVG */}
                <svg viewBox="0 0 100 50" className="w-full h-12 mt-2 bg-white rounded-lg p-1 border border-[#FFE0D2]">
                  <line x1="15" y1="42" x2="85" y2="8" stroke="#FF7E67" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                  {[{x:20,y:40},{x:35,y:32},{x:50,y:25},{x:65,y:18},{x:80,y:10}].map((p,i)=>(
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#FF7E67" />
                  ))}
                </svg>
              </div>

              {/* Negative */}
              <div className="p-3 rounded-2xl bg-[#E9E1FA]/40 border border-[#D5C4F7] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#7C5CFC] mb-1">
                    <TrendingDown className="w-4 h-4" />
                    <span>Negative Correlation</span>
                  </div>
                  <p className="text-xs text-[#27334A]/85 leading-snug">
                    Two variables tend to move in <strong>opposite directions</strong> (↑ ↓).
                  </p>
                  <p className="text-[11px] text-[#7C5CFC] font-semibold mt-1">
                    E.g., Vehicle Speed & Travel Time
                  </p>
                </div>
                {/* Mini SVG */}
                <svg viewBox="0 0 100 50" className="w-full h-12 mt-2 bg-white rounded-lg p-1 border border-[#D5C4F7]">
                  <line x1="15" y1="10" x2="85" y2="42" stroke="#7C5CFC" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                  {[{x:20,y:12},{x:35,y:19},{x:50,y:27},{x:65,y:35},{x:80,y:40}].map((p,i)=>(
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#7C5CFC" />
                  ))}
                </svg>
              </div>

              {/* Zero */}
              <div className="p-3 rounded-2xl bg-[#DCEBFA]/40 border border-[#B8D8F7] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] mb-1">
                    <HelpCircle className="w-4 h-4" />
                    <span>Zero Correlation</span>
                  </div>
                  <p className="text-xs text-[#27334A]/85 leading-snug">
                    There is <strong>no clear linear relationship</strong> between the variables.
                  </p>
                  <p className="text-[11px] text-[#38BDF8] font-semibold mt-1">
                    E.g., Shoe Size & Examination Marks
                  </p>
                </div>
                {/* Mini SVG */}
                <svg viewBox="0 0 100 50" className="w-full h-12 mt-2 bg-white rounded-lg p-1 border border-[#B8D8F7]">
                  {[{x:22,y:15},{x:32,y:38},{x:48,y:20},{x:60,y:42},{x:75,y:18},{x:82,y:34}].map((p,i)=>(
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#38BDF8" />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strength' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">
                Strength of Correlation (Degree of Dispersion)
              </span>
              <span className="text-[11px] text-[#27334A]/60">Can be strong or weak in either direction</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Strong */}
              <div className="p-3 rounded-2xl bg-[#DDEFE1]/40 border border-[#BDDEC4]">
                <span className="text-xs font-bold text-[#27334A] block mb-0.5">Strong Correlation</span>
                <p className="text-[11px] text-[#27334A]/80 leading-snug">
                  Points are <strong>closely grouped</strong> around a straight-line pattern. High predictability.
                </p>
                <svg viewBox="0 0 100 50" className="w-full h-12 mt-2 bg-white rounded-lg p-1 border border-[#BDDEC4]">
                  <line x1="15" y1="42" x2="85" y2="8" stroke="#97CAA1" strokeWidth="1.5" />
                  {[{x:20,y:40},{x:35,y:33},{x:50,y:25},{x:65,y:18},{x:80,y:11}].map((p,i)=>(
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#97CAA1" />
                  ))}
                </svg>
              </div>

              {/* Moderate */}
              <div className="p-3 rounded-2xl bg-[#DCEBFA]/40 border border-[#B8D8F7]">
                <span className="text-xs font-bold text-[#27334A] block mb-0.5">Moderate Correlation</span>
                <p className="text-[11px] text-[#27334A]/80 leading-snug">
                  A <strong>noticeable pattern exists</strong>, but the points are noticeably more spread out.
                </p>
                <svg viewBox="0 0 100 50" className="w-full h-12 mt-2 bg-white rounded-lg p-1 border border-[#B8D8F7]">
                  <line x1="15" y1="42" x2="85" y2="8" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
                  {[{x:20,y:44},{x:35,y:28},{x:50,y:29},{x:65,y:14},{x:80,y:16}].map((p,i)=>(
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#38BDF8" />
                  ))}
                </svg>
              </div>

              {/* Weak */}
              <div className="p-3 rounded-2xl bg-[#FFE0D2]/40 border border-[#FFC8B3]">
                <span className="text-xs font-bold text-[#27334A] block mb-0.5">Weak Correlation</span>
                <p className="text-[11px] text-[#27334A]/80 leading-snug">
                  Points are <strong>widely spread</strong> and the underlying linear pattern is faint or inconsistent.
                </p>
                <svg viewBox="0 0 100 50" className="w-full h-12 mt-2 bg-white rounded-lg p-1 border border-[#FFC8B3]">
                  <line x1="15" y1="42" x2="85" y2="8" stroke="#FF7E67" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                  {[{x:20,y:35},{x:35,y:45},{x:50,y:18},{x:65,y:32},{x:80,y:22}].map((p,i)=>(
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#FF7E67" />
                  ))}
                </svg>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FFF8EF] border border-[#FFE0D2] text-[11px] text-[#27334A]/85">
              💡 <strong>Key Principle:</strong> Correlation can be strong or weak in either the positive or negative direction. Strength refers to clustering, not the sign.
            </div>
          </div>
        )}

        {activeTab === 'diagram' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">
                The Scatter Diagram
              </span>
              <span className="text-[11px] text-[#27334A]/60">Graphical representation of paired observations</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-7 space-y-2 text-xs text-[#27334A]/85">
                <p>
                  A <strong>scatter diagram</strong> is a graphical representation of paired bivariate data:
                </p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#E9E1FA] text-[#7C5CFC] font-bold text-[10px] flex items-center justify-center">1</span>
                    <span>The <strong>X-axis</strong> represents the first variable.</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#E9E1FA] text-[#7C5CFC] font-bold text-[10px] flex items-center justify-center">2</span>
                    <span>The <strong>Y-axis</strong> represents the second variable.</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#E9E1FA] text-[#7C5CFC] font-bold text-[10px] flex items-center justify-center">3</span>
                    <span>Each <strong>dot</strong> represents one paired observation (Xᵢ, Yᵢ).</span>
                  </li>
                </ul>
                <p className="text-[11px] text-[#27334A]/70 pt-1">
                  The visual arrangement of points allows us to immediately inspect direction, cluster tightness, and potential outliers.
                </p>
              </div>

              <div className="sm:col-span-5 bg-[#FFF8EF] p-3 rounded-2xl border border-[#FFE0D2] flex flex-col items-center">
                <svg viewBox="0 0 120 80" className="w-full h-24 overflow-visible">
                  <line x1="15" y1="70" x2="110" y2="70" stroke="#27334A" strokeWidth="1.5" />
                  <line x1="15" y1="70" x2="15" y2="10" stroke="#27334A" strokeWidth="1.5" />
                  <text x="60" y="79" textAnchor="middle" fontSize="7" fill="#27334A" fontWeight="bold">X Variable →</text>
                  <text x="7" y="40" textAnchor="middle" fontSize="7" fill="#27334A" fontWeight="bold" transform="rotate(-90 7 40)">Y Variable →</text>
                  {[{x:25,y:60},{x:40,y:48},{x:58,y:38},{x:75,y:25},{x:95,y:16}].map((p,i)=>(
                    <circle key={i} cx={p.x} cy={p.y} r="4" fill="#FF7E67" stroke="#FFF" strokeWidth="1" />
                  ))}
                </svg>
                <span className="text-[10px] text-[#27334A]/70 mt-1">Paired Points (Xᵢ, Yᵢ)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'coefficient' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">
                Correlation Coefficient (r) Scale
              </span>
              <span className="text-[11px] font-bold text-[#7C5CFC] bg-[#E9E1FA] px-2 py-0.5 rounded-full">-1 ≤ r ≤ +1</span>
            </div>

            <p className="text-xs text-[#27334A]/85 leading-relaxed">
              The correlation coefficient, represented by <strong>r</strong>, is a numerical measure of the direction and strength of a linear relationship:
            </p>

            {/* Continuous Number Line */}
            <div className="bg-[#FFF8EF] p-4 rounded-2xl border border-[#FFE0D2] space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#FF7E67]">-1.0 (Perfect Negative)</span>
                <span className="text-slate-500">0.0 (No Linear Link)</span>
                <span className="text-[#7C5CFC]">+1.0 (Perfect Positive)</span>
              </div>

              <div className="h-4 rounded-full bg-gradient-to-r from-[#FF7E67] via-[#FFE0D2] via-50%-[#E9E1FA] to-[#7C5CFC] relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#27334A]/60 -translate-x-1/2" />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="bg-white p-2 rounded-xl border border-[#FFE0D2]">
                  <strong className="text-[#FF7E67] block">r = -1</strong>
                  <span>Exact downward straight line</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-[#E9E1FA]">
                  <strong className="text-slate-600 block">r = 0</strong>
                  <span>No linear correlation</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-[#D5C4F7]">
                  <strong className="text-[#7C5CFC] block">r = +1</strong>
                  <span>Exact upward straight line</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Caution Banner on Slide 4 */}
        <div className="mt-3 pt-2 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-[#27334A]/80 gap-1">
          <div className="flex items-center gap-1.5 text-[#FF7E67]">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span><strong>Critical:</strong> Zero correlation does not rule out non-linear relationships.</span>
          </div>
          <span className="font-semibold text-[#7C5CFC]">Correlation ≠ Causation</span>
        </div>
      </div>
    </div>
  );
};
