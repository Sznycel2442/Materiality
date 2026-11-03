// Product additions checked against manufacturer catalogs on 2026-11-03.
// Unknown product measurements stay null. Family print ranges are explicitly marked.
export const checkedOn = '2026-11-03';
export const sources = {
  eSUN: 'https://www.esun3d.com/page-filter',
  '3DXTECH': 'https://www.3dxtech.com/collections/specialty-filament',
  QIDI: 'https://qidi3d.com/pages/choose-the-right-filament-3d-filaments-guide-for-qidi-printers',
  SUNLU: 'https://www.sunlu.com/wiki/filament-category',
  JAYO: 'https://jayo3d.com/collections/jayo-filament'
};
const guide='https://help.prusa3d.com/filament-material-guide';
const esunManual='https://www.esun3d.com/uploads/eSUN-3D-Product-Manual2024.pdf';
const families={
  PLA:{group:'PLA',nozzle:[190,230],bed:[45,60],fan:[80,100],level:'easy',enclosure:false,categories:['easy','aesthetic'],description:{pl:'Tworzywo do prototypów, modeli i elementów o małym obciążeniu cieplnym.',en:'For prototypes and models with limited thermal loading.'}},
  PETG:{group:'PETG',nozzle:[230,260],bed:[65,85],fan:[20,60],level:'easy',enclosure:false,categories:['easy','strong'],description:{pl:'Kopoliester do części użytkowych; dobry kompromis między łatwością druku a udarnością.',en:'A utility copolyester balancing printability and toughness.'}},
  PCTG:{group:'PCTG',nozzle:[250,270],bed:[80,100],fan:[0,30],level:'medium',enclosure:false,categories:['engineering','strong'],description:{pl:'Kopoliester PCTG do części użytkowych; dodatki CF/GF zmieniają sztywność i udarność.',en:'PCTG copolyester for functional parts; CF/GF reinforcement changes stiffness and toughness.'}},
  ABS:{group:'ABS',nozzle:[240,270],bed:[90,110],fan:[0,20],level:'medium',enclosure:true,categories:['engineering','strong'],description:{pl:'Tworzywo techniczne do obudów i części użytkowych. Zamknięta komora ogranicza skurcz.',en:'For functional parts and housings; an enclosure helps limit warping.'}},
  ASA:{group:'ASA',nozzle:[240,270],bed:[90,110],fan:[0,20],level:'medium',enclosure:true,categories:['engineering','outdoor','uv-resistant'],description:{pl:'Materiał do zastosowań zewnętrznych i obudów; wymaga kontroli skurczu.',en:'For outdoor parts and housings; requires warping control.'}},
  PC:{group:'PC',nozzle:[270,310],bed:[100,120],fan:[0,30],level:'advanced',enclosure:true,categories:['engineering','strong','heat'],description:{pl:'Poliwęglan lub jego mieszanka do części sztywnych i odpornych na ciepło. Właściwości zależą od formulacji.',en:'Polycarbonate or a blend for rigid, heat-resistant parts; formulation matters.'}},
  'PC/ABS':{group:'PC',nozzle:[260,300],bed:[90,120],fan:[0,20],level:'advanced',enclosure:true,categories:['engineering','strong','heat'],description:{pl:'Mieszanka PC/ABS do technicznych obudów i elementów użytkowych.',en:'A PC/ABS blend for engineering housings and functional parts.'}},
  PA:{group:'PA',nozzle:[250,290],bed:[70,110],fan:[0,30],level:'advanced',enclosure:true,categories:['engineering','strong'],description:{pl:'Nylon do części mechanicznych. Zachowaj stan wilgotności próbki zgodny z dokumentacją.',en:'Nylon for mechanical parts. Match specimen moisture conditioning to the documentation.'}},
  PA6:{group:'PA',nozzle:[260,300],bed:[70,110],fan:[0,30],level:'advanced',enclosure:true,categories:['engineering','strong'],description:{pl:'Nylon PA6 do części konstrukcyjnych. Wilgoć silnie wpływa na druk i właściwości.',en:'PA6 nylon for structural parts; moisture strongly affects printing and performance.'}},
  PA12:{group:'PA',nozzle:[255,290],bed:[80,110],fan:[0,30],level:'advanced',enclosure:true,categories:['engineering','strong'],description:{pl:'Nylon PA12 do elementów mechanicznych; zwykle mniej higroskopijny niż PA6, lecz nadal wymaga suszenia.',en:'PA12 nylon for mechanical parts; generally less hygroscopic than PA6 but still requires drying.'}},
  PA612:{group:'PA',nozzle:[270,300],bed:[50,100],fan:[0,30],level:'advanced',enclosure:true,categories:['engineering','strong'],description:{pl:'Poliamid PA612 do części technicznych, łączący sztywność z ograniczeniem wpływu wilgoci.',en:'PA612 engineering polyamide balancing rigidity with reduced moisture sensitivity.'}},
  PAHT:{group:'PA',nozzle:[280,310],bed:[80,110],fan:[0,20],level:'advanced',enclosure:true,categories:['engineering','strong','heat'],description:{pl:'Wysokotemperaturowy poliamid. Sprawdź skład mieszanki i warunki kondycjonowania.',en:'A high-temperature polyamide; verify formulation and conditioning.'}},
  PET:{group:'PET',nozzle:[270,300],bed:[70,100],fan:[0,40],level:'advanced',enclosure:true,categories:['engineering','strong','heat'],description:{pl:'Poliester techniczny PET. Nie jest tym samym materiałem co PETG; obróbka cieplna może zmieniać parametry.',en:'Engineering PET, distinct from PETG; annealing can change its properties.'}},
  PPS:{group:'PPS',nozzle:[310,350],bed:[100,120],fan:[0,20],level:'industrial',enclosure:true,categories:['engineering','strong','heat'],description:{pl:'Tworzywo wysokotemperaturowe do zaawansowanych zastosowań. Wymaga odpowiedniego hotendu i komory.',en:'A high-temperature polymer requiring suitable hotend and chamber hardware.'}},
  TPU:{group:'TPU',nozzle:[210,250],bed:[30,60],fan:[20,60],level:'medium',enclosure:false,categories:['flexible'],description:{pl:'Elastomer do części giętkich. Sprawdź twardość i zgodność ze ścieżką podawania.',en:'An elastomer for flexible parts; check hardness and feed-path compatibility.'}}
};
function entry(id,brand,name,base,flags=[],source,overrides={}) {
  const f=families[base];if(!f)throw new Error(`Unknown family: ${base}`);
  return {id,brand,name,base,group:f.group,flags,level:f.level,description:f.description,
    nozzle:f.nozzle,bed:f.bed,settingsKind:'family',dry:null,hardened:flags.some(v=>['CF','GF','WOOD'].includes(v)),enclosure:f.enclosure,
    hdt:null,flexModulus:null,flexStrength:null,impactXY:null,moisture:null,density:null,tensileModulus:null,tensileStrength:null,elongation:null,
    source:source||sources[brand],tds:null,reference:null,evidence:'catalog',spool:'check',photo:null,imageUrl:null,imageCredit:null,
    categories:[...f.categories,...(flags.some(v=>['CF','GF'].includes(v))?['composite']:[])],profileOrigin:'family',checkedOn,
    note:{pl:'Zakresy druku są punktem startowym dla rodziny tworzywa. Brak pomiaru oznacza brak zweryfikowanej wartości dla tego produktu, nie zero.',en:'Print ranges are family-level starting points. A missing measurement means no verified product value, not zero.'},
    printGuide:{fan:f.fan,fanBasis:'family',fanSource:guide,chamber:f.enclosure?'enclosure-recommended':'not-required',chamberBasis:'family',chamberSource:guide,dryingRequired:f.group==='PA'?'strongly-recommended':'as-needed',dryingTemperature:null,dryingTime:null,dryingBasis:'unknown',dryingSource:null,storage:['PA','PC'].includes(f.group)?'dry-box':'sealed'},
    ...overrides};
}
// eSUN: manufacturer Product Manual 2024; not a substitute for a newer SKU TDS.
// Rows: id, product, family, flags, HDT 0.45 MPa, flexural modulus, flexural strength, tensile strength, density.
const esunRows=[
  ['pla-plus','PLA+','PLA',[],53,1973,74,63,1.23],
  ['epla-hs','ePLA-HS','PLA',[],53,2700,79,60,1.24],
  ['epla-plus-hs','ePLA+HS','PLA',[],54,2695,78,59,1.24],
  ['epla-cf','ePLA-CF','PLA',['CF'],53,5005,103,39,1.21],
  ['epla-st','ePLA-ST','PLA',[],52,1477,43,34.3,1.25],
  ['epla-matte','ePLA-Matte','PLA',[],51,2878,59,42,1.32],
  ['epla-silk','ePLA-Silk','PLA',[],50,1447,65,52,1.21],
  ['petg','PETG','PETG',[],64,1073,58.1,52.2,1.27],
  ['epetg-hs','ePETG-HS','PETG',[],64,1073,58,52.2,1.27],
  ['abs','ABS','ABS',[],78,1177,66,43,1.04],
  ['abs-plus','ABS+','ABS',[],73,1203,68,40,1.06],
  ['eabs-max','eABS-Max','ABS',[],85,2400,58,45,1.05],
  ['epa','ePA','PA',[],50,1370,58,52.45,1.12],
  ['epa-cf','ePA-CF','PA',['CF'],155,4363,140,140,1.24],
  ['epa-gf','ePA-GF','PA',['GF'],120,1714.63,77.75,76.93,1.35],
  ['epa12-cf','ePA12-CF','PA12',['CF'],94.1,3335,116.58,108.18,1.24],
  ['epaht-cf','ePAHT-CF','PAHT',['CF'],190,5612.41,171.64,173.37,1.4],
  ['epc','ePC','PC',[],80,1073,63.41,54.88,1.12]
];
export const additions=esunRows.map(([id,name,base,flags,hdt,flexModulus,flexStrength,tensileStrength,density])=>entry(`esun-${id}`,'eSUN',name,base,flags,sources.eSUN,{
  hdt,flexModulus,flexStrength,tensileStrength,density,evidence:'product-data',tds:esunManual,reference:esunManual,
  measurementMethods:{hdt:'0.45 MPa · katalog 2024',flexModulus:'moduł zginania · katalog 2024',tensileStrength:'rozciąganie · katalog 2024'},
  note:{pl:'Pomiary z tabeli produktu w katalogu eSUN 2024. Nie mieszaj ich z nowszą formulacją ani innym stanem wilgotności. Zakres druku pozostaje orientacyjny dla rodziny; moduł zginania nie jest modułem Younga.',en:'Product measurements from the eSUN 2024 manual. Do not mix formulations or moisture conditioning. Print ranges remain family guidance; flexural modulus is not Young’s modulus.'}
}));
additions.push(
  entry('esun-easa','eSUN','eASA','ASA',[],sources.eSUN,{tdsPage:sources.eSUN}),
  entry('esun-etpu-95a','eSUN','eTPU-95A','TPU',[],sources.eSUN,{density:1.21,tensileStrength:35,evidence:'product-data',reference:esunManual,tds:esunManual}),
  entry('sunlu-easy-pa','SUNLU','Easy PA','PA',[],'https://www.sunlu.com/products/easy-pa-nylon-filament'),
  entry('sunlu-pla-cf','SUNLU','PLA-CF','PLA',['CF'],'https://www.sunlu.com/wiki/filament-category'),
  entry('jayo-pla-meta','JAYO','PLA Meta','PLA',[],'https://jayo3d.com/products/jayo-pla-meta-1-1kg-3d-printer-filament-cardboard-spool'),
  entry('jayo-pla-rainbow','JAYO','PLA Rainbow','PLA',[],'https://jayo3d.com/products/jayo-pla-rainbow-1-1kg-3d-printer-filament-cardboard-spool'),
  entry('jayo-wood','JAYO','Wood','PLA',['WOOD'],'https://jayo3d.com/products/jayo-wood-1-1kg-1kg-3d-printer-filament'),
  entry('polymaker-fiberon-pa12-cf10','Polymaker','Fiberon PA12-CF10','PA12',['CF'],'https://fiberon.polymaker.com/',{tdsPage:'https://polymaker.com/download-material/'}),
  entry('polymaker-fiberon-pa612-cf15','Polymaker','Fiberon PA612-CF15','PA612',['CF'],'https://fiberon.polymaker.com/',{tdsPage:'https://polymaker.com/download-material/'}),
  entry('fiberlogy-nylon-pa12-gf15','Fiberlogy','Nylon PA12+GF15','PA12',['GF'],'https://fiberlogy.com/en/product/nylon-pa12gf-filament/',{
    nozzle:[255,270],bed:[90,110],settingsKind:'tds',enclosure:false,dry:[80,'4 h'],hdt:175,hdtOther:165,hdtOtherMethod:'ISO 75 · 1.8 MPa',density:1.13,tensileModulus:3100,tensileStrength:72,elongation:8,impactNotched:16,
    evidence:'tds',tds:'https://fiberlogy.com/upload/techfiles/FIBERLOGY_NYLONPA12GF15_TDS.pdf',measurementMethods:{tensileModulus:'ISO 527',tensileStrength:'ISO 527 · przy zerwaniu',impactNotched:'ISO 179 · 23°C'},
    note:{pl:'Dane z TDS aktualizowanej 20.05.2025. Karta podaje 3100 MPa dla rozciągania; moduł zginania pozostaje nieznany. Strona produktu podaje inne hasłowe wartości — porównuj według metody badania.',en:'TDS updated 2025-05-20. The 3100 MPa value is a tensile modulus, not flexural modulus. Product-page headline values differ; compare matching test methods.'}
  })
);
const dx='https://www.3dxtech.com/collections/specialty-filament';
for(const [id,name,base,flags]of [
  ['pc','3DXMAX PC','PC',[]],['ezpc-cf','CARBONX ezPC+CF','PC',['CF']],['pc-abs','3DXMAX PC/ABS','PC/ABS',[]],['fr-pc-abs','FIREWIRE FR-PC/ABS','PC/ABS',['FR']],
  ['pa6-gf30','FIBREX Nylon 6+GF30','PA6',['GF']],['pa12-gf30','FIBREX Nylon 12+GF30','PA12',['GF']],['pa6-cf','CARBONX Nylon 6+CF','PA6',['CF']],['pa12-cf','CARBONX Nylon 12+CF','PA12',['CF']]
])additions.push(entry(`3dxtech-${id}`,'3DXTECH',name,base,flags,dx));
additions.push(entry('3dxtech-pc-cf','3DXTECH','CARBONX PC+CF','PC',['CF'],'https://www.3dxtech.com/products/carbonx-pc-cf-1',{
  nozzle:[280,310],bed:[110,120],settingsKind:'product',dry:[120,'4 h'],tdsPage:'https://www.3dxtech.com/products/carbonx-pc-cf-1',evidence:'catalog',
  note:{pl:'Producent zaleca dyszę ścieroodporną, warstwę od 0,25 mm i suszenie 120°C / 4 h. Sprawdź odporność szpuli. Tg poliwęglanu nie jest HDT tego kompozytu; HDT pozostaje nieznane.',en:'Manufacturer recommends a wear-resistant nozzle, layer height ≥0.25 mm and drying at 120°C / 4 h. Check spool limits. Matrix Tg is not the composite HDT; HDT remains unknown.'}
}));
for(const [id,name,base,flags]of [
  ['abs-gf25','ABS-GF25','ABS',['GF']],['pa12-cf','PA12-CF','PA12',['CF']],['paht-cf','PAHT-CF','PAHT',['CF']],['paht-gf','PAHT-GF','PAHT',['GF']],
  ['pet-gf','PET-GF','PET',['GF']],['petg-gf','PETG-GF','PETG',['GF']],['pps-gf20','PPS-GF20','PPS',['GF']],['tpu-gf','TPU-GF','TPU',['GF']],
  ['pc-abs-fr','PC-ABS-FR','PC/ABS',['FR']],['ultrapa','UltraPA','PA',[]],['ultra-pa-cf25','Ultra PA-CF25','PA',['CF']]
])additions.push(entry(`qidi-${id}`,'QIDI',name,base,flags,sources.QIDI,{tdsPage:sources.QIDI}));

// Existing entries gain verified product-specific measurements without changing IDs.
export const updates = [
  {id:'prusa-prusament-pc-blend-carbon-fiber',density:1.22,tensileModulus:2600,tensileStrength:64,flexModulus:3500,flexStrength:94,hdt:114,hdtOther:106,hdtOtherMethod:'ISO 75 · 1.80 MPa',elongation:4.6,impactNotched:12,
    evidence:'tds',tds:'https://prusament.com/wp-content/uploads/2023/04/TDS_Prusament-PCCF_2023_EN.pdf',nozzle:[275,295],bed:[100,120],settingsKind:'tds',checkedOn,
    measurementMethods:{tensileModulus:'ISO 527-1 · próbka pozioma',tensileStrength:'ISO 527-1 · granica plastyczności, poziomo',impactNotched:'ISO 179-1'},
    note:{pl:'TDS v2.0-OY (19.04.2023): próbki drukowane poziomo, wypełnienie 100%. Pionowo xz: E = 3200 MPa i granica plastyczności 70 MPa. Nie traktuj materiału jako izotropowego. HDT nie jest temperaturą pracy ciągłej.',en:'TDS v2.0-OY (2023-04-19): horizontal specimens, 100% infill. Vertical xz: E = 3200 MPa, tensile yield strength 70 MPa. Do not assume isotropy; HDT is not continuous service temperature.'}},
  {id:'sunlu-pa6-gf',density:1.269,tensileStrength:89,flexModulus:6130,flexStrength:176,hdt:205.2,elongation:12.5,evidence:'tds',settingsKind:'tds',nozzle:[270,290],bed:[60,70],checkedOn,
    tds:'https://media.sunlu.com/prod/20260330/e5f16b43-cef6-4f3e-ad93-3cc86f93f7e4.pdf?filename=TDS',source:'https://www.sunlu.com/wiki/engineering-filament',
    measurementMethods:{tensileStrength:'ISO 527/2 · XY',flexModulus:'ISO 178 · XY',hdt:'ISO 75 · 0.45 MPa'},
    note:{pl:'TDS SL-TE-WI-122 A/1: próbki XY, wypełnienie 100%. 6130 MPa jest modułem zginania. Producent nie podaje modułu Younga, więc to pole pozostaje puste. Nie zamieniaj udarności Izod na Charpy.',en:'TDS SL-TE-WI-122 A/1: XY specimens, 100% infill. 6130 MPa is flexural modulus. Young’s modulus is not reported and stays blank. Izod and Charpy impact are not interchangeable.'}}
];
// Additional engineering products, with direct documents in documents.mjs.
for (const [id,name,base,flags] of [
  ['polylite-pc','PolyLite PC Transparent','PC',[]],['pc-abs','Polymaker PC-ABS','PC/ABS',[]],
  ['fiberon-pet-gf15','Fiberon PET-GF15','PET',['GF']],['fiberon-pps-gf20','Fiberon PPS-GF20','PPS',['GF']],
  ['ht-pla-gf','Polymaker HT-PLA-GF','PLA',['GF']],['fiberon-petg-rcf08','Fiberon PETG-rCF08','PETG',['CF']],
  ['fiberon-pa612-esd','Fiberon PA612-ESD','PA612',['ESD']],['polymide-copa','PolyMide CoPA','PA',[]]
]) additions.push(entry(`polymaker-${id}`,'Polymaker',name,base,flags,'https://polymaker.com/download-material/'));
for (const [id,name,base,flags,source] of [
  ['pc-abs','PC/ABS','PC/ABS',[],'https://fiberlogy.com/product/filament-pc-abs/'],
  ['rnylon','rNylon PA12','PA12',[],'https://fiberlogy.com/en/product/rnylon-filament/'],
  ['pctg-gf','PCTG+GF','PCTG',['GF'],'https://fiberlogy.com/product/filament-pctggf/'],
  ['pctg-cf','PCTG+CF','PCTG',['CF'],'https://fiberlogy.com/product/filament-pctgcf/']
]) additions.push(entry(`fiberlogy-${id}`,'Fiberlogy',name,base,flags,source));
export const handbookAdditions=[
  {base:'PA',name:{pl:'Nylon / poliamid — formulacja niesprecyzowana',en:'Nylon / unspecified polyamide'},intro:{pl:'PA to rodzina nylonów. Sama nazwa nie rozstrzyga, czy bazą jest PA6, PA66 czy kopoliamid; sprawdź kartę produktu.',en:'PA denotes the nylon family. It does not identify PA6, PA66 or a copolyamide; check the product sheet.'},uses:{pl:'części mechaniczne, ślizgi, uchwyty i prototypy funkcjonalne',en:'mechanical parts, guides, brackets and functional prototypes'},limits:{pl:'wilgoć i dodatki CF/GF zmieniają właściwości; nie przenoś danych z innego nylonu',en:'moisture and CF/GF change properties; do not substitute another nylon’s data'},ratings:{heat:3,tough:4,flex:3,weather:3,easy:2}},
  {base:'PA612',name:{pl:'Poliamid 612 / nylon',en:'Polyamide 612 / nylon'},intro:{pl:'PA612 należy do nylonów technicznych. W katalogach występuje m.in. ze wzmocnieniem CF.',en:'PA612 is an engineering nylon, available in carbon-fiber-reinforced formulations.'},uses:{pl:'elementy konstrukcyjne, oprzyrządowanie i uchwyty',en:'structural parts, fixtures and brackets'},limits:{pl:'wymaga suszenia; sztywność i wpływ wilgoci zależą od konkretnej mieszanki',en:'requires drying; stiffness and moisture response depend on the formulation'},ratings:{heat:4,tough:4,flex:2,weather:3,easy:2}}
];
