import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ELEMENTS } from '../../data/elements';
import type { ChemicalElement } from '../../types/element';
import {
  Trophy,
  HelpCircle,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Eye,
  Zap,
  Compass,
  Scale,
  Search,
  Unlock,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Flame,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import {
  SCHOOL_ELEMENT_NUMBERS,
  SCHOOL_ELEMENT_RIDDLES,
  getElementRiddleClues,
  type FormattedClue,
} from '../../data/elementRiddles';

type GameMode = 'school' | 'all';

export const ElementGuesserGame: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>('school');

  // Pick an element based on current mode
  const pickRandomElement = (mode: GameMode): ChemicalElement => {
    if (mode === 'school') {
      const randomNum =
        SCHOOL_ELEMENT_NUMBERS[Math.floor(Math.random() * SCHOOL_ELEMENT_NUMBERS.length)];
      const found = ELEMENTS.find(e => e.atomicNumber === randomNum);
      return found || ELEMENTS[0];
    }
    // All elements (first 82 elements up to Lead)
    const candidates = ELEMENTS.slice(0, 82);
    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  const [targetElement, setTargetElement] = useState<ChemicalElement>(() =>
    pickRandomElement('school')
  );

  // First 2 clues are open by default (everyday life & appearance)
  const [unlockedClues, setUnlockedClues] = useState<number[]>([1, 2]);
  const [guessInput, setGuessInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [guesses, setGuesses] = useState<
    {
      element: ChemicalElement;
      direction: 'higher' | 'lower' | 'correct';
      distanceText: string;
      diff: number;
    }[]
  >([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasGivenUp, setHasGivenUp] = useState(false);
  const [score, setScore] = useState(100);
  const [streak, setStreak] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Clues for current target element
  const clues: FormattedClue[] = useMemo(() => {
    return getElementRiddleClues(targetElement);
  }, [targetElement]);

  // Autocomplete matching elements
  const autocompleteSuggestions = useMemo(() => {
    const q = guessInput.trim().toLowerCase();
    if (!q || q.length < 1) return [];

    return ELEMENTS.filter(
      el =>
        el.nameKa.toLowerCase().includes(q) ||
        el.symbol.toLowerCase().startsWith(q) ||
        el.nameEn.toLowerCase().includes(q) ||
        String(el.atomicNumber) === q
    ).slice(0, 6);
  }, [guessInput]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUnlockClue = (id: number) => {
    if (!unlockedClues.includes(id)) {
      setUnlockedClues(prev => [...prev, id]);
      setScore(prev => Math.max(20, prev - 15));
    }
  };

  const handleUnlockAllClues = () => {
    setUnlockedClues([1, 2, 3, 4, 5, 6]);
    setScore(prev => Math.max(10, prev - 30));
  };

  const submitGuess = (elementToGuess: ChemicalElement) => {
    if (isGameOver || hasGivenUp) return;

    const diff = Math.abs(elementToGuess.atomicNumber - targetElement.atomicNumber);
    let direction: 'higher' | 'lower' | 'correct' = 'correct';
    let distanceText = '';

    if (elementToGuess.atomicNumber === targetElement.atomicNumber) {
      direction = 'correct';
      setIsGameOver(true);
      setStreak(prev => prev + 1);
      setUnlockedClues([1, 2, 3, 4, 5, 6]);
    } else {
      if (elementToGuess.atomicNumber < targetElement.atomicNumber) {
        direction = 'higher';
      } else {
        direction = 'lower';
      }

      if (diff <= 2) {
        distanceText = 'ცხელია! სულ 1-2 უჯრის დაშორებით ხართ!';
      } else if (diff <= 6) {
        distanceText = 'თბილია! საკმაოდ ახლოს ხართ!';
      } else {
        distanceText = 'ცივია — სხვა უბანში ეძებეთ.';
      }

      setScore(prev => Math.max(10, prev - 10));
    }

    setGuesses(prev => [
      { element: elementToGuess, direction, distanceText, diff },
      ...prev,
    ]);
    setGuessInput('');
    setShowSuggestions(false);
    setInputError('');
  };

  const handleGuessSubmit = () => {
    if (isGameOver || !guessInput.trim()) return;

    const q = guessInput.trim().toLowerCase();
    const guessedEl = ELEMENTS.find(
      e =>
        e.nameKa.toLowerCase() === q ||
        e.symbol.toLowerCase() === q ||
        e.nameEn.toLowerCase() === q ||
        String(e.atomicNumber) === q
    );

    if (!guessedEl) {
      setInputError(
        'ელემენტი ვერ მოიძებნა. გთხოვთ აირჩიოთ სიიდან ან შეიყვანოთ ქართული სახელი / სიმბოლო (მაგ. რკინა, წყალბადი, Fe, Na)...'
      );
      return;
    }

    submitGuess(guessedEl);
  };

  const handleGiveUp = () => {
    setHasGivenUp(true);
    setIsGameOver(true);
    setUnlockedClues([1, 2, 3, 4, 5, 6]);
    setStreak(0);
  };

  const handleRestart = (newMode?: GameMode) => {
    const activeM = newMode || gameMode;
    if (newMode) setGameMode(newMode);
    setTargetElement(pickRandomElement(activeM));
    setUnlockedClues([1, 2]);
    setGuesses([]);
    setIsGameOver(false);
    setHasGivenUp(false);
    setScore(100);
    setGuessInput('');
    setInputError('');
    setShowSuggestions(false);
  };

  // Popular quick pick elements
  const popularShortcuts = useMemo(() => {
    const symbols = ['H', 'C', 'O', 'Na', 'Al', 'Fe', 'Cu', 'Au', 'Hg'];
    return ELEMENTS.filter(e => symbols.includes(e.symbol));
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-7 shadow-2xl space-y-6 text-slate-100">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                ქიმიური დეტექტივი — „ვინ ვარ მე?“
              </h3>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-400" />
                <span>გამოცნობის თამაში</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              წაიკითხეთ მარტივი მინიშნებები და გამოიცანით საიდუმლო ქიმიური ელემენტი!
            </p>
          </div>
        </div>

        {/* Stats & Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => handleRestart('school')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                gameMode === 'school'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>სასკოლო ელემენტები (მარტივი)</span>
            </button>
            <button
              type="button"
              onClick={() => handleRestart('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                gameMode === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>ყველა ელემენტი</span>
            </button>
          </div>

          {/* Score & Streak */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-1.5">
              <span className="text-slate-400">ქულა:</span>
              <span className="font-bold text-amber-300 text-sm">{score}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-1.5">
              <span className="text-slate-400">სერია:</span>
              <span className="font-bold text-emerald-400 text-sm">{streak}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clues Section: 6 Clear, Friendly Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
              მინიშნებები საიდუმლო ელემენტზე:
            </h4>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {unlockedClues.length} / {clues.length} გახსნილია
            </span>
          </div>

          {!isGameOver && unlockedClues.length < clues.length && (
            <button
              type="button"
              onClick={handleUnlockAllClues}
              className="text-[11px] font-bold text-rose-300 hover:text-rose-200 underline decoration-rose-500/50 hover:decoration-rose-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Unlock className="w-3 h-3 text-rose-400" />
              <span>ყველა მინიშნების ჩვენება</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {clues.map((clue, idx) => {
            const isUnlocked = unlockedClues.includes(clue.id);

            // Icon by clue ID
            const renderIcon = () => {
              switch (clue.id) {
                case 1:
                  return <Globe className="w-4 h-4 text-sky-400" />;
                case 2:
                  return <Eye className="w-4 h-4 text-amber-400" />;
                case 3:
                  return <Flame className="w-4 h-4 text-rose-400" />;
                case 4:
                  return <Compass className="w-4 h-4 text-violet-400" />;
                case 5:
                  return <Scale className="w-4 h-4 text-teal-400" />;
                case 6:
                default:
                  return <Zap className="w-4 h-4 text-emerald-400" />;
              }
            };

            return (
              <div
                key={clue.id}
                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-slate-950/80 border-slate-700/80 shadow-md text-white'
                    : 'bg-slate-950/30 border-slate-800/60 text-slate-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300">
                      {renderIcon()}
                      <span>
                        მინიშნება {idx + 1}: {clue.tag}
                      </span>
                    </span>

                    {isUnlocked ? (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>გახსნილია</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        დახურულია
                      </span>
                    )}
                  </div>

                  <h5 className="text-xs font-semibold text-slate-400 mb-1.5">
                    {clue.title}
                  </h5>

                  {isUnlocked ? (
                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                      {clue.content}
                    </p>
                  ) : (
                    <div className="h-16 flex items-center justify-center bg-slate-900/30 rounded-xl border border-dashed border-slate-800/80 text-xs text-slate-500 italic">
                      მინიშნება ჯერ დაფარულია
                    </div>
                  )}
                </div>

                {!isUnlocked && !isGameOver && (
                  <button
                    type="button"
                    onClick={() => handleUnlockClue(clue.id)}
                    className="w-full mt-3 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                  >
                    <Unlock className="w-3.5 h-3.5 text-amber-400" />
                    <span>მინიშნების გახსნა (-15 ქულა)</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Input Box with Interactive Autocomplete Dropdown */}
      <div className="space-y-3 pt-2">
        {!isGameOver ? (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-rose-400" />
                <span>შეიყვანეთ თქვენი ვარაუდი:</span>
              </span>
              <span className="text-slate-500 font-normal">
                დაიწყეთ სახელის ან სიმბოლოს აკრეფა ავტომატური არჩევისთვის
              </span>
            </label>

            <div className="relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={guessInput}
                    onChange={e => {
                      setGuessInput(e.target.value);
                      setShowSuggestions(true);
                      setActiveSuggestionIdx(-1);
                      if (inputError) setInputError('');
                    }}
                    onFocus={() => {
                      if (guessInput.trim()) setShowSuggestions(true);
                    }}
                    onKeyDown={e => {
                      if (showSuggestions && autocompleteSuggestions.length > 0) {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setActiveSuggestionIdx(prev =>
                            prev < autocompleteSuggestions.length - 1 ? prev + 1 : 0
                          );
                          return;
                        }
                        if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          setActiveSuggestionIdx(prev =>
                            prev > 0 ? prev - 1 : autocompleteSuggestions.length - 1
                          );
                          return;
                        }
                        if (e.key === 'Enter' && activeSuggestionIdx >= 0) {
                          e.preventDefault();
                          submitGuess(autocompleteSuggestions[activeSuggestionIdx]);
                          return;
                        }
                      }
                      if (e.key === 'Enter') {
                        handleGuessSubmit();
                      }
                    }}
                    placeholder="ჩაწერეთ ელემენტის სახელი (მაგ. რკინა, წყალბადი) ან სიმბოლო (მაგ. Fe, O, Na)..."
                    className="w-full bg-slate-950 border-2 border-slate-750 focus:border-rose-500 rounded-2xl px-4 py-3.5 text-sm sm:text-base font-bold text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                  />
                  {guessInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setGuessInput('');
                        setShowSuggestions(false);
                      }}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-mono font-bold px-1.5 py-0.5 rounded hover:bg-slate-800"
                    >
                      გასუფთავება
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleGuessSubmit}
                  className="px-6 py-3.5 bg-gradient-to-r from-rose-500 via-rose-600 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-extrabold rounded-2xl transition-all shadow-lg shadow-rose-500/25 cursor-pointer text-sm shrink-0 flex items-center gap-2 active:scale-98"
                >
                  <span>შემოწმება</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Autocomplete Dropdown */}
              {showSuggestions && autocompleteSuggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-slate-950/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2 shadow-2xl space-y-1 max-h-64 overflow-y-auto custom-scrollbar animate-fadeIn"
                >
                  <div className="text-[10px] font-semibold text-slate-400 px-3 py-1 flex items-center justify-between border-b border-slate-800/80 mb-1">
                    <span>სავარაუდო ელემენტები:</span>
                    <span className="font-mono text-slate-500">
                      დააჭირეთ პირდაპირ ასარჩევად
                    </span>
                  </div>
                  {autocompleteSuggestions.map((item, idx) => {
                    const isSelected = idx === activeSuggestionIdx;
                    return (
                      <button
                        key={item.atomicNumber}
                        type="button"
                        onClick={() => submitGuess(item)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-rose-500/25 border border-rose-500/50 text-white'
                            : 'hover:bg-slate-850 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-black text-xs text-rose-300">
                            {item.symbol}
                          </span>
                          <div>
                            <div className="font-bold text-sm text-white">
                              {item.nameKa}
                            </div>
                            <div className="text-xs text-slate-400">
                              {item.nameEn} · Z = {item.atomicNumber}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                          {item.phase === 'gas'
                            ? 'აირი'
                            : item.phase === 'liquid'
                            ? 'სითხე'
                            : 'მყარი'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Error Message */}
            {inputError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{inputError}</span>
              </div>
            )}

            {/* Quick Pick Shortcuts */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px] mr-1">სწრაფი არჩევანი:</span>
              {popularShortcuts.map(el => (
                <button
                  key={el.atomicNumber}
                  type="button"
                  onClick={() => submitGuess(el)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer font-medium text-xs flex items-center gap-1"
                >
                  <span className="font-mono font-bold text-rose-300">{el.symbol}</span>
                  <span>{el.nameKa}</span>
                </button>
              ))}

              <button
                type="button"
                onClick={handleGiveUp}
                className="ml-auto text-xs text-slate-500 hover:text-amber-400 transition-colors cursor-pointer underline decoration-dotted"
              >
                ვერ ვხვდები, მაჩვენე პასუხი
              </button>
            </div>
          </div>
        ) : (
          /* Game Over / Success Card */
          <div
            className={`p-6 rounded-3xl border-2 text-center space-y-4 animate-fadeIn shadow-2xl ${
              hasGivenUp
                ? 'bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-950 border-amber-500/50'
                : 'bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border-emerald-500/60'
            }`}
          >
            <div
              className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
                hasGivenUp
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              {hasGivenUp ? (
                <HelpCircle className="w-10 h-10" />
              ) : (
                <CheckCircle2 className="w-10 h-10" />
              )}
            </div>

            <div>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {hasGivenUp ? 'საიდუმლო ელემენტი გახსნილია!' : 'გილოცავთ! თქვენ გამოიცანით!'}
              </h4>
              <p className="text-sm text-slate-300 mt-1">
                საიდუმლო ელემენტი იყო:{' '}
                <span className="font-bold text-white text-base">
                  {targetElement.nameKa} ({targetElement.symbol})
                </span>
                <span className="font-mono text-slate-400 ml-2">
                  Z = {targetElement.atomicNumber} · Ar ≈ {targetElement.atomicMass}
                </span>
              </p>
              {!hasGivenUp && (
                <p className="text-xs text-emerald-300 mt-1 font-mono">
                  დაგროვილი ქულა: {score} / 100 · მცდელობების რაოდენობა: {guesses.length}
                </p>
              )}
            </div>

            {/* Element Photo/Tile Info */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4 text-left">
              {targetElement.image?.url ? (
                <img
                  src={targetElement.image.url}
                  alt={targetElement.nameKa}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center text-white shrink-0">
                  <span className="text-[10px] font-mono text-slate-400">
                    {targetElement.atomicNumber}
                  </span>
                  <span className="text-lg font-black font-mono text-amber-300">
                    {targetElement.symbol}
                  </span>
                </div>
              )}
              <div className="space-y-0.5">
                <div className="font-bold text-sm text-white">
                  {targetElement.nameKa} ({targetElement.nameEn})
                </div>
                <div className="text-xs text-slate-400 leading-snug">
                  {SCHOOL_ELEMENT_RIDDLES[targetElement.atomicNumber]?.everydayHint ||
                    targetElement.summary}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleRestart()}
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg inline-flex items-center gap-2 active:scale-98"
              >
                <RefreshCw className="w-4 h-4" />
                <span>შემდეგი ელემენტი</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Guess History with Hot/Cold & Direction Guidance */}
      {guesses.length > 0 && (
        <div className="space-y-2.5 pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              თქვენი მცდელობების ისტორია ({guesses.length}):
            </h5>
            <span className="text-[11px] text-slate-500 font-mono">
              უკანასკნელი ვარაუდები თავშია
            </span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar">
            {guesses.map((g, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800/80 font-mono text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-750 flex items-center justify-center font-bold text-rose-300">
                    {g.element.symbol}
                  </span>
                  <span className="font-bold text-white text-sm">
                    {g.element.nameKa}
                  </span>
                  <span className="text-slate-400">({g.element.nameEn})</span>
                  <span className="text-slate-500 text-[11px]">
                    Z = {g.element.atomicNumber}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Direction */}
                  {g.direction === 'correct' ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>სწორია! გამოიცანით!</span>
                    </span>
                  ) : g.direction === 'higher' ? (
                    <span className="text-amber-400 font-bold flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                      <ArrowUp className="w-3.5 h-3.5" />
                      <span>ნომერი მეტია (Z &gt; {g.element.atomicNumber})</span>
                    </span>
                  ) : (
                    <span className="text-sky-400 font-bold flex items-center gap-1 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/30">
                      <ArrowDown className="w-3.5 h-3.5" />
                      <span>ნომერი ნაკლებია (Z &lt; {g.element.atomicNumber})</span>
                    </span>
                  )}

                  {/* Hot/Cold Indicator */}
                  {g.direction !== 'correct' && (
                    <span
                      className={`text-[11px] font-semibold px-2 py-1 rounded-lg ${
                        g.diff <= 2
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : g.diff <= 6
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {g.distanceText}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
