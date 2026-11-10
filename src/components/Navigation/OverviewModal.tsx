import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { SLIDES_METADATA } from '../../data/slidesMetadata';

interface OverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
  onSelectSlide: (slideNumber: number) => void;
}

export const OverviewModal: React.FC<OverviewModalProps> = ({
  isOpen,
  onClose,
  currentSlide,
  onSelectSlide,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#27334A]/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="w-full max-w-4xl max-h-[85vh] bg-[#FFF8EF] rounded-3xl border border-[#FFE0D2] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#FFE0D2] bg-white/70">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#7C5CFC]" />
                <h3 className="font-bold text-lg text-[#27334A]">Presentation Slide Directory</h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E9E1FA] text-[#7C5CFC]">
                  16 Slides
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-[#FFE0D2]/50 text-[#27334A]/60 hover:text-[#27334A] transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of slides */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {SLIDES_METADATA.map((slide) => {
                const isActive = slide.id === currentSlide;
                return (
                  <motion.div
                    key={slide.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectSlide(slide.id);
                      onClose();
                    }}
                    className={`cursor-pointer rounded-2xl p-3.5 border transition-all text-left flex flex-col justify-between ${
                      isActive
                        ? 'bg-white border-[#7C5CFC] ring-2 ring-[#7C5CFC]/30 shadow-md'
                        : 'bg-white/80 hover:bg-white border-[#E2E8F0] shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                          isActive ? 'bg-[#7C5CFC] text-white' : 'bg-[#E9E1FA] text-[#7C5CFC]'
                        }`}>
                          {String(slide.id).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-[#27334A]/50 bg-[#FFF8EF] px-1.5 py-0.5 rounded border border-[#FFE0D2]">
                          {slide.tag}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-[#27334A] line-clamp-1">
                        {slide.title}
                      </h4>
                      <p className="text-[11px] text-[#27334A]/70 line-clamp-2 mt-1 leading-snug">
                        {slide.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

