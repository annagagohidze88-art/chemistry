import type { StabilityVerdict, AtomPreset, AtomChallenge } from '../types/atomic3d';

// Standard most abundant / most stable neutron counts for elements Z = 1 to 118
export const STANDARD_NEUTRONS: Record<number, number> = {
  1: 0, 2: 2, 3: 4, 4: 5, 5: 6, 6: 6, 7: 7, 8: 8, 9: 10, 10: 10,
  11: 12, 12: 12, 13: 14, 14: 14, 15: 16, 16: 16, 17: 18, 18: 22, 19: 20, 20: 20,
  21: 24, 22: 26, 23: 28, 24: 28, 25: 30, 26: 30, 27: 32, 28: 31, 29: 35, 30: 35,
  31: 39, 32: 41, 33: 42, 34: 45, 35: 45, 36: 48, 37: 48, 38: 50, 39: 50, 40: 51,
  41: 52, 42: 54, 43: 55, 44: 58, 45: 58, 46: 60, 47: 61, 48: 64, 49: 66, 50: 69,
  51: 71, 52: 76, 53: 74, 54: 77, 55: 78, 56: 81, 57: 82, 58: 82, 59: 82, 60: 84,
  61: 84, 62: 90, 63: 89, 64: 93, 65: 94, 66: 97, 67: 98, 68: 99, 69: 100, 70: 103,
  71: 104, 72: 106, 73: 108, 74: 110, 75: 111, 76: 114, 77: 115, 78: 117, 79: 118, 80: 121,
  81: 123, 82: 126, 83: 126, 84: 125, 85: 125, 86: 136, 87: 136, 88: 138, 89: 138, 90: 142,
  91: 140, 92: 146, 93: 144, 94: 150, 95: 148, 96: 151, 97: 150, 98: 153, 99: 153, 100: 157,
  101: 157, 102: 157, 103: 159, 104: 163, 105: 165, 106: 168, 107: 167, 108: 173, 109: 174, 110: 177,
  111: 177, 112: 177, 113: 175, 114: 175, 115: 175, 116: 177, 117: 177, 118: 176
};

// Known stable isotopes by Z -> Set of stable neutron counts
const STABLE_ISOTOPES: Record<number, number[]> = {
  1: [0, 1], // 1H, 2H (deuterium)
  2: [1, 2], // 3He, 4He
  3: [3, 4], // 6Li, 7Li
  4: [5],    // 9Be
  5: [5, 6], // 10B, 11B
  6: [6, 7], // 12C, 13C
  7: [7, 8], // 14N, 15N
  8: [8, 9, 10], // 16O, 17O, 18O
  9: [10],   // 19F
  10: [10, 11, 12], // 20Ne, 21Ne, 22Ne
  11: [12],  // 23Na
  12: [12, 13, 14], // 24Mg, 25Mg, 26Mg
  13: [14],  // 27Al
  14: [14, 15, 16], // 28Si, 29Si, 30Si
  15: [16],  // 31P
  16: [16, 17, 18, 20], // 32S, 33S, 34S, 36S
  17: [18, 20], // 35Cl, 37Cl
  18: [18, 20, 22], // 36Ar, 38Ar, 40Ar
  19: [20, 22], // 39K, 41K
  20: [20, 22, 23, 24, 26, 28], // 40Ca, 42Ca, 43Ca, 44Ca, 46Ca, 48Ca
  21: [24],
  22: [24, 25, 26, 27, 28],
  23: [28],
  24: [26, 28, 29, 30],
  25: [30],
  26: [28, 30, 31, 32], // 54Fe, 56Fe, 57Fe, 58Fe
  27: [32],
  28: [30, 32, 33, 34, 36],
  29: [34, 36],
  30: [34, 36, 37, 38, 40],
  31: [38, 40],
  32: [38, 40, 41, 42],
  33: [42],
  34: [40, 42, 43, 44, 46],
  35: [44, 46],
  36: [42, 44, 46, 47, 48, 50],
  37: [48],
  38: [46, 48, 49, 50],
  39: [50],
  40: [50, 51, 52, 54],
  41: [52],
  42: [50, 52, 53, 54, 55, 56, 58],
  43: [], // Tc has no stable isotopes
  44: [52, 54, 55, 56, 57, 58, 60],
  45: [58],
  46: [56, 58, 59, 60, 62, 64],
  47: [60, 62],
  48: [58, 60, 62, 63, 64, 66],
  49: [66],
  50: [62, 64, 65, 66, 67, 68, 69, 70, 72, 74],
  51: [70, 72],
  52: [68, 70, 71, 72, 73, 74],
  53: [74],
  54: [70, 72, 74, 75, 76, 78, 80],
  55: [78],
  56: [74, 76, 78, 79, 80, 81, 82],
  57: [82],
  58: [78, 80, 82, 84],
  59: [82],
  60: [80, 82, 83, 85, 86],
  61: [], // Pm has no stable isotopes
  62: [82, 86, 88, 90, 92],
  63: [88],
  64: [88, 90, 92, 93, 94, 96],
  65: [94],
  66: [90, 92, 94, 96, 97, 98],
  67: [98],
  68: [94, 96, 98, 99, 100, 102],
  69: [100],
  70: [98, 100, 101, 102, 103, 104, 106],
  71: [104],
  72: [102, 104, 105, 106, 107, 108],
  73: [108],
  74: [106, 108, 109, 110, 112],
  75: [110],
  76: [108, 110, 111, 112, 113, 114, 116],
  77: [114, 116],
  78: [114, 116, 117, 118, 120],
  79: [118], // 197Au
  80: [116, 118, 119, 120, 121, 122, 124],
  81: [122, 124],
  82: [122, 124, 125, 126] // 208Pb is doubly magic
};

/**
 * Calculates theoretical optimal neutrons along the Valley of Stability
 * Formula: N_ideal ≈ Z + 0.007 * Z^(5/3) (or empirical curve)
 */
export function getIdealNeutrons(Z: number): number {
  if (Z <= 0) return 0;
  if (Z <= 20) return Z; // Light elements have N ≈ Z
  return Math.round(Z + 0.0068 * Math.pow(Z, 1.667));
}

/**
 * Evaluates the nuclear stability and decay mode for any given proton and neutron counts.
 */
export function getStabilityVerdict(protons: number, neutrons: number): StabilityVerdict {
  // Case Z = 0: Free neutron
  if (protons === 0) {
    if (neutrons === 0) {
      return {
        isStable: false,
        statusKa: 'ცარიელი სივრცე',
        badgeClass: 'bg-slate-700 text-slate-300 border-slate-600',
        decayMode: 'stable',
        decayDescriptionKa: 'ნუკლონები არ არის დამატებული.',
        valleyDistance: 0,
        idealNeutrons: 0,
      };
    }
    return {
      isStable: false,
      statusKa: 'არასტაბილური (თავისუფალი ნეიტრონი)',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      decayMode: 'beta_minus',
      decayDescriptionKa: 'თავისუფალი ნეიტრონი არასტაბილურია და იშლება პროტონად, ელექტრონად და ანტინეიტრინოდ (~14.7 წუთში).',
      valleyDistance: neutrons,
      idealNeutrons: 0,
      halfLifeHintKa: 'T½ ≈ 14.7 წუთი',
    };
  }

  // Case Z > 0, N = 0
  if (neutrons === 0) {
    if (protons === 1) {
      // 1H (protium) is completely stable!
      return {
        isStable: true,
        statusKa: 'სტაბილური ბირთვი (პროტიუმი)',
        badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        decayMode: 'stable',
        decayDescriptionKa: 'წყალბად-1 (პროტიუმი) არის აბსოლუტურად სტაბილური ბირთვი, რომელიც შედგება ერთი პროტონისგან.',
        valleyDistance: 0,
        idealNeutrons: 0,
      };
    }
    // Diproton (2He with 0 neutrons) or more is unbound
    return {
      isStable: false,
      statusKa: 'უკიდურესად არასტაბილური (დიპროტონი)',
      badgeClass: 'bg-red-500/20 text-red-300 border-red-500/40',
      decayMode: 'proton_emission',
      decayDescriptionKa: 'ნეიტრონების გარეშე კულონის განზიდვა მყისიერად შლის ბირთვს (პროტონული გამოსხივება).',
      valleyDistance: protons,
      idealNeutrons: getIdealNeutrons(protons),
    };
  }

  const idealN = getIdealNeutrons(protons);
  const diff = neutrons - idealN;

  // Check verified stable isotopes table
  const knownStable = STABLE_ISOTOPES[protons];
  if (knownStable && knownStable.includes(neutrons)) {
    return {
      isStable: true,
      statusKa: 'სტაბილური ბირთვი',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      decayMode: 'stable',
      decayDescriptionKa: 'ბირთვული მიზიდვის ძალები და კულონის განზიდვა იდეალურ წონასწორობაშია. ბირთვი არ იშლება.',
      valleyDistance: Math.abs(diff),
      idealNeutrons: idealN,
    };
  }

  // Heavy radioactive elements (Z > 82: Bismuth and beyond)
  if (protons > 82) {
    // Primordial long-lived isotopes
    if (protons === 83 && neutrons === 126) { // 209Bi
      return {
        isStable: false,
        statusKa: 'კვაზისტაბილური (ბისმუტ-209)',
        badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        decayMode: 'alpha',
        decayDescriptionKa: 'ბისმუტ-209 ფორმალურად ალფა-რადიოაქტიურია, თუმცა მისი ნახევრადდაშლის პერიოდი სამყაროს ასაკზე მილიარდჯერ მეტია.',
        valleyDistance: Math.abs(diff),
        idealNeutrons: idealN,
        halfLifeHintKa: 'T½ ≈ 2.01 × 10¹⁹ წელი',
      };
    }

    if (protons === 90 && neutrons === 142) { // 232Th
      return {
        isStable: false,
        statusKa: 'რადიოაქტიური (თორიუმ-232, ალფა-დაშლა)',
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        decayMode: 'alpha',
        decayDescriptionKa: 'პირველყოფილი რადიონუკლიდი; ასხივებს ალფა-ნაწილაკს და გარდაიქმნება რადიუმად.',
        valleyDistance: Math.abs(diff),
        idealNeutrons: idealN,
        halfLifeHintKa: 'T½ ≈ 14.05 მილიარდი წელი',
      };
    }

    if (protons === 92 && (neutrons === 143 || neutrons === 146)) { // 235U, 238U
      return {
        isStable: false,
        statusKa: `რადიოაქტიური (ურან-${protons + neutrons})`,
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        decayMode: neutrons === 143 ? 'fission' : 'alpha',
        decayDescriptionKa: neutrons === 143
          ? 'დაშლადი იზოტოპი ²³⁵U — ნეიტრონის ჩაჭერით განიცდის ბირთვულ დაყოფას (ატომური ენერგეტიკის საწვავი).'
          : 'ალფა-აქტიური იზოტოპი ²³⁸U — ურანის ბუნებრივი მადნის 99.3%-ს შეადგენს.',
        valleyDistance: Math.abs(diff),
        idealNeutrons: idealN,
        halfLifeHintKa: neutrons === 143 ? 'T½ ≈ 704 მილიონი წელი' : 'T½ ≈ 4.47 მილიარდი წელი',
      };
    }

    // Superheavy elements Z >= 104
    if (protons >= 104) {
      return {
        isStable: false,
        statusKa: 'სინთეზური სუპერმძიმე ბირთვი (სპონტანური დაყოფა / α)',
        badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        decayMode: 'fission',
        decayDescriptionKa: 'კოლოსალური კულონის განზიდვის გამო ბირთვი მყისიერად განიცდის სპონტანურ გაყოფას ან ალფა-დაშლას (წამების ან მილიწამების მასშტაბში).',
        valleyDistance: Math.abs(diff),
        idealNeutrons: idealN,
        halfLifeHintKa: 'T½ < რამდენიმე წამი / მილიწამი',
      };
    }

    // General Z > 82 decay
    return {
      isStable: false,
      statusKa: 'არასტაბილური (მძიმე ბირთვი, ალფა-დაშლა)',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      decayMode: 'alpha',
      decayDescriptionKa: 'ტყვიაზე (Z=82) მძიმე ყველა ბირთვი არასტაბილურია. ბირთვი ასხივებს ჰელიუმის ბირთვს (⁴₂He, ალფა-ნაწილაკი).',
      valleyDistance: Math.abs(diff),
      idealNeutrons: idealN,
    };
  }

  // Famous isotopes for Z <= 82
  if (protons === 1 && neutrons === 2) { // 3H tritium
    return {
      isStable: false,
      statusKa: 'რადიოაქტიური (ტრიტიუმი, β⁻ დაშლა)',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      decayMode: 'beta_minus',
      decayDescriptionKa: 'ტრიტიუმში ნეიტრონი გარდაიქმნება პროტონად ელექტრონის გამოსხივებით და გადადის ჰელიუმ-3-ში.',
      valleyDistance: 1,
      idealNeutrons: 1,
      halfLifeHintKa: 'T½ ≈ 12.32 წელი',
    };
  }

  if (protons === 6 && neutrons === 8) { // 14C
    return {
      isStable: false,
      statusKa: 'რადიოაქტიური (ნახშირბად-14, β⁻ დაშლა)',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      decayMode: 'beta_minus',
      decayDescriptionKa: 'რადიონახშირბადი — გამოიყენება არქეოლოგიურ დათარიღებაში. ნეიტრონის გარდაქმნით β⁻ დაშლის შედეგად გარდაიქმნება აზოტ-14-ად.',
      valleyDistance: 2,
      idealNeutrons: 6,
      halfLifeHintKa: 'T½ ≈ 5,730 წელი',
    };
  }

  if (protons === 19 && neutrons === 21) { // 40K
    return {
      isStable: false,
      statusKa: 'რადიოაქტიური (კალიუმ-40, ბუნებრივი ფონი)',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      decayMode: 'beta_minus',
      decayDescriptionKa: 'ბუნებრივი რადიონუკლიდი ადამიანის სხეულსა და საკვებში (განიცდის β⁻ დაშლას და ელექტრონულ ჩაჭერას).',
      valleyDistance: 1,
      idealNeutrons: 20,
      halfLifeHintKa: 'T½ ≈ 1.25 მილიარდი წელი',
    };
  }

  // Check neutron excess vs deficit
  if (diff > 0) {
    // Neutron rich -> beta minus
    if (diff > 12) {
      return {
        isStable: false,
        statusKa: 'უკიდურესად არასტაბილური (ნეიტრონების გამოსხივება)',
        badgeClass: 'bg-red-500/20 text-red-300 border-red-500/40',
        decayMode: 'neutron_emission',
        decayDescriptionKa: 'ბირთვი გასცდა ნეიტრონული ჩამოღვრის ხაზს (Neutron Drip Line). ნუკლონური მიზიდვა ვეღარ აკავებს ჭარბ ნეიტრონებს.',
        valleyDistance: diff,
        idealNeutrons: idealN,
      };
    }
    return {
      isStable: false,
      statusKa: 'არასტაბილური (ნეიტრონების სიჭარბე, β⁻ დაშლა)',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      decayMode: 'beta_minus',
      decayDescriptionKa: 'ჭარბი ნეიტრონი სუსტი ურთიერთქმედებით გარდაიქმნება პროტონად: n → p + e⁻ + ν̄ₑ (ბეტა-მინუს გამოსხივება).',
      valleyDistance: diff,
      idealNeutrons: idealN,
    };
  } else {
    // Proton rich -> beta plus / electron capture
    if (Math.abs(diff) > 10) {
      return {
        isStable: false,
        statusKa: 'უკიდურესად არასტაბილური (პროტონული გამოსხივება)',
        badgeClass: 'bg-red-500/20 text-red-300 border-red-500/40',
        decayMode: 'proton_emission',
        decayDescriptionKa: 'ბირთვი გასცდა პროტონული ჩამოღვრის ხაზს. პროტონებს შორის კულონის განზიდვა აჭარბებს ძლიერ ბირთვულ ურთიერთქმედებას.',
        valleyDistance: Math.abs(diff),
        idealNeutrons: idealN,
      };
    }
    return {
      isStable: false,
      statusKa: 'არასტაბილური (პროტონების სიჭარბე, β⁺ დაშლა)',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      decayMode: 'beta_plus',
      decayDescriptionKa: 'ჭარბი პროტონი გარდაიქმნება ნეიტრონად: p → n + e⁺ + νₑ (პოზიტრონის გამოსხივება ან ორბიტალური ელექტრონის ჩაჭერა).',
      valleyDistance: Math.abs(diff),
      idealNeutrons: idealN,
    };
  }
}

// Aufbau / Madelung Orbital definitions
interface Subshell {
  name: string;
  n: number;
  capacity: number;
}

const SUBSHELLS: Subshell[] = [
  { name: '1s', n: 1, capacity: 2 },
  { name: '2s', n: 2, capacity: 2 },
  { name: '2p', n: 2, capacity: 6 },
  { name: '3s', n: 3, capacity: 2 },
  { name: '3p', n: 3, capacity: 6 },
  { name: '4s', n: 4, capacity: 2 },
  { name: '3d', n: 3, capacity: 10 },
  { name: '4p', n: 4, capacity: 6 },
  { name: '5s', n: 5, capacity: 2 },
  { name: '4d', n: 4, capacity: 10 },
  { name: '5p', n: 5, capacity: 6 },
  { name: '6s', n: 6, capacity: 2 },
  { name: '4f', n: 4, capacity: 14 },
  { name: '5d', n: 5, capacity: 10 },
  { name: '6p', n: 6, capacity: 6 },
  { name: '7s', n: 7, capacity: 2 },
  { name: '5f', n: 5, capacity: 14 },
  { name: '6d', n: 6, capacity: 10 },
  { name: '7p', n: 7, capacity: 6 },
];

const SUPERSCRIPTS: Record<number, string> = {
  0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴',
  5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹',
};

function toSuperscript(num: number): string {
  return num
    .toString()
    .split('')
    .map(ch => SUPERSCRIPTS[Number(ch)] || ch)
    .join('');
}

/**
 * Calculates electron configuration string (e.g. "1s² 2s² 2p⁶ 3s¹") for any electron count
 */
export function calculateElectronConfig(electrons: number): {
  configString: string;
  subshells: Array<{ name: string; count: number; capacity: number; isFull: boolean }>;
} {
  if (electrons <= 0) {
    return { configString: '0e⁻ (შიშველი ბირთვი)', subshells: [] };
  }

  let remaining = electrons;
  const result: Array<{ name: string; count: number; capacity: number; isFull: boolean }> = [];
  const parts: string[] = [];

  for (const sub of SUBSHELLS) {
    if (remaining <= 0) break;
    const count = Math.min(remaining, sub.capacity);
    remaining -= count;
    result.push({
      name: sub.name,
      count,
      capacity: sub.capacity,
      isFull: count === sub.capacity,
    });
    parts.push(`${sub.name}${toSuperscript(count)}`);
  }

  return {
    configString: parts.join(' '),
    subshells: result,
  };
}

/**
 * Calculates the electrons distributed across shells K, L, M, N, O, P, Q (n = 1..7)
 */
export function calculateShellCounts(electrons: number): number[] {
  if (electrons <= 0) return [];
  const shells = [0, 0, 0, 0, 0, 0, 0];
  let remaining = electrons;

  for (const sub of SUBSHELLS) {
    if (remaining <= 0) break;
    const count = Math.min(remaining, sub.capacity);
    shells[sub.n - 1] += count;
    remaining -= count;
  }

  // Trim trailing empty shells
  while (shells.length > 0 && shells[shells.length - 1] === 0) {
    shells.pop();
  }

  return shells;
}

export const SHELL_CAPACITIES = [2, 8, 18, 32, 50, 72, 98];
export const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

/**
 * Presets for instant inspection
 */
export const ATOM_PRESETS: AtomPreset[] = [
  {
    id: 'h1',
    label: '¹H',
    symbol: 'H',
    nameKa: 'წყალბადი (პროტიუმი)',
    protons: 1,
    neutrons: 0,
    electrons: 1,
    tagKa: 'მარტივი ატომი',
    descriptionKa: 'სამყაროს ყველაზე გავრცელებული ატომი: 1 პროტონი და 1 ელექტრონი.',
  },
  {
    id: 'h2',
    label: '²H',
    symbol: 'H',
    nameKa: 'დეიტერიუმი (მძიმე წყალბადი)',
    protons: 1,
    neutrons: 1,
    electrons: 1,
    tagKa: 'მძიმე წყალი',
    descriptionKa: 'სტაბილური იზოტოპი 1 ნეიტრონით. ქმნის მძიმე წყალს (D₂O) ბირთვულ რეაქტორებში.',
  },
  {
    id: 'alpha',
    label: 'α',
    symbol: 'He',
    nameKa: 'ალფა-ნაწილაკი (He²⁺)',
    protons: 2,
    neutrons: 2,
    electrons: 0,
    tagKa: 'რადიაცია',
    descriptionKa: 'ჰელიუმის შიშველი ბირთვი (ორმაგად დამუხტული კატიონი). რადიოაქტიური დაშლის პროდუქტი.',
  },
  {
    id: 'c12',
    label: '¹²C',
    symbol: 'C',
    nameKa: 'ნახშირბადი-12',
    protons: 6,
    neutrons: 6,
    electrons: 6,
    tagKa: 'სიცოცხლის საფუძველი',
    descriptionKa: 'ორგანული ქიმიის ქვაკუთხედი და ატომური მასის ერთეულის (ამს) სტანდარტი.',
  },
  {
    id: 'c14',
    label: '¹⁴C',
    symbol: 'C',
    nameKa: 'რადიონახშირბადი-14',
    protons: 6,
    neutrons: 8,
    electrons: 6,
    tagKa: 'დათარიღება',
    descriptionKa: 'რადიოაქტიური იზოტოპი (T½ = 5730 წელი), გამოიყენება არქეოლოგიურ დათარიღებაში.',
  },
  {
    id: 'na_plus',
    label: 'Na⁺',
    symbol: 'Na',
    nameKa: 'ნატრიუმის კატიონი',
    protons: 11,
    neutrons: 12,
    electrons: 10,
    tagKa: 'დადებითი იონი',
    descriptionKa: 'ნეონის სტაბილური კონფიგურაცია ([Ne]), დაკარგული აქვს 1 ვალენტური ელექტრონი.',
  },
  {
    id: 'cl_minus',
    label: 'Cl⁻',
    symbol: 'Cl',
    nameKa: 'ქლორიდის ანიონი',
    protons: 17,
    neutrons: 18,
    electrons: 18,
    tagKa: 'უარყოფითი იონი',
    descriptionKa: 'არგონის სტაბილური ოქტეტი ([Ar]), მიერთებული აქვს 1 ელექტრონი.',
  },
  {
    id: 'fe56',
    label: '⁵⁶Fe',
    symbol: 'Fe',
    nameKa: 'რკინა-56',
    protons: 26,
    neutrons: 30,
    electrons: 26,
    tagKa: 'ყველაზე მჭიდრო',
    descriptionKa: 'ერთ-ერთი ყველაზე მჭიდროდ ბმული ბირთვი სამყაროში; ვარსკვლავური თერმობირთვული სინთეზის ზღვარი.',
  },
  {
    id: 'au197',
    label: '¹⁹⁷Au',
    symbol: 'Au',
    nameKa: 'ოქრო-197',
    protons: 79,
    neutrons: 118,
    electrons: 79,
    tagKa: 'კეთილშობილი ლითონი',
    descriptionKa: 'ერთადერთი სტაბილური ოქროს იზოტოპი; რელატივისტური ეფექტები განაპირობებს მის ყვითელ ფერს.',
  },
  {
    id: 'u235',
    label: '²³⁵U',
    symbol: 'U',
    nameKa: 'ურანი-235',
    protons: 92,
    neutrons: 143,
    electrons: 92,
    tagKa: 'ბირთვული საწვავი',
    descriptionKa: 'დაშლადი ბირთვი — ატომური ელექტროსადგურებისა და ჯაჭვური რეაქციის მთავარი ელემენტი.',
  },
  {
    id: 'og294',
    label: '²⁹⁴Og',
    symbol: 'Og',
    nameKa: 'ოგანესონი-294',
    protons: 118,
    neutrons: 176,
    electrons: 118,
    tagKa: 'სუპერმძიმე (Z=118)',
    descriptionKa: 'პერიოდული სისტემის უმძიმესი სინთეზური ელემენტი, სინთეზირებული აკადემიკოს იური ოგანესიანის პატივსაცემად.',
  },
];

/**
 * Educational challenges / puzzles for students
 */
export const ATOM_CHALLENGES: AtomChallenge[] = [
  {
    id: 'ch-1',
    titleKa: 'წყალბადის იზოტოპი — დეიტერიუმი',
    instructionKa: 'ააწყეთ წყალბადის მძიმე იზოტოპი დეიტერიუმი (²H).',
    hintKa: 'დეიტერიუმს აქვს 1 პროტონი, 1 ნეიტრონი და 1 ელექტრონი.',
    target: { protons: 1, neutrons: 1, electrons: 1 },
    targetNameKa: 'დეიტერიუმი (²H)',
    targetSymbol: '²H',
    factKa: 'დეიტერიუმი შეადგენს ბუნებრივი წყალბადის ~0.015%-ს და გამოიყენება თერმობირთვულ ენერგეტიკაში.',
  },
  {
    id: 'ch-2',
    titleKa: 'ალფა-ნაწილაკის შექმნა',
    instructionKa: 'ააწყეთ ალფა-ნაწილაკი (ჰელიუმის შიშველი ბირთვი He²⁺).',
    hintKa: 'ალფა-ნაწილაკი შედგება 2 პროტონისა და 2 ნეიტრონისგან, ელექტრონების გარეშე (e⁻ = 0).',
    target: { protons: 2, neutrons: 2, electrons: 0 },
    targetNameKa: 'ალფა-ნაწილაკი (He²⁺)',
    targetSymbol: 'α',
    factKa: 'ერნესტ რეზერფორდმა სწორედ ალფა-ნაწილაკებით ოქროს ფოლგის დაბომბვით აღმოაჩინა ატომის ბირთვი 1911 წელს!',
  },
  {
    id: 'ch-3',
    titleKa: 'ნახშირბადის სტაბილური ატომი',
    instructionKa: 'ააწყეთ ნეიტრალური ნახშირბად-12 ატომი.',
    hintKa: 'ნახშირბად-12 შეიცავს 6 პროტონს, 6 ნეიტრონს და 6 ელექტრონს.',
    target: { protons: 6, neutrons: 6, electrons: 6 },
    targetNameKa: 'ნახშირბადი-12',
    targetSymbol: '¹²C',
    factKa: 'ზუსტად 12 გრამ ნახშირბად-12-ში არის ავოგადროს რიცხვი (6.022 × 10²³) ატომი.',
  },
  {
    id: 'ch-4',
    titleKa: 'რადიონახშირბად-14',
    instructionKa: 'ააწყეთ არქეოლოგიური დათარიღებისთვის გამოსადეგი ნახშირბად-14.',
    hintKa: 'ნახშირბადს კვლავ 6 პროტონი აქვს, მაგრამ ნეიტრონების რაოდენობა გაზარდეთ 8-მდე (ნეიტრალური ატომი e⁻ = 6).',
    target: { protons: 6, neutrons: 8, electrons: 6 },
    targetNameKa: 'ნახშირბადი-14',
    targetSymbol: '¹⁴C',
    factKa: 'ატმოსფეროში კოსმოსური სხივები აზოტ-14-ისგან წარმოქმნის ¹⁴C-ს, რომელიც ცოცხალ ორგანიზმებში ხვდება.',
  },
  {
    id: 'ch-5',
    titleKa: 'ჟანგბადის ანიონი (ოქსიდ-იონი)',
    instructionKa: 'ააწყეთ ჟანგბადის უარყოფითი იონი O²⁻.',
    hintKa: 'ჟანგბადს აქვს 8 პროტონი, 8 ნეიტრონი. 2 დამატებითი ელექტრონით მიიღებთ 10 ელექტრონს.',
    target: { protons: 8, neutrons: 8, electrons: 10 },
    targetNameKa: 'ოქსიდ-იონი (O²⁻)',
    targetSymbol: 'O²⁻',
    factKa: 'O²⁻ იონს აქვს შევსებული მეორე ენერგეტიკული შრე (ოქტეტი: 1s² 2s² 2p⁶), რაც მას ენერგეტიკულად ხელსაყრელს ხდის.',
  },
  {
    id: 'ch-6',
    titleKa: 'ნატრიუმის კატიონი Na⁺',
    instructionKa: 'ააწყეთ ნატრიუმის დადებითი იონი Na⁺.',
    hintKa: 'ნატრიუმს აქვს 11 პროტონი, 12 ნეიტრონი. 1 ელექტრონის დაკარგვით რჩება 10 ელექტრონი.',
    target: { protons: 11, neutrons: 12, electrons: 10 },
    targetNameKa: 'ნატრიუმის კატიონი (Na⁺)',
    targetSymbol: 'Na⁺',
    factKa: 'სუფრის მარილში (NaCl) ნატრიუმის იონები და ქლორის იონები ქმნიან იონურ კრისტალურ მესერს.',
  },
  {
    id: 'ch-7',
    titleKa: 'რკინა-56 — ვარსკვლავური ზღვარი',
    instructionKa: 'ააწყეთ ყველაზე მჭიდროდ ბმული ბირთვი: რკინა-56.',
    hintKa: 'რკინას აქვს 26 პროტონი, 30 ნეიტრონი და ნეიტრალურ მდგომარეობაში 26 ელექტრონი.',
    target: { protons: 26, neutrons: 30, electrons: 26 },
    targetNameKa: 'რკინა-56',
    targetSymbol: '⁵⁶Fe',
    factKa: 'მასიურ ვარსკვლავებში თერმობირთვული სინთეზი ჩერდება რკინაზე, რის შემდეგაც ვარსკვლავი სუპერნოვად ფეთქდება.',
  },
  {
    id: 'ch-8',
    titleKa: 'ბირთვული საწვავი — ურან-235',
    instructionKa: 'ააწყეთ ატომური ენერგეტიკის საწვავი — ურან-235.',
    hintKa: 'ურანს აქვს 92 პროტონი, 143 ნეიტრონი (92 + 143 = 235) და 92 ელექტრონი.',
    target: { protons: 92, neutrons: 143, electrons: 92 },
    targetNameKa: 'ურან-235',
    targetSymbol: '²³⁵U',
    factKa: '1 კილოგრამი ურან-235-ის დაყოფით მიიღება იმდენივე ენერგია, რამდენიც 1,500 ტონა ქვანახშირის დაწვით!',
  },
];
