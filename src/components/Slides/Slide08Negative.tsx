import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, RefreshCw, Gauge, DollarSign, Navigation, ArrowDownRight } from 'lucide-react';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';
import { CarSpeedAndTime } from '../Visuals/TopicIllustrations';
import { generateSyntheticPoints } from '../../utils/math';

export const Slide08Negative: React.FC = () => {
  const [animationKey, setAnimationKey] = useState<number>(1);
  const negativePoints = React.useMemo(() => generateSyntheticPoints(-0.89, 16, 92), []);

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const realExamples = [
    {
      title: 'Vehicle Speed vs. Travel Duration',
      desc: 'Driving at 90 km/h reaches the destination in far fewer minutes than driving at 40 km/h.',
      icon: Gauge,
    },
    {
      title: 'Product Price vs. Consumer Demand',
      desc: 'In standard competitive markets, sharp price hikes typically lead to lower quantity demanded.',
      icon: DollarSign,
    },
    {
      title: 'Distance Travelled vs. Remaining Route',
      desc: 'On a 200 km road trip, every kilometer covered subtracts directly from the distance left.',
      icon: Navigation,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-4">
      {/* Slide Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE0D2] text-[#27334A] border border-[#FFC8B3]">
            SLIDE 08 • NEGATIVE CORRELATION
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Inverse Association</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27334A] tracking-tight font-display">
              Negative Correlation (Inverse Relationship)
            </h2>
            <p className="text-sm text-[#27334A]/70 mt-1">
              One variable increases while the other <strong>decreases</strong>: as X rises, Y falls.
            </p>
          </div>
          <button
            onClick={handleReplay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-[#27334A] hover:bg-[#FFF8EF] shadow-sm transition-all active:scale-95"
            title="Replay point animations"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#7C5CFC]" />
            <span>Replay Points</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Downward Scatter Plot + Real-World Examples & Artwork */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left: Large Downward Scatter Plot */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFC]" />
                <span className="text-xs font-bold text-[#27334A]">Downward Sloping Scatter Pattern</span>
              </div>
              <span className="text-[11px] font-bold text-[#27334A] bg-[#FFE0D2] px-2.5 py-0.5 rounded-full border border-[#FFC8B3]">
                Slope &lt; 0 (r ≈ -0.89)
              </span>
            </div>

            <div key={animationKey}>
              <AnimatedScatterPlot
                data={negativePoints}
                xLabel="Variable X (e.g. Speed in km/h)"
                yLabel="Variable Y (e.g. Travel Time in mins)"
                showTrendLine={true}
                colorScheme="violet"
                height={290}
                width={470}
              />
            </div>
          </div>

          <div className="mt-2 p-2.5 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] flex items-center justify-between text-xs">
            <span className="text-[#27334A]/80 font-medium">
              Arrows: <strong className="text-[#7C5CFC]">X ↑ implies Y ↓</strong> &nbsp;|&nbsp; <strong className="text-[#FF7E67]">X ↓ implies Y ↑</strong>
            </span>
            <span className="text-[11px] text-[#7C5CFC] font-bold">r &lt; 0</span>
          </div>
        </div>

        {/* Right: Artwork + 3 Real Examples */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          
          {/* Visual Artwork Card */}
          <div className="bg-white rounded-3xl p-3 border border-[#E2E8F0] shadow-soft flex items-center justify-around">
            <CarSpeedAndTime className="w-28 h-28" />
            <div className="text-left max-w-[190px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C5CFC]">
                Everyday Trade-Off
              </span>
              <h4 className="font-extrabold text-xs text-[#27334A] mt-0.5">Speed vs. Time</h4>
              <p className="text-[11px] text-[#27334A]/70 leading-snug mt-1">
                Higher velocity steadily shrinks the remaining travel duration.
              </p>
            </div>
          </div>

          {/* 3 Real Life Situation Cards */}
          <div className="space-y-2">
            {realExamples.map((ex, i) => {
              const Icon = ex.icon;
              return (
                <div
                  key={i}
                  className="bg-white/90 rounded-2xl p-2.5 border border-[#E2E8F0] shadow-sm flex items-start gap-2.5"
                >
                  <div className="p-1.5 rounded-xl bg-[#E9E1FA] border border-[#D5C4F7] text-[#7C5CFC] flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#27334A]">{ex.title}</h5>
                    <p className="text-[11px] text-[#27334A]/70 leading-snug">{ex.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};

