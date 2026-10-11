const DEFAULT_SHOPS = [
  {name:'كافتيريا النور', city:'الدندر', phone:'0125048800', menu:'شية, كبدة, سمك'},
  {name:'سلسبيل للعصائر', city:'الدندر', phone:'0125048800', menu:'منقة, جوافة, برتقال'}
];
(function(){
  let old=JSON.parse(localStorage.getItem('talabak_shops')||'[]');
  let seen={}; let clean=[];
  for(let s of old){ if(!seen[s.name]){ seen[s.name]=1; clean.push(s);} }
  if(clean.length!=old.length){ localStorage.setItem('talabak_shops', JSON.stringify(clean)); }
})();
let currentCity='الدندر';
function getMine(){return JSON.parse(localStorage.getItem('talabak_shops')||'[]')}
function getAll(){return [...DEFAULT_SHOPS,...getMine()]}
function setCity(c){currentCity=c;document.querySelectorAll('.city').forEach(e=>e.classList.remove('active'));document.getElementById(c=='الدندر'?'c-dandar':'c-kh').classList.add('active');render()}
function render(){
  let list=getAll().filter(s=>s.city.includes(currentCity));
  let html='';
  for(let s of list){
    let isMine=getMine().some(m=>m.name==s.name);
    let wa=s.phone?`https://wa.me/249${s.phone.replace(/^0/,'')}`:'#';
    html+=`<div class="card"><div><b>${s.name}</b><br><small>${s.menu} | ${s.city}</small></div><div style="display:flex;gap:6px"><a href="${wa}" target="_blank"><button class="view" style="background:#111;color:#fff;border:none;border-radius:12px;padding:9px 14px">طلب 🟢</button></a> ${isMine?`<button class="trash" onclick="deleteOne('${s.name}')" style="background:#ffeaea;color:#c00;border:none;border-radius:12px;padding:9px 12px">🗑️</button>`:''}</div></div>`;
  }
  document.getElementById('shops').innerHTML=html||'<p style="text-align:center">لا يوجد</p>';
}
function showReg(){document.getElementById('reg').style.display='block'}
function hideReg(){document.getElementById('reg').style.display='none'}
function showManage(){document.getElementById('manage').style.display='block';let mine=getMine();let h='';for(let s of mine){h+=`<div class="card"><div>${s.name}</div><button class="trash" onclick="deleteOne('${s.name}')">حذف</button></div>`}document.getElementById('manageList').innerHTML=h||'ما في';}
function hideManage(){document.getElementById('manage').style.display='none'}
function addShop(){let n=document.getElementById('s_name').value.trim();let p=document.getElementById('s_phone').value.trim();let c=document.getElementById('s_city').value;let m=document.getElementById('s_menu').value.trim();if(!n)return alert('اكتب الاسم');let all=getMine();if(all.some(x=>x.name==n))return alert('موجود!');all.push({name:n,phone:p||'0125048800',city:c,menu:m});localStorage.setItem('talabak_shops',JSON.stringify(all));alert('تم ✅');hideReg();render()}
function deleteOne(name){if(!confirm('تحذف '+name+' ؟'))return;let all=getMine().filter(x=>x.name!=name);localStorage.setItem('talabak_shops',JSON.stringify(all));render();showManage()}
function clearDup(){let old=getMine();let seen={};let clean=[];for(let s of old){if(!seen[s.name]){seen[s.name]=1;clean.push(s)}}localStorage.setItem('talabak_shops',JSON.stringify(clean));alert('تم مسح '+(old.length-clean.length)+' مكرر');render();showManage()}
render();
