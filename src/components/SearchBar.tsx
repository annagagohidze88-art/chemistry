import React from 'react';
import { Search, X } from 'lucide-react';
import type { ElementPhase } from '../types/element';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPhase: ElementPhase | 'all';
  onPhaseChange: (phase: ElementPhase | 'all') => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedPhase,
  onPhaseChange,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full">
      {/* Search text input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="ძიება: სახელი (ქართ/ინგლ), სიმბოლო (H, Fe, Au) ან ატომური ნომერი (1, 26)..."
          className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 shadow-inner"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
            aria-label="ძიების გასუფთავება"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Phase filter pills */}
      <div className="flex items-center gap-1 bg-slate-900/80 p-1 border border-slate-800 rounded-xl overflow-x-auto text-xs">
        <span className="text-[11px] text-slate-400 px-2 font-medium hidden sm:inline">
          ფაზა 20°C-ზე:
        </span>
        {(
          [
            { id: 'all', label: 'ყველა' },
            { id: 'solid', label: 'მყარი' },
            { id: 'liquid', label: 'სითხე' },
            { id: 'gas', label: 'აირი' },
          ] as const
        ).map(phase => {
          const isActive = selectedPhase === phase.id;
          return (
            <button
              key={phase.id}
              onClick={() => onPhaseChange(phase.id)}
              className={`
                px-2.5 py-1.5 rounded-lg font-medium transition-all duration-150 cursor-pointer whitespace-nowrap
                ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              {phase.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
