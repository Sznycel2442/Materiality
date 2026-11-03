import { createCatalogEntry } from './catalog-expansion.mjs';

export const checkedOn = '2026-11-04';
export const sources = { Nanovia: 'https://nanovia.tech/en/products/' };

const make = (id, brand, name, base, flags, source, details = {}) => {
  const original = createCatalogEntry(id, brand, name, base, flags, source);
  const { printGuide = {}, ...fields } = details;
  return {
    ...original,
    ...fields,
    checkedOn,
    sourceScope: 'manufacturer-product',
    printGuide: { ...original.printGuide, ...printGuide }
  };
};

const jayo = 'https://store.jayo3d.com/products/';
const esun = 'https://www.esun3d.com/';
const jayoNote = {
  pl: 'Zakres druku pochodzi z karty produktu JAYO. Producent nie podaje metody pomiaru HDT ani pełnej karty TDS, więc nie przypisujemy tej wartości do pomiarów porównawczych.',
  en: 'Print range comes from the JAYO product page. With no HDT test method or full TDS supplied, the headline HDT is excluded from measured comparisons.'
};

export const additions = [
  make('jayo-pa6-cf', 'JAYO', 'PA6-CF', 'PA6', ['CF'], jayo + 'jayo-1kg-pa6-cf-nylon-carbon-fiber-3d-printer-filament-1-75mm-heat-resistant', {
    nozzle: [270, 280], bed: [50, 70], settingsKind: 'product', profileOrigin: 'product',
    tdsPage: jayo + 'jayo-1kg-pa6-cf-nylon-carbon-fiber-3d-printer-filament-1-75mm-heat-resistant',
    note: jayoNote,
    printGuide: { fanBasis: 'unknown', fanSource: null, dryingSource: jayo + 'jayo-1kg-pa6-cf-nylon-carbon-fiber-3d-printer-filament-1-75mm-heat-resistant' }
  }),
  make('jayo-pa6-gf', 'JAYO', 'PA6-GF', 'PA6', ['GF'], jayo + 'jayo-1kg-pa6-gf-nylon-carbon-fiber-3d-printer-filament-1-75mm-heat-resistant', {
    nozzle: [270, 290], bed: [50, 70], settingsKind: 'product', profileOrigin: 'product',
    tdsPage: jayo + 'jayo-1kg-pa6-gf-nylon-carbon-fiber-3d-printer-filament-1-75mm-heat-resistant',
    note: { pl: 'Karta JAYO podaje niespójne proporcje PA6/GF (80/20 i 75/25). Nie przypisujemy konkretnego udziału włókna ani HDT bez metody badania.', en: 'The JAYO page gives conflicting PA6/GF ratios (80/20 and 75/25). Fiber content and HDT remain unverified without a test method.' },
    printGuide: { fanBasis: 'unknown', fanSource: null }
  }),
  make('jayo-pa12-cf', 'JAYO', 'PA12-CF', 'PA12', ['CF'], jayo + 'jayo-1kg-pa6-gf-nylon-glass-fiber-3d-printer-filament-1-75mm-wear-resistant-copy', {
    nozzle: [260, 280], bed: [50, 70], settingsKind: 'product', profileOrigin: 'product',
    tdsPage: jayo + 'jayo-1kg-pa6-gf-nylon-glass-fiber-3d-printer-filament-1-75mm-wear-resistant-copy',
    note: jayoNote,
    printGuide: { fanBasis: 'unknown', fanSource: null }
  }),
  make('jayo-easy-pa', 'JAYO', 'Easy Nylon (E-PA)', 'PA', [], jayo + 'jayo-easy-nylone-pa-3d-printer-filament-1-75mm-1kg-spool-3d-printing-copy', {
    tdsPage: jayo + 'jayo-easy-nylone-pa-3d-printer-filament-1-75mm-1kg-spool-3d-printing-copy',
    note: { pl: 'Producent potwierdza produkt, lecz obecna karta nie podaje pełnych parametrów druku. Zakresy są punktem wyjścia dla rodziny PA.', en: 'The product is listed by JAYO, but its current page lacks complete print settings. Ranges are PA family starting points.' }
  }),
  make('esun-epetg-cf', 'eSUN', 'ePETG-CF', 'PETG', ['CF'], esun + 'epetg-cf-product', {
    nozzle: [240, 260], bed: [75, 90], settingsKind: 'product', profileOrigin: 'product',
    hdt: 70, flexModulus: 3618.54, flexStrength: 77.2, tensileStrength: 51.3, density: 1.26,
    evidence: 'product-data', reference: esun + 'epetg-cf-product',
    tdsPage: esun + 'epetg-cf-product',
    documents: [
      { type: 'SDS', language: 'EN', url: esun + 'media/esun/catalog/certification/product/PETG-CF/PETG-CF_MSDS_en.pdf' }
    ],
    measurementMethods: { hdt: 'strona produktu · metoda niepodana', flexModulus: 'XY · strona produktu', flexStrength: 'XY · strona produktu', tensileStrength: 'XY · strona produktu' },
    note: { pl: 'Pomiary ze strony produktu eSUN. Obecny odnośnik TDS producenta otwiera kartę PET-CF, więc nie przypisujemy jej do PETG-CF.', en: 'Measurements come from the eSUN product page. Its current TDS link opens a PET-CF sheet, so that file is not assigned to PETG-CF.' },
    dry: [65, '>8 h'],
    printGuide: { fan: [100, 100], fanBasis: 'product', fanSource: esun + 'epetg-cf-product', dryingRequired: 'required', dryingTemperature: 65, dryingTime: '>8 h', dryingBasis: 'product', dryingSource: esun + 'epetg-cf-product' }
  }),
  make('esun-eabs-cf', 'eSUN', 'eABS-CF', 'ABS', ['CF'], esun + 'eabs-cf-product', {
    nozzle: [240, 270], bed: [100, 110], settingsKind: 'product', profileOrigin: 'product',
    hdt: 97.2, flexModulus: 2694, flexStrength: 76.2, tensileStrength: 43.34, density: 1.06,
    evidence: 'product-data', reference: esun + 'eabs-cf-product',
    tds: esun + 'media/esun/catalog/certification/product/ABS-CF/ABS-CF_TDS_V1_2024.07.25.pdf',
    documents: [
      { type: 'TDS', language: 'EN', url: esun + 'media/esun/catalog/certification/product/ABS-CF/ABS-CF_TDS_V1_2024.07.25.pdf' },
      { type: 'SDS', language: 'EN', url: esun + 'media/esun/catalog/certification/product/ABS-CF/_ABS-CF_MSDS.pdf' }
    ],
    measurementMethods: { hdt: 'strona produktu · obciążenie niepodane', flexModulus: 'XY · strona produktu', flexStrength: 'XY · strona produktu', tensileStrength: 'XY · strona produktu' },
    note: { pl: 'Wartości ze strony produktu; starszy PDF podaje HDT 94,9°C, a aktualna strona 97,2°C. Porównuj pomiary z tej samej wersji.', en: 'Values are from the current product page. Its HDT is 97.2°C versus 94.9°C in the older PDF; compare the same revision.' },
    dry: [70, '>8 h'],
    printGuide: { fan: [0, 0], fanBasis: 'product', fanSource: esun + 'eabs-cf-product', dryingRequired: 'required', dryingTemperature: 70, dryingTime: '>8 h', dryingBasis: 'product', dryingSource: esun + 'eabs-cf-product' }
  }),
  make('esun-eabs-gf', 'eSUN', 'eABS-GF', 'ABS', ['GF'], esun + 'eabs-gf-product', {
    nozzle: [240, 270], bed: [100, 120], settingsKind: 'product', profileOrigin: 'product',
    hdt: 96.1, flexModulus: 2459.6, flexStrength: 76.4, tensileStrength: 43.91, density: 1.07,
    evidence: 'product-data', reference: esun + 'eabs-gf-product',
    tds: esun + 'media/esun/catalog/certification/product/ABS-GF/ABS-GF_TDS_V1_2024.07.25.pdf',
    documents: [
      { type: 'TDS', language: 'EN', url: esun + 'media/esun/catalog/certification/product/ABS-GF/ABS-GF_TDS_V1_2024.07.25.pdf' },
      { type: 'SDS', language: 'EN', url: esun + 'media/esun/catalog/certification/product/ABS-GF/ABS-GF_MSDS_EN.pdf' }
    ],
    measurementMethods: { hdt: 'strona produktu · obciążenie niepodane', flexModulus: 'XY · strona produktu', flexStrength: 'XY · strona produktu', tensileStrength: 'XY · strona produktu' },
    note: { pl: 'Pomiary pochodzą z aktualnej strony produktu; karta PDF jest starszą wersją. Sprawdź różnice przed porównaniem.', en: 'Measurements are from the current product page; the PDF is an older revision. Check differences before comparing.' },
    dry: [70, '>8 h'],
    printGuide: { fan: [0, 0], fanBasis: 'product', fanSource: esun + 'eabs-gf-product', dryingRequired: 'required', dryingTemperature: 70, dryingTime: '>8 h', dryingBasis: 'product', dryingSource: esun + 'eabs-gf-product' }
  }),
  make('esun-pet-cf', 'eSUN', 'PET-CF', 'PET', ['CF'], esun + 'pet-cf-product', {
    nozzle: [250, 300], bed: [70, 120], settingsKind: 'tds', profileOrigin: 'product',
    hdt: 75, hdtOther: 145, hdtOtherMethod: '0.45 MPa · po wyżarzaniu',
    flexModulus: 8264.15, flexStrength: 135.6, tensileStrength: 80.32, density: 1.42,
    evidence: 'tds', tds: esun + 'media/esun/catalog/certification/product/PET-CF/PET-CF_TDS.pdf',
    documents: [{ type: 'TDS', language: 'EN', url: esun + 'media/esun/catalog/certification/product/PET-CF/PET-CF_TDS.pdf' }],
    measurementMethods: { hdt: 'GB/T 1634 · 0.45 MPa · przed wyżarzaniem', flexModulus: 'GB/T 9341 · XY', flexStrength: 'GB/T 9341 · XY', tensileStrength: 'GB/T 1040 · XY' },
    dry: [80, '4–8 h'],
    note: { pl: 'TDS rozdziela HDT przed wyżarzaniem (75°C) i po nim (145°C). Moduł 8264 MPa dotyczy zginania XY, nie rozciągania. PDF zaleca suszenie 4–8 h, a aktualna strona produktu ponad 8 h.', en: 'The TDS separates HDT before annealing (75°C) and after (145°C). The 8264 MPa value is XY flexural modulus, not tensile modulus. The PDF says 4–8 h drying while the current product page says over 8 h.' },
    printGuide: { fan: [0, 20], fanBasis: 'product', fanSource: esun + 'pet-cf-product', dryingRequired: 'required', dryingTemperature: 80, dryingTime: '4–8 h', dryingBasis: 'tds', dryingSource: esun + 'media/esun/catalog/certification/product/PET-CF/PET-CF_TDS.pdf' }
  }),
  make('nanovia-pc-cf', 'Nanovia', 'PC CF', 'PC', ['CF'], 'https://nanovia.tech/en/ref/nanovia-pc-cf/', {
    nozzle: [270, 290], bed: [100, 140], settingsKind: 'product', profileOrigin: 'product',
    hdt: 144, hdtOther: 133, hdtOtherMethod: 'ASTM D648 · 1.8 MPa',
    tensileModulus: 6390, tensileStrength: 87, density: 1.26, elongation: 2.7,
    evidence: 'product-data', reference: 'https://nanovia.tech/en/ref/nanovia-pc-cf/',
    tdsPage: 'https://nanovia.tech/en/ref/nanovia-pc-cf/',
    documents: [{ type: 'SDS', language: 'FR/EN', url: 'https://nanovia.tech/media/nanovia-pc-cf-msds.pdf' }],
    measurementMethods: { hdt: 'ASTM D648 · 0.45 MPa · aktualna strona produktu', tensileModulus: 'ISO 527-2/1A · druk 0°', tensileStrength: 'ISO 527-2/1A · druk 0°' },
    dry: [100, '6 h'],
    note: { pl: 'Liczby i zakres druku pochodzą z aktualnej strony produktu Nanovia. Udostępniony wcześniej PDF TDS nie otwiera się u producenta; sprawdź kartę swojej partii przed zakupem.', en: 'Values and print range come from the current Nanovia product page. A previously published TDS currently fails at the manufacturer; check the sheet for your batch before buying.' },
    printGuide: { dryingRequired: 'required', dryingTemperature: 100, dryingTime: '6 h', dryingBasis: 'product', dryingSource: 'https://nanovia.tech/en/ref/nanovia-pc-cf/' }
  })
];
