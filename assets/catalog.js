// Render a manageable first batch while keeping filtering across the full database.
const catalogStep=48;
let catalogShown={filaments:catalogStep,resins:catalogStep};
function renderCatalog(kind){
  const list=filtered(kind),shown=Math.min(list.length,catalogShown[kind]);
  const grid=document.getElementById(kind==='filaments'?'filGrid':'resGrid');
  grid.innerHTML=list.length?list.slice(0,shown).map(d=>materialCard(d,kind)).join(''):
    `<div class="empty">${L('emptyResults')}</div>`;
  if(shown<list.length)grid.insertAdjacentHTML('beforeend',`<div style="grid-column:1/-1;display:flex;justify-content:center;margin:24px 0"><button class="btn outline" onclick="showMoreCatalog('${kind}')">${ptxt('Pokaż więcej','Show more')} · ${shown}/${list.length}</button></div>`);
  document.getElementById('result-'+kind).textContent=list.length+' '+L('results');
}
function showMoreCatalog(kind){catalogShown[kind]+=catalogStep;renderCatalog(kind)}
function filterChange(kind,key,value){
  filter[kind][key]=value;catalogShown[kind]=catalogStep;
  if(key!=='q')renderFilters(kind);
  renderCatalog(kind);
}
