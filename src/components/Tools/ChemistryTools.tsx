import React, { useState } from 'react';
import { MolarMassCalculator } from './MolarMassCalculator';
import { EquationBalancer } from './EquationBalancer';
import { ElectronConfigTrainer } from './ElectronConfigTrainer';
import { ElementComparator } from './ElementComparator';
import { SolubilityTable } from './SolubilityTable';
import { OxidesAcidsTable } from './OxidesAcidsTable';
import { Scale, Equal, Atom, Columns3, Waves, Flame } from 'lucide-react';

export type ToolTab = 'molar' | 'balancer' | 'config' | 'compare' | 'solubility' | 'oxides';

interface ChemistryToolsProps {
  initialTab?: ToolTab;
}

export const ChemistryTools: React.FC<ChemistryToolsProps> = ({ initialTab = 'solubility' }) => {
  const [activeTool, setActiveTool] = useState<ToolTab>(initialTab);

  return (
    <div className="space-y-4">
      {/* Tools Sub-Navigation */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-inner">
        <button
          type="button"
          onClick={() => setActiveTool('solubility')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTool === 'solubility'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md shadow-cyan-500/25'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Waves className="w-4 h-4" />
          <span>ხსნადობის ცხრილი</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('oxides')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTool === 'oxides'
              ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black shadow-md shadow-rose-500/25'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>ოქსიდები & შესაბამისი მჟავები</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('molar')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTool === 'molar'
              ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-black shadow-md shadow-amber-500/25'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>მოლური მასა & მასური წილი</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('balancer')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTool === 'balancer'
              ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Equal className="w-4 h-4" />
          <span>ტოლობების გათანაბრება</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('config')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTool === 'config'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Atom className="w-4 h-4" />
          <span>ელექტრონული კონფიგურაცია</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('compare')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTool === 'compare'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black shadow-md shadow-emerald-500/25'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Columns3 className="w-4 h-4" />
          <span>ელემენტების შედარება</span>
        </button>
      </div>

      {/* Active Tool View */}
      <div>
        {activeTool === 'solubility' && <SolubilityTable />}
        {activeTool === 'oxides' && <OxidesAcidsTable />}
        {activeTool === 'molar' && <MolarMassCalculator />}
        {activeTool === 'balancer' && <EquationBalancer />}
        {activeTool === 'config' && <ElectronConfigTrainer />}
        {activeTool === 'compare' && <ElementComparator />}
      </div>
    </div>
  );
};
