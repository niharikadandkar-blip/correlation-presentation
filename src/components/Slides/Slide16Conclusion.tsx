import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertOctagon, BookOpen, ExternalLink, Sparkles, GraduationCap, Heart, RotateCcw } from 'lucide-react';
import { PastelCard } from '../Visuals/PastelCard';

export const Slide16Conclusion: React.FC = () => {
  const [showThankYou, setShowThankYou] = useState(false);

  const conclusions = [
    'Correlation identifies whether two variables share an associative relationship.',
    'Direction is categorized into Positive (↑ ↑), Negative (↑ ↓), and Zero (no linear pattern).',
    'Strength indicates clustering tightness, varying from weak to moderate to strong.',
    'Scatter diagrams provide the indispensable first visual inspection of paired data.',
    'Karl Pearson’s coefficient r strictly quantifies linear association from -1.0 to +1.0.',
    'Applied universally across education, health, agriculture, weather, business, and engineering.',
  ];

  const references = [
    {
      author: 'S. C. Gupta and V. K. Kapoor',
      title: 'Fundamentals of Mathematical Statistics',
      note: 'Sultan Chand & Sons Publishers, Standard Academic Text',
    },
    {
      author: 'NIST/SEMATECH',
      title: 'e-Handbook of Statistical Methods',
      note: 'National Institute of Standards & Technology, Section 1.3.5.8',
    },
    {
      author: 'OpenStax',
      title: 'Introductory Statistics',
      note: 'Chapter 12: Linear Regression and Correlation',
    },
    {
      author: 'Statistics LibreTexts',
      title: 'Correlation and Scatter Plots',
      note: 'Bivariate Data Analysis & Interpretation Modules',
    },
    {
      author: 'Academic Curriculum',
      title: 'Class Notes & Lecture Materials for Probability and Statistics',
      note: 'Department of Computer Science & Engineering, FY B.Tech',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-2.5 overflow-y-auto">
      <AnimatePresence mode="wait">
        {!showThankYou ? (
          <motion.div
            key="conclusion-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex flex-col justify-center space-y-2.5"
          >
            {/* Slide Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E9E1FA] text-[#7C5CFC]">
                    SLIDE 16 • CONCLUSION & REFERENCES
                  </span>
                  <span className="text-xs text-[#27334A]/60 font-medium">Final Academic Synthesis</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
                  Conclusion & Approved References
                </h2>
              </div>

              {/* Thank you toggle */}
              <button
                onClick={() => setShowThankYou(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#7C5CFC] text-white text-xs font-bold shadow-soft hover:bg-[#6847EB] transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Conclude Presentation</span>
              </button>
            </div>

            {/* Main Content Grid: Conclusions on Left, References on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
              
              {/* Left Column: Summary Bullets & Golden Takeaway */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5">
                
                {/* Core Takeaways */}
                <div className="bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft">
                  <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#E2E8F0]">
                    <GraduationCap className="w-4 h-4 text-[#7C5CFC]" />
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#27334A]">
                      Summary of Key Conceptual Understandings
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {conclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#27334A]/85">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#97CAA1] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Three mini scatter plots */}
                  <div className="grid grid-cols-3 gap-1.5 mt-2.5 pt-2 border-t border-[#E2E8F0] text-center text-[10px]">
                    <div className="bg-[#FFF8EF] p-1 rounded-xl border border-[#FFE0D2]">
                      <strong className="text-[#FF7E67] block">Positive (r &gt; 0)</strong>
                      <span>Upward trend</span>
                    </div>
                    <div className="bg-[#E9E1FA]/40 p-1 rounded-xl border border-[#D5C4F7]">
                      <strong className="text-[#7C5CFC] block">Negative (r &lt; 0)</strong>
                      <span>Downward trend</span>
                    </div>
                    <div className="bg-[#DCEBFA]/40 p-1 rounded-xl border border-[#B8D8F7]">
                      <strong className="text-[#38BDF8] block">Zero (r ≈ 0)</strong>
                      <span>Random cloud</span>
                    </div>
                  </div>
                </div>

                {/* Final Crucial Takeaway */}
                <div className="bg-[#FFF8EF] rounded-2xl p-3 border-2 border-[#FF7E67]/50 shadow-soft flex items-start gap-2.5">
                  <AlertOctagon className="w-4 h-4 text-[#FF7E67] flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-[#FF7E67] block">Final Takeaway: Correlation Does Not Mean Causation</strong>
                    <span className="text-[#27334A]/85 leading-snug">
                      Correlation helps us identify how two variables co-vary and make better-informed decisions. However, a strong association never automatically proves that changes in one variable directly cause changes in the other.
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column: Exact Approved Academic References */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#E2E8F0]">
                    <BookOpen className="w-4 h-4 text-[#7C5CFC]" />
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#27334A]">
                      Approved Academic References
                    </h4>
                  </div>

                  <div className="space-y-1.5">
                    {references.map((ref, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-[#FFF8EF]/60 border border-[#FFE0D2] text-xs text-[#27334A]"
                      >
                        <div className="font-bold text-[11px] text-[#7C5CFC]">{ref.author}</div>
                        <div className="font-semibold text-xs text-[#27334A] leading-tight">{ref.title}</div>
                        <div className="text-[10px] text-[#27334A]/60 mt-0.5">{ref.note}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-2 p-1.5 bg-[#E9E1FA]/40 rounded-xl text-center border border-[#D5C4F7] text-[10px] text-[#27334A]/70">
                  Course: Probability & Statistics • FY B.Tech CSE
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          /* Celebratory Thank You State Within Slide 16 */
          <motion.div
            key="thank-you-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-soft text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-[#E9E1FA] text-[#7C5CFC] mx-auto flex items-center justify-center shadow-xs">
              <Sparkles className="w-8 h-8" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-[#27334A] tracking-tight font-display">
              Thank You!
            </h2>

            <p className="text-base text-[#27334A]/80 font-medium max-w-md mx-auto">
              We welcome any questions or discussions on <strong>Correlation</strong> and its statistical applications.
            </p>

            {/* Presenters Credits Card */}
            <div className="bg-[#FFF8EF] p-4 rounded-2xl border border-[#FFE0D2] max-w-lg mx-auto text-xs space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF7E67]">
                Project-Based Learning Presentation Team
              </div>
              <div className="font-extrabold text-sm text-[#27334A]">
                Niharika, Riya, Sukruti and Anushka
              </div>
              <div className="text-[11px] text-[#27334A]/70">
                FY B.Tech Computer Science and Engineering • Probability & Statistics
              </div>
            </div>

            <div>
              <button
                onClick={() => setShowThankYou(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#FFF8EF] border border-[#FFE0D2] text-xs font-bold text-[#7C5CFC] hover:bg-[#FFE0D2]/50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Summary & References</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
