import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, HelpCircle, RotateCcw, Plus, Trash2, Eye, Sparkles, Sliders } from 'lucide-react';
import { DataPoint } from '../../types/presentation';
import { calculateCorrelation, generateSyntheticPoints, generateZeroCorrelationPoints } from '../../utils/math';

export const Slide11InteractiveGraphs: React.FC = () => {
  const [mode, setMode] = useState<'positive' | 'negative' | 'zero'>('positive');
  const [strengthLevel, setStrengthLevel] = useState<'strong' | 'moderate' | 'weak'>('strong');

  // Base datasets
  const initialPositive = [
    { id: 1, x: 20, y: 15, label: 'Obs #1' },
    { id: 2, x: 35, y: 30, label: 'Obs #2' },
    { id: 3, x: 50, y: 48, label: 'Obs #3' },
    { id: 4, x: 68, y: 65, label: 'Obs #4' },
    { id: 5, x: 85, y: 82, label: 'Obs #5' },
  ];

  const initialNegative = [
    { id: 1, x: 20, y: 85, label: 'Obs #1' },
    { id: 2, x: 35, y: 70, label: 'Obs #2' },
    { id: 3, x: 50, y: 52, label: 'Obs #3' },
    { id: 4, x: 68, y: 34, label: 'Obs #4' },
    { id: 5, x: 85, y: 18, label: 'Obs #5' },
  ];

  const initialZero = [
    { id: 1, x: 20, y: 45, label: 'Obs #1' },
    { id: 2, x: 35, y: 80, label: 'Obs #2' },
    { id: 3, x: 50, y: 25, label: 'Obs #3' },
    { id: 4, x: 68, y: 70, label: 'Obs #4' },
    { id: 5, x: 85, y: 35, label: 'Obs #5' },
  ];

  const [points, setPoints] = useState<DataPoint[]>(initialPositive);
  const [selectedPointId, setSelectedPointId] = useState<number | null>(3);
  const [draggingPointId, setDraggingPointId] = useState<number | null>(null);

  // New observation inputs
  const [newX, setNewX] = useState('60');
  const [newY, setNewY] = useState('55');

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Switch correlation mode
  const handleModeSwitch = (newMode: 'positive' | 'negative' | 'zero') => {
    setMode(newMode);
    if (newMode === 'positive') {
      setPoints(initialPositive);
    } else if (newMode === 'negative') {
      setPoints(initialNegative);
    } else {
      setPoints(initialZero);
    }
    setSelectedPointId(3);
  };

  // Adjust spread/strength while keeping direction
  const handleStrengthAdjust = (level: 'strong' | 'moderate' | 'weak') => {
    setStrengthLevel(level);
    if (mode === 'zero') return;

    const targetR = mode === 'positive'
      ? (level === 'strong' ? 0.95 : level === 'moderate' ? 0.65 : 0.28)
      : (level === 'strong' ? -0.95 : level === 'moderate' ? -0.65 : -0.28);

    const generated = generateSyntheticPoints(targetR, points.length, Math.floor(Math.random() * 1000));
    setPoints(generated);
  };

  // Live mathematical calculation
  const stats = calculateCorrelation(points);
  const selectedPoint = points.find((p) => p.id === selectedPointId) || null;

  // Reset current mode to defaults
  const handleReset = () => {
    handleModeSwitch(mode);
    setStrengthLevel('strong');
  };

  // Add observation
  const handleAddPoint = () => {
    const xVal = parseFloat(newX);
    const yVal = parseFloat(newY);
    if (isNaN(xVal) || isNaN(yVal)) return;

    const nextId = points.length > 0 ? Math.max(...points.map((p) => p.id)) + 1 : 1;
    const newPt: DataPoint = { id: nextId, x: xVal, y: yVal, label: `Obs #${nextId}` };
    setPoints([...points, newPt]);
    setSelectedPointId(nextId);
  };

  // Delete observation
  const handleDeletePoint = (id: number) => {
    if (points.length <= 2) return;
    setPoints(points.filter((p) => p.id !== id));
    if (selectedPointId === id) setSelectedPointId(null);
  };

  // Update specific point values
  const handleUpdateVal = (id: number, field: 'x' | 'y', valStr: string) => {
    const val = parseFloat(valStr);
    if (isNaN(val)) return;
    setPoints(points.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  // Dragging interaction handlers
  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (draggingPointId === null || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    // Convert client coordinates to SVG 0-100 space
    const xRel = ((e.clientX - rect.left) / rect.width) * 100;
    const yRel = 100 - ((e.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.max(5, Math.min(95, Math.round(xRel)));
    const clampedY = Math.max(5, Math.min(95, Math.round(yRel)));

    setPoints(points.map((p) => (p.id === draggingPointId ? { ...p, x: clampedX, y: clampedY } : p)));
  };

  const handleSvgMouseUp = () => {
    setDraggingPointId(null);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-5xl mx-auto px-4 py-2 overflow-y-auto">
      {/* Slide Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E9E1FA] text-[#7C5CFC]">
            SLIDE 11 • MAIN INTERACTIVE DEMO
          </span>
          <span className="text-xs text-[#27334A]/60 font-medium">Hands-On Laboratory</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27334A] tracking-tight font-display">
              Understanding Correlation Through Graphs
            </h2>
            <p className="text-xs text-[#27334A]/70">
              Drag points, edit coordinates, toggle modes, and watch Pearson's r update in real time.
            </p>
          </div>

          {/* Recalculated Metric Badge */}
          <div className="bg-white px-3 py-1.5 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center gap-3">
            <div>
              <span className="text-[9px] font-bold text-[#27334A]/60 uppercase block">Calculated r</span>
              <span className="text-sm font-black text-[#7C5CFC]">
                {stats.r >= 0 ? `+${stats.r.toFixed(3)}` : stats.r.toFixed(3)}
              </span>
            </div>
            <div className="w-px h-6 bg-[#E2E8F0]" />
            <div>
              <span className="text-[9px] font-bold text-[#27334A]/60 uppercase block">Classification</span>
              <span className="text-xs font-bold text-[#FF7E67]">
                {stats.strength} {stats.direction}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Mode Switcher + Strength Slider + Reset */}
      <div className="bg-white/90 p-2.5 rounded-2xl border border-[#E2E8F0] shadow-xs mb-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Mode Selector */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#27334A]/70 text-[11px] mr-1">Pattern:</span>
          {[
            { id: 'positive', label: 'Positive', icon: TrendingUp, color: 'text-[#FF7E67]' },
            { id: 'negative', label: 'Negative', icon: TrendingDown, color: 'text-[#7C5CFC]' },
            { id: 'zero', label: 'Zero', icon: HelpCircle, color: 'text-[#38BDF8]' },
          ].map((m) => {
            const Icon = m.icon;
            const isSelected = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleModeSwitch(m.id as any)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#FFF8EF] border-[#FFE0D2] shadow-xs scale-105'
                    : 'bg-white border-[#E2E8F0] text-[#27334A]/70 hover:bg-[#FFF8EF]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Strength Controls */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#27334A]/70 text-[11px]">Strength Spread:</span>
          {(['strong', 'moderate', 'weak'] as const).map((lvl) => (
            <button
              key={lvl}
              disabled={mode === 'zero'}
              onClick={() => handleStrengthAdjust(lvl)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize transition-all border ${
                strengthLevel === lvl && mode !== 'zero'
                  ? 'bg-[#7C5CFC] text-white border-[#7C5CFC]'
                  : 'bg-white text-[#27334A]/70 border-[#E2E8F0] hover:bg-[#FFF8EF] disabled:opacity-30'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#FFF8EF] border border-[#FFE0D2] text-[#FF7E67] hover:bg-[#FFE0D2]/50"
          title="Restore initial dataset"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Interactive Arena: Draggable SVG Scatter Plot on Left + Data Table on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
        
        {/* Left: Draggable Interactive SVG Canvas */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-3 border border-[#E2E8F0] shadow-soft flex flex-col justify-between select-none">
          <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] text-xs">
            <span className="font-bold text-[#27334A]">Draggable Canvas ({points.length} Points)</span>
            <span className="text-[10px] text-[#27334A]/60">Tip: Click dot to inspect or drag anywhere</span>
          </div>

          {/* SVG Plot */}
          <div className="relative w-full h-[220px] bg-[#FFF8EF]/40 rounded-2xl border border-[#FFE0D2] my-1 overflow-hidden">
            <svg
              ref={svgRef}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full cursor-crosshair"
              onMouseMove={handleSvgMouseMove}
              onMouseUp={handleSvgMouseUp}
              onMouseLeave={handleSvgMouseUp}
            >
              {/* Subtle Gridlines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="25" y1="0" x2="25" y2="100" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="75" y1="0" x2="75" y2="100" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2 2" />

              {/* Dynamic Best Fit Trend Line */}
              {Math.abs(stats.r) >= 0.1 && (
                <line
                  x1="5"
                  y1={100 - (stats.slope * 5 + stats.intercept)}
                  x2="95"
                  y2={100 - (stats.slope * 95 + stats.intercept)}
                  stroke={stats.slope > 0 ? '#FF7E67' : '#7C5CFC'}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  opacity="0.75"
                />
              )}

              {/* Plotted Points */}
              {points.map((pt) => {
                const isSelected = selectedPointId === pt.id;
                const isDragging = draggingPointId === pt.id;
                return (
                  <g key={pt.id}>
                    {isSelected && (
                      <circle
                        cx={pt.x}
                        cy={100 - pt.y}
                        r="6"
                        fill="none"
                        stroke="#FF7E67"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={100 - pt.y}
                      r={isDragging ? 5.5 : isSelected ? 4.5 : 3.5}
                      fill={isSelected ? '#FF7E67' : '#7C5CFC'}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="cursor-grab active:cursor-grabbing hover:scale-125 transition-transform"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setDraggingPointId(pt.id);
                        setSelectedPointId(pt.id);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPointId(pt.id);
                      }}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Observation Banner */}
          <div className="p-2 bg-[#FFF8EF] rounded-xl border border-[#FFE0D2] flex items-center justify-between text-xs">
            {selectedPoint ? (
              <span className="text-[#27334A]">
                Selected Observation: <strong className="text-[#FF7E67]">#{selectedPoint.id}</strong> — X: <strong className="text-[#7C5CFC]">{selectedPoint.x}</strong>, Y: <strong className="text-[#FF7E67]">{selectedPoint.y}</strong>
              </span>
            ) : (
              <span className="text-[#27334A]/60">Select or drag a point on the canvas</span>
            )}
            <span className="text-[10px] text-[#7C5CFC] font-bold">Slope: {stats.slope.toFixed(2)}</span>
          </div>
        </div>

        {/* Right: Editable Dataset Table & Point Addition */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-3 border border-[#E2E8F0] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#27334A]">Observation Table</span>
              <span className="text-[10px] text-[#27334A]/60">Live values</span>
            </div>

            {/* Table Rows */}
            <div className="overflow-y-auto max-h-[145px] my-1.5 space-y-1 pr-1">
              <div className="grid grid-cols-12 text-[10px] font-bold text-[#27334A]/60 px-2 py-1 bg-[#DCEBFA]/40 rounded-lg">
                <span className="col-span-2 text-center">ID</span>
                <span className="col-span-4 text-center">X Val</span>
                <span className="col-span-4 text-center">Y Val</span>
                <span className="col-span-2 text-center">Del</span>
              </div>

              {points.map((pt) => {
                const isSelected = selectedPointId === pt.id;
                return (
                  <div
                    key={pt.id}
                    onClick={() => setSelectedPointId(pt.id)}
                    className={`grid grid-cols-12 items-center px-1.5 py-1 rounded-xl text-xs border cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFE0D2]/60 border-[#FF7E67]'
                        : 'bg-white hover:bg-[#FFF8EF] border-[#E2E8F0]'
                    }`}
                  >
                    <span className="col-span-2 font-bold text-center text-[#7C5CFC]">#{pt.id}</span>
                    <div className="col-span-4 px-1">
                      <input
                        type="number"
                        value={pt.x}
                        onChange={(e) => handleUpdateVal(pt.id, 'x', e.target.value)}
                        className="w-full text-center py-0.5 bg-[#FFF8EF] border border-[#E2E8F0] rounded text-xs font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="col-span-4 px-1">
                      <input
                        type="number"
                        value={pt.y}
                        onChange={(e) => handleUpdateVal(pt.id, 'y', e.target.value)}
                        className="w-full text-center py-0.5 bg-[#FFF8EF] border border-[#E2E8F0] rounded text-xs font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePoint(pt.id);
                        }}
                        className="text-[#27334A]/40 hover:text-red-500 p-0.5"
                        title="Delete point"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add Observation Form */}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                placeholder="X"
                value={newX}
                onChange={(e) => setNewX(e.target.value)}
                className="w-1/3 text-xs px-2 py-1 bg-[#FFF8EF] border border-[#E2E8F0] rounded-lg text-center"
              />
              <input
                type="number"
                placeholder="Y"
                value={newY}
                onChange={(e) => setNewY(e.target.value)}
                className="w-1/3 text-xs px-2 py-1 bg-[#FFF8EF] border border-[#E2E8F0] rounded-lg text-center"
              />
              <button
                onClick={handleAddPoint}
                className="w-1/3 flex items-center justify-center gap-1 bg-[#7C5CFC] hover:bg-[#6847EB] text-white text-xs font-semibold py-1 rounded-lg"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

