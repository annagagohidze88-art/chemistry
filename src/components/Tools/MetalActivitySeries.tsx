import React, { useState, useMemo } from 'react';
import {
  METAL_ACTIVITY_SERIES,
  testMetalDisplacement,
  type MetalActivityItem,
  type MetalActivityGroup,
} from '../../data/metalActivityData';
import {
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Droplets,
  Flame,
  Search,
} from 'lucide-react';

export const MetalActivitySeries: React.FC = () => {
  const [selectedMetal, setSelectedMetal] = useState<MetalActivityItem>(
    METAL_ACTIVITY_SERIES.find(m => m.symbol === 'Fe') || METAL_ACTIVITY_SERIES[0]
  );

  // Displacement Simulator States
  const [metalA, setMetalA] = useState<string>('Fe');
  const [metalB, setMetalB] = useState<string>('Cu');

  // Filter query
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSeries = useMemo(() => {
    if (!searchQuery.trim()) return METAL_ACTIVITY_SERIES;
    const q = searchQuery.toLowerCase();
    return METAL_ACTIVITY_SERIES.filter(
      m =>
        m.symbol.toLowerCase().includes(q) ||
        m.nameKa.toLowerCase().includes(q) ||
        m.nameEn.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const displacementResult = useMemo(() => {
    return testMetalDisplacement(metalA, metalB);
  }, [metalA, metalB]);

  const getGroupBadge = (group: MetalActivityGroup) => {
    switch (group) {
      case 'active':
        return {
          label: 'ძალიან აქტიური',
          sublabel: 'რეაგირებს ცივ წყალთანაც',
          tileClass:
            'bg-rose-500/15 border-rose-500/40 text-rose-300 hover:border-rose-400',
          badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        };
      case 'medium':
        return {
          label: 'საშუალო აქტივობის',
          sublabel: 'აძევებს H₂-ს მჟავებიდან',
          tileClass:
            'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:border-amber-400',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        };
      case 'hydrogen':
        return {
          label: 'ეტალონი / ზღვარი',
          sublabel: 'E° = 0.00 V',
          tileClass:
            'bg-sky-500/25 border-sky-400 text-sky-200 ring-2 ring-sky-400/50 scale-105',
          badgeClass: 'bg-sky-500/25 text-sky-200 border-sky-400/50 font-black',
        };
      case 'passive':
        return {
          label: 'პასიური & კეთილშობილი',
          sublabel: 'H₂-ს ვერ აძევებს',
          tileClass:
            'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 hover:border-indigo-400',
          badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        };
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl space-y-7 text-slate-100">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                მეტალთა აქტიურობის მწკრივი (ბეკეტოვის მწკრივი)
              </h3>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>ელექტროქიმიური ძაბვის მწკრივი</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              ლითონთა აღმდგენითი უნარი, წყალთან, მჟავებთან და მარილების ხსნარებთან ურთიერთქმედება
            </p>
          </div>
        </div>

        {/* Legend Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>ძალიან აქტიური (Li - Na)</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>საშუალო (Mg - Pb)</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/40 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span>[H₂] ზღვარი</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>პასიური (Cu - Au)</span>
          </span>
        </div>
      </div>

      {/* Interactive Horizontal Activity Ribbon */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>ინტერაქტიული მწკრივი (დააწკაპეთ ელემენტს დეტალებისთვის):</span>
          </span>

          <div className="relative max-w-xs hidden sm:block">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ძებნა (მაგ. Fe, Cu, Li)..."
              className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Scrollable Ribbon */}
        <div className="p-3 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
          <div className="overflow-x-auto pb-3 custom-scrollbar">
            <div className="flex items-center gap-2 min-w-max py-2 px-1">
              {filteredSeries.map((metal, idx) => {
                const badge = getGroupBadge(metal.group);
                const isSelected = selectedMetal.symbol === metal.symbol;

                return (
                  <React.Fragment key={metal.symbol}>
                    <button
                      type="button"
                      onClick={() => setSelectedMetal(metal)}
                      className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer min-w-[72px] sm:min-w-[80px] shadow-sm select-none ${
                        badge.tileClass
                      } ${
                        isSelected
                          ? 'ring-2 ring-amber-400 scale-105 z-10 shadow-lg shadow-amber-500/20 bg-slate-900'
                          : 'bg-slate-900/80 hover:scale-[1.02]'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-semibold text-slate-400">
                        {metal.atomicNumber > 1 ? `Z=${metal.atomicNumber}` : 'ეტალონი'}
                      </span>
                      <span className="text-xl sm:text-2xl font-black font-mono tracking-tight mt-0.5">
                        {metal.symbol}
                      </span>
                      <span className="text-[10px] font-sans font-bold text-slate-300 truncate max-w-[74px] mt-0.5">
                        {metal.nameKa}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 mt-1">
                        {metal.potential > 0 ? `+${metal.potential} V` : `${metal.potential} V`}
                      </span>

                      {/* Small Indicator on top of selected */}
                      {isSelected && (
                        <div className="absolute -top-1.5 w-3 h-3 bg-amber-400 rotate-45 rounded-xs shadow-md"></div>
                      )}
                    </button>

                    {idx < filteredSeries.length - 1 && (
                      <div className="text-slate-600 font-bold text-xs select-none">
                        →
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Double Directional Arrow Guidance Bar */}
          <div className="mt-3 pt-3 border-t border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-medium text-slate-400">
            <div className="flex items-center gap-2 text-rose-300">
              <ArrowLeft className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>აღმდგენითი უნარი ძლიერდება (←):</strong> ლითონი უფრო მარტივად გასცემს ელექტრონებს და უფრო აქტიურია
              </span>
            </div>
            <div className="flex items-center gap-2 text-indigo-300 sm:text-right">
              <span>
                <strong>იონების დამჟანგველი უნარი ძლიერდება (→):</strong> კათიონები უფრო ძლიერად იერთებენ ელექტრონებს
              </span>
              <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Selected Metal Detailed Inspector Card */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/40 shadow-xl space-y-4 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-amber-400/60 flex flex-col items-center justify-center font-mono shadow-md text-amber-300 shrink-0">
              <span className="text-[10px] text-slate-400">
                {selectedMetal.atomicNumber > 1 ? selectedMetal.atomicNumber : 'H₂'}
              </span>
              <span className="text-2xl font-black">{selectedMetal.symbol}</span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h4 className="text-lg font-black text-white">{selectedMetal.nameKa}</h4>
                <span className="text-xs font-mono text-slate-400">
                  ({selectedMetal.nameEn})
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    getGroupBadge(selectedMetal.group).badgeClass
                  }`}
                >
                  {getGroupBadge(selectedMetal.group).label}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                სტანდარტული ელექტროდული პოტენციალი: <strong className="text-amber-300 font-mono font-bold text-sm">{selectedMetal.potential > 0 ? `+${selectedMetal.potential} V` : `${selectedMetal.potential} V`}</strong> (იონური ფორმა: {selectedMetal.ionForm})
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
            {selectedMetal.descriptionKa}
          </div>
        </div>

        {/* 3 Chemical Action Cards for Selected Metal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Water Reaction */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-sky-300 flex items-center gap-1.5 text-xs">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span>რეაქცია წყალთან (H₂O)</span>
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">
              {selectedMetal.reactionWithWater}
            </p>
          </div>

          {/* Acid Reaction */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-rose-300 flex items-center gap-1.5 text-xs">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>რეაქცია მჟავებთან (HCl, H₂SO₄)</span>
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">
              {selectedMetal.reactionWithAcids}
            </p>
          </div>

          {/* Salt Solutions Reaction */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-300 flex items-center gap-1.5 text-xs">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>რეაქცია მარილების ხსნარებთან</span>
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">
              {selectedMetal.reactionWithSalts}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Metal Displacement Reaction Simulator */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-white">
                ინტერაქტიული სიმულატორი: გამოაძევებს თუ არა მეტალი მეორეს მარილის ხსნარიდან?
              </h4>
              <p className="text-xs text-slate-400">
                სასკოლო კურსისა და ეროვნული გამოცდების ერთ-ერთი უმთავრესი წესი
              </p>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            <span className="text-[11px] text-slate-400 mr-1">პოპულარული ცდები:</span>
            <button
              type="button"
              onClick={() => {
                setMetalA('Fe');
                setMetalB('Cu');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              Fe + CuSO₄
            </button>
            <button
              type="button"
              onClick={() => {
                setMetalA('Cu');
                setMetalB('Ag');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              Cu + AgNO₃
            </button>
            <button
              type="button"
              onClick={() => {
                setMetalA('Zn');
                setMetalB('Pb');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              Zn + Pb(NO₃)₂
            </button>
            <button
              type="button"
              onClick={() => {
                setMetalA('Cu');
                setMetalB('Fe');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-750 text-rose-300 hover:text-white cursor-pointer transition-colors"
            >
              Cu + FeSO₄ (არ მიმდინარეობს)
            </button>
          </div>
        </div>

        {/* Simulator Selectors & Live Reaction Formula */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Metal A Selector (Free metal) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>1. თავისუფალი ლითონი (სუფთა სახით):</span>
              <span className="text-amber-400 font-mono font-bold">{metalA}</span>
            </label>
            <select
              value={metalA}
              onChange={e => setMetalA(e.target.value)}
              className="w-full bg-slate-900 border border-slate-750 focus:border-amber-400 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white font-mono font-bold outline-none cursor-pointer"
            >
              {METAL_ACTIVITY_SERIES.filter(m => m.symbol !== 'H₂').map(m => (
                <option key={m.symbol} value={m.symbol}>
                  {m.symbol} — {m.nameKa} ({m.potential > 0 ? `+${m.potential}` : m.potential} V)
                </option>
              ))}
            </select>
          </div>

          {/* Metal B Selector (Metal inside salt) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>2. მარილის ხსნარში შემავალი ლითონი:</span>
              <span className="text-cyan-400 font-mono font-bold">{metalB}</span>
            </label>
            <select
              value={metalB}
              onChange={e => setMetalB(e.target.value)}
              className="w-full bg-slate-900 border border-slate-750 focus:border-cyan-400 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white font-mono font-bold outline-none cursor-pointer"
            >
              {METAL_ACTIVITY_SERIES.filter(m => m.symbol !== 'H₂').map(m => (
                <option key={m.symbol} value={m.symbol}>
                  {m.symbol} — {m.nameKa} ({m.potential > 0 ? `+${m.potential}` : m.potential} V)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Simulator Verdict Banner */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
            displacementResult.canDisplace
              ? 'bg-gradient-to-r from-emerald-950/70 to-slate-950 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
              : displacementResult.type === 'too_active_reacts_with_water'
              ? 'bg-gradient-to-r from-amber-950/70 to-slate-950 border-amber-500/60 shadow-lg shadow-amber-500/10'
              : 'bg-gradient-to-r from-rose-950/70 to-slate-950 border-rose-500/60 shadow-lg shadow-rose-500/10'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                displacementResult.canDisplace
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : displacementResult.type === 'too_active_reacts_with_water'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {displacementResult.canDisplace ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : displacementResult.type === 'too_active_reacts_with_water' ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h5 className="text-sm sm:text-base font-black text-white">
                  {displacementResult.canDisplace
                    ? 'რეაქცია წარიმართება! ლითონი გამოიდევნება'
                    : displacementResult.type === 'too_active_reacts_with_water'
                    ? 'ყურადღება! აქტიური ლითონი ჯერ წყალთან შევა რეაქციაში'
                    : 'რეაქცია არ წარიმართება!'}
                </h5>

                {displacementResult.equation && (
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-750 text-emerald-300">
                    {displacementResult.equation}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {displacementResult.explanation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Fundamental Pedagogical Rules */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400" />
          <span>აქტიურობის მწკრივის 3 ოქროს წესი (სასკოლო კურსის გზამკვლევი):</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          {/* Rule 1 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-300 text-sm">
              <span className="w-6 h-6 rounded-lg bg-rose-500/20 flex items-center justify-center font-mono">
                1
              </span>
              <span>ურთიერთქმედება წყალთან</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              • <strong>Li-დან Na-მდე (ტუტე და ტუტემიწა):</strong> რეაგირებენ ჩვეულებრივ ტემპერატურაზე (ცივ წყალთანაც), წარმოქმნიან ტუტეს და გამოყოფენ წყალბადს (H₂↑).
              <br />
              • <strong>Mg-დან Pb-მდე:</strong> რეაგირებენ მხოლოდ გაცხელებისას ან ორთქლთან ოქსიდის წარმოქმნით.
              <br />
              • <strong>H₂-ის შემდეგ (Cu - Au):</strong> წყალთან საერთოდ არ რეაგირებენ.
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
              <span className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center font-mono">
                2
              </span>
              <span>ურთიერთქმედება მჟავებთან</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              • <strong>წყალბადამდე (H₂) მდგომი ლითონები:</strong> გაზავებული მჟავებისგან (HCl, H₂SO₄) აძევებენ აირად წყალბადს (H₂↑).
              <br />
              • <strong>წყალბადის (H₂) შემდეგ მდგომი ლითონები (Cu, Hg, Ag, Pt, Au):</strong> ჩვეულებრივი მჟავებიდან წყალბადს ვერ აძევებენ! რეაგირებენ მხოლოდ ძლიერ მჟანგავ მჟავებთან (HNO₃, კონც. H₂SO₄).
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center font-mono">
                3
              </span>
              <span>მარილების ხსნარებთან</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              • <strong>მწკრივში უფრო მარცხნივ (წინ) მდგომი ლითონი</strong> აძევებს მის მარჯვნივ (შემდგომ) მდგომ ყველა ლითონს მისი მარილის წყალხსნარიდან (მაგ. Fe + CuSO₄ → FeSO₄ + Cu↓).
              <br />
              • <strong>გამონაკლისი:</strong> ყველაზე აქტიური ლითონები (Li, Na, K, Ca) არ გამოიყენება, რადგან ისინი პირველ რიგში წყალთან რეაგირებენ!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
