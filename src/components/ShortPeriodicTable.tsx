import React from 'react';
import type { ChemicalElement, ElementCategory, ElementPhase } from '../types/element';
import { ShortElementTile } from './ShortElementTile';
import { ElementHoverCard } from './ElementHoverCard';
import { matchesFilters } from '../utils/selection';

interface ShortPeriodicTableProps {
  elements: ChemicalElement[];
  selectedElements: ChemicalElement[];
  activeElement: ChemicalElement | null;
  filterCategory: ElementCategory | 'all';
  filterPhase: ElementPhase | 'all';
  searchQuery: string;
  onElementClick: (element: ChemicalElement) => void;
}

export const ShortPeriodicTable: React.FC<ShortPeriodicTableProps> = ({
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
  const renderCell = (atomicNumber: number, isGhostH = false) => {
    const el = elementMap.get(atomicNumber);
    if (!el) return <div className="w-full h-full min-h-[50px] bg-slate-900/40 rounded border border-slate-800" />;

    const matches = isElementMatch(el);
    const isDimmed = hasActiveFilterOrSearch && !matches;
    const isHighlighted = hasActiveFilterOrSearch && matches;
    const selectionIndex = selectedIndexMap.get(el.atomicNumber) || null;

    return (
      <ShortElementTile
        key={`${atomicNumber}-${isGhostH ? 'ghost' : 'real'}`}
        element={el}
        selectionIndex={selectionIndex}
        isActiveDetail={activeElement?.atomicNumber === el.atomicNumber}
        isDimmed={isDimmed}
        isHighlighted={isHighlighted}
        isGhostH={isGhostH}
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

  // Group columns (I to VIII)
  const ROMAN_GROUPS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-6 pt-2 select-none">
      <div className="min-w-[1080px] max-w-[1380px] mx-auto p-3.5 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 border border-slate-750/90 rounded-2xl shadow-2xl">
        {/* Table Title Banner */}
        <div className="flex items-center justify-between border-b border-slate-750 pb-3 mb-3">
          <div className="flex-1 text-center">
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 uppercase tracking-wider font-serif bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent">
              ქიმიურ ელემენტთა პერიოდული სისტემა
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              მოკლეპერიოდიანი სასკოლო ფორმა (ჯგუფები I–VIII ზემოთ, რიგები და ტრიადები)
            </p>
          </div>

          {/* Top-Right Info Box */}
          <div className="flex items-center gap-3.5 bg-slate-900/90 border border-slate-750 px-3.5 py-1.5 rounded-xl shadow-lg backdrop-blur-md">
            {/* Color Legend */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px] font-medium">
              <div className="flex items-center gap-1.5 text-rose-300">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-sm shadow-sm shadow-rose-500/50" />
                <span>s-ბლოკი</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm shadow-sm shadow-amber-500/50" />
                <span>p-ბლოკი</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-300">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm shadow-sm shadow-blue-500/50" />
                <span>d-ბლოკი</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-300">
                <span className="w-2.5 h-2.5 bg-purple-500 rounded-sm shadow-sm shadow-purple-500/50" />
                <span>f-ბლოკი</span>
              </div>
            </div>

            {/* Sample cell breakdown icon */}
            <div className="border border-slate-700/80 rounded-lg bg-slate-950/90 p-1.5 w-16 text-center text-[9px] leading-tight shadow-inner">
              <div className="flex justify-between font-mono text-[8.5px] text-slate-400">
                <span className="text-blue-300 font-bold">Au</span>
                <span>79</span>
              </div>
              <div className="text-[8px] text-slate-200 font-semibold truncate mt-0.5">ოქრო</div>
            </div>
          </div>
        </div>

        {/* Groups Header (Roman Numerals I–VIII on TOP) */}
        <div className="grid grid-cols-[45px_repeat(8,_minmax(0,_1fr))] gap-1.5 mb-2 text-center font-bold">
          <div className="h-8 flex items-center justify-center text-xs font-mono font-bold text-slate-400 bg-slate-900/90 rounded-lg border border-slate-800 shadow-sm">
            პერ.
          </div>
          {ROMAN_GROUPS.map(roman => (
            <div
              key={roman}
              className="h-8 flex items-center justify-center text-sm sm:text-base font-extrabold text-amber-300 bg-gradient-to-b from-amber-500/15 to-slate-900/90 rounded-lg border border-amber-500/35 shadow-sm font-serif tracking-wider"
            >
              {roman}
            </div>
          ))}
        </div>

        {/* PERIOD ROWS */}
        <div className="space-y-1.5">
          {/* Period 1 (1 row) */}
          <div className="grid grid-cols-[45px_repeat(8,_minmax(0,_1fr))] gap-1.5 items-stretch">
            <div className="flex items-center justify-center text-base font-black text-slate-200 bg-gradient-to-b from-slate-850 to-slate-900 rounded-lg border border-slate-750 font-serif shadow-sm">
              1
            </div>
            <div className="col-span-1">{renderCell(1)}</div>
            {/* Empty span across columns II to VI */}
            <div className="col-span-5 flex items-center justify-center rounded border border-dashed border-slate-800 bg-slate-950/40 text-[11px] text-slate-600 italic">
              —
            </div>
            {/* Col VII: (H) in parentheses */}
            <div className="col-span-1">{renderCell(1, true)}</div>
            {/* Col VIII: He */}
            <div className="col-span-1">{renderCell(2)}</div>
          </div>

          {/* Period 2 (1 row) */}
          <div className="grid grid-cols-[45px_repeat(8,_minmax(0,_1fr))] gap-1.5 items-stretch">
            <div className="flex items-center justify-center text-base font-black text-slate-200 bg-gradient-to-b from-slate-850 to-slate-900 rounded-lg border border-slate-750 font-serif shadow-sm">
              2
            </div>
            <div className="col-span-1">{renderCell(3)}</div>
            <div className="col-span-1">{renderCell(4)}</div>
            <div className="col-span-1">{renderCell(5)}</div>
            <div className="col-span-1">{renderCell(6)}</div>
            <div className="col-span-1">{renderCell(7)}</div>
            <div className="col-span-1">{renderCell(8)}</div>
            <div className="col-span-1">{renderCell(9)}</div>
            <div className="col-span-1">{renderCell(10)}</div>
          </div>

          {/* Period 3 (1 row) */}
          <div className="grid grid-cols-[45px_repeat(8,_minmax(0,_1fr))] gap-1.5 items-stretch">
            <div className="flex items-center justify-center text-base font-black text-slate-200 bg-gradient-to-b from-slate-850 to-slate-900 rounded-lg border border-slate-750 font-serif shadow-sm">
              3
            </div>
            <div className="col-span-1">{renderCell(11)}</div>
            <div className="col-span-1">{renderCell(12)}</div>
            <div className="col-span-1">{renderCell(13)}</div>
            <div className="col-span-1">{renderCell(14)}</div>
            <div className="col-span-1">{renderCell(15)}</div>
            <div className="col-span-1">{renderCell(16)}</div>
            <div className="col-span-1">{renderCell(17)}</div>
            <div className="col-span-1">{renderCell(18)}</div>
          </div>

          {/* Period 4 (2 rows: 4a and 4b) */}
          <div className="border border-slate-750/70 rounded-xl p-1 bg-slate-900/40 shadow-sm">
            <div className="grid grid-cols-[45px_repeat(8,_minmax(0,_1fr))] gap-1.5 items-stretch">
              {/* Period Number 4 spanning 2 rows */}
              <div className="row-span-2 flex items-center justify-center text-lg font-black text-slate-200 bg-gradient-to-b from-slate-850 to-slate-900 rounded-lg border border-slate-750 font-serif shadow-sm">
                4
              </div>

              {/* 4a (Upper Row): K 19 to Mn 25, then Col VIII Triad Fe 26, Co 27, Ni 28 */}
              <div className="col-span-1">{renderCell(19)}</div>
              <div className="col-span-1">{renderCell(20)}</div>
              <div className="col-span-1">{renderCell(21)}</div>
              <div className="col-span-1">{renderCell(22)}</div>
              <div className="col-span-1">{renderCell(23)}</div>
              <div className="col-span-1">{renderCell(24)}</div>
              <div className="col-span-1">{renderCell(25)}</div>
              {/* Group VIII Triad: 3 elements side-by-side */}
              <div className="col-span-1 grid grid-cols-3 gap-0.5">
                {renderCell(26)}
                {renderCell(27)}
                {renderCell(28)}
              </div>

              {/* 4b (Lower Row): Cu 29 to Kr 36 */}
              <div className="col-span-1">{renderCell(29)}</div>
              <div className="col-span-1">{renderCell(30)}</div>
              <div className="col-span-1">{renderCell(31)}</div>
              <div className="col-span-1">{renderCell(32)}</div>
              <div className="col-span-1">{renderCell(33)}</div>
              <div className="col-span-1">{renderCell(34)}</div>
              <div className="col-span-1">{renderCell(35)}</div>
              <div className="col-span-1">{renderCell(36)}</div>
            </div>
          </div>

          {/* Period 5 (2 rows: 5a and 5b) */}
          <div className="border border-slate-750/70 rounded-xl p-1 bg-slate-900/40 shadow-sm">
            <div className="grid grid-cols-[45px_repeat(8,_minmax(0,_1fr))] gap-1.5 items-stretch">
              {/* Period Number 5 spanning 2 rows */}
              <div className="row-span-2 flex items-center justify-center text-lg font-black text-slate-200 bg-gradient-to-b from-slate-850 to-slate-900 rounded-lg border border-slate-750 font-serif shadow-sm">
                5
              </div>

              {/* 5a (Upper Row): Rb 37 to Tc 43, then Triad Ru 44, Rh 45, Pd 46 */}
              <div className="col-span-1">{renderCell(37)}</div>
              <div className="col-span-1">{renderCell(38)}</div>
              <div className="col-span-1">{renderCell(39)}</div>
              <div className="col-span-1">{renderCell(40)}</div>
              <div className="col-span-1">{renderCell(41)}</div>
              <div className="col-span-1">{renderCell(42)}</div>
              <div className="col-span-1">{renderCell(43)}</div>
              {/* Group VIII Triad: 3 elements */}
              <div className="col-span-1 grid grid-cols-3 gap-0.5">
                {renderCell(44)}
                {renderCell(45)}
                {renderCell(46)}
              </div>

              {/* 5b (Lower Row): Ag 47 to Xe 54 */}
              <div className="col-span-1">{renderCell(47)}</div>
              <div className="col-span-1">{renderCell(48)}</div>
              <div className="col-span-1">{renderCell(49)}</div>
              <div className="col-span-1">{renderCell(50)}</div>
              <div className="col-span-1">{renderCell(51)}</div>
              <div className="col-span-1">{renderCell(52)}</div>
              <div className="col-span-1">{renderCell(53)}</div>
              <div className="col-span-1">{renderCell(54)}</div>
            </div>
          </div>

          {/* Period 6 (2 rows: 6a and 6b) */}
          <div className="border border-slate-750/70 rounded-xl p-1 bg-slate-900/40 shadow-sm">
            <div className="grid grid-cols-[45px_repeat(8,_minmax(0,_1fr))] gap-1.5 items-stretch">
              {/* Period Number 6 */}
              <div className="row-span-2 flex items-center justify-center text-lg font-black text-slate-200 bg-gradient-to-b from-slate-850 to-slate-900 rounded-lg border border-slate-750 font-serif shadow-sm">
                6
              </div>

              {/* 6a (Upper Row): Cs 55, Ba 56, La* 57, Hf 72, Ta 73, W 74, Re 75, Triad Os 76, Ir 77, Pt 78 */}
              <div className="col-span-1">{renderCell(55)}</div>
              <div className="col-span-1">{renderCell(56)}</div>
              {/* La* 57 placeholder tile */}
              <div className="col-span-1 relative">
                {renderCell(57)}
                <span className="absolute top-0.5 right-1 text-xs font-bold text-indigo-400">*</span>
              </div>
              <div className="col-span-1">{renderCell(72)}</div>
              <div className="col-span-1">{renderCell(73)}</div>
              <div className="col-span-1">{renderCell(74)}</div>
              <div className="col-span-1">{renderCell(75)}</div>
              {/* Group VIII Triad */}
              <div className="col-span-1 grid grid-cols-3 gap-0.5">
                {renderCell(76)}
                {renderCell(77)}
                {renderCell(78)}
              </div>

              {/* 6b (Lower Row): Au 79 to Rn 86 */}
              <div className="col-span-1">{renderCell(79)}</div>
              <div className="col-span-1">{renderCell(80)}</div>
              <div className="col-span-1">{renderCell(81)}</div>
              <div className="col-span-1">{renderCell(82)}</div>
              <div className="col-span-1">{renderCell(83)}</div>
              <div className="col-span-1">{renderCell(84)}</div>
              <div className="col-span-1">{renderCell(85)}</div>
              <div className="col-span-1">{renderCell(86)}</div>
            </div>
          </div>

          {/* Period 7 (2 rows: 7a and 7b) */}
          <div className="border border-slate-750/70 rounded-xl p-1 bg-slate-900/40 shadow-sm">
            <div className="grid grid-cols-[45px_repeat(8,_minmax(0,_1fr))] gap-1.5 items-stretch">
              {/* Period Number 7 */}
              <div className="row-span-2 flex items-center justify-center text-lg font-black text-slate-200 bg-gradient-to-b from-slate-850 to-slate-900 rounded-lg border border-slate-750 font-serif shadow-sm">
                7
              </div>

              {/* 7a (Upper Row): Fr 87, Ra 88, Ac** 89, Rf 104, Db 105, Sg 106, Bh 107, Triad Hs 108, Mt 109, Ds 110 */}
              <div className="col-span-1">{renderCell(87)}</div>
              <div className="col-span-1">{renderCell(88)}</div>
              {/* Ac** 89 */}
              <div className="col-span-1 relative">
                {renderCell(89)}
                <span className="absolute top-0.5 right-1 text-xs font-bold text-fuchsia-400">**</span>
              </div>
              <div className="col-span-1">{renderCell(104)}</div>
              <div className="col-span-1">{renderCell(105)}</div>
              <div className="col-span-1">{renderCell(106)}</div>
              <div className="col-span-1">{renderCell(107)}</div>
              {/* Group VIII Triad */}
              <div className="col-span-1 grid grid-cols-3 gap-0.5">
                {renderCell(108)}
                {renderCell(109)}
                {renderCell(110)}
              </div>

              {/* 7b (Lower Row): Rg 111 to Og 118 */}
              <div className="col-span-1">{renderCell(111)}</div>
              <div className="col-span-1">{renderCell(112)}</div>
              <div className="col-span-1">{renderCell(113)}</div>
              <div className="col-span-1">{renderCell(114)}</div>
              <div className="col-span-1">{renderCell(115)}</div>
              <div className="col-span-1">{renderCell(116)}</div>
              <div className="col-span-1">{renderCell(117)}</div>
              <div className="col-span-1">{renderCell(118)}</div>
            </div>
          </div>

          {/* Georgian School Textbook Standard: Highest Oxides & Volatile Hydrogen Compounds Rows */}
          <div className="border border-slate-750 rounded-xl p-2 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 mt-2 shadow-md">
            <div className="grid grid-cols-[45px_repeat(8,_minmax(0,_1fr))] gap-1.5 text-xs font-mono text-center items-center">
              <div className="flex items-center justify-center font-sans font-bold text-[9px] text-amber-300 bg-gradient-to-r from-amber-500/20 to-slate-950 px-1 py-1.5 rounded-lg border border-amber-500/40 text-center leading-tight shadow-sm">
                უმაღლესი ოქსიდი
              </div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-amber-500/30 text-amber-200 font-bold shadow-sm">R₂O</div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-amber-500/30 text-amber-200 font-bold shadow-sm">RO</div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-amber-500/30 text-amber-200 font-bold shadow-sm">R₂O₃</div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-amber-500/30 text-amber-200 font-bold shadow-sm">RO₂</div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-amber-500/30 text-amber-200 font-bold shadow-sm">R₂O₅</div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-amber-500/30 text-amber-200 font-bold shadow-sm">RO₃</div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-amber-500/30 text-amber-200 font-bold shadow-sm">R₂O₇</div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-amber-500/30 text-amber-200 font-bold shadow-sm">RO₄</div>

              <div className="flex items-center justify-center font-sans font-bold text-[9px] text-sky-300 bg-gradient-to-r from-sky-500/20 to-slate-950 px-1 py-1.5 rounded-lg border border-sky-500/40 text-center leading-tight shadow-sm">
                აქროლადი წყალბადნაერთი
              </div>
              <div className="py-1 rounded-lg bg-slate-950/40 border border-slate-850 text-slate-600">—</div>
              <div className="py-1 rounded-lg bg-slate-950/40 border border-slate-850 text-slate-600">—</div>
              <div className="py-1 rounded-lg bg-slate-950/40 border border-slate-850 text-slate-600">—</div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-sky-500/30 text-sky-200 font-bold shadow-sm">RH₄</div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-sky-500/30 text-sky-200 font-bold shadow-sm">RH₃</div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-sky-500/30 text-sky-200 font-bold shadow-sm">H₂R</div>
              <div className="py-1 rounded-lg bg-slate-950/80 border border-sky-500/30 text-sky-200 font-bold shadow-sm">HR</div>
              <div className="py-1 rounded-lg bg-slate-950/40 border border-slate-850 text-slate-600">—</div>
            </div>
          </div>
        </div>

        {/* Separated Lanthanides and Actinides block matching screenshot */}
        <div className="mt-5 pt-3.5 border-t border-slate-750 space-y-3.5">
          {/* Lanthanides: Ce 58 to Lu 71 */}
          <div className="bg-slate-900/40 border border-indigo-500/20 rounded-xl p-2.5 shadow-sm">
            <div className="text-center font-bold text-xs text-indigo-300 mb-2 flex items-center justify-center gap-2">
              <span className="text-indigo-400 font-extrabold text-sm">*</span>
              <span>ლანთანოიდები (Ce 58 – Lu 71)</span>
            </div>
            <div className="grid grid-cols-14 gap-1">
              {Array.from({ length: 14 }, (_, i) => 58 + i).map(z => (
                <div key={`lanth-${z}`}>{renderCell(z)}</div>
              ))}
            </div>
          </div>

          {/* Actinides: Th 90 to Lr 103 */}
          <div className="bg-slate-900/40 border border-fuchsia-500/20 rounded-xl p-2.5 shadow-sm">
            <div className="text-center font-bold text-xs text-fuchsia-300 mb-2 flex items-center justify-center gap-2">
              <span className="text-fuchsia-400 font-extrabold text-sm">**</span>
              <span>აქტინოიდები (Th 90 – Lr 103)</span>
            </div>
            <div className="grid grid-cols-14 gap-1">
              {Array.from({ length: 14 }, (_, i) => 90 + i).map(z => (
                <div key={`actin-${z}`}>{renderCell(z)}</div>
              ))}
            </div>
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

