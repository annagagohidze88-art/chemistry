import React, { useEffect, useState } from 'react';
import {
  FlaskConical,
  X,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Thermometer,
  Flame,
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  PlusCircle,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import type { ChemicalElement } from '../types/element';
import type { CompoundLookupResult } from '../types/compound';
import { getCompoundForElements } from '../utils/chemistry';
import { CATEGORIES } from '../data/categories';

interface CompoundExplorerProps {
  selectedElements: ChemicalElement[];
  onClear: () => void;
  onRemoveElement: (element: ChemicalElement) => void;
  onOpenSelectorHint?: () => void;
}

export const CompoundExplorer: React.FC<CompoundExplorerProps> = ({
  selectedElements,
  onClear,
  onRemoveElement,
}) => {
  const [showResultModal, setShowResultModal] = useState(false);
  const [result, setResult] = useState<CompoundLookupResult | null>(null);
  const [activeCompoundIndex, setActiveCompoundIndex] = useState(0);

  const currentCompound = (result?.compounds && result.compounds[activeCompoundIndex]) || result?.compound || null;

  const canInspect = selectedElements.length >= 2;

  const handleInspect = () => {
    if (!canInspect) return;
    const res = getCompoundForElements(selectedElements);
    setResult(res);
    setActiveCompoundIndex(0);
    setShowResultModal(true);
  };

  useEffect(() => {
    if (!showResultModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowResultModal(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showResultModal]);

  return (
    <>
      {/* Explorer Floating / Embedded Bar */}
      <section
        aria-label="ნაერთების ლაბორატორია"
        className="bg-slate-900/95 border-2 border-slate-700/80 rounded-2xl p-3 md:p-4 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left Title & Instructions */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 shrink-0">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-slate-100 flex items-center gap-2">
                ნაერთების ლაბორატორია (მრავალკომპონენტიანი)
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  {selectedElements.length} არჩეული
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                აირჩიეთ 2, 3 ან მეტი ელემენტი შესაძლო ქიმიური ნაერთის, ნალექის ან აირის სანახავად
              </p>
            </div>
          </div>

          {/* Center: Selected Element Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:w-auto max-w-xl">
            {selectedElements.length === 0 ? (
              <div className="text-xs text-slate-500 italic py-2 px-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/40">
                დააწკაპუნეთ ცხრილში ელემენტებს მათ დასამატებლად...
              </div>
            ) : (
              selectedElements.map((el, index) => {
                const cat = CATEGORIES[el.category];
                return (
                  <div
                    key={el.atomicNumber}
                    className={`
                      flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all shadow-sm
                      ${cat?.bgMuted || 'bg-slate-800'} ${cat?.borderClass || 'border-slate-600'}
                    `}
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm font-extrabold text-white font-mono">{el.symbol}</span>
                    <span className="text-xs text-slate-300 hidden sm:inline">{el.nameKa}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveElement(el)}
                      className="text-slate-400 hover:text-rose-400 p-0.5 rounded transition-colors cursor-pointer"
                      title={`${el.nameKa}-ს მოხსნა`}
                      aria-label={`${el.nameKa}-ს მოხსნა არჩევიდან`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            {selectedElements.length > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="px-3 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-all duration-150 cursor-pointer"
              >
                გასუფთავება
              </button>
            )}

            <button
              type="button"
              disabled={!canInspect}
              onClick={handleInspect}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-lg
                ${
                  canInspect
                    ? 'bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 hover:scale-[1.03] text-white shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                    : 'bg-slate-800/80 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-60'
                }
              `}
            >
              <Sparkles className="w-4 h-4" />
              <span>შესაძლო ნაერთის ნახვა</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal with Reaction Details */}
      {showResultModal && result && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowResultModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="შესაძლო ნაერთის ანალიზი"
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar text-slate-100"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              autoFocus
              onClick={() => setShowResultModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="დახურვა"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Pair Badge */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-mono text-emerald-300 border border-slate-700 font-bold">
                {selectedElements.map(e => `${e.nameKa} (${e.symbol})`).join(' + ')}
              </span>
              <span className="text-xs text-slate-400">• რეაქციის ანალიზი</span>
            </div>

            {/* CASE 1: COMPOUND FOUND */}
            {result.found && currentCompound ? (
              <div className="space-y-4">
                {/* Multi-Compound Tabs (when 2 or more compounds match this element set) */}
                {result.compounds && result.compounds.length > 1 && (
                  <div className="bg-slate-950/90 border border-slate-750 rounded-xl p-3 space-y-2 shadow-inner">
                    <div className="text-xs text-amber-300 font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>ამ ელემენტებისგან შესაძლებელია {result.compounds.length} ნაერთის მიღება:</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">აირჩიეთ ნაერთი სანახავად</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.compounds.map((comp, idx) => (
                        <button
                          key={comp.id}
                          type="button"
                          onClick={() => setActiveCompoundIndex(idx)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            activeCompoundIndex === idx
                              ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-slate-950 shadow-md shadow-emerald-500/25 ring-2 ring-emerald-400/40'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                          }`}
                        >
                          <span>{comp.formula}</span>
                          <span className="text-[11px] font-sans font-normal opacity-85">({comp.nameKa})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Hero Card for Compound */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950/70 border border-emerald-500/40 rounded-xl p-5 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/80 pb-3 mb-3">
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold tracking-wide font-mono text-emerald-400">
                        {currentCompound.formula}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-0.5">
                        {currentCompound.nameKa}
                      </h3>
                      <div className="text-xs text-slate-400 italic">{currentCompound.nameEn}</div>
                    </div>

                    <div className="flex flex-col gap-1 items-start sm:items-end">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        ნაერთი დადასტურებულია
                      </span>
                      <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800">
                        კლასი: {currentCompound.compoundClass}
                      </span>
                    </div>
                  </div>

                  {/* SPECIAL BADGES REQUESTED BY USER */}
                  <div className="flex flex-col gap-2 my-3">
                    {/* 1. Precipitate (ნალექი) */}
                    {currentCompound.precipitate?.isPrecipitate && (
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs font-medium">
                        <ArrowDownCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <strong className="text-amber-300 mr-1.5">ნალექი:</strong>
                          {currentCompound.precipitate.colorAndForm}
                        </div>
                      </div>
                    )}

                    {/* 2. Gas release (აირი / გაზი) */}
                    {currentCompound.gasRelease?.isGas && (
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-sky-500/15 border border-sky-500/40 text-sky-200 text-xs font-medium">
                        <ArrowUpCircle className="w-4 h-4 text-sky-400 shrink-0" />
                        <div>
                          <strong className="text-sky-300 mr-1.5">აირის გამოყოფა:</strong>
                          {currentCompound.gasRelease.gasType}
                        </div>
                      </div>
                    )}

                    {/* 3. Non-salt-forming neutral oxide (მარილარწარმომქმნელი ოქსიდი) */}
                    {currentCompound.nonSaltFormingOxide?.isNonSaltForming && (
                      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-500/20 border-2 border-rose-500/60 text-rose-200 text-xs">
                        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-rose-300 block font-bold text-xs uppercase mb-0.5">
                            მარილარწარმომქმნელი (ინდიფერენტული) ოქსიდი!
                          </strong>
                          <span>{currentCompound.nonSaltFormingOxide.explanation}</span>
                        </div>
                      </div>
                    )}

                    {/* 4. Hazard Warning */}
                    {currentCompound.hazardWarning && (
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-950/60 border border-red-700 text-red-200 text-xs">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{currentCompound.hazardWarning}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-2">
                    {currentCompound.descriptionKa}
                  </div>
                </div>

                {/* Reaction Conditions Block */}
                <div className="bg-slate-850 border border-slate-750 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-amber-400" />
                    რეაქციის წარმართვის პირობები და თერმოდინამიკა:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {currentCompound.reactionConditions.temperature && (
                      <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block mb-0.5 font-medium">ტემპერატურა და სითბური რეჟიმი:</span>
                        <span className="text-slate-200 font-medium">
                          {currentCompound.reactionConditions.temperature}
                        </span>
                      </div>
                    )}
                    {currentCompound.reactionConditions.catalyst && (
                      <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block mb-0.5 font-medium">კატალიზატორი:</span>
                        <span className="text-slate-200 font-medium">
                          {currentCompound.reactionConditions.catalyst}
                        </span>
                      </div>
                    )}
                    {currentCompound.reactionConditions.state && (
                      <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 col-span-1 sm:col-span-2">
                        <span className="text-slate-400 block mb-0.5 font-medium">აგრეგატული მდგომარეობა და ფაზური გადასვლა:</span>
                        <span className="text-slate-200 font-medium">
                          {currentCompound.reactionConditions.state}
                        </span>
                      </div>
                    )}
                    {currentCompound.reactionConditions.details && (
                      <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 col-span-1 sm:col-span-2">
                        <span className="text-slate-400 block mb-0.5 flex items-center gap-1 font-medium">
                          <Flame className="w-3.5 h-3.5 text-rose-400" />
                          ქიმიური განტოლება:
                        </span>
                        <span className="text-emerald-300 font-mono font-bold text-xs sm:text-sm">
                          {currentCompound.reactionConditions.details}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Important Educational Disclaimer */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200/90">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-amber-300 font-semibold block mb-0.5">
                      საგანმანათლებლო შენიშვნა:
                    </strong>
                    {result.educationalExplanationKa}
                  </div>
                </div>
              </div>
            ) : (
              /* CASE 2: NO REACTION / CANNOT FORM COMPOUND (EXPLICIT AND PROMINENT) */
              <div className="space-y-4">
                <div className="bg-gradient-to-b from-rose-950/50 to-slate-900 border-2 border-rose-500/60 rounded-xl p-5 text-center shadow-xl">
                  <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto mb-3 animate-pulse">
                    <X className="w-8 h-8 text-rose-400 stroke-[3]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-rose-200 mb-1 tracking-tight">
                    ქიმიური ნაერთი არ წარმოიქმნება!
                  </h3>

                  {result.reasonWhyNoReaction && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-900/60 border border-rose-700/80 rounded-lg text-rose-200 font-semibold text-xs my-2">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{result.reasonWhyNoReaction}</span>
                    </div>
                  )}

                  <div className="mt-3 p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed text-left space-y-2">
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-sky-400" />
                      მეცნიერული განმარტება:
                    </div>
                    <p>{result.educationalExplanationKa}</p>
                  </div>

                  {/* Suggestions for user */}
                  {result.suggestedElements && result.suggestedElements.length > 0 && (
                    <div className="mt-4 p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-left text-xs">
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1.5">
                        <PlusCircle className="w-4 h-4 text-emerald-400" />
                        სცადეთ ამ ელემენტ(ებ)ის დამატება ნაერთის შესაქმნელად:
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {result.suggestedElements.map((sug, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-emerald-900/40 border border-emerald-700 text-emerald-200 font-medium font-mono"
                          >
                            + {sug}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-200 leading-relaxed flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>რჩევა:</strong> სცადეთ წყალბადის (H), ნახშირბადის (C) და ჟანგბადის (O) შერევა ნახშირმჟავას ან სპირტის სანახავად, ან კალციუმის (Ca), ნახშირბადის (C) და ჟანგბადის (O) შერევა კირქვის (CaCO₃) ნალექის მისაღებად!
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowResultModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                დახურვა
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
