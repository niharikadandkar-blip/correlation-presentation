import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, RotateCcw, AlertCircle } from 'lucide-react';
import { DataPoint } from '../../types/presentation';

interface DatasetEditorProps {
  data: DataPoint[];
  onChangeData: (newData: DataPoint[]) => void;
  onReset: () => void;
  selectedPointId: number | null;
  onSelectPoint: (id: number | null) => void;
  xLabel?: string;
  yLabel?: string;
}

export const DatasetEditor: React.FC<DatasetEditorProps> = ({
  data,
  onChangeData,
  onReset,
  selectedPointId,
  onSelectPoint,
  xLabel = 'Temp (°C)',
  yLabel = 'Sales',
}) => {
  const [newX, setNewX] = useState<string>('30');
  const [newY, setNewY] = useState<string>('22');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleUpdateValue = (id: number, field: 'x' | 'y', valueStr: string) => {
    const val = parseFloat(valueStr);
    if (isNaN(val)) return;

    const updated = data.map((pt) => {
      if (pt.id === id) {
        return {
          ...pt,
          [field]: val,
          label: `Obs #${id} (${field === 'x' ? val : pt.x}, ${field === 'y' ? val : pt.y})`,
        };
      }
      return pt;
    });
    onChangeData(updated);
  };

  const handleAddPoint = () => {
    const parsedX = parseFloat(newX);
    const parsedY = parseFloat(newY);

    if (isNaN(parsedX) || isNaN(parsedY)) {
      setErrorMsg('Please enter valid numeric values for X and Y.');
      return;
    }
    if (parsedX < -100 || parsedX > 1000 || parsedY < -100 || parsedY > 1000) {
      setErrorMsg('Values should be within reasonable bounds (-100 to 1000).');
      return;
    }

    setErrorMsg(null);
    const nextId = data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
    const newPoint: DataPoint = {
      id: nextId,
      x: parsedX,
      y: parsedY,
      label: `Obs #${nextId} (${parsedX}, ${parsedY})`,
    };
    onChangeData([...data, newPoint]);
    onSelectPoint(nextId);
  };

  const handleDeletePoint = (id: number) => {
    if (data.length <= 2) {
      setErrorMsg('Need at least 2 points for a meaningful scatter plot.');
      return;
    }
    setErrorMsg(null);
    const filtered = data.filter((d) => d.id !== id);
    onChangeData(filtered);
    if (selectedPointId === id) {
      onSelectPoint(null);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#E2E8F0] shadow-soft text-[#27334A] flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div>
          <h4 className="font-semibold text-sm tracking-wide text-[#27334A]">Live Dataset Table</h4>
          <p className="text-xs text-[#27334A]/70">Click a row to inspect or edit values</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#FFF8EF] border border-[#FFE0D2] text-[#FF7E67] hover:bg-[#FFE0D2]/50 transition-colors shadow-sm"
          title="Restore standard values"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Scrollable table rows */}
      <div className="overflow-y-auto max-h-[190px] my-2 pr-1 space-y-1.5">
        <div className="grid grid-cols-12 gap-1 text-[11px] font-bold text-[#27334A]/60 px-2 py-1 bg-[#DCEBFA]/30 rounded-lg">
          <div className="col-span-2 text-center">Obs #</div>
          <div className="col-span-4 text-center">{xLabel}</div>
          <div className="col-span-4 text-center">{yLabel}</div>
          <div className="col-span-2 text-center">Del</div>
        </div>

        <AnimatePresence>
          {data.map((point) => {
            const isSelected = selectedPointId === point.id;
            return (
              <motion.div
                key={point.id}
                layout
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => onSelectPoint(isSelected ? null : point.id)}
                className={`grid grid-cols-12 gap-1 items-center px-2 py-1.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#FFE0D2]/60 border-[#FF7E67] ring-1 ring-[#FF7E67]'
                    : 'bg-white hover:bg-[#FFF8EF] border-[#E2E8F0]'
                }`}
              >
                <div className="col-span-2 font-bold text-center text-[#7C5CFC]">
                  #{point.id}
                </div>
                <div className="col-span-4">
                  <input
                    type="number"
                    value={point.x}
                    onChange={(e) => handleUpdateValue(point.id, 'x', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full text-center py-1 px-1 bg-[#FFF8EF] border border-[#E2E8F0] rounded-md font-semibold text-[#27334A] focus:outline-none focus:ring-1 focus:ring-[#7C5CFC]"
                  />
                </div>
                <div className="col-span-4">
                  <input
                    type="number"
                    value={point.y}
                    onChange={(e) => handleUpdateValue(point.id, 'y', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full text-center py-1 px-1 bg-[#FFF8EF] border border-[#E2E8F0] rounded-md font-semibold text-[#27334A] focus:outline-none focus:ring-1 focus:ring-[#7C5CFC]"
                  />
                </div>
                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePoint(point.id);
                    }}
                    className="p-1 text-[#27334A]/50 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Remove observation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add Observation inputs */}
      <div className="mt-auto pt-2 border-t border-[#E2E8F0]">
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            placeholder="New X"
            value={newX}
            onChange={(e) => setNewX(e.target.value)}
            className="w-1/3 text-xs px-2 py-1.5 bg-[#FFF8EF] border border-[#E2E8F0] rounded-lg text-center font-medium focus:ring-1 focus:ring-[#7C5CFC] outline-none"
          />
          <input
            type="number"
            placeholder="New Y"
            value={newY}
            onChange={(e) => setNewY(e.target.value)}
            className="w-1/3 text-xs px-2 py-1.5 bg-[#FFF8EF] border border-[#E2E8F0] rounded-lg text-center font-medium focus:ring-1 focus:ring-[#7C5CFC] outline-none"
          />
          <button
            onClick={handleAddPoint}
            className="w-1/3 flex items-center justify-center gap-1 bg-[#7C5CFC] hover:bg-[#6847EB] text-white text-xs font-semibold py-1.5 px-2 rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-1 mt-1 text-[11px] text-red-600 bg-red-50 px-2 py-1 rounded">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};

