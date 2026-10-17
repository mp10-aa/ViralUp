"use strict";
const SLOTS='viralup6-careers',ACTIVE='viralup6-active';
const fields=['followers','likes','money','rep','day','nickname'];
const improvements=[['tripod','📐 Tripé'],['lamp','💡 Ring light'],['mic','🎙️ Microfone'],['decor','🪴 Decoração'],['camera','📷 Câmera'],['lights','🌈 RGB'],['pc','🖥️ Computador'],['studio','🎬 Estúdio'],['cinema','🎥 Câmera de cinema']];
const homes=[['room','Quarto simples'],['bedroom','Quarto reformado'],['apartment','Apartamento moderno'],['mansion','Mansão do criador']];
const $=id=>document.getElementById(id);
const escapeHtml=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function slots(){try{const a=JSON.parse(localStorage.getItem(SLOTS)||'[]');return Array.isArray(a)?a.filter(x=>x&&x.id&&x.data):[]}catch{return []}}
let current=null;
function search(){const q=$('search').value.toLowerCase().trim().replace(/^@/,'');const all=slots().filter(x=>(x.nickname||x.data.nickname||'').toLowerCase().includes(q));$('results').innerHTML=all.length?all.map(x=>`<div class="result"><div><b>@${escapeHtml(x.nickname||x.data.nickname)}</b><small>${escapeHtml(x.name||'Criador')} · ${Number(x.data.followers||0).toLocaleString('pt-BR')} seguidores</small></div><button data-id="${escapeHtml(x.id)}">Editar carreira</button></div>`).join(''):'<p class="note">Nenhuma carreira encontrada neste navegador.</p>';$('results').querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>openCareer(b.dataset.id))}
function openCareer(id){const slot=slots().find(x=>x.id===id);if(!slot){$('editor').hidden=true;return}current=id;const d=slot.data;$('editor').hidden=false;$('selected').textContent='Editando @'+(d.nickname||slot.nickname);fields.forEach(k=>$(k).value=d[k]??(k==='nickname'?'':0));$('home').value=d.home||'room';$('improvements').innerHTML=improvements.map(([id,label])=>`<label><input type="checkbox" value="${id}" ${Array.isArray(d.inventory)&&d.inventory.includes(id)?'checked':''}> ${label}</label>`).join('');$('status').textContent='';}
function update(mutator){if(!current)return;const a=slots(),i=a.findIndex(x=>x.id===current);if(i<0){$('status').textContent='Carreira não encontrada.';return}const d=structuredClone(a[i].data);mutator(d);d.adminRevision=Math.max(Number(d.adminRevision)||0,Date.now())+1;a[i]={...a[i],nickname:d.nickname,name:d.realName,followers:d.followers,day:d.day,avatar:d.avatar,data:d};localStorage.setItem(SLOTS,JSON.stringify(a));try{const active=JSON.parse(localStorage.getItem(ACTIVE)||'null');if(active&&active.careerId===current)localStorage.setItem(ACTIVE,JSON.stringify(d))}catch{}$('status').textContent='✓ Alterações salvas no dispositivo.';search();}
function numericValue(id,{min=null,integer=false}={}){const v=Number($(id).value);if(!Number.isFinite(v))throw new Error('Valor inválido em '+id);let out=integer?Math.trunc(v):Math.round(v*100)/100;if(min!==null&&out<min)out=min;return out;}
$('search').oninput=search;
$('save').onclick=()=>{const values={};for(const k of fields){if(k==='nickname'){const v=$(k).value.trim().replace(/^@/,'');if(!/^[A-Za-z0-9_.]{3,22}$/.test(v)){alert('O @ precisa ter 3 a 22 caracteres: letras, números, pontos ou _.');return}values[k]=v}else{const v=Number($(k).value);if(!Number.isFinite(v)||v<0){alert('Confira o valor de '+k);return}values[k]=k==='money'?Math.round(v*100)/100:Math.floor(v)}}values.rep=Math.min(100,values.rep);values.day=Math.max(1,values.day);update(d=>{Object.assign(d,values);d.home=$('home').value;const chosen=[...$('improvements').querySelectorAll('input:checked')].map(x=>x.value);d.inventory=[...(d.inventory||[]).filter(x=>!improvements.some(e=>e[0]===x)),...chosen]});openCareer(current)};
$('reset').onclick=()=>openCareer(current);
$('sendAlert').onclick=()=>{const title=$('alertTitle').value.trim(),message=$('alertMessage').value.trim();if(!title||!message){alert('Informe título e mensagem.');return}update(d=>{d.adminAlerts??=[];d.adminAlerts.push({title,message,id:Date.now()})});$('alertTitle').value='';$('alertMessage').value='';$('status').textContent='✓ Alerta enviado para a carreira selecionada.'};
$('sendChoiceEvent').onclick=()=>{
 const title=$('eventTitle').value.trim(),story=$('eventStory').value.trim(),icon=$('eventIcon').value.trim()||'⚡';
 if(!title||!story){alert('Informe título e descrição do acontecimento.');return}
 const options=[];
 for(const n of [1,2,3]){
  const label=$("choice"+n+"Label").value.trim();
  const result=$("choice"+n+"Result").value.trim();
  if(!label&&!result&&n===3)continue;
  if(!label||!result){alert('Preencha completamente a escolha '+n+'.');return}
  try{
   options.push([
    label,
    numericValue('choice'+n+'Rep',{integer:true}),
    numericValue('choice'+n+'Followers',{integer:true}),
    numericValue('choice'+n+'Cash',{}),
    result
   ]);
  }catch(err){alert(err.message);return}
 }
 if(options.length<2){alert('Crie pelo menos 2 escolhas.');return}
 update(d=>{
  d.storyQueue??=[];d.notices??=[];
  const customEvent={id:'admin-'+Date.now(),icon,title,story,options};
  d.storyQueue.push({id:customEvent.id,key:Date.now()+Math.random(),trigger:'admin',customEvent});
  d.notices.unshift({id:Date.now()+Math.random(),icon,title:'Escolha enviada pelo ADM',message:title,kind:'story',target:'stories',day:d.day||1,read:false});
  d.notices=d.notices.slice(0,50);
 });
 ['eventIcon','eventTitle','eventStory','choice1Label','choice1Result','choice2Label','choice2Result','choice3Label','choice3Result'].forEach(id=>$(id).value='');
 ['choice1Rep','choice1Followers','choice1Cash','choice2Rep','choice2Followers','choice2Cash','choice3Rep','choice3Followers','choice3Cash'].forEach(id=>$(id).value=id.includes('Rep')?0:0);
 $('status').textContent='✓ Acontecimento com escolhas enviado.';
};
window.addEventListener('storage',e=>{if(e.key===SLOTS)search()});search();
