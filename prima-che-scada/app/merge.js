/* Three-way entity merge. Missing entities represent deletions relative to base. */
(function(root){
 const canonical=v=>v===undefined?'undefined':JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.keys(x).sort().reduce((o,k)=>(o[k]=x[k],o),{}):x); const same=(a,b)=>canonical(a)===canonical(b);
 function mergeDocuments(base,local,remote,choices={}){
  const conflicts=[];const result={items:[],shopping:[],used:0};
  function choose(id,b,l,r,label){if(same(l,r))return l;if(same(l,b))return r;if(same(r,b))return l;const fingerprint=canonical([id,b,l,r]);if(choices[fingerprint]==='local')return l;if(choices[fingerprint]==='remote')return r;conflicts.push({id,label,local:l,remote:r,fingerprint});return l;}
  for(const list of ['items','shopping']){const b=new Map((base[list]||[]).map(i=>[i.id,i])),l=new Map(local[list].map(i=>[i.id,i])),r=new Map(remote[list].map(i=>[i.id,i]));for(const id of new Set([...b.keys(),...l.keys(),...r.keys()])){const v=choose(list+':'+id,b.get(id),l.get(id),r.get(id),(l.get(id)||r.get(id)||b.get(id)).name);if(v!==undefined)result[list].push(v);}}
  result.used=choose('used',base.used||0,local.used,remote.used,'Pezzi consumati');
  return {document:result,conflicts};
 }
 root.PCSMerge={mergeDocuments,same};if(typeof module!=='undefined')module.exports=root.PCSMerge;
})(typeof window!=='undefined'?window:globalThis);
