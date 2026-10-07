import type { ChemicalElement } from '../types/element';
import type { CompoundLookupResult } from '../types/compound';
import { COMMON_COMPOUNDS } from '../data/compounds';

export function getCompoundForElements(
  elements: ChemicalElement[]
): CompoundLookupResult {
  const symbols = elements.map(e => e.symbol);
  const uniqueSymbols = Array.from(new Set(symbols));

  // Case 0: Less than 2 elements
  if (elements.length < 2) {
    return {
      found: false,
      elements: symbols,
      educationalExplanationKa: 'ნაერთის ანალიზისთვის გთხოვთ აირჩიოთ მინიმუმ ორი ელემენტი.',
      canReactUnderConditions: false,
      reasonWhyNoReaction: 'არასაკმარისი რაოდენობის ელემენტები',
    };
  }

  // Case 1: All selected elements are identical (e.g. O + O)
  if (uniqueSymbols.length === 1) {
    const el = elements[0];
    return {
      found: false,
      elements: symbols,
      educationalExplanationKa: `თქვენ აირჩიეთ ერთი და იგივე ელემენტი (${el.nameKa} - ${el.symbol}). იდენტური ატომები ერთმანეთთან შეერთებისას ქმნიან მარტივ ნივთიერებას (მაგ. მოლეკულურ ფორმას ${el.symbol}₂ ან მეტალურ მესერს) და არა რთულ ქიმიურ ნაერთს.`,
      canReactUnderConditions: false,
      reasonWhyNoReaction: 'იდენტური ატომები მხოლოდ მარტივ ნივთიერებას წარმოქმნიან და არა რთულ ნაერთს',
    };
  }

  // Search exact match in known compounds database
  const sortedSelected = [...uniqueSymbols].sort().join(',');
  const matches = COMMON_COMPOUNDS.filter(c => {
    const sortedCompound = [...c.elements].sort().join(',');
    return sortedCompound === sortedSelected;
  });

  if (matches.length > 0) {
    const primary = matches[0];
    return {
      found: true,
      compound: primary,
      compounds: matches,
      elements: symbols,
      educationalExplanationKa: `ნაჩვენები შედეგი (${matches.map(m => m.formula).join(', ')}) არის ამ ელემენტებისგან წარმოქმნილი შესაძლო ნაერთები. რეაქციის წარსამართად და კონკრეტული ნაერთის მისაღებად გადამწყვეტია რეაგენტების მოლური შეფარდება, ტემპერატურა, წნევა და კატალიზატორი.`,
      canReactUnderConditions: true,
    };
  }

  // Analyze scientific reasons why no reaction / compound occurs:
  const nobleGases = elements.filter(e => e.category === 'noble-gas');
  const metals = elements.filter(e =>
    ['alkali-metal', 'alkaline-earth', 'transition-metal', 'post-transition-metal', 'lanthanide', 'actinide'].includes(e.category)
  );
  const superheavy = elements.filter(e => e.atomicNumber > 100);

  // Case 2: Noble gas present (except Xe + F which is in compounds)
  if (nobleGases.length > 0) {
    const nobleNames = nobleGases.map(e => `${e.nameKa} (${e.symbol})`).join(', ');
    return {
      found: false,
      elements: symbols,
      educationalExplanationKa: `შერჩეულ ელემენტებს შორის არის კეთილშობილი (ინერტული) აირი: ${nobleNames}. ინერტულ აირებს აქვთ სრულად დასრულებული გარე ელექტრონული შრე (ოქტეტი), ამიტომ ისინი ამ კომბინაციაში ქიმიურ ნაერთს არ წარმოქმნიან.`,
      canReactUnderConditions: false,
      reasonWhyNoReaction: 'ინერტული აირის სტაბილური ელექტრონული გარსი ეწინააღმდეგება ქიმიური ბმის წარმოქმნას.',
    };
  }

  // Case 3: All selected elements are metals
  if (metals.length === elements.length) {
    const metalNames = elements.map(e => e.nameKa).join(', ');
    return {
      found: false,
      elements: symbols,
      educationalExplanationKa: `ყველა არჩეული ელემენტი (${metalNames}) ლითონია. ლითონები ერთმანეთთან არ წარმოქმნიან კლასიკურ ვალენტურ ნაერთებს (მჟავებს, მარილებს ან ოქსიდებს); შერევისას და გალღობისას ისინი ქმნიან ლითონურ შენადნობებს (მყარ ხსნარებს ან ინტერმეტალიდებს).`,
      canReactUnderConditions: false,
      reasonWhyNoReaction: 'მხოლოდ ლითონების კომბინაცია ქიმიური ნაერთის ნაცვლად წარმოქმნის ფიზიკურ შენადნობს.',
      suggestedElements: ['O (ჟანგბადი)', 'Cl (ქლორი)', 'S (გოგირდი)'],
    };
  }

  // Case 4: Superheavy synthetic elements
  if (superheavy.length > 0) {
    const shNames = superheavy.map(e => `${e.nameKa} (${e.symbol})`).join(', ');
    return {
      found: false,
      elements: symbols,
      educationalExplanationKa: `არჩეული ელემენტებიდან ${shNames} მიეკუთვნება სუპერმძიმე სინთეზურ ელემენტებს (Z > 100), რომლებიც წამების უმცირეს ნაწილში იშლება. მათი რეაქციის პროდუქტის ექსპერიმენტული მონაცემები მეცნიერებაში არ არსებობს.`,
      canReactUnderConditions: false,
      reasonWhyNoReaction: 'სუპერმძიმე ელემენტის ექსტრემალურად ხანმოკლე სიცოცხლე და ექსპერიმენტული მონაცემების არარსებობა.',
    };
  }

  // Case 5: Provide smart recommendations if elements could form known ternary/quaternary compounds
  let suggestions: string[] = [];
  if (symbols.includes('C') && symbols.includes('H') && !symbols.includes('O')) {
    suggestions = ['O (ჟანგბადი — ნახშირმჟავას, ძმარმჟავას ან ეთანოლის მისაღებად)'];
  } else if (symbols.includes('H') && symbols.includes('S') && !symbols.includes('O')) {
    suggestions = ['O (ჟანგბადი — გოგირდმჟავას H₂SO₄ მისაღებად)'];
  } else if (symbols.includes('H') && symbols.includes('N') && !symbols.includes('O')) {
    suggestions = ['O (ჟანგბადი — აზოტმჟავას HNO₃ მისაღებად)', 'Cl (ქლორი — ნიშადურის NH₄Cl მისაღებად)'];
  } else if (symbols.includes('Na') && symbols.includes('C') && !symbols.includes('O')) {
    suggestions = ['O (ჟანგბადი — სოდის Na₂CO₃ მისაღებად)', 'H (წყალბადი — სასმელი სოდის NaHCO₃ მისაღებად)'];
  } else if (symbols.includes('Ca') && symbols.includes('C') && !symbols.includes('O')) {
    suggestions = ['O (ჟანგბადი — კირქვის/მარმარილოს CaCO₃ მისაღებად)'];
  } else if (symbols.includes('Cu') && symbols.includes('S') && !symbols.includes('O')) {
    suggestions = ['O (ჟანგბადი — შაბიამანის CuSO₄ მისაღებად)'];
  } else if (symbols.includes('Ba') && symbols.includes('S') && !symbols.includes('O')) {
    suggestions = ['O (ჟანგბადი — ბარიუმის სულფატის BaSO₄ ნალექის მისაღებად)'];
  } else if (!symbols.includes('O') && !symbols.includes('Cl') && !symbols.includes('H')) {
    suggestions = ['O (ჟანგბადი)', 'Cl (ქლორი)', 'H (წყალბადი)'];
  }

  return {
    found: false,
    elements: symbols,
    educationalExplanationKa: `არჩეული ელემენტების (${symbols.join(' + ')}) პირდაპირი შერევით გავრცელებული სტაბილური ნაერთის მიღება დაუდასტურებელია ან მოითხოვს სხვა რეაგენტების მონაწილეობას.`,
    canReactUnderConditions: false,
    reasonWhyNoReaction: 'ამ ელემენტებს შორის სტაბილური ნაერთის წარმოქმნა პირდაპირი შერევით შეუძლებელია.',
    suggestedElements: suggestions.length > 0 ? suggestions : undefined,
  };
}
