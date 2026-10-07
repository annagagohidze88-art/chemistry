import React from 'react';
import type { ChemicalElement, ElementCategory, ElementPhase } from '../types/element';
import { ROMAN_PERIODS } from '../types/element';
import { ElementTile } from './ElementTile';
import { ElementHoverCard } from './ElementHoverCard';
import { matchesFilters } from '../utils/selection';

interface PeriodicTableProps {
  elements: ChemicalElement[];
  selectedElements: ChemicalElement[];
  activeElement: ChemicalElement | null;
  filterCategory: ElementCategory | 'all';
  filterPhase: ElementPhase | 'all';
  searchQuery: string;
  onElementClick: (element: ChemicalElement) => void;
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({
  elements,
  selectedElements,
  activeElement,
  filterCategory,
  filterPhase,
  searchQuery,
  onElementClick,
}) => {
  const [hoveredElement, setHoveredElement] = React.useState<{
    element: ChemicalElement;
    pos: { x: number; y: number };
  } | null>(null);

  // Elements lookup map by atomic number
  const elementMap = React.useMemo(() => {
    const map = new Map<number, ChemicalElement>();
    elements.forEach(e => map.set(e.atomicNumber, e));
    return map;
  }, [elements]);

  // Selected elements atomic numbers map to 1-based index
  const selectedIndexMap = React.useMemo(() => {
    const map = new Map<number, number>();
    selectedElements.forEach((el, index) => {
      map.set(el.atomicNumber, index + 1);
    });
    return map;
  }, [selectedElements]);

  const isElementMatch = (el: ChemicalElement) =>
    matchesFilters(el, searchQuery, filterCategory, filterPhase);

  const hasActiveFilterOrSearch =
    filterCategory !== 'all' || filterPhase !== 'all' || searchQuery.trim().length > 0;

  // Render a specific atomic number cell
  const renderCell = (atomicNumber: number) => {
    const el = elementMap.get(atomicNumber);
    if (!el) return <div className="w-full h-full" />;

    const matches = isElementMatch(el);
    const isDimmed = hasActiveFilterOrSearch && !matches;
    const isHighlighted = hasActiveFilterOrSearch && matches;
    const selectionIndex = selectedIndexMap.get(el.atomicNumber) || null;

    return (
      <ElementTile
        key={el.atomicNumber}
        element={el}
        selectionIndex={selectionIndex}
        isActiveDetail={activeElement?.atomicNumber === el.atomicNumber}
        isDimmed={isDimmed}
        isHighlighted={isHighlighted}
        onClick={onElementClick}
        onHover={(hoveredEl, pos) => {
          if (hoveredEl && pos) {
            setHoveredElement({ element: hoveredEl, pos });
          } else {
            setHoveredElement(null);
          }
        }}
      />
    );
  };

  // Group columns (1-18)
  const GROUPS = Array.from({ length: 18 }, (_, i) => i + 1);

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-6 pt-2">
      <div className="min-w-[1020px] max-w-[1440px] mx-auto px-2">
        {/* Main Grid: 18 Columns x 7 Periods */}
        <div className="grid grid-cols-[38px_repeat(18,_minmax(0,_1fr))] gap-1 md:gap-1.5 items-stretch">
          {/* Top header row: Group Numbers */}
          <div className="h-6 flex items-center justify-center text-[10px] font-mono text-slate-500 font-bold" title="პერიოდი \ ჯგუფი">
            P \ G
          </div>
          {GROUPS.map(g => (
            <div
              key={`group-${g}`}
              className="h-6 flex items-center justify-center text-[10px] md:text-xs font-mono font-bold text-slate-300 bg-slate-900/80 border border-slate-800/80 rounded-md shadow-sm"
              title={`ჯგუფი ${g}`}
            >
              {g}
            </div>
          ))}

          {/* Period I */}
          <div
            className="flex items-center justify-center text-xs font-mono font-extrabold text-amber-300 bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-750 rounded-lg shadow-sm font-serif"
            title="პერიოდი I (პირველი პერიოდი)"
          >
            {ROMAN_PERIODS[1]}
          </div>
          <div className="col-span-1">{renderCell(1)}</div>
          <div className="col-span-16 grid grid-cols-16 gap-1" />
          <div className="col-span-1">{renderCell(2)}</div>

          {/* Period II */}
          <div
            className="flex items-center justify-center text-xs font-mono font-extrabold text-amber-300 bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-750 rounded-lg shadow-sm font-serif"
            title="პერიოდი II (მეორე პერიოდი)"
          >
            {ROMAN_PERIODS[2]}
          </div>
          <div className="col-span-1">{renderCell(3)}</div>
          <div className="col-span-1">{renderCell(4)}</div>
          <div className="col-span-10 grid grid-cols-10 gap-1" />
          <div className="col-span-1">{renderCell(5)}</div>
          <div className="col-span-1">{renderCell(6)}</div>
          <div className="col-span-1">{renderCell(7)}</div>
          <div className="col-span-1">{renderCell(8)}</div>
          <div className="col-span-1">{renderCell(9)}</div>
          <div className="col-span-1">{renderCell(10)}</div>

          {/* Period III */}
          <div
            className="flex items-center justify-center text-xs font-mono font-extrabold text-amber-300 bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-750 rounded-lg shadow-sm font-serif"
            title="პერიოდი III (მესამე პერიოდი)"
          >
            {ROMAN_PERIODS[3]}
          </div>
          <div className="col-span-1">{renderCell(11)}</div>
          <div className="col-span-1">{renderCell(12)}</div>
          <div className="col-span-10 grid grid-cols-10 gap-1" />
          <div className="col-span-1">{renderCell(13)}</div>
          <div className="col-span-1">{renderCell(14)}</div>
          <div className="col-span-1">{renderCell(15)}</div>
          <div className="col-span-1">{renderCell(16)}</div>
          <div className="col-span-1">{renderCell(17)}</div>
          <div className="col-span-1">{renderCell(18)}</div>

          {/* Period IV */}
          <div
            className="flex items-center justify-center text-xs font-mono font-extrabold text-amber-300 bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-750 rounded-lg shadow-sm font-serif"
            title="პერიოდი IV (მეოთხე პერიოდი)"
          >
            {ROMAN_PERIODS[4]}
          </div>
          {Array.from({ length: 18 }, (_, i) => 19 + i).map(z => (
            <div key={`p4-${z}`} className="col-span-1">
              {renderCell(z)}
            </div>
          ))}

          {/* Period V */}
          <div
            className="flex items-center justify-center text-xs font-mono font-extrabold text-amber-300 bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-750 rounded-lg shadow-sm font-serif"
            title="პერიოდი V (მეხუთე პერიოდი)"
          >
            {ROMAN_PERIODS[5]}
          </div>
          {Array.from({ length: 18 }, (_, i) => 37 + i).map(z => (
            <div key={`p5-${z}`} className="col-span-1">
              {renderCell(z)}
            </div>
          ))}

          {/* Period VI */}
          <div
            className="flex items-center justify-center text-xs font-mono font-extrabold text-amber-300 bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-750 rounded-lg shadow-sm font-serif"
            title="პერიოდი VI (მეექვსე პერიოდი)"
          >
            {ROMAN_PERIODS[6]}
          </div>
          <div className="col-span-1">{renderCell(55)}</div>
          <div className="col-span-1">{renderCell(56)}</div>
          {/* Lanthanide placeholder */}
          <div className="col-span-1">
            <div
              className="h-full min-h-[56px] sm:min-h-[64px] md:min-h-[72px] rounded-lg border-2 border-dashed border-indigo-500/50 bg-gradient-to-b from-indigo-950/40 via-indigo-900/20 to-slate-950/60 flex flex-col justify-center items-center p-1 text-center select-none text-indigo-200 shadow-sm"
            >
              <span className="text-[10px] font-mono font-bold text-indigo-300">57–71</span>
              <span className="text-xs font-black text-white">La–Lu</span>
              <span className="text-[8.5px] opacity-90 leading-tight font-medium">ლანთანოიდები</span>
            </div>
          </div>
          {Array.from({ length: 15 }, (_, i) => 72 + i).map(z => (
            <div key={`p6-${z}`} className="col-span-1">
              {renderCell(z)}
            </div>
          ))}

          {/* Period VII */}
          <div
            className="flex items-center justify-center text-xs font-mono font-extrabold text-amber-300 bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-750 rounded-lg shadow-sm font-serif"
            title="პერიოდი VII (მეშვიდე პერიოდი)"
          >
            {ROMAN_PERIODS[7]}
          </div>
          <div className="col-span-1">{renderCell(87)}</div>
          <div className="col-span-1">{renderCell(88)}</div>
          {/* Actinide placeholder */}
          <div className="col-span-1">
            <div
              className="h-full min-h-[56px] sm:min-h-[64px] md:min-h-[72px] rounded-lg border-2 border-dashed border-fuchsia-500/50 bg-gradient-to-b from-fuchsia-950/40 via-fuchsia-900/20 to-slate-950/60 flex flex-col justify-center items-center p-1 text-center select-none text-fuchsia-200 shadow-sm"
            >
              <span className="text-[10px] font-mono font-bold text-fuchsia-300">89–103</span>
              <span className="text-xs font-black text-white">Ac–Lr</span>
              <span className="text-[8.5px] opacity-90 leading-tight font-medium">აქტინოიდები</span>
            </div>
          </div>
          {Array.from({ length: 15 }, (_, i) => 104 + i).map(z => (
            <div key={`p7-${z}`} className="col-span-1">
              {renderCell(z)}
            </div>
          ))}
        </div>

        {/* Separated Lanthanides and Actinides block */}
        <div className="mt-6 pt-4 border-t border-slate-750 bg-slate-900/40 rounded-2xl p-2.5 md:p-3 shadow-md">
          <div className="grid grid-cols-[38px_repeat(18,_minmax(0,_1fr))] gap-1 md:gap-1.5 items-stretch">
            {/* Row 1: Lanthanides (57-71) */}
            <div className="flex items-center justify-center text-[10px] font-mono font-bold text-indigo-400">
              VI*
            </div>
            {/* 3 empty placeholder columns matching left */}
            <div className="col-span-3 flex items-center justify-end pr-2 text-right">
              <span className="text-[11px] font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/30">
                ლანთანოიდები (La–Lu) →
              </span>
            </div>
            {Array.from({ length: 15 }, (_, i) => 57 + i).map(z => (
              <div key={`lanth-${z}`} className="col-span-1">
                {renderCell(z)}
              </div>
            ))}

            {/* Row 2: Actinides (89-103) */}
            <div className="flex items-center justify-center text-[10px] font-mono font-bold text-fuchsia-400">
              VII*
            </div>
            {/* 3 empty placeholder columns */}
            <div className="col-span-3 flex items-center justify-end pr-2 text-right">
              <span className="text-[11px] font-bold text-fuchsia-300 bg-fuchsia-500/10 px-2 py-0.5 rounded-md border border-fuchsia-500/30">
                აქტინოიდები (Ac–Lr) →
              </span>
            </div>
            {Array.from({ length: 15 }, (_, i) => 89 + i).map(z => (
              <div key={`actin-${z}`} className="col-span-1">
                {renderCell(z)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Hover Inspection Card matching Screenshot 2 */}
      {hoveredElement && (
        <ElementHoverCard
          element={hoveredElement.element}
          position={hoveredElement.pos}
        />
      )}
    </div>
  );
};

