import { readFile,writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec=promisify(execFile);
const root=new URL('../',import.meta.url);
const db=JSON.parse(await readFile(new URL('materiality-data.json',root),'utf8'));
const docs=db.documents.filter(d=>d.checkedOn);
const results=[];
for(let at=0;at<docs.length;at+=6) await Promise.all(docs.slice(at,at+6).map(async doc=>{
  try {
    const {stdout}=await exec('curl.exe',['-I','-L','--noproxy','*','--silent','--show-error','--max-time','25','-o','NUL','-w','%{http_code} %{content_type}',doc.url]);
    results.push({url:doc.url,status:stdout.trim(),pdf:/^200 application\/pdf/i.test(stdout)});
  } catch(e){results.push({url:doc.url,status:e.message.slice(0,140),pdf:false});}
}));
await writeFile(new URL('test-results/document-link-checks.json',root),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify({checked:docs.length,passed:results.filter(d=>d.pdf).length,other:results.filter(d=>!d.pdf)},null,2));
if(results.some(d=>!d.pdf))process.exitCode=1;
