import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw, Sun, Megaphone, CloudRain, CheckCircle2 } from 'lucide-react';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';
import { IceCreamAndThermometer } from '../Visuals/TopicIllustrations';
import { generateSyntheticPoints } from '../../utils/math';

export const Slide07Positive: React.FC = () => {
  const [animationKey, setAnimationKey] = useState<number>(1);
  const positivePoints = React.useMemo(() => generateSyntheticPoints(0.91, 16, 77), []);

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const realExamples = [
    {
      title: 'Summer Temp & Ice Cream Sales',
      desc: 'Higher ambient temperatures drive customer thirst and cold dessert craving.',
      icon: Sun,
    },
    {
      title: 'Advertising Budget & Retail Sales',
      desc: 'Greater promotional reach exposes products to more potential buyers.',
      icon: Megaphone,
    },
    {
      title: 'Monsoon Rainfall & Crop Growth',
      desc: 'Adequate hydration accelerates vegetative growth in agricultural belts.',
      icon: CloudRain,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-4">
      {/* Slide Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DDEFE1] text-[#27334A] border border-[#BDDEC4]">
            SLIDE 07 • POSITIVE CORRELATION
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Co-Directional Movement</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27334A] tracking-tight font-display">
              Positive Correlation (Direct Relationship)
            </h2>
            <p className="text-sm text-[#27334A]/70 mt-1">
              Both variables tend to move in the <strong>same direction</strong>: as X increases, Y also increases.
            </p>
          </div>
          <button
            onClick={handleReplay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-[#27334A] hover:bg-[#FFF8EF] shadow-sm transition-all active:scale-95"
            title="Replay point animations from left to right"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#FF7E67]" />
            <span>Replay Points</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Upward Scatter Plot + Real-World Examples & Illustration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left: Large Upward Scatter Plot */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF7E67]" />
                <span className="text-xs font-bold text-[#27334A]">Upward Sloping Scatter Pattern</span>
              </div>
              <span className="text-[11px] font-bold text-[#27334A] bg-[#DDEFE1] px-2.5 py-0.5 rounded-full border border-[#BDDEC4]">
                Slope &gt; 0 (r ≈ +0.91)
              </span>
            </div>

            <div key={animationKey}>
              <AnimatedScatterPlot
                data={positivePoints}
                xLabel="Variable X (e.g. Temperature °C)"
                yLabel="Variable Y (e.g. Sales units)"
                showTrendLine={true}
                colorScheme="coral"
                height={290}
                width={470}
              />
            </div>
          </div>

          <div className="mt-2 p-2.5 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] flex items-center justify-between text-xs">
            <span className="text-[#27334A]/80 font-medium">
              Arrows: <strong className="text-[#FF7E67]">X ↑ implies Y ↑</strong> &nbsp;|&nbsp; <strong className="text-[#7C5CFC]">X ↓ implies Y ↓</strong>
            </span>
            <span className="text-[11px] text-[#FF7E67] font-bold">r &gt; 0</span>
          </div>
        </div>

        {/* Right: Illustration + 3 Real Examples */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          
          {/* Visual Artwork Card */}
          <div className="bg-white rounded-3xl p-3 border border-[#E2E8F0] shadow-soft flex items-center justify-around">
            <IceCreamAndThermometer className="w-28 h-28" />
            <div className="text-left max-w-[190px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7E67]">
                Classic Benchmark
              </span>
              <h4 className="font-extrabold text-xs text-[#27334A] mt-0.5">Heat & Refreshment</h4>
              <p className="text-[11px] text-[#27334A]/70 leading-snug mt-1">
                Warm sunny days prompt higher beverage and ice cream purchases.
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
                  <div className="p-1.5 rounded-xl bg-[#FFF8EF] border border-[#FFE0D2] text-[#FF7E67] flex-shrink-0">
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

