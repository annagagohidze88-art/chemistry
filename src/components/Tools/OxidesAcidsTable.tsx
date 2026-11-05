import React, { useState, useMemo } from 'react';
import {
  OXIDES_ACIDS_DATA,
  type OxideAcidPair,
} from '../../data/oxidesAcidsData';
import { Flame, Search, X, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

export const OxidesAcidsTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'acidic' | 'non-salt-forming'>('all');
  const [selectedPair, setSelectedPair] = useState<OxideAcidPair | null>(null);

  const filteredData = useMemo(() => {
    return OXIDES_ACIDS_DATA.filter(item => {
      // Type filter
      if (filterType !== 'all' && item.oxideType !== filterType) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesOxide =
          item.oxideFormula.toLowerCase().includes(q) ||
          item.oxideDisplay.toLowerCase().includes(q) ||
          item.oxideNameKa.toLowerCase().includes(q);

        const matchesAcid =
          (item.acidFormula && item.acidFormula.toLowerCase().includes(q)) ||
          (item.acidDisplay && item.acidDisplay.toLowerCase().includes(q)) ||
          (item.acidNameKa && item.acidNameKa.toLowerCase().includes(q));

        const matchesElement =
          item.elementSymbol.toLowerCase().includes(q) ||
          item.elementNameKa.toLowerCase().includes(q);

        const matchesRadical =
          (item.acidRadical && item.acidRadical.toLowerCase().includes(q)) ||
          (item.radicalNameKa && item.radicalNameKa.toLowerCase().includes(q));

        return matchesOxide || matchesAcid || matchesElement || matchesRadical;
      }

      return true;
    });
  }, [searchQuery, filterType]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>მჟავური ოქსიდები & შესაბამისი მჟავები</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                ანჰიდრიდები
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              ოქსიდებისა და მათი შესაბამისი მჟავების, მჟავური ნაშთების (ანიონების) და ვალენტობების ცხრილი
            </p>
          </div>
        </div>
      </div>

      {/* Pedagogical Golden Rule Banner (ეროვნული სასწავლო გეგმის ოქროს წესი) */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-950 border border-amber-500/30 space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>როგორ განვსაზღვროთ ოქსიდის შესაბამისი მჟავა? (ოქროს წესი)</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          ელემენტის <strong className="text-amber-200">ჟანგვის ხარისხი</strong> ოქსიდსა და მის შესაბამის მჟავაში{' '}
          <strong className="text-amber-200">მკაცრად უცვლელი რჩება!</strong>
        </p>
        <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
          <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">
            S(+6)O₃ → H₂S(+6)O₄
          </span>
          <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">
            C(+4)O₂ → H₂C(+4)O₃
          </span>
          <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">
            P₂(+5)O₅ → H₃P(+5)O₄
          </span>
          <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">
            N₂(+5)O₅ → HN(+5)O₃
          </span>
          <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">
            Mn₂(+7)O₇ → HMn(+7)O₄
          </span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="მოძებნეთ ოქსიდი, მჟავა, ნაშთი (მაგ: SO3, H2SO4, CO2, ფოსფატი)..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
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

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-rose-500 text-white font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            ყველა ოქსიდი ({OXIDES_ACIDS_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('acidic')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterType === 'acidic'
                ? 'bg-rose-500 text-white font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            მჟავური (მჟავის მქონე)
          </button>
          <button
            type="button"
            onClick={() => setFilterType('non-salt-forming')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterType === 'non-salt-forming'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            მარილარწარმომქმნელი
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-slate-800 rounded-2xl overflow-hidden shadow-2xl bg-slate-950">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse text-left text-xs font-sans">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px] font-mono">
                <th className="p-3 font-bold text-amber-300 min-w-[140px]">ოქსიდი</th>
                <th className="p-3 font-bold text-slate-400 text-center min-w-[70px]">ჟანგვის ხარისხი</th>
                <th className="p-3 font-bold text-cyan-300 min-w-[160px]">შესაბამისი მჟავა</th>
                <th className="p-3 font-bold text-indigo-300 min-w-[150px]">მჟავური ნაშთი (ანიონი)</th>
                <th className="p-3 font-bold text-slate-300 min-w-[170px]">წყალთან რეაქცია</th>
                <th className="p-3 font-bold text-emerald-300 min-w-[150px]">მარილის მაგალითი</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredData.map(item => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedPair(item)}
                  className={`hover:bg-slate-900/60 transition-colors cursor-pointer ${
                    item.oxideType === 'non-salt-forming'
                      ? 'bg-amber-950/15'
                      : ''
                  }`}
                >
                  {/* Oxide Column */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-black text-rose-300 bg-slate-900 px-2 py-0.5 rounded border border-rose-500/30">
                        {item.oxideDisplay}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-100 text-xs truncate">
                          {item.oxideNameKa}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.elementNameKa} ({item.elementSymbol})
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Oxidation state */}
                  <td className="p-3 text-center">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-slate-900 border border-slate-750 text-amber-300">
                      {item.oxidationState}
                    </span>
                  </td>

                  {/* Corresponding Acid Column */}
                  <td className="p-3">
                    {item.hasCorrespondingAcid && item.acidDisplay ? (
                      <div>
                        <span className="font-mono text-sm font-black text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-cyan-500/30">
                          {item.acidDisplay}
                        </span>
                        <div className="text-xs text-slate-200 font-semibold mt-0.5">
                          {item.acidNameKa}
                        </div>
                        {item.acidBasicity && (
                          <span className="text-[10px] text-cyan-400 font-mono">
                            {item.acidBasicity}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>მჟავა არ შეესაბამება</span>
                      </div>
                    )}
                  </td>

                  {/* Acid Radical (Anion) */}
                  <td className="p-3">
                    {item.acidRadical ? (
                      <div>
                        <span className="font-mono text-xs font-black text-indigo-300 bg-slate-900 px-2 py-0.5 rounded border border-indigo-500/30">
                          {item.acidRadical}
                        </span>
                        <div className="text-xs text-slate-300 mt-0.5">
                          {item.radicalNameKa}
                        </div>
                        {item.radicalValency && (
                          <div className="text-[10px] text-slate-400 font-mono">
                            ვალენტობა: <strong>{item.radicalValency}</strong>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-600 font-mono">—</span>
                    )}
                  </td>

                  {/* Reaction with water */}
                  <td className="p-3 font-mono text-[11px] text-slate-300">
                    {item.reactionWithWater ? (
                      <div className="bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
                        {item.reactionWithWater}
                      </div>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>

                  {/* Salt example */}
                  <td className="p-3">
                    {item.saltExample ? (
                      <span className="font-mono text-xs text-emerald-300 font-bold bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/30">
                        {item.saltExample}
                      </span>
                    ) : (
                      <span className="text-slate-600 font-mono">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep Inspection Card on Click */}
      {selectedPair && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-rose-500/40 shadow-2xl space-y-3 animate-fadeIn">
          <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-black text-rose-300 bg-slate-950 px-3 py-1 rounded-xl border border-rose-500/30 shadow-md">
                {selectedPair.oxideDisplay}
              </span>
              {selectedPair.hasCorrespondingAcid && selectedPair.acidDisplay && (
                <>
                  <ArrowRight className="w-5 h-5 text-slate-500 shrink-0" />
                  <span className="font-mono text-2xl sm:text-3xl font-black text-cyan-300 bg-slate-950 px-3 py-1 rounded-xl border border-cyan-500/30 shadow-md">
                    {selectedPair.acidDisplay}
                  </span>
                </>
              )}
              <div className="ml-2">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {selectedPair.oxideNameKa}
                  {selectedPair.acidNameKa && ` ↔ ${selectedPair.acidNameKa}`}
                </h4>
                <div className="text-xs text-slate-400">
                  ჟანგვის ხარისხი: <strong className="text-amber-300 font-mono">{selectedPair.oxidationState}</strong> •{' '}
                  {selectedPair.elementNameKa}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPair(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
              title="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {selectedPair.notesKa && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 md:col-span-2">
                <span className="text-amber-300 font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>სასკოლო შენიშვნა & მახასიათებლები:</span>
                </span>
                <p className="text-slate-200 leading-relaxed font-sans">
                  {selectedPair.notesKa}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
