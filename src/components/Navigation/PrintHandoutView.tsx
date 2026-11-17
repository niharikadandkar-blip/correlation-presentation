import React from 'react';
import { Printer, ArrowLeft, Download, CheckCircle2 } from 'lucide-react';

// Exact 16 Slide Components from the website
import { Slide01Title } from '../Slides/Slide01Title';
import { Slide02Abstract } from '../Slides/Slide02Abstract';
import { Slide03Introduction } from '../Slides/Slide03Introduction';
import { Slide04Theory } from '../Slides/Slide04Theory';
import { Slide05Formula } from '../Slides/Slide05Formula';
import { Slide06Numerical1Problem } from '../Slides/Slide06Numerical1Problem';
import { Slide07Numerical1Solution } from '../Slides/Slide07Numerical1Solution';
import { Slide08Numerical2Problem } from '../Slides/Slide08Numerical2Problem';
import { Slide09Numerical2Solution } from '../Slides/Slide09Numerical2Solution';
import { Slide10Methodology } from '../Slides/Slide10Methodology';
import { Slide11InteractiveGraphs } from '../Slides/Slide11InteractiveGraphs';
import { Slide12ApplicationsEducationHealth } from '../Slides/Slide12ApplicationsEducationHealth';
import { Slide13ApplicationsAgriWeather } from '../Slides/Slide13ApplicationsAgriWeather';
import { Slide14ApplicationsBusinessMarketing } from '../Slides/Slide14ApplicationsBusinessMarketing';
import { Slide15ApplicationsTransportEng } from '../Slides/Slide15ApplicationsTransportEng';
import { Slide16Conclusion } from '../Slides/Slide16Conclusion';

interface PrintHandoutViewProps {
  onBack: () => void;
}

export const PrintHandoutView: React.FC<PrintHandoutViewProps> = ({ onBack }) => {
  // Pairs of exact slides (2 per page = 8 pages)
  const slidePages = [
    {
      page: 1,
      slides: [
        { id: 1, title: 'Title Slide', comp: <Slide01Title onNext={() => {}} /> },
        { id: 2, title: 'Abstract & Scope', comp: <Slide02Abstract /> },
      ],
    },
    {
      page: 2,
      slides: [
        { id: 3, title: 'Introduction: Two Variables', comp: <Slide03Introduction /> },
        { id: 4, title: 'Theory of Correlation', comp: <Slide04Theory /> },
      ],
    },
    {
      page: 3,
      slides: [
        { id: 5, title: 'Formula & Coefficient (r)', comp: <Slide05Formula /> },
        { id: 6, title: 'Example 1: Study & Marks (Problem)', comp: <Slide06Numerical1Problem /> },
      ],
    },
    {
      page: 4,
      slides: [
        { id: 7, title: 'Example 1: Complete Solution', comp: <Slide07Numerical1Solution /> },
        { id: 8, title: 'Example 2: Speed & Time (Problem)', comp: <Slide08Numerical2Problem /> },
      ],
    },
    {
      page: 5,
      slides: [
        { id: 9, title: 'Example 2: Complete Solution', comp: <Slide09Numerical2Solution /> },
        { id: 10, title: 'Methodology: 6-Step Lifecycle', comp: <Slide10Methodology /> },
      ],
    },
    {
      page: 6,
      slides: [
        { id: 11, title: 'Visual Representation & Graphs Lab', comp: <Slide11InteractiveGraphs /> },
        { id: 12, title: 'Applications: Education & Health', comp: <Slide12ApplicationsEducationHealth /> },
      ],
    },
    {
      page: 7,
      slides: [
        { id: 13, title: 'Applications: Agriculture & Weather', comp: <Slide13ApplicationsAgriWeather /> },
        { id: 14, title: 'Applications: Business & Marketing', comp: <Slide14ApplicationsBusinessMarketing /> },
      ],
    },
    {
      page: 8,
      slides: [
        { id: 15, title: 'Applications: Transport & Engineering', comp: <Slide15ApplicationsTransportEng /> },
        { id: 16, title: 'Conclusion, Summary & References', comp: <Slide16Conclusion /> },
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-100 text-[#27334A] flex flex-col items-center">
      
      {/* Top Floating Action Bar (Hidden during actual print) */}
      <div className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md py-3 px-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <img
            src="/images/bvp-logo-cutout.png"
            alt="BVP Logo"
            className="w-9 h-9 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/bvp-logo.png';
            }}
          />
          <div>
            <h1 className="text-base font-extrabold text-[#27334A] leading-tight">
              Exact Slides Print View (2 Slides Per Page • 8 Pages Total)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Bharati Vidyapeeth Deemed to be University, Pune • Original Website Components
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-[#27334A] hover:bg-slate-50 transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Presentation</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C5CFC] hover:bg-[#6847EB] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF (2 Slides/Page)</span>
          </button>
        </div>
      </div>

      {/* Print Instructions Callout for User */}
      <div className="w-full max-w-4xl mx-auto my-4 p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-950 shadow-xs print:hidden">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>
            <strong>Identical Web Slides:</strong> Each page below renders 2 exact interactive slides from the website with the pastel blue and pink background, identical charts, formulas, and images.
          </span>
        </div>
        <span className="hidden sm:inline font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-full">
          Shortcuts: Ctrl + P
        </span>
      </div>

      {/* Handout Pages (Each page = exactly 2 slides, A4 Portrait with page-break) */}
      <div className="w-full max-w-[210mm] mx-auto flex flex-col gap-8 pb-16 print:p-0 print:m-0 print:gap-0 print:w-full print:max-w-none">
        {slidePages.map(({ page, slides }) => (
          <div
            key={page}
            className="page-sheet relative w-[210mm] h-[297mm] mx-auto bg-gradient-to-br from-[#E0F2FE] via-[#FFF5F8] to-[#FCE7F3] p-[10mm] shadow-xl rounded-2xl border border-slate-200/80 flex flex-col justify-between overflow-hidden print:w-full print:h-[100vh] print:min-h-[100vh] print:max-h-[100vh] print:m-0 print:p-[8mm] print:shadow-none print:rounded-none print:border-none print:break-after-page print:page-break-after-always"
            style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
          >
            {/* Soft Ambient Pastel Glow inside each page */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#BAE6FD]/40 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -right-20 w-64 h-64 rounded-full bg-[#FBCFE8]/45 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 left-1/3 w-64 h-64 rounded-full bg-[#BFDBFE]/40 blur-3xl pointer-events-none" />

            {/* Page Header */}
            <div className="relative z-10 w-full flex items-center justify-between border-b border-[#7C5CFC]/20 pb-1.5 text-[10px] font-semibold text-[#27334A]/80">
              <div className="flex items-center gap-2">
                <img
                  src="/images/bvp-logo-cutout.png"
                  alt="BVP"
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/bvp-logo.png';
                  }}
                />
                <span className="font-extrabold text-[#27334A]">Bharati Vidyapeeth Deemed to be University, Pune</span>
                <span className="text-slate-400">|</span>
                <span>FY B.Tech CSE (Div C, 2026–27)</span>
              </div>
              <span className="font-bold text-[#7C5CFC] bg-[#E9E1FA] px-2 py-0.5 rounded-full">
                Handout Page {page} of 8
              </span>
            </div>

            {/* Two Slides Stacked Vertically */}
            <div className="relative z-10 flex-1 flex flex-col justify-between py-2 gap-3">
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  className="w-full h-[126mm] bg-white/95 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden relative"
                >
                  {/* Miniature Top Slide Bar */}
                  <div className="w-full flex items-center justify-between px-3 py-1 bg-slate-50/90 border-b border-slate-100 text-[10px] select-none">
                    <span className="font-extrabold text-[#7C5CFC] tracking-wider uppercase">
                      Slide {String(s.id).padStart(2, '0')} • {s.title}
                    </span>
                    <span className="text-slate-400 font-medium text-[9px]">
                      FY B.Tech PBL • Presentation
                    </span>
                  </div>

                  {/* Scaled Slide Component Container */}
                  <div className="flex-1 w-full flex items-center justify-center p-1 overflow-hidden">
                    <div className="w-[1020px] h-[580px] transform scale-[0.66] origin-center flex items-center justify-center select-none pointer-events-none">
                      {s.comp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Page Footer */}
            <div className="relative z-10 w-full flex items-center justify-between border-t border-[#7C5CFC]/20 pt-1.5 text-[9px] font-semibold text-slate-500">
              <span>Course: Probability & Statistics (PBL) • Topic 1: Correlation</span>
              <span>Presenters: Niharika, Riya, Sukruti, Anushka</span>
              <span>Page {page} of 8</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
