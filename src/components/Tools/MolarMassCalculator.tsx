import React, { useState } from 'react';
import { calculateMolarMass, type MolarMassResult } from '../../utils/molarMass';
import { Scale, Sparkles, AlertCircle, CheckCircle2, X, Droplets } from 'lucide-react';

const PRESETS = [
  { label: 'H₂O (წყალი)', formula: 'H2O' },
  { label: 'NaCl (სუფრის მარილი)', formula: 'NaCl' },
  { label: 'C₆H₁₂O₆ (გლუკოზა)', formula: 'C6H12O6' },
  { label: 'Ca(OH)₂ (ჩამქრალი კირი)', formula: 'Ca(OH)2' },
  { label: 'CuSO₄·5H₂O (შაბიამანი)', formula: 'CuSO4.5H2O' },
  { label: 'KMnO₄ (მარგანცოვკა)', formula: 'KMnO4' },
  { label: 'H₂SO₄ (გოგირდმჟავა)', formula: 'H2SO4' },
  { label: 'Fe₂(SO₄)₃ (რკინის სულფატი)', formula: 'Fe2(SO4)3' },
  { label: 'NaHCO₃ (სასმელი სოდა)', formula: 'NaHCO3' },
];

export const MolarMassCalculator: React.FC = () => {
  const [inputFormula, setInputFormula] = useState('CuSO4.5H2O');
  const [result, setResult] = useState<MolarMassResult | { error: string } | null>(() =>
    calculateMolarMass('CuSO4.5H2O')
  );

  const handleCalculate = (formulaToCalc = inputFormula) => {
    const res = calculateMolarMass(formulaToCalc);
    setResult(res);
  };

  const handleSelectPreset = (f: string) => {
    setInputFormula(f);
    handleCalculate(f);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>მოლური მასა & ელემენტთა მასური წილი</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                M (გ/მოლი)
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              ხსნის ფრჩხილებს, კრისტალჰიდრატებს (·), ქვედა ინდექსებს და აჩვენებს ეტაპობრივ გამოთვლას
            </p>
          </div>
        </div>
      </div>

      {/* Input Field & Presets */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputFormula}
              onChange={e => setInputFormula(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCalculate()}
              placeholder="მაგ: Ca(OH)2 ან CuSO4.5H2O ან C6H12O6"
              className="w-full bg-slate-950 border-2 border-slate-750 focus:border-amber-500 rounded-xl px-4 py-3 text-base sm:text-lg font-mono font-bold text-white placeholder-slate-600 outline-none transition-colors shadow-inner"
            />
            {inputFormula && (
              <button
                type="button"
                onClick={() => setInputFormula('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 rounded-md"
                title="გასუფთავება"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => handleCalculate()}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>გამოთვლა</span>
          </button>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 font-semibold mr-1">მაგალითები:</span>
          {PRESETS.map(p => (
            <button
              key={p.formula}
              type="button"
              onClick={() => handleSelectPreset(p.formula)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 text-xs font-mono transition-all cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Block */}
      {result && (
        <div className="space-y-4 pt-2">
          {'error' in result ? (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-200 flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{result.error}</span>
            </div>
          ) : (
            <div className="space-y-5 animate-fadeIn">
              {/* Total Molar Mass Hero Box */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
                    ფორმულა: {result.formattedFormula}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-white flex items-baseline gap-2">
                    <span>{result.totalMass.toFixed(3)}</span>
                    <span className="text-base sm:text-lg font-sans font-normal text-slate-400">გ/მოლი</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    ანუ 1 მოლი ამ ნივთიერების მასა არის ზუსტად {result.totalMass.toFixed(2)} გრამი
                  </p>
                </div>

                {result.hydrateWaterMoles && result.hydrateWaterPercentage && (
                  <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-800/80 text-sky-200 text-xs">
                    <span className="font-bold flex items-center gap-1.5 text-sky-300 mb-0.5">
                      <Droplets className="w-3.5 h-3.5" />
                      <span>კრისტალიზაციური წყალი:</span>
                    </span>
                    <span>
                      {result.hydrateWaterMoles} მოლი H₂O ({result.hydrateWaterPercentage.toFixed(1)}% მთლიანი მასიდან)
                    </span>
                  </div>
                )}
              </div>

              {/* Step-by-Step Arithmetic Calculation (Pedagogical Essential!) */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ეტაპობრივი არითმეტიკული გაშლა მოსწავლეებისთვის:</span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 overflow-x-auto">
                  M = {result.arithmeticSteps}
                </div>
              </div>

              {/* Element Percentages Breakdown Table & Progress Bars */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  ელემენტთა მასური წილის კომპოზიცია (w%):
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {result.elements.map(item => (
                    <div
                      key={item.element.atomicNumber}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between gap-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-slate-800 text-emerald-400 font-bold flex items-center justify-center text-xs">
                            {item.element.symbol}
                          </span>
                          <span className="font-bold text-white font-sans">{item.element.nameKa}</span>
                          <span className="text-slate-500">×{item.count}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-amber-300 font-bold text-sm">{item.percentage.toFixed(2)}%</span>
                          <span className="text-slate-500 block text-[10px]">{item.totalMass.toFixed(2)} გ/მოლი</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
