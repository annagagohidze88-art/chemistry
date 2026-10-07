import React from 'react';
import { X } from 'lucide-react';
import type { ElementCategory } from '../types/element';
import { CATEGORIES } from '../data/categories';

interface LegendProps {
  selectedCategory: ElementCategory | 'all';
  onSelectCategory: (category: ElementCategory | 'all') => void;
  elementCounts: Record<ElementCategory, number>;
}

export const Legend: React.FC<LegendProps> = ({
  selectedCategory,
  onSelectCategory,
  elementCounts,
}) => {
  const categoryKeys = Object.keys(CATEGORIES) as ElementCategory[];

  return (
    <div className="bg-slate-900/90 border border-slate-750 rounded-2xl p-3 md:p-4 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-xs md:text-sm font-bold text-slate-200 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shadow-sm shadow-sky-400/80" />
          <span>ქიმიურ ელემენტთა ოჯახები (ფილტრაცია):</span>
        </h3>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs text-sky-400 hover:text-sky-300 transition-colors font-semibold cursor-pointer px-2 py-0.5 rounded-md hover:bg-sky-500/10 inline-flex items-center gap-1"
          >
            <span>ფილტრის მოხსნა</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 md:gap-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={`
            px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer border shadow-sm
            ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-400 shadow-md shadow-sky-500/25 scale-105'
                : 'bg-slate-800/90 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
            }
          `}
        >
          ყველა (118)
        </button>

        {categoryKeys.map(catKey => {
          const cat = CATEGORIES[catKey];
          const isSelected = selectedCategory === catKey;
          const count = elementCounts[catKey] || 0;

          return (
            <button
              key={catKey}
              onClick={() => onSelectCategory(isSelected ? 'all' : catKey)}
              title={cat.descriptionKa}
              className={`
                group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border shadow-sm
                ${
                  isSelected
                    ? `${cat.badgeBg} ${cat.borderClass} ring-2 ring-white/60 shadow-lg scale-105`
                    : `${cat.colorClass} hover:scale-[1.03]`
                }
              `}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: isSelected ? 'white' : undefined,
                  boxShadow: `0 0 6px ${cat.glowColor}`,
                }}
              />
              <span>{cat.nameKa}</span>
              <span className="text-[10px] opacity-80 font-mono">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
