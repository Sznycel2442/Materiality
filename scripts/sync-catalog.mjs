import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { additions, updates, handbookAdditions, checkedOn, sources } from '../data/catalog-expansion.mjs';
import { polymakerTDS } from '../data/documents.mjs';
import { additions as wikiAdditions, handbookAdditions as wikiGuides, sources as wikiSources } from '../data/ultimate-expansion.mjs';
import { fillamentumDocuments, overtureDocuments, otherDocuments, sharedDocuments } from '../data/ultimate-documents.mjs';

const root = new URL('../', import.meta.url);
const read = name => readFile(new URL(name, root), 'utf8');
const db = JSON.parse(await read('materiality-data.json'));
for (const product of [...additions,...wikiAdditions]) {
  const at = db.filaments.findIndex(d => d.id === product.id);
  if (at < 0) db.filaments.push(structuredClone(product));
  else db.filaments[at] = structuredClone(product);
}
for (const update of updates) {
  const product = db.filaments.find(d => d.id === update.id);
  if (!product) throw new Error(`Missing existing product: ${update.id}`);
  Object.assign(product, update);
}
for (const product of db.filaments.filter(d => d.checkedOn === checkedOn)) {
  if (product.reference?.includes('eSUN-3D-Product-Manual')) product.documentKind = 'manufacturer-manual';
  if (product.dry) Object.assign(product.printGuide, {
    dryingTemperature: product.dry[0], dryingTime: product.dry[1],
    dryingBasis: 'product', dryingSource: product.tds || product.source
  });
}
const fiberlogy = db.filaments.find(d => d.id === 'fiberlogy-nylon-pa12-gf15');
Object.assign(fiberlogy.printGuide, {fan:[0,25],fanBasis:'product',fanSource:fiberlogy.source,
  chamber:'not-required',chamberBasis:'product',chamberSource:fiberlogy.source});
for (const guide of [...handbookAdditions,...wikiGuides]) {
  const at = db.handbook.findIndex(d => d.base === guide.base);
  if (at < 0) db.handbook.push(guide); else db.handbook[at] = guide;
}
Object.assign(db.sources, sources, wikiSources);
for (const [brand,url] of Object.entries({...sources,...wikiSources})) {
  if (!db.sourceLinks.some(d => d.url === url)) db.sourceLinks.push({label:`${brand} — katalog producenta`,url});
}
db.meta.updated = checkedOn;
db.meta.catalogExpansionCheckedOn = checkedOn;
// Document availability does not imply that all product measurements were transcribed.
const fiberDocuments = JSON.parse(await read('data/fiberlogy-documents.json'));
for (const [id,path] of Object.entries(polymakerTDS)) {
  const d=db.filaments.find(d=>d.id===id);
  if (!d) throw new Error(`Unknown document product: ${id}`);
  d.tds='https://polymaker.com/wp-content/uploads/'+path;
  d.tdsPage=null;
  d.documents=[{type:'TDS',language:'EN',url:d.tds,checkedOn}];
}
for (const {id,source,links} of fiberDocuments) {
  const d=db.filaments.find(d=>d.id===id);
  if (!d || !links?.length) throw new Error(`Missing Fiberlogy documents: ${id}`);
  d.source=source;
  d.tds=links.find(url=>/_TDS\.pdf$/i.test(url));
  d.documents=links.map(url=>({type:url.includes('_TDS.')?'TDS':url.includes('_SDS')?'SDS':'declaration',language:url.includes('_PL.')?'PL':/_DE\./.test(url)?'DE':/_FR\./.test(url)?'FR':url.includes('_SDS_')?'EN':'PL/EN',url,checkedOn}));
}
const spectrumDocuments=JSON.parse(await read('data/spectrum-documents.json'));
const extraDocuments={...fillamentumDocuments,...overtureDocuments,...otherDocuments};
for(const d of db.filaments.filter(d=>wikiAdditions.some(newProduct=>newProduct.id===d.id))){
  const spectrum=spectrumDocuments.find(row=>row.id===d.id);
  if(spectrum?.source)d.source=spectrum.source;
  const links=[...(spectrum?.links||[]),...(extraDocuments[d.id]||[]),...(sharedDocuments[d.brand]?[sharedDocuments[d.brand]]:[])];
  d.documents=links.length?links.map(doc=>({...doc,checkedOn})):[];
  const tds=d.documents.find(doc=>doc.type==='TDS');
  if(tds)d.tds=tds.url;
  if(!links.length)d.tdsPage=d.source;
}
for(const d of db.filaments.filter(d=>d.checkedOn===checkedOn&&d.dry))d.printGuide.dryingSource=d.tds||d.source;
const manufacturerImages = JSON.parse(await read('data/manufacturer-images.json'));
for (const photo of manufacturerImages) {
  const product = db.filaments.find(d => d.id === photo.id);
  if (!product) throw new Error(`Unknown photographed product: ${photo.id}`);
  if (!/^assets\/materials\/[a-z0-9-]+\.(?:jpg|jpeg|png|webp)$/i.test(photo.imageUrl)) {
    throw new Error(`Invalid local photo path: ${photo.imageUrl}`);
  }
  Object.assign(product, photo);
}
const documents=new Map();
for(const d of db.filaments){
  const links=[...(d.documents||[])];
  if(d.tds&&!links.some(doc=>doc.url===d.tds))links.push({type:d.documentKind==='manufacturer-manual'?'manual':d.documentKind==='declaration'?'declaration':'TDS',language:'—',url:d.tds});
  if(!d.tds&&d.tdsPage)links.push({type:'LINK',language:'—',url:d.tdsPage});
  for(const doc of links){
    const key=doc.url;
    if(!documents.has(key))documents.set(key,{...doc,id:'doc-'+documents.size,productIds:[]});
    documents.get(key).productIds.push(d.id);
  }
}
db.documents=[...documents.values()];
let html = await read('index.html');
if(!html.includes('<script src="assets/catalog.js"></script>')){
  html=html.replace('<script>const DB=','<script src="assets/catalog.js"></script>\n <script>const DB=');
  html=html.replace(/^function filterChange\(kind,k,value\)\{[^\r\n]*\}\r?\n/m,'');
  html=html.replace(/^function renderCatalog\(kind\)\{[^\r\n]*\}\r?\n/m,'');
}
html=html.replace(/handbookPromoDesc:'\d+ opisane rodziny:/,`handbookPromoDesc:'${db.handbook.length} opisanych rodzin:`)
  .replace(/handbookPromoDesc:'\d+ material families/,`handbookPromoDesc:'${db.handbook.length} material families`);
const embedded = /(<script>const DB=)(\{[^\r\n]*\})(;)/;
if (!embedded.test(html)) throw new Error('Embedded database marker not found');
JSON.parse(html.match(embedded)[2]);
await writeFile(new URL('materiality-data.json', root), JSON.stringify(db,null,2)+'\n');
await writeFile(new URL('index.html', root), html.replace(embedded, (_,start,_data,end) => start+JSON.stringify(db)+end));
const columns = ['id','brand','name','base','group','nozzle','bed','fan','chamber','dryingTemperature','dryingTime','dryingBasis','categories','source','buyUrl','tds','foodContactLevel','evidence','hdt','hdtOther','flexModulus','flexStrength','impactXY','impactNotched','moisture','tensileModulus','tensileStrength','density','elongation','checkedOn'];
function cell(value) {
  const s = Array.isArray(value) ? value.join(', ') : String(value ?? '');
  return /[",\r\n]/.test(s) ? '"'+s.replaceAll('"','""')+'"' : s;
}
const csv = [columns.join(','), ...db.filaments.map(d => columns.map(key => cell(key in d ? d[key] : d.printGuide?.[key])).join(','))].join('\n')+'\n';
await writeFile(new URL('filaments.csv', root), csv);
console.log(`Synced ${db.filaments.length} filaments, ${db.handbook.length} families in ${fileURLToPath(root)}`);
