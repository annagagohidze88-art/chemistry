export interface FormulaSuggestion {
  formula: string; // Plain formula for calculation, e.g. "NaCl", "CuSO4.5H2O"
  displayFormula: string; // Formatted formula with subscripts, e.g. "NaCl", "CuSO₄·5H₂O"
  nameKa: string; // Georgian name, e.g. "ნატრიუმის ქლორიდი (სუფრის მარილი)"
  nameEn?: string; // English name
  category: 'მარილი' | 'ტუტე/ფუძე' | 'მჟავა' | 'ოქსიდი' | 'ორგანული' | 'კრისტალჰიდრატი' | 'მარტივი ნივთიერება' | 'სხვა';
  commonElements: string[]; // Elements contained, for smart matching
}

export const POPULAR_FORMULAS: FormulaSuggestion[] = [
  // წყალი და წყალბადის/ჟანგბადის ნაერთები
  { formula: 'H2O', displayFormula: 'H₂O', nameKa: 'წყალი (დიჰიდროგენის მონოქსიდი)', nameEn: 'Water', category: 'ოქსიდი', commonElements: ['H', 'O'] },
  { formula: 'H2O2', displayFormula: 'H₂O₂', nameKa: 'წყალბადის პეროქსიდი (პერჰიდროლი)', nameEn: 'Hydrogen peroxide', category: 'სხვა', commonElements: ['H', 'O'] },
  { formula: 'O2', displayFormula: 'O₂', nameKa: 'ჟანგბადი (ორატომიანი აირი)', nameEn: 'Oxygen', category: 'მარტივი ნივთიერება', commonElements: ['O'] },
  { formula: 'O3', displayFormula: 'O₃', nameKa: 'ოზონი', nameEn: 'Ozone', category: 'მარტივი ნივთიერება', commonElements: ['O'] },
  { formula: 'H2', displayFormula: 'H₂', nameKa: 'წყალბადი (ორატომიანი აირი)', nameEn: 'Hydrogen gas', category: 'მარტივი ნივთიერება', commonElements: ['H'] },
  { formula: 'N2', displayFormula: 'N₂', nameKa: 'აზოტი (ორატომიანი აირი)', nameEn: 'Nitrogen gas', category: 'მარტივი ნივთიერება', commonElements: ['N'] },
  { formula: 'Cl2', displayFormula: 'Cl₂', nameKa: 'ქლორი (ორატომიანი აირი)', nameEn: 'Chlorine gas', category: 'მარტივი ნივთიერება', commonElements: ['Cl'] },
  { formula: 'Br2', displayFormula: 'Br₂', nameKa: 'ბრომი (თხევადი ჰალოგენი)', nameEn: 'Bromine', category: 'მარტივი ნივთიერება', commonElements: ['Br'] },
  { formula: 'I2', displayFormula: 'I₂', nameKa: 'იოდი (კრისტალური ჰალოგენი)', nameEn: 'Iodine', category: 'მარტივი ნივთიერება', commonElements: ['I'] },

  // ნატრიუმის (Na) ნაერთები
  { formula: 'NaCl', displayFormula: 'NaCl', nameKa: 'ნატრიუმის ქლორიდი (სუფრის მარილი)', nameEn: 'Sodium chloride', category: 'მარილი', commonElements: ['Na', 'Cl'] },
  { formula: 'NaOH', displayFormula: 'NaOH', nameKa: 'ნატრიუმის ჰიდროქსიდი (მწვავე ტუტე)', nameEn: 'Sodium hydroxide', category: 'ტუტე/ფუძე', commonElements: ['Na', 'O', 'H'] },
  { formula: 'NaHCO3', displayFormula: 'NaHCO₃', nameKa: 'ნატრიუმის ჰიდროკარბონატი (სასმელი სოდა)', nameEn: 'Sodium bicarbonate', category: 'მარილი', commonElements: ['Na', 'H', 'C', 'O'] },
  { formula: 'Na2CO3', displayFormula: 'Na₂CO₃', nameKa: 'ნატრიუმის კარბონატი (კალცინირებული სოდა)', nameEn: 'Sodium carbonate', category: 'მარილი', commonElements: ['Na', 'C', 'O'] },
  { formula: 'Na2CO3.10H2O', displayFormula: 'Na₂CO₃·10H₂O', nameKa: 'კრისტალური სოდა (დეკაჰიდრატი)', nameEn: 'Washing soda', category: 'კრისტალჰიდრატი', commonElements: ['Na', 'C', 'O', 'H'] },
  { formula: 'Na2SO4', displayFormula: 'Na₂SO₄', nameKa: 'ნატრიუმის სულფატი', nameEn: 'Sodium sulfate', category: 'მარილი', commonElements: ['Na', 'S', 'O'] },
  { formula: 'Na2SO4.10H2O', displayFormula: 'Na₂SO₄·10H₂O', nameKa: 'გლაუბერის მარილი (მირაბილიტი)', nameEn: 'Glauber salt', category: 'კრისტალჰიდრატი', commonElements: ['Na', 'S', 'O', 'H'] },
  { formula: 'NaNO3', displayFormula: 'NaNO₃', nameKa: 'ნატრიუმის ნიტრატი (ჩილეს გვარჯილა)', nameEn: 'Sodium nitrate', category: 'მარილი', commonElements: ['Na', 'N', 'O'] },
  { formula: 'NaNO2', displayFormula: 'NaNO₂', nameKa: 'ნატრიუმის ნიტრიტი', nameEn: 'Sodium nitrite', category: 'მარილი', commonElements: ['Na', 'N', 'O'] },
  { formula: 'Na3PO4', displayFormula: 'Na₃PO₄', nameKa: 'ნატრიუმის ორთოფოსფატი', nameEn: 'Trisodium phosphate', category: 'მარილი', commonElements: ['Na', 'P', 'O'] },
  { formula: 'Na2HPO4', displayFormula: 'Na₂HPO₄', nameKa: 'დინატრიუმის ჰიდროფოსფატი', nameEn: 'Disodium phosphate', category: 'მარილი', commonElements: ['Na', 'H', 'P', 'O'] },
  { formula: 'NaH2PO4', displayFormula: 'NaH₂PO₄', nameKa: 'ნატრიუმის დიჰიდროფოსფატი', nameEn: 'Monosodium phosphate', category: 'მარილი', commonElements: ['Na', 'H', 'P', 'O'] },
  { formula: 'Na2O', displayFormula: 'Na₂O', nameKa: 'ნატრიუმის ოქსიდი', nameEn: 'Sodium oxide', category: 'ოქსიდი', commonElements: ['Na', 'O'] },
  { formula: 'Na2O2', displayFormula: 'Na₂O₂', nameKa: 'ნატრიუმის პეროქსიდი', nameEn: 'Sodium peroxide', category: 'სხვა', commonElements: ['Na', 'O'] },
  { formula: 'NaH', displayFormula: 'NaH', nameKa: 'ნატრიუმის ჰიდრიდი', nameEn: 'Sodium hydride', category: 'სხვა', commonElements: ['Na', 'H'] },
  { formula: 'Na2S', displayFormula: 'Na₂S', nameKa: 'ნატრიუმის სულფიდი', nameEn: 'Sodium sulfide', category: 'მარილი', commonElements: ['Na', 'S'] },
  { formula: 'Na2SO3', displayFormula: 'Na₂SO₃', nameKa: 'ნატრიუმის სულფიტი', nameEn: 'Sodium sulfite', category: 'მარილი', commonElements: ['Na', 'S', 'O'] },
  { formula: 'Na2S2O3', displayFormula: 'Na₂S₂O₃', nameKa: 'ნატრიუმის თიოსულფატი (ფიქსაჟი)', nameEn: 'Sodium thiosulfate', category: 'მარილი', commonElements: ['Na', 'S', 'O'] },
  { formula: 'NaBr', displayFormula: 'NaBr', nameKa: 'ნატრიუმის ბრომიდი', nameEn: 'Sodium bromide', category: 'მარილი', commonElements: ['Na', 'Br'] },
  { formula: 'NaI', displayFormula: 'NaI', nameKa: 'ნატრიუმის იოდიდი', nameEn: 'Sodium iodide', category: 'მარილი', commonElements: ['Na', 'I'] },
  { formula: 'NaClO', displayFormula: 'NaClO', nameKa: 'ნატრიუმის ჰიპოქლორიტი (ჟაველის წყალი)', nameEn: 'Sodium hypochlorite', category: 'მარილი', commonElements: ['Na', 'Cl', 'O'] },
  { formula: 'CH3COONa', displayFormula: 'CH₃COONa', nameKa: 'ნატრიუმის აცეტატი', nameEn: 'Sodium acetate', category: 'ორგანული', commonElements: ['C', 'H', 'O', 'Na'] },
  { formula: 'NaAlO2', displayFormula: 'NaAlO₂', nameKa: 'ნატრიუმის მეტაალუმინატი', nameEn: 'Sodium aluminate', category: 'მარილი', commonElements: ['Na', 'Al', 'O'] },
  { formula: 'Na[Al(OH)4]', displayFormula: 'Na[Al(OH)₄]', nameKa: 'ნატრიუმის ტეტრაჰიდროქსოალუმინატი', nameEn: 'Sodium tetrahydroxoaluminate', category: 'მარილი', commonElements: ['Na', 'Al', 'O', 'H'] },

  // მჟავები
  { formula: 'HCl', displayFormula: 'HCl', nameKa: 'მარილმჟავა (ქლორწყალბადმჟავა)', nameEn: 'Hydrochloric acid', category: 'მჟავა', commonElements: ['H', 'Cl'] },
  { formula: 'H2SO4', displayFormula: 'H₂SO₄', nameKa: 'გოგირდმჟავა', nameEn: 'Sulfuric acid', category: 'მჟავა', commonElements: ['H', 'S', 'O'] },
  { formula: 'HNO3', displayFormula: 'HNO₃', nameKa: 'აზოტმჟავა', nameEn: 'Nitric acid', category: 'მჟავა', commonElements: ['H', 'N', 'O'] },
  { formula: 'H3PO4', displayFormula: 'H₃PO₄', nameKa: 'ორთოფოსფორმჟავა', nameEn: 'Phosphoric acid', category: 'მჟავა', commonElements: ['H', 'P', 'O'] },
  { formula: 'H2SO3', displayFormula: 'H₂SO₃', nameKa: 'გოგირდოვანი მჟავა', nameEn: 'Sulfurous acid', category: 'მჟავა', commonElements: ['H', 'S', 'O'] },
  { formula: 'HNO2', displayFormula: 'HNO₂', nameKa: 'აზოტოვანი მჟავა', nameEn: 'Nitrous acid', category: 'მჟავა', commonElements: ['H', 'N', 'O'] },
  { formula: 'H2CO3', displayFormula: 'H₂CO₃', nameKa: 'ნახშირმჟავა', nameEn: 'Carbonic acid', category: 'მჟავა', commonElements: ['H', 'C', 'O'] },
  { formula: 'H2SiO3', displayFormula: 'H₂SiO₃', nameKa: 'სილიციუმმჟავა', nameEn: 'Silicic acid', category: 'მჟავა', commonElements: ['H', 'Si', 'O'] },
  { formula: 'HF', displayFormula: 'HF', nameKa: 'მინამჟავა (ფტორწყალბადმჟავა)', nameEn: 'Hydrofluoric acid', category: 'მჟავა', commonElements: ['H', 'F'] },
  { formula: 'HBr', displayFormula: 'HBr', nameKa: 'ბრომწყალბადმჟავა', nameEn: 'Hydrobromic acid', category: 'მჟავა', commonElements: ['H', 'Br'] },
  { formula: 'HI', displayFormula: 'HI', nameKa: 'იოდწყალბადმჟავა', nameEn: 'Hydroiodic acid', category: 'მჟავა', commonElements: ['H', 'I'] },
  { formula: 'H2S', displayFormula: 'H₂S', nameKa: 'გოგირდწყალბადმჟავა', nameEn: 'Hydrosulfuric acid', category: 'მჟავა', commonElements: ['H', 'S'] },
  { formula: 'HClO4', displayFormula: 'HClO₄', nameKa: 'ქლორმჟავა (პერქლორატი)', nameEn: 'Perchloric acid', category: 'მჟავა', commonElements: ['H', 'Cl', 'O'] },
  { formula: 'H3BO3', displayFormula: 'H₃BO₃', nameKa: 'ბორმჟავა', nameEn: 'Boric acid', category: 'მჟავა', commonElements: ['H', 'B', 'O'] },
  { formula: 'CH3COOH', displayFormula: 'CH₃COOH', nameKa: 'ძმარმჟავა (ეთანმჟავა)', nameEn: 'Acetic acid', category: 'ორგანული', commonElements: ['C', 'H', 'O'] },
  { formula: 'HCOOH', displayFormula: 'HCOOH', nameKa: 'ჭიანჭველმჟავა (მეთანმჟავა)', nameEn: 'Formic acid', category: 'ორგანული', commonElements: ['C', 'H', 'O'] },

  // კალიუმის (K) ნაერთები
  { formula: 'KOH', displayFormula: 'KOH', nameKa: 'კალიუმის ჰიდროქსიდი (მწვავე კალიუმი)', nameEn: 'Potassium hydroxide', category: 'ტუტე/ფუძე', commonElements: ['K', 'O', 'H'] },
  { formula: 'KCl', displayFormula: 'KCl', nameKa: 'კალიუმის ქლორიდი (სილვინი)', nameEn: 'Potassium chloride', category: 'მარილი', commonElements: ['K', 'Cl'] },
  { formula: 'KNO3', displayFormula: 'KNO₃', nameKa: 'კალიუმის ნიტრატი (ინდური გვარჯილა)', nameEn: 'Potassium nitrate', category: 'მარილი', commonElements: ['K', 'N', 'O'] },
  { formula: 'K2CO3', displayFormula: 'K₂CO₃', nameKa: 'კალიუმის კარბონატი (პოტაში)', nameEn: 'Potassium carbonate', category: 'მარილი', commonElements: ['K', 'C', 'O'] },
  { formula: 'KHCO3', displayFormula: 'KHCO₃', nameKa: 'კალიუმის ჰიდროკარბონატი', nameEn: 'Potassium bicarbonate', category: 'მარილი', commonElements: ['K', 'H', 'C', 'O'] },
  { formula: 'K2SO4', displayFormula: 'K₂SO₄', nameKa: 'კალიუმის სულფატი', nameEn: 'Potassium sulfate', category: 'მარილი', commonElements: ['K', 'S', 'O'] },
  { formula: 'KMnO4', displayFormula: 'KMnO₄', nameKa: 'კალიუმის პერმანგანატი (მარგანცოვკა)', nameEn: 'Potassium permanganate', category: 'მარილი', commonElements: ['K', 'Mn', 'O'] },
  { formula: 'K2Cr2O7', displayFormula: 'K₂Cr₂O₇', nameKa: 'კალიუმის დიქრომატი', nameEn: 'Potassium dichromate', category: 'მარილი', commonElements: ['K', 'Cr', 'O'] },
  { formula: 'K2CrO4', displayFormula: 'K₂CrO₄', nameKa: 'კალიუმის ქრომატი', nameEn: 'Potassium chromate', category: 'მარილი', commonElements: ['K', 'Cr', 'O'] },
  { formula: 'KClO3', displayFormula: 'KClO₃', nameKa: 'კალიუმის ქლორატი (ბერთოლეს მარილი)', nameEn: 'Potassium chlorate', category: 'მარილი', commonElements: ['K', 'Cl', 'O'] },
  { formula: 'KI', displayFormula: 'KI', nameKa: 'კალიუმის იოდიდი', nameEn: 'Potassium iodide', category: 'მარილი', commonElements: ['K', 'I'] },
  { formula: 'KBr', displayFormula: 'KBr', nameKa: 'კალიუმის ბრომიდი', nameEn: 'Potassium bromide', category: 'მარილი', commonElements: ['K', 'Br'] },
  { formula: 'K3PO4', displayFormula: 'K₃PO₄', nameKa: 'კალიუმის ფოსფატი', nameEn: 'Potassium phosphate', category: 'მარილი', commonElements: ['K', 'P', 'O'] },
  { formula: 'K2O', displayFormula: 'K₂O', nameKa: 'კალიუმის ოქსიდი', nameEn: 'Potassium oxide', category: 'ოქსიდი', commonElements: ['K', 'O'] },

  // კალციუმის (Ca) ნაერთები
  { formula: 'CaCO3', displayFormula: 'CaCO₃', nameKa: 'კალციუმის კარბონატი (კირქვა, ცარცი, მარმარილო)', nameEn: 'Calcium carbonate', category: 'მარილი', commonElements: ['Ca', 'C', 'O'] },
  { formula: 'CaO', displayFormula: 'CaO', nameKa: 'კალციუმის ოქსიდი (ჩაუმქრალი კირი)', nameEn: 'Calcium oxide', category: 'ოქსიდი', commonElements: ['Ca', 'O'] },
  { formula: 'Ca(OH)2', displayFormula: 'Ca(OH)₂', nameKa: 'კალციუმის ჰიდროქსიდი (ჩამქრალი კირი, კირწყალი)', nameEn: 'Calcium hydroxide', category: 'ტუტე/ფუძე', commonElements: ['Ca', 'O', 'H'] },
  { formula: 'CaCl2', displayFormula: 'CaCl₂', nameKa: 'კალციუმის ქლორიდი', nameEn: 'Calcium chloride', category: 'მარილი', commonElements: ['Ca', 'Cl'] },
  { formula: 'CaSO4', displayFormula: 'CaSO₄', nameKa: 'კალციუმის სულფატი (ანჰიდრიტი)', nameEn: 'Calcium sulfate', category: 'მარილი', commonElements: ['Ca', 'S', 'O'] },
  { formula: 'CaSO4.2H2O', displayFormula: 'CaSO₄·2H₂O', nameKa: 'თაბაშირი (გიფსი, დიჰიდრატი)', nameEn: 'Gypsum', category: 'კრისტალჰიდრატი', commonElements: ['Ca', 'S', 'O', 'H'] },
  { formula: 'Ca3(PO4)2', displayFormula: 'Ca₃(PO₄)₂', nameKa: 'კალციუმის ფოსფატი (ფოსფორიტი, აპატიტი)', nameEn: 'Calcium phosphate', category: 'მარილი', commonElements: ['Ca', 'P', 'O'] },
  { formula: 'Ca(NO3)2', displayFormula: 'Ca(NO₃)₂', nameKa: 'კალციუმის ნიტრატი (ნორვეგიული გვარჯილა)', nameEn: 'Calcium nitrate', category: 'მარილი', commonElements: ['Ca', 'N', 'O'] },
  { formula: 'Ca(HCO3)2', displayFormula: 'Ca(HCO₃)₂', nameKa: 'კალციუმის ჰიდროკარბონატი (დროებითი სიხისტე)', nameEn: 'Calcium bicarbonate', category: 'მარილი', commonElements: ['Ca', 'H', 'C', 'O'] },
  { formula: 'CaC2', displayFormula: 'CaC₂', nameKa: 'კალციუმის კარბიდი', nameEn: 'Calcium carbide', category: 'სხვა', commonElements: ['Ca', 'C'] },
  { formula: 'CaF2', displayFormula: 'CaF₂', nameKa: 'კალციუმის ფტორიდი (ფლუორიტი)', nameEn: 'Calcium fluoride', category: 'მარილი', commonElements: ['Ca', 'F'] },

  // სპილენძის (Cu) ნაერთები
  { formula: 'CuSO4', displayFormula: 'CuSO₄', nameKa: 'სპილენძის(II) სულფატი', nameEn: 'Copper(II) sulfate', category: 'მარილი', commonElements: ['Cu', 'S', 'O'] },
  { formula: 'CuSO4.5H2O', displayFormula: 'CuSO₄·5H₂O', nameKa: 'შაბიამანი (სპილენძის კუპოროსი)', nameEn: 'Copper sulfate pentahydrate', category: 'კრისტალჰიდრატი', commonElements: ['Cu', 'S', 'O', 'H'] },
  { formula: 'CuO', displayFormula: 'CuO', nameKa: 'სპილენძის(II) ოქსიდი (შავი ოქსიდი)', nameEn: 'Copper(II) oxide', category: 'ოქსიდი', commonElements: ['Cu', 'O'] },
  { formula: 'Cu2O', displayFormula: 'Cu₂O', nameKa: 'სპილენძის(I) ოქსიდი (წითელი ოქსიდი)', nameEn: 'Copper(I) oxide', category: 'ოქსიდი', commonElements: ['Cu', 'O'] },
  { formula: 'Cu(OH)2', displayFormula: 'Cu(OH)₂', nameKa: 'სპილენძის(II) ჰიდროქსიდი (ცისფერი ნალექი)', nameEn: 'Copper(II) hydroxide', category: 'ტუტე/ფუძე', commonElements: ['Cu', 'O', 'H'] },
  { formula: 'CuCl2', displayFormula: 'CuCl₂', nameKa: 'სპილენძის(II) ქლორიდი', nameEn: 'Copper(II) chloride', category: 'მარილი', commonElements: ['Cu', 'Cl'] },
  { formula: 'Cu(NO3)2', displayFormula: 'Cu(NO₃)₂', nameKa: 'სპილენძის(II) ნიტრატი', nameEn: 'Copper(II) nitrate', category: 'მარილი', commonElements: ['Cu', 'N', 'O'] },
  { formula: 'CuS', displayFormula: 'CuS', nameKa: 'სპილენძის(II) სულფიდი (შავი ნალექი)', nameEn: 'Copper(II) sulfide', category: 'მარილი', commonElements: ['Cu', 'S'] },

  // რკინის (Fe) ნაერთები
  { formula: 'Fe2O3', displayFormula: 'Fe₂O₃', nameKa: 'რკინის(III) ოქსიდი (ჟანგი, ჰემატიტი)', nameEn: 'Iron(III) oxide', category: 'ოქსიდი', commonElements: ['Fe', 'O'] },
  { formula: 'FeO', displayFormula: 'FeO', nameKa: 'რკინის(II) ოქსიდი', nameEn: 'Iron(II) oxide', category: 'ოქსიდი', commonElements: ['Fe', 'O'] },
  { formula: 'Fe3O4', displayFormula: 'Fe₃O₄', nameKa: 'რკინის ჟანგ-ჟანგი (მაგნეტიტი)', nameEn: 'Iron(II,III) oxide', category: 'ოქსიდი', commonElements: ['Fe', 'O'] },
  { formula: 'Fe(OH)2', displayFormula: 'Fe(OH)₂', nameKa: 'რკინის(II) ჰიდროქსიდი (მომწვანო-თეთრი)', nameEn: 'Iron(II) hydroxide', category: 'ტუტე/ფუძე', commonElements: ['Fe', 'O', 'H'] },
  { formula: 'Fe(OH)3', displayFormula: 'Fe(OH)₃', nameKa: 'რკინის(III) ჰიდროქსიდი (მურა-ჟანგისფერი)', nameEn: 'Iron(III) hydroxide', category: 'ტუტე/ფუძე', commonElements: ['Fe', 'O', 'H'] },
  { formula: 'FeSO4', displayFormula: 'FeSO₄', nameKa: 'რკინის(II) სულფატი', nameEn: 'Iron(II) sulfate', category: 'მარილი', commonElements: ['Fe', 'S', 'O'] },
  { formula: 'FeSO4.7H2O', displayFormula: 'FeSO₄·7H₂O', nameKa: 'რკინის კუპოროსი (ჰეპტაჰიდრატი)', nameEn: 'Iron sulfate heptahydrate', category: 'კრისტალჰიდრატი', commonElements: ['Fe', 'S', 'O', 'H'] },
  { formula: 'Fe2(SO4)3', displayFormula: 'Fe₂(SO₄)₃', nameKa: 'რკინის(III) სულფატი', nameEn: 'Iron(III) sulfate', category: 'მარილი', commonElements: ['Fe', 'S', 'O'] },
  { formula: 'FeCl2', displayFormula: 'FeCl₂', nameKa: 'რკინის(II) ქლორიდი', nameEn: 'Iron(II) chloride', category: 'მარილი', commonElements: ['Fe', 'Cl'] },
  { formula: 'FeCl3', displayFormula: 'FeCl₃', nameKa: 'რკინის(III) ქლორიდი', nameEn: 'Iron(III) chloride', category: 'მარილი', commonElements: ['Fe', 'Cl'] },
  { formula: 'FeS', displayFormula: 'FeS', nameKa: 'რკინის(II) სულფიდი', nameEn: 'Iron(II) sulfide', category: 'მარილი', commonElements: ['Fe', 'S'] },
  { formula: 'FeS2', displayFormula: 'FeS₂', nameKa: 'პირიტი (სულელთა ოქრო, რკინის დისულფიდი)', nameEn: 'Pyrite', category: 'მარილი', commonElements: ['Fe', 'S'] },
  { formula: 'Fe(NO3)3', displayFormula: 'Fe(NO₃)₃', nameKa: 'რკინის(III) ნიტრატი', nameEn: 'Iron(III) nitrate', category: 'მარილი', commonElements: ['Fe', 'N', 'O'] },

  // ალუმინის (Al) ნაერთები
  { formula: 'Al2O3', displayFormula: 'Al₂O₃', nameKa: 'ალუმინის ოქსიდი (კორუნდი, ბოქსიტი)', nameEn: 'Aluminium oxide', category: 'ოქსიდი', commonElements: ['Al', 'O'] },
  { formula: 'Al(OH)3', displayFormula: 'Al(OH)₃', nameKa: 'ალუმინის ჰიდროქსიდი (ამფოტერული)', nameEn: 'Aluminium hydroxide', category: 'ტუტე/ფუძე', commonElements: ['Al', 'O', 'H'] },
  { formula: 'AlCl3', displayFormula: 'AlCl₃', nameKa: 'ალუმინის ქლორიდი', nameEn: 'Aluminium chloride', category: 'მარილი', commonElements: ['Al', 'Cl'] },
  { formula: 'Al2(SO4)3', displayFormula: 'Al₂(SO₄)₃', nameKa: 'ალუმინის სულფატი', nameEn: 'Aluminium sulfate', category: 'მარილი', commonElements: ['Al', 'S', 'O'] },
  { formula: 'Al(NO3)3', displayFormula: 'Al(NO₃)₃', nameKa: 'ალუმინის ნიტრატი', nameEn: 'Aluminium nitrate', category: 'მარილი', commonElements: ['Al', 'N', 'O'] },
  { formula: 'Al4C3', displayFormula: 'Al₄C₃', nameKa: 'ალუმინის კარბიდი', nameEn: 'Aluminium carbide', category: 'სხვა', commonElements: ['Al', 'C'] },
  { formula: 'KAl(SO4)2.12H2O', displayFormula: 'KAl(SO₄)₂·12H₂O', nameKa: 'ალუმოკალიუმის შაბი', nameEn: 'Potassium alum', category: 'კრისტალჰიდრატი', commonElements: ['K', 'Al', 'S', 'O', 'H'] },

  // აზოტის & ფოსფორის ნაერთები
  { formula: 'NH3', displayFormula: 'NH₃', nameKa: 'ამიაკი (მძაფრსუნიანი აირი)', nameEn: 'Ammonia', category: 'სხვა', commonElements: ['N', 'H'] },
  { formula: 'NH4OH', displayFormula: 'NH₄OH', nameKa: 'ნიშადურის სპირტი (ამონიუმის ჰიდროქსიდი)', nameEn: 'Ammonium hydroxide', category: 'ტუტე/ფუძე', commonElements: ['N', 'H', 'O'] },
  { formula: 'NH4Cl', displayFormula: 'NH₄Cl', nameKa: 'ამონიუმის ქლორიდი (ნიშადური)', nameEn: 'Ammonium chloride', category: 'მარილი', commonElements: ['N', 'H', 'Cl'] },
  { formula: 'NH4NO3', displayFormula: 'NH₄NO₃', nameKa: 'ამონიუმის ნიტრატი (ამონიუმის გვარჯილა)', nameEn: 'Ammonium nitrate', category: 'მარილი', commonElements: ['N', 'H', 'O'] },
  { formula: '(NH4)2SO4', displayFormula: '(NH₄)₂SO₄', nameKa: 'ამონიუმის სულფატი', nameEn: 'Ammonium sulfate', category: 'მარილი', commonElements: ['N', 'H', 'S', 'O'] },
  { formula: '(NH4)2CO3', displayFormula: '(NH₄)₂CO₃', nameKa: 'ამონიუმის კარბონატი', nameEn: 'Ammonium carbonate', category: 'მარილი', commonElements: ['N', 'H', 'C', 'O'] },
  { formula: 'NO', displayFormula: 'NO', nameKa: 'აზოტის(II) მონოქსიდი', nameEn: 'Nitric oxide', category: 'ოქსიდი', commonElements: ['N', 'O'] },
  { formula: 'NO2', displayFormula: 'NO₂', nameKa: 'აზოტის(IV) დიოქსიდი (მურა აირი)', nameEn: 'Nitrogen dioxide', category: 'ოქსიდი', commonElements: ['N', 'O'] },
  { formula: 'N2O', displayFormula: 'N₂O', nameKa: 'დიაზოტის ოქსიდი (მალხენი აირი)', nameEn: 'Nitrous oxide', category: 'ოქსიდი', commonElements: ['N', 'O'] },
  { formula: 'N2O5', displayFormula: 'N₂O₅', nameKa: 'დიაზოტის პენტაოქსიდი', nameEn: 'Dinitrogen pentoxide', category: 'ოქსიდი', commonElements: ['N', 'O'] },
  { formula: 'P2O5', displayFormula: 'P₂O₅', nameKa: 'ფოსფორის(V) ოქსიდი', nameEn: 'Phosphorus pentoxide', category: 'ოქსიდი', commonElements: ['P', 'O'] },
  { formula: 'PH3', displayFormula: 'PH₃', nameKa: 'ფოსფინი', nameEn: 'Phosphine', category: 'სხვა', commonElements: ['P', 'H'] },

  // ნახშირბადის & ორგანული ნაერთები
  { formula: 'CO', displayFormula: 'CO', nameKa: 'ნახშირბადის მონოქსიდი (მხუთავი აირი)', nameEn: 'Carbon monoxide', category: 'ოქსიდი', commonElements: ['C', 'O'] },
  { formula: 'CO2', displayFormula: 'CO₂', nameKa: 'ნახშირბადის დიოქსიდი (ნახშირორჟანგი)', nameEn: 'Carbon dioxide', category: 'ოქსიდი', commonElements: ['C', 'O'] },
  { formula: 'CH4', displayFormula: 'CH₄', nameKa: 'მეთანი (ჭაობის / ბუნებრივი აირი)', nameEn: 'Methane', category: 'ორგანული', commonElements: ['C', 'H'] },
  { formula: 'C2H6', displayFormula: 'C₂H₆', nameKa: 'ეთანი', nameEn: 'Ethane', category: 'ორგანული', commonElements: ['C', 'H'] },
  { formula: 'C2H4', displayFormula: 'C₂H₄', nameKa: 'ეთილენი (ეთენი)', nameEn: 'Ethylene', category: 'ორგანული', commonElements: ['C', 'H'] },
  { formula: 'C2H2', displayFormula: 'C₂H₂', nameKa: 'აცეტილენი (ეთინი)', nameEn: 'Acetylene', category: 'ორგანული', commonElements: ['C', 'H'] },
  { formula: 'C3H8', displayFormula: 'C₃H₈', nameKa: 'პროპანი', nameEn: 'Propane', category: 'ორგანული', commonElements: ['C', 'H'] },
  { formula: 'C4H10', displayFormula: 'C₄H₁₀', nameKa: 'ბუტანი', nameEn: 'Butane', category: 'ორგანული', commonElements: ['C', 'H'] },
  { formula: 'C6H6', displayFormula: 'C₆H₆', nameKa: 'ბენზოლი', nameEn: 'Benzene', category: 'ორგანული', commonElements: ['C', 'H'] },
  { formula: 'C7H8', displayFormula: 'C₇H₈', nameKa: 'ტოლუოლი', nameEn: 'Toluene', category: 'ორგანული', commonElements: ['C', 'H'] },
  { formula: 'CH3OH', displayFormula: 'CH₃OH', nameKa: 'მეთანოლი (ხის სპირტი)', nameEn: 'Methanol', category: 'ორგანული', commonElements: ['C', 'H', 'O'] },
  { formula: 'C2H5OH', displayFormula: 'C₂H₅OH', nameKa: 'ეთანოლი (ღვინის / სამედიცინო სპირტი)', nameEn: 'Ethanol', category: 'ორგანული', commonElements: ['C', 'H', 'O'] },
  { formula: 'C3H8O3', displayFormula: 'C₃H₈O₃', nameKa: 'გლიცერინი (გლიცეროლი)', nameEn: 'Glycerol', category: 'ორგანული', commonElements: ['C', 'H', 'O'] },
  { formula: 'C6H12O6', displayFormula: 'C₆H₁₂O₆', nameKa: 'გლუკოზა / ფრუქტოზა (ყურძნის შაქარი)', nameEn: 'Glucose', category: 'ორგანული', commonElements: ['C', 'H', 'O'] },
  { formula: 'C12H22O11', displayFormula: 'C₁₂H₂₂O₁₁', nameKa: 'საქაროზა (ჭარხლის / ლერწმის შაქარი)', nameEn: 'Sucrose', category: 'ორგანული', commonElements: ['C', 'H', 'O'] },
  { formula: 'C6H10O5', displayFormula: 'C₆H₁₀O₅', nameKa: 'სახამებლის / ცელულოზის რგოლი', nameEn: 'Starch monomer', category: 'ორგანული', commonElements: ['C', 'H', 'O'] },
  { formula: 'SiO2', displayFormula: 'SiO₂', nameKa: 'სილიციუმის დიოქსიდი (კვარცი, ქვიშა)', nameEn: 'Silicon dioxide', category: 'ოქსიდი', commonElements: ['Si', 'O'] },
  { formula: 'SiC', displayFormula: 'SiC', nameKa: 'სილიციუმის კარბიდი (კარბორუნდი)', nameEn: 'Silicon carbide', category: 'სხვა', commonElements: ['Si', 'C'] },

  // მაგნიუმის (Mg), თუთიის (Zn), ბარიუმის (Ba), ვერცხლის (Ag), ტყვიის (Pb) ნაერთები
  { formula: 'MgO', displayFormula: 'MgO', nameKa: 'მაგნიუმის ოქსიდი (მწვავე მაგნეზია)', nameEn: 'Magnesium oxide', category: 'ოქსიდი', commonElements: ['Mg', 'O'] },
  { formula: 'Mg(OH)2', displayFormula: 'Mg(OH)₂', nameKa: 'მაგნიუმის ჰიდროქსიდი (მაგნეზიის რძე)', nameEn: 'Magnesium hydroxide', category: 'ტუტე/ფუძე', commonElements: ['Mg', 'O', 'H'] },
  { formula: 'MgCl2', displayFormula: 'MgCl₂', nameKa: 'მაგნიუმის ქლორიდი (ბიშოფიტი)', nameEn: 'Magnesium chloride', category: 'მარილი', commonElements: ['Mg', 'Cl'] },
  { formula: 'MgSO4', displayFormula: 'MgSO₄', nameKa: 'მაგნიუმის სულფატი', nameEn: 'Magnesium sulfate', category: 'მარილი', commonElements: ['Mg', 'S', 'O'] },
  { formula: 'MgSO4.7H2O', displayFormula: 'MgSO₄·7H₂O', nameKa: 'ინგლისური მარილი (ეპსომიტი)', nameEn: 'Epsom salt', category: 'კრისტალჰიდრატი', commonElements: ['Mg', 'S', 'O', 'H'] },
  { formula: 'MgCO3', displayFormula: 'MgCO₃', nameKa: 'მაგნიუმის კარბონატი (მაგნეზიტი)', nameEn: 'Magnesium carbonate', category: 'მარილი', commonElements: ['Mg', 'C', 'O'] },
  { formula: 'ZnO', displayFormula: 'ZnO', nameKa: 'თუთიის ოქსიდი (თუთიის თეთრა)', nameEn: 'Zinc oxide', category: 'ოქსიდი', commonElements: ['Zn', 'O'] },
  { formula: 'Zn(OH)2', displayFormula: 'Zn(OH)₂', nameKa: 'თუთიის ჰიდროქსიდი (ამფოტერული)', nameEn: 'Zinc hydroxide', category: 'ტუტე/ფუძე', commonElements: ['Zn', 'O', 'H'] },
  { formula: 'ZnSO4', displayFormula: 'ZnSO₄', nameKa: 'თუთიის სულფატი', nameEn: 'Zinc sulfate', category: 'მარილი', commonElements: ['Zn', 'S', 'O'] },
  { formula: 'ZnCl2', displayFormula: 'ZnCl₂', nameKa: 'თუთიის ქლორიდი', nameEn: 'Zinc chloride', category: 'მარილი', commonElements: ['Zn', 'Cl'] },
  { formula: 'ZnS', displayFormula: 'ZnS', nameKa: 'თუთიის სულფიდი (სფალერიტი)', nameEn: 'Zinc sulfide', category: 'მარილი', commonElements: ['Zn', 'S'] },
  { formula: 'BaO', displayFormula: 'BaO', nameKa: 'ბარიუმის ოქსიდი', nameEn: 'Barium oxide', category: 'ოქსიდი', commonElements: ['Ba', 'O'] },
  { formula: 'Ba(OH)2', displayFormula: 'Ba(OH)₂', nameKa: 'ბარიუმის ჰიდროქსიდი (ბარიტის წყალი)', nameEn: 'Barium hydroxide', category: 'ტუტე/ფუძე', commonElements: ['Ba', 'O', 'H'] },
  { formula: 'BaSO4', displayFormula: 'BaSO₄', nameKa: 'ბარიუმის სულფატი (რენტგენოკონტრასტი, მძიმე შპატი)', nameEn: 'Barium sulfate', category: 'მარილი', commonElements: ['Ba', 'S', 'O'] },
  { formula: 'BaCl2', displayFormula: 'BaCl₂', nameKa: 'ბარიუმის ქლორიდი', nameEn: 'Barium chloride', category: 'მარილი', commonElements: ['Ba', 'Cl'] },
  { formula: 'Ba(NO3)2', displayFormula: 'Ba(NO₃)₂', nameKa: 'ბარიუმის ნიტრატი', nameEn: 'Barium nitrate', category: 'მარილი', commonElements: ['Ba', 'N', 'O'] },
  { formula: 'AgNO3', displayFormula: 'AgNO₃', nameKa: 'ვერცხლის ნიტრატი (ლაპისი)', nameEn: 'Silver nitrate', category: 'მარილი', commonElements: ['Ag', 'N', 'O'] },
  { formula: 'AgCl', displayFormula: 'AgCl', nameKa: 'ვერცხლის ქლორიდი (თეთრი ხაჭოსებრი ნალექი)', nameEn: 'Silver chloride', category: 'მარილი', commonElements: ['Ag', 'Cl'] },
  { formula: 'AgBr', displayFormula: 'AgBr', nameKa: 'ვერცხლის ბრომიდი (მოყვითალო ნალექი)', nameEn: 'Silver bromide', category: 'მარილი', commonElements: ['Ag', 'Br'] },
  { formula: 'AgI', displayFormula: 'AgI', nameKa: 'ვერცხლის იოდიდი (ყვითელი ნალექი)', nameEn: 'Silver iodide', category: 'მარილი', commonElements: ['Ag', 'I'] },
  { formula: 'Ag2O', displayFormula: 'Ag₂O', nameKa: 'ვერცხლის(I) ოქსიდი', nameEn: 'Silver(I) oxide', category: 'ოქსიდი', commonElements: ['Ag', 'O'] },
  { formula: 'Pb(NO3)2', displayFormula: 'Pb(NO₃)₂', nameKa: 'ტყვიის(II) ნიტრატი', nameEn: 'Lead(II) nitrate', category: 'მარილი', commonElements: ['Pb', 'N', 'O'] },
  { formula: 'PbI2', displayFormula: 'PbI₂', nameKa: 'ტყვიის(II) იოდიდი (ოქროს წვიმა)', nameEn: 'Lead(II) iodide', category: 'მარილი', commonElements: ['Pb', 'I'] },
  { formula: 'PbS', displayFormula: 'PbS', nameKa: 'ტყვიის(II) სულფიდი (გალენიტი)', nameEn: 'Lead(II) sulfide', category: 'მარილი', commonElements: ['Pb', 'S'] },
  { formula: 'MnO2', displayFormula: 'MnO₂', nameKa: 'მანგანუმის(IV) ოქსიდი (პიროლუზიტი)', nameEn: 'Manganese dioxide', category: 'ოქსიდი', commonElements: ['Mn', 'O'] },
  { formula: 'Cr2O3', displayFormula: 'Cr₂O₃', nameKa: 'ქრომის(III) ოქსიდი (მწვანე ოქსიდი)', nameEn: 'Chromium(III) oxide', category: 'ოქსიდი', commonElements: ['Cr', 'O'] },
  { formula: 'SO2', displayFormula: 'SO₂', nameKa: 'გოგირდის დიოქსიდი (გოგირდოვანი აირი)', nameEn: 'Sulfur dioxide', category: 'ოქსიდი', commonElements: ['S', 'O'] },
  { formula: 'SO3', displayFormula: 'SO₃', nameKa: 'გოგირდის ტრიოქსიდი (გოგირდის ანჰიდრიდი)', nameEn: 'Sulfur trioxide', category: 'ოქსიდი', commonElements: ['S', 'O'] },
];

/**
 * Filter popular formulas by query string (case-insensitive, searching formula, symbols, or Georgian name)
 */
export function searchFormulas(query: string, maxResults = 10): FormulaSuggestion[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // Strip subscripts and hydration dots for fuzzy matching
  const cleanQ = q.replace(/[₀-₉]/g, ch => {
    const map: Record<string, string> = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
    return map[ch] || ch;
  }).replace(/[·⋅•*]/g, '.');

  const matches: { item: FormulaSuggestion; score: number }[] = [];

  for (const item of POPULAR_FORMULAS) {
    const fLower = item.formula.toLowerCase();
    const dLower = item.displayFormula.toLowerCase();
    const nameLower = item.nameKa.toLowerCase();
    const enLower = (item.nameEn || '').toLowerCase();

    let score = 0;

    // Exact formula match
    if (fLower === cleanQ || dLower === cleanQ) {
      score += 100;
    }
    // Formula starts with query (e.g. typing "Na" or "H2")
    else if (fLower.startsWith(cleanQ) || dLower.startsWith(cleanQ)) {
      score += 50;
    }
    // Formula contains query
    else if (fLower.includes(cleanQ) || dLower.includes(cleanQ)) {
      score += 25;
    }
    // Name starts with query
    else if (nameLower.startsWith(q)) {
      score += 35;
    }
    // Name contains query
    else if (nameLower.includes(q) || enLower.includes(q)) {
      score += 15;
    }
    // Element matches
    else if (item.commonElements.some(el => el.toLowerCase() === cleanQ)) {
      score += 10;
    }

    if (score > 0) {
      matches.push({ item, score });
    }
  }

  // Sort descending by score
  matches.sort((a, b) => b.score - a.score);

  return matches.slice(0, maxResults).map(m => m.item);
}
