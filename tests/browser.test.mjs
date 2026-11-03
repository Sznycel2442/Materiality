import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = resolve(fileURLToPath(new URL('../',import.meta.url)));
const server = createServer(async(req,res)=>{
  try {
    const route = decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/Materiality\//,'/');
    const file = resolve(root,'.'+(route==='/'?'/index.html':route));
    if (!file.startsWith(root+sep)) {res.writeHead(403).end();return;}
    const content = await readFile(file);
    res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp'})[extname(file)]||'application/octet-stream');
    res.end(content);
  }catch {res.writeHead(404).end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser = await chromium.launch({headless:true});
try {
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];
  page.on('pageerror',err=>errors.push(err.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/Materiality/`);
  await page.waitForFunction(()=>Number(document.getElementById('statFil')?.textContent)===162);
  await page.evaluate(()=>go('filaments'));
  // Exercise the actual search field, including aliases and multiword queries.
  for(const [query,expected]of [['PC-CF','3dxtech-pc-cf'],['eSUN GF','esun-epa-gf'],['nylon PA612','polymaker-fiberon-pa612-cf15'],['JAYO Wood','jayo-wood']]){
    await page.locator('#search-filaments').fill(query);
    const matches=await page.evaluate(()=>filtered('filaments').map(d=>d.id));
    assert.ok(matches.includes(expected),`${query}: ${matches.join(', ')}`);
  }
  await page.locator('#search-filaments').fill('');
  await page.evaluate(()=>{filterChange('filaments','brand','eSUN');filterChange('filaments','tag','GF');});
  assert.deepEqual(await page.evaluate(()=>filtered('filaments').map(d=>d.id)),['esun-epa-gf']);
  await page.evaluate(()=>{filterChange('filaments','brand','');filterChange('filaments','tag','ALL');});
  // All additions and every modal tab must render in both languages.
  await page.evaluate(()=>{
    for(const locale of ['pl','en']){
      setLang(locale);
      for(const d of F.filter(d=>d.checkedOn)){
        openModal(d.id,'filaments');
        for(const tab of ['props','print','fit','sources','photo','notes']) setModalTab(tab);
        closeModal();
      }
      go('handbook');chooseGuide('PA612');go('docs');
    }
    setLang('pl');openModal('esun-epa-gf','filaments');
  });
  assert.ok(await page.locator('#overlay').getByText('Katalog PDF',{exact:false}).count());
  await page.evaluate(()=>{closeModal();selected.filaments=['sunlu-pa6-gf','fiberlogy-nylon-pa12-gf15','prusa-prusament-pc-blend-carbon-fiber'];compareType='filaments';go('compare');});
  const table=await page.locator('#compareTable').innerText();
  assert.match(table,/Moduł przy rozciąganiu/);
  assert.match(table,/6130/);assert.match(table,/3100/);assert.match(table,/2600/);
  const row=page.locator('#compareTable tr').filter({hasText:'Moduł przy rozciąganiu'});
  assert.match(await row.locator('td').nth(1).innerText(),/—/);
  await mkdir(new URL('../test-results/',import.meta.url),{recursive:true});
  await page.screenshot({path:fileURLToPath(new URL('../test-results/compare-desktop.png',import.meta.url)),fullPage:true});
  const downloadEvent=page.waitForEvent('download');
  await page.evaluate(()=>exportJSON());
  const download=await downloadEvent;
  const stream=await download.createReadStream();let exported='';for await(const chunk of stream)exported+=chunk;
  assert.equal(JSON.parse(exported).filaments.length,162);
  await page.evaluate(()=>{go('docs');filterDocuments('brand','Fiberlogy');filterDocuments('type','SDS');filterDocuments('language','PL');});
  await page.locator('#documentSearch').fill('PA12');
  const pdfMatches=await page.evaluate(()=>matchingDocuments());
  assert.ok(pdfMatches.length>=3);
  assert.ok(pdfMatches.every(doc=>doc.type==='SDS'&&doc.language==='PL'));
  await page.locator('#documentSearch').fill('xxxxxxxx-no-document');
  assert.match(await page.locator('#docsPDF').innerText(),/Brak dokumentów/);
  await page.evaluate(()=>{documentFilter={q:'',brand:'Polymaker',type:'TDS',language:''};renderDocs();});
  assert.equal(await page.locator('#docsPDF .document-row').count(),23);
  await page.screenshot({path:fileURLToPath(new URL('../test-results/documents-desktop.png',import.meta.url)),fullPage:true});
  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'No mobile document page overflow');
  await page.screenshot({path:fileURLToPath(new URL('../test-results/documents-mobile.png',import.meta.url)),fullPage:true});
  await page.evaluate(()=>{openModal('fiberlogy-nylon-pa12-gf15','filaments');setModalTab('sources');});
  assert.ok(await page.locator('#overlay a').filter({hasText:'SDS · PL'}).count(),'Product links to its Polish SDS');
  await page.evaluate(()=>{go('filaments');filterChange('filaments','q','eSUN GF');openModal('esun-epa-gf','filaments');});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'No mobile page overflow');
  await page.screenshot({path:fileURLToPath(new URL('../test-results/material-mobile.png',import.meta.url)),fullPage:true});
  assert.deepEqual(errors,[],'No JavaScript errors');
  console.log('Browser passed: PL/EN, all new material tabs, PC-CF/nylon/GF search, filters, comparison, JSON export, mobile layout.');
}finally{await browser.close();await new Promise(r=>server.close(r));}
