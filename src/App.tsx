import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SLIDES_METADATA } from './data/slidesMetadata';
import { slideVariants } from './utils/transitions';
import { PresentationBar } from './components/Navigation/PresentationBar';
import { OverviewModal } from './components/Navigation/OverviewModal';

// Slides matching the exact 16-slide syllabus
import { Slide01Title } from './components/Slides/Slide01Title';
import { Slide02Abstract } from './components/Slides/Slide02Abstract';
import { Slide03Introduction } from './components/Slides/Slide03Introduction';
import { Slide04Theory } from './components/Slides/Slide04Theory';
import { Slide05Formula } from './components/Slides/Slide05Formula';
import { Slide06Numerical1Problem } from './components/Slides/Slide06Numerical1Problem';
import { Slide07Numerical1Solution } from './components/Slides/Slide07Numerical1Solution';
import { Slide08Numerical2Problem } from './components/Slides/Slide08Numerical2Problem';
import { Slide09Numerical2Solution } from './components/Slides/Slide09Numerical2Solution';
import { Slide10Methodology } from './components/Slides/Slide10Methodology';
import { Slide11InteractiveGraphs } from './components/Slides/Slide11InteractiveGraphs';
import { Slide12ApplicationsEducationHealth } from './components/Slides/Slide12ApplicationsEducationHealth';
import { Slide13ApplicationsAgriWeather } from './components/Slides/Slide13ApplicationsAgriWeather';
import { Slide14ApplicationsBusinessMarketing } from './components/Slides/Slide14ApplicationsBusinessMarketing';
import { Slide15ApplicationsTransportEng } from './components/Slides/Slide15ApplicationsTransportEng';
import { Slide16Conclusion } from './components/Slides/Slide16Conclusion';

export function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = SLIDES_METADATA.length;

  const goToNext = () => {
    if (currentSlide < totalSlides) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentSlide > 1) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToSlide = (slideNum: number) => {
    if (slideNum >= 1 && slideNum <= totalSlides) {
      setDirection(slideNum > currentSlide ? 1 : -1);
      setCurrentSlide(slideNum);
    }
  };

  // Fullscreen management
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Determine transition type for current slide
  const currentMeta = SLIDES_METADATA[currentSlide - 1];
  const transitionType = currentMeta?.transitionType || 'slide-horizontal';
  const getVariants = slideVariants[transitionType] || slideVariants['slide-horizontal'];

  // Render current slide component
  const renderSlideContent = () => {
    switch (currentSlide) {
      case 1:
        return <Slide01Title onNext={goToNext} />;
      case 2:
        return <Slide02Abstract />;
      case 3:
        return <Slide03Introduction />;
      case 4:
        return <Slide04Theory />;
      case 5:
        return <Slide05Formula />;
      case 6:
        return <Slide06Numerical1Problem />;
      case 7:
        return <Slide07Numerical1Solution />;
      case 8:
        return <Slide08Numerical2Problem />;
      case 9:
        return <Slide09Numerical2Solution />;
      case 10:
        return <Slide10Methodology />;
      case 11:
        return <Slide11InteractiveGraphs />;
      case 12:
        return <Slide12ApplicationsEducationHealth />;
      case 13:
        return <Slide13ApplicationsAgriWeather />;
      case 14:
        return <Slide14ApplicationsBusinessMarketing />;
      case 15:
        return <Slide15ApplicationsTransportEng />;
      case 16:
        return <Slide16Conclusion />;
      default:
        return <Slide01Title onNext={goToNext} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#E0F2FE] via-[#FFF5F8] to-[#FCE7F3] text-[#27334A] flex flex-col justify-between font-sans select-none bg-pastel-dots"
    >
      {/* Visual Ambient Pastel Glow Orbs (Pastel Blue & Pastel Pink Aesthetic) */}
      <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-[#BAE6FD]/45 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#FBCFE8]/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-[32rem] h-[32rem] rounded-full bg-[#BFDBFE]/45 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-[#FCE7F3]/60 blur-3xl pointer-events-none" />

      {/* Top Navigation / Branding Header Elements */}
      <header className="fixed top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:px-6 sm:py-3.5 flex justify-between items-center">
        {/* Top-Left: Prominent Slide Number & Topic Badge */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-[#FFE0D2] select-none hover:bg-white transition-all">
          <span className="w-2 h-2 rounded-full bg-[#7C5CFC] animate-pulse" />
          <span className="text-xs font-black text-[#7C5CFC] tracking-wider uppercase">
            Slide {String(currentSlide).padStart(2, '0')}
          </span>
          <span className="text-xs text-[#27334A]/40 font-bold">/</span>
          <span className="text-xs text-[#27334A]/60 font-semibold">{String(totalSlides).padStart(2, '0')}</span>
          {currentMeta && (
            <>
              <span className="hidden sm:inline-block text-xs text-[#27334A]/25">|</span>
              <span className="hidden sm:inline-block text-xs font-semibold text-[#27334A]/80 max-w-[200px] md:max-w-[320px] truncate">
                {currentMeta.title}
              </span>
            </>
          )}
        </div>

        {/* Top-Right: Bharati Vidyapeeth Logo & Cutout Badge */}
        <div className="pointer-events-auto flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-[#E9E1FA] select-none hover:shadow-md transition-all group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
            <img
              src="/images/bvp-logo-cutout.png"
              alt="Bharati Vidyapeeth Deemed University Logo Cutout"
              className="w-full h-full object-contain filter drop-shadow-xs transform group-hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/bvp-logo.png';
              }}
            />
          </div>
          <div className="flex flex-col text-right leading-tight pr-1">
            <span className="text-[11px] sm:text-xs font-extrabold text-[#27334A] tracking-tight">
              Bharati Vidyapeeth
            </span>
            <span className="text-[9px] sm:text-[10px] font-medium text-[#7C5CFC]">
              Deemed to be University, Pune
            </span>
          </div>
        </div>
      </header>

      {/* Main Slide Presentation Stage */}
      <main className="relative z-10 flex-1 w-full h-[calc(100vh-76px)] pt-14 sm:pt-16 pb-2 overflow-hidden flex items-center justify-center p-2 sm:p-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={getVariants(direction)}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full max-w-6xl max-h-[820px] flex items-center justify-center"
          >
            {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Presentation Control Bar at Bottom */}
      <PresentationBar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNext={goToNext}
        onPrev={goToPrev}
        onOpenOverview={() => setIsOverviewOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Overview Modal */}
      <OverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        currentSlide={currentSlide}
        onSelectSlide={goToSlide}
      />
    </div>
  );
}

export default App;
