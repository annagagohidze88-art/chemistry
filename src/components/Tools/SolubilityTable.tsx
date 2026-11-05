import React, { useState, useMemo } from 'react';
import {
  CATIONS,
  ANIONS,
  SOLUBILITY_TABLE,
  type SolubilityCell,
  type SolubilityState,
} from '../../data/solubilityData';
import { Waves, Search, X, Info, Sparkles, Filter } from 'lucide-react';

export const SolubilityTable: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<{
    cell: SolubilityCell;
    cationSymbol: string;
    anionSymbol: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState<SolubilityState | 'all'>('all');

  const filteredCations = useMemo(() => {
    if (!searchQuery.trim()) return CATIONS;
    const q = searchQuery.toLowerCase();
    return CATIONS.filter(
      c =>
        c.symbol.toLowerCase().includes(q) ||
        c.nameKa.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredAnions = useMemo(() => {
    if (!searchQuery.trim()) return ANIONS;
    const q = searchQuery.toLowerCase();
    return ANIONS.filter(
      a =>
        a.symbol.toLowerCase().includes(q) ||
        a.nameKa.toLowerCase().includes(q) ||
        a.acidNameKa.toLowerCase().includes(q) ||
        a.acidFormula.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCellClick = (cation: string, anion: string) => {
    const key = `${cation}_${anion}`;
    const cell = SOLUBILITY_TABLE[key] || {
      state: 'soluble' as SolubilityState,
      formula: `${cation}${anion}`,
      nameKa: `${cation} და ${anion}`,
    };
    setSelectedCell({ cell, cationSymbol: cation, anionSymbol: anion });
  };

  const getCellBadge = (cell: SolubilityCell) => {
    switch (cell.state) {
      case 'soluble':
        return {
          letter: 'ხ',
          label: 'ხსნადი',
          badgeClass:
            'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30',
        };
      case 'insoluble':
        return {
          letter: 'უ',
          label: 'უხსნადი (ნალექი)',
          badgeClass:
            'bg-rose-500/25 text-rose-300 border-rose-500/50 hover:bg-rose-500/40 font-black',
        };
      case 'sparingly':
        return {
          letter: 'მ',
          label: 'მცირედ ხსნადი',
          badgeClass:
            'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30',
        };
      case 'decomposes':
        return {
          letter: '—',
          label: 'იშლება წყალში / არ არსებობს',
          badgeClass: 'bg-slate-900 text-slate-500 border-slate-800',
        };
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-5 text-slate-100">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 shrink-0">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>მარილების, მჟავების და ტუტეების ხსნადობის ცხრილი</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                20 °C წყალში
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              სასკოლო კურსის ძირითადი ცნობარი: ნალექების წარმოქმნა, ფერები და იონური რეაქციები
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
            <span className="w-4 h-4 rounded bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-black">
              ხ
            </span>
            <span>ხსნადი</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold">
            <span className="w-4 h-4 rounded bg-rose-500 text-slate-950 flex items-center justify-center text-[10px] font-black">
              უ
            </span>
            <span>უხსნადი (ნალექი)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
            <span className="w-4 h-4 rounded bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">
              მ
            </span>
            <span>მცირედ ხსნადი</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 font-bold">
            <span className="w-4 h-4 rounded bg-slate-800 text-slate-400 flex items-center justify-center text-[10px]">
              —
            </span>
            <span>იშლება / არ არსებობს</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="მოძებნეთ კათიონი, ანიონი, ნაერთი (მაგ: Ba, SO4, Ag, Cl)..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter State Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-semibold">
          <span className="text-slate-400 flex items-center gap-1 mr-1 text-[11px]">
            <Filter className="w-3 h-3" />
            <span>ფილტრი:</span>
          </span>
          <button
            type="button"
            onClick={() => setFilterState('all')}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterState === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            ყველა
          </button>
          <button
            type="button"
            onClick={() => setFilterState('insoluble')}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterState === 'insoluble'
                ? 'bg-rose-500 text-white font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            მხოლოდ ნალექები (უ)
          </button>
          <button
            type="button"
            onClick={() => setFilterState('soluble')}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterState === 'soluble'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            ხსნადები (ხ)
          </button>
          <button
            type="button"
            onClick={() => setFilterState('sparingly')}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterState === 'sparingly'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            მცირედ ხსნადები (მ)
          </button>
        </div>
      </div>

      {/* Main Solubility Grid */}
      <div className="border border-slate-800 rounded-2xl overflow-hidden shadow-2xl bg-slate-950">
        <div className="overflow-x-auto max-h-[640px] custom-scrollbar">
          <table className="w-full border-collapse text-center text-xs font-mono select-none">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
                <th className="p-2.5 border-r border-slate-800 text-slate-400 font-bold text-left min-w-[130px] sticky left-0 bg-slate-900 z-40">
                  <div className="text-[10px] text-slate-400 font-sans">ანიონები →</div>
                  <div className="text-cyan-400 font-bold text-xs mt-0.5">↓ კათიონები</div>
                </th>
                {filteredAnions.map(anion => (
                  <th
                    key={anion.symbol}
                    className="p-2 border-r border-slate-800 min-w-[62px] text-center"
                    title={`${anion.nameKa} (${anion.acidNameKa} - ${anion.acidFormula})`}
                  >
                    <div className="font-extrabold text-cyan-300 text-sm">
                      {anion.symbol}
                    </div>
                    <div className="text-[9px] font-sans text-slate-400 truncate max-w-[60px] mx-auto">
                      {anion.nameKa}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCations.map((cation, rowIdx) => (
                <tr
                  key={cation.symbol}
                  className={`border-b border-slate-850 hover:bg-slate-900/50 transition-colors ${
                    rowIdx % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/20'
                  }`}
                >
                  {/* Sticky Cation Header */}
                  <th
                    className="p-2 border-r border-slate-800 text-left sticky left-0 z-20 bg-slate-900/95 backdrop-blur-md"
                    title={`${cation.nameKa} (მუხტი: ${cation.charge})`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-amber-300 text-sm">
                        {cation.symbol}
                      </span>
                      <span className="text-[10px] font-sans text-slate-400 font-medium">
                        {cation.nameKa}
                      </span>
                    </div>
                  </th>

                  {/* Anion cells */}
                  {filteredAnions.map(anion => {
                    const key = `${cation.symbol}_${anion.symbol}`;
                    const cell = SOLUBILITY_TABLE[key] || {
                      state: 'soluble' as SolubilityState,
                      formula: `${cation.symbol}${anion.symbol}`,
                      nameKa: `${cation.nameKa}ს ${anion.nameKa}`,
                    };

                    const badge = getCellBadge(cell);
                    const isDimmed = filterState !== 'all' && cell.state !== filterState;
                    const isSelected =
                      selectedCell?.cationSymbol === cation.symbol &&
                      selectedCell?.anionSymbol === anion.symbol;

                    return (
                      <td
                        key={anion.symbol}
                        className={`p-1 border-r border-slate-850 transition-all ${
                          isDimmed ? 'opacity-20' : 'opacity-100'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleCellClick(cation.symbol, anion.symbol)}
                          className={`w-full h-8 sm:h-9 rounded-lg border flex items-center justify-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                            badge.badgeClass
                          } ${
                            isSelected
                              ? 'ring-2 ring-cyan-400 scale-105 z-10 shadow-lg'
                              : ''
                          }`}
                          title={`${cell.formula} - ${cell.nameKa} (${badge.label})`}
                        >
                          {badge.letter}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Cell Deep Inspector Modal / Banner */}
      {selectedCell && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-cyan-500/40 shadow-2xl space-y-3 animate-fadeIn">
          <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 bg-slate-950 px-3 py-1 rounded-xl border border-cyan-500/30 shadow-md">
                {selectedCell.cell.formula}
              </span>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>{selectedCell.cell.nameKa}</span>
                </h4>
                <div className="text-xs text-slate-400 mt-0.5">
                  შედგება იონებისგან: <strong className="text-amber-300">{selectedCell.cationSymbol}</strong> +{' '}
                  <strong className="text-cyan-300">{selectedCell.anionSymbol}</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCell(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
              title="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] font-medium block">ხსნადობის სტატუსი:</span>
              <span
                className={`inline-block px-2.5 py-1 rounded-lg font-bold text-xs ${
                  getCellBadge(selectedCell.cell).badgeClass
                }`}
              >
                {getCellBadge(selectedCell.cell).label}
              </span>
            </div>

            {selectedCell.cell.color && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px] font-medium block">ნალექის ფერი & გარეგნობა:</span>
                <span className="font-bold text-rose-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>{selectedCell.cell.color}</span>
                </span>
              </div>
            )}

            {selectedCell.cell.description && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 md:col-span-2">
                <span className="text-slate-400 text-[11px] font-medium block flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ქიმიური & საგანმანათლებლო მნიშვნელობა:</span>
                </span>
                <p className="text-slate-200 leading-relaxed font-sans">
                  {selectedCell.cell.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
