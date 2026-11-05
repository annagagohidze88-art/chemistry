export type MetalActivityGroup = 'active' | 'medium' | 'hydrogen' | 'passive';

export interface MetalActivityItem {
  symbol: string;
  nameKa: string;
  nameEn: string;
  atomicNumber: number;
  potential: number; // E°, სტანდარტული ელექტროდული პოტენციალი ვოლტებში (V)
  group: MetalActivityGroup;
  ionForm: string; // Li⁺, K⁺, Ca²⁺, etc.
  reactionWithWater: string; // რეაქცია წყალთან
  reactionWithAcids: string; // რეაქცია მჟავებთან
  reactionWithSalts: string; // რეაქცია მარილების ხსნარებთან
  descriptionKa: string;
}

export const METAL_ACTIVITY_SERIES: MetalActivityItem[] = [
  {
    symbol: 'Li',
    nameKa: 'ლითიუმი',
    nameEn: 'Lithium',
    atomicNumber: 3,
    potential: -3.04,
    group: 'active',
    ionForm: 'Li⁺',
    reactionWithWater: 'ენერგიულად რეაგირებს ცივ წყალთან: 2Li + 2H₂O → 2LiOH + H₂↑',
    reactionWithAcids: 'ფეთქებადსაშიში რეაქცია მჟავებთან წყალბადის გამოყოფით',
    reactionWithSalts: 'პირველ რიგში წყალთან შედის რეაქციაში, ამიტომ არ გამოიყენება მარილებიდან სხვა მეტალების გამოსაძევებლად',
    descriptionKa: 'ყველაზე ძლიერი აღმდგენი წყალხსნარებში (ყველაზე უარყოფითი პოტენციალი: -3.04 V).',
  },
  {
    symbol: 'K',
    nameKa: 'კალიუმი',
    nameEn: 'Potassium',
    atomicNumber: 19,
    potential: -2.93,
    group: 'active',
    ionForm: 'K⁺',
    reactionWithWater: 'მყისიერად და ალით რეაგირებს წყალთან: 2K + 2H₂O → 2KOH + H₂↑',
    reactionWithAcids: 'უკიდურესად ენერგიული რეაქცია მჟავებთან',
    reactionWithSalts: 'წყალთან რეაქცია უსწრებს მარილთან ურთიერთქმედებას',
    descriptionKa: 'ტუტე ლითონი, იწვის წყლის ზედაპირზე იასამნისფერი ალით.',
  },
  {
    symbol: 'Ba',
    nameKa: 'ბარიუმი',
    nameEn: 'Barium',
    atomicNumber: 56,
    potential: -2.90,
    group: 'active',
    ionForm: 'Ba²⁺',
    reactionWithWater: 'აქტიურად რეაგირებს წყალთან: Ba + 2H₂O → Ba(OH)₂ + H₂↑',
    reactionWithAcids: 'აქტიურად აძევებს წყალბადს მჟავებიდან',
    reactionWithSalts: 'რეაგირებს წყალთან ტუტის Ba(OH)₂ წარმოქმნით',
    descriptionKa: 'ტუტემიწა ლითონი, წარმოქმნის ძლიერ ტუტეს Ba(OH)₂.',
  },
  {
    symbol: 'Sr',
    nameKa: 'სტრონციუმი',
    nameEn: 'Strontium',
    atomicNumber: 38,
    potential: -2.89,
    group: 'active',
    ionForm: 'Sr²⁺',
    reactionWithWater: 'რეაგირებს ცივ წყალთან: Sr + 2H₂O → Sr(OH)₂ + H₂↑',
    reactionWithAcids: 'აძევებს წყალბადს მჟავებიდან',
    reactionWithSalts: 'წყალთან რეაქცია უსწრებს მარილს',
    descriptionKa: 'აქტიური ტუტემიწა ლითონი.',
  },
  {
    symbol: 'Ca',
    nameKa: 'კალციუმი',
    nameEn: 'Calcium',
    atomicNumber: 20,
    potential: -2.87,
    group: 'active',
    ionForm: 'Ca²⁺',
    reactionWithWater: 'ენერგიულად რეაგირებს წყალთან: Ca + 2H₂O → Ca(OH)₂ + H₂↑',
    reactionWithAcids: 'აქტიურად აძევებს წყალბადს',
    reactionWithSalts: 'წყალთან რეაქციის გამო მარილებიდან მეტალებს ვერ აძევებს',
    descriptionKa: 'ტუტემიწა ლითონი, ქმნის კირიან წყალს Ca(OH)₂.',
  },
  {
    symbol: 'Na',
    nameKa: 'ნატრიუმი',
    nameEn: 'Sodium',
    atomicNumber: 11,
    potential: -2.71,
    group: 'active',
    ionForm: 'Na⁺',
    reactionWithWater: 'აქტიურად რეაგირებს ცივ წყალთან ყვითელი ალით: 2Na + 2H₂O → 2NaOH + H₂↑',
    reactionWithAcids: 'ძალზე ენერგიული რეაქცია წყალბადის გამოყოფით',
    reactionWithSalts: 'წყალთან უსწრაფესი რეაქციის გამო მარილის ხსნარიდან მეტალს პირდაპირ ვერ აძევებს',
    descriptionKa: 'ძალიან აქტიური ტუტე ლითონი.',
  },
  {
    symbol: 'Mg',
    nameKa: 'მაგნიუმი',
    nameEn: 'Magnesium',
    atomicNumber: 12,
    potential: -2.37,
    group: 'medium',
    ionForm: 'Mg²⁺',
    reactionWithWater: 'ცივ წყალთან რეაგირებს ძალიან ნელა; ადუღებულ წყალთან და ორთქლთან: Mg + H₂O(ორთქლი) → MgO + H₂↑',
    reactionWithAcids: 'სწრაფად აძევებს წყალბადს: Mg + 2HCl → MgCl₂ + H₂↑',
    reactionWithSalts: 'აძევებს ყველა შემდგომ მეტალს (Al, Zn, Fe, Cu, Ag...) მათი მარილების ხსნარებიდან',
    descriptionKa: 'საშუალო აქტივობის ლითონების დასაწყისი.',
  },
  {
    symbol: 'Al',
    nameKa: 'ალუმინი',
    nameEn: 'Aluminium',
    atomicNumber: 13,
    potential: -1.66,
    group: 'medium',
    ionForm: 'Al³⁺',
    reactionWithWater: 'ჰაერზე დაფარულია დამცავი ოქსიდის ფენით (Al₂O₃); ოქსიდის მოცილებისას (ამალგამირებისას) რეაგირებს წყალთან: 2Al + 6H₂O → 2Al(OH)₃ + 3H₂↑',
    reactionWithAcids: 'აქტიურად აძევებს წყალბადს: 2Al + 6HCl → 2AlCl₃ + 3H₂↑',
    reactionWithSalts: 'აძევებს შემდგომ მეტალებს (Zn, Fe, Cu, Ag...) მარილებიდან',
    descriptionKa: 'ამფოტერული მეტალი ძლიერი აღმდგენი თვისებებით.',
  },
  {
    symbol: 'Mn',
    nameKa: 'მანგანუმი',
    nameEn: 'Manganese',
    atomicNumber: 25,
    potential: -1.18,
    group: 'medium',
    ionForm: 'Mn²⁺',
    reactionWithWater: 'წყლის ორთქლთან რეაგირებს გაცხელებისას: Mn + H₂O → MnO + H₂↑',
    reactionWithAcids: 'აძევებს წყალბადს მჟავებიდან: Mn + 2HCl → MnCl₂ + H₂↑',
    reactionWithSalts: 'აძევებს შემდგომ მეტალებს (Zn, Fe, Ni, Cu...) მარილებიდან',
    descriptionKa: 'გარდამავალი d-მეტალი.',
  },
  {
    symbol: 'Zn',
    nameKa: 'თუთია',
    nameEn: 'Zinc',
    atomicNumber: 30,
    potential: -0.76,
    group: 'medium',
    ionForm: 'Zn²⁺',
    reactionWithWater: 'რეაგირებს მხოლოდ გავარვარებულ წყლის ორთქლთან: Zn + H₂O → ZnO + H₂↑',
    reactionWithAcids: 'ლაბორატორიაში წყალბადის მიღების კლასიკური მეთოდი: Zn + 2HCl → ZnCl₂ + H₂↑',
    reactionWithSalts: 'აძევებს Fe, Ni, Sn, Pb, Cu, Ag-ს მარილების ხსნარებიდან: Zn + CuSO₄ → ZnSO₄ + Cu↓',
    descriptionKa: 'ამფოტერული ლითონი, ფართოდ გამოიყენება სასკოლო ქიმიურ ცდებში.',
  },
  {
    symbol: 'Cr',
    nameKa: 'ქრომი',
    nameEn: 'Chromium',
    atomicNumber: 24,
    potential: -0.74,
    group: 'medium',
    ionForm: 'Cr³⁺ / Cr²⁺',
    reactionWithWater: 'გაცხელებისას მაღალ ტემპერატურაზე წყლის ორთქლთან',
    reactionWithAcids: 'აძევებს წყალბადს გაზავებული მჟავებიდან: Cr + 2HCl → CrCl₂ + H₂↑',
    reactionWithSalts: 'აძევებს შემდგომ მეტალებს (Fe, Cu, Ag...) მარილებიდან',
    descriptionKa: 'მაღალი კოროზიამედეგობის მქონე მყარი მეტალი.',
  },
  {
    symbol: 'Fe',
    nameKa: 'რკინა',
    nameEn: 'Iron',
    atomicNumber: 26,
    potential: -0.44,
    group: 'medium',
    ionForm: 'Fe²⁺',
    reactionWithWater: 'გავარვარებული რკინა რეაგირებს წყლის ორთქლთან: 3Fe + 4H₂O → Fe₃O₄ + 4H₂↑',
    reactionWithAcids: 'აძევებს წყალბადს გაზავებული მჟავებიდან: Fe + 2HCl → FeCl₂ + H₂↑ (წარმოიქმნება Fe²⁺)',
    reactionWithSalts: 'აძევებს შემდგომ მეტალებს მარილების ხსნარებიდან: Fe + CuSO₄ → FeSO₄ + Cu↓',
    descriptionKa: 'ყველაზე მნიშვნელოვანი ინდუსტრიული მეტალი, მაგნიტურია.',
  },
  {
    symbol: 'Cd',
    nameKa: 'კადმიუმი',
    nameEn: 'Cadmium',
    atomicNumber: 48,
    potential: -0.40,
    group: 'medium',
    ionForm: 'Cd²⁺',
    reactionWithWater: 'ორთქლთან მაღალ ტემპერატურაზე',
    reactionWithAcids: 'აძევებს წყალბადს მჟავებიდან',
    reactionWithSalts: 'აძევებს Co, Ni, Sn, Pb, Cu, Ag-ს მარილებიდან',
    descriptionKa: 'მძიმე მეტალი, გამოიყენება აკუმულატორებში.',
  },
  {
    symbol: 'Co',
    nameKa: 'კობალტი',
    nameEn: 'Cobalt',
    atomicNumber: 27,
    potential: -0.28,
    group: 'medium',
    ionForm: 'Co²⁺',
    reactionWithWater: 'ორთქლთან გაცხელებისას',
    reactionWithAcids: 'ნელა აძევებს წყალბადს მჟავებიდან',
    reactionWithSalts: 'აძევებს Ni, Sn, Pb, Cu, Ag-ს მარილებიდან',
    descriptionKa: 'ფერომაგნიტური მეტალი.',
  },
  {
    symbol: 'Ni',
    nameKa: 'ნიკელი',
    nameEn: 'Nickel',
    atomicNumber: 28,
    potential: -0.25,
    group: 'medium',
    ionForm: 'Ni²⁺',
    reactionWithWater: 'ორთქლთან მაღალ ტემპერატურაზე',
    reactionWithAcids: 'ნელა აძევებს წყალბადს მჟავებიდან: Ni + 2HCl → NiCl₂ + H₂↑',
    reactionWithSalts: 'აძევებს Sn, Pb, Cu, Ag-ს მარილებიდან',
    descriptionKa: 'მბზინავი კოროზიამედეგი ლითონი.',
  },
  {
    symbol: 'Sn',
    nameKa: 'კალა',
    nameEn: 'Tin',
    atomicNumber: 50,
    potential: -0.14,
    group: 'medium',
    ionForm: 'Sn²⁺',
    reactionWithWater: 'წყალთან ჩვეულებრივ არ რეაგირებს',
    reactionWithAcids: 'ნელა აძევებს წყალბადს ცხელი გაზავებული მჟავებიდან: Sn + 2HCl → SnCl₂ + H₂↑',
    reactionWithSalts: 'აძევებს Pb, Cu, Ag-ს მარილების ხსნარებიდან',
    descriptionKa: 'დაბალტემპერატურაზე დნობადი რბილი მეტალი.',
  },
  {
    symbol: 'Pb',
    nameKa: 'ტყვია',
    nameEn: 'Lead',
    atomicNumber: 82,
    potential: -0.13,
    group: 'medium',
    ionForm: 'Pb²⁺',
    reactionWithWater: 'არ რეაგირებს წყალთან (ზედაპირზე წარმოქმნის დამცავ ფენას)',
    reactionWithAcids: 'წყალბადამდე მდგომი ბოლო მეტალია; HCl და H₂SO₄-თან რეაქცია მალე წყდება უხსნადი მარილების (PbCl₂, PbSO₄) ზედაპირზე დალეექვის გამო',
    reactionWithSalts: 'აძევებს Cu, Hg, Ag-ს მარილების ხსნარებიდან: Pb + 2AgNO₃ → Pb(NO₃)₂ + 2Ag↓',
    descriptionKa: 'მძიმე რბილი მეტალი; წყალბადამდე მდგომი უკანასკნელი მეტალი.',
  },
  {
    symbol: 'H₂',
    nameKa: 'წყალბადი (ეტალონი)',
    nameEn: 'Hydrogen (Standard)',
    atomicNumber: 1,
    potential: 0.0,
    group: 'hydrogen',
    ionForm: '2H⁺',
    reactionWithWater: 'არ რეაგირებს',
    reactionWithAcids: '—',
    reactionWithSalts: '—',
    descriptionKa: 'ზღვარი და პირობითი ნულოვანი ეტალონი (E° = 0.00 V). მის მარცხნივ მდგომი ლითონები აძევებენ H₂-ს მჟავებიდან, მარჯვნივ მდგომი — ვერა.',
  },
  {
    symbol: 'Sb',
    nameKa: 'სტიბიუმი',
    nameEn: 'Antimony',
    atomicNumber: 51,
    potential: 0.15,
    group: 'passive',
    ionForm: 'Sb³⁺',
    reactionWithWater: 'არ რეაგირებს წყალთან',
    reactionWithAcids: 'ჩვეულებრივი მჟავებიდან წყალბადს ვერ აძევებს; რეაგირებს მხოლოდ მჟანგავ მჟავებთან (HNO₃, H₂SO₄ კონც.)',
    reactionWithSalts: 'აძევებს Bi, Cu, Ag, Pt, Au-ს მარილებიდან',
    descriptionKa: 'ნახევარმეტალი / მეტალოიდი.',
  },
  {
    symbol: 'Bi',
    nameKa: 'ბისმუტი',
    nameEn: 'Bismuth',
    atomicNumber: 83,
    potential: 0.32,
    group: 'passive',
    ionForm: 'Bi³⁺',
    reactionWithWater: 'არ რეაგირებს',
    reactionWithAcids: 'არ აძევებს H₂-ს; იხსნება აზოტმჟავაში (HNO₃)',
    reactionWithSalts: 'აძევებს Cu, Ag, Au-ს მარილებიდან',
    descriptionKa: 'პოსტ-გარდამავალი მეტალი.',
  },
  {
    symbol: 'Cu',
    nameKa: 'სპილენძი',
    nameEn: 'Copper',
    atomicNumber: 29,
    potential: 0.34,
    group: 'passive',
    ionForm: 'Cu²⁺',
    reactionWithWater: 'არ რეაგირებს წყალთან არცერთ პირობებში',
    reactionWithAcids: 'გაზავებულ HCl და H₂SO₄-თან არ რეაგირებს (H₂ არ გამოიყოფა!). რეაგირებს მხოლოდ აზოტმჟავასთან (HNO₃) და კონცენტრირებულ H₂SO₄-თან',
    reactionWithSalts: 'აძევებს ვერცხლს (Ag) და ოქროს (Au) მათი მარილების ხსნარებიდან: Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag↓',
    descriptionKa: 'პასიური წითელი მეტალი, საუკეთესო ელექტროგამტარი.',
  },
  {
    symbol: 'Hg',
    nameKa: 'ვერცხლისწყალი',
    nameEn: 'Mercury',
    atomicNumber: 80,
    potential: 0.79,
    group: 'passive',
    ionForm: 'Hg²⁺ / Hg₂²⁺',
    reactionWithWater: 'არ რეაგირებს წყალთან',
    reactionWithAcids: 'არ აძევებს H₂-ს; რეაგირებს მხოლოდ HNO₃-თან და კონც. H₂SO₄-თან',
    reactionWithSalts: 'აძევებს Ag, Pt, Au-ს მარილებიდან: Hg + 2AgNO₃ → Hg(NO₃)₂ + 2Ag↓',
    descriptionKa: 'ერთადერთი თხევადი ლითონი ოთახის ტემპერატურაზე.',
  },
  {
    symbol: 'Ag',
    nameKa: 'ვერცხლი',
    nameEn: 'Silver',
    atomicNumber: 47,
    potential: 0.80,
    group: 'passive',
    ionForm: 'Ag⁺',
    reactionWithWater: 'არ რეაგირებს',
    reactionWithAcids: 'არ აძევებს H₂-ს; იხსნება მხოლოდ აზოტმჟავაში (HNO₃) და ცხელ კონც. H₂SO₄-ში',
    reactionWithSalts: 'აძევებს Pt და Au-ს მარილებიდან',
    descriptionKa: 'კეთილშობილი ლითონი, უმაღლესი ელექტრო- და სითბოგამტარობა.',
  },
  {
    symbol: 'Pt',
    nameKa: 'პლატინა',
    nameEn: 'Platinum',
    atomicNumber: 78,
    potential: 1.20,
    group: 'passive',
    ionForm: 'Pt²⁺ / Pt⁴⁺',
    reactionWithWater: 'არ რეაგირებს',
    reactionWithAcids: 'არ იხსნება ჩვეულებრივ მჟავებში; იხსნება მხოლოდ „სამეფო წყალში“ (HNO₃ + 3HCl)',
    reactionWithSalts: 'აძევებს Au-ს მარილებიდან',
    descriptionKa: 'ძვირფასი კეთილშობილი ლითონი, კატალიზატორი.',
  },
  {
    symbol: 'Au',
    nameKa: 'ოქრო',
    nameEn: 'Gold',
    atomicNumber: 79,
    potential: 1.50,
    group: 'passive',
    ionForm: 'Au³⁺',
    reactionWithWater: 'არ რეაგირებს',
    reactionWithAcids: 'არ იხსნება არცერთ ცალკეულ მჟავაში; იხსნება მხოლოდ „სამეფო წყალში“ (HNO₃ + 3HCl)',
    reactionWithSalts: 'მწკრივის ბოლოშია — ვერცერთ მეტალს ვერ გამოაძევებს მარილის ხსნარიდან',
    descriptionKa: 'ქიმიურად ყველაზე ინერტული და მდგრადი კეთილშობილი ლითონი.',
  },
];

// Helper: ლითონთა შედარება გამოძევების რეაქციისთვის (Displacement rule)
export interface DisplacementResult {
  canDisplace: boolean;
  type: 'displaces' | 'cannot_displace' | 'too_active_reacts_with_water' | 'same_metal';
  equation?: string;
  explanation: string;
}

export function testMetalDisplacement(
  metalSymbol: string,
  saltMetalSymbol: string
): DisplacementResult {
  if (metalSymbol === saltMetalSymbol) {
    return {
      canDisplace: false,
      type: 'same_metal',
      explanation: 'ერთი და იგივე ლითონია — რეაქცია არ მიმდინარეობს.',
    };
  }

  const idx1 = METAL_ACTIVITY_SERIES.findIndex(m => m.symbol === metalSymbol);
  const idx2 = METAL_ACTIVITY_SERIES.findIndex(m => m.symbol === saltMetalSymbol);

  if (idx1 === -1 || idx2 === -1) {
    return {
      canDisplace: false,
      type: 'cannot_displace',
      explanation: 'ერთ-ერთი ელემენტი ვერ მოიძებნა მწკრივში.',
    };
  }

  const metal1 = METAL_ACTIVITY_SERIES[idx1];
  const metal2 = METAL_ACTIVITY_SERIES[idx2];

  // ძალიან აქტიური ტუტე და ტუტემიწა მეტალები (Li, K, Ba, Sr, Ca, Na)
  if (metal1.group === 'active') {
    return {
      canDisplace: false,
      type: 'too_active_reacts_with_water',
      explanation: `${metal1.nameKa} (${metal1.symbol}) უკიდურესად აქტიური ლითონია! მარილის ხსნარში მოხვედრისას ის პირველ რიგში წყალთან რეაგირებს ტუტის წარმოქმნით (${metal1.symbol} + H₂O → ტუტე + H₂↑), შემდეგ კი წარმოქმნილი ტუტე რეაგირებს მარილთან ნალექის გამოლევით. ამიტომ აქტიური ლითონები მარილებიდან სხვა ლითონების გამოსაძევებლად არ გამოიყენება.`,
    };
  }

  // თუ თავისუფალი მეტალი წინ დგას მარილში შემავალ მეტალზე
  if (idx1 < idx2) {
    return {
      canDisplace: true,
      type: 'displaces',
      equation: `${metal1.symbol} + ${metal2.symbol}SO₄ → ${metal1.symbol}SO₄ + ${metal2.symbol}↓`,
      explanation: `სწორია! ${metal1.nameKa} (${metal1.symbol}) აქტიურობის მწკრივში წინ (მარცხნივ) უსწრებს ${metal2.nameKa}ს (${metal2.symbol}), ამიტომ ის აძევებს მას მარილის წყალხსნარიდან!`,
    };
  }

  // თუ თავისუფალი მეტალი უკან დგას
  return {
    canDisplace: false,
    type: 'cannot_displace',
    explanation: `რეაქცია არ წარიმართება! ${metal1.nameKa} (${metal1.symbol}) ნაკლებად აქტიურია, ვიდრე ${metal2.nameKa} (${metal2.symbol}) და დგას მის შემდეგ (მარჯვნივ), ამიტომ მას მარილის ხსნარიდან ვერ გამოაძევებს.`,
  };
}
