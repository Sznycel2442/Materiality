let documentFilter={q:'',brand:'',type:'',language:''};
function documentTypeLabel(type){return ({TDS:ptxt('TDS · karta techniczna','TDS · technical data'),SDS:ptxt('SDS · karta charakterystyki','SDS · safety data'),manual:ptxt('Katalog producenta','Manufacturer manual'),declaration:ptxt('Deklaracja / certyfikat','Declaration / certificate'),LINK:ptxt('Strona dokumentacji','Documentation page')})[type]||type}
function documentProducts(doc){return doc.productIds.map(id=>F.find(d=>d.id===id)).filter(Boolean)}
function filterDocuments(key,value){documentFilter[key]=value;renderDocumentRows()}
function matchingDocuments(){
  const tokens=normalizeSearch(documentFilter.q).split(' ').filter(Boolean);
  return DB.documents.filter(doc=>{
    const products=documentProducts(doc);
    const text=products.map(materialSearchText).join(' ');
    return (!documentFilter.brand||products.some(d=>d.brand===documentFilter.brand))&&
      (!documentFilter.type||doc.type===documentFilter.type)&&
      (!documentFilter.language||doc.language.split('/').includes(documentFilter.language))&&
      tokens.every(t=>text.split(' ').some(word=>word.startsWith(t)));
  });
}
function renderDocumentRows(){
  const docs=matchingDocuments();
  document.getElementById('pdfCount').textContent=docs.filter(d=>d.type!=='LINK').length+' PDF';
  document.getElementById('docsPDF').innerHTML=docs.map(doc=>{
    const products=documentProducts(doc), brands=[...new Set(products.map(d=>d.brand))].join(', ');
    const names=products.length>3?ptxt('Katalog · '+products.length+' produktów','Manual · '+products.length+' products'):products.map(d=>d.name).join(', ');
    const families=[...new Set(products.map(d=>d.base))].join(', ');
    return `<div class="document-row"><div><strong>${esc(names)}</strong><span class="muted">${esc(brands)} · ${esc(families)}</span></div><div class="muted">${esc(documentTypeLabel(doc.type))} · ${esc(doc.language)}</div><a href="${esc(doc.url)}" rel="noopener noreferrer" target="_blank" class="pdf" aria-label="${esc(names+' · '+doc.type+' '+doc.language)}">${doc.type==='LINK'?ptxt('Otwórz','Open'):doc.type+' · '+esc(doc.language)} ${faIcon('external-link-alt')}</a></div>`;
  }).join('')||`<div class="info-band">${ptxt('Brak dokumentów dla wybranych filtrów.','No documents match these filters.')}</div>`;
}
function renderDocs(){
  let controls=document.getElementById('documentFilters');
  if(!controls){controls=document.createElement('div');controls.id='documentFilters';controls.className='filter-top';controls.style.cssText='margin:16px 0;display:flex;flex-wrap:wrap;gap:10px';document.getElementById('docsPDF').before(controls)}
  const option=(value,label,current)=>`<option value="${esc(value)}" ${current===value?'selected':''}>${esc(label)}</option>`;
  const brands=[...new Set(DB.documents.flatMap(doc=>documentProducts(doc).map(d=>d.brand)))].sort();
  controls.innerHTML=`<input id="documentSearch" class="control" style="width:auto;flex:2 1 250px;min-width:150px" aria-label="${ptxt('Szukaj dokumentów','Search documents')}" placeholder="${ptxt('Szukaj PDF: PA12, PC-CF, nylon…','Search PDFs: PA12, PC-CF, nylon…')}" value="${esc(documentFilter.q)}" oninput="filterDocuments('q',this.value)"><select class="control" style="width:auto;flex:1 1 160px;min-width:0" aria-label="${ptxt('Producent dokumentu','Document manufacturer')}" onchange="filterDocuments('brand',this.value)">${option('',L('allBrands'),documentFilter.brand)}${brands.map(b=>option(b,b,documentFilter.brand)).join('')}</select><select class="control" style="width:auto;flex:1 1 200px;min-width:0" aria-label="${ptxt('Rodzaj dokumentu','Document type')}" onchange="filterDocuments('type',this.value)">${option('',ptxt('Wszystkie dokumenty','All document types'),documentFilter.type)}${['TDS','SDS','manual','declaration','LINK'].map(t=>option(t,documentTypeLabel(t),documentFilter.type)).join('')}</select><select class="control" style="width:auto;flex:1 1 150px;min-width:0" aria-label="${ptxt('Język dokumentu','Document language')}" onchange="filterDocuments('language',this.value)">${option('',ptxt('Wszystkie języki','All languages'),documentFilter.language)}${['PL','EN','DE','FR'].map(l=>option(l,l,documentFilter.language)).join('')}</select>`;
  renderDocumentRows();
  const sources={...DB.sources,'Prusa Material Guide':'https://help.prusa3d.com/filament-material-guide','Creality CFS':'https://wiki.creality.com/en/cfs/cfs-filament-compatibility','Anycubic ACE Pro':'https://wiki.anycubic.com/en/fdm-3d-printer/kobra-3-combo/ace-pro-notes','SUNLU Filament Guide':'https://www.sunlu.com/wiki/filament-usage-guide'};
  document.getElementById('sourcesGrid').innerHTML=Object.entries(sources).map(([brand,url])=>`<a class="source-tile" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(brand)} <span>${faIcon('external-link-alt')}</span></a>`).join('');
}
function productDocumentLinks(d){return (d.documents||[]).filter(doc=>doc.url!==d.tds).map(doc=>`<a class="btn outline small" target="_blank" rel="noopener noreferrer" href="${esc(doc.url)}">${esc(doc.type+' · '+doc.language)} ${faIcon('external-link-alt')}</a>`).join('')}
