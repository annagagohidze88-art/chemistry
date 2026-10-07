import React, { useState } from 'react';
import { balanceEquation, type BalanceResult } from '../../utils/equationBalancer';
import { Equal, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

const REACTION_PRESETS = [
  { label: 'წყლის სინთეზი', eq: 'H2 + O2 -> H2O' },
  { label: 'მეთანის წვა', eq: 'CH4 + O2 -> CO2 + H2O' },
  { label: 'რკინის დაჟანგვა', eq: 'Fe + O2 -> Fe2O3' },
  { label: 'ნეიტრალიზაცია', eq: 'Ca(OH)2 + H3PO4 -> Ca3(PO4)2 + H2O' },
  { label: 'რედოქს-რეაქცია (მარგანცოვკა)', eq: 'KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O' },
  { label: 'ალუმინი + მარილმჟავა', eq: 'Al + HCl -> AlCl3 + H2' },
  { label: 'სპილენძი + აზოტმჟავა', eq: 'Cu + HNO3 -> Cu(NO3)2 + NO2 + H2O' },
  { label: 'გლუკოზის სუნთქვა', eq: 'C6H12O6 + O2 -> CO2 + H2O' },
];

export const EquationBalancer: React.FC = () => {
  const [inputEquation, setInputEquation] = useState('KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O');
  const [result, setResult] = useState<BalanceResult | { error: string } | null>(() =>
    balanceEquation('KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O')
  );

  const handleBalance = (eqToBalance = inputEquation) => {
    const res = balanceEquation(eqToBalance);
    setResult(res);
  };

  const handleSelectPreset = (eq: string) => {
    setInputEquation(eq);
    handleBalance(eq);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <Equal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>ქიმიური განტოლებების გამთანაბრებელი</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                სტექიომეტრია
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              ათანაბრებს რთულ ჟანგვა-აღდგენით და მრავალკომპონენტიან რეაქციებს ზუსტი რაციონალური ალგებრით
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
              value={inputEquation}
              onChange={e => setInputEquation(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleBalance()}
              placeholder="მაგ: Al + HCl -> AlCl3 + H2"
              className="w-full bg-slate-950 border-2 border-slate-750 focus:border-sky-500 rounded-xl px-4 py-3 text-base sm:text-lg font-mono font-bold text-white placeholder-slate-600 outline-none transition-colors shadow-inner"
            />
            {inputEquation && (
              <button
                type="button"
                onClick={() => setInputEquation('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-sm px-1.5 py-0.5"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => handleBalance()}
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>გათანაბრება</span>
          </button>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 font-semibold mr-1">მაგალითები:</span>
          {REACTION_PRESETS.map(p => (
            <button
              key={p.eq}
              type="button"
              onClick={() => handleSelectPreset(p.eq)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-sky-300 text-xs font-mono transition-all cursor-pointer"
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
              {/* Hero: Balanced Equation */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/30 border border-sky-500/30 rounded-2xl p-5 shadow-lg space-y-3">
                <div className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                  გათანაბრებული განტოლება:
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black font-mono text-emerald-400 leading-relaxed overflow-x-auto py-1">
                  {result.balancedString}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-slate-800 pt-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>სტექიომეტრიული კოეფიციენტები შერჩეულია უმცირეს მთელ რიცხვებში.</span>
                </div>
              </div>

              {/* Atom Conservation Verification Table (Pedagogical Essential!) */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚖️ ატომთა ბალანსის შემოწმება (მასის მუდმივობის კანონი):</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">მარცხენა = მარჯვენა</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {result.verification.map(chk => (
                    <div
                      key={chk.symbol}
                      className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-slate-800 text-sky-300 font-bold flex items-center justify-center text-xs">
                          {chk.symbol}
                        </span>
                        <span className="text-slate-300">
                          {chk.leftCount} = {chk.rightCount}
                        </span>
                      </div>
                      <span className="text-emerald-400 font-bold text-sm">✓</span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400 italic pt-1">
                  ლომონოსოვ-ლავუაზიეს კანონი: რეაქციაში შემავალი ნივთიერებების მასა ზუსტად უდრის რეაქციის პროდუქტების მასას. არცერთი ატომი არ იკარგება და არც არაფრისგან წარმოიქმნება.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
