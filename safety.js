// Safety & privacy: AI-answer reporting, account-deletion requests, privacy card, and the admin Safety tab.
(()=>{
const PRIVACY_URL="https://moon09090.github.io/sg-astra-legal/privacy.html",DELETE_URL="https://moon09090.github.io/sg-astra-legal/delete-account.html";
const nat=()=>{try{const c=window.Capacitor,p=c&&c.Plugins&&c.Plugins.LineIde;return p&&p.openUrl&&c.isNativePlatform&&c.isNativePlatform()?p:null}catch(x){return null}};
function openLegal(k){const u=k=="privacy"?PRIVACY_URL:DELETE_URL,p=nat();if(p)p.openUrl({url:u}).catch(()=>window.open(u,"_blank"));else window.open(u,"_blank")}
function privCard(){if(!S.r)return"";const cloud=S.r=="student"||S.r=="teacher"||S.r=="parent";
 return`<div class="card privc"><h3>🔒 Privacy & account</h3><small class="mut">Your information is stored securely and is only visible to the people who need it: you, your teachers, and your institute admin.</small><div class="chips"><button class="g" onclick="openLegal('privacy')">Privacy policy</button>${cloud?`<button class="g" onclick="askDelete()">Delete my account</button>`:""}<button class="g" onclick="openLegal('delete')">How deletion works</button></div></div>`}
async function askDelete(){if(!S.u||!confirm("Ask your institute admin to delete your account and personal data? This cannot be undone once the admin approves."))return;
 try{await Sync.requestDeletion();S.msg="Request sent ✅ Your institute admin will review it and delete your data."}catch(x){S.msg="Couldn’t send the request: "+Sync.errText(x)}R()}
function reportAI(tool,text,src){const why=prompt("Report this AI answer. What is wrong with it? (optional)");if(why===null)return;
 const u=S.u;Sync.report({by:u?u.id:"guest",name:u?u.name:"Guest",role:S.r||"guest",tool:String(tool||"AI"),text:String(text||"").slice(0,1500),why:String(why||"").slice(0,300),d:new Date().toISOString(),src:src||"app"})
  .then(()=>{S.msg="Thank you — reported ✅ The institute admin will review this answer.";R()}).catch(x=>{S.msg="Couldn’t send the report: "+Sync.errText(x);R()})}
function aiReport(i){const m=(S.aih||[])[i];if(m)reportAI("AI helper",m.t,"helper")}
function safetyV(){const rp=db.reports||[],dr=db.delreq||[];
 const rcard=r=>`<div class="card"><b>⚑ ${e(r.tool||"AI")}</b> <small class="mut">· ${e(r.name||"")} (${e(r.role||"")}) · ${e((r.d||"").slice(0,10))}</small>${r.why?`<p><b>Reason:</b> ${e(r.why)}</p>`:""}<pre class="term" style="max-height:140px;overflow:auto;white-space:pre-wrap">${e(r.text||"")}</pre><button class="g" onclick="repDismiss('${e(r._k)}')">Dismiss</button></div>`;
 const dcard=r=>`<div class="card"><b>🗑️ ${e(r.name||r.by)}</b> <small class="mut">· ${e(r.role||"")} · ${e(r.by)} · ${e((r.d||"").slice(0,10))}</small><div class="chips"><button onclick="eraseUser('${e(r.by)}')">Erase data &amp; remove login</button><button class="g" onclick="delDismiss('${e(r._k)}')">Dismiss</button></div></div>`;
 return`<div class="card"><h3>🛡️ Safety centre</h3><small class="mut">Reports and privacy requests from students, teachers and parents arrive here live.</small></div>
 <div class="card"><h3>Account deletion requests · ${dr.length}</h3>${dr.map(dcard).join("")||"<small class='mut'>No requests.</small>"}</div>
 <div class="card"><h3>Reported AI answers · ${rp.length}</h3>${rp.map(rcard).join("")||"<small class='mut'>No reports. Students can report any AI answer with the ⚑ Report button.</small>"}</div>`}
function repDismiss(k){db.reports=(db.reports||[]).filter(r=>r._k!=k);sv();R()}
function delDismiss(k){db.delreq=(db.delreq||[]).filter(r=>r._k!=k);sv();R()}
async function eraseUser(id){if(!confirm("Permanently erase "+id+"’s account and personal data (doubts, planner, history, marks, attendance)? Fee records are kept for accounts."))return;
 const stu=db.students.some(s=>s.id==id),tea=db.teachers.some(t=>t.id==id);
 try{if(stu){await Sync.revoke("student",id);await Sync.revoke("parent",id)}else if(tea)await Sync.revoke("teacher",id)}catch(x){S.msg="Couldn’t remove the login: "+Sync.errText(x);return R()}
 db.students=db.students.filter(x=>x.id!=id);db.teachers=db.teachers.filter(x=>x.id!=id);
 db.doubts=db.doubts.filter(d=>d.sid!=id);db.todo=db.todo.filter(t=>t.u!=id);db.log=db.log.filter(l=>l.id!=id);db.refs=db.refs.filter(r=>r.by!=id);
 Object.keys(db.att||{}).forEach(k=>{if(k.split("|")[2]==id)delete db.att[k]});
 db.hw.forEach(h=>{if(h.sub)delete h.sub[id]});db.tests.forEach(t=>{if(t.res)delete t.res[id]});db.batches.forEach(b=>{b.sids=(b.sids||[]).filter(s=>s!=id)});
 db.delreq=(db.delreq||[]).filter(r=>r.by!=id);sv();S.msg="Erased "+id+" ✅";R()}
Object.assign(window,{openLegal,privCard,askDelete,reportAI,aiReport,safetyV,repDismiss,delDismiss,eraseUser});
})();
