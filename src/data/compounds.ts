import type { Compound } from '../types/compound';

export const COMMON_COMPOUNDS: Compound[] = [
  {
    "id": "H-O-water",
    "elements": [
      "H",
      "O"
    ],
    "formula": "H₂O",
    "nameKa": "წყალი (დიჰიდროგენის მონოქსიდი)",
    "nameEn": "Water",
    "type": "კოვალენტური პოლარული მოლეკულური ნაერთი, ოქსიდი",
    "compoundClass": "კოვალენტური მოლეკულური ნაერთი",
    "descriptionKa": "დედამიწაზე სიცოცხლის უმთავრესი საფუძველი, უნივერსალური გამხსნელი. გაცხელებისას ორთქლდება.",
    "reactionConditions": {
      "temperature": "ოთახის ტემპერატურაზე ინერტულია; ნაპერწკალით ან > 500 °C-ზე მიმდინარეობს ძლიერი აფეთქებით",
      "catalyst": "პლატინის (Pt) ზედაპირი ოთახის ტემპერატურაზეც იწვევს რეაქციას",
      "state": "2H₂ (აირი) + O₂ (აირი) → 2H₂O (სითხე/ორთქლი)",
      "details": "2H₂ + O₂ → 2H₂O + 572 კჯ (ძლიერ ეგზოთერმული რეაქცია)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ საწყისი კომპონენტები აირებია (წყალბადი და ჟანგბადი); 100°C-ზე მაღლა წყალიც აირია (ორთქლი)"
    },
    "isCommon": true
  },
  {
    "id": "H-O-peroxide",
    "elements": [
      "H",
      "O"
    ],
    "formula": "H₂₂O₂",
    "nameKa": "წყალბადის პეროქსიდი",
    "nameEn": "Hydrogen peroxide",
    "type": "პეროქსიდი (ჟანგბადის ჟანგვის ხარისხი -1)",
    "compoundClass": "კოვალენტური მოლეკულური ნაერთი",
    "descriptionKa": "უფერო სითხე „მეტალისებრი“ გემოთი. ძლიერი მჟანგავი და ანტისეპტიკი. სინათლეზე და კატალიზატორების თანაობისას ადვილად იშლება წყლად და ჟანგბადად.",
    "reactionConditions": {
      "temperature": "ოთახის ტემპერატურა",
      "catalyst": "MnO₂ კატალიზატორი იწვევს მყისიერ ქაფისებრ დაშლას",
      "state": "2H₂O₂ (ხსნარი) → 2H₂O (სითხე) + O₂ ⬆️ (აირი)",
      "details": "2H₂O₂ → 2H₂O + O₂ ⬆️ (ეგზოთერმული დაშლა)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ დაშლისას ინტენსიურად გამოიყოფა სუფთა ჟანგბადი (O₂)"
    },
    "isCommon": true
  },
  {
    "id": "C-O-monoxide",
    "elements": [
      "C",
      "O"
    ],
    "formula": "CO",
    "nameKa": "ნახშირბადის მონოქსიდი (მხუთავი აირი)",
    "nameEn": "Carbon monoxide",
    "type": "მარილარწარმომქმნელი (ინდიფერენტული) ოქსიდი",
    "compoundClass": "მარილარწარმომქმნელი ოქსიდი",
    "descriptionKa": "უფერო, უსუნო, ჰაერზე ოდნავ მსუბუქი ძლიერ მომწამვლელი აირი. უკავშირდება სისხლის ჰემოგლობინს და იწვევს ჟანგბადოვან შიმშილს.",
    "reactionConditions": {
      "temperature": "ნახშირბადის არასრული წვა ჟანგბადის ნაკლებობისას > 800 °C-ზე",
      "catalyst": "არ საჭიროებს",
      "state": "2C (მყარი) + O₂ (აირი, ნაკლებობა) → 2CO (აირი)",
      "details": "2C + O₂ → 2CO (წარმოიქმნება ღუმელებში ჟანგბადის შეზღუდული მიწოდებისას)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ უფერო, უსუნო, მომწამვლელი მხუთავი აირი"
    },
    "nonSaltFormingOxide": {
      "isNonSaltForming": true,
      "explanation": "⚠️ მარილარწარმომქმნელი (ინდიფერენტული) ოქსიდი — არ შედის რეაქციაში წყალთან, ტუტეებთან და მჟავებთან მარილის წარმოქმნით!"
    },
    "hazardWarning": "⚠️ სასიკვდილოდ საშიში მხუთავი აირი! შეუმჩნეველია უსუნო ბუნების გამო.",
    "isCommon": true
  },
  {
    "id": "C-O-dioxide",
    "elements": [
      "C",
      "O"
    ],
    "formula": "CO₂",
    "nameKa": "ნახშირბადის დიოქსიდი (ნახშირორჟანგი)",
    "nameEn": "Carbon dioxide",
    "type": "მჟავური ოქსიდი",
    "compoundClass": "მჟავური ოქსიდი",
    "descriptionKa": "უფერო, ოდნავ მომჟავო სუნის მქონე, ჰაერზე 1.5-ჯერ მძიმე აირი. არ იწვის და არ უჭერს მხარს წვას (გამოიყენება ცეცხლსაქრობებში). სუნთქვისა და წვის პროდუქტი.",
    "reactionConditions": {
      "temperature": "ნახშირბადის ან ორგანული ნივთიერებების სრული წვა ჟანგბადის სიჭარბეში",
      "catalyst": "არ საჭიროებს",
      "state": "C (მყარი) + O₂ (აირი, სიჭარბე) → CO₂ (აირი)",
      "details": "C + O₂ → CO₂ + 393.5 კჯ (სრული წვა)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ უფერო, ჰაერზე მძიმე აირი"
    },
    "isCommon": true
  },
  {
    "id": "C-H-methane",
    "elements": [
      "C",
      "H"
    ],
    "formula": "CH₄",
    "nameKa": "მეთანი (ჭაობის აირი, ბუნებრივი აირი)",
    "nameEn": "Methane",
    "type": "ნახშირწყალბადი (ალკანი)",
    "compoundClass": "ორგანული ნაერთი",
    "descriptionKa": "ორგანული ქიმიის უმარტივესი წარმომადგენელი, ბუნებრივი აირის მთავარი კომპონენტი (90-98%). უფერო, უსუნო, ჰაერზე მსუბუქი სათბობი აირი.",
    "reactionConditions": {
      "temperature": "პირდაპირი სინთეზი > 500 °C მაღალი წნევით ნიკელის თანაობისას; ან ბუნებრივი წარმოშობა",
      "catalyst": "Ni კატალიზატორი",
      "state": "C (მყარი) + 2H₂ (აირი) ⇌ CH₄ (აირი)",
      "details": "CH₄ + 2O₂ → CO₂ + 2H₂O + 890 კჯ (წვა)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ უფერო, ადვილაალებადი სათბობი აირი"
    },
    "isCommon": true
  },
  {
    "id": "C-H-ethane",
    "elements": [
      "C",
      "H"
    ],
    "formula": "C₂H₆",
    "nameKa": "ეთანი",
    "nameEn": "Ethane",
    "type": "ნახშირწყალბადი (ალკანი)",
    "compoundClass": "ორგანული ნაერთი",
    "descriptionKa": "ჰომოლოგიური რიგის მეორე წევრი. უფერო, უსუნო აირი, გამოიყენება ეთილენის მისაღებად და საწვავად.",
    "reactionConditions": {
      "temperature": "ბუნებრივი აირის ფრაქციული გამოყოფა ან ნავთობის კრეკინგი",
      "state": "2C + 3H₂ → C₂H₆",
      "details": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O (წვა)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ აირი"
    },
    "isCommon": true
  },
  {
    "id": "C-H-ethene",
    "elements": [
      "C",
      "H"
    ],
    "formula": "C₂H₄",
    "nameKa": "ეთილენი (ეთენი)",
    "nameEn": "Ethylene",
    "type": "უჯერი ნახშირწყალბადი (ალკენი, ორმაგი ბმით C=C)",
    "compoundClass": "ორგანული ნაერთი",
    "descriptionKa": "მსოფლიოში ყველაზე მეტი რაოდენობით წარმოებული ორგანული ნაერთი. პოლიეთილენის მონომერი, მცენარეთა ჰორმონი (აჩქარებს ხილის დამწიფებას).",
    "reactionConditions": {
      "temperature": "ეთანოლის დეჰიდრატაცია ან ნახშირწყალბადების პიროლიზი > 700 °C",
      "state": "C₂H₄ (აირი)",
      "details": "C₂H₄ + Br₂ (ბრომიანი წყალი) → C₂H₄Br₂ (უფერულდება)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ სუსტი ეთეროვანი სუნის აირი"
    },
    "isCommon": true
  },
  {
    "id": "C-H-ethyne",
    "elements": [
      "C",
      "H"
    ],
    "formula": "C₂H₂",
    "nameKa": "აცეტილენი (ეთინი)",
    "nameEn": "Acetylene",
    "type": "უჯერი ნახშირწყალბადი (ალკინი, სამმაგი ბმით C≡C)",
    "compoundClass": "ორგანული ნაერთი",
    "descriptionKa": "სამმაგბმიანი ნახშირწყალბადი. ჟანგბადში წვისას ავითარებს > 3000 °C ტემპერატურას (გამოიყენება ლითონების აცეტილენური შედუღებისა და ჭრისთვის).",
    "reactionConditions": {
      "temperature": "კალციუმის კარბიდის ჰიდროლიზით: CaC₂ + 2H₂O → C₂H₂ ⬆️ + Ca(OH)₂",
      "state": "CaC₂ + 2H₂O → C₂H₂ ⬆️ + Ca(OH)₂",
      "details": "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O (მაღალტემპერატურული წვა > 3000 °C)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ ფეთქებადსაშიში აირი"
    },
    "isCommon": true
  },
  {
    "id": "C-H-benzene",
    "elements": [
      "C",
      "H"
    ],
    "formula": "C₆H₆",
    "nameKa": "ბენზოლი",
    "nameEn": "Benzene",
    "type": "არომატული ნახშირწყალბადი (არენი)",
    "compoundClass": "ორგანული ნაერთი",
    "descriptionKa": "არომატულ ნაერთთა უმარტივესი წარმომადგენელი 6-წევრიანი ციკლით და დელოკალიზებული π-ელექტრონული სისტემით. დამახასიათებელი სუნის მქონე უფერო სითხე.",
    "reactionConditions": {
      "temperature": "აცეტილენის ციკლოტრიმერიზაცია გახურებულ აქტივირებულ ნახშირზე > 600 °C",
      "catalyst": "C (აქტივირებული ნახშირი)",
      "state": "3C₂H₂ → C₆H₆",
      "details": "3C₂H₂ (აირი) → C₆H₆ (სითხე)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "N-O-monoxide",
    "elements": [
      "N",
      "O"
    ],
    "formula": "NO",
    "nameKa": "აზოტის მონოქსიდი",
    "nameEn": "Nitric oxide",
    "type": "მარილარწარმომქმნელი (ინდიფერენტული) ოქსიდი",
    "compoundClass": "მარილარწარმომქმნელი ოქსიდი",
    "descriptionKa": "უფერო აირი. ჰაერზე შეხებისთანავე მყისიერად იჟანგება მურა ფერის აზოტის დიოქსიდად (NO₂).",
    "reactionConditions": {
      "temperature": "ელექტრული განმუხტვისას ან > 2000 °C-ზე (ჭექა-ქუხილის დროს)",
      "catalyst": "პლატინა (ამიაკის სამრეწველო ჟანგვისას)",
      "state": "N₂ (აირი) + O₂ (აირი) ⇌ 2NO (აირი)",
      "details": "N₂ + O₂ ⇌ 2NO - 180.8 კჯ (ენდოთერმული რეაქცია)",
      "isExothermic": false
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ უფერო აირი, ჰაერზე წამებში მურავდება"
    },
    "nonSaltFormingOxide": {
      "isNonSaltForming": true,
      "explanation": "⚠️ მარილარწარმომქმნელი (ინდიფერენტული) ოქსიდი — არ წარმოქმნის მარილებს მჟავებთან ან ფუძეებთან."
    },
    "isCommon": true
  },
  {
    "id": "N-O-dioxide",
    "elements": [
      "N",
      "O"
    ],
    "formula": "NO₂",
    "nameKa": "აზოტის დიოქსიდი (მურა აირი / მელაკუდა)",
    "nameEn": "Nitrogen dioxide",
    "type": "მჟავური ოქსიდი",
    "compoundClass": "მჟავური ოქსიდი",
    "descriptionKa": "დამახასიათებელი მძაფრი სუნის მქონე მურა/მოყავისფრო ტოქსიკური აირი. წყალში გახსნისას წარმოქმნის აზოტმჟავასა და აზოტოვან მჟავას.",
    "reactionConditions": {
      "temperature": "აზოტის მონოქსიდის ჟანგვა ჰაერზე ოთახის ტემპერატურაზე",
      "state": "2NO + O₂ → 2NO₂ ⬆️",
      "details": "2NO₂ + H₂O → HNO₃ + HNO₂",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ მურა ფერის მახრჩობელა ტოქსიკური აირი"
    },
    "hazardWarning": "⚠️ ძლიერ ტოქსიკური მახრჩობელა აირი! აზიანებს სასუნთქ გზებს.",
    "isCommon": true
  },
  {
    "id": "N-O-nitrous",
    "elements": [
      "N",
      "O"
    ],
    "formula": "N₂O",
    "nameKa": "აზოტის(I) ოქსიდი (მალხენი აირი / აზოტის ქვეჟანგი)",
    "nameEn": "Nitrous oxide",
    "type": "მარილარწარმომქმნელი (ინდიფერენტული) ოქსიდი",
    "compoundClass": "მარილარწარმომქმნელი ოქსიდი",
    "descriptionKa": "სასიამოვნო სუნისა და მოტკბო გემოს მქონე უფერო აირი. მცირე დოზით იწვევს ეიფორიას (აქედან სახელი), გამოიყენება ანესთეზიაში და სარბოლო ავტომობილებში (Nitro).",
    "reactionConditions": {
      "temperature": "ამონიუმის ნიტრატის ფრთხილი თერმული დაშლით 200-250 °C-ზე",
      "state": "NH₄NO₃ → N₂O ⬆️ + 2H₂O",
      "details": "NH₄NO₃ → N₂O + 2H₂O",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ უფერო, მოტკბო სუნის აირი"
    },
    "nonSaltFormingOxide": {
      "isNonSaltForming": true,
      "explanation": "⚠️ მარილარწარმომქმნელი ოქსიდი — არ ურთიერთქმედებს წყალთან და ტუტეებთან."
    },
    "isCommon": true
  },
  {
    "id": "Na-Cl",
    "elements": [
      "Na",
      "Cl"
    ],
    "formula": "NaCl",
    "nameKa": "ნატრიუმის ქლორიდი (სუფრის მარილი / ჰალიტი)",
    "nameEn": "Sodium chloride",
    "type": "იონური ნაერთი, ნორმალური მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "კუბური კრისტალური მესრის მქონე უფერო კრისტალები. საკვების შეუცვლელი კომპონენტი და ქიმიური მრეწველობის მთავარი ნედლეული.",
    "reactionConditions": {
      "temperature": "გახურებული ნატრიუმის შეტანა ქლორის აირში — იწვის კაშკაშა ყვითელი ალით",
      "catalyst": "წყლის უმცირესი კვალი აჩქარებს",
      "state": "2Na (მყარი) + Cl₂ (აირი) → 2NaCl (თეთრი კრისტალები)",
      "details": "2Na + Cl₂ → 2NaCl + 822 კჯ (ენერგიული ეგზოთერმული რეაქცია)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "K-Cl",
    "elements": [
      "K",
      "Cl"
    ],
    "formula": "KCl",
    "nameKa": "კალიუმის ქლორიდი (სილვინი)",
    "nameEn": "Potassium chloride",
    "type": "იონური ნორმალური მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი კრისტალური ნივთიერება, მთავარი კალიუმიანი სასუქი სოფლის მეურნეობაში და მედიცინაში ელექტროლიტური ბალანსისთვის.",
    "reactionConditions": {
      "temperature": "კალიუმის წვა ქლორში ან KOH-ისა და HCl-ის ნეიტრალიზაცია",
      "state": "2K + Cl₂ → 2KCl",
      "details": "KOH + HCl → KCl + H₂O",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Ca-Cl",
    "elements": [
      "Ca",
      "Cl"
    ],
    "formula": "CaCl₂",
    "nameKa": "კალციუმის ქლორიდი",
    "nameEn": "Calcium chloride",
    "type": "იონური მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი ჰიგროსკოპული კრისტალები, ჰაერიდან ინტენსიურად შთანთქავს ტენს. გამოიყენება გზების მოსაყინად და გაზების დასაშრობად.",
    "reactionConditions": {
      "temperature": "კალციუმის კარბონატის გახსნა მარილმჟავაში",
      "state": "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂ ⬆️",
      "details": "Ca + Cl₂ → CaCl₂",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Mg-Cl",
    "elements": [
      "Mg",
      "Cl"
    ],
    "formula": "MgCl₂",
    "nameKa": "მაგნიუმის ქლორიდი (ბიშოფიტი)",
    "nameEn": "Magnesium chloride",
    "type": "იონური მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "ზღვის წყლისა და მლაშე ტბების მთავარი კომპონენტი, გამოიყენება მეტალური მაგნიუმის მისაღებად.",
    "reactionConditions": {
      "temperature": "მაგნიუმის წვა ქლორში ან Mg(OH)₂-ის გახსნა მარილმჟავაში",
      "state": "Mg + Cl₂ → MgCl₂",
      "details": "Mg + 2HCl → MgCl₂ + H₂ ⬆️",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Al-Cl",
    "elements": [
      "Al",
      "Cl"
    ],
    "formula": "AlCl₃",
    "nameKa": "ალუმინის ქლორიდი",
    "nameEn": "Aluminium chloride",
    "type": "კოვალენტური/იონური მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი/მოყვითალო კრისტალები, ლუისის ძლიერი მჟავა. ორგანულ სინთეზში შეუცვლელი კატალიზატორი (ფრიდელ-კრაფტსის რეაქცია).",
    "reactionConditions": {
      "temperature": "გაცხელებული ალუმინის ურთიერთქმედება მშრალ ქლორთან",
      "state": "2Al + 3Cl₂ → 2AlCl₃",
      "details": "2Al + 6HCl → 2AlCl₃ + 3H₂ ⬆️",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Fe-Cl-2",
    "elements": [
      "Fe",
      "Cl"
    ],
    "formula": "FeCl₂",
    "nameKa": "რკინის(II) ქლორიდი",
    "nameEn": "Iron(II) chloride",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "მომწვანო კრისტალები. მიიღება რკინის გახსნით მარილმჟავაში უჟანგბადო გარემოში.",
    "reactionConditions": {
      "temperature": "ოთახის ტემპერატურა",
      "state": "Fe + 2HCl → FeCl₂ + H₂ ⬆️",
      "details": "Fe + 2HCl → FeCl₂ + H₂ ⬆️ (რკინა იჟანგება მხოლოდ +2-მდე)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Fe-Cl-3",
    "elements": [
      "Fe",
      "Cl"
    ],
    "formula": "FeCl₃",
    "nameKa": "რკინის(III) ქლორიდი",
    "nameEn": "Iron(III) chloride",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "მუქი ყავისფერი კრისტალები. მიიღება რკინის წვით ქლორში (ძლიერი მჟანგავი აგენტი ქლორი რკინას +3-მდე ჟანგავს). სისხლის შემადედებელი და წყლის გამწმენდი.",
    "reactionConditions": {
      "temperature": "გახურებული რკინის წვა ქლორის აირში",
      "state": "2Fe + 3Cl₂ → 2FeCl₃",
      "details": "2Fe + 3Cl₂ → 2FeCl₃ (ქლორი რკინას ჟანგავს +3-მდე)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Cu-Cl",
    "elements": [
      "Cu",
      "Cl"
    ],
    "formula": "CuCl₂",
    "nameKa": "სპილენძის(II) ქლორიდი",
    "nameEn": "Copper(II) chloride",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "მუქი ყავისფერი მყარი ნივთიერება (უწყლო), წყალხსნარში იძლევა კაშკაშა ლურჯ-მწვანე ფერს. გამოიყენება კატალიზატორად და პიროტექნიკაში მწვანე ალისთვის.",
    "reactionConditions": {
      "temperature": "სპილენძის წვა ქლორში",
      "state": "Cu + Cl₂ → CuCl₂",
      "details": "Cu + Cl₂ → CuCl₂",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Ag-Cl",
    "elements": [
      "Ag",
      "Cl"
    ],
    "formula": "AgCl",
    "nameKa": "ვერცხლის ქლორიდი",
    "nameEn": "Silver chloride",
    "type": "უხსნადი მარილი (ნალექი)",
    "compoundClass": "მარილი",
    "descriptionKa": "ქლორ-იონის (Cl⁻) აღმომჩენი კლასიკური ანალიზური რეაქცია. სინათლეზე იშლება და მუქდება მეტალური ვერცხლის გამოყოფის გამო.",
    "reactionConditions": {
      "temperature": "ოთახის ტემპერატურა (Ag⁺ და Cl⁻ ხსნარების შერევა)",
      "state": "Ag⁺ (ხსნარი) + Cl⁻ (ხსნარი) → AgCl ⬇️ (მყარი ნალექი)",
      "details": "AgNO₃ + NaCl → AgCl ⬇️ + NaNO₃",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ თეთრი ხაჭოსებრი ნალექი (სინათლეზე მუქდება)"
    },
    "isCommon": true
  },
  {
    "id": "Ag-Br",
    "elements": [
      "Ag",
      "Br"
    ],
    "formula": "AgBr",
    "nameKa": "ვერცხლის ბრომიდი",
    "nameEn": "Silver bromide",
    "type": "უხსნადი მარილი (ნალექი)",
    "compoundClass": "მარილი",
    "descriptionKa": "სინათლისადმი ძლიერ მგრძნობიარე მოყვითალო ნალექი. ტრადიციული შავ-თეთრი ფოტოგრაფიის ისტორიული საფუძველი.",
    "reactionConditions": {
      "temperature": "Ag⁺ და Br⁻ მარილების ხსნარების შერევა",
      "state": "Ag⁺ + Br⁻ → AgBr ⬇️",
      "details": "AgNO₃ + KBr → AgBr ⬇️ + KNO₃",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ ღია ყვითელი (კრემისფერი) ხაჭოსებრი ნალექი"
    },
    "isCommon": true
  },
  {
    "id": "Ag-I",
    "elements": [
      "Ag",
      "I"
    ],
    "formula": "AgI",
    "nameKa": "ვერცხლის იოდიდი",
    "nameEn": "Silver iodide",
    "type": "უხსნადი მარილი (ნალექი)",
    "compoundClass": "მარილი",
    "descriptionKa": "წყალში პრაქტიკულად სრულიად უხსნადი ყვითელი ნალექი. გამოიყენება ხელოვნური წვიმის გამოსაწვევად ღრუბლების დასათესად.",
    "reactionConditions": {
      "temperature": "Ag⁺ და I⁻ ხსნარების შერევა",
      "state": "Ag⁺ + I⁻ → AgI ⬇️",
      "details": "AgNO₃ + KI → AgI ⬇️ + KNO₃",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ მკვეთრი ყვითელი ხაჭოსებრი ნალექი"
    },
    "isCommon": true
  },
  {
    "id": "Pb-I",
    "elements": [
      "Pb",
      "I"
    ],
    "formula": "PbI₂",
    "nameKa": "ტყვიის(II) იოდიდი (ოქროს წვიმა)",
    "nameEn": "Lead(II) iodide",
    "type": "უხსნადი მარილი (კრისტალური ნალექი)",
    "compoundClass": "მარილი",
    "descriptionKa": "კაშკაშა ოქროსფერი კრისტალები. ცხელ წყალში იხსნება და გაცივებისას ილექება მბზინავ ფანტელებად („ოქროს წვიმის“ ექსპერიმენტი).",
    "reactionConditions": {
      "temperature": "Pb²⁺ და I⁻ მარილების ხსნარების შერევა",
      "state": "Pb²⁺ (ხსნარი) + 2I⁻ (ხსნარი) → PbI₂ ⬇️ (კრისტალები)",
      "details": "Pb(NO₃)₂ + 2KI → PbI₂ ⬇️ + 2KNO₃",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ კაშკაშა ყვითელი/ოქროსფერი მბზინავი კრისტალური ნალექი („ოქროს წვიმა“)"
    },
    "hazardWarning": "⚠️ ტოქსიკურია ტყვიის შემცველობის გამო!",
    "isCommon": true
  },
  {
    "id": "H-Cl",
    "elements": [
      "H",
      "Cl"
    ],
    "formula": "HCl",
    "nameKa": "ქლორწყალბადი (წყალხსნარში — მარილმჟავა)",
    "nameEn": "Hydrogen chloride / Hydrochloric acid",
    "type": "მჟავა, კოვალენტური პოლარული აირი",
    "compoundClass": "მჟავა",
    "descriptionKa": "უფერო, მძაფრი სუნის მქონე მახრჩობელა აირი, რომელიც კარგად იხსნება წყალში და ქმნის ძლიერ მარილმჟავას. კუჭის წვენის ბუნებრივი კომპონენტი.",
    "reactionConditions": {
      "temperature": "სინათლის (ფოტონის hν) ან ალის მოქმედებით მიმდინარეობს აფეთქებით",
      "state": "H₂ (აირი) + Cl₂ (აირი) → 2HCl ⬆️ (აირი)",
      "details": "H₂ + Cl₂ → 2HCl (ჯაჭვური რადიკალური რეაქცია)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ ჰაერზე მწევარი, მძაფრი სუნის მახრჩობელა აირი"
    },
    "isCommon": true
  },
  {
    "id": "H-F",
    "elements": [
      "H",
      "F"
    ],
    "formula": "HF",
    "nameKa": "ფთორწყალბადმჟავა (პლავიკის მჟავა)",
    "nameEn": "Hydrofluoric acid",
    "type": "მჟავა",
    "compoundClass": "მჟავა",
    "descriptionKa": "ერთადერთი მჟავა, რომელიც შლის მინას (SiO₂ + 4HF → SiF₄ ⬆️ + 2H₂O). ინახება მხოლოდ პლასტმასის ჭურჭელში. უკიდურესად საშიშია კანზე მოხვედრისას.",
    "reactionConditions": {
      "temperature": "CaF₂-ზე გოგირდმჟავას მოქმედებით ან H₂ და F₂-ის აფეთქებით სიბნელეშიც კი",
      "state": "H₂ + F₂ → 2HF ⬆️",
      "details": "SiO₂ + 4HF → SiF₄ ⬆️ + 2H₂O (მინის ამოჭმა)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ მძაფრი სუნის მომწამვლელი აირი"
    },
    "hazardWarning": "⚠️ უკიდურესად საშიში და აგრესიული მჟავა! შლის მინას და იწვევს ღრმა დამწვრობას.",
    "isCommon": true
  },
  {
    "id": "H-Br",
    "elements": [
      "H",
      "Br"
    ],
    "formula": "HBr",
    "nameKa": "ბრომწყალბადი (ბრომწყალბადმჟავა)",
    "nameEn": "Hydrogen bromide",
    "type": "ძლიერი მჟავა",
    "compoundClass": "მჟავა",
    "descriptionKa": "უფერო, ჰაერზე მწევარი აირი, ძალიან ძლიერი მჟავა წყალხსნარში. გამოიყენება ბრომიდების მისაღებად.",
    "reactionConditions": {
      "temperature": "H₂ და Br₂-ის სინთეზი გაცხელებით პლატინის თანაობისას",
      "state": "H₂ + Br₂ → 2HBr ⬆️",
      "details": "H₂ + Br₂ ⇌ 2HBr",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ ჰაერზე მწევარი მძაფრი აირი"
    },
    "isCommon": true
  },
  {
    "id": "H-I",
    "elements": [
      "H",
      "I"
    ],
    "formula": "HI",
    "nameKa": "იოდწყალბადი (იოდწყალბადმჟავა)",
    "nameEn": "Hydrogen iodide",
    "type": "უძლიერესი ჰალოგენწყალბადმჟავა",
    "compoundClass": "მჟავა",
    "descriptionKa": "ჰალოგენწყალბადმჟავებს შორის ყველაზე ძლიერი მჟავა და ძლიერი აღმდგენი. სინათლეზე ადვილად იშლება და მუქდება გამოყოფილი იოდისგან.",
    "reactionConditions": {
      "temperature": "H₂ და I₂-ის შექცევადი ენდოთერმული სინთეზი > 400 °C",
      "state": "H₂ + I₂ ⇌ 2HI ⬆️",
      "details": "2HI ⇌ H₂ + I₂",
      "isExothermic": false
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ უფერო აირი, იოლად იშლება"
    },
    "isCommon": true
  },
  {
    "id": "H-S",
    "elements": [
      "H",
      "S"
    ],
    "formula": "H₂S",
    "nameKa": "გოგირდწყალბადი",
    "nameEn": "Hydrogen sulfide",
    "type": "სუსტი მჟავა, აირი",
    "compoundClass": "მჟავა",
    "descriptionKa": "დამახასიათებელი ლაყე კვერცხის სუნის მქონე, ძლიერ მომწამვლელი აირი. ბუნებაში გვხვდება ვულკანურ აირებსა და შავ ზღვაში 150-200 მ სიღრმის ქვემოთ.",
    "reactionConditions": {
      "temperature": "H₂-ისა და გოგირდის ორთქლის შეერთება > 300 °C-ზე ან სულფიდებზე მჟავას მოქმედება",
      "state": "FeS + 2HCl → FeCl₂ + H₂S ⬆️",
      "details": "H₂ + S ⇌ H₂S + 20.6 კჯ",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ ლაყე კვერცხის სუნის მქონე ძლიერ ტოქსიკური აირი"
    },
    "hazardWarning": "⚠️ სასიკვდილოდ საშიში აირი! მაღალი კონცენტრაციისას აპარალიზებს ყნოსვის რეცეპტორებს.",
    "isCommon": true
  },
  {
    "id": "H-N",
    "elements": [
      "H",
      "N"
    ],
    "formula": "NH₃",
    "nameKa": "ამიაკი",
    "nameEn": "Ammonia",
    "type": "ფუძე თვისებების მქონე აირი",
    "compoundClass": "ტუტე / ფუძე",
    "descriptionKa": "მძაფრი, სპეციფიკური სუნის მქონე აირი. წყალში უჩვეულოდ კარგად იხსნება (1 ლ წყალში ~700 ლ ამიაკი) და ავლენს ფუძე თვისებებს. აზოტოვანი სასუქების წარმოების საფუძველი.",
    "reactionConditions": {
      "temperature": "ჰაბერ-ბოშის პროცესი: 450-500 °C, 200 ატმ წნევა, რკინის (Fe) კატალიზატორი",
      "catalyst": "Fe კატალიზატორი (აქტივატორებით Al₂O₃, K₂O)",
      "state": "N₂ (აირი) + 3H₂ (აირი) ⇌ 2NH₃ (აირი) + 92 კჯ",
      "details": "N₂ + 3H₂ ⇌ 2NH₃ (ეგზოთერმული, მოცულობის შემცირებით)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ მძაფრი, ცრემლსადენი სუნის მქონე აირი"
    },
    "isCommon": true
  },
  {
    "id": "O-S-dioxide",
    "elements": [
      "O",
      "S"
    ],
    "formula": "SO₂",
    "nameKa": "გოგირდის დიოქსიდი (გოგირდოვანი აირი)",
    "nameEn": "Sulfur dioxide",
    "type": "მჟავური ოქსიდი",
    "compoundClass": "მჟავური ოქსიდი",
    "descriptionKa": "დამწვარი ასანთის მძაფრი მახრჩობელა სუნის მქონე უფერო აირი. მჟავური წვიმების მთავარი მიზეზი. გამოიყენება მეღვინეობაში ანტისეპტიკად.",
    "reactionConditions": {
      "temperature": "გოგირდის ან სულფიდების წვა ჰაერზე",
      "state": "S (მყარი) + O₂ (აირი) → SO₂ ⬆️ (აირი)",
      "details": "S + O₂ → SO₂ + 297 კჯ",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ მახრჩობელა სუნის მჟავური აირი"
    },
    "isCommon": true
  },
  {
    "id": "O-S-trioxide",
    "elements": [
      "O",
      "S"
    ],
    "formula": "SO₃",
    "nameKa": "გოგირდის ტრიოქსიდი (გოგირდის ანჰიდრიდი)",
    "nameEn": "Sulfur trioxide",
    "type": "მჟავური ოქსიდი",
    "compoundClass": "მჟავური ოქსიდი",
    "descriptionKa": "გოგირდმჟავას ანჰიდრიდი. ოთახის ტემპერატურაზე თეთრი აბრეშუმისებრი კრისტალები ან სითხე. წყალთან ურთიერთქმედებს ძლიერი აფეთქებით და დიდი სითბოს გამოყოფით.",
    "reactionConditions": {
      "temperature": "SO₂-ის კატალიზური ჟანგვა 450 °C-ზე",
      "catalyst": "V₂O₅ (ვანადიუმის(V) ოქსიდი)",
      "state": "2SO₂ + O₂ ⇌ 2SO₃",
      "details": "SO₃ + H₂O → H₂SO₄ + სითბო",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "P-O-pentoxide",
    "elements": [
      "O",
      "P"
    ],
    "formula": "P₂O₅",
    "nameKa": "ფოსფორის(V) ოქსიდი (ფოსფორის ანჰიდრიდი / P₄O₁₀)",
    "nameEn": "Phosphorus pentoxide",
    "type": "მჟავური ოქსიდი",
    "compoundClass": "მჟავური ოქსიდი",
    "descriptionKa": "თეთრი თოვლისებრი ფხვნილი. ქიმიაში ერთ-ერთი ყველაზე ძლიერი წყალწამრთმევი (დეჰიდრატაციული) აგენტი.",
    "reactionConditions": {
      "temperature": "თეთრი ან წითელი ფოსფორის ენერგიული წვა ჟანგბადის სიჭარბეში",
      "state": "4P + 5O₂ → 2P₂O₅ (თეთრი კვამლი/ფხვნილი)",
      "details": "P₂O₅ + 3H₂O → 2H₃PO₄",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Si-O-dioxide",
    "elements": [
      "O",
      "Si"
    ],
    "formula": "SiO₂",
    "nameKa": "სილიციუმის დიოქსიდი (კვარცი, სილიციუმის ანჰიდრიდი, ქვიშა)",
    "nameEn": "Silicon dioxide / Quartz",
    "type": "მჟავური ოქსიდი (ატომური კრისტალური მესრით)",
    "compoundClass": "მჟავური ოქსიდი",
    "descriptionKa": "ატომური კრისტალური მესრის მქონე ძალიან მყარი, მაღალლღობადი ნივთიერება. დედამიწის ქერქის მთავარი მინერალი. წყალში არ იხსნება, იხსნება მხოლოდ ფთორწყალბადმჟავასა და გამდნარ ტუტეებში.",
    "reactionConditions": {
      "temperature": "სილიციუმის წვა ჟანგბადში > 1000 °C ან ბუნებრივი მინერალი",
      "state": "Si + O₂ → SiO₂",
      "details": "SiO₂ + 2NaOH (ნალღობი) → Na₂SiO₃ + H₂O",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Ca-O",
    "elements": [
      "Ca",
      "O"
    ],
    "formula": "CaO",
    "nameKa": "კალციუმის ოქსიდი (ჩაუმქრალი კირი)",
    "nameEn": "Calcium oxide / Quicklime",
    "type": "ფუძე ოქსიდი",
    "compoundClass": "ფუძე ოქსიდი",
    "descriptionKa": "თეთრი ცეცხლგამძლე ნივთიერება. წყლის დამატებისას ხდება კირის „ჩაქრობა“ — გამოიყოფა უზარმაზარი სითბო და წყალი დუღდება.",
    "reactionConditions": {
      "temperature": "კირქვის (CaCO₃) გამოწვა > 900-1000 °C-ზე",
      "state": "CaCO₃ (მყარი) → CaO (მყარი) + CO₂ ⬆️ (აირი)",
      "details": "CaO + H₂O → Ca(OH)₂ + 65 კჯ (კირის ჩაქრობა)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Mg-O",
    "elements": [
      "Mg",
      "O"
    ],
    "formula": "MgO",
    "nameKa": "მაგნიუმის ოქსიდი (მწვავე მაგნეზია)",
    "nameEn": "Magnesium oxide",
    "type": "ფუძე ოქსიდი",
    "compoundClass": "ფუძე ოქსიდი",
    "descriptionKa": "თეთრი, უკიდურესად მაღალლღობადი (ლღობა ~2850 °C) ფხვნილი. გამოიყენება მეტალურგიული ღუმელების ცეცხლგამძლე ამოსაფენად და მედიცინაში კუჭის მჟავიანობის შესამცირებლად.",
    "reactionConditions": {
      "temperature": "მაგნიუმის ლენტის კაშკაშა კაშკაშა თეთრი ალით წვა ჰაერზე",
      "state": "2Mg + O₂ → 2MgO (თეთრი ნაცარი/ფხვნილი)",
      "details": "2Mg + O₂ → 2MgO + 1204 კჯ",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Ba-O",
    "elements": [
      "Ba",
      "O"
    ],
    "formula": "BaO",
    "nameKa": "ბარიუმის ოქსიდი",
    "nameEn": "Barium oxide",
    "type": "ფუძე ოქსიდი",
    "compoundClass": "ფუძე ოქსიდი",
    "descriptionKa": "თეთრი მყარი ფუძე ოქსიდი, წყალთან ენერგიულად წარმოქმნის ბარიუმის ჰიდროქსიდს (ტუტეს).",
    "reactionConditions": {
      "temperature": "ბარიუმის ნიტრატის ან კარბონატის თერმული დაშლით",
      "state": "2Ba + O₂ → 2BaO",
      "details": "BaO + H₂O → Ba(OH)₂",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Na-O",
    "elements": [
      "Na",
      "O"
    ],
    "formula": "Na₂O",
    "nameKa": "ნატრიუმის ოქსიდი",
    "nameEn": "Sodium oxide",
    "type": "ფუძე ოქსიდი",
    "compoundClass": "ფუძე ოქსიდი",
    "descriptionKa": "თეთრი ძლიერ ფუძე ოქსიდი. წყალთან რეაქციაში შედის მყისიერად და ქმნის ტუტეს (NaOH).",
    "reactionConditions": {
      "temperature": "ნატრიუმის გახურება ჟანგბადის ნაკლებობისას (სიჭარბეში იძლევა Na₂O₂ პეროქსიდს)",
      "state": "4Na + O₂ → 2Na₂O",
      "details": "Na₂O + H₂O → 2NaOH",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "K-O",
    "elements": [
      "K",
      "O"
    ],
    "formula": "K₂O",
    "nameKa": "კალიუმის ოქსიდი",
    "nameEn": "Potassium oxide",
    "type": "ფუძე ოქსიდი",
    "compoundClass": "ფუძე ოქსიდი",
    "descriptionKa": "ფერმკრთალი ყვითელი ფუძე ოქსიდი, წყალთან მყისიერად ქმნის კალიუმის ტუტეს (KOH).",
    "reactionConditions": {
      "temperature": "კალიუმის ფრთხილი ჟანგვა",
      "state": "4K + O₂ → 2K₂O",
      "details": "K₂O + H₂O → 2KOH",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Fe-O-feo",
    "elements": [
      "Fe",
      "O"
    ],
    "formula": "FeO",
    "nameKa": "რკინის(II) ოქსიდი",
    "nameEn": "Iron(II) oxide",
    "type": "ფუძე ოქსიდი",
    "compoundClass": "ფუძე ოქსიდი",
    "descriptionKa": "შავი ფერის ფხვნილი. არამდგრადია, ჰაერზე ადვილად იჟანგება Fe₂O₃-მდე.",
    "reactionConditions": {
      "temperature": "Fe₂O₃-ის აღდგენა CO-თი 500-600 °C-ზე",
      "state": "Fe₂O₃ + CO → 2FeO + CO₂ ⬆️",
      "details": "FeO + 2HCl → FeCl₂ + H₂O",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Fe-O-fe2o3",
    "elements": [
      "Fe",
      "O"
    ],
    "formula": "Fe₂O₃",
    "nameKa": "რკინის(III) ოქსიდი (წითელი რკინაქვა / ჰემატიტი, ჟანგი)",
    "nameEn": "Iron(III) oxide / Rust",
    "type": "ამფოტერული ოქსიდი (სუსტი ფუძე თვისებების სიჭარბით)",
    "compoundClass": "ამფოტერული ოქსიდი",
    "descriptionKa": "წითელ-ყავისფერი ფხვნილი. რკინის კოროზიის (ჟანგვის) მთავარი პროდუქტი, უმთავრესი რკინის მადანი მეტალურგიაში.",
    "reactionConditions": {
      "temperature": "რკინის ხანგრძლივი კოროზია ნოტიო ჰაერზე ან Fe(OH)₃-ის გამოწვა",
      "state": "4Fe + 3O₂ → 2Fe₂O₃",
      "details": "Fe₂O₃ + 3CO → 2Fe + 3CO₂ ⬆️ (დომენურ ღუმელში)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Fe-O-fe3o4",
    "elements": [
      "Fe",
      "O"
    ],
    "formula": "Fe₃O₄",
    "nameKa": "რკინის(II,III) ოქსიდი (მაგნეტიტი / რკინის ქერქი / FeO·Fe₂O₃)",
    "nameEn": "Iron(II,III) oxide / Magnetite",
    "type": "შერეული ოქსიდი",
    "compoundClass": "ფუძე ოქსიდი",
    "descriptionKa": "შავი ფერის ძლიერ მაგნიტური მინერალი. წარმოიქმნება რკინის გახურებისას ჰაერზე (რკინის ქერქი).",
    "reactionConditions": {
      "temperature": "რკინის წვა სუფთა ჟანგბადში (ნაპერწკლებით) ან გახურებული რკინის რეაქცია წყლის ორთქლთან",
      "state": "3Fe + 2O₂ → Fe₃O₄",
      "details": "3Fe + 4H₂O (ორთქლი) → Fe₃O₄ + 4H₂ ⬆️",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Cu-O-cuo",
    "elements": [
      "Cu",
      "O"
    ],
    "formula": "CuO",
    "nameKa": "სპილენძის(II) ოქსიდი",
    "nameEn": "Copper(II) oxide",
    "type": "ფუძე ოქსიდი",
    "compoundClass": "ფუძე ოქსიდი",
    "descriptionKa": "შავი ფხვნილი. მიიღება სპილენძის გახურებით ჰაერზე. წყალბადით ან ნახშირბადით ადვილად აღდგება წითელ მეტალურ სპილენძამდე.",
    "reactionConditions": {
      "temperature": "სპილენძის გახურება ჰაერზე > 400 °C-ზე",
      "state": "2Cu + O₂ → 2CuO (შავი ფხვნილი)",
      "details": "CuO + H₂ → Cu + H₂O (აღდგენა წითელ სპილენძამდე)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Cu-O-cu2o",
    "elements": [
      "Cu",
      "O"
    ],
    "formula": "Cu₂O",
    "nameKa": "სპილენძის(I) ოქსიდი (კუპრიტი)",
    "nameEn": "Copper(I) oxide",
    "type": "ფუძე ოქსიდი",
    "compoundClass": "ფუძე ოქსიდი",
    "descriptionKa": "წითელი/აგურისფერი კრისტალური ფხვნილი. გლუკოზის აღმომჩენი რეაქციის (ფელინგის/ტრომერის რეაქცია) ცნობილი პროდუქტი.",
    "reactionConditions": {
      "temperature": "ალდეჰიდების ან გლუკოზის ჟანგვა Cu(OH)₂-ით გაცხელებისას",
      "state": "R-CHO + 2Cu(OH)₂ → R-COOH + Cu₂O ⬇️ (აგურისფერი) + 2H₂O",
      "details": "4Cu + O₂ → 2Cu₂O (> 1000 °C-ზე)",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ აგურისფერი-წითელი ნალექი (ალდეჰიდებისა და გლუკოზის ანალიზური ნიშანი)"
    },
    "isCommon": true
  },
  {
    "id": "Al-O-alumina",
    "elements": [
      "Al",
      "O"
    ],
    "formula": "Al₂O₃",
    "nameKa": "ალუმინის ოქსიდი (კორუნდი, გლინოზიომი)",
    "nameEn": "Aluminium oxide / Corundum",
    "type": "ამფოტერული ოქსიდი",
    "compoundClass": "ამფოტერული ოქსიდი",
    "descriptionKa": "უკიდურესად მყარი (მოოსის სკალით 9), ცეცხლგამძლე თეთრი კრისტალური ნივთიერება. მისი სახესხვაობებია ლალი (რუბინი) და საფირონი. იხსნება როგორც მჟავებში, ისე ტუტეებში.",
    "reactionConditions": {
      "temperature": "ალუმინის ფხვნილის წვა ჰაერზე კაშკაშა ალით ან Al(OH)₃-ის გამოწვა > 1000 °C-ზე",
      "state": "4Al + 3O₂ → 2Al₂O₃",
      "details": "Al₂O₃ + 2NaOH + 3H₂O → 2Na[Al(OH)₄] (ამფოტერულობა)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Zn-O",
    "elements": [
      "Zn",
      "O"
    ],
    "formula": "ZnO",
    "nameKa": "თუთიის ოქსიდი (თუთიის თეთრა)",
    "nameEn": "Zinc oxide",
    "type": "ამფოტერული ოქსიდი",
    "compoundClass": "ამფოტერული ოქსიდი",
    "descriptionKa": "თეთრი ფხვნილი, რომელიც გახურებისას ყვითლდება, ხოლო გაცივებისას ისევ თეთრდება (თერმოქრომიზმი). კლასიკური ამფოტერული ოქსიდი.",
    "reactionConditions": {
      "temperature": "თუთიის წვა ჰაერზე მოცისფრო ალით",
      "state": "2Zn + O₂ → 2ZnO",
      "details": "ZnO + 2HCl → ZnCl₂ + H₂O; ZnO + 2NaOH + H₂O → Na₂[Zn(OH)₄]",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Fe-S",
    "elements": [
      "Fe",
      "S"
    ],
    "formula": "FeS",
    "nameKa": "რკინის(II) სულფიდი",
    "nameEn": "Iron(II) sulfide",
    "type": "უხსნადი მარილი (ნალექი)",
    "compoundClass": "მარილი",
    "descriptionKa": "მუქი რუხი/შავი მყარი ნივთიერება. ქიმიის გაკვეთილებზე რკინისა და გოგირდის ფხვნილების გახურებით ჩატარებული ეგზოთერმული რეაქციის კლასიკური მაგალითი.",
    "reactionConditions": {
      "temperature": "ნარევის ადგილობრივი გახურება — შემდეგ რეაქცია გრძელდება თვითნებურად გავარვარებით",
      "state": "Fe (მყარი) + S (მყარი) → FeS (მყარი)",
      "details": "Fe + S → FeS + 100 კჯ (კლასიკური სასკოლო ექსპერიმენტი)",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ შავი ფერის მყარი ნალექი"
    },
    "isCommon": true
  },
  {
    "id": "Cu-S",
    "elements": [
      "Cu",
      "S"
    ],
    "formula": "CuS",
    "nameKa": "სპილენძის(II) სულფიდი (კოველინი)",
    "nameEn": "Copper(II) sulfide",
    "type": "უხსნადი მარილი (ნალექი)",
    "compoundClass": "მარილი",
    "descriptionKa": "შავი ფერის პრაქტიკულად სრულიად უხსნადი ნალექი, არ იხსნება განზავებულ მარილმჟავასა და გოგირდმჟავაშიც კი.",
    "reactionConditions": {
      "temperature": "Cu²⁺ მარილის ხსნარში H₂S გაზის გატარება",
      "state": "Cu²⁺ + S²⁻ → CuS ⬇️",
      "details": "CuSO₄ + H₂S → CuS ⬇️ + H₂SO₄",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ შავი ფერის უხსნადი ნალექი"
    },
    "isCommon": true
  },
  {
    "id": "Zn-S",
    "elements": [
      "Zn",
      "S"
    ],
    "formula": "ZnS",
    "nameKa": "თუთიის სულფიდი (სფალერიტი)",
    "nameEn": "Zinc sulfide",
    "type": "უხსნადი მარილი (ნალექი)",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი ფერის სულფიდური ნალექი (იშვიათი გამონაკლისი, რადგან უმეტესი ლითონის სულფიდი შავია). გამოიყენება ლუმინოფორებში.",
    "reactionConditions": {
      "temperature": "თუთიის მარილის ხსნარზე ამონიუმის სულფიდის დამატება",
      "state": "Zn²⁺ + S²⁻ → ZnS ⬇️",
      "details": "ZnSO₄ + (NH₄)₂S → ZnS ⬇️ + (NH₄)₂SO₄",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ თეთრი ფერის ნალექი"
    },
    "isCommon": true
  },
  {
    "id": "H-C-O-carbonic",
    "elements": [
      "C",
      "H",
      "O"
    ],
    "formula": "H₂CO₃",
    "nameKa": "ნახშირმჟავა",
    "nameEn": "Carbonic acid",
    "type": "სუსტი ორფუძიანი მჟავა",
    "compoundClass": "მჟავა",
    "descriptionKa": "არამდგრადი სუსტი მჟავა. არსებობს მხოლოდ წყალხსნარში, ადვილად იშლება წყლად და ნახშირორჟანგის ბუშტუკებად (გაზირებული სასმელები).",
    "reactionConditions": {
      "temperature": "წნევის ქვეშ CO₂-ის წყალში გახსნა",
      "state": "CO₂ (აირი) + H₂O (სითხე) ⇌ H₂CO₃ (ხსნარი)",
      "details": "H₂CO₃ ⇌ H₂O + CO₂ ⬆️ (მარტივად იშლება აირის გამოყოფით)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ დაშლისას გამოიყოფა ნახშირორჟანგის აირი (CO₂ ბუშტუკები)"
    },
    "isCommon": true
  },
  {
    "id": "H-C-O-ethanol",
    "elements": [
      "C",
      "H",
      "O"
    ],
    "formula": "C₂H₅OH",
    "nameKa": "ეთანოლი (ეთილის სპირტი, ღვინის სპირტი)",
    "nameEn": "Ethanol",
    "type": "ერთატომიანი ნაჯერი სპირტი",
    "compoundClass": "ორგანული ნაერთი",
    "descriptionKa": "დამახასიათებელი სუნის მქონე უფერო სითხე. მიიღება შაქრების დუღილით ან ეთილენის ჰიდრატაციით. საწვავი, გამხსნელი, ანტისეპტიკი.",
    "reactionConditions": {
      "temperature": "გლუკოზის სპირტული დუღილი ან ეთილენის ჰიდრატაცია 300 °C-ზე H₃PO₄ კატალიზატორით",
      "state": "C₆H₁₂O₆ (საფუარი) → 2C₂H₅OH + 2CO₂ ⬆️",
      "details": "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O (წვა ლურჯი ალით)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "H-C-O-acetic",
    "elements": [
      "C",
      "H",
      "O"
    ],
    "formula": "CH₃COOH",
    "nameKa": "ძმარმჟავა (ეთანმჟავა)",
    "nameEn": "Acetic acid",
    "type": "კარბონმჟავა",
    "compoundClass": "ორგანული ნაერთი",
    "descriptionKa": "მძაფრი მჟავე სუნის მქონე სითხე. 100%-იანი მჟავა 16.6 °C-ზე იყინება ყინულის მსგავს კრისტალებად (ყინულოვანი ძმარმჟავა). სუფრის ძმარი შეიცავს 6-9%-ს.",
    "reactionConditions": {
      "temperature": "ეთანოლის ბიოქიმიური ან ქიმიური ჟანგვა",
      "state": "C₂H₅OH + O₂ → CH₃COOH + H₂O",
      "details": "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂ ⬆️ (სოდის „ჩაქრობა“)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "H-C-O-glucose",
    "elements": [
      "C",
      "H",
      "O"
    ],
    "formula": "C₆H₁₂O₆",
    "nameKa": "გლუკოზა (ყურძნის შაქარი)",
    "nameEn": "Glucose",
    "type": "მონოსაქარიდი (ალდოჰექსოზა)",
    "compoundClass": "ორგანული ნაერთი",
    "descriptionKa": "თეთრი ტკბილი კრისტალური ნივთიერება, ფოტოსინთეზის მთავარი პროდუქტი და ცოცხალი უჯრედის უმთავრესი ენერგეტიკული საწვავი.",
    "reactionConditions": {
      "temperature": "მცენარეთა ფოტოსინთეზი სინათლის ენერგიით ქლოროფილში",
      "state": "6CO₂ + 6H₂O (სინათლე) → C₆H₁₂O₆ + 6O₂ ⬆️",
      "details": "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 2800 კჯ (ბიოლოგიური სუნთქვა)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "H-S-O-sulfuric",
    "elements": [
      "H",
      "O",
      "S"
    ],
    "formula": "H₂SO₄",
    "nameKa": "გოგირდმჟავა",
    "nameEn": "Sulfuric acid",
    "type": "ძლიერი ორფუძიანი არაორგანული მჟავა",
    "compoundClass": "მჟავა",
    "descriptionKa": "„ქიმიური მრეწველობის პური“, მძიმე ზეთოვანი უფერო სითხე. წყალთან შერევისას გამოიყოფა უზარმაზარი სითბო (წესი: ყოველთვის მჟავა უნდა ჩაისხას წყალში და არა პირიქით!).",
    "reactionConditions": {
      "temperature": "საკონტაქტო მეთოდი: SO₃-ის შთანთქმა კონცენტრირებულ მჟავაში (ოლეუმი)",
      "state": "SO₃ (აირი) + H₂O (სითხე) → H₂SO₄ (სითხე)",
      "details": "SO₃ + H₂O → H₂SO₄ + 132 კჯ",
      "isExothermic": true
    },
    "hazardWarning": "⚠️ ძლიერ მწვავე და საშიში ნივთიერება! ნახშირებს ორგანულ ნივთიერებებს (ხეს, ქაღალდს, შაქარს).",
    "isCommon": true
  },
  {
    "id": "H-S-O-sulfurous",
    "elements": [
      "H",
      "O",
      "S"
    ],
    "formula": "H₂SO₃",
    "nameKa": "გოგირდოვანი მჟავა",
    "nameEn": "Sulfurous acid",
    "type": "საშუალო სიძლიერის არამდგრადი მჟავა",
    "compoundClass": "მჟავა",
    "descriptionKa": "საშუალო სიძლიერის ორფუძიანი მჟავა, არსებობს მხოლოდ წყალხსნარში. ძლიერი აღმდგენი და გამათეთრებელი.",
    "reactionConditions": {
      "temperature": "SO₂ გაზის წყალში გახსნით",
      "state": "SO₂ + H₂O ⇌ H₂SO₃",
      "details": "H₂SO₃ ⇌ H₂O + SO₂ ⬆️",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "H-N-O-nitric",
    "elements": [
      "H",
      "N",
      "O"
    ],
    "formula": "HNO₃",
    "nameKa": "აზოტმჟავა",
    "nameEn": "Nitric acid",
    "type": "უძლიერესი მჟანგავი ერთფუძიანი მჟავა",
    "compoundClass": "მჟავა",
    "descriptionKa": "უფერო (სინათლეზე მოყვითალო), ჰაერზე მწევარი სითხე. ძლიერი მჟანგავი, ხსნის თითქმის ყველა ლითონს (გარდა ოქროსი და პლატინისა). მარილმჟავასთან ნარევი 1:3 შეფარდებით ქმნის „სამეფო წყალს“ (Aqua Regia).",
    "reactionConditions": {
      "temperature": "ოსტვალდის მეთოდი: ამიაკის კატალიზური ჟანგვა NO-მდე, შემდეგ NO₂ და წყალთან შთანთქმა",
      "state": "4NO₂ + O₂ + 2H₂O → 4HNO₃",
      "details": "Cu + 4HNO₃ (კონც.) → Cu(NO₃)₂ + 2NO₂ ⬆️ + 2H₂O",
      "isExothermic": true
    },
    "hazardWarning": "⚠️ ძლიერი მჟანგავი და მწვავე მჟავა! ცილებს ღებავს ყვითლად (ქსანტოპროტეინის რეაქცია).",
    "isCommon": true
  },
  {
    "id": "H-N-O-nitrous",
    "elements": [
      "H",
      "N",
      "O"
    ],
    "formula": "HNO₂",
    "nameKa": "აზოტოვანი მჟავა",
    "nameEn": "Nitrous acid",
    "type": "სუსტი ერთფუძიანი მჟავა",
    "compoundClass": "მჟავა",
    "descriptionKa": "სუსტი, არამდგრადი მჟავა, არსებობს მხოლოდ ცივ განზავებულ ხსნარებში.",
    "reactionConditions": {
      "temperature": "ცივ წყალში NO და NO₂ გაზების ნარევის გატარებით",
      "state": "NO + NO₂ + H₂O ⇌ 2HNO₂",
      "details": "3HNO₂ → HNO₃ + 2NO ⬆️ + H₂O (თვითჟანგვა-თვითაღდგენა)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "H-P-O-phosphoric",
    "elements": [
      "H",
      "O",
      "P"
    ],
    "formula": "H₃PO₄",
    "nameKa": "ორთოფოსფორმჟავა",
    "nameEn": "Phosphoric acid",
    "type": "საშუალო სიძლიერის სამფუძიანი მჟავა",
    "compoundClass": "მჟავა",
    "descriptionKa": "თეთრი გამჭვირვალე კრისტალები (წყალხსნარში — უფერო სიროფისებრი სითხე). არატოქსიკური მჟავა, გამოიყენება ფოსფორიანი სასუქების წარმოებაში და კვების მრეწველობაში (კოკა-კოლაში მჟავიანობის რეგულატორი E338).",
    "reactionConditions": {
      "temperature": "P₂O₅-ის გახსნა ცხელ წყალში ან ფოსფორიტების დამუშავება გოგირდმჟავით",
      "state": "P₂O₅ + 3H₂O → 2H₃PO₄",
      "details": "Ca₃(PO₄)₂ + 3H₂SO₄ → 2H₃PO₄ + 3CaSO₄ ⬇️",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "H-Si-O-silicic",
    "elements": [
      "H",
      "O",
      "Si"
    ],
    "formula": "H₂SiO₃",
    "nameKa": "მეტასილიციუმმჟავა",
    "nameEn": "Silicic acid",
    "type": "წყალში უხსნადი სუსტი მჟავა (ლაბისებრი ნალექი)",
    "compoundClass": "მჟავა",
    "descriptionKa": "ერთადერთი გავრცელებული არაორგანული მჟავა, რომელიც წყალში არ იხსნება. მიიღება სილიკატების ხსნარებზე მჟავების მოქმედებით ჟელესებრი ნალექის სახით. მისი გაუწყლოებით მიიღება სილიკაგელი.",
    "reactionConditions": {
      "temperature": "ნატრიუმის სილიკატის (თხევადი მინის) ხსნარზე მარილმჟავას დამატება",
      "state": "Na₂SiO₃ + 2HCl → H₂SiO₃ ⬇️ + 2NaCl",
      "details": "Na₂SiO₃ + 2HCl → H₂SiO₃ ⬇️ + 2NaCl",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ უფერო/თეთრი ჟელესებრი ლაბისებრი ნალექი"
    },
    "isCommon": true
  },
  {
    "id": "Ca-C-O-carbonate",
    "elements": [
      "C",
      "Ca",
      "O"
    ],
    "formula": "CaCO₃",
    "nameKa": "კალციუმის კარბონატი (კირქვა, ცარცი, მარმარილო)",
    "nameEn": "Calcium carbonate",
    "type": "წყალში უხსნადი მარილი (ნალექი)",
    "compoundClass": "მარილი",
    "descriptionKa": "ბუნებაში ერთ-ერთი ყველაზე გავრცელებული მინერალი. კვერცხის ნაჭუჭის, მოლუსკების ნიჟარების და მარჯნის რიფების ძირითადი შემადგენელი. მჟავებთან რეაქციისას შუშხუნით გამოყოფს CO₂ გაზს.",
    "reactionConditions": {
      "temperature": "კირწყალში (Ca(OH)₂) ნახშირორჟანგის (CO₂) გატარებით კირწყალი იმღვრევა",
      "state": "Ca(OH)₂ (ხსნარი) + CO₂ (აირი) → CaCO₃ ⬇️ (ნალექი) + H₂O",
      "details": "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂ ⬆️ (შუშხუნი)",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ თეთრი წმინდა კრისტალური ნალექი (კირწყლის ამღვრევა)"
    },
    "isCommon": true
  },
  {
    "id": "Ca-O-H-hydroxide",
    "elements": [
      "Ca",
      "H",
      "O"
    ],
    "formula": "Ca(OH)₂",
    "nameKa": "კალციუმის ჰიდროქსიდი (ჩამქრალი კირი, კირწყალი)",
    "nameEn": "Calcium hydroxide / Slaked lime",
    "type": "მცირედ ხსნადი ძლიერი ფუძე (ტუტე)",
    "compoundClass": "ტუტე / ფუძე",
    "descriptionKa": "თეთრი ფხვნილი. წყალში მისი გამჭვირვალე გაფილტრული ხსნარი ცნობილია როგორც „კირწყალი“ და გამოიყენება CO₂-ის აღმოსაჩენად (იმღვრევა CaCO₃-ის წარმოქმნით).",
    "reactionConditions": {
      "temperature": "ჩაუმქრალ კირზე (CaO) წყლის დასხმა (კირის ჩაქრობა)",
      "state": "CaO (მყარი) + H₂O (სითხე) → Ca(OH)₂ (მყარი/ხსნარი) + 65 კჯ",
      "details": "Ca(OH)₂ + CO₂ → CaCO₃ ⬇️ + H₂O",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Na-O-H-hydroxide",
    "elements": [
      "H",
      "Na",
      "O"
    ],
    "formula": "NaOH",
    "nameKa": "ნატრიუმის ჰიდროქსიდი (მწვავე ნატრი, კაუსტიკური სოდა)",
    "nameEn": "Sodium hydroxide / Caustic soda",
    "type": "ძლიერი ტუტე",
    "compoundClass": "ტუტე / ფუძე",
    "descriptionKa": "თეთრი, ძლიერ ჰიგროსკოპული მყარი ნივთიერება, საპნისებრი შეხებით. წყალში იხსნება ძლიერი სითბოს გამოყოფით. საპნის, ქაღალდის და ქიმიური მრეწველობის საფუძველი.",
    "reactionConditions": {
      "temperature": "მეტალური ნატრიუმის ძალზე ენერგიული რეაქცია წყალთან (გამოყოფილი H₂ ხშირად ინთება)",
      "state": "2Na (მყარი) + 2H₂O (სითხე) → 2NaOH (ხსნარი) + H₂ ⬆️ (აირი)",
      "details": "2Na + 2H₂O → 2NaOH + H₂ ⬆️ + სითბო",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ რეაქციისას გამოიყოფა აალებადი წყალბადის აირი (H₂)"
    },
    "hazardWarning": "⚠️ ძლიერ მწვავე ტუტე! იწვევს კანისა და თვალის მძიმე ქიმიურ დამწვრობას.",
    "isCommon": true
  },
  {
    "id": "K-O-H-hydroxide",
    "elements": [
      "H",
      "K",
      "O"
    ],
    "formula": "KOH",
    "nameKa": "კალიუმის ჰიდროქსიდი (მწვავე კალიუმი)",
    "nameEn": "Potassium hydroxide / Caustic potash",
    "type": "ძლიერი ტუტე",
    "compoundClass": "ტუტე / ფუძე",
    "descriptionKa": "უძლიერესი ტუტე, NaOH-ზე უფრო აქტიური. გამოიყენება თხევადი საპნის, ტუტე ბატარეების (ელექტროლიტად) და სხვადასხვა კალიუმის ნაერთების მისაღებად.",
    "reactionConditions": {
      "temperature": "კალიუმის მყისიერი აალებადი რეაქცია წყალთან (იწვის იისფერი ალით)",
      "state": "2K (მყარი) + 2H₂O (სითხე) → 2KOH (ხსნარი) + H₂ ⬆️ (აირი)",
      "details": "2K + 2H₂O → 2KOH + H₂ ⬆️",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ რეაქციისას გამოიყოფა წყალბადი (H₂), რომელიც იისფრად ინთება"
    },
    "hazardWarning": "⚠️ ძლიერ კოროზიული და მწვავე ნივთიერება!",
    "isCommon": true
  },
  {
    "id": "Ba-O-H-hydroxide",
    "elements": [
      "Ba",
      "H",
      "O"
    ],
    "formula": "Ba(OH)₂",
    "nameKa": "ბარიუმის ჰიდროქსიდი (ბარიტის წყალი)",
    "nameEn": "Barium hydroxide",
    "type": "ძლიერი ტუტე",
    "compoundClass": "ტუტე / ფუძე",
    "descriptionKa": "თეთრი კრისტალური ფხვნილი. მისი წყალხსნარი (ბარიტის წყალი) ძლიერი ტუტეა და გამოიყენება CO₂ და SO₄²⁻ იონების აღმოსაჩენად.",
    "reactionConditions": {
      "temperature": "BaO-ს გახსნა წყალში",
      "state": "BaO + H₂O → Ba(OH)₂",
      "details": "Ba(OH)₂ + H₂SO₄ → BaSO₄ ⬇️ + 2H₂O",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Mg-O-H-hydroxide",
    "elements": [
      "H",
      "Mg",
      "O"
    ],
    "formula": "Mg(OH)₂",
    "nameKa": "მაგნიუმის ჰიდროქსიდი (მაგნეზიის რძე)",
    "nameEn": "Magnesium hydroxide",
    "type": "წყალში უხსნადი ფუძე (თეთრი ნალექი)",
    "compoundClass": "ტუტე / ფუძე",
    "descriptionKa": "თეთრი ჟელესებრი ნალექი. წყალში მისი სუსპენზია („მაგნეზიის რძე“) გამოიყენება ანტაციდად კუჭის ჭარბი მჟავიანობის უსაფრთხოდ გასანეიტრალებლად.",
    "reactionConditions": {
      "temperature": "მაგნიუმის მარილის ხსნარზე ტუტის მოქმედებით",
      "state": "Mg²⁺ + 2OH⁻ → Mg(OH)₂ ⬇️",
      "details": "MgCl₂ + 2NaOH → Mg(OH)₂ ⬇️ + 2NaCl",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ თეთრი ლაბისებრი ნალექი"
    },
    "isCommon": true
  },
  {
    "id": "Cu-O-H-hydroxide",
    "elements": [
      "Cu",
      "H",
      "O"
    ],
    "formula": "Cu(OH)₂",
    "nameKa": "სპილენძის(II) ჰიდროქსიდი",
    "nameEn": "Copper(II) hydroxide",
    "type": "უხსნადი ფუძე (ლურჯი ნალექი)",
    "compoundClass": "ტუტე / ფუძე",
    "descriptionKa": "კაშკაშა ცისფერი ჟელესებრი ნალექი. გაცხელებისას მყისიერად იშლება შავ სპილენძის ოქსიდად (CuO) და წყლად. გამოიყენება მრავალატომიანი სპირტებისა და ალდეჰიდების ანალიზში.",
    "reactionConditions": {
      "temperature": "ოთახის ტემპერატურა (Cu²⁺ მარილზე ტუტის დამატება)",
      "state": "Cu²⁺ (ხსნარი) + 2OH⁻ (ხსნარი) → Cu(OH)₂ ⬇️ (ცისფერი ნალექი)",
      "details": "Cu(OH)₂ (გაცხელებით > 80 °C) → CuO ⬇️ (შავი) + H₂O",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ კაშკაშა ცისფერი ჟელესებრი ნალექი (გაცხელებით შავდება!)"
    },
    "isCommon": true
  },
  {
    "id": "Fe-O-H-hydroxide2",
    "elements": [
      "Fe",
      "H",
      "O"
    ],
    "formula": "Fe(OH)₂",
    "nameKa": "რკინის(II) ჰიდროქსიდი",
    "nameEn": "Iron(II) hydroxide",
    "type": "უხსნადი ფუძე (ნალექი)",
    "compoundClass": "ტუტე / ფუძე",
    "descriptionKa": "მომწვანო-თეთრი ნალექი. ჰაერზე დატოვებისას მყისიერად იჟანგება ჟანგბადით და გადადის მოწითალო-ყავისფერ Fe(OH)₃-ში.",
    "reactionConditions": {
      "temperature": "Fe²⁺ მარილის ხსნარზე ტუტის მოქმედებით უჟანგბადო გარემოში",
      "state": "Fe²⁺ + 2OH⁻ → Fe(OH)₂ ⬇️",
      "details": "4Fe(OH)₂ + O₂ + 2H₂O → 4Fe(OH)₃ ⬇️ (ჰაერზე ყავისფერდება)",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ მომწვანო-თეთრი ნალექი (ჰაერზე წამებში ყავისფერდება ჟანგვის გამო)"
    },
    "isCommon": true
  },
  {
    "id": "Fe-O-H-hydroxide3",
    "elements": [
      "Fe",
      "H",
      "O"
    ],
    "formula": "Fe(OH)₃",
    "nameKa": "რკინის(III) ჰიდროქსიდი",
    "nameEn": "Iron(III) hydroxide",
    "type": "ამფოტერული უხსნადი ჰიდროქსიდი (ნალექი)",
    "compoundClass": "ამფოტერული ოქსიდი",
    "descriptionKa": "მოწითალო-ყავისფერი ჟანგისფერი ნალექი. წარმოიქმნება რკინის(III) მარილებზე ტუტეების მოქმედებით.",
    "reactionConditions": {
      "temperature": "Fe³⁺ მარილის ხსნარზე ტუტის დამატება",
      "state": "Fe³⁺ + 3OH⁻ → Fe(OH)₃ ⬇️",
      "details": "2Fe(OH)₃ (გაცხელებით) → Fe₂O₃ + 3H₂O",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ მოწითალო-ყავისფერი ჟანგისებრი ლაბისებრი ნალექი"
    },
    "isCommon": true
  },
  {
    "id": "Al-O-H-hydroxide",
    "elements": [
      "Al",
      "H",
      "O"
    ],
    "formula": "Al(OH)₃",
    "nameKa": "ალუმინის ჰიდროქსიდი",
    "nameEn": "Aluminium hydroxide",
    "type": "ამფოტერული ჰიდროქსიდი (ნალექი)",
    "compoundClass": "ამფოტერული ოქსიდი",
    "descriptionKa": "კლასიკური ამფოტერული ნაერთი: იხსნება როგორც მჟავებში (იქცევა Al³⁺ მარილად), ისე ტუტეების სიჭარბეში (იქცევა კომპლექსურ ტეტრაჰიდროქსოალუმინატად Na[Al(OH)₄]).",
    "reactionConditions": {
      "temperature": "ალუმინის მარილზე ტუტის წვეთ-წვეთობით დამატება",
      "state": "Al³⁺ + 3OH⁻ → Al(OH)₃ ⬇️ (ჭარბ ტუტეში ნალექი იხსნება!)",
      "details": "Al(OH)₃ + 3HCl → AlCl₃ + 3H₂O; Al(OH)₃ + NaOH → Na[Al(OH)₄]",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ თეთრი ლაბისებრი ამფოტერული ნალექი (იხსნება მჟავასა და ტუტეში)"
    },
    "isCommon": true
  },
  {
    "id": "Zn-O-H-hydroxide",
    "elements": [
      "H",
      "O",
      "Zn"
    ],
    "formula": "Zn(OH)₂",
    "nameKa": "თუთიის ჰიდროქსიდი",
    "nameEn": "Zinc hydroxide",
    "type": "ამფოტერული ჰიდროქსიდი (ნალექი)",
    "compoundClass": "ამფოტერული ოქსიდი",
    "descriptionKa": "თეთრი ამფოტერული ნალექი. იხსნება როგორც მჟავებში, ისე ტუტეებში თუთიის კომპლექსების წარმოქმნით.",
    "reactionConditions": {
      "temperature": "თუთიის მარილზე ტუტის ფრთხილი დამატება",
      "state": "Zn²⁺ + 2OH⁻ → Zn(OH)₂ ⬇️",
      "details": "Zn(OH)₂ + 2NaOH → Na₂[Zn(OH)₄] (ტუტეში გახსნა)",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ თეთრი ამფოტერული ნალექი (იხსნება ტუტეში)"
    },
    "isCommon": true
  },
  {
    "id": "Ba-S-O-sulfate",
    "elements": [
      "Ba",
      "O",
      "S"
    ],
    "formula": "BaSO₄",
    "nameKa": "ბარიუმის სულფატი (ბარიტი)",
    "nameEn": "Barium sulfate",
    "type": "მძიმე უხსნადი მარილი (ნალექი)",
    "compoundClass": "მარილი",
    "descriptionKa": "სულფატ-იონის (SO₄²⁻) უმთავრესი ანალიზური რეაქცია. არ იხსნება მჟავებშიც კი. რენტგენოკონტრასტული ნივთიერება კუჭ-ნაწლავის გამოკვლევისთვის.",
    "reactionConditions": {
      "temperature": "Ba²⁺ და SO₄²⁻ მარილების ხსნარების შერევა",
      "state": "Ba²⁺ + SO₄²⁻ → BaSO₄ ⬇️ (მძიმე თეთრი ნალექი)",
      "details": "BaCl₂ + H₂SO₄ → BaSO₄ ⬇️ + 2HCl (არ იხსნება მჟავაში!)",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ თეთრი წმინდაკრისტალური მძიმე ნალექი (მჟავაგამძლე)"
    },
    "isCommon": true
  },
  {
    "id": "Cu-S-O-sulfate",
    "elements": [
      "Cu",
      "O",
      "S"
    ],
    "formula": "CuSO₄",
    "nameKa": "სპილენძის(II) სულფატი (უწყლო თეთრია, ჰიდრატი CuSO₄·5H₂O — ცისფერი შაბიამანი)",
    "nameEn": "Copper(II) sulfate",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "უწყლო სახით თეთრი ფხვნილია, წყალთან შეერთებისას გადადის კაშკაშა ცისფერ კრისტალჰიდრატში (შაბიამანი CuSO₄·5H₂O). გამოიყენება სოფლის მეურნეობაში სოკოვანი დაავადებების წინააღმდეგ (ბორდოს ნარევი).",
    "reactionConditions": {
      "temperature": "CuO-ს გახსნა ცხელ განზავებულ გოგირდმჟავაში",
      "state": "CuO + H₂SO₄ → CuSO₄ + H₂O",
      "details": "CuSO₄ + 5H₂O → CuSO₄·5H₂O (ცისფერი კრისტალები)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Ca-S-O-sulfate",
    "elements": [
      "Ca",
      "O",
      "S"
    ],
    "formula": "CaSO₄",
    "nameKa": "კალციუმის სულფატი (თაბაშირი, ანჰიდრიტი)",
    "nameEn": "Calcium sulfate / Gypsum",
    "type": "მცირედ ხსნადი მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "ბუნებრივი მინერალი (თაბაშირი CaSO₄·2H₂O). გაცხელებისას კარგავს წყლის ნაწილს და წარმოქმნის სამედიცინო და სამშენებლო თაბაშირს (ალებასტრი).",
    "reactionConditions": {
      "temperature": "კალციუმის მარილებზე გოგირდმჟავას მოქმედებით",
      "state": "CaCl₂ + H₂SO₄ → CaSO₄ ⬇️ + 2HCl",
      "details": "CaSO₄·2H₂O (გაცხელებით 150-180 °C) → CaSO₄·0.5H₂O (ალებასტრი)",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ თეთრი კრისტალური ნალექი"
    },
    "isCommon": true
  },
  {
    "id": "Mg-S-O-sulfate",
    "elements": [
      "Mg",
      "O",
      "S"
    ],
    "formula": "MgSO₄",
    "nameKa": "მაგნიუმის სულფატი (ინგლისური მარილი / მწარე მარილი)",
    "nameEn": "Magnesium sulfate / Epsom salt",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "უფერო მწარე გემოს კრისტალები (MgSO₄·7H₂O). გამოიყენება მედიცინაში დამამშვიდებელ, წნევის დამწევ და სპაზმოლიტურ საშუალებად.",
    "reactionConditions": {
      "temperature": "MgO ან MgCO₃-ის გახსნა გოგირდმჟავაში",
      "state": "MgO + H₂SO₄ → MgSO₄ + H₂O",
      "details": "Mg + H₂SO₄ → MgSO₄ + H₂ ⬆️",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Fe-S-O-sulfate",
    "elements": [
      "Fe",
      "O",
      "S"
    ],
    "formula": "FeSO₄",
    "nameKa": "რკინის(II) სულფატი (რკინის შაბი)",
    "nameEn": "Iron(II) sulfate",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "ღია მწვანე კრისტალები (FeSO₄·7H₂O). გამოიყენება მელნის დასამზადებლად, ხის დასამუშავებლად ლპობის წინააღმდეგ და ანემიის სამკურნალოდ.",
    "reactionConditions": {
      "temperature": "რკინის გახსნა განზავებულ გოგირდმჟავაში",
      "state": "Fe + H₂SO₄ → FeSO₄ + H₂ ⬆️",
      "details": "Fe + H₂SO₄ → FeSO₄ + H₂ ⬆️",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Na-C-O-carbonate",
    "elements": [
      "C",
      "Na",
      "O"
    ],
    "formula": "Na₂CO₃",
    "nameKa": "ნატრიუმის კარბონატი (კალცინირებული სოდა, სარეცხი სოდა)",
    "nameEn": "Sodium carbonate / Washing soda",
    "type": "მარილი (წყალხსნარში ტუტე რეაქციით)",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი ჰიგროსკოპული ფხვნილი. წყალხსნარში ჰიდროლიზის გამო ავლენს ძლიერ ტუტე არეს. მინის, საპნისა და სარეცხი საშუალებების წარმოების მთავარი კომპონენტი.",
    "reactionConditions": {
      "temperature": "სოლვეს მეთოდი ან სასმელი სოდის გამოწვა > 200 °C-ზე",
      "state": "2NaHCO₃ (გაცხელებით) → Na₂CO₃ + H₂O + CO₂ ⬆️",
      "details": "Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂ ⬆️ (შუშხუნი)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Na-H-C-O-bicarbonate",
    "elements": [
      "C",
      "H",
      "Na",
      "O"
    ],
    "formula": "NaHCO₃",
    "nameKa": "ნატრიუმის ჰიდროკარბონატი (სასმელი სოდა, საკვები სოდა)",
    "nameEn": "Sodium bicarbonate / Baking soda",
    "type": "მჟავა მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი წვრილკრისტალური ფხვნილი, სუსტი ტუტე გემოთი. მჟავასთან შეხებისას მყისიერად გამოყოფს CO₂-ის ბუშტუკებს (ცომის აფუება, კუჭის წვის ჩაქრობა).",
    "reactionConditions": {
      "temperature": "სოდის ხსნარში CO₂-ის გატარებით",
      "state": "Na₂CO₃ + H₂O + CO₂ → 2NaHCO₃ ⬇️",
      "details": "NaHCO₃ + CH₃COOH (ძმარი) → CH₃COONa + H₂O + CO₂ ⬆️ (სოდის ჩაქრობა)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ მჟავებთან ურთიერთქმედებისას ან გაცხელებისას ინტენსიურად გამოყოფს CO₂-ს"
    },
    "isCommon": true
  },
  {
    "id": "K-C-O-carbonate",
    "elements": [
      "C",
      "K",
      "O"
    ],
    "formula": "K₂CO₃",
    "nameKa": "კალიუმის კარბონატი (პოტაში)",
    "nameEn": "Potassium carbonate / Potash",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი კრისტალური ფხვნილი. ხის ნაცრის მთავარი კომპონენტი. გამოიყენება ოპტიკური მინის, თხევადი საპნისა და კერამიკის წარმოებაში.",
    "reactionConditions": {
      "temperature": "2KOH + CO₂ → K₂CO₃ + H₂O",
      "state": "2KOH + CO₂ → K₂CO₃ + H₂O",
      "details": "K₂CO₃ + 2HCl → 2KCl + H₂O + CO₂ ⬆️",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "K-N-O-nitrate",
    "elements": [
      "K",
      "N",
      "O"
    ],
    "formula": "KNO₃",
    "nameKa": "კალიუმის ნიტრატი (ინდური გვარჯილა)",
    "nameEn": "Potassium nitrate / Saltpetre",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი კრისტალები. შავი დენთის ისტორიული მთავარი კომპონენტი (75% KNO₃ + 15% C + 10% S) და მაღალი ხარისხის აზოტ-კალიუმიანი სასუქი.",
    "reactionConditions": {
      "temperature": "KOH-ის ნეიტრალიზაცია აზოტმჟავით",
      "state": "KOH + HNO₃ → KNO₃ + H₂O",
      "details": "2KNO₃ (გაცხელებით) → 2KNO₂ + O₂ ⬆️ (ჟანგბადის გამოყოფა)",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Na-N-O-nitrate",
    "elements": [
      "N",
      "Na",
      "O"
    ],
    "formula": "NaNO₃",
    "nameKa": "ნატრიუმის ნიტრატი (ჩილეს გვარჯილა)",
    "nameEn": "Sodium nitrate / Chile saltpetre",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი კრისტალები. ბუნებრივი საბადოები ჩილეს ატაკამის უდაბნოში. გამოიყენება აზოტიან სასუქად და მინის წარმოებაში.",
    "reactionConditions": {
      "temperature": "NaOH + HNO₃ → NaNO₃ + H₂O",
      "state": "NaOH + HNO₃ → NaNO₃ + H₂O",
      "details": "2NaNO₃ → 2NaNO₂ + O₂ ⬆️",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "Ag-N-O-nitrate",
    "elements": [
      "Ag",
      "N",
      "O"
    ],
    "formula": "AgNO₃",
    "nameKa": "ვერცხლის ნიტრატი (ლაპისი)",
    "nameEn": "Silver nitrate",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "უფერო გამჭვირვალე კრისტალები. ჰალოგენ-იონების (Cl⁻, Br⁻, I⁻) უმთავრესი ანალიზური რეაგენტი. გააჩნია ძლიერი ანტისეპტიკური და მომწველი თვისებები.",
    "reactionConditions": {
      "temperature": "ვერცხლის გახსნა აზოტმჟავაში",
      "state": "Ag + 2HNO₃ → AgNO₃ + NO₂ ⬆️ + H₂O",
      "details": "AgNO₃ + NaCl → AgCl ⬇️ + NaNO₃",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ მიღებისას გამოიყოფა მურა აირი (NO₂)"
    },
    "isCommon": true
  },
  {
    "id": "Ca-P-O-phosphate",
    "elements": [
      "Ca",
      "O",
      "P"
    ],
    "formula": "Ca₃(PO₄)₂",
    "nameKa": "კალციუმის ორთოფოსფატი (ფოსფორიტი, აპატიტი)",
    "nameEn": "Calcium phosphate",
    "type": "უხსნადი მარილი (ნალექი)",
    "compoundClass": "მარილი",
    "descriptionKa": "ძვლებისა და კბილის მინანქრის მთავარი მინერალური საფუძველი (ძვლის მასის ~70%). ფოსფორიანი სასუქების წარმოების მთავარი ნედლეული.",
    "reactionConditions": {
      "temperature": "Ca²⁺ და PO₄³⁻ მარილების ხსნარების შერევა",
      "state": "3Ca²⁺ + 2PO₄³⁻ → Ca₃(PO₄)₂ ⬇️",
      "details": "3CaCl₂ + 2Na₃PO₄ → Ca₃(PO₄)₂ ⬇️ + 6NaCl",
      "isExothermic": true
    },
    "precipitate": {
      "isPrecipitate": true,
      "colorAndForm": "⬇️ თეთრი ამორფული ნალექი (ძვლის მთავარი მინერალი)"
    },
    "isCommon": true
  },
  {
    "id": "Na-P-O-phosphate",
    "elements": [
      "Na",
      "O",
      "P"
    ],
    "formula": "Na₃PO₄",
    "nameKa": "ნატრიუმის ორთოფოსფატი",
    "nameEn": "Trisodium phosphate",
    "type": "მარილი (ძლიერი ტუტე რეაქციით)",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი კრისტალები. ჰიდროლიზის გამო წყალში ქმნის ძლიერ ტუტე არეს. გამოიყენება წყლის დასარბილებლად და ცხიმების მოსაშორებლად.",
    "reactionConditions": {
      "temperature": "H₃PO₄-ის ნეიტრალიზაცია ჭარბი NaOH-ით",
      "state": "H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O",
      "details": "H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "K-Mn-O-permanganate",
    "elements": [
      "K",
      "Mn",
      "O"
    ],
    "formula": "KMnO₄",
    "nameKa": "კალიუმის პერმანგანატი (მარგანცოვკა)",
    "nameEn": "Potassium permanganate",
    "type": "უძლიერესი მჟანგავი მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "მუქი იისფერი (თითქმის შავი) მეტალისებრი ბზინვარების კრისტალები. წყალში იძლევა კაშკაშა ჟოლოსფერ/იისფერ შეფერილობას. ძლიერი ანტისეპტიკი და ქიმიის ერთ-ერთი ყველაზე ცნობილი მჟანგავი.",
    "reactionConditions": {
      "temperature": "მანგანუმის(IV) ოქსიდის (MnO₂) ჟანგვა გამდნარ KOH-ში, შემდეგ ელექტროლიზი",
      "state": "2KMnO₄ (გაცხელებით > 200 °C) → K₂MnO₄ + MnO₂ + O₂ ⬆️",
      "details": "2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂ ⬆️ + 8H₂O (ლაბორატორიაში Cl₂-ის მიღება)",
      "isExothermic": true
    },
    "gasRelease": {
      "isGas": true,
      "gasType": "⬆️ გაცხელებისას გამოყოფს ჟანგბადს (O₂), მჟავასთან — ქლორს (Cl₂)"
    },
    "isCommon": true
  },
  {
    "id": "N-H-Cl-ammonium",
    "elements": [
      "Cl",
      "H",
      "N"
    ],
    "formula": "NH₄Cl",
    "nameKa": "ამონიუმის ქლორიდი (ნიშადური)",
    "nameEn": "Ammonium chloride / Sal ammoniac",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი კრისტალური მარილი. წარმოიქმნება ორი აირის — ამიაკისა (NH₃) და ქლორწყალბადის (HCl) შერევისას თეთრი კვამლის სახით („კვამლი ცეცხლის გარეშე“).",
    "reactionConditions": {
      "temperature": "ამიაკისა და ქლორწყალბადის აირების შერევა",
      "state": "NH₃ (აირი) + HCl (აირი) → NH₄Cl (თეთრი კვამლი/კრისტალები)",
      "details": "NH₄Cl (გაცხელებით სუბლიმირდება) ⇌ NH₃ ⬆️ + HCl ⬆️",
      "isExothermic": true
    },
    "isCommon": true
  },
  {
    "id": "N-H-O-ammonium-nitrate",
    "elements": [
      "H",
      "N",
      "O"
    ],
    "formula": "NH₄NO₃",
    "nameKa": "ამონიუმის ნიტრატი (ამონიუმის გვარჯილა)",
    "nameEn": "Ammonium nitrate",
    "type": "მარილი",
    "compoundClass": "მარილი",
    "descriptionKa": "თეთრი კრისტალური მარილი, ერთ-ერთი ყველაზე გავრცელებული აზოტიანი სასუქი სოფლის მეურნეობაში (შეიცავს 34% აზოტს). წყალში გახსნისას იწვევს ძლიერ ენდოთერმულ გაციებას.",
    "reactionConditions": {
      "temperature": "ამიაკის აირის რეაქცია აზოტმჟავასთან",
      "state": "NH₃ + HNO₃ → NH₄NO₃",
      "details": "NH₄NO₃ (ფრთხილი გაცხელებით) → N₂O ⬆️ + 2H₂O",
      "isExothermic": true
    },
    "isCommon": true
  }
];
