export type SolubilityState = 'soluble' | 'insoluble' | 'sparingly' | 'decomposes';

export interface SolubilityCell {
  state: SolubilityState;
  formula: string;
  nameKa: string;
  color?: string; // Precipitate color if insoluble
  description?: string;
  reactionNote?: string;
}

export interface Cation {
  symbol: string;
  charge: string;
  nameKa: string;
  group: 'alkali' | 'alkaline' | 'transition' | 'post-transition' | 'ammonium';
}

export interface Anion {
  symbol: string;
  charge: string;
  nameKa: string;
  acidNameKa: string;
  acidFormula: string;
}

export const CATIONS: Cation[] = [
  { symbol: 'H⁺', charge: '+1', nameKa: 'წყალბად-იონი', group: 'alkali' },
  { symbol: 'NH₄⁺', charge: '+1', nameKa: 'ამონიუმი', group: 'ammonium' },
  { symbol: 'K⁺', charge: '+1', nameKa: 'კალიუმი', group: 'alkali' },
  { symbol: 'Na⁺', charge: '+1', nameKa: 'ნატრიუმი', group: 'alkali' },
  { symbol: 'Li⁺', charge: '+1', nameKa: 'ლითიუმი', group: 'alkali' },
  { symbol: 'Ba²⁺', charge: '+2', nameKa: 'ბარიუმი', group: 'alkaline' },
  { symbol: 'Ca²⁺', charge: '+2', nameKa: 'კალციუმი', group: 'alkaline' },
  { symbol: 'Mg²⁺', charge: '+2', nameKa: 'მაგნიუმი', group: 'alkaline' },
  { symbol: 'Al³⁺', charge: '+3', nameKa: 'ალუმინი', group: 'post-transition' },
  { symbol: 'Cr³⁺', charge: '+3', nameKa: 'ქრომი (III)', group: 'transition' },
  { symbol: 'Fe²⁺', charge: '+2', nameKa: 'რკინა (II)', group: 'transition' },
  { symbol: 'Fe³⁺', charge: '+3', nameKa: 'რკინა (III)', group: 'transition' },
  { symbol: 'Zn²⁺', charge: '+2', nameKa: 'თუთია', group: 'transition' },
  { symbol: 'Cu²⁺', charge: '+2', nameKa: 'სპილენძი (II)', group: 'transition' },
  { symbol: 'Ag⁺', charge: '+1', nameKa: 'ვერცხლი', group: 'transition' },
  { symbol: 'Pb²⁺', charge: '+2', nameKa: 'ტყვია (II)', group: 'post-transition' },
];

export const ANIONS: Anion[] = [
  { symbol: 'OH⁻', charge: '-1', nameKa: 'ჰიდროქსიდი', acidNameKa: 'წყალი', acidFormula: 'H₂O' },
  { symbol: 'F⁻', charge: '-1', nameKa: 'ფტორიდი', acidNameKa: 'მინამჟავა', acidFormula: 'HF' },
  { symbol: 'Cl⁻', charge: '-1', nameKa: 'ქლორიდი', acidNameKa: 'მარილმჟავა', acidFormula: 'HCl' },
  { symbol: 'Br⁻', charge: '-1', nameKa: 'ბრომიდი', acidNameKa: 'ბრომწყალბადმჟავა', acidFormula: 'HBr' },
  { symbol: 'I⁻', charge: '-1', nameKa: 'იოდიდი', acidNameKa: 'იოდწყალბადმჟავა', acidFormula: 'HI' },
  { symbol: 'S²⁻', charge: '-2', nameKa: 'სულფიდი', acidNameKa: 'გოგირდწყალბადმჟავა', acidFormula: 'H₂S' },
  { symbol: 'SO₃²⁻', charge: '-2', nameKa: 'სულფიტი', acidNameKa: 'გოგირდოვანი მჟავა', acidFormula: 'H₂SO₃' },
  { symbol: 'SO₄²⁻', charge: '-2', nameKa: 'სულფატი', acidNameKa: 'გოგირდმჟავა', acidFormula: 'H₂SO₄' },
  { symbol: 'NO₃⁻', charge: '-1', nameKa: 'ნიტრატი', acidNameKa: 'აზოტმჟავა', acidFormula: 'HNO₃' },
  { symbol: 'CO₃²⁻', charge: '-2', nameKa: 'კარბონატი', acidNameKa: 'ნახშირმჟავა', acidFormula: 'H₂CO₃' },
  { symbol: 'SiO₃²⁻', charge: '-2', nameKa: 'სილიკატი', acidNameKa: 'სილიციუმმჟავა', acidFormula: 'H₂SiO₃' },
  { symbol: 'PO₄³⁻', charge: '-3', nameKa: 'ორთოფოსფატი', acidNameKa: 'ორთოფოსფორმჟავა', acidFormula: 'H₃PO₄' },
  { symbol: 'CH₃COO⁻', charge: '-1', nameKa: 'აცეტატი', acidNameKa: 'ძმარმჟავა', acidFormula: 'CH₃COOH' },
];

/**
 * Key: `${cation.symbol}_${anion.symbol}`
 */
export const SOLUBILITY_TABLE: Record<string, SolubilityCell> = {
  // H+
  'H⁺_OH⁻': { state: 'soluble', formula: 'H₂O', nameKa: 'წყალი', description: 'სუფთა ნეიტრალური გამხსნელი' },
  'H⁺_F⁻': { state: 'soluble', formula: 'HF', nameKa: 'მინამჟავა', description: 'სუსტი მჟავა, შლის მინას' },
  'H⁺_Cl⁻': { state: 'soluble', formula: 'HCl', nameKa: 'მარილმჟავა', description: 'ძლიერი ერთფუძიანი მჟავა' },
  'H⁺_Br⁻': { state: 'soluble', formula: 'HBr', nameKa: 'ბრომწყალბადმჟავა', description: 'ძლიერი მჟავა' },
  'H⁺_I⁻': { state: 'soluble', formula: 'HI', nameKa: 'იოდწყალბადმჟავა', description: 'უმძლავრესი ჰალოგენწყალბადმჟავა' },
  'H⁺_S²⁻': { state: 'soluble', formula: 'H₂S', nameKa: 'გოგირდწყალბადი', description: 'მყრალი სუნის მქონე სუსტი მჟავა (აირი)' },
  'H⁺_SO₃²⁻': { state: 'soluble', formula: 'H₂SO₃', nameKa: 'გოგირდოვანი მჟავა', description: 'არამდგრადი მჟავა, იშლება SO₂-ად და H₂O-ად' },
  'H⁺_SO₄²⁻': { state: 'soluble', formula: 'H₂SO₄', nameKa: 'გოგირდმჟავა', description: 'მძიმე ზეთოვანი ძლიერი ორფუძიანი მჟავა' },
  'H⁺_NO₃⁻': { state: 'soluble', formula: 'HNO₃', nameKa: 'აზოტმჟავა', description: 'ძლიერი ჟანგბადიანი მჟავა და მჟანგავი' },
  'H⁺_CO₃²⁻': { state: 'soluble', formula: 'H₂CO₃', nameKa: 'ნახშირმჟავა', description: 'არამდგრადია, იშლება CO₂ ↑ და H₂O' },
  'H⁺_SiO₃²⁻': { state: 'insoluble', formula: 'H₂SiO₃', nameKa: 'სილიციუმმჟავა', color: 'თეთრი ჟელესებრი ნალექი', description: 'ერთადერთი უხსნადი მჟავა სასკოლო კურსში!' },
  'H⁺_PO₄³⁻': { state: 'soluble', formula: 'H₃PO₄', nameKa: 'ორთოფოსფორმჟავა', description: 'საშუალო სიძლიერის სამფუძიანი მჟავა' },
  'H⁺_CH₃COO⁻': { state: 'soluble', formula: 'CH₃COOH', nameKa: 'ძმარმჟავა', description: 'სუსტი ორგანული კარბონმჟავა' },

  // NH4+ (All soluble!)
  'NH₄⁺_OH⁻': { state: 'soluble', formula: 'NH₄OH', nameKa: 'ამონიუმის ჰიდროქსიდი (ნიშადური)', description: 'იშლება ამიაკად (NH₃ ↑) და წყლად' },
  'NH₄⁺_F⁻': { state: 'soluble', formula: 'NH₄F', nameKa: 'ამონიუმის ფტორიდი' },
  'NH₄⁺_Cl⁻': { state: 'soluble', formula: 'NH₄Cl', nameKa: 'ამონიუმის ქლორიდი (ნიშადური)' },
  'NH₄⁺_Br⁻': { state: 'soluble', formula: 'NH₄Br', nameKa: 'ამონიუმის ბრომიდი' },
  'NH₄⁺_I⁻': { state: 'soluble', formula: 'NH₄I', nameKa: 'ამონიუმის იოდიდი' },
  'NH₄⁺_S²⁻': { state: 'soluble', formula: '(NH₄)₂S', nameKa: 'ამონიუმის სულფიდი' },
  'NH₄⁺_SO₃²⁻': { state: 'soluble', formula: '(NH₄)₂SO₃', nameKa: 'ამონიუმის სულფიტი' },
  'NH₄⁺_SO₄²⁻': { state: 'soluble', formula: '(NH₄)₂SO₄', nameKa: 'ამონიუმის სულფატი', description: 'აზოტოვანი სასუქი' },
  'NH₄⁺_NO₃⁻': { state: 'soluble', formula: '(NH₄)NO₃', nameKa: 'ამონიუმის ნიტრატი', description: 'ამონიუმის გვარჯილა' },
  'NH₄⁺_CO₃²⁻': { state: 'soluble', formula: '(NH₄)₂CO₃', nameKa: 'ამონიუმის კარბონატი' },
  'NH₄⁺_SiO₃²⁻': { state: 'decomposes', formula: '(NH₄)₂SiO₃', nameKa: 'ამონიუმის სილიკატი', description: 'წყალში განიცდის ჰიდროლიზს' },
  'NH₄⁺_PO₄³⁻': { state: 'soluble', formula: '(NH₄)₃PO₄', nameKa: 'ამონიუმის ფოსფატი' },
  'NH₄⁺_CH₃COO⁻': { state: 'soluble', formula: 'CH₃COONH₄', nameKa: 'ამონიუმის აცეტატი' },

  // K+ (All soluble!)
  'K⁺_OH⁻': { state: 'soluble', formula: 'KOH', nameKa: 'კალიუმის ჰიდროქსიდი (მწვავე კალიუმი)', description: 'ძლიერი ტუტე' },
  'K⁺_F⁻': { state: 'soluble', formula: 'KF', nameKa: 'კალიუმის ფტორიდი' },
  'K⁺_Cl⁻': { state: 'soluble', formula: 'KCl', nameKa: 'კალიუმის ქლორიდი (სილვინი)' },
  'K⁺_Br⁻': { state: 'soluble', formula: 'KBr', nameKa: 'კალიუმის ბრომიდი' },
  'K⁺_I⁻': { state: 'soluble', formula: 'KI', nameKa: 'კალიუმის იოდიდი' },
  'K⁺_S²⁻': { state: 'soluble', formula: 'K₂S', nameKa: 'კალიუმის სულფიდი' },
  'K⁺_SO₃²⁻': { state: 'soluble', formula: 'K₂SO₃', nameKa: 'კალიუმის სულფიტი' },
  'K⁺_SO₄²⁻': { state: 'soluble', formula: 'K₂SO₄', nameKa: 'კალიუმის სულფატი' },
  'K⁺_NO₃⁻': { state: 'soluble', formula: 'KNO₃', nameKa: 'კალიუმის ნიტრატი (ინდური გვარჯილა)' },
  'K⁺_CO₃²⁻': { state: 'soluble', formula: 'K₂CO₃', nameKa: 'კალიუმის კარბონატი (პოტაში)' },
  'K⁺_SiO₃²⁻': { state: 'soluble', formula: 'K₂SiO₃', nameKa: 'კალიუმის სილიკატი (თხევადი მინა)' },
  'K⁺_PO₄³⁻': { state: 'soluble', formula: 'K₃PO₄', nameKa: 'კალიუმის ფოსფატი' },
  'K⁺_CH₃COO⁻': { state: 'soluble', formula: 'CH₃COOK', nameKa: 'კალიუმის აცეტატი' },

  // Na+ (All soluble!)
  'Na⁺_OH⁻': { state: 'soluble', formula: 'NaOH', nameKa: 'ნატრიუმის ჰიდროქსიდი (მწვავე ტუტე)', description: 'ძლიერი ტუტე' },
  'Na⁺_F⁻': { state: 'soluble', formula: 'NaF', nameKa: 'ნატრიუმის ფტორიდი' },
  'Na⁺_Cl⁻': { state: 'soluble', formula: 'NaCl', nameKa: 'ნატრიუმის ქლორიდი (სუფრის მარილი)' },
  'Na⁺_Br⁻': { state: 'soluble', formula: 'NaBr', nameKa: 'ნატრიუმის ბრომიდი' },
  'Na⁺_I⁻': { state: 'soluble', formula: 'NaI', nameKa: 'ნატრიუმის იოდიდი' },
  'Na⁺_S²⁻': { state: 'soluble', formula: 'Na₂S', nameKa: 'ნატრიუმის სულფიდი' },
  'Na⁺_SO₃²⁻': { state: 'soluble', formula: 'Na₂SO₃', nameKa: 'ნატრიუმის სულფიტი' },
  'Na⁺_SO₄²⁻': { state: 'soluble', formula: 'Na₂SO₄', nameKa: 'ნატრიუმის სულფატი' },
  'Na⁺_NO₃⁻': { state: 'soluble', formula: 'NaNO₃', nameKa: 'ნატრიუმის ნიტრატი (ჩილეს გვარჯილა)' },
  'Na⁺_CO₃²⁻': { state: 'soluble', formula: 'Na₂CO₃', nameKa: 'ნატრიუმის კარბონატი (კალცინირებული სოდა)' },
  'Na⁺_SiO₃²⁻': { state: 'soluble', formula: 'Na₂SiO₃', nameKa: 'ნატრიუმის სილიკატი (თხევადი მინა)' },
  'Na⁺_PO₄³⁻': { state: 'soluble', formula: 'Na₃PO₄', nameKa: 'ნატრიუმის ფოსფატი' },
  'Na⁺_CH₃COO⁻': { state: 'soluble', formula: 'CH₃COONa', nameKa: 'ნატრიუმის აცეტატი' },

  // Li+
  'Li⁺_OH⁻': { state: 'soluble', formula: 'LiOH', nameKa: 'ლითიუმის ჰიდროქსიდი', description: 'ტუტე' },
  'Li⁺_F⁻': { state: 'sparingly', formula: 'LiF', nameKa: 'ლითიუმის ფტორიდი' },
  'Li⁺_Cl⁻': { state: 'soluble', formula: 'LiCl', nameKa: 'ლითიუმის ქლორიდი' },
  'Li⁺_Br⁻': { state: 'soluble', formula: 'LiBr', nameKa: 'ლითიუმის ბრომიდი' },
  'Li⁺_I⁻': { state: 'soluble', formula: 'LiI', nameKa: 'ლითიუმის იოდიდი' },
  'Li⁺_S²⁻': { state: 'soluble', formula: 'Li₂S', nameKa: 'ლითიუმის სულფიდი' },
  'Li⁺_SO₃²⁻': { state: 'soluble', formula: 'Li₂SO₃', nameKa: 'ლითიუმის სულფიტი' },
  'Li⁺_SO₄²⁻': { state: 'soluble', formula: 'Li₂SO₄', nameKa: 'ლითიუმის სულფატი' },
  'Li⁺_NO₃⁻': { state: 'soluble', formula: 'LiNO₃', nameKa: 'ლითიუმის ნიტრატი' },
  'Li⁺_CO₃²⁻': { state: 'sparingly', formula: 'Li₂CO₃', nameKa: 'ლითიუმის კარბონატი' },
  'Li⁺_SiO₃²⁻': { state: 'sparingly', formula: 'Li₂SiO₃', nameKa: 'ლითიუმის სილიკატი' },
  'Li⁺_PO₄³⁻': { state: 'sparingly', formula: 'Li₃PO₄', nameKa: 'ლითიუმის ფოსფატი' },
  'Li⁺_CH₃COO⁻': { state: 'soluble', formula: 'CH₃COOLi', nameKa: 'ლითიუმის აცეტატი' },

  // Ba2+
  'Ba²⁺_OH⁻': { state: 'soluble', formula: 'Ba(OH)₂', nameKa: 'ბარიუმის ჰიდროქსიდი (ბარიტის წყალი)', description: 'ძლიერი ტუტე' },
  'Ba²⁺_F⁻': { state: 'sparingly', formula: 'BaF₂', nameKa: 'ბარიუმის ფტორიდი' },
  'Ba²⁺_Cl⁻': { state: 'soluble', formula: 'BaCl₂', nameKa: 'ბარიუმის ქლორიდი' },
  'Ba²⁺_Br⁻': { state: 'soluble', formula: 'BaBr₂', nameKa: 'ბარიუმის ბრომიდი' },
  'Ba²⁺_I⁻': { state: 'soluble', formula: 'BaI₂', nameKa: 'ბარიუმის იოდიდი' },
  'Ba²⁺_S²⁻': { state: 'soluble', formula: 'BaS', nameKa: 'ბარიუმის სულფიდი' },
  'Ba²⁺_SO₃²⁻': { state: 'insoluble', formula: 'BaSO₃', nameKa: 'ბარიუმის სულფიტი', color: 'თეთრი ნალექი' },
  'Ba²⁺_SO₄²⁻': { state: 'insoluble', formula: 'BaSO₄', nameKa: 'ბარიუმის სულფატი', color: 'თეთრი მძიმე ნალექი', description: 'ხარისხობრივი რეაქცია! არ იხსნება მჟავებშიც კი.' },
  'Ba²⁺_NO₃⁻': { state: 'soluble', formula: 'Ba(NO₃)₂', nameKa: 'ბარიუმის ნიტრატი' },
  'Ba²⁺_CO₃²⁻': { state: 'insoluble', formula: 'BaCO₃', nameKa: 'ბარიუმის კარბონატი', color: 'თეთრი ნალექი' },
  'Ba²⁺_SiO₃²⁻': { state: 'insoluble', formula: 'BaSiO₃', nameKa: 'ბარიუმის სილიკატი', color: 'თეთრი ნალექი' },
  'Ba²⁺_PO₄³⁻': { state: 'insoluble', formula: 'Ba₃(PO₄)₂', nameKa: 'ბარიუმის ფოსფატი', color: 'თეთრი ნალექი' },
  'Ba²⁺_CH₃COO⁻': { state: 'soluble', formula: 'Ba(CH₃COO)₂', nameKa: 'ბარიუმის აცეტატი' },

  // Ca2+
  'Ca²⁺_OH⁻': { state: 'sparingly', formula: 'Ca(OH)₂', nameKa: 'კალციუმის ჰიდროქსიდი (ჩამქრალი კირი, კირწყალი)', description: 'მცირედ ხსნადია; გამჭვირვალე ხსნარს კირწყალი ეწოდება' },
  'Ca²⁺_F⁻': { state: 'insoluble', formula: 'CaF₂', nameKa: 'კალციუმის ფტორიდი (ფლუორიტი)', color: 'თეთრი ნალექი' },
  'Ca²⁺_Cl⁻': { state: 'soluble', formula: 'CaCl₂', nameKa: 'კალციუმის ქლორიდი' },
  'Ca²⁺_Br⁻': { state: 'soluble', formula: 'CaBr₂', nameKa: 'კალციუმის ბრომიდი' },
  'Ca²⁺_I⁻': { state: 'soluble', formula: 'CaI₂', nameKa: 'კალციუმის იოდიდი' },
  'Ca²⁺_S²⁻': { state: 'sparingly', formula: 'CaS', nameKa: 'კალციუმის სულფიდი' },
  'Ca²⁺_SO₃²⁻': { state: 'insoluble', formula: 'CaSO₃', nameKa: 'კალციუმის სულფიტი', color: 'თეთრი ნალექი' },
  'Ca²⁺_SO₄²⁻': { state: 'sparingly', formula: 'CaSO₄', nameKa: 'კალციუმის სულფატი (თაბაშირი)', description: 'მცირედ ხსნადი მარილი (სიხისტის მიზეზი)' },
  'Ca²⁺_NO₃⁻': { state: 'soluble', formula: 'Ca(NO₃)₂', nameKa: 'კალციუმის ნიტრატი (ნორვეგიული გვარჯილა)' },
  'Ca²⁺_CO₃²⁻': { state: 'insoluble', formula: 'CaCO₃', nameKa: 'კალციუმის კარბონატი (ცარცი, კირქვა, მარმარილო)', color: 'თეთრი ნალექი' },
  'Ca²⁺_SiO₃²⁻': { state: 'insoluble', formula: 'CaSiO₃', nameKa: 'კალციუმის სილიკატი', color: 'თეთრი ნალექი' },
  'Ca²⁺_PO₄³⁻': { state: 'insoluble', formula: 'Ca₃(PO₄)₂', nameKa: 'კალციუმის ფოსფატი (ფოსფორიტი)', color: 'თეთრი ნალექი' },
  'Ca²⁺_CH₃COO⁻': { state: 'soluble', formula: 'Ca(CH₃COO)₂', nameKa: 'კალციუმის აცეტატი' },

  // Mg2+
  'Mg²⁺_OH⁻': { state: 'insoluble', formula: 'Mg(OH)₂', nameKa: 'მაგნიუმის ჰიდროქსიდი (მაგნეზიის რძე)', color: 'თეთრი ჟელესებრი ნალექი' },
  'Mg²⁺_F⁻': { state: 'insoluble', formula: 'MgF₂', nameKa: 'მაგნიუმის ფტორიდი', color: 'თეთრი ნალექი' },
  'Mg²⁺_Cl⁻': { state: 'soluble', formula: 'MgCl₂', nameKa: 'მაგნიუმის ქლორიდი' },
  'Mg²⁺_Br⁻': { state: 'soluble', formula: 'MgBr₂', nameKa: 'მაგნიუმის ბრომიდი' },
  'Mg²⁺_I⁻': { state: 'soluble', formula: 'MgI₂', nameKa: 'მაგნიუმის იოდიდი' },
  'Mg²⁺_S²⁻': { state: 'decomposes', formula: 'MgS', nameKa: 'მაგნიუმის სულფიდი', description: 'განიცდის ჰიდროლიზს' },
  'Mg²⁺_SO₃²⁻': { state: 'sparingly', formula: 'MgSO₃', nameKa: 'მაგნიუმის სულფიტი' },
  'Mg²⁺_SO₄²⁻': { state: 'soluble', formula: 'MgSO₄', nameKa: 'მაგნიუმის სულფატი (ინგლისური მარილი)' },
  'Mg²⁺_NO₃⁻': { state: 'soluble', formula: 'Mg(NO₃)₂', nameKa: 'მაგნიუმის ნიტრატი' },
  'Mg²⁺_CO₃²⁻': { state: 'sparingly', formula: 'MgCO₃', nameKa: 'მაგნიუმის კარბონატი (მაგნეზიტი)' },
  'Mg²⁺_SiO₃²⁻': { state: 'insoluble', formula: 'MgSiO₃', nameKa: 'მაგნიუმის სილიკატი', color: 'თეთრი ნალექი' },
  'Mg²⁺_PO₄³⁻': { state: 'insoluble', formula: 'Mg₃(PO₄)₂', nameKa: 'მაგნიუმის ფოსფატი', color: 'თეთრი ნალექი' },
  'Mg²⁺_CH₃COO⁻': { state: 'soluble', formula: 'Mg(CH₃COO)₂', nameKa: 'მაგნიუმის აცეტატი' },

  // Al3+
  'Al³⁺_OH⁻': { state: 'insoluble', formula: 'Al(OH)₃', nameKa: 'ალუმინის ჰიდროქსიდი', color: 'თეთრი ლაბისებრი ამფოტერული ნალექი', description: 'იხსნება როგორც მჟავებში, ისე ტუტეების სიჭარბეში' },
  'Al³⁺_F⁻': { state: 'sparingly', formula: 'AlF₃', nameKa: 'ალუმინის ფტორიდი' },
  'Al³⁺_Cl⁻': { state: 'soluble', formula: 'AlCl₃', nameKa: 'ალუმინის ქლორიდი' },
  'Al³⁺_Br⁻': { state: 'soluble', formula: 'AlBr₃', nameKa: 'ალუმინის ბრომიდი' },
  'Al³⁺_I⁻': { state: 'soluble', formula: 'AlI₃', nameKa: 'ალუმინის იოდიდი' },
  'Al³⁺_S²⁻': { state: 'decomposes', formula: 'Al₂S₃', nameKa: 'ალუმინის სულფიდი', description: 'წყალში სრულად იშლება: Al(OH)₃ ↓ + H₂S ↑' },
  'Al³⁺_SO₃²⁻': { state: 'decomposes', formula: 'Al₂(SO₃)₃', nameKa: 'ალუმინის სულფიტი', description: 'განიცდის შეუქცევად ჰიდროლიზს' },
  'Al³⁺_SO₄²⁻': { state: 'soluble', formula: 'Al₂(SO₄)₃', nameKa: 'ალუმინის სულფატი' },
  'Al³⁺_NO₃⁻': { state: 'soluble', formula: 'Al(NO₃)₃', nameKa: 'ალუმინის ნიტრატი' },
  'Al³⁺_CO₃²⁻': { state: 'decomposes', formula: 'Al₂(CO₃)₃', nameKa: 'ალუმინის კარბონატი', description: 'წყალში არ არსებობს: Al(OH)₃ ↓ + CO₂ ↑' },
  'Al³⁺_SiO₃²⁻': { state: 'insoluble', formula: 'Al₂(SiO₃)₃', nameKa: 'ალუმინის სილიკატი', color: 'თეთრი ნალექი' },
  'Al³⁺_PO₄³⁻': { state: 'insoluble', formula: 'AlPO₄', nameKa: 'ალუმინის ფოსფატი', color: 'თეთრი ნალექი' },
  'Al³⁺_CH₃COO⁻': { state: 'soluble', formula: 'Al(CH₃COO)₃', nameKa: 'ალუმინის აცეტატი' },

  // Cr3+
  'Cr³⁺_OH⁻': { state: 'insoluble', formula: 'Cr(OH)₃', nameKa: 'ქრომის(III) ჰიდროქსიდი', color: 'მორუხო-მწვანე ნალექი', description: 'ამფოტერულია' },
  'Cr³⁺_F⁻': { state: 'insoluble', formula: 'CrF₃', nameKa: 'ქრომის(III) ფტორიდი', color: 'მწვანე ნალექი' },
  'Cr³⁺_Cl⁻': { state: 'soluble', formula: 'CrCl₃', nameKa: 'ქრომის(III) ქლორიდი' },
  'Cr³⁺_Br⁻': { state: 'soluble', formula: 'CrBr₃', nameKa: 'ქრომის(III) ბრომიდი' },
  'Cr³⁺_I⁻': { state: 'soluble', formula: 'CrI₃', nameKa: 'ქრომის(III) იოდიდი' },
  'Cr³⁺_S²⁻': { state: 'decomposes', formula: 'Cr₂S₃', nameKa: 'ქრომის(III) სულფიდი', description: 'სრული ჰიდროლიზი წყალში' },
  'Cr³⁺_SO₃²⁻': { state: 'decomposes', formula: 'Cr₂(SO₃)₃', nameKa: 'ქრომის(III) სულფიტი' },
  'Cr³⁺_SO₄²⁻': { state: 'soluble', formula: 'Cr₂(SO₄)₃', nameKa: 'ქრომის(III) სულფატი' },
  'Cr³⁺_NO₃⁻': { state: 'soluble', formula: 'Cr(NO₃)₃', nameKa: 'ქრომის(III) ნიტრატი' },
  'Cr³⁺_CO₃²⁻': { state: 'decomposes', formula: 'Cr₂(CO₃)₃', nameKa: 'ქრომის(III) კარბონატი', description: 'არ არსებობს წყალში' },
  'Cr³⁺_SiO₃²⁻': { state: 'insoluble', formula: 'Cr₂(SiO₃)₃', nameKa: 'ქრომის(III) სილიკატი', color: 'მწვანე ნალექი' },
  'Cr³⁺_PO₄³⁻': { state: 'insoluble', formula: 'CrPO₄', nameKa: 'ქრომის(III) ფოსფატი', color: 'მწვანე ნალექი' },
  'Cr³⁺_CH₃COO⁻': { state: 'soluble', formula: 'Cr(CH₃COO)₃', nameKa: 'ქრომის(III) აცეტატი' },

  // Fe2+
  'Fe²⁺_OH⁻': { state: 'insoluble', formula: 'Fe(OH)₂', nameKa: 'რკინის(II) ჰიდროქსიდი', color: 'მომწვანო-თეთრი ნალექი', description: 'ჰაერზე სწრაფად მუქდება და გადადის მურა Fe(OH)₃-ში' },
  'Fe²⁺_F⁻': { state: 'sparingly', formula: 'FeF₂', nameKa: 'რკინის(II) ფტორიდი' },
  'Fe²⁺_Cl⁻': { state: 'soluble', formula: 'FeCl₂', nameKa: 'რკინის(II) ქლორიდი' },
  'Fe²⁺_Br⁻': { state: 'soluble', formula: 'FeBr₂', nameKa: 'რკინის(II) ბრომიდი' },
  'Fe²⁺_I⁻': { state: 'soluble', formula: 'FeI₂', nameKa: 'რკინის(II) იოდიდი' },
  'Fe²⁺_S²⁻': { state: 'insoluble', formula: 'FeS', nameKa: 'რკინის(II) სულფიდი', color: 'შავი ნალექი' },
  'Fe²⁺_SO₃²⁻': { state: 'insoluble', formula: 'FeSO₃', nameKa: 'რკინის(II) სულფიტი', color: 'თეთრი ნალექი' },
  'Fe²⁺_SO₄²⁻': { state: 'soluble', formula: 'FeSO₄', nameKa: 'რკინის(II) სულფატი (რკინის კუპოროსი)' },
  'Fe²⁺_NO₃⁻': { state: 'soluble', formula: 'Fe(NO₃)₂', nameKa: 'რკინის(II) ნიტრატი' },
  'Fe²⁺_CO₃²⁻': { state: 'insoluble', formula: 'FeCO₃', nameKa: 'რკინის(II) კარბონატი (სიდერიტი)', color: 'თეთრი/მორუხო ნალექი' },
  'Fe²⁺_SiO₃²⁻': { state: 'insoluble', formula: 'FeSiO₃', nameKa: 'რკინის(II) სილიკატი', color: 'მორუხო ნალექი' },
  'Fe²⁺_PO₄³⁻': { state: 'insoluble', formula: 'Fe₃(PO₄)₂', nameKa: 'რკინის(II) ფოსფატი (ვივიანიტი)', color: 'მორუხო-ცისფერი ნალექი' },
  'Fe²⁺_CH₃COO⁻': { state: 'soluble', formula: 'Fe(CH₃COO)₂', nameKa: 'რკინის(II) აცეტატი' },

  // Fe3+
  'Fe³⁺_OH⁻': { state: 'insoluble', formula: 'Fe(OH)₃', nameKa: 'რკინის(III) ჰიდროქსიდი', color: 'მურა-ჟანგისფერი წითელი ნალექი', description: 'ხარისხობრივი რეაქცია რკინის (III) იონზე!' },
  'Fe³⁺_F⁻': { state: 'sparingly', formula: 'FeF₃', nameKa: 'რკინის(III) ფტორიდი' },
  'Fe³⁺_Cl⁻': { state: 'soluble', formula: 'FeCl₃', nameKa: 'რკინის(III) ქლორიდი', description: 'მურა-ყვითელი ხსნარი' },
  'Fe³⁺_Br⁻': { state: 'soluble', formula: 'FeBr₃', nameKa: 'რკინის(III) ბრომიდი' },
  'Fe³⁺_I⁻': { state: 'decomposes', formula: 'FeI₃', nameKa: 'რკინის(III) იოდიდი', description: 'არამდგრადია, რედოქს-დაშლა: 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂' },
  'Fe³⁺_S²⁻': { state: 'decomposes', formula: 'Fe₂S₃', nameKa: 'რკინის(III) სულფიდი', description: 'წყალში განიცდის ჰიდროლიზს/რედოქსს' },
  'Fe³⁺_SO₃²⁻': { state: 'decomposes', formula: 'Fe₂(SO₃)₃', nameKa: 'რკინის(III) სულფიტი' },
  'Fe³⁺_SO₄²⁻': { state: 'soluble', formula: 'Fe₂(SO₄)₃', nameKa: 'რკინის(III) სულფატი' },
  'Fe³⁺_NO₃⁻': { state: 'soluble', formula: 'Fe(NO₃)₃', nameKa: 'რკინის(III) ნიტრატი' },
  'Fe³⁺_CO₃²⁻': { state: 'decomposes', formula: 'Fe₂(CO₃)₃', nameKa: 'რკინის(III) კარბონატი', description: 'წყალში არ არსებობს: Fe(OH)₃ ↓ + CO₂ ↑' },
  'Fe³⁺_SiO₃²⁻': { state: 'insoluble', formula: 'Fe₂(SiO₃)₃', nameKa: 'რკინის(III) სილიკატი', color: 'მურა ნალექი' },
  'Fe³⁺_PO₄³⁻': { state: 'insoluble', formula: 'FePO₄', nameKa: 'რკინის(III) ფოსფატი', color: 'ყვითელ-მურა ნალექი' },
  'Fe³⁺_CH₃COO⁻': { state: 'soluble', formula: 'Fe(CH₃COO)₃', nameKa: 'რკინის(III) აცეტატი', description: 'მოწითალო-მურა ხსნარი' },

  // Zn2+
  'Zn²⁺_OH⁻': { state: 'insoluble', formula: 'Zn(OH)₂', nameKa: 'თუთიის ჰიდროქსიდი', color: 'თეთრი ამფოტერული ნალექი', description: 'იხსნება მჟავებშიც და ტუტეების სიჭარბეშიც' },
  'Zn²⁺_F⁻': { state: 'sparingly', formula: 'ZnF₂', nameKa: 'თუთიის ფტორიდი' },
  'Zn²⁺_Cl⁻': { state: 'soluble', formula: 'ZnCl₂', nameKa: 'თუთიის ქლორიდი' },
  'Zn²⁺_Br⁻': { state: 'soluble', formula: 'ZnBr₂', nameKa: 'თუთიის ბრომიდი' },
  'Zn²⁺_I⁻': { state: 'soluble', formula: 'ZnI₂', nameKa: 'თუთიის იოდიდი' },
  'Zn²⁺_S²⁻': { state: 'insoluble', formula: 'ZnS', nameKa: 'თუთიის სულფიდი (სფალერიტი)', color: 'თეთრი ნალექი', description: 'ერთადერთი თეთრი სულფიდი!' },
  'Zn²⁺_SO₃²⁻': { state: 'sparingly', formula: 'ZnSO₃', nameKa: 'თუთიის სულფიტი' },
  'Zn²⁺_SO₄²⁻': { state: 'soluble', formula: 'ZnSO₄', nameKa: 'თუთიის სულფატი' },
  'Zn²⁺_NO₃⁻': { state: 'soluble', formula: 'Zn(NO₃)₂', nameKa: 'თუთიის ნიტრატი' },
  'Zn²⁺_CO₃²⁻': { state: 'insoluble', formula: 'ZnCO₃', nameKa: 'თუთიის კარბონატი', color: 'თეთრი ნალექი' },
  'Zn²⁺_SiO₃²⁻': { state: 'insoluble', formula: 'ZnSiO₃', nameKa: 'თუთიის სილიკატი', color: 'თეთრი ნალექი' },
  'Zn²⁺_PO₄³⁻': { state: 'insoluble', formula: 'Zn₃(PO₄)₂', nameKa: 'თუთიის ფოსფატი', color: 'თეთრი ნალექი' },
  'Zn²⁺_CH₃COO⁻': { state: 'soluble', formula: 'Zn(CH₃COO)₂', nameKa: 'თუთიის აცეტატი' },

  // Cu2+
  'Cu²⁺_OH⁻': { state: 'insoluble', formula: 'Cu(OH)₂', nameKa: 'სპილენძის(II) ჰიდროქსიდი', color: 'ცისფერი ჟელესებრი ნალექი', description: 'გაცხელებისას შავდება (იშლება CuO-ად და H₂O-ად)' },
  'Cu²⁺_F⁻': { state: 'sparingly', formula: 'CuF₂', nameKa: 'სპილენძის(II) ფტორიდი' },
  'Cu²⁺_Cl⁻': { state: 'soluble', formula: 'CuCl₂', nameKa: 'სპილენძის(II) ქლორიდი', description: 'ცისფერ-მომწვანო ხსნარი' },
  'Cu²⁺_Br⁻': { state: 'soluble', formula: 'CuBr₂', nameKa: 'სპილენძის(II) ბრომიდი' },
  'Cu²⁺_I⁻': { state: 'decomposes', formula: 'CuI₂', nameKa: 'სპილენძის(II) იოდიდი', description: 'რედოქს-დაშლა: 2Cu²⁺ + 4I⁻ → 2CuI ↓ + I₂' },
  'Cu²⁺_S²⁻': { state: 'insoluble', formula: 'CuS', nameKa: 'სპილენძის(II) სულფიდი', color: 'შავი ნალექი' },
  'Cu²⁺_SO₃²⁻': { state: 'insoluble', formula: 'CuSO₃', nameKa: 'სპილენძის(II) სულფიტი', color: 'მოწითალო ნალექი' },
  'Cu²⁺_SO₄²⁻': { state: 'soluble', formula: 'CuSO₄', nameKa: 'სპილენძის(II) სულფატი (შაბიამანი)', description: 'კაშკაშა ლურჯი ხსნარი' },
  'Cu²⁺_NO₃⁻': { state: 'soluble', formula: 'Cu(NO₃)₂', nameKa: 'სპილენძის(II) ნიტრატი', description: 'ლურჯი ხსნარი' },
  'Cu²⁺_CO₃²⁻': { state: 'insoluble', formula: 'CuCO₃', nameKa: 'სპილენძის(II) კარბონატი (მალაქიტი)', color: 'მწვანე ნალექი' },
  'Cu²⁺_SiO₃²⁻': { state: 'insoluble', formula: 'CuSiO₃', nameKa: 'სპილენძის(II) სილიკატი', color: 'ცისფერი ნალექი' },
  'Cu²⁺_PO₄³⁻': { state: 'insoluble', formula: 'Cu₃(PO₄)₂', nameKa: 'სპილენძის(II) ფოსფატი', color: 'ცისფერი ნალექი' },
  'Cu²⁺_CH₃COO⁻': { state: 'soluble', formula: 'Cu(CH₃COO)₂', nameKa: 'სპილენძის(II) აცეტატი (იარი)' },

  // Ag+
  'Ag⁺_OH⁻': { state: 'decomposes', formula: 'AgOH', nameKa: 'ვერცხლის ჰიდროქსიდი', description: 'მყისიერად იშლება: 2AgOH → Ag₂O ↓ (მურა-შავი) + H₂O' },
  'Ag⁺_F⁻': { state: 'soluble', formula: 'AgF', nameKa: 'ვერცხლის ფტორიდი', description: 'ერთადერთი ხსნადი ვერცხლის ჰალოგენიდი!' },
  'Ag⁺_Cl⁻': { state: 'insoluble', formula: 'AgCl', nameKa: 'ვერცხლის ქლორიდი', color: 'თეთრი ხაჭოსებრი ნალექი', description: 'ხარისხობრივი რეაქცია ქლორიდ-იონზე Cl⁻! სინათლეზე მუქდება.' },
  'Ag⁺_Br⁻': { state: 'insoluble', formula: 'AgBr', nameKa: 'ვერცხლის ბრომიდი', color: 'ღია ყვითელი ნალექი', description: 'ხარისხობრივი რეაქცია ბრომიდ-იონზე Br⁻!' },
  'Ag⁺_I⁻': { state: 'insoluble', formula: 'AgI', nameKa: 'ვერცხლის იოდიდი', color: 'კაშკაშა ყვითელი ნალექი', description: 'ხარისხობრივი რეაქცია იოდიდ-იონზე I⁻!' },
  'Ag⁺_S²⁻': { state: 'insoluble', formula: 'Ag₂S', nameKa: 'ვერცხლის სულფიდი', color: 'შავი ნალექი', description: 'ვერცხლის გამუქების მიზეზი ჰაერზე' },
  'Ag⁺_SO₃²⁻': { state: 'insoluble', formula: 'Ag₂SO₃', nameKa: 'ვერცხლის სულფიტი', color: 'თეთრი ნალექი' },
  'Ag⁺_SO₄²⁻': { state: 'sparingly', formula: 'Ag₂SO₄', nameKa: 'ვერცხლის სულფატი' },
  'Ag⁺_NO₃⁻': { state: 'soluble', formula: 'AgNO₃', nameKa: 'ვერცხლის ნიტრატი (ლაპისი)', description: 'უმნიშვნელოვანესი ხსნადი ვერცხლის მარილი და რეაქტივი' },
  'Ag⁺_CO₃²⁻': { state: 'insoluble', formula: 'Ag₂CO₃', nameKa: 'ვერცხლის კარბონატი', color: 'მოყვითალო ნალექი' },
  'Ag⁺_SiO₃²⁻': { state: 'insoluble', formula: 'Ag₂SiO₃', nameKa: 'ვერცხლის სილიკატი', color: 'ყვითელი ნალექი' },
  'Ag⁺_PO₄³⁻': { state: 'insoluble', formula: 'Ag₃PO₄', nameKa: 'ვერცხლის ფოსფატი', color: 'კაშკაშა ყვითელი ნალექი', description: 'ხარისხობრივი რეაქცია ფოსფატ-იონზე PO₄³⁻!' },
  'Ag⁺_CH₃COO⁻': { state: 'sparingly', formula: 'CH₃COOAg', nameKa: 'ვერცხლის აცეტატი' },

  // Pb2+
  'Pb²⁺_OH⁻': { state: 'insoluble', formula: 'Pb(OH)₂', nameKa: 'ტყვიის(II) ჰიდროქსიდი', color: 'თეთრი ამფოტერული ნალექი' },
  'Pb²⁺_F⁻': { state: 'sparingly', formula: 'PbF₂', nameKa: 'ტყვიის(II) ფტორიდი' },
  'Pb²⁺_Cl⁻': { state: 'sparingly', formula: 'PbCl₂', nameKa: 'ტყვიის(II) ქლორიდი', color: 'თეთრი ნემსისებრი კრისტალები', description: 'ცივ წყალში უხსნადია, ცხელ წყალში სრულად იხსნება!' },
  'Pb²⁺_Br⁻': { state: 'sparingly', formula: 'PbBr₂', nameKa: 'ტყვიის(II) ბრომიდი', color: 'თეთრი ნალექი' },
  'Pb²⁺_I⁻': { state: 'insoluble', formula: 'PbI₂', nameKa: 'ტყვიის(II) იოდიდი', color: 'ოქროსფერი მბზინავი ქერცლები („ოქროს წვიმა“)', description: 'განთქმული სადემონსტრაციო რეაქცია! ცხელ წყალში იხსნება, გაცივებისას ილექება ოქროსფერ კრისტალებად.' },
  'Pb²⁺_S²⁻': { state: 'insoluble', formula: 'PbS', nameKa: 'ტყვიის(II) სულფიდი (გალენიტი)', color: 'შავი მძიმე ნალექი' },
  'Pb²⁺_SO₃²⁻': { state: 'insoluble', formula: 'PbSO₃', nameKa: 'ტყვიის(II) სულფიტი', color: 'თეთრი ნალექი' },
  'Pb²⁺_SO₄²⁻': { state: 'insoluble', formula: 'PbSO₄', nameKa: 'ტყვიის(II) სულფატი', color: 'თეთრი მძიმე ნალექი' },
  'Pb²⁺_NO₃⁻': { state: 'soluble', formula: 'Pb(NO₃)₂', nameKa: 'ტყვიის(II) ნიტრატი', description: 'ხსნადი ტყვიის მარილი' },
  'Pb²⁺_CO₃²⁻': { state: 'insoluble', formula: 'PbCO₃', nameKa: 'ტყვიის(II) კარბონატი (თეთრა)', color: 'თეთრი ნალექი' },
  'Pb²⁺_SiO₃²⁻': { state: 'insoluble', formula: 'PbSiO₃', nameKa: 'ტყვიის(II) სილიკატი', color: 'თეთრი ნალექი' },
  'Pb²⁺_PO₄³⁻': { state: 'insoluble', formula: 'Pb₃(PO₄)₂', nameKa: 'ტყვიის(II) ფოსფატი', color: 'თეთრი ნალექი' },
  'Pb²⁺_CH₃COO⁻': { state: 'soluble', formula: 'Pb(CH₃COO)₂', nameKa: 'ტყვიის(II) აცეტატი („ტყვიის შაქარი“)', description: 'ტკბილი გემოსი, თუმცა ძლიერ ტოქსიკური' },
};
