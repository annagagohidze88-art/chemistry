import { useCallback, useEffect, useMemo, useState } from 'react';
import { Atom, Info, FlaskConical, LayoutGrid, TableProperties, Calculator, Gamepad2 } from 'lucide-react';
import { ELEMENTS } from './data/elements';
import type { ChemicalElement, ElementCategory, ElementPhase } from './types/element';
import { PeriodicTable } from './components/PeriodicTable';
import { ShortPeriodicTable } from './components/ShortPeriodicTable';
import { SearchBar } from './components/SearchBar';
import { Legend } from './components/Legend';
import { ElementDetails } from './components/ElementDetails';
import { CompoundExplorer } from './components/CompoundExplorer';
import { Instructions } from './components/Instructions';
import { AtomicLab3D } from './components/AtomicLab3D/AtomicLab3D';
import { ChemistryTools } from './components/Tools/ChemistryTools';
import { ChemistryGames } from './components/Games/ChemistryGames';
import { countByCategory, toggleElementInSelection } from './utils/selection';

type Mode = 'info' | 'compound';
type TableView = 'short' | 'long';
type ActiveTab = 'table' | 'atomic3d' | 'tools' | 'games';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('table');
  const [atomicLabElement, setAtomicLabElement] = useState<ChemicalElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<ElementCategory | 'all'>('all');
  const [filterPhase, setFilterPhase] = useState<ElementPhase | 'all'>('all');
  const [mode, setMode] = useState<Mode>('info');
  // Default to 'short' view exactly as requested by user screenshot!
  const [tableView, setTableView] = useState<TableView>('short');
  const [activeElement, setActiveElement] = useState<ChemicalElement | null>(null);
  const [selectedElements, setSelectedElements] = useState<ChemicalElement[]>([]);
  const [announcement, setAnnouncement] = useState('');

  const elementCounts = useMemo(() => countByCategory(ELEMENTS), []);

  const handleToggleElement = useCallback((el: ChemicalElement) => {
    setSelectedElements(prev => {
      const result = toggleElementInSelection(prev, el);
      setAnnouncement(result.message);
      return result.selected;
    });
  }, []);

  const handleElementClick = useCallback(
    (el: ChemicalElement) => {
      if (mode === 'info') {
        setActiveElement(el);
      } else {
        handleToggleElement(el);
      }
    },
    [mode, handleToggleElement]
  );

  const clearSelection = useCallback(() => {
    setSelectedElements([]);
    setAnnouncement('არჩევა სრულად გასუფთავდა.');
  }, []);

  const removeElement = useCallback((el: ChemicalElement) => {
    setSelectedElements(prev => prev.filter(e => e.atomicNumber !== el.atomicNumber));
    setAnnouncement(`${el.nameKa} ამოიშალა არჩევიდან.`);
  }, []);

  // Esc closes details panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveElement(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite" role="status">
        {announcement}
      </div>

      <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-md sticky top-0 z-30 shadow-md">
        <div className="max-w-[1480px] mx-auto px-3 md:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-amber-500 to-blue-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Atom className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-2">
                ქიმიურ ელემენტთა პერიოდული სისტემა
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 font-mono">
                  I–VIII ჯგუფები
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                სასკოლო მოკლეპერიოდიანი ფორმა • რომაული ჯგუფები (I–VIII) • რეალური ფოტოები • მრავალკომპონენტიანი ლაბორატორია
              </p>
            </div>
          </div>

          {/* Top Level Nav & Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Primary Tab Switcher */}
            <div
              role="tablist"
              aria-label="მთავარი ხედი"
              className="flex flex-wrap bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs shadow-inner gap-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'table'}
                onClick={() => setActiveTab('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all duration-150 ${
                  activeTab === 'table'
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <TableProperties className="w-3.5 h-3.5" aria-hidden="true" />
                <span>პერიოდული სისტემა</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'atomic3d'}
                onClick={() => setActiveTab('atomic3d')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all duration-150 ${
                  activeTab === 'atomic3d'
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Atom className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                <span>3D ატომური ლაბორატორია</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'tools'}
                onClick={() => setActiveTab('tools')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all duration-150 ${
                  activeTab === 'tools'
                    ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 shadow-md shadow-amber-500/25'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
                <span>ხელსაწყოები</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400/30 text-amber-200 font-mono">
                  4
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'games'}
                onClick={() => setActiveTab('games')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all duration-150 ${
                  activeTab === 'games'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/25'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5 text-pink-300" aria-hidden="true" />
                <span>თამაშები & ქვიზი</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-pink-400/30 text-pink-200 font-mono">
                  ახალი
                </span>
              </button>
            </div>

            {/* Table-specific Sub-controls (when activeTab is table) */}
            {activeTab === 'table' && (
              <>
                {/* Table View Switch (Short vs Long) */}
                <div
                  role="radiogroup"
                  aria-label="ცხრილის ხედი"
                  className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs shadow-inner"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={tableView === 'short'}
                    onClick={() => setTableView('short')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all duration-150 ${
                      tableView === 'short'
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                    title="მოკლეპერიოდიანი სასკოლო ცხრილი (რომაული I–VIII ზემოთ, რიგები და ტრიადები)"
                  >
                    <span>მოკლე (I–VIII)</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={tableView === 'long'}
                    onClick={() => setTableView('long')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all duration-150 ${
                      tableView === 'long'
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                    title="თანამედროვე 18-სვეტიანი IUPAC ცხრილი"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>18-სვეტიანი</span>
                  </button>
                </div>

                {/* Mode switch */}
                <div
                  role="radiogroup"
                  aria-label="დაჭერის რეჟიმი"
                  className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs shadow-inner"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={mode === 'info'}
                    onClick={() => setMode('info')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all duration-150 ${
                      mode === 'info'
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Info className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>ინფო & ფოტო</span>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={mode === 'compound'}
                    onClick={() => setMode('compound')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all duration-150 ${
                      mode === 'compound'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>შერევა ({selectedElements.length})</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1480px] mx-auto px-3 md:px-6 py-4 space-y-4 w-full flex-1">
        {activeTab === 'atomic3d' && (
          <AtomicLab3D
            key={atomicLabElement ? `atom-${atomicLabElement.atomicNumber}` : 'atom-default'}
            elements={ELEMENTS}
            initialElement={atomicLabElement}
            onOpenElementDetails={el => setActiveElement(el)}
          />
        )}

        {activeTab === 'tools' && <ChemistryTools />}

        {activeTab === 'games' && <ChemistryGames />}

        {activeTab === 'table' && (
          <>
            <Instructions />

            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedPhase={filterPhase}
              onPhaseChange={setFilterPhase}
            />

            <Legend
              selectedCategory={filterCategory}
              onSelectCategory={setFilterCategory}
              elementCounts={elementCounts}
            />

            <CompoundExplorer
              selectedElements={selectedElements}
              onClear={clearSelection}
              onRemoveElement={removeElement}
            />

            {mode === 'compound' && (
              <div className="flex items-center justify-between text-xs text-emerald-300 bg-emerald-500/15 border border-emerald-500/40 rounded-xl px-4 py-2.5 shadow-sm">
                <span>
                  🧪 <strong>შერევის რეჟიმი აქტიურია:</strong> დააწკაპუნეთ ელემენტებს ცხრილში მათ დასამატებლად ან მოსახსნელად (შეგიძლიათ აირჩიოთ 2, 3, 4 ან მეტი ელემენტი).
                </span>
                <span className="font-mono font-bold text-emerald-200">
                  არჩეულია: {selectedElements.length}
                </span>
              </div>
            )}

            {/* PERIODIC TABLE DISPLAY (SHORT VIEW AS DEFAULT, LONG VIEW TOGGLEABLE) */}
            <section
              aria-label="პერიოდული სისტემა"
              className="bg-slate-900/60 border border-slate-750/80 rounded-2xl p-2.5 md:p-3.5 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 px-1">
                <span className="font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                  <span>📌</span>
                  <span>
                    {tableView === 'short'
                      ? 'მოკლეპერიოდიანი ფორმა: ჯგუფები რომაულად ზემოთ (I–VIII), პერიოდები 1–7 მარცხნივ, ტრიადები VIII ჯგუფში'
                      : '18-სვეტიანი IUPAC ფორმა: პერიოდები I–VII მარცხნივ, ჯგუფები 1–18 ზემოთ'}
                  </span>
                </span>
                <span className="md:hidden">← ცხრილი გადაასქროლეთ ჰორიზონტალურად →</span>
              </div>

              {tableView === 'short' ? (
                <ShortPeriodicTable
                  elements={ELEMENTS}
                  selectedElements={selectedElements}
                  activeElement={activeElement}
                  filterCategory={filterCategory}
                  filterPhase={filterPhase}
                  searchQuery={searchQuery}
                  onElementClick={handleElementClick}
                />
              ) : (
                <PeriodicTable
                  elements={ELEMENTS}
                  selectedElements={selectedElements}
                  activeElement={activeElement}
                  filterCategory={filterCategory}
                  filterPhase={filterPhase}
                  searchQuery={searchQuery}
                  onElementClick={handleElementClick}
                />
              )}
            </section>
          </>
        )}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/80 mt-6">
        <div className="max-w-[1480px] mx-auto px-3 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            საგანმანათლებლო რესურსი: IUPAC სტანდარტები, NIST, PubChem, Wikimedia Commons.
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            ჯგუფები I–VIII ზემოთ • რიგები 1–7 • 118 ქიმიური ელემენტი
          </div>
        </div>
      </footer>

      <ElementDetails
        element={activeElement}
        onClose={() => setActiveElement(null)}
        onToggleElement={handleToggleElement}
        isSelected={
          Boolean(activeElement && selectedElements.some(e => e.atomicNumber === activeElement.atomicNumber))
        }
        onOpenAtomicLab={el => {
          setAtomicLabElement(el);
          setActiveTab('atomic3d');
        }}
      />
    </div>
  );
}

export default App;
