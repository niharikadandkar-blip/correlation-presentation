import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Megaphone, CheckCircle2 } from 'lucide-react';
import { AnimatedScatterPlot } from '../Visuals/AnimatedScatterPlot';

export const Slide14ApplicationsBusinessMarketing: React.FC = () => {
  const [selectedField, setSelectedField] = useState<'business' | 'marketing'>('business');

  const businessPairs = [
    { title: 'Product price and product demand', detail: 'In competitive markets, price increases generally associate inversely with sales volume.' },
    { title: 'Advertising expenditure and sales revenue', detail: 'Greater promotional reach exposes products to qualified buyers, driving revenue.' },
    { title: 'Employee experience and work performance', detail: 'Accumulated domain proficiency correlates with higher operational productivity.' },
  ];

  const marketingPairs = [
    { title: 'Time spent on advertisements and brand awareness', detail: 'Longer viewer attention spans correlate with heightened brand recall in surveys.' },
    { title: 'Social media engagement and website visits', detail: 'Content likes, comments, and shares drive referral traffic to digital stores.' },
    { title: 'Customer satisfaction and repeat purchases', detail: 'High Net Promoter Scores (NPS) correlate with strong post-sale customer retention.' },
  ];

  const bizPoints = [
    { id: 1, x: 10, y: 35 }, { id: 2, x: 20, y: 52 }, { id: 3, x: 30, y: 70 },
    { id: 4, x: 40, y: 88 }, { id: 5, x: 50, y: 110 }, { id: 6, x: 60, y: 125 }
  ];

  const mktPoints = [
    { id: 1, x: 500, y: 1200 }, { id: 2, x: 1200, y: 2800 }, { id: 3, x: 2000, y: 4500 },
    { id: 4, x: 3100, y: 6800 }, { id: 5, x: 4200, y: 9200 }, { id: 6, x: 5500, y: 11500 }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-2.5 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE0D2] text-[#FF7E67]">
            SLIDE 14 • APPLICATIONS (PART 3)
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Commercial Analytics</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
          Applications: Business & Marketing
        </h2>
        <p className="text-xs text-[#27334A]/70">
          Evaluating customer behavioral patterns, advertising expenditure, and market sales.
        </p>
      </div>

      {/* Switcher Buttons */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setSelectedField('business')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-2xl text-xs font-bold transition-all border ${
            selectedField === 'business'
              ? 'bg-[#FF7E67] text-white border-[#FF7E67] shadow-sm'
              : 'bg-white text-[#27334A]/80 border-[#E2E8F0] hover:bg-[#FFF8EF]'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>1. Corporate Business Operations</span>
        </button>

        <button
          onClick={() => setSelectedField('marketing')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-2xl text-xs font-bold transition-all border ${
            selectedField === 'marketing'
              ? 'bg-[#7C5CFC] text-white border-[#7C5CFC] shadow-sm'
              : 'bg-white text-[#27334A]/80 border-[#E2E8F0] hover:bg-[#FFF8EF]'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>2. Consumer Marketing</span>
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
                src={selectedField === 'business' ? '/images/business-sales.jpg' : '/images/marketing-analytics.jpg'}
                alt={selectedField === 'business' ? 'Business professional analyzing financial sales charts' : 'Digital marketing team working on campaign analytics'}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#27334A]/70 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/25 backdrop-blur-md">
                  {selectedField === 'business' ? 'Business Intelligence' : 'Digital Marketing'}
                </span>
                <p className="text-xs font-bold mt-0.5 drop-shadow-sm leading-tight">
                  {selectedField === 'business' ? 'Sales analytics & revenue optimization' : 'Social engagement & customer acquisition'}
                </p>
              </div>
            </div>

            {/* Paired Variables List */}
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C5CFC] block mb-1">
              Key Commercial Variables
            </span>
            <div className="space-y-1.5">
              {(selectedField === 'business' ? businessPairs : marketingPairs).map((pair, idx) => (
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

          <div className="mt-2 p-1.5 bg-[#FFE0D2]/40 rounded-xl border border-[#FFC8B3] text-[10px] text-[#27334A]/80 text-center font-medium">
            {selectedField === 'business'
              ? 'Evaluates marketing ROI and commercial productivity.'
              : 'Measures campaign response rates to improve marketing strategy.'}
          </div>
        </div>

        {/* Right Column: Scatter Plot Visual & Narrative */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-3.5 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] text-xs">
              <span className="font-bold text-[#27334A]">
                {selectedField === 'business' ? 'Ad Expenditure ($k) vs. Sales Revenue ($k)' : 'Social Media Shares vs. Website Visits'}
              </span>
              <span className="text-[10px] text-[#FF7E67] font-bold bg-[#FFE0D2] px-2 py-0.5 rounded-full">
                Positive Trend
              </span>
            </div>

            <p className="text-xs text-[#27334A]/85 mt-1.5 mb-1 leading-relaxed">
              {selectedField === 'business'
                ? "Businesses study correlations between marketing expenditures and gross sales revenue to project commercial profitability and guide budget allocation."
                : "Marketing analytics teams examine associations between digital social media impressions and e-commerce conversions to refine consumer targeting."}
            </p>

            <div className="my-1">
              <AnimatedScatterPlot
                data={selectedField === 'business' ? bizPoints : mktPoints}
                xLabel={selectedField === 'business' ? 'Ad Budget ($k)' : 'Social Shares'}
                yLabel={selectedField === 'business' ? 'Revenue ($k)' : 'Web Visits'}
                showTrendLine={true}
                colorScheme={selectedField === 'business' ? 'coral' : 'violet'}
                height={200}
                width={420}
              />
            </div>
          </div>

          <div className="p-2 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] text-[10px] text-[#27334A]/80">
            <strong>Key takeaway:</strong> Correlation helps businesses and marketing teams understand relationships between factors affecting overall commercial performance.
          </div>
        </div>

      </div>
    </div>
  );
};
