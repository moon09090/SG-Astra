// Realtime cloud layer (Firebase). `db` stays the in-memory model the whole app uses;
// this file mirrors every change to Firestore and applies other phones' changes live.
const Sync=(()=>{
const ADMIN="sgastra1888@gmail.com";
const KEYF={teachers:"id",students:"id",batches:"id",hw:"id",tests:"id",lib:"id",tt:"id",ev:"id",todo:"id",ann:0,fees:0,doubts:0,refs:0,log:0,reports:0,delreq:0,sos:0};
const SPLIT={students:["phone","pp","s"],teachers:["phone","t"]};
const SHARED=["teachers","students","batches","hw","tests","lib","tt","ev","ann"];
let setExists=false,on=false,busy=false,unsubs=[],last={},lastC={},lastAtt={},lastSet={},cont={},oc=0,rt=0,booted=false;
const F=()=>window.FB;
const clone=o=>o===undefined?undefined:JSON.parse(JSON.stringify(o));
const isO=x=>x&&typeof x=="object"&&!Array.isArray(x);
const gen=()=>Math.random().toString(36).slice(2,10)+Date.now().toString(36);
const nextO=()=>Date.now()*1000+(oc++%1000);
let pend=0,lastErr='';
const track=p=>{pend++;ui();return p.then(()=>{pend--;if(!pend)lastErr='';ui()},e=>{pend--;lastErr=(e&&e.code)||'error';ui();err(e)})};
const pillState=()=>lastErr?['bad','⚠ Not saved']:pend>0?['wait','⏳ Saving…']:['ok','☁ Saved'];
function ui(){try{const[c,x]=pillState();document.querySelectorAll('.syn').forEach(n=>{n.className='tag syn '+c;n.textContent=x})}catch(e){}}
function pill(){if(!on)return'';const[c,x]=pillState();return`<span class="tag syn ${c}" onclick="Sync.info()">${x}</span>`}
function info(){S.msg=lastErr=='permission-denied'?'Firebase is blocking this change. In the Firebase console open Firestore Database → Rules, paste the rules from <b>firestore.rules</b> and tap <b>Publish</b>.':lastErr?'The change could not be saved ('+lastErr+'). It will be retried when the connection is back.':pend>0?'Saving your changes to the cloud…':'Everything is saved and shared with every phone.';R()}
const err=e=>{console.error(e);const c=((e&&e.code)||"").replace("firestore/","").replace("auth/","");S.msg=c=="permission-denied"?"⚠ Firebase blocked that change. Publish the rules in Firebase (Firestore → Rules) — tap the red Not saved tag for help.":"⚠ Couldn’t save that change"+(c?" ("+c+")":"");try{R()}catch(x){}};

// field-level diff -> [FieldPath, value|deleteField] pairs (so two phones editing different fields never overwrite each other)
function diff(a,b,path,out){
 for(const k of Object.keys(b)){const p=path.concat(k);
  if(isO(a[k])&&isO(b[k])&&path.length<3)diff(a[k],b[k],p,out);
  else if(JSON.stringify(a[k])!==JSON.stringify(b[k]))out.push([p,b[k]])}
 for(const k of Object.keys(a))if(!(k in b))out.push([path.concat(k),F().deleteField()]);
 return out}
function upd(ref,a,b){const d=diff(a,b,[],[]);if(!d.length)return;
 const args=[];d.forEach(([p,v])=>{args.push(new (F().FieldPath)(...p),v)});
 track(F().updateDoc(ref,...args))}

function pushColl(c){
 const kf=KEYF[c],L=last[c]||(last[c]=new Map()),sp=SPLIT[c],LC=lastC[c]||(lastC[c]=new Map()),seen=new Set();
 (db[c]||[]).forEach(it=>{
  let k=kf?it[kf]:it._k;if(!k){k=it._k=gen()}
  if(it._o==null)it._o=nextO();
  seen.add(k);
  const cur=clone(it),contact={};
  if(sp){sp.slice(0,-1).forEach(f=>{contact[f]=cur[f]||"";delete cur[f]});}
  const prev=L.get(k);
  if(!prev)track(F().setDoc(F().doc(c,String(k)),cur));else upd(F().doc(c,String(k)),prev,cur);
  L.set(k,cur);
  if(sp&&S.r=="admin"){const ck=sp[sp.length-1]+"_"+k,pc=LC.get(ck);
   if(!pc||JSON.stringify(pc)!==JSON.stringify(contact)){track(F().setDoc(F().doc("contacts",ck),contact));LC.set(ck,contact)}}
 });
 for(const k of [...L.keys()])if(!seen.has(k)){track(F().deleteDoc(F().doc(c,String(k))));L.delete(k);
  if(sp){const ck=sp[sp.length-1]+"_"+k;F().deleteDoc(F().doc("contacts",ck)).catch(()=>{});LC.delete(ck)}}
}
const attId=k=>encodeURIComponent(k).replace(/%/g,"~");
function pushAtt(){
 for(const k of Object.keys(db.att||{}))if(lastAtt[k]!==db.att[k]){track(F().setDoc(F().doc("att",attId(k)),{k,v:db.att[k]}));lastAtt[k]=db.att[k]}
 for(const k of Object.keys(lastAtt))if(!(k in (db.att||{}))){track(F().deleteDoc(F().doc("att",attId(k))));delete lastAtt[k]}}
function pushSet(){if(S.r!="admin")return;const cur=clone(db.set);if(JSON.stringify(cur)==JSON.stringify(lastSet))return;
 const ref=F().doc("meta","settings");
 if(!setExists){track(F().setDoc(ref,cur,{merge:true}));setExists=true}else upd(ref,lastSet,cur);
 lastSet=cur}
function flush(){if(!on||busy)return;
 try{Object.keys(KEYF).forEach(pushColl);pushAtt();pushSet()}catch(e){err(e)}}

// ---- incoming
function mergeContacts(){const c={students:"s",teachers:"t"};
 for(const n in c)(db[n]||[]).forEach(it=>{const ck=c[n]+"_"+it.id,x=cont[ck];if(x){it.phone=x.phone||"";if(n=="students")it.pp=x.pp||"";(lastC[n]||(lastC[n]=new Map())).set(ck,n=="students"?{phone:it.phone,pp:it.pp}:{phone:it.phone})}})}
function applyColl(c,snap){const items=[],L=new Map();
 snap.forEach(d=>{const o=d.data();items.push(o);const cur=clone(o);if(SPLIT[c])SPLIT[c].slice(0,-1).forEach(f=>delete cur[f]);L.set(d.id,cur)});
 items.sort((a,b)=>(a._o||0)-(b._o||0));db[c]=items;last[c]=L;mergeContacts()}
function applyAtt(snap){const a={};snap.forEach(d=>{const o=d.data();a[o.k]=o.v});db.att=a;lastAtt=Object.assign({},a)}
function softRender(){clearTimeout(rt);rt=setTimeout(()=>{if(!S.r||S.r=="lang"||S.r=="py"||S.r=="hub")return;
 const el=document.activeElement,vals={},rad=[];
 document.querySelectorAll("#app input,#app textarea,#app select").forEach(x=>{
  if(x.type=="radio"){if(x.checked)rad.push([x.name,x.value])}else if(x.type=="checkbox"){if(x.id)vals[x.id]=[1,x.checked]}else if(x.id&&x.type!="file")vals[x.id]=[0,x.value]});
 const fid=el&&el.id,ss=el&&el.selectionStart,se=el&&el.selectionEnd,sy=window.scrollY;
 R();
 for(const id in vals){const x=document.getElementById(id);if(!x)continue;if(vals[id][0])x.checked=vals[id][1];else if(x.value!==vals[id][1])x.value=vals[id][1]}
 rad.forEach(([n,v])=>{const x=document.querySelector('#app input[name="'+n+'"][value="'+v+'"]');if(x)x.checked=true});
 if(fid){const x=document.getElementById(fid);if(x){x.focus();try{x.setSelectionRange(ss,se)}catch(e){}}}
 window.scrollTo(0,sy)},150)}

function listen(role,pid){
 const q=(n,f,v)=>F().query(F().coll(n),F().where(f,"==",v)),staff=role=="admin"||role=="teacher",P=[];
 const add=(src,fn)=>P.push(new Promise(res=>{let first=1;
  unsubs.push(F().onSnapshot(src,s=>{fn(s);if(first){first=0;res()}else if(!s.metadata.hasPendingWrites)softRender()},e=>{console.error(e);if(first){first=0;res()}}))}));
 SHARED.forEach(c=>add(F().coll(c),s=>applyColl(c,s)));
 add(F().coll("att"),applyAtt);
 add(F().doc("meta","settings"),s=>{setExists=s.exists();if(setExists)Object.assign(db.set,s.data());lastSet=clone(db.set)});
 if(staff){add(F().coll("sos"),s=>applyColl("sos",s));add(F().coll("doubts"),s=>applyColl("doubts",s));
  add(F().coll("contacts"),s=>{cont={};s.forEach(d=>{cont[d.id]=d.data()});mergeContacts()})}
 else add(q("doubts","sid",pid),s=>applyColl("doubts",s));
 if(role=="admin"){add(F().coll("fees"),s=>applyColl("fees",s));add(F().coll("refs"),s=>applyColl("refs",s));add(F().coll("log"),s=>applyColl("log",s));add(F().coll("reports"),s=>applyColl("reports",s));add(F().coll("delreq"),s=>applyColl("delreq",s))}
 else{add(q("log","id",pid),s=>applyColl("log",s));
  if(role=="student"||role=="parent")add(q("fees","sid",pid),s=>applyColl("fees",s));
  if(role=="student")add(q("sos","sid",pid),s=>applyColl("sos",s));
  if(role=="student"){add(q("todo","u",pid),s=>applyColl("todo",s));add(q("refs","by",pid),s=>applyColl("refs",s))}}
 return Promise.race([Promise.all(P),new Promise(r=>setTimeout(r,12000))])}

function reset(){unsubs.forEach(u=>{try{u()}catch(e){}});unsubs=[];last={};lastC={};lastAtt={};lastSet={};cont={};
 Object.keys(KEYF).forEach(c=>{db[c]=[]});db.att={};setExists=false}
async function enter(t){
 busy=true;
 try{const u=F().auth.currentUser,email=(u.email||"").toLowerCase();let role,pid;
  if(email==ADMIN){role="admin";pid="1888"}
  else{const r=await F().getDoc(F().doc("roster",email));if(!r.exists())throw{code:"no-access"};role=r.data().role;pid=r.data().pid}
  reset();on=true;await listen(role,pid);
  let prof;
  if(role=="admin")prof={id:"1888",name:"Admin"};
  else if(role=="teacher")prof=db.teachers.find(x=>x.id==pid);
  else prof=db.students.find(x=>x.id==pid);
  if(!prof)throw{code:"no-profile"};
  S.r=role;S.u=prof;S.t=Math.min(t||0,TABS[role].length-1);S.msg="";
 }catch(e){busy=false;out();throw e}
 busy=false;R();try{window.pushInit&&pushInit()}catch(x){}}
function out(){on=false;try{window.pushReset&&pushReset()}catch(x){}reset();try{F().signOut()}catch(e){}}

async function login(role,id,pin){
 if(!window.FB)throw{code:"fb-missing"};
 busy=true;let email;
 try{if(role=="admin")email=ADMIN;
  else{const d=await F().getDoc(F().doc("loginmap",({student:"s",teacher:"t",parent:"p"})[role]+"_"+id));if(!d.exists())throw{code:"auth/invalid-credential"};email=d.data().e}
  await F().signIn(email,pin)}catch(e){busy=false;throw e}
 busy=false;await enter(0)}

async function createAccount(role,id,pin){
 const L=({student:"s",teacher:"t",parent:"p"})[role],key=L+"_"+id;
 const rnd=Array.from(crypto.getRandomValues(new Uint8Array(6))).map(b=>(b%36).toString(36)).join("");
 const email=(L+"."+id+"."+rnd+"@sgastra.app").toLowerCase();
 const old=await F().getDoc(F().doc("loginmap",key));
 await F().createUser(email,pin);
 await F().setDoc(F().doc("roster",email),{role,pid:id});
 await F().setDoc(F().doc("loginmap",key),{e:email});
 if(old.exists())F().deleteDoc(F().doc("roster",old.data().e)).catch(()=>{})}
async function revoke(role,id){const key=({student:"s",teacher:"t",parent:"p"})[role]+"_"+id;
 const d=await F().getDoc(F().doc("loginmap",key));if(!d.exists())return;
 await F().deleteDoc(F().doc("roster",d.data().e));await F().deleteDoc(F().doc("loginmap",key))}

async function authInfo(){const u=F().auth.currentUser;if(!u)throw{code:"no-access"};return{token:await u.getIdToken(),refresh:u.refreshToken,apiKey:F().apiKey,project:F().projectId}}
async function saveToken(o){if(!on)return;await F().setDoc(F().doc("tokens",String(o.tok)),{tok:String(o.tok),pid:String(o.pid),role:String(o.role),t:Date.now()})}
async function report(r){if(!window.FB)throw{code:"fb-missing"};
 if(!F().auth.currentUser)await F().signInAnon();
 const k=gen();r._k=k;r._o=nextO();await F().setDoc(F().doc("reports",k),clone(r))}
async function requestDeletion(){if(!on||!S.u)throw{code:"no-access"};
 const k=gen();await F().setDoc(F().doc("delreq",k),{_k:k,_o:nextO(),by:S.u.id,name:S.u.name||"",role:S.r,d:new Date().toISOString()})}
const TXT={"fb-missing":"The Firebase part is missing from this app build. Install the APK from the ui-upgrade run (Artifacts) and check that the build step “Add Line IDE” finished.","auth/operation-not-allowed":"Email/Password sign-in is switched off in Firebase (Authentication → Sign-in method).","auth/invalid-api-key":"Firebase rejected the app’s API key.","auth/network-request-failed":"No internet connection (or Firebase is blocked on this network)","auth/invalid-credential":"Wrong ID or PIN","auth/wrong-password":"Wrong ID or PIN","auth/user-not-found":"Wrong ID or PIN","auth/too-many-requests":"Too many tries — wait a few minutes","auth/network-request-failed":"No internet connection","auth/weak-password":"PIN must be at least 6 characters","auth/email-already-in-use":"That account already exists — try again","no-access":"This account has no access","no-profile":"Your profile was removed — ask the admin","permission-denied":"Not allowed"};
const errText=e=>TXT[e&&e.code]||("Something went wrong: "+((e&&(e.code||e.message))||String(e)).toString().slice(0,140));

function boot(){if(booted||!window.FB)return;booted=true;
 F().onAuth(u=>{if(u&&!u.isAnonymous&&!S.r&&!on&&!busy){let t=0;try{const m=JSON.parse(localStorage.getItem("sga_s")||"null");if(m)t=m.t||0}catch(e){}
  enter(t).catch(()=>{})}})}
setTimeout(boot,0);
return{flush,pill,info,saveToken,authInfo,report,requestDeletion,login,out,createAccount,revoke,errText,boot,active:()=>on&&!busy,isOn:()=>on}})();
window.Sync=Sync;
