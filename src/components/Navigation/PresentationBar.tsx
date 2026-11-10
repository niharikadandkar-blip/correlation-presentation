import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Grid, HelpCircle } from 'lucide-react';

interface PresentationBarProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onOpenOverview: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const PresentationBar: React.FC<PresentationBarProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onOpenOverview,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [showShortcuts, setShowShortcuts] = React.useState(false);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing inside an input element
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        onToggleFullscreen();
      } else if (e.key === 'o' || e.key === 'O' || e.key === 'Escape') {
        if (e.key !== 'Escape' || showShortcuts) {
          e.preventDefault();
          onOpenOverview();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onToggleFullscreen, onOpenOverview, showShortcuts]);

  const progressPercent = ((currentSlide) / totalSlides) * 100;

  return (
    <footer className="w-full fixed bottom-0 left-0 right-0 z-40 px-4 py-3 select-none pointer-events-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between pointer-events-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E2E8F0] shadow-soft">
        
        {/* Left: Overview grid and shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenOverview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF8EF] hover:bg-[#FFE0D2]/60 text-xs font-semibold text-[#27334A] border border-[#FFE0D2] transition-all hover:scale-105 active:scale-95"
            title="Open all slides overview (Key: O)"
          >
            <Grid className="w-3.5 h-3.5 text-[#FF7E67]" />
            <span className="hidden sm:inline">Overview</span>
          </button>

          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="p-1.5 rounded-xl text-[#27334A]/60 hover:text-[#27334A] hover:bg-[#F2FAF4] transition-colors"
            title="Keyboard shortcuts"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {showShortcuts && (
            <div className="absolute bottom-16 left-6 z-50 bg-[#27334A] text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-white/10 animate-fade-in">
              <div className="font-bold text-[#FFE0D2] pb-1 border-b border-white/20">Shortcuts</div>
              <div className="flex justify-between gap-4"><span>Next slide:</span> <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">Space / →</kbd></div>
              <div className="flex justify-between gap-4"><span>Prev slide:</span> <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">←</kbd></div>
              <div className="flex justify-between gap-4"><span>Overview:</span> <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">O</kbd></div>
              <div className="flex justify-between gap-4"><span>Fullscreen:</span> <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">F</kbd></div>
            </div>
          )}
        </div>

        {/* Center: Slide indicator & progress bar */}
        <div className="flex flex-col items-center gap-1 px-4 min-w-[160px]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#27334A]">
            <span className="text-[#7C5CFC] font-extrabold text-sm">
              {String(currentSlide).padStart(2, '0')}
            </span>
            <span className="text-[#27334A]/40 font-normal">/</span>
            <span className="text-[#27334A]/70">
              {String(totalSlides).padStart(2, '0')}
            </span>
          </div>

          {/* Minimal pastel progress track */}
          <div className="w-32 sm:w-44 h-1.5 bg-[#E9E1FA]/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF7E67] via-[#7C5CFC] to-[#38BDF8] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Prev, Next, Fullscreen */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onPrev}
            disabled={currentSlide <= 1}
            className={`p-2 rounded-xl border transition-all ${
              currentSlide <= 1
                ? 'opacity-40 cursor-not-allowed border-transparent text-gray-400'
                : 'bg-[#FFF8EF] border-[#FFE0D2] text-[#27334A] hover:bg-[#FFE0D2]/60 hover:scale-105 active:scale-95'
            }`}
            title="Previous slide (←)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onNext}
            disabled={currentSlide >= totalSlides}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-all ${
              currentSlide >= totalSlides
                ? 'opacity-40 cursor-not-allowed border-transparent text-gray-400'
                : 'bg-[#7C5CFC] text-white border-[#7C5CFC] hover:bg-[#6847EB] hover:scale-105 active:scale-95 shadow-sm'
            }`}
            title="Next slide (Space / →)"
          >
            <span className="text-xs font-semibold hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-[#E2E8F0] mx-1" />

          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-xl text-[#27334A]/70 hover:text-[#27334A] hover:bg-[#E9E1FA]/50 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </footer>
  );
};

