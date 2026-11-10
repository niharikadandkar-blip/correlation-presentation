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
      className="relative w-screen h-screen overflow-hidden bg-[#FFF8EF] text-[#27334A] flex flex-col justify-between font-sans select-none bg-pastel-dots"
    >
      {/* Subtle Pastel Ambient Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FFE0D2]/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#E9E1FA]/45 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-[#DCEBFA]/45 blur-3xl pointer-events-none" />

      {/* Main Slide Presentation Stage */}
      <main className="relative z-10 flex-1 w-full h-[calc(100vh-76px)] overflow-hidden flex items-center justify-center p-2 sm:p-4 pb-2">
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
