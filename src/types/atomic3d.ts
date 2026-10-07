export interface ParticleCounts {
  protons: number;
  neutrons: number;
  electrons: number;
}

export type DecayMode = 'stable' | 'beta_minus' | 'beta_plus' | 'alpha' | 'fission' | 'proton_emission' | 'neutron_emission';

export interface StabilityVerdict {
  isStable: boolean;
  statusKa: string;
  badgeClass: string;
  decayMode: DecayMode;
  decayDescriptionKa: string;
  valleyDistance: number;
  idealNeutrons: number;
  halfLifeHintKa?: string;
}

export interface AtomPreset {
  id: string;
  label: string;
  symbol: string;
  nameKa: string;
  protons: number;
  neutrons: number;
  electrons: number;
  tagKa: string;
  descriptionKa: string;
}

export interface AtomChallenge {
  id: string;
  titleKa: string;
  instructionKa: string;
  hintKa: string;
  target: ParticleCounts;
  targetNameKa: string;
  targetSymbol: string;
  factKa: string;
}

export type SceneVisualMode = 'shells' | 'orbitals';
