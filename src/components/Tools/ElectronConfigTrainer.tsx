import React, { useState, useMemo } from 'react';
import { ELEMENTS } from '../../data/elements';
import type { ChemicalElement } from '../../types/element';
import { Atom, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';

interface SubshellDef {
  name: string;
  n: number;
  l: number; // 0=s, 1=p, 2=d, 3=f
  capacity: number;
  boxes: number;
}

// Aufbau sequence (Madelung rule n+l)
const AUFBAU_SEQUENCE: SubshellDef[] = [
  { name: '1s', n: 1, l: 0, capacity: 2, boxes: 1 },
  { name: '2s', n: 2, l: 0, capacity: 2, boxes: 1 },
  { name: '2p', n: 2, l: 1, capacity: 6, boxes: 3 },
  { name: '3s', n: 3, l: 0, capacity: 2, boxes: 1 },
  { name: '3p', n: 3, l: 1, capacity: 6, boxes: 3 },
  { name: '4s', n: 4, l: 0, capacity: 2, boxes: 1 },
  { name: '3d', n: 3, l: 2, capacity: 10, boxes: 5 },
  { name: '4p', n: 4, l: 1, capacity: 6, boxes: 3 },
  { name: '5s', n: 5, l: 0, capacity: 2, boxes: 1 },
  { name: '4d', n: 4, l: 2, capacity: 10, boxes: 5 },
  { name: '5p', n: 5, l: 1, capacity: 6, boxes: 3 },
  { name: '6s', n: 6, l: 0, capacity: 2, boxes: 1 },
  { name: '4f', n: 4, l: 3, capacity: 14, boxes: 7 },
  { name: '5d', n: 5, l: 2, capacity: 10, boxes: 5 },
  { name: '6p', n: 6, l: 1, capacity: 6, boxes: 3 },
  { name: '7s', n: 7, l: 0, capacity: 2, boxes: 1 },
  { name: '5f', n: 5, l: 3, capacity: 14, boxes: 7 },
  { name: '6d', n: 6, l: 2, capacity: 10, boxes: 5 },
  { name: '7p', n: 7, l: 1, capacity: 6, boxes: 3 },
];

export const ElectronConfigTrainer: React.FC = () => {
  const [selectedZ, setSelectedZ] = useState<number>(6); // Default Carbon (Z=6)
  const [search, setSearch] = useState('');

  const currentElement: ChemicalElement = useMemo(() => {
    return ELEMENTS.find(e => e.atomicNumber === selectedZ) || ELEMENTS[5];
  }, [selectedZ]);

  // Compute how subshells are filled for this element
  const filledSubshells = useMemo(() => {
    let remaining = selectedZ;
    const result: { subshell: SubshellDef; count: number; boxElectrons: number[] }[] = [];

    // Special handling for classic anomalies in school chemistry:
    // Chromium (Z=24): [Ar] 4s¹ 3d⁵ instead of 4s² 3d⁴
    // Copper (Z=29): [Ar] 4s¹ 3d¹⁰ instead of 4s² 3d⁹
    const isCr = selectedZ === 24;
    const isCu = selectedZ === 29;

    for (const sub of AUFBAU_SEQUENCE) {
      if (remaining <= 0) break;

      let count = Math.min(remaining, sub.capacity);

      // Apply Cr and Cu anomaly
      if (isCr) {
        if (sub.name === '4s') count = 1;
        if (sub.name === '3d') count = 5;
      } else if (isCu) {
        if (sub.name === '4s') count = 1;
        if (sub.name === '3d') count = 10;
      }

      // Distribute electrons among boxes using Hund's rule:
      // First, 1 electron in each box (spin up), then second electron (spin down)
      const boxElectrons: number[] = new Array(sub.boxes).fill(0);
      let eToPlace = count;

      // Pass 1: 1 electron per box
      for (let b = 0; b < sub.boxes && eToPlace > 0; b++) {
        boxElectrons[b] = 1;
        eToPlace--;
      }
      // Pass 2: second electron in boxes
      for (let b = 0; b < sub.boxes && eToPlace > 0; b++) {
        boxElectrons[b] = 2;
        eToPlace--;
      }

      result.push({ subshell: sub, count, boxElectrons });
      remaining -= count;
    }

    return result;
  }, [selectedZ]);

  const filteredElements = useMemo(() => {
    if (!search.trim()) return ELEMENTS.slice(0, 36); // first 36 elements for quick select
    const q = search.toLowerCase();
    return ELEMENTS.filter(
      e =>
        e.nameKa.toLowerCase().includes(q) ||
        e.symbol.toLowerCase().includes(q) ||
        e.atomicNumber.toString() === q
    );
  }, [search]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Atom className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>ელექტრონული კონფიგურაცია & აუფბაუს კიბე</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                კვანტური უჯრები
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              კლეჩკოვსკის წესი (n+l), ჰუნდის წესი და პაულის აკრძალვის პრინციპი სპინური ისრებით (⥮)
            </p>
          </div>
        </div>
      </div>

      {/* Quick Element Picker */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold">აირჩიეთ ელემენტი:</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ძიება (სახელი, სიმბოლო, Z)..."
            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white outline-none focus:border-indigo-500 w-44"
          />
        </div>

        <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto custom-scrollbar p-1 bg-slate-950 rounded-xl border border-slate-800">
          {filteredElements.map(el => (
            <button
              key={el.atomicNumber}
              type="button"
              onClick={() => setSelectedZ(el.atomicNumber)}
              className={`px-2 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedZ === el.atomicNumber
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-105'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-[10px] text-slate-500 mr-1">{el.atomicNumber}</span>
              {el.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Element Hero Readout */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border border-indigo-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-950/80 border-2 border-indigo-500/50 flex flex-col items-center justify-center font-mono shadow-inner">
            <span className="text-[10px] text-indigo-400">{currentElement.atomicNumber}</span>
            <span className="text-2xl font-black text-white">{currentElement.symbol}</span>
          </div>
          <div>
            <h4 className="text-lg font-black text-white flex items-center gap-2">
              {currentElement.nameKa}
              <span className="text-xs font-normal text-slate-400 font-mono">({currentElement.nameEn})</span>
            </h4>
            <div className="font-mono text-sm sm:text-base text-amber-300 font-bold mt-1">
              {currentElement.electronConfiguration}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              შრეების შევსება (Bohr): {currentElement.electronsPerShell.join(' - ')} | ვალენტობა: {currentElement.valency}
            </div>
          </div>
        </div>

        {/* Special Notes (e.g. for Chromium or Copper) */}
        {(selectedZ === 24 || selectedZ === 29) && (
          <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs max-w-sm">
            <strong className="flex items-center gap-1.5 text-amber-300 mb-1 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>ელექტრონული „ჩავარდნა“ (პრომოცია):</span>
            </strong>
            <span>
              {selectedZ === 24
                ? 'ქრომში (Cr) ერთი ელექტრონი 4s-დან გადადის 3d-ზე, რადგან ნახევრად შევსებული d⁵ ქვედონე ენერგეტიკულად უფრო მდგრადია ([Ar] 4s¹ 3d⁵).'
                : 'სპილენძში (Cu) ერთი ელექტრონი 4s-დან გადადის 3d-ზე, რადგან სრულად შევსებული d¹⁰ ქვედონე ენერგეტიკულად განსაკუთრებით მდგრადია ([Ar] 4s¹ 3d¹⁰).'}
            </span>
          </div>
        )}
      </div>

      {/* Quantum Orbital Boxes Display (Hund's Rule & Pauli Exclusion) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>კვანტური უჯრები და ელექტრონული სპინები (ჰუნდის წესი):</span>
          </h4>
          <span className="text-[11px] font-mono text-slate-400">⥮ = საწინააღმდეგო სპინები</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {filledSubshells.map(sub => (
            <div
              key={sub.subshell.name}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 shadow-sm"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-indigo-300">{sub.subshell.name}</span>
                <span className="text-slate-500 text-[11px]">({sub.count}e⁻)</span>
              </div>

              {/* Orbital Boxes Grid */}
              <div className="flex items-center gap-1">
                {sub.boxElectrons.map((electronsInBox, bIdx) => (
                  <div
                    key={bIdx}
                    className="w-8 h-8 rounded border-2 border-slate-700 bg-slate-900 flex items-center justify-center font-mono text-base font-bold select-none shadow-inner"
                  >
                    {electronsInBox === 2 ? (
                      <span className="text-emerald-400 flex items-center tracking-tighter">
                        <span>↑</span>
                        <span className="text-sky-400">↓</span>
                      </span>
                    ) : electronsInBox === 1 ? (
                      <span className="text-emerald-400">↑</span>
                    ) : (
                      <span className="text-slate-800">•</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aufbau Energy Ladder Explainer */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
        <div className="font-bold text-indigo-400 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          <span>აუფბაუს პრინციპი (კლეჩკოვსკის წესი n + l):</span>
        </div>
        <p className="leading-relaxed">
          ქვედონეები ივსება ენერგიის ზრდის მიხედვით ($n + \ell$). თუ ორ ქვედონეს აქვს თანაბარი $n + \ell$, პირველად ივსება ქვედონე ნაკლები $n$-ით.
          სწორედ ამიტომ <strong>4s ივსება 3d-მდე</strong> ($4s$: $4+0=4$; $3d$: $3+2=5$).
        </p>
      </div>
    </div>
  );
};
