const STARS=Array.from({length:70},()=>`${(Math.random()*100).toFixed(1)}vw ${(Math.random()*100).toFixed(1)}vh 0 0 rgba(255,255,255,${(.35+Math.random()*.6).toFixed(2)})`).join(",");
function theme(){const ti=db.set.tset?db.set.theme:((window.SGA_CONFIG&&SGA_CONFIG.theme)||0),t=TH[ti]||TH[0],r=document.documentElement.style,L=t[6]=="light";
[["a",t[1]],["b",t[2]],["c",t[3]],["d",t[4]],["fg",L?"#26221e":"#f4f1ea"],["wr",L?"40,30,20":"255,255,255"],["br",L?"255,255,255":"0,0,0"],["bf",L?"#fff":"#111"],["stars",STARS]].forEach(p=>r.setProperty("--"+p[0],p[1]));
document.body.dataset.mode=L?"light":"dark";document.body.dataset.ly=curLy();document.body.dataset.cat=/Simple/.test(t[7])?"s":"e";document.body.dataset.anim=t[5]||"";
const m=document.querySelector("meta[name=theme-color]");if(m)m.setAttribute("content",t[1])}
function prog(id){let p=0,n=0;for(const k in db.att)if(k.endsWith("|"+id)){n++;p+=db.att[k]}
let h=[];db.hw.forEach(w=>{const s=w.sub?.[id];if(s&&s.score!=null)h.push(s.score/w.max*100)});
let t=[];db.tests.forEach(x=>{if(x.res?.[id]!=null)t.push(x.res[id]/x.qs.length*100)});
const av=a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length)+"%":"–";
const due=db.fees.filter(f=>f.sid==id&&!f.paid).reduce((s,f)=>s+f.amt,0);
return{att:n?Math.round(p/n*100)+"%":"–",hw:av(h),test:av(t),due}}
function myBatches(id){return db.batches.filter(b=>b.sids.includes(id))}
function login(){const id=cl(v("lid")),r=S.lr;let u=null;
if(r=="admin"&&id=="1888")u={id:"1888",name:"Admin"};
if(r=="teacher")u=db.teachers.find(t=>t.id==id);
if(r=="student")u=db.students.find(t=>t.id==id);
if(r=="parent")u=db.students.find(t=>t.id==id||t.pp==id);
if(!u){S.msg="Invalid ID";return R()}S.r=r;S.u=u;S.t=0;S.msg="";R()}
function R(){document.startViewTransition&&document.body.classList.contains("vt")?document.startViewTransition(()=>R0()):R0()}
function R0(){const a=document.getElementById("app");theme();try{S.r?localStorage.setItem("sga_s",JSON.stringify({r:S.r,id:S.u.id,t:S.t})):localStorage.removeItem("sga_s")}catch(x){}
if(!S.r){a.innerHTML=`<div style="text-align:center;margin:44px 0 6px"><h1 style="font-size:42px">✦ SG Astra</h1><p class="mut">Smart learning, beautifully connected</p></div><div class="card"><div class="row">${["student","teacher","parent","admin"].map(x=>`<button class="${S.lr==x?"":"g"}" onclick="S.lr='${x}';R()">${x[0].toUpperCase()+x.slice(1)}</button>`).join("")}</div><input id="lid" placeholder="${S.lr=="parent"?"Child’s Student ID or parent phone (no password)":"Your unique ID"}" onkeydown="if(event.key=='Enter')login()"><button style="width:100%" onclick="login()">Enter SG Astra</button><small style="color:#f87171">${S.msg}</small><p class="mut" style="text-align:center"><small>${ROLEHINT[S.lr]}</small></p></div>${labCard()}${pyCard()}${hubCard()}`;return}
const T=TABS[S.r][S.t];
a.innerHTML=`<div class="top"><button class="g mb" onclick="S.menu=!S.menu;R()">☰</button><h1>${TTL[S.r]||"✦ SG Astra"}</h1><div class="tr">${bell()}<span class="tag">${S.r}: ${e(S.u.name)}</span><button class="g" onclick="S.r=null;R()">Exit</button></div></div>${S.last&&S.r!="lang"&&S.r!="py"?`<small class="mut">👋 Last visit: ${e(S.last)}</small>`:""}${S.msg?`<div class="card">${S.msg}</div>`:""}<h3 class="pt">${IC[T]||""} ${T}</h3>${V(T)}${vnav()}${aiFab()}`;
document.querySelectorAll("[data-q]").forEach(el=>{try{new QRCode(el,{text:el.dataset.q,width:150,height:150})}catch(x){el.textContent=el.dataset.q}});if(window.afterR)afterR()}
