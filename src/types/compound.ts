export type CompoundClass =
  | 'მარილარწარმომქმნელი ოქსიდი'
  | 'მჟავური ოქსიდი'
  | 'ფუძე ოქსიდი'
  | 'ამფოტერული ოქსიდი'
  | 'მჟავა'
  | 'ტუტე / ფუძე'
  | 'მარილი'
  | 'კოვალენტური მოლეკულური ნაერთი'
  | 'ორგანული ნაერთი';

export interface ReactionConditions {
  temperature?: string;
  catalyst?: string;
  state?: string;
  details?: string;
  isExothermic?: boolean;
}

export interface Compound {
  id: string;
  elements: string[]; // ქიმიური სიმბოლოები, მაგ. ["H", "O"] ან ["H", "C", "O"] ან ["Na", "H", "C", "O"]
  formula: string; // e.g. "H₂CO₃", "CO", "CaCO₃", "AgCl"
  nameKa: string; // e.g. "ნახშირბადის მონოქსიდი (მხუთავი აირი)"
  nameEn: string;
  type: string;
  compoundClass: CompoundClass;
  descriptionKa: string;
  reactionConditions: ReactionConditions;
  isCommon: boolean;

  // მომხმარებლის მიერ სპეციფიკურად მოთხოვნილი დეტალები:
  precipitate?: {
    isPrecipitate: boolean;
    colorAndForm: string; // მაგ. "⬇️ თეთრი ხაჭოსებრი ნალექი", "⬇️ კაშკაშა ყვითელი კრისტალური ნალექი"
  };
  gasRelease?: {
    isGas: boolean;
    gasType: string; // მაგ. "⬆️ უფერო, უსუნო აირი", "⬆️ მურა ფერის მახრჩობელა აირი (NO₂)"
  };
  nonSaltFormingOxide?: {
    isNonSaltForming: boolean;
    explanation: string; // მაგ. "⚠️ მარილარწარმომქმნელი (ინდიფერენტული) ოქსიდი — არ რეაგირებს წყალთან..."
  };
  hazardWarning?: string; // მაგ. "⚠️ მომწამვლელი აირი"
}

export interface CompoundLookupResult {
  found: boolean;
  compound?: Compound;
  compounds?: Compound[]; // ყველა შესაძლო ნაერთი ამ ელემენტებისგან (მაგ. CO და CO₂, FeO და Fe₂O₃)
  elements: string[];
  educationalExplanationKa: string;
  canReactUnderConditions: boolean;
  reasonWhyNoReaction?: string; // მკაფიო განმარტება თუ რატომ არ წარმოიქმნება ნაერთი
  suggestedElements?: string[]; // რეკომენდაცია რომელი ელემენტების დამატებამ შეიძლება მოგვცეს ნაერთი
}

