import React, { useState } from 'react';
import { ELEMENTS } from '../../data/elements';
import type { ChemicalElement } from '../../types/element';
import { Columns3, X } from 'lucide-react';

export const ElementComparator: React.FC = () => {
  // Up to 4 selected element atomic numbers
  const [selectedZs, setSelectedZs] = useState<number[]>([11, 12, 17, 18]); // Na, Mg, Cl, Ar

  const selectedElements = selectedZs
    .map(z => ELEMENTS.find(e => e.atomicNumber === z))
    .filter((e): e is ChemicalElement => e !== undefined);

  const handleAddElement = (z: number) => {
    if (selectedZs.length < 4 && !selectedZs.includes(z)) {
      setSelectedZs([...selectedZs, z]);
    }
  };

  const handleRemoveElement = (z: number) => {
    if (selectedZs.length > 1) {
      setSelectedZs(selectedZs.filter(item => item !== z));
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Columns3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>ელემენტების პარალელური შედარება</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                1 - 4 ელემენტი
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              შეადარეთ ელემენტების ფიზიკურ-ქიმიური პარამეტრები და პერიოდული ტენდენციები
            </p>
          </div>
        </div>
      </div>

      {/* Element Pickers bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-semibold mr-1">შესადარებელი ელემენტები:</span>
        {selectedElements.map(el => (
          <div
            key={el.atomicNumber}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-white shadow-sm"
          >
            <span className="text-emerald-400 font-extrabold">{el.symbol}</span>
            <span className="text-slate-300 font-sans font-normal">{el.nameKa}</span>
            {selectedElements.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveElement(el.atomicNumber)}
                className="text-slate-500 hover:text-rose-400 ml-1 cursor-pointer"
                title="წაშლა"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}

        {selectedElements.length < 4 && (
          <select
            onChange={e => {
              const val = parseInt(e.target.value, 10);
              if (val) handleAddElement(val);
              e.target.value = '';
            }}
            defaultValue=""
            className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-slate-300 text-xs font-mono outline-none hover:border-emerald-500/50 cursor-pointer"
          >
            <option value="" disabled>
              + ელემენტის დამატება...
            </option>
            {ELEMENTS.filter(e => !selectedZs.includes(e.atomicNumber)).map(e => (
              <option key={e.atomicNumber} value={e.atomicNumber}>
                {e.atomicNumber}. {e.nameKa} ({e.symbol})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60">
              <th className="p-3 font-semibold text-slate-400 w-44">მახასიათებელი</th>
              {selectedElements.map(el => (
                <th key={el.atomicNumber} className="p-3 text-center">
                  <div className="font-mono font-black text-lg text-emerald-400">{el.symbol}</div>
                  <div className="font-sans font-bold text-slate-200">{el.nameKa}</div>
                  <div className="font-mono text-[10px] text-slate-500">Z = {el.atomicNumber}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 font-mono">
            <tr>
              <td className="p-3 font-sans font-semibold text-slate-400">ატომური მასა (Ar)</td>
              {selectedElements.map(el => (
                <td key={el.atomicNumber} className="p-3 text-center font-bold text-white">
                  {el.atomicMass}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-sans font-semibold text-slate-400">ელექტროუარყოფითობა</td>
              {selectedElements.map(el => (
                <td key={el.atomicNumber} className="p-3 text-center">
                  <span className="font-bold text-amber-300">{el.electronegativity ?? '—'}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-sans font-semibold text-slate-400">ვალენტობა</td>
              {selectedElements.map(el => (
                <td key={el.atomicNumber} className="p-3 text-center font-bold text-sky-300">
                  {el.valency}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-sans font-semibold text-slate-400">ჟანგვის რიცხვები</td>
              {selectedElements.map(el => (
                <td key={el.atomicNumber} className="p-3 text-center text-slate-300">
                  {el.oxidationStates}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-sans font-semibold text-slate-400">ელექტრონული ფორმულა</td>
              {selectedElements.map(el => (
                <td key={el.atomicNumber} className="p-3 text-center text-indigo-300 font-bold">
                  {el.electronConfiguration}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-sans font-semibold text-slate-400">შრეების შევსება (Bohr)</td>
              {selectedElements.map(el => (
                <td key={el.atomicNumber} className="p-3 text-center text-slate-400">
                  {el.electronsPerShell.join(', ')}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-sans font-semibold text-slate-400">დნობის ტემპერატურა</td>
              {selectedElements.map(el => (
                <td key={el.atomicNumber} className="p-3 text-center text-slate-300">
                  {el.meltingPoint}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-sans font-semibold text-slate-400">დუღილის ტემპერატურა</td>
              {selectedElements.map(el => (
                <td key={el.atomicNumber} className="p-3 text-center text-slate-300">
                  {el.boilingPoint}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-sans font-semibold text-slate-400">სიმკვრივე</td>
              {selectedElements.map(el => (
                <td key={el.atomicNumber} className="p-3 text-center text-slate-300">
                  {el.density}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-sans font-semibold text-slate-400">პერიოდი და ჯგუფი</td>
              {selectedElements.map(el => (
                <td key={el.atomicNumber} className="p-3 text-center text-slate-300">
                  პერიოდი {el.period}, ჯგუფი {el.group ?? '—'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
