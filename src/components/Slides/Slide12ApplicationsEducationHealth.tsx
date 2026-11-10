import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, HeartPulse, CheckCircle2 } from 'lucide-react';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';

export const Slide12ApplicationsEducationHealth: React.FC = () => {
  const [selectedField, setSelectedField] = useState<'education' | 'healthcare'>('education');

  const educationPairs = [
    { title: 'Study hours and examination marks', detail: 'Consistent daily revision correlates strongly with subject mastery and test results.' },
    { title: 'Class attendance and academic performance', detail: 'Regular lecture participation provides foundational conceptual clarity.' },
    { title: 'Sleep duration and student concentration', detail: 'Adequate nocturnal rest supports cognitive retention and lecture alertness.' },
  ];

  const healthcarePairs = [
    { title: 'Age and blood pressure', detail: 'Vascular elasticity naturally shifts over decades, showing an observed statistical association.' },
    { title: 'Physical activity and resting heart rate', detail: 'Aerobic cardiovascular fitness typically correlates with a more efficient lower pulse.' },
    { title: 'Sleep duration and health indicators', detail: 'Consistent circadian sleep cycles associate with balanced hormonal and metabolic levels.' },
  ];

  const eduPoints = [
    { id: 1, x: 2, y: 45 }, { id: 2, x: 3, y: 55 }, { id: 3, x: 4, y: 62 },
    { id: 4, x: 5, y: 74 }, { id: 5, x: 6, y: 88 }, { id: 6, x: 7, y: 92 }
  ];

  const healthPoints = [
    { id: 1, x: 25, y: 115 }, { id: 2, x: 35, y: 120 }, { id: 3, x: 45, y: 126 },
    { id: 4, x: 55, y: 134 }, { id: 5, x: 65, y: 142 }, { id: 6, x: 72, y: 148 }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-2.5 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCEBFA] text-[#7C5CFC]">
            SLIDE 12 • APPLICATIONS (PART 1)
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Domain Case Studies</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
          Applications: Education & Healthcare
        </h2>
        <p className="text-xs text-[#27334A]/70">
          Studying how factors associate with academic performance and biomedical wellness.
        </p>
      </div>

      {/* Switcher Buttons showing both domains */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setSelectedField('education')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-2xl text-xs font-bold transition-all border ${
            selectedField === 'education'
              ? 'bg-[#7C5CFC] text-white border-[#7C5CFC] shadow-sm'
              : 'bg-white text-[#27334A]/80 border-[#E2E8F0] hover:bg-[#FFF8EF]'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>1. Educational Research</span>
        </button>

        <button
          onClick={() => setSelectedField('healthcare')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-2xl text-xs font-bold transition-all border ${
            selectedField === 'healthcare'
              ? 'bg-[#FF7E67] text-white border-[#FF7E67] shadow-sm'
              : 'bg-white text-[#27334A]/80 border-[#E2E8F0] hover:bg-[#FFF8EF]'
          }`}
        >
          <HeartPulse className="w-4 h-4" />
          <span>2. Healthcare & Medicine</span>
        </button>
      </div>

      {/* Main Grid: Left Column (Real Photograph & Key Pairs), Right Column (Scatter Plot & Narrative) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
        
        {/* Left Column: Real Image & Paired Variables */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-3 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            {/* Real Photograph with rounded styling */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-[#E2E8F0] mb-2.5 shadow-xs">
              <img
                src={selectedField === 'education' ? '/images/student-studying.jpg' : '/images/healthcare-research.jpg'}
                alt={selectedField === 'education' ? 'College student studying at desk with books and laptop' : 'Doctor and healthcare researcher examining medical patient health data'}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#27334A]/70 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/25 backdrop-blur-md">
                  {selectedField === 'education' ? 'Higher Education' : 'Clinical Analytics'}
                </span>
                <p className="text-xs font-bold mt-0.5 drop-shadow-sm leading-tight">
                  {selectedField === 'education' ? 'Student learning & exam preparation' : 'Medical research & health vital monitoring'}
                </p>
              </div>
            </div>

            {/* Paired Variables List */}
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C5CFC] block mb-1">
              Key Investigated Variables
            </span>
            <div className="space-y-1.5">
              {(selectedField === 'education' ? educationPairs : healthcarePairs).map((pair, idx) => (
                <div key={idx} className="p-1.5 px-2 rounded-xl bg-[#FFF8EF] border border-[#FFE0D2] text-[11px]">
                  <div className="flex items-center gap-1.5 font-bold text-[#27334A]">
                    <CheckCircle2 className="w-3 h-3 text-[#97CAA1] flex-shrink-0" />
                    <span>{pair.title}</span>
                  </div>
                  <p className="text-[10px] text-[#27334A]/70 pl-4 mt-0.5">{pair.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 p-1.5 bg-[#E9E1FA]/40 rounded-xl border border-[#D5C4F7] text-[10px] text-[#27334A]/80 text-center font-medium">
            {selectedField === 'education'
              ? 'Supports institutions in identifying learning gaps.'
              : 'Assists researchers in discovering physiological associations.'}
          </div>
        </div>

        {/* Right Column: Scatter Plot Visual & Narrative */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] text-xs">
              <span className="font-bold text-[#27334A]">
                {selectedField === 'education' ? 'Study Hours vs. Examination Marks' : 'Age vs. Systolic Blood Pressure'}
              </span>
              <span className="text-[10px] text-[#FF7E67] font-bold bg-[#FFE0D2] px-2 py-0.5 rounded-full">
                Positive Association
              </span>
            </div>

            <p className="text-xs text-[#27334A]/85 mt-1.5 mb-1 leading-relaxed">
              {selectedField === 'education'
                ? "Educational institutions study these correlations to identify learning patterns, verify the impact of classroom engagement, and structure targeted academic guidance."
                : "Medical researchers analyze healthcare datasets to study how physiological indicators co-vary across age cohorts, helping guide public wellness programs."}
            </p>

            <div className="my-1">
              <AnimatedScatterPlot
                data={selectedField === 'education' ? eduPoints : healthPoints}
                xLabel={selectedField === 'education' ? 'Study Hours / Day' : 'Age (Years)'}
                yLabel={selectedField === 'education' ? 'Exam Marks (%)' : 'Systolic BP (mmHg)'}
                showTrendLine={true}
                colorScheme={selectedField === 'education' ? 'coral' : 'violet'}
                height={200}
                width={420}
              />
            </div>
          </div>

          <div className="p-2 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] text-[10px] text-[#27334A]/80">
            <strong>Key takeaway:</strong> In education and healthcare, correlation helps researchers study how different factors are associated with learning and health outcomes.
          </div>
        </div>

      </div>
    </div>
  );
};
