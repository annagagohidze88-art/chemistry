import type { ChemicalElement, ElementCategory, ElementPhase } from '../types/element';

export interface MultiSelectionState {
  selected: ChemicalElement[];
  message: string;
}

/** Toggle an element in the multi-element compound selection list. */
export function toggleElementInSelection(
  current: ChemicalElement[],
  el: ChemicalElement
): MultiSelectionState {
  const index = current.findIndex(e => e.atomicNumber === el.atomicNumber);
  if (index !== -1) {
    const updated = current.filter(e => e.atomicNumber !== el.atomicNumber);
    return {
      selected: updated,
      message: `${el.nameKa} (${el.symbol}) მოიხსნა არჩევიდან. დარჩა ${updated.length} ელემენტი.`,
    };
  }

  const updated = [...current, el];
  return {
    selected: updated,
    message: `${el.nameKa} (${el.symbol}) დაემატა ნაერთების მკვლევარში (#${updated.length}).`,
  };
}

export function countByCategory(elements: ChemicalElement[]): Record<ElementCategory, number> {
  return elements.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1;
    return acc;
  }, {} as Record<ElementCategory, number>);
}

/** Whether an element matches search text, category and phase filters. */
export function matchesFilters(
  el: ChemicalElement,
  query: string,
  category: ElementCategory | 'all',
  phase: ElementPhase | 'all'
): boolean {
  if (category !== 'all' && el.category !== category) return false;
  if (phase !== 'all' && el.phase !== phase) return false;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    el.nameKa.toLowerCase().includes(q) ||
    el.nameEn.toLowerCase().includes(q) ||
    el.symbol.toLowerCase() === q ||
    (q.length > 1 && el.symbol.toLowerCase().startsWith(q)) ||
    el.atomicNumber.toString() === q
  );
}
