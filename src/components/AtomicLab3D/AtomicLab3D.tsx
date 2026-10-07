import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { ChemicalElement } from '../../types/element';
import type { ParticleCounts, SceneVisualMode } from '../../types/atomic3d';
import {
  STANDARD_NEUTRONS,
  getStabilityVerdict,
  calculateElectronConfig,
  ATOM_PRESETS,
  SHELL_NAMES,
  SHELL_CAPACITIES,
} from '../../utils/nuclearPhysics';
import { AtomScene3D } from './AtomScene3D';
import { ValleyChart } from './ValleyChart';
import { ChallengeDrawer } from './ChallengeDrawer';
import {
  Atom,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown,
  Activity,
  Trophy,
  ExternalLink,
  BookOpen,
  Sliders,
  Play,
  Pause,
  Plus,
  Minus,
  Timer,
} from 'lucide-react';

interface AtomicLab3DProps {
  elements: ChemicalElement[];
  initialElement?: ChemicalElement | null;
  onOpenElementDetails?: (element: ChemicalElement) => void;
}

export const AtomicLab3D: React.FC<AtomicLab3DProps> = ({
  elements,
  initialElement,
  onOpenElementDetails,
}) => {
  // Current particle counts
  const [protons, setProtons] = useState<number>(() => {
    return initialElement ? initialElement.atomicNumber : 6; // default Carbon-12
  });

  const [neutrons, setNeutrons] = useState<number>(() => {
    const z = initialElement ? initialElement.atomicNumber : 6;
    return STANDARD_NEUTRONS[z] ?? z;
  });

  const [electrons, setElectrons] = useState<number>(() => {
    return initialElement ? initialElement.atomicNumber : 6;
  });

  // Visual settings
  const [visualMode, setVisualMode] = useState<SceneVisualMode>('shells');
  const [speed, setSpeed] = useState<number>(1.0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [nucleusExpansion, setNucleusExpansion] = useState<number>(1.0);

  // Challenge drawer toggle
  const [showChallenges, setShowChallenges] = useState<boolean>(false);

  // Element picker dropdown state
  const [searchPicker, setSearchPicker] = useState<string>('');
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  // Current matched element from database (if protons between 1 and 118)
  const currentElement = useMemo(() => {
    if (protons >= 1 && protons <= 118) {
      return elements.find(e => e.atomicNumber === protons) || null;
    }
    return null;
  }, [protons, elements]);

  // Nuclear stability verdict
  const stability = useMemo(() => {
    return getStabilityVerdict(protons, neutrons);
  }, [protons, neutrons]);

  // Electron configuration
  const electronConfig = useMemo(() => {
    return calculateElectronConfig(electrons);
  }, [electrons]);

  // Net ionic charge
  const netCharge = protons - electrons;
  const chargeLabel = useMemo(() => {
    if (netCharge === 0) return { text: 'ნეიტრალური ატომი', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    if (netCharge > 0) return { text: `კატიონი (+${netCharge})`, badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40' };
    return { text: `ანიონი (${netCharge})`, badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
  }, [netCharge]);

  // Mass number A = Z + N
  const massNumber = protons + neutrons;

  // Particle modifier helpers
  const bumpProtons = useCallback((delta: number) => {
    setProtons(prev => {
      const next = Math.max(0, Math.min(118, prev + delta));
      // Auto-tune default neutrons if previous was matching standard
      return next;
    });
  }, []);

  const bumpNeutrons = useCallback((delta: number) => {
    setNeutrons(prev => Math.max(0, Math.min(180, prev + delta)));
  }, []);

  const bumpElectrons = useCallback((delta: number) => {
    setElectrons(prev => Math.max(0, Math.min(118, prev + delta)));
  }, []);

  // Reset to neutral atom for current element
  const handleResetToNeutral = useCallback(() => {
    const stdN = STANDARD_NEUTRONS[protons] ?? protons;
    setNeutrons(stdN);
    setElectrons(protons);
  }, [protons]);

  // Set nuclide directly (e.g. from ValleyChart or Preset)
  const handleSelectNuclide = useCallback((z: number, n: number) => {
    setProtons(z);
    setNeutrons(n);
    setElectrons(z);
  }, []);

  // Keyboard shortcuts (P, N, E)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore if user is typing in input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const isShift = e.shiftKey;
      const delta = isShift ? -1 : 1;

      if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        bumpProtons(delta);
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        bumpNeutrons(delta);
      } else if (e.key.toLowerCase() === 'e') {
        e.preventDefault();
        bumpElectrons(delta);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(p => !p);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bumpProtons, bumpNeutrons, bumpElectrons]);

  // Filtered elements for picker dropdown
  const filteredElements = useMemo(() => {
    if (!searchPicker.trim()) return elements;
    const q = searchPicker.toLowerCase().trim();
    return elements.filter(
      el =>
        el.nameKa.toLowerCase().includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        el.nameEn.toLowerCase().includes(q) ||
        el.atomicNumber.toString() === q
    );
  }, [elements, searchPicker]);

  const currentCounts: ParticleCounts = { protons, neutrons, electrons };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. Header Toolbar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
              <Atom className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              3D ატომური ლაბორატორია (Atom Builder 3D)
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
                სიმულატორი
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            დაამატეთ პროტონი და შეიცვლება ელემენტი. დაამატეთ ნეიტრონი და მიიღებთ იზოტოპს. დაამატეთ ელექტრონი და შექმნით იონს.
            რეალური 3D ვიზუალიზაცია, სტაბილურობის ველი და კვანტური ორბიტალები.
          </p>
        </div>

        {/* Action Controls & Element Selector */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Element Quick Search Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <button
              type="button"
              onClick={() => setIsPickerOpen(!isPickerOpen)}
              className="w-full sm:w-56 flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700/80 hover:border-sky-500 text-xs font-semibold text-slate-200 transition-colors cursor-pointer shadow-inner"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-black text-sky-400 font-mono">
                  {currentElement ? currentElement.symbol : 'X'}
                </span>
                <span className="truncate">
                  {currentElement ? `${currentElement.nameKa} (Z=${protons})` : `Z=${protons}`}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {isPickerOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-72 max-h-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col p-2 animate-fadeIn">
                <input
                  type="text"
                  placeholder="მოძებნეთ ელემენტი (სახელი, სიმბოლო, Z)..."
                  value={searchPicker}
                  onChange={e => setSearchPicker(e.target.value)}
                  autoFocus
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 mb-2"
                />
                <div className="overflow-y-auto custom-scrollbar flex-1 space-y-0.5">
                  {filteredElements.map(el => (
                    <button
                      key={`picker-${el.atomicNumber}`}
                      type="button"
                      onClick={() => {
                        setProtons(el.atomicNumber);
                        setNeutrons(STANDARD_NEUTRONS[el.atomicNumber] ?? el.atomicNumber);
                        setElectrons(el.atomicNumber);
                        setIsPickerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                        el.atomicNumber === protons
                          ? 'bg-sky-500/20 text-sky-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-6 font-mono font-bold text-sky-400">{el.symbol}</span>
                        <span>{el.nameKa}</span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">#{el.atomicNumber}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Challenge Quiz Button */}
          <button
            type="button"
            onClick={() => setShowChallenges(!showChallenges)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md border ${
              showChallenges
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/30'
                : 'bg-slate-800 hover:bg-slate-750 text-amber-300 border-amber-500/30'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>ვიქტორინა</span>
          </button>

          {/* Reset to Neutral */}
          <button
            type="button"
            onClick={handleResetToNeutral}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="ნეიტრონებისა და მუხტის საწყისზე დაბრუნება"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">ნეიტრალური</span>
          </button>
        </div>
      </div>

      {/* Challenge Drawer (when opened) */}
      {showChallenges && (
        <ChallengeDrawer
          currentCounts={currentCounts}
          onApplyTarget={target => {
            setProtons(target.protons);
            setNeutrons(target.neutrons);
            setElectrons(target.electrons);
          }}
          onClose={() => setShowChallenges(false)}
        />
      )}

      {/* 2. Main Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left / Center 3D Stage (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-3">
          {/* 3D Canvas */}
          <AtomScene3D
            protons={protons}
            neutrons={neutrons}
            electrons={electrons}
            visualMode={visualMode}
            speed={speed}
            nucleusExpansion={nucleusExpansion}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused(!isPaused)}
            elementSymbol={currentElement ? currentElement.symbol : 'X'}
          />

          {/* 3D Viewport Controls Toolbar */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Visual Mode Switch: Bohr Shells vs Quantum Orbitals */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setVisualMode('shells')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  visualMode === 'shells'
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Atom className="w-3.5 h-3.5" />
                <span>3D შრეები (ბორი)</span>
              </button>
              <button
                type="button"
                onClick={() => setVisualMode('orbitals')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  visualMode === 'orbitals'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>კვანტური ღრუბელი (s, p, d)</span>
              </button>
            </div>

            {/* Nucleus Expansion Slider */}
            <div className="flex items-center gap-2 text-slate-400">
              <span className="font-mono text-[11px] text-slate-300">ბირთვის გაშლა:</span>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={nucleusExpansion}
                onChange={e => setNucleusExpansion(parseFloat(e.target.value))}
                className="w-20 accent-sky-500 cursor-pointer"
                title="გაზარდეთ ბირთვის მანძილი პროტონებისა და ნეიტრონების დეტალური დასათვალიერებლად"
              />
              <span className="font-mono text-[10px] text-slate-500 w-8">
                {nucleusExpansion.toFixed(1)}x
              </span>
            </div>

            {/* Speed Slider */}
            <div className="flex items-center gap-2 text-slate-400">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="p-1 rounded text-slate-300 hover:text-white"
                title={isPaused ? 'გაშვება' : 'პაუზა'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-amber-400" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <span className="font-mono text-[11px] text-slate-300">სიჩქარე:</span>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.2"
                value={speed}
                onChange={e => setSpeed(parseFloat(e.target.value))}
                className="w-20 accent-sky-500 cursor-pointer"
              />
              <span className="font-mono text-[10px] text-slate-500 w-6">{speed.toFixed(1)}x</span>
            </div>
          </div>

          {/* Quick Presets Row */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                სწრაფი გადასვლა (ნუკლიდების ნიმუშები):
              </span>
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">11 პოპულარული ატომი & იონი</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {ATOM_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setProtons(preset.protons);
                    setNeutrons(preset.neutrons);
                    setElectrons(preset.electrons);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    protons === preset.protons &&
                    neutrons === preset.neutrons &&
                    electrons === preset.electrons
                      ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold shadow-sm'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                  title={`${preset.nameKa} — ${preset.descriptionKa}`}
                >
                  <span className="font-black text-sky-400">{preset.label}</span>
                  <span className="text-[10px] text-slate-400 hidden sm:inline">{preset.tagKa}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Controls & Diagnostics (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 1. Identity & Isotope Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-[10px] font-mono text-slate-400">
                    {massNumber}
                  </span>
                  <span className="text-2xl font-black text-white font-sans leading-none my-0.5">
                    {currentElement ? currentElement.symbol : 'X'}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    Z={protons}
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl font-black text-white">
                      {currentElement ? currentElement.nameKa : `ელემენტი Z=${protons}`}
                    </h3>
                    {currentElement && (
                      <span className="text-xs text-slate-400 italic">
                        ({currentElement.nameEn})
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${chargeLabel.badge}`}>
                      {chargeLabel.text}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 border border-slate-700 text-slate-300">
                      მასური რიცხვი A = {massNumber}
                    </span>
                  </div>
                </div>
              </div>

              {currentElement && onOpenElementDetails && (
                <button
                  type="button"
                  onClick={() => onOpenElementDetails(currentElement)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  title="ელემენტის სრული დეტალები და რეალური ფოტო"
                >
                  <ExternalLink className="w-4 h-4 text-sky-400" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Particle Counters Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-mono uppercase tracking-wider flex items-center gap-1.5 font-bold text-slate-300">
                <Sliders className="w-3.5 h-3.5 text-sky-400" />
                ნაწილაკების მართვა:
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                P / N / E კლავიშები
              </span>
            </div>

            {/* Protons Controller */}
            <div className="flex items-center justify-between bg-slate-950/70 border border-slate-800 rounded-xl p-2.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/60 inline-block" />
                <div>
                  <span className="text-xs font-bold text-slate-200 block">პროტონები (p⁺)</span>
                  <span className="text-[10px] text-slate-400 font-mono">განსაზღვრავს ელემენტს (Z)</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => bumpProtons(-1)}
                  disabled={protons <= 0}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center font-bold cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="0"
                  max="118"
                  value={protons}
                  onChange={e => setProtons(Math.max(0, Math.min(118, parseInt(e.target.value) || 0)))}
                  className="w-12 text-center font-mono font-bold text-sm bg-slate-900 border border-slate-700 rounded-lg py-1 text-rose-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => bumpProtons(1)}
                  disabled={protons >= 118}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center font-bold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Neutrons Controller */}
            <div className="flex items-center justify-between bg-slate-950/70 border border-slate-800 rounded-xl p-2.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-400 shadow-sm shadow-slate-400/60 inline-block" />
                <div>
                  <span className="text-xs font-bold text-slate-200 block">ნეიტრონები (n⁰)</span>
                  <span className="text-[10px] text-slate-400 font-mono">განსაზღვრავს იზოტოპს (N)</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => bumpNeutrons(-1)}
                  disabled={neutrons <= 0}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center font-bold cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="0"
                  max="180"
                  value={neutrons}
                  onChange={e => setNeutrons(Math.max(0, Math.min(180, parseInt(e.target.value) || 0)))}
                  className="w-12 text-center font-mono font-bold text-sm bg-slate-900 border border-slate-700 rounded-lg py-1 text-slate-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => bumpNeutrons(1)}
                  disabled={neutrons >= 180}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center font-bold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Electrons Controller */}
            <div className="flex items-center justify-between bg-slate-950/70 border border-slate-800 rounded-xl p-2.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-400 shadow-sm shadow-sky-400/60 inline-block" />
                <div>
                  <span className="text-xs font-bold text-slate-200 block">ელექტრონები (e⁻)</span>
                  <span className="text-[10px] text-slate-400 font-mono">განსაზღვრავს მუხტსა & იონს</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => bumpElectrons(-1)}
                  disabled={electrons <= 0}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center font-bold cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="0"
                  max="118"
                  value={electrons}
                  onChange={e => setElectrons(Math.max(0, Math.min(118, parseInt(e.target.value) || 0)))}
                  className="w-12 text-center font-mono font-bold text-sm bg-slate-900 border border-slate-700 rounded-lg py-1 text-sky-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => bumpElectrons(1)}
                  disabled={electrons >= 118}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center font-bold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Nuclear Stability Verdict */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                ბირთვული სტაბილურობა:
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${stability.badgeClass}`}>
                {stability.statusKa}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {stability.decayDescriptionKa}
            </p>

            {stability.halfLifeHintKa && (
              <div className="text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>ნახევრადდაშლის პერიოდი: {stability.halfLifeHintKa}</span>
              </div>
            )}
          </div>

          {/* 4. Electron Configuration & Shells */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono uppercase tracking-wider font-bold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                ელექტრონული კონფიგურაცია:
              </span>
              <span className="font-mono text-[11px] text-sky-400 font-bold">
                {electrons}e⁻
              </span>
            </div>

            <div className="font-mono text-xs sm:text-sm text-slate-200 bg-slate-950 p-2.5 rounded-xl border border-slate-800 break-words font-semibold">
              {electronConfig.configString}
            </div>

            {/* Shell-by-shell breakdown */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 block">
                შრეების შევსება (2n² წესი):
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {SHELL_NAMES.slice(0, 7).map((sName, sIdx) => {
                  const sCap = SHELL_CAPACITIES[sIdx];
                  const curCount = electronConfig.subshells
                    .filter(sub => {
                      const n = parseInt(sub.name[0], 10);
                      return n === sIdx + 1;
                    })
                    .reduce((acc, curr) => acc + curr.count, 0);

                  return (
                    <div
                      key={`shell-box-${sName}`}
                      className={`p-1.5 rounded-lg border text-center font-mono ${
                        curCount > 0
                          ? 'bg-slate-950 border-sky-500/40 text-slate-200'
                          : 'bg-slate-950/40 border-slate-850 text-slate-600'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 block font-bold">{sName} ({sIdx + 1})</span>
                      <span className="text-xs font-bold text-sky-300">
                        {curCount} <span className="text-[9px] text-slate-500">/ {sCap}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 5. Valley of Stability 2D Chart */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono uppercase tracking-wider font-bold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                სტაბილურობის ველი (Valley of Stability):
              </span>
            </div>
            <ValleyChart
              protons={protons}
              neutrons={neutrons}
              onSelectNuclide={handleSelectNuclide}
            />
          </div>
        </div>
      </div>

      {/* 3. Educational Concept Cards Section */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-400" />
          <h3 className="text-base sm:text-lg font-extrabold text-white">
            ატომის აღნაგობა, იზოტოპები და იონები — თეორიული ცნობარი
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          {/* Card 1: Protons */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <h4 className="font-bold text-white text-sm">პროტონები (Z) — რა ელემენტია?</h4>
            </div>
            <p className="text-slate-300 leading-relaxed">
              პროტონების რაოდენობა ბირთვში (ატომური ნომერი Z) ცალსახად განსაზღვრავს ქიმიურ ელემენტს.
              6 პროტონი ყოველთვის ნახშირბადია, 7 — აზოტი, ხოლო 79 — ოქრო. პროტონების შეცვლა ნიშნავს ერთი ელემენტის გარდაქმნას მეორედ (ბირთვული ტრანსმუტაცია).
            </p>
          </div>

          {/* Card 2: Neutrons */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-400 inline-block" />
              <h4 className="font-bold text-white text-sm">ნეიტრონები (N) — იზოტოპები</h4>
            </div>
            <p className="text-slate-300 leading-relaxed">
              ნეიტრონები ანეიტრალებენ დადებითად დამუხტულ პროტონებს შორის კულონის განზიდვის ძალებს ძლიერი ბირთვული ურთიერთქმედების მეშვეობით.
              ერთი და იგივე ელემენტის ატომებს ნეიტრონების განსხვავებული რიცხვით ეწოდებათ <strong>იზოტოპები</strong> (მაგ. ¹²C და ¹⁴C).
            </p>
          </div>

          {/* Card 3: Electrons */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" />
              <h4 className="font-bold text-white text-sm">ელექტრონები (e⁻) — იონები & ქიმია</h4>
            </div>
            <p className="text-slate-300 leading-relaxed">
              ქიმიური თვისებები და რეაქციები განისაზღვრება ელექტრონებით.
              ელექტრონის დაკარგვით მიიღება დადებითი <strong>კატიონი</strong> (Na⁺), ხოლო შეძენით — უარყოფითი <strong>ანიონი</strong> (Cl⁻).
              სრული გარე შრის (ოქტეტის) მიღწევა ქიმიური ბმის წარმოქმნის მთავარი მამოძრავებელი ძალაა.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
