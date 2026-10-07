import React, { useEffect, useRef } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);

  // Global shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full">
      {/* Search text input with Cmd+K badge */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4 text-cyan-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="ძიება: სახელი (ქართ/ინგლ), სიმბოლო (H, Fe, Au) ან ატომური ნომერი (1, 26)..."
          className="w-full pl-10 pr-20 py-2.5 bg-[#0b121c]/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-200 shadow-inner"
        />

        {/* Clear Button or Cmd+K Badge */}
        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
          {searchQuery ? (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-white cursor-pointer transition-colors"
              aria-label="ძიების გასუფთავება"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-800/80 border border-slate-700/70 rounded-md shadow-sm">
              <span className="text-xs">⌘</span> K
            </kbd>
          )}
        </div>
      </div>

      {/* Phase filter pills */}
      <div className="flex items-center gap-1 bg-[#0b121c]/90 p-1 border border-slate-800 rounded-xl overflow-x-auto text-xs">
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
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
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
