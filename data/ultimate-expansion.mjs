import {createCatalogEntry,checkedOn} from './catalog-expansion.mjs';

// Every name below occurs in the linked manufacturer catalog or portfolio.
// Family print ranges remain indicative; product measurements are left null.
export const sources={
  Spectrum:'https://spectrumfilaments.com/en/products-serie/desktopline/',
  Fillamentum:'https://fillamentum.com/learn/data-sheets-and-3d-printing-guides/',
  colorFabb:'https://colorfabb.com/ams-compatibility',
  FormFutura:'https://www.formfutura.com/downloads',
  Extrudr:'https://s3.extrudr.com/extrudr-media/product-catalogue/extrudr-Produktkatalog_EN.pdf',
  Overture:'https://wiki.overture3d.com/en/Filament/TDS%26SDS',
  '3DJake':'https://www.3djake.com/3djake/3djake-filaments',
  Recreus:'https://recreus.com/en/pages/faq',
  NinjaTek:'https://ninjatek.com/shop/compare-filaments/',
  'Forward AM':'https://forward-am.com/material-portfolio/ultrafuse-filaments-for-fused-filaments-fabrication-fff/'
};
const specs={
  Spectrum:[
    ['pc-cf','PC CF','PC',['CF']],['pc-275','PC 275','PC',[]],['pc-abs-fr-v0','PC/ABS FR V0','PC/ABS',['FR']],
    ['pa6-gf30','PA6 Low Warp GF30','PA6',['GF']],['pa6-cf15s','PA6 Low Warp CF15S','PA6',['CF']],['pa6-low-warp','PA6 Low Warp','PA6',[]],
    ['pctg-cf10','PCTG CF10','PCTG',['CF']],['pctg-gf10','PCTG GF10','PCTG',['GF']],['pctg-premium','PCTG Premium','PCTG',[]],
    ['petg-ptfe','PETG/PTFE','PETG',['PTFE']],['premium-petg','PET-G Premium','PETG',[]],['asa-275','ASA 275','ASA',[]],['asa-x-cf10','ASA-X CF10','ASA',['CF']],
    ['pla-high-speed','PLA High Speed','PLA',[]],['pla-metal-brass','PLA Metal Brass','PLA',['METAL']],['flameguard-pla','FlameGuard PLA','PLA',['FR']],
    ['smart-abs','smart ABS','ABS',[]],['hips-x','HIPS-X','HIPS',[]],['s-flex-85a','S-Flex 85A','TPU',[]]
  ],
  Fillamentum:[
    ['pla-extrafill','PLA Extrafill','PLA',[]],['pla-crystal-clear','PLA Crystal Clear','PLA',[]],['timberfill','Timberfill','PLA',['WOOD']],
    ['petg','PETG','PETG',[]],['cpe-hg100','CPE HG100','CPE',[]],['cpe-cf112','CPE CF112 Carbon','CPE',['CF']],
    ['abs-extrafill','ABS Extrafill','ABS',[]],['asa-extrafill','ASA Extrafill','ASA',[]],['nylon-fx256','Nylon FX256','PA',[]],
    ['nylon-cf15','Nylon CF15 Carbon','PA',['CF']],['nylon-af80','Nylon AF80 Aramid','PA',['ARAMID']],['orca-pa6-cf10','OrCA Nylon PA6+CF10','PA6',['CF']],
    ['pc-abs','PC/ABS','PC/ABS',[]],['pp-2320','PP 2320','PP',[]],['hips-extrafill','HIPS Extrafill','HIPS',[]],
    ['flexfill-peba-90a','Flexfill PEBA 90A','PEBA',[]],['flexfill-tpu-92a','Flexfill TPU 92A','TPU',[]],['flexfill-tpu-98a','Flexfill TPU 98A','TPU',[]]
  ],
  colorFabb:[
    ['pla-pha','PLA/PHA','PLA',[]],['woodfill','woodFill','PLA',['WOOD']],['bronzefill','bronzeFill','PLA',['METAL']],
    ['xt','colorFabb_XT','CPE',[]],['xt-cf20','XT-CF20','CPE',['CF']],['ht','colorFabb_HT','CPE',[]],['ngen','nGen','CPE',[]],['ngen-cf10','nGen CF10','CPE',['CF']],
    ['lw-pla','LW-PLA','PLA',['AERO']],['varioshore-tpu','varioShore TPU','TPU',[]],['petg-economy','PETG Economy','PETG',[]],
    ['asa','ASA','ASA',[]],['pa-cf-low-warp','PA-CF Low Warp','PA',['CF']],['pa-neat','PA NEAT','PA',[]]
  ],
  FormFutura:[
    ['easyfil-pla','EasyFil PLA','PLA',[]],['volcano-pla','Volcano PLA','PLA',[]],['easywood','EasyWood','PLA',['WOOD']],
    ['easyfil-epetg','EasyFil ePETG','PETG',[]],['hdglass','HDglass PETG','PETG',[]],['carbonfil-petg-cf10','CarbonFil PETG CF10','PETG',['CF']],
    ['titanx','TitanX ABS','ABS',[]],['apollox','ApolloX ASA','ASA',[]],['apollox-cf10','ApolloX CF10','ASA',['CF']],
    ['centaur-pp','Centaur PP','PP',[]],['python-flex-90a','Python Flex TPU 90A','TPU',[]],['python-flex-98a','Python Flex TPU 98A','TPU',[]],
    ['flexifil-tpc-30d','FlexiFil TPC 30D','TPC',[]],['flexifil-tpc-40d','FlexiFil TPC 40D','TPC',[]],
    ['styx-pa6','STYX PA6','PA6',[]],['styx-pa6-cf15','STYX PA6-CF15','PA6',['CF']],['styx-pa6-gf30','STYX PA6-GF30','PA6',['GF']]
  ],
  Extrudr:[
    ['pla-nx2','PLA NX2 MATT','PLA',[]],['pla-basic','PLA BASIC','PLA',[]],['petg','PETG','PETG',[]],['pctg','PCTG','PCTG',[]],
    ['xpetg-matt','XPETG MATT','PETG',[]],['xpetg-cf','XPETG CF','PETG',['CF']],['durapro-abs','DuraPro ABS','ABS',[]],
    ['durapro-asa','DuraPro ASA','ASA',[]],['durapro-asa-cf','DuraPro ASA CF','ASA',['CF']],['durapro-asa-gf','DuraPro ASA GF','ASA',['GF']],
    ['durapro-pa12','DuraPro PA12','PA12',[]],['durapro-pa12-cf','DuraPro PA12 CF','PA12',['CF']],
    ['durapro-pc-pbt','DuraPro PC/PBT','PC/PBT',[]],['durapro-pc-pbt-cf','DuraPro PC/PBT CF','PC/PBT',['CF']],
    ['flex-medium','FLEX MEDIUM','TPU',[]],['flex-hard-cf','FLEX HARD CF','TPU',['CF']]
  ],
  Overture:[
    ['pla','PLA','PLA',[]],['matte-pla','Matte PLA','PLA',[]],['pla-professional','PLA Professional','PLA',[]],
    ['silk-pla','Silk PLA','PLA',[]],['easy-pla','Easy PLA','PLA',[]],['super-pla','Super PLA','PLA',[]],
    ['petg','PETG','PETG',[]],['tpu','TPU','TPU',[]],['high-speed-tpu','High Speed TPU','TPU',[]],
    ['abs','ABS','ABS',[]],['asa','ASA','ASA',[]],['easy-nylon','Easy Nylon','PA',[]],['pc-professional','PC Professional','PC',[]]
  ],
  '3DJake':[
    ['abs','ABS','ABS',[]],['abs-cf','ABS CF','ABS',['CF']],['asa','ASA','ASA',[]],['asa-cf','ASA CF','ASA',['CF']],
    ['easypetg','easyPETG','PETG',[]],['easypetg-cf','easyPETG CF','PETG',['CF']],['easypetg-matte','easyPETG Matte','PETG',[]],
    ['ecopla','ecoPLA','PLA',[]],['ecopla-cf','ecoPLA CF','PLA',['CF']],['ecopla-silk','ecoPLA Silk','PLA',[]],
    ['ecopla-wood','ecoPLA Wood','PLA',['WOOD']],['magicpla','magicPLA','PLA',[]],['mattepla','mattePLA','PLA',[]],
    ['pctg','PCTG','PCTG',[]],['tpu-a95','TPU A95','TPU',[]]
  ],
  Recreus:[
    ['filaflex-60a','Filaflex 60A','TPU',[]],['filaflex-70a','Filaflex 70A','TPU',[]],
    ['filaflex-82a','Filaflex 82A','TPU',[]],['filaflex-95a','Filaflex 95A','TPU',[]]
  ],
  NinjaTek:[
    ['ninjaflex','NinjaFlex','TPU',[]],['ninjaflex-edge','NinjaFlex Edge','TPU',[]],['chinchilla','Chinchilla','TPU',[]],
    ['cheetah','Cheetah','TPU',[]],['armadillo','Armadillo','TPU',[]]
  ],
  'Forward AM':[
    ['ultrafuse-pla','Ultrafuse PLA','PLA',[]],['ultrafuse-pet','Ultrafuse PET','PET',[]],['ultrafuse-abs','Ultrafuse ABS','ABS',[]],
    ['ultrafuse-asa','Ultrafuse ASA','ASA',[]],['ultrafuse-pc-abs-fr','Ultrafuse PC/ABS FR','PC/ABS',['FR']],
    ['ultrafuse-pp-gf30','Ultrafuse PP GF30','PP',['GF']],['ultrafuse-pet-cf15','Ultrafuse PET CF15','PET',['CF']],
    ['ultrafuse-paht-cf15','Ultrafuse PAHT CF15','PAHT',['CF']],['ultrafuse-pa6-gf30','Ultrafuse PA6 GF30','PA6',['GF']],
    ['ultrafuse-pc-gf30','Ultrafuse PC GF30','PC',['GF']]
  ]
};
export const additions=Object.entries(specs).flatMap(([brand,rows])=>rows.map(([slug,name,base,flags])=>{
  const id=brand.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-'+slug;
  return createCatalogEntry(id,brand,name,base,flags,sources[brand],{
    checkedOn,sourceScope:'manufacturer-portfolio',
    hardened:flags.some(f=>['CF','GF','WOOD','METAL'].includes(f))
  });
}));
export const handbookAdditions=[
  {base:'CPE',name:{pl:'Kopoliestry techniczne CPE',en:'Engineering copolyesters (CPE)'},intro:{pl:'CPE to szeroka grupa kopoliestrów; XT, HT i CPE HG100 mają różne formulacje.',en:'CPE covers several copolyester formulations; XT, HT and CPE HG100 differ.'},uses:{pl:'obudowy i części techniczne',en:'housings and functional parts'},limits:{pl:'nazwa grupy nie gwarantuje identycznej odporności termicznej ani chemicznej',en:'the family name does not imply equal thermal or chemical resistance'},ratings:{heat:3,tough:4,flex:2,weather:3,easy:3}},
  {base:'PEBA',name:{pl:'Elastomer PEBA',en:'PEBA elastomer'},intro:{pl:'PEBA łączy segmenty polieterowe i poliamidowe; konkretna twardość zależy od produktu.',en:'PEBA combines polyether and polyamide blocks; hardness depends on grade.'},uses:{pl:'części elastyczne i amortyzujące',en:'flexible and cushioning parts'},limits:{pl:'wymaga suszenia oraz zgodnego ekstrudera',en:'requires drying and a suitable extruder'},ratings:{heat:3,tough:4,flex:5,weather:3,easy:2}},
  {base:'TPC',name:{pl:'Elastomer poliestrowy TPC',en:'TPC polyester elastomer'},intro:{pl:'TPC to rodzina elastomerów termoplastycznych o różnych twardościach.',en:'TPC is a family of thermoplastic elastomers with varying hardness.'},uses:{pl:'amortyzatory, uszczelki i elementy sprężyste',en:'dampers, seals and resilient parts'},limits:{pl:'twardość i profil druku sprawdź dla dokładnej odmiany',en:'verify hardness and print settings for the exact grade'},ratings:{heat:3,tough:4,flex:5,weather:3,easy:2}},
  {base:'PC/PBT',name:{pl:'Mieszanka PC/PBT',en:'PC/PBT blend'},intro:{pl:'Mieszanka poliwęglanu i PBT używana w częściach technicznych.',en:'A polycarbonate and PBT blend for engineering parts.'},uses:{pl:'obudowy i elementy mechaniczne',en:'housings and mechanical components'},limits:{pl:'komora, suszenie i własności zależą od formulacji producenta',en:'chamber, drying and properties depend on the specific formulation'},ratings:{heat:4,tough:4,flex:2,weather:3,easy:2}}
];
