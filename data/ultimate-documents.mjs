// Direct manufacturer links. Numeric properties are recorded separately only when
// the specimen condition and measurement method are clear.
const fill='https://fillamentum.com/wp-content/uploads/';
const fillRows=[
  ['abs-extrafill','2020/10/Technical-Data-Sheet_ABS-Extrafill_03012019-1.pdf','2020/10/MSDS_ABS_EN_29072019.pdf'],
  ['asa-extrafill','2020/10/Technical-Data-Sheet_ASA-Extrafill_03012019.pdf','2020/10/MSDS_ASA_EN_29072019.pdf'],
  ['cpe-cf112','2020/10/TDS_CPE-CF112-Carbon.pdf','2020/10/SDS_CPE-CF112-Carbon_EN.pdf'],
  ['cpe-hg100','2020/10/Technical-Data-Sheet_CPE-HG100_03012019.pdf','2020/10/MSDS_CPE-HG100_EN_14052019.pdf'],
  ['flexfill-peba-90a','2020/10/TDS_Flexfill-PEBA-90A_EN.pdf','2020/10/SDS_Flexfill-PEBA-90A_EN.pdf'],
  ['flexfill-tpu-92a','2020/10/Technical-Data-Sheet_Flexfill-TPU-92A_26082019.pdf','2020/10/SDS_Flexfill-TPU-92A_EN.pdf'],
  ['flexfill-tpu-98a','2020/10/Technical-Data-Sheet_Flexfill-TPU-98A_26082019.pdf','2020/10/SDS_Flexfill-TPU-98A_EN.pdf'],
  ['hips-extrafill','2020/10/Technical-Data-Sheet_HIPS-Extrafill_03012019.pdf','2020/10/MSDS_HIPS-Extrafill_EN_29072019.pdf'],
  ['nylon-af80','2020/10/Technical-Data-Sheet_Nylon-AF80-Aramid.pdf','2020/10/SDS_Nylon-AF80-Aramid_EN.pdf'],
  ['nylon-cf15','2020/10/Technical-Data-Sheet_Nylon-CF15-Carbon_03012019.pdf','2020/10/SDS_Nylon-CF15-Carbon_EN.pdf'],
  ['nylon-fx256','2020/10/Technical-Data-Sheet_Nylon-FX256.pdf','2020/10/SDS_Nylon-FX256_EN.pdf'],
  ['pc-abs','2020/10/Technical_Data_Sheet_PC-ABS.pdf','2020/10/SDS_PC-ABS_EN.pdf'],
  ['petg','2023/02/TDS_PETG_EN_30012023.pdf','2023/02/MSDS_PETG_EN_20012023.pdf'],
  ['pla-crystal-clear','2020/10/Technical-Data-Sheet_PLA-Crystal-Clear_03012019.pdf','2020/10/MSDS_PLA-Crystal-Clear_EN_07122018.pdf'],
  ['pla-extrafill','2020/10/Technical-Data-Sheet_PLA-Extrafill_03012019.pdf','2024/01/MSDS_PLA-Extrafill_EN_31012024.pdf'],
  ['pp-2320','2020/10/Technical-Data-Sheet_PP-2320.pdf','2020/10/SDS_PP-2320_EN.pdf'],
  ['timberfill','2020/10/Technical-Data-Sheet_Timberfill_03012019.pdf',null]
];
export const fillamentumDocuments=Object.fromEntries(fillRows.map(([slug,tds,sds])=>['fillamentum-'+slug,[
  {type:'TDS',language:'EN',url:fill+tds},
  ...(sds?[{type:'SDS',language:'EN',url:fill+sds}]:[])
]]));
const overture='https://wiki.overture3d.com/';
const overtureNames={
  pla:'pla', 'matte-pla':'matte_pla','pla-professional':'pla_professional','silk-pla':'silk_pla',
  'easy-pla':'easy_pla','super-pla':'super_pla_','petg':'petg','tpu':'tpu','high-speed-tpu':'high_speed_tpu',
  abs:'abs',asa:'asa','easy-nylon':'easy_nylon','pc-professional':'pc_professional'
};
export const overtureDocuments=Object.fromEntries(Object.entries(overtureNames).map(([slug,file])=>[
  'overture-'+slug,['TDS','SDS'].map(type=>({type,language:'EN',url:overture+file+'_'+type.toLowerCase()+'.pdf'}))
]));
export const otherDocuments={
  'colorfabb-pa-cf-low-warp':[
    {type:'TDS',language:'EN',url:'https://colorfabb.com/media/datasheets/tds/colorfabb/TDS_E_ColorFabb_PA_CF_low_warp.pdf'},
    {type:'SDS',language:'EN',url:'https://colorfabb.com/media/datasheets/sds/colorfabb/SDS_E%20Colorfabb_PA-CF_Low_Warp_v1.1.pdf'}],
  'colorfabb-xt-cf20':[
    {type:'TDS',language:'EN',url:'https://colorfabb.com/media/datasheets/tds/colorfabb/TDS_E_ColorFabb_XT_CF20.pdf'},
    {type:'SDS',language:'EN',url:'https://colorfabb.com/media/datasheets/sds/colorfabb/SDS_E_Colorfabb_XT_CF20.pdf'}],
  'forward-am-ultrafuse-pet-cf15':[{type:'TDS',language:'EN',url:'https://forward-am.com/wp-content/uploads/2021/07/Ultrafuse_PET_CF15_TDS_EN_v3.3.pdf'}],
  'forward-am-ultrafuse-paht-cf15':[{type:'TDS',language:'EN',url:'https://forward-am.com/wp-content/uploads/2024/10/Ultrafuse_PAHT_CF15_TDS_EN_v3.5-1.pdf'}]
};
export const sharedDocuments={
  Extrudr:{type:'manual',language:'EN',url:'https://s3.extrudr.com/extrudr-media/product-catalogue/extrudr-Produktkatalog_EN.pdf'},
  FormFutura:{type:'LINK',language:'EN',url:'https://www.formfutura.com/downloads'},
  NinjaTek:{type:'manual',language:'EN',url:'https://ninjatek.com/wp-content/uploads/tech-data-metric.pdf'}
};
