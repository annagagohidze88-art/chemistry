export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'metalloid'
  | 'reactive-nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide';

export type ElementPhase = 'gas' | 'liquid' | 'solid' | 'unknown';

export interface ElementImage {
  url: string;
  title?: string;
  attribution?: string;
}

export interface ChemicalElement {
  atomicNumber: number;
  symbol: string;
  nameKa: string;
  nameEn: string;
  atomicMass: string;
  period: number;
  group: number | null; // null for lanthanides/actinides
  block: 's' | 'p' | 'd' | 'f';
  category: ElementCategory;
  phase: ElementPhase; // ოთახის ტემპერატურაზე (20 °C)
  electronConfiguration: string;
  electronsPerShell: number[]; // Bohr model levels (K, L, M, N...)
  valency: string; // ვალენტობა
  oxidationStates: string; // გავრცელებული ჟანგვის რიცხვები
  electronegativity: number | null; // პოლინგის შკალა
  density: string; // სიმკვრივე
  meltingPoint: string; // დნობის ტემპერატურა
  boilingPoint: string; // დუღილის ტემპერატურა
  appearance: string; // ვიზუალური აღწერა (ფერი, ბზინვარება, აგრეგატული მდგომარეობა)
  summary: string; // ძირითადი თვისებების აღწერა
  uses: string[]; // გამოყენების მაგალითები
  discoveryYear?: string;
  discoveredBy?: string;
  image?: ElementImage | null;
}

export interface CategoryInfo {
  id: ElementCategory;
  nameKa: string;
  descriptionKa: string;
  colorClass: string;
  borderClass: string;
  bgMuted: string;
  badgeBg: string;
  glowColor: string;
}

export const ROMAN_PERIODS: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
};
