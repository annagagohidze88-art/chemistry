// Rational number arithmetic for exact matrix operations
class Fraction {
  num: bigint;
  den: bigint;

  constructor(num: bigint | number, den: bigint | number = 1n) {
    let n = BigInt(num);
    let d = BigInt(den);
    if (d === 0n) throw new Error('Division by zero');
    if (d < 0n) {
      n = -n;
      d = -d;
    }
    const g = Fraction.gcd(n < 0n ? -n : n, d);
    this.num = n / g;
    this.den = d / g;
  }

  static gcd(a: bigint, b: bigint): bigint {
    while (b !== 0n) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  static lcm(a: bigint, b: bigint): bigint {
    if (a === 0n || b === 0n) return 0n;
    return (a * b) / Fraction.gcd(a, b);
  }

  add(other: Fraction): Fraction {
    return new Fraction(this.num * other.den + other.num * this.den, this.den * other.den);
  }

  sub(other: Fraction): Fraction {
    return new Fraction(this.num * other.den - other.num * this.den, this.den * other.den);
  }

  mul(other: Fraction): Fraction {
    return new Fraction(this.num * other.num, this.den * other.den);
  }

  div(other: Fraction): Fraction {
    return new Fraction(this.num * other.den, this.den * other.num);
  }

  isZero(): boolean {
    return this.num === 0n;
  }
}

export interface BalancedMolecule {
  coefficient: number;
  formula: string;
}

export interface ElementBalanceCheck {
  symbol: string;
  leftCount: number;
  rightCount: number;
  isBalanced: boolean;
}

export interface BalanceResult {
  balancedString: string;
  reactants: BalancedMolecule[];
  products: BalancedMolecule[];
  verification: ElementBalanceCheck[];
}

/**
 * Parses a single formula string into element counts
 */
function parseMolecule(formula: string): Map<string, number> {
  const counts = new Map<string, number>();
  // Remove state indicators e.g. (s), (l), (g), (aq), and whitespace
  const clean = formula.replace(/\((s|l|g|aq)\)/gi, '').replace(/\s+/g, '');
  let i = 0;

  function parseGroup(): Map<string, number> {
    const groupCounts = new Map<string, number>();

    while (i < clean.length) {
      const ch = clean[i];
      if (ch === '(' || ch === '[' || ch === '{') {
        const close = ch === '(' ? ')' : ch === '[' ? ']' : '}';
        i++;
        const inner = parseGroup();
        if (i < clean.length && clean[i] === close) i++;

        let numStr = '';
        while (i < clean.length && /[0-9]/.test(clean[i])) {
          numStr += clean[i];
          i++;
        }
        const mult = numStr ? parseInt(numStr, 10) : 1;
        for (const [sym, count] of inner.entries()) {
          groupCounts.set(sym, (groupCounts.get(sym) || 0) + count * mult);
        }
      } else if (ch === ')' || ch === ']' || ch === '}') {
        break;
      } else if (/[A-Z]/.test(ch)) {
        let sym = ch;
        i++;
        if (i < clean.length && /[a-z]/.test(clean[i])) {
          sym += clean[i];
          i++;
        }
        let numStr = '';
        while (i < clean.length && /[0-9]/.test(clean[i])) {
          numStr += clean[i];
          i++;
        }
        const mult = numStr ? parseInt(numStr, 10) : 1;
        groupCounts.set(sym, (groupCounts.get(sym) || 0) + mult);
      } else {
        i++;
      }
    }
    return groupCounts;
  }

  const res = parseGroup();
  for (const [s, c] of res.entries()) {
    counts.set(s, c);
  }
  return counts;
}

/**
 * Balances a chemical equation using exact rational Gauss-Jordan elimination
 */
export function balanceEquation(equationStr: string): BalanceResult | { error: string } {
  const arrowMatch = equationStr.split(/->|=>|→|=/);
  if (arrowMatch.length !== 2) {
    return { error: 'გთხოვთ შეიყვანოთ განტოლება ისრით (-> ან =), მაგ: H2 + O2 -> H2O' };
  }

  const rawReactants = arrowMatch[0].split('+').map(s => s.trim()).filter(Boolean);
  const rawProducts = arrowMatch[1].split('+').map(s => s.trim()).filter(Boolean);

  if (rawReactants.length === 0 || rawProducts.length === 0) {
    return { error: 'განტოლებას უნდა ჰქონდეს როგორც რეაგენტები, ისე პროდუქტები.' };
  }

  // Parse all molecules
  const reactantMaps = rawReactants.map(parseMolecule);
  const productMaps = rawProducts.map(parseMolecule);

  // Collect all unique elements
  const allElements = new Set<string>();
  reactantMaps.forEach(m => m.forEach((_, s) => allElements.add(s)));
  productMaps.forEach(m => m.forEach((_, s) => allElements.add(s)));

  const elementList = Array.from(allElements);
  const numElements = elementList.length;
  const numMolecules = rawReactants.length + rawProducts.length;

  if (numElements === 0) {
    return { error: 'ქიმიური ელემენტები ვერ მოიძებნა.' };
  }

  // Matrix: rows = elements, cols = molecules
  // Coefficients for reactants are +count, for products are -count
  const matrix: Fraction[][] = [];
  for (let r = 0; r < numElements; r++) {
    const el = elementList[r];
    const row: Fraction[] = [];

    // Reactants
    for (let c = 0; c < rawReactants.length; c++) {
      row.push(new Fraction(reactantMaps[c].get(el) || 0));
    }
    // Products
    for (let c = 0; c < rawProducts.length; c++) {
      row.push(new Fraction(-(productMaps[c].get(el) || 0)));
    }
    matrix.push(row);
  }

  // Gauss-Jordan elimination to Reduced Row Echelon Form (RREF)
  let lead = 0;
  for (let r = 0; r < numElements; r++) {
    if (lead >= numMolecules) break;
    let i = r;
    while (matrix[i][lead].isZero()) {
      i++;
      if (i === numElements) {
        i = r;
        lead++;
        if (lead === numMolecules) break;
      }
    }
    if (lead >= numMolecules) break;

    // Swap rows i and r
    const temp = matrix[i];
    matrix[i] = matrix[r];
    matrix[r] = temp;

    // Normalize row r
    const pivot = matrix[r][lead];
    for (let c = 0; c < numMolecules; c++) {
      matrix[r][c] = matrix[r][c].div(pivot);
    }

    // Eliminate other rows
    for (let rowIdx = 0; rowIdx < numElements; rowIdx++) {
      if (rowIdx !== r) {
        const factor = matrix[rowIdx][lead];
        if (!factor.isZero()) {
          for (let c = 0; c < numMolecules; c++) {
            matrix[rowIdx][c] = matrix[rowIdx][c].sub(factor.mul(matrix[r][c]));
          }
        }
      }
    }
    lead++;
  }

  // Solve null space assuming last variable = 1
  // If multiple free variables, fallback to last variable = 1
  const freeCol = numMolecules - 1;
  const coeffs: Fraction[] = new Array(numMolecules).fill(null).map(() => new Fraction(0));
  coeffs[freeCol] = new Fraction(1);

  for (let r = 0; r < numElements; r++) {
    // Find leading 1 in row r
    let pivotCol = -1;
    for (let c = 0; c < numMolecules; c++) {
      if (!matrix[r][c].isZero()) {
        pivotCol = c;
        break;
      }
    }
    if (pivotCol !== -1 && pivotCol < freeCol) {
      coeffs[pivotCol] = new Fraction(0).sub(matrix[r][freeCol]);
    }
  }

  // Ensure all coefficients are positive
  const anyNegative = coeffs.some(f => f.num < 0n);
  if (anyNegative) {
    for (let i = 0; i < coeffs.length; i++) {
      coeffs[i] = new Fraction(-coeffs[i].num, coeffs[i].den);
    }
  }

  // Check if any coefficient is zero or still negative
  if (coeffs.some(f => f.num <= 0n)) {
    return { error: 'განტოლების გათანაბრება ვერ მოხერხდა. გადაამოწმეთ ფორმულების სისწორე.' };
  }

  // Clear denominators using LCM
  let commonDen = 1n;
  coeffs.forEach(f => {
    commonDen = Fraction.lcm(commonDen, f.den);
  });

  const intCoeffs = coeffs.map(f => (f.num * commonDen) / f.den);

  // Divide by GCD
  let commonGcd = intCoeffs[0];
  for (let i = 1; i < intCoeffs.length; i++) {
    commonGcd = Fraction.gcd(commonGcd, intCoeffs[i]);
  }
  const finalCoeffs = intCoeffs.map(c => Number(c / commonGcd));

  // Build result
  const reactants: BalancedMolecule[] = [];
  for (let i = 0; i < rawReactants.length; i++) {
    reactants.push({
      coefficient: finalCoeffs[i],
      formula: rawReactants[i],
    });
  }

  const products: BalancedMolecule[] = [];
  for (let i = 0; i < rawProducts.length; i++) {
    products.push({
      coefficient: finalCoeffs[rawReactants.length + i],
      formula: rawProducts[i],
    });
  }

  // Verification
  const verification: ElementBalanceCheck[] = [];
  elementList.forEach(el => {
    let leftCount = 0;
    reactants.forEach((mol, idx) => {
      leftCount += mol.coefficient * (reactantMaps[idx].get(el) || 0);
    });

    let rightCount = 0;
    products.forEach((mol, idx) => {
      rightCount += mol.coefficient * (productMaps[idx].get(el) || 0);
    });

    verification.push({
      symbol: el,
      leftCount,
      rightCount,
      isBalanced: leftCount === rightCount,
    });
  });

  const formatSide = (mols: BalancedMolecule[]) =>
    mols.map(m => (m.coefficient === 1 ? m.formula : `${m.coefficient}${m.formula}`)).join(' + ');

  const balancedString = `${formatSide(reactants)} → ${formatSide(products)}`;

  return {
    balancedString,
    reactants,
    products,
    verification,
  };
}
