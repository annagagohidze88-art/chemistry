import React from 'react';
import type { ChemicalElement } from '../types/element';
import { ATOMIC_DESIGN } from '../styles/designSystem';

interface ElementHoverCardProps {
  element: ChemicalElement;
  position?: { x: number; y: number } | null;
}

export const ElementHoverCard: React.FC<ElementHoverCardProps> = ({
  element,
  position,
}) => {
  const theme = ATOMIC_DESIGN.categories[element.category];

  // Calculate position or fallback to fixed floating card
  const style: React.CSSProperties = position
    ? {
        position: 'fixed',
        left: Math.min(Math.max(16, position.x + 12), window.innerWidth - 300),
        top: Math.min(Math.max(60, position.y + 12), window.innerHeight - 340),
        zIndex: 50,
      }
    : {
        position: 'relative',
      };

  return (
    <div
      style={style}
      className="w-72 bg-[#0b121c]/95 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-slate-100 pointer-events-none animate-fadeIn select-none z-50"
    >
      {/* Top Header Row */}
      <div className="flex items-start gap-3">
        {/* Mini Element Square Tile */}
        <div
          className={`w-12 h-12 rounded-xl border-2 flex flex-col items-center justify-center shrink-0 ${theme.borderClass} ${theme.bgClass}`}
          style={{ boxShadow: `0 0 12px ${theme.neonColor}40` }}
        >
          <span className="text-[9px] font-mono text-slate-400 self-start ml-1 leading-none font-bold">
            {element.atomicNumber}
          </span>
          <span className="text-xl font-black font-sans text-white leading-none tracking-tight">
            {element.symbol}
          </span>
        </div>

        {/* Title and Category */}
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-black text-white truncate flex items-center gap-1.5">
            <span>{element.nameKa}</span>
            <span className="text-xs font-normal text-slate-400 italic">({element.nameEn})</span>
          </h4>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
            {theme.nameKa} · Z={element.atomicNumber}
          </p>
        </div>
      </div>

      {/* Metrics Specs Grid */}
      <div className="mt-3.5 pt-3 border-t border-slate-800 space-y-1.5 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">მასა (Mass):</span>
          <span className="font-bold text-slate-200">{element.atomicMass} u</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">ფაზა (State @ 290 K):</span>
          <span className="font-bold text-slate-200">
            {element.phase === 'gas'
              ? 'აირი (gas)'
              : element.phase === 'liquid'
              ? 'სითხე (liquid)'
              : 'მყარი (solid)'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">კონფიგურაცია:</span>
          <span className="font-bold text-cyan-300 text-[11px] truncate max-w-[150px]">
            {element.electronConfiguration}
          </span>
        </div>
      </div>

      {/* Summary Description Footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-slate-300 leading-relaxed line-clamp-3">
        {element.summary || element.appearance}
      </div>
    </div>
  );
};
