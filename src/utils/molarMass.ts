import { ELEMENTS } from '../data/elements';
import type { ChemicalElement } from '../types/element';

export interface ElementMassBreakdown {
  element: ChemicalElement;
  count: number;
  atomicMass: number;
  totalMass: number;
  percentage: number;
}

export interface MolarMassResult {
  formula: string;
  formattedFormula: string;
  totalMass: number;
  elements: ElementMassBreakdown[];
  arithmeticSteps: string;
  hydrateWaterMoles?: number;
  hydrateWaterMass?: number;
  hydrateWaterPercentage?: number;
}

// Map element symbols to their element object and numeric atomic mass
const elementBySymbol = new Map<string, { el: ChemicalElement; mass: number }>();
ELEMENTS.forEach(el => {
  const mass = parseFloat(el.atomicMass) || 0;
  elementBySymbol.set(el.symbol, { el, mass });
});

// Normalize formula string (normalize unicode subscripts, spaces, hydrate dots)
export function normalizeFormula(formula: string): string {
  const subMap: Record<string, string> = {
    '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
    '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  };
  let normalized = formula.replace(/[₀-₉]/g, ch => subMap[ch] || ch);
  // Replace hydrate separators with a standard dot
  normalized = normalized.replace(/[·⋅•*]/g, '.');
  return normalized.trim();
}

/**
 * Parses a single chemical formula chunk (without hydrate dot) into a map of element counts
 */
function parseFormulaChunk(chunk: string, multiplier = 1): Map<string, number> {
  const counts = new Map<string, number>();
  let i = 0;

  function parseSubgroup(): Map<string, number> {
    const groupCounts = new Map<string, number>();

    while (i < chunk.length) {
      const ch = chunk[i];

      // Opening bracket
      if (ch === '(' || ch === '[' || ch === '{') {
        const closeChar = ch === '(' ? ')' : ch === '[' ? ']' : '}';
        i++; // skip open
        const innerCounts = parseSubgroup();
        // Skip matching closing bracket
        if (i < chunk.length && chunk[i] === closeChar) {
          i++;
        }
        // Read optional count after group
        let numStr = '';
        while (i < chunk.length && /[0-9]/.test(chunk[i])) {
          numStr += chunk[i];
          i++;
        }
        const groupMultiplier = numStr.length > 0 ? parseInt(numStr, 10) : 1;

        for (const [sym, cnt] of innerCounts.entries()) {
          groupCounts.set(sym, (groupCounts.get(sym) || 0) + cnt * groupMultiplier);
        }
      } else if (ch === ')' || ch === ']' || ch === '}') {
        // Return to outer group
        break;
      } else if (/[A-Z]/.test(ch)) {
        // Element symbol start
        let sym = ch;
        i++;
        if (i < chunk.length && /[a-z]/.test(chunk[i])) {
          sym += chunk[i];
          i++;
        }

        // Read optional count
        let numStr = '';
        while (i < chunk.length && /[0-9]/.test(chunk[i])) {
          numStr += chunk[i];
          i++;
        }
        const elementCount = numStr.length > 0 ? parseInt(numStr, 10) : 1;
        groupCounts.set(sym, (groupCounts.get(sym) || 0) + elementCount);
      } else {
        // Skip unexpected characters (e.g. whitespace or charge symbols)
        i++;
      }
    }

    return groupCounts;
  }

  const rawCounts = parseSubgroup();
  for (const [sym, count] of rawCounts.entries()) {
    counts.set(sym, count * multiplier);
  }
  return counts;
}

/**
 * Computes molar mass and breakdown for a chemical formula (including hydrates like CuSO4.5H2O)
 */
export function calculateMolarMass(rawFormula: string): MolarMassResult | { error: string } {
  const formula = normalizeFormula(rawFormula);
  if (!formula) return { error: 'გთხოვთ შეიყვანოთ ქიმიური ფორმულა.' };

  // Check for hydrate dot (e.g., CuSO4.5H2O)
  const parts = formula.split('.');
  const mainPart = parts[0];
  let hydratePart = parts.slice(1).join('.');

  const totalCounts = new Map<string, number>();

  // Parse main part
  const mainCounts = parseFormulaChunk(mainPart, 1);
  for (const [sym, count] of mainCounts.entries()) {
    totalCounts.set(sym, (totalCounts.get(sym) || 0) + count);
  }

  // Parse hydrate part if present (e.g., 5H2O)
  let hydrateWaterMoles = 0;
  if (hydratePart) {
    hydratePart = hydratePart.trim();
    let numStr = '';
    let j = 0;
    while (j < hydratePart.length && /[0-9]/.test(hydratePart[j])) {
      numStr += hydratePart[j];
      j++;
    }
    const mult = numStr.length > 0 ? parseInt(numStr, 10) : 1;
    hydrateWaterMoles = mult;
    const subFormula = hydratePart.slice(j).trim() || 'H2O';
    const hydCounts = parseFormulaChunk(subFormula, mult);
    for (const [sym, count] of hydCounts.entries()) {
      totalCounts.set(sym, (totalCounts.get(sym) || 0) + count);
    }
  }

  // Validate elements and calculate mass
  let totalMass = 0;
  const elementsBreakdown: ElementMassBreakdown[] = [];
  const arithmeticParts: string[] = [];

  for (const [sym, count] of totalCounts.entries()) {
    const entry = elementBySymbol.get(sym);
    if (!entry) {
      return { error: `ელემენტი სიმბოლოთი "${sym}" არ მოიძებნა პერიოდულ სისტემაში.` };
    }
    const atomicMass = entry.mass;
    const subtotal = atomicMass * count;
    totalMass += subtotal;

    elementsBreakdown.push({
      element: entry.el,
      count,
      atomicMass,
      totalMass: subtotal,
      percentage: 0, // will compute after totalMass is final
    });

    if (count > 1) {
      arithmeticParts.push(`${count} × ${entry.el.symbol}(${atomicMass.toFixed(2)})`);
    } else {
      arithmeticParts.push(`${entry.el.symbol}(${atomicMass.toFixed(2)})`);
    }
  }

  if (totalMass === 0) {
    return { error: 'ფორმულის გარჩევა ვერ მოხერხდა. გადაამოწმეთ სიმბოლოები.' };
  }

  // Calculate percentages
  elementsBreakdown.forEach(item => {
    item.percentage = (item.totalMass / totalMass) * 100;
  });

  // Sort elements by atomic number for clean display
  elementsBreakdown.sort((a, b) => a.element.atomicNumber - b.element.atomicNumber);

  // If hydrate, compute water mass percentage
  let hydrateWaterMass: number | undefined;
  let hydrateWaterPercentage: number | undefined;
  if (hydrateWaterMoles > 0) {
    const waterMolarMass = (elementBySymbol.get('H')?.mass || 1.008) * 2 + (elementBySymbol.get('O')?.mass || 15.999);
    hydrateWaterMass = waterMolarMass * hydrateWaterMoles;
    hydrateWaterPercentage = (hydrateWaterMass / totalMass) * 100;
  }

  const arithmeticSteps = arithmeticParts.join(' + ') + ` = ${totalMass.toFixed(3)} გ/მოლი`;

  return {
    formula: rawFormula,
    formattedFormula: formula.replace('.', ' · '),
    totalMass,
    elements: elementsBreakdown,
    arithmeticSteps,
    hydrateWaterMoles: hydrateWaterMoles > 0 ? hydrateWaterMoles : undefined,
    hydrateWaterMass,
    hydrateWaterPercentage,
  };
}
