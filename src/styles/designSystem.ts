import type { ElementCategory } from '../types/element';

/**
 * atomic-lab.net Unified Design System Tokens
 * Master color tokens, category glow styles, reticle corner brackets, and inspection card metrics.
 */

export interface CategoryTheme {
  id: ElementCategory;
  nameKa: string;
  nameEn: string;
  neonColor: string; // Hex for glows
  borderClass: string;
  bgClass: string;
  glowClass: string;
  textClass: string;
  symbolGlow: string;
}

export interface CategoryThemeToken {
  id: ElementCategory;
  nameKa: string;
  nameEn: string;
  color: string;
  colorSecondary?: string;
  glow: string;
  bgDark: string;
  border: string;
  borderHover: string;
  gradient: string;
  boxShadow: string;
  hoverBoxShadow: string;
}

export const ATOMIC_LAB_COLORS = {
  // Dark canvas shades
  canvas: '#070b11',
  card: '#0d1520',
  cardElevated: '#121d2c',
  cardHover: '#162233',
  border: '#1e293b',
  borderSubdued: '#0f172a',
  borderHighlight: '#38bdf8',

  // Cyan Neon Accents (Logo & Reticle)
  accentCyan: '#38bdf8',
  accentCyanBright: '#22d3ee',
  accentCyanGlow: 'rgba(56, 189, 248, 0.45)',

  // Text Hierarchy
  textPrimary: '#ffffff',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  textSubtle: '#64748b',

  // Top Accent Gradient
  topGradient: 'linear-gradient(90deg, #22d3ee 0%, #38bdf8 30%, #6366f1 70%, transparent 100%)',
} as const;

export const ATOMIC_DESIGN = {
  colors: {
    canvas: '#070b11',
    card: '#0b121c',
    cardElevated: '#0f1724',
    borderMuted: '#1e293b',
    cyanAccent: '#38bdf8',
    cyanGlow: 'rgba(56, 189, 248, 0.5)',
  },
  categories: {
    'alkali-metal': {
      id: 'alkali-metal',
      nameKa: 'ტუტე ლითონები',
      nameEn: 'Alkali Metals',
      neonColor: '#e11d48',
      borderClass: 'border-rose-500/50 hover:border-rose-400',
      bgClass: 'bg-gradient-to-b from-rose-500/15 via-rose-950/20 to-[#070b11]/90',
      glowClass: 'shadow-[0_0_15px_rgba(225,29,72,0.35)]',
      textClass: 'text-rose-300',
      symbolGlow: 'drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]',
    },
    'alkaline-earth': {
      id: 'alkaline-earth',
      nameKa: 'ტუტემიწა ლითონები',
      nameEn: 'Alkaline Earth',
      neonColor: '#d97706',
      borderClass: 'border-amber-600/50 hover:border-amber-500',
      bgClass: 'bg-gradient-to-b from-amber-600/15 via-amber-950/20 to-[#070b11]/90',
      glowClass: 'shadow-[0_0_15px_rgba(217,119,6,0.35)]',
      textClass: 'text-amber-300',
      symbolGlow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]',
    },
    'transition-metal': {
      id: 'transition-metal',
      nameKa: 'გარდამავალი ლითონები',
      nameEn: 'Transition Metals',
      neonColor: '#f59e0b',
      borderClass: 'border-amber-500/40 hover:border-amber-400',
      bgClass: 'bg-gradient-to-b from-amber-500/12 via-yellow-950/20 to-[#070b11]/90',
      glowClass: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
      textClass: 'text-amber-200',
      symbolGlow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    },
    'post-transition-metal': {
      id: 'post-transition-metal',
      nameKa: 'პოსტ-გარდამავალი ლითონები',
      nameEn: 'Post-transition Metals',
      neonColor: '#16a34a',
      borderClass: 'border-green-600/50 hover:border-green-500',
      bgClass: 'bg-gradient-to-b from-green-600/15 via-green-950/20 to-[#070b11]/90',
      glowClass: 'shadow-[0_0_15px_rgba(22,163,74,0.35)]',
      textClass: 'text-green-300',
      symbolGlow: 'drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]',
    },
    'metalloid': {
      id: 'metalloid',
      nameKa: 'მეტალოიდები',
      nameEn: 'Metalloids',
      neonColor: '#10b981',
      borderClass: 'border-emerald-500/50 hover:border-emerald-400',
      bgClass: 'bg-gradient-to-b from-emerald-500/15 via-emerald-950/20 to-[#070b11]/90',
      glowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.35)]',
      textClass: 'text-emerald-300',
      symbolGlow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]',
    },
    'reactive-nonmetal': {
      id: 'reactive-nonmetal',
      nameKa: 'რეაქტიული არამეტალები',
      nameEn: 'Reactive Nonmetals',
      neonColor: '#06b6d4',
      borderClass: 'border-cyan-500/50 hover:border-cyan-400',
      bgClass: 'bg-gradient-to-b from-cyan-500/15 via-cyan-950/20 to-[#070b11]/90',
      glowClass: 'shadow-[0_0_15px_rgba(6,182,212,0.35)]',
      textClass: 'text-cyan-300',
      symbolGlow: 'drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]',
    },
    'halogen': {
      id: 'halogen',
      nameKa: 'ჰალოგენები',
      nameEn: 'Halogens',
      neonColor: '#2563eb',
      borderClass: 'border-blue-600/50 hover:border-blue-500',
      bgClass: 'bg-gradient-to-b from-blue-600/15 via-blue-950/20 to-[#070b11]/90',
      glowClass: 'shadow-[0_0_15px_rgba(37,99,235,0.35)]',
      textClass: 'text-blue-300',
      symbolGlow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]',
    },
    'noble-gas': {
      id: 'noble-gas',
      nameKa: 'კეთილშობილი აირები',
      nameEn: 'Noble Gases',
      neonColor: '#7c3aed',
      borderClass: 'border-purple-600/50 hover:border-purple-500',
      bgClass: 'bg-gradient-to-b from-purple-600/15 via-purple-950/20 to-[#070b11]/90',
      glowClass: 'shadow-[0_0_15px_rgba(124,58,237,0.35)]',
      textClass: 'text-purple-300',
      symbolGlow: 'drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]',
    },
    'lanthanide': {
      id: 'lanthanide',
      nameKa: 'ლანთანოიდები',
      nameEn: 'Lanthanides',
      neonColor: '#8b5cf6',
      borderClass: 'border-violet-500/50 hover:border-violet-400',
      bgClass: 'bg-gradient-to-b from-violet-500/15 via-violet-950/20 to-[#070b11]/90',
      glowClass: 'shadow-[0_0_15px_rgba(139,92,246,0.35)]',
      textClass: 'text-violet-300',
      symbolGlow: 'drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]',
    },
    'actinide': {
      id: 'actinide',
      nameKa: 'აქტინოიდები',
      nameEn: 'Actinides',
      neonColor: '#c026d3',
      borderClass: 'border-fuchsia-600/50 hover:border-fuchsia-500',
      bgClass: 'bg-gradient-to-b from-fuchsia-600/15 via-fuchsia-950/20 to-[#070b11]/90',
      glowClass: 'shadow-[0_0_15px_rgba(192,38,211,0.35)]',
      textClass: 'text-fuchsia-300',
      symbolGlow: 'drop-shadow-[0_0_8px_rgba(217,70,239,0.6)]',
    },
  } as Record<ElementCategory, CategoryTheme>,
};

export const CATEGORY_TOKENS: Record<ElementCategory, CategoryThemeToken> = {
  'alkali-metal': {
    id: 'alkali-metal',
    nameKa: 'ტუტე ლითონები',
    nameEn: 'Alkali metal',
    color: '#e11d48',
    glow: 'rgba(225, 29, 72, 0.45)',
    bgDark: 'rgba(225, 29, 72, 0.08)',
    border: 'rgba(225, 29, 72, 0.35)',
    borderHover: 'rgba(225, 29, 72, 0.9)',
    gradient: 'from-rose-500/25 via-rose-500/10 to-[#070b11]/80',
    boxShadow: '0 0 12px rgba(225, 29, 72, 0.25)',
    hoverBoxShadow: '0 0 20px rgba(225, 29, 72, 0.65)',
  },
  'alkaline-earth': {
    id: 'alkaline-earth',
    nameKa: 'ტუტემიწა ლითონები',
    nameEn: 'Alkaline earth metal',
    color: '#d97706',
    glow: 'rgba(217, 119, 6, 0.45)',
    bgDark: 'rgba(217, 119, 6, 0.08)',
    border: 'rgba(217, 119, 6, 0.35)',
    borderHover: 'rgba(217, 119, 6, 0.9)',
    gradient: 'from-amber-600/25 via-amber-600/10 to-[#070b11]/80',
    boxShadow: '0 0 12px rgba(217, 119, 6, 0.25)',
    hoverBoxShadow: '0 0 20px rgba(217, 119, 6, 0.65)',
  },
  'transition-metal': {
    id: 'transition-metal',
    nameKa: 'გარდამავალი ლითონები',
    nameEn: 'Transition metal',
    color: '#f59e0b',
    colorSecondary: '#eab308',
    glow: 'rgba(245, 158, 11, 0.5)',
    bgDark: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.35)',
    borderHover: 'rgba(245, 158, 11, 0.9)',
    gradient: 'from-amber-500/25 via-yellow-500/15 to-[#070b11]/80',
    boxShadow: '0 0 14px rgba(245, 158, 11, 0.3)',
    hoverBoxShadow: '0 0 22px rgba(245, 158, 11, 0.7)',
  },
  'post-transition-metal': {
    id: 'post-transition-metal',
    nameKa: 'პოსტ-გარდამავალი ლითონები',
    nameEn: 'Post-transition metal',
    color: '#16a34a',
    glow: 'rgba(22, 163, 74, 0.45)',
    bgDark: 'rgba(22, 163, 74, 0.08)',
    border: 'rgba(22, 163, 74, 0.35)',
    borderHover: 'rgba(22, 163, 74, 0.9)',
    gradient: 'from-green-600/25 via-green-600/10 to-[#070b11]/80',
    boxShadow: '0 0 12px rgba(22, 163, 74, 0.25)',
    hoverBoxShadow: '0 0 20px rgba(22, 163, 74, 0.65)',
  },
  'metalloid': {
    id: 'metalloid',
    nameKa: 'მეტალოიდები',
    nameEn: 'Metalloid',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.45)',
    bgDark: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.35)',
    borderHover: 'rgba(16, 185, 129, 0.9)',
    gradient: 'from-emerald-500/25 via-emerald-500/10 to-[#070b11]/80',
    boxShadow: '0 0 12px rgba(16, 185, 129, 0.25)',
    hoverBoxShadow: '0 0 20px rgba(16, 185, 129, 0.65)',
  },
  'reactive-nonmetal': {
    id: 'reactive-nonmetal',
    nameKa: 'რეაქტიული არამეტალები',
    nameEn: 'Reactive nonmetal',
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.45)',
    bgDark: 'rgba(6, 182, 212, 0.08)',
    border: 'rgba(6, 182, 212, 0.35)',
    borderHover: 'rgba(6, 182, 212, 0.9)',
    gradient: 'from-cyan-500/25 via-cyan-500/10 to-[#070b11]/80',
    boxShadow: '0 0 12px rgba(6, 182, 212, 0.25)',
    hoverBoxShadow: '0 0 20px rgba(6, 182, 212, 0.65)',
  },
  'halogen': {
    id: 'halogen',
    nameKa: 'ჰალოგენები',
    nameEn: 'Halogen',
    color: '#2563eb',
    glow: 'rgba(37, 99, 235, 0.45)',
    bgDark: 'rgba(37, 99, 235, 0.08)',
    border: 'rgba(37, 99, 235, 0.35)',
    borderHover: 'rgba(37, 99, 235, 0.9)',
    gradient: 'from-blue-600/25 via-blue-600/10 to-[#070b11]/80',
    boxShadow: '0 0 12px rgba(37, 99, 235, 0.25)',
    hoverBoxShadow: '0 0 20px rgba(37, 99, 235, 0.65)',
  },
  'noble-gas': {
    id: 'noble-gas',
    nameKa: 'კეთილშობილი აირები',
    nameEn: 'Noble gas',
    color: '#7c3aed',
    glow: 'rgba(124, 58, 237, 0.45)',
    bgDark: 'rgba(124, 58, 237, 0.08)',
    border: 'rgba(124, 58, 237, 0.35)',
    borderHover: 'rgba(124, 58, 237, 0.9)',
    gradient: 'from-purple-600/25 via-purple-600/10 to-[#070b11]/80',
    boxShadow: '0 0 12px rgba(124, 58, 237, 0.25)',
    hoverBoxShadow: '0 0 20px rgba(124, 58, 237, 0.65)',
  },
  'lanthanide': {
    id: 'lanthanide',
    nameKa: 'ლანთანოიდები',
    nameEn: 'Lanthanide',
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.45)',
    bgDark: 'rgba(139, 92, 246, 0.08)',
    border: 'rgba(139, 92, 246, 0.35)',
    borderHover: 'rgba(139, 92, 246, 0.9)',
    gradient: 'from-violet-500/25 via-violet-500/10 to-[#070b11]/80',
    boxShadow: '0 0 12px rgba(139, 92, 246, 0.25)',
    hoverBoxShadow: '0 0 20px rgba(139, 92, 246, 0.65)',
  },
  'actinide': {
    id: 'actinide',
    nameKa: 'აქტინოიდები',
    nameEn: 'Actinide',
    color: '#c026d3',
    glow: 'rgba(192, 38, 211, 0.45)',
    bgDark: 'rgba(192, 38, 211, 0.08)',
    border: 'rgba(192, 38, 211, 0.35)',
    borderHover: 'rgba(192, 38, 211, 0.9)',
    gradient: 'from-fuchsia-600/25 via-fuchsia-600/10 to-[#070b11]/80',
    boxShadow: '0 0 12px rgba(192, 38, 211, 0.25)',
    hoverBoxShadow: '0 0 20px rgba(192, 38, 211, 0.65)',
  },
};

/**
 * Reticle corner bracket design tokens (matching HUD [ ] selection marker)
 */
export const RETICLE_TOKENS = {
  color: '#38bdf8',
  glowColor: 'rgba(56, 189, 248, 0.85)',
  size: 8,
  thickness: 2,
  offset: -3,
  shadow: '0 0 8px #38bdf8, 0 0 16px rgba(56, 189, 248, 0.4)',
} as const;

/**
 * Floating inspection card design tokens
 */
export const HOVER_CARD_TOKENS = {
  bg: '#0d1520',
  border: '#1e293b',
  cardShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.85), 0 0 25px -5px rgba(56, 189, 248, 0.15)',
  width: 320,
  borderRadius: '16px',
} as const;

/**
 * Format raw electron configuration with unicode superscripts
 * e.g., "[Kr] 4d8 5s1" -> "[Kr] 4d⁸ 5s¹"
 */
export function formatElectronConfig(config: string): string {
  if (!config) return '';
  const superscripts: Record<string, string> = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
  };

  return config.replace(/([spdf])(\d+)/gi, (_, orbital, digits) => {
    const supDigits = digits
      .split('')
      .map((d: string) => superscripts[d] || d)
      .join('');
    return `${orbital}${supDigits}`;
  });
}

/**
 * Get category theme with safe fallback
 */
export function getCategoryTheme(category: ElementCategory): CategoryThemeToken {
  return CATEGORY_TOKENS[category] || CATEGORY_TOKENS['reactive-nonmetal'];
}
