import React, { useState } from 'react';
import { X, ExternalLink, Atom, Sparkles, Layers, Activity, Plus, Check, Camera, ImageOff } from 'lucide-react';
import type { ChemicalElement } from '../types/element';
import { ROMAN_PERIODS } from '../types/element';
import { CATEGORIES } from '../data/categories';
import { BohrModel } from './BohrModel';

interface ElementDetailsProps {
  element: ChemicalElement | null;
  onClose: () => void;
  onToggleElement: (element: ChemicalElement) => void;
  isSelected: boolean;
  onOpenAtomicLab?: (element: ChemicalElement) => void;
}

export const ElementDetails: React.FC<ElementDetailsProps> = ({
  element,
  onClose,
  onToggleElement,
  isSelected,
  onOpenAtomicLab,
}) => {
  const [imageError, setImageError] = useState(false);

  if (!element) return null;

  const category = CATEGORIES[element.category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${element.nameKa} (${element.symbol}) — დეტალური ინფორმაცია`}
        className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto custom-scrollbar shadow-2xl relative text-slate-100 p-5 sm:p-7"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer z-10"
          aria-label="დახურვა"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            {/* Chemical Tile Icon */}
            <div
              className={`
                w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center shadow-xl shrink-0
                ${category ? category.colorClass : 'bg-slate-800 border-slate-600'}
              `}
              style={{
                boxShadow: category ? `0 0 25px ${category.glowColor}` : undefined,
              }}
            >
              <span className="text-[11px] font-mono opacity-80 font-bold leading-none">
                {element.atomicNumber}
              </span>
              <span className="text-3xl font-black tracking-tight font-sans text-white my-0.5 drop-shadow-md">
                {element.symbol}
              </span>
              <span className="text-[9px] font-mono opacity-90 truncate max-w-[70px]">
                {element.atomicMass}
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {element.nameKa}
                </h2>
                <span className="text-sm font-medium text-slate-400 italic">
                  ({element.nameEn})
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${category?.badgeBg || 'bg-slate-700'}`}
                >
                  {category?.nameKa || element.category}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-amber-500/15 border border-amber-500/40 text-amber-300"
                  title={`პერიოდი ${element.period}`}
                >
                  პერიოდი {ROMAN_PERIODS[element.period]} ({element.period})
                </span>
                {element.group && (
                  <span className="px-2 py-0.5 rounded-md text-xs font-mono bg-slate-800 border border-slate-700 text-slate-300">
                    ჯგუფი {element.group}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-md text-xs font-mono bg-slate-800 border border-slate-700 text-slate-300">
                  ბლოკი {element.block}
                </span>
              </div>
            </div>
          </div>

          {/* Actions: 3D Atomic Lab & Compound Selection */}
          <div className="w-full sm:w-auto self-stretch sm:self-center flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {onOpenAtomicLab && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAtomicLab(element);
                }}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-sky-600 hover:bg-sky-500 text-white transition-all cursor-pointer border border-sky-400 shadow-lg shadow-sky-600/25"
                title="გახსენით ეს ატომი 3D ლაბორატორიაში"
              >
                <Atom className="w-4 h-4" />
                <span>3D ატომური ლაბორატორია</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onToggleElement(element)}
              className={`
                flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border shadow-lg
                ${
                  isSelected
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-emerald-600/30 ring-2 ring-emerald-400'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700 hover:border-emerald-500/60'
                }
              `}
            >
              {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isSelected ? 'არჩეულია ნაერთებში' : 'ნაერთებში დამატება'}</span>
            </button>
          </div>
        </div>

        {/* Real Photograph & Visuals Banner */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* Photo Box */}
          <div className="md:col-span-5 bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-sky-400" />
                რეალური ფოტოსურათი:
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Wikimedia / IUPAC</span>
            </div>

            <div className="relative w-full h-48 sm:h-52 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
              {element.image?.url && !imageError ? (
                <img
                  src={element.image.url}
                  alt={`${element.nameKa} (${element.symbol}) ნატურალურ მდგომარეობაში`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center text-slate-500">
                  <ImageOff className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-xs font-medium text-slate-400">
                    {element.atomicNumber > 100
                      ? 'სუპერმძიმე სინთეზური ელემენტი'
                      : 'მაკროსკოპული ფოტო ხელმისაწვდომი არ არის'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 max-w-[220px]">
                    {element.atomicNumber > 100
                      ? 'არსებობს მხოლოდ რამდენიმე ატომის სახით წამების განმავლობაში.'
                      : 'ელემენტის ვიზუალური იერსახე იხილეთ აღწერაში.'}
                  </span>
                </div>
              )}
            </div>

            {element.image?.title && !imageError && (
              <p className="text-[11px] text-slate-400 mt-2 truncate" title={element.image.title}>
                📷 {element.image.title}
              </p>
            )}
          </div>

          {/* Visual Appearance Description & Summary */}
          <div className="md:col-span-7 flex flex-col justify-between gap-3">
            <div className="bg-slate-850/80 border border-slate-800 rounded-xl p-3.5">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                ვიზუალური აღწერა და მდგომარეობა:
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {element.appearance}
              </p>
            </div>

            <div className="bg-slate-850/80 border border-slate-800 rounded-xl p-3.5 flex-1">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-400" />
                ქიმიური თვისებების მიმოხილვა:
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {element.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid: Properties & Bohr Model */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Bohr Model & Electronic Configuration */}
          <div className="bg-slate-850/60 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-between">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Atom className="w-4 h-4 text-sky-400" />
                ბორის ატომური მოდელი
              </span>
              <span className="font-mono text-[11px]">Z = {element.atomicNumber}</span>
            </div>

            <div className="my-2 flex justify-center w-full">
              <BohrModel element={element} size={220} />
            </div>

            <div className="w-full mt-3 pt-3 border-t border-slate-800 text-xs space-y-2">
              <div>
                <div className="text-slate-400 mb-1">ელექტრონული კონფიგურაცია:</div>
                <div className="font-mono text-sky-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-center font-bold">
                  {element.electronConfiguration}
                </div>
              </div>

              {onOpenAtomicLab && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAtomicLab(element);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 text-sky-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Atom className="w-4 h-4" />
                  <span>3D ატომური მოდელის გახსნა (WebGL)</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Valency, Oxidation States & Physical Properties */}
          <div className="space-y-3">
            {/* Valency & Oxidation States Block */}
            <div className="bg-slate-850/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                ვალენტობა და ჟანგვის რიცხვები:
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px] mb-0.5">ვალენტობა:</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">
                    {element.valency}
                  </span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px] mb-0.5">გავრცელებული ჟანგვის რიცხვები:</span>
                  <span className="font-mono font-bold text-emerald-300 text-sm">
                    {element.oxidationStates}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 italic bg-slate-900/40 p-2 rounded border border-slate-800/80 leading-normal">
                ℹ️ <strong>განმარტება:</strong> ვალენტობა და ჟანგვის რიცხვი ცალ-ცალკე განისაზღვრება. ვალენტობა გამოხატავს ატომის მიერ წარმოქმნილი კოვალენტური ბმების რაოდენობას, ხოლო ჟანგვის რიცხვი — მის პირობით მუხტს. მათი მნიშვნელობები ნაერთის მიხედვით შეიძლება იცვლებოდეს.
              </div>
            </div>

            {/* Physical Properties Table */}
            <div className="bg-slate-850/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-400" />
                ფიზიკური და ქიმიური მახასიათებლები:
              </h3>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">ფაზა (20 °C-ზე):</span>
                  <span className="text-slate-200 font-medium">
                    {element.phase === 'gas'
                      ? 'აირი'
                      : element.phase === 'liquid'
                      ? 'სითხე'
                      : element.phase === 'unknown'
                      ? 'მონაცემი ხელმისაწვდომი არ არის'
                      : 'მყარი'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">სიმკვრივე:</span>
                  <span className="text-slate-200 font-mono">{element.density}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">დნობის ტემპერატურა:</span>
                  <span className="text-slate-200 font-mono">{element.meltingPoint}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">დუღილის ტემპერატურა:</span>
                  <span className="text-slate-200 font-mono">{element.boilingPoint}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">ელექტროუარყოფითობა (პოლინგი):</span>
                  <span className="text-slate-200 font-mono">
                    {element.electronegativity ?? 'მონაცემი ხელმისაწვდომი არ არის'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real world Uses & History */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 bg-slate-850/80 border border-slate-800 rounded-xl p-3.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              გამოყენების მაგალითები:
            </h4>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              {element.uses.map((use, i) => (
                <li key={i}>{use}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 bg-slate-850/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-center">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              აღმოჩენის ისტორია:
            </h4>
            <div className="text-xs text-slate-300">
              {element.discoveryYear || 'მონაცემი ხელმისაწვდომი არ არის'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
