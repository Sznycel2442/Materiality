import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { additions, updates } from '../data/catalog-expansion.mjs';
import { polymakerTDS } from '../data/documents.mjs';
import { additions as wikiAdditions } from '../data/ultimate-expansion.mjs';

const root = new URL('../', import.meta.url);
const db = JSON.parse(await readFile(new URL('materiality-data.json',root),'utf8'));
const manufacturerImages=JSON.parse(await readFile(new URL('data/manufacturer-images.json',root),'utf8'));
const html = await readFile(new URL('index.html',root),'utf8');
assert.deepEqual(JSON.parse(html.match(/<script>const DB=(\{[^\r\n]*\});/)[1]),db,'HTML and JSON databases must agree');
const baseline = JSON.parse(execFileSync('git',['show','60825eb:materiality-data.json'],{cwd:root,encoding:'utf8',maxBuffer:2e6}));
for (const key of ['resins','printers','feeders','resinPrinters','categories']) assert.deepEqual(db[key],baseline[key],`${key} preserved`);
const ids = db.filaments.map(d=>d.id);
assert.equal(new Set(ids).size,ids.length,'Unique material identifiers');
assert.equal(db.filaments.length,baseline.filaments.length+additions.length+wikiAdditions.length);
for (const old of baseline.filaments) {
  const current = db.filaments.find(d=>d.id===old.id);
  assert.ok(current,`Existing material preserved: ${old.id}`);
  if (!updates.some(d=>d.id===old.id)) {
    const retained={...current};
    for(const key of ['documents','tds','tdsPage','source']){
      if(key in old)retained[key]=old[key];else delete retained[key];
    }
    if(manufacturerImages.some(photo=>photo.id===old.id)){
      retained.imageCredit=old.imageCredit;
      retained.imageUrl=old.imageUrl;
      delete retained.imageSourceUrl;
    }
    assert.deepEqual(retained,old,'Existing measurements, notes, prices and IDs preserved');
  }
}
const get = id => db.filaments.find(d=>d.id===id);
assert.equal(new Set(manufacturerImages.map(photo=>photo.id)).size,manufacturerImages.length,'Unique photographed products');
for(const photo of manufacturerImages){
  assert.ok(get(photo.id),`Photographed material: ${photo.id}`);
  for(const key of ['imageUrl','imageSourceUrl','imageCredit','source'])assert.equal(get(photo.id)[key],photo[key]);
  assert.match(photo.imageUrl,/^assets\/materials\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/i);
  const image=await readFile(new URL(photo.imageUrl,root));
  assert.ok(image.length>10000,`Nonempty local photo: ${photo.id}`);
  assert.ok(/^https:\/\//.test(photo.imageSourceUrl),`Original manufacturer photo URL: ${photo.id}`);
}
assert.equal(get('sunlu-pa6-gf').flexModulus,6130);
assert.equal(get('sunlu-pa6-gf').tensileModulus??null,null,'Never substitute flexural modulus for Young’s modulus');
assert.equal(get('fiberlogy-nylon-pa12-gf15').tensileModulus,3100);
assert.equal(get('fiberlogy-nylon-pa12-gf15').flexModulus,null);
assert.equal(get('prusa-prusament-pc-blend-carbon-fiber').tensileModulus,2600);
assert.equal(get('esun-epa-gf').documentKind,'manufacturer-manual');
assert.equal(get('3dxtech-pc-cf').hdt,null,'Matrix Tg is not composite HDT');
assert.equal(get('3dxtech-pc-cf').printGuide.dryingTemperature,120);
assert.equal(get('fiberlogy-nylon-pa12-gf15').printGuide.chamber,'not-required');
for (const d of [...additions,...wikiAdditions].map(d=>get(d.id))) {
  assert.ok(db.handbook.some(g=>g.base===d.base),`Handbook family: ${d.base}`);
  assert.ok(d.description.pl && d.description.en && d.note.pl && d.note.en);
  assert.equal(new URL(d.source).protocol,'https:');
  assert.ok(d.printGuide && d.checkedOn);
  if(d.flags.some(f=>['GF','CF'].includes(f))) assert.equal(d.hardened,true);
  for(const k of ['hdt','flexModulus','flexStrength','tensileModulus','tensileStrength','density']) {
    assert.ok(d[k]===null || Number.isFinite(d[k]),`${d.id}.${k}`);
    if(d[k]!==null) assert.ok(d.tds || d.reference,`Measured values require a document: ${d.id}`);
  }
}
const csv=await readFile(new URL('filaments.csv',root),'utf8');
assert.equal(csv.trim().split('\n').length,db.filaments.length+1);
assert.ok(csv.includes('tensileModulus,tensileStrength,density'));
for(const id of ids) assert.ok(csv.includes(id+','),`CSV material: ${id}`);
assert.equal(new Set(db.documents.map(d=>d.url)).size,db.documents.length,'Shared documents listed once');
for(const id of Object.keys(polymakerTDS))assert.ok(get(id).tds.endsWith('.pdf'));
for(const doc of db.documents)for(const id of doc.productIds)assert.ok(ids.includes(id));
assert.ok(db.documents.filter(d=>d.type==='SDS').length>=40);
assert.ok(new Set(db.filaments.map(d=>d.brand)).size>=21);
assert.ok(db.documents.filter(d=>d.type!=='LINK').length>=180);
console.log(`Catalog passed: ${db.filaments.length} materials, ${additions.length+wikiAdditions.length} additions, ${db.documents.length} document records, synchronized HTML/JSON/CSV.`);
