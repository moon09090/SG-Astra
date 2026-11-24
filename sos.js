// SOS emergency safety: student hold-to-send button + live sharing, staff banner + Emergency Feed + live map.
(()=>{
const CATS=[["Medical","🩺","#ef4444"],["Safety Threat","⚠️","#f97316"],["Stranded","🧭","#eab308"],["Transit Trouble","🚌","#3b82f6"]];
const plug=()=>{try{const c=window.Capacitor,p=c&&c.Plugins&&c.Plugins.LineIde;return p&&c.isNativePlatform&&c.isNativePlatform()?p:null}catch(x){return null}};
const isStaff=()=>S.r=="teacher"||S.r=="admin";
const act=()=>(db.sos||[]).filter(x=>x.status=="active");
const mine=()=>S.u&&S.r=="student"?act().find(x=>x.sid==S.u.id):null;
const lastMine=()=>S.u&&S.r=="student"?(db.sos||[]).filter(x=>x.sid==S.u.id).sort((a,b)=>b.t0-a.t0)[0]:null;
const ago=t=>{if(!t)return"–";const s=Math.max(0,Math.round((Date.now()-t)/1000));return s<60?s+"s ago":s<3600?Math.round(s/60)+" min ago":Math.round(s/3600)+" h ago"};
const dur=t=>{const s=Math.max(0,Math.round((Date.now()-t)/1000)),m=Math.floor(s/60);return m+"m "+String(s%60).padStart(2,"0")+"s"};
const byId=id=>(db.sos||[]).find(x=>x._k==id);
let sharing=null,watchId=null,lastWeb=0;

// ---------- mini map from OpenStreetMap tiles (no keys, no downloads)
function tileXY(lat,lng,z){const n=2**z,r=lat*Math.PI/180;return[(lng+180)/360*n,(1-Math.log(Math.tan(r)+1/Math.cos(r))/Math.PI)/2*n]}
function miniMap(o){const w=o.w||300,h=o.h||230,z=o.z||16;
 if(o.lat==null||o.lng==null)return`<div class="mm nofix" style="width:${w}px;height:${h}px;max-width:100%"><div>📡 Waiting for the first GPS fix…</div></div>`;
 const[tx,ty]=tileXY(o.lat,o.lng,z),px=tx*256,py=ty*256,x0=px-w/2,y0=py-h/2,N=2**z,mpp=156543.03392*Math.cos(o.lat*Math.PI/180)/N;let s="";
 for(let X=Math.floor(x0/256);X<=Math.floor((x0+w)/256);X++)for(let Y=Math.floor(y0/256);Y<=Math.floor((y0+h)/256);Y++){if(Y<0||Y>=N)continue;s+=`<img class="mt" alt="" src="https://tile.openstreetmap.org/${z}/${((X%N)+N)%N}/${Y}.png" style="left:${Math.round(X*256-x0)}px;top:${Math.round(Y*256-y0)}px">`}
 const at=(la,ln)=>{const[a,b]=tileXY(la,ln,z);return[a*256-x0,b*256-y0]};
 (o.circles||[]).concat(o.acc?[{lat:o.lat,lng:o.lng,r:Math.min(o.acc,400),color:"#38bdf8"}]:[]).forEach(c=>{const[a,b]=at(c.lat,c.lng),r=c.r/mpp;s+=`<i class="mc" style="left:${a-r}px;top:${b-r}px;width:${2*r}px;height:${2*r}px;border-color:${c.color};background:${c.color}22"></i>`});
 (o.markers||[{lat:o.lat,lng:o.lng,label:"",color:"#ef4444"}]).forEach(m=>{const[a,b]=at(m.lat,m.lng);s+=`<b class="mp" style="left:${a}px;top:${b}px;--mc:${m.color||"#ef4444"}"><span>${e(m.label||"")}</span></b>`});
 return`<div class="mm" style="width:${w}px;height:${h}px;max-width:100%">${s}<small class="mattr">© OpenStreetMap</small></div>`}

// ---------- device helpers
async function battery(){const p=plug();try{if(p&&p.battery){const r=await p.battery();return r.level}if(navigator.getBattery){const b=await navigator.getBattery();return Math.round(b.level*100)}}catch(x){}return-1}
const getPos=()=>new Promise(res=>{if(!navigator.geolocation)return res(null);navigator.geolocation.getCurrentPosition(p=>res(p),()=>res(null),{enableHighAccuracy:true,timeout:9000,maximumAge:3000})});
function setFix(id,pos){const it=byId(id);if(!it||it.status!="active")return;it.lat=+pos.coords.latitude.toFixed(6);it.lng=+pos.coords.longitude.toFixed(6);it.acc=Math.round(pos.coords.accuracy);it.ut=Date.now();sv()}
function webWatch(id){if(watchId!=null||!navigator.geolocation)return;
 watchId=navigator.geolocation.watchPosition(p=>{if(Date.now()-lastWeb<4500)return;lastWeb=Date.now();setFix(id,p);R()},()=>{},{enableHighAccuracy:true,maximumAge:2000,timeout:20000})}
async function startSharing(id){sharing=id;const p=plug();let ok=false;
 if(p&&p.startSos){try{const a=await Sync.authInfo(),r=await p.startSos({id,token:a.token,refresh:a.refresh,apiKey:a.apiKey,project:a.project,everyMs:5000});ok=!r||r.ok!==false}catch(x){ok=false}}
 if(!ok)webWatch(id);try{if(navigator.wakeLock)navigator.wakeLock.request("screen").catch(()=>{})}catch(x){}}
function stopSharing(){sharing=null;const p=plug();try{if(p&&p.stopSos)p.stopSos()}catch(x){}if(watchId!=null){try{navigator.geolocation.clearWatch(watchId)}catch(x){}watchId=null}}

// ---------- student: hold-to-send
const hold={t0:0,raf:0,el:null};
function sosHoldStart(ev){if(ev&&ev.preventDefault)ev.preventDefault();const b=document.getElementById("soshold");if(!b||hold.t0)return;hold.t0=performance.now();hold.el=b;b.classList.add("holding");
 const step=()=>{if(!hold.t0)return;if(!b.isConnected){hold.t0=0;return}const p=Math.min(1,(performance.now()-hold.t0)/3000);b.style.setProperty("--p",(p*100)+"%");
  const l=document.getElementById("soshl");if(l)l.innerHTML=p>=1?"Sending…":"Hold<br>"+Math.ceil(3-p*3)+"s";
  if(p>=1){hold.t0=0;b.classList.remove("holding");sosTrigger();return}hold.raf=requestAnimationFrame(step)};hold.raf=requestAnimationFrame(step)}
function sosHoldEnd(){if(!hold.t0)return;hold.t0=0;cancelAnimationFrame(hold.raf);const b=hold.el;if(b){b.classList.remove("holding");b.style.setProperty("--p","0%")}const l=document.getElementById("soshl");if(l)l.innerHTML="SOS<br>Help"}
async function sosTrigger(){
 if(S.r!="student"||!S.u||!window.Sync||!Sync.isOn()){S.msg="SOS needs you to be signed in with an internet connection. Call 112 now if this is urgent.";return R()}
 if(mine()){S.sosHide=0;return R()}
 const tids=[...new Set((db.batches||[]).filter(b=>(b.sids||[]).includes(S.u.id)&&b.tid).map(b=>b.tid))];
 const d={sid:S.u.id,name:S.u.name||S.u.id,cls:S.u.cls||"",cat:"Not specified",status:"active",t0:Date.now(),ut:Date.now(),lat:null,lng:null,acc:null,bat:null,safe:false,tids};
 db.sos.push(d);sv();S.sosHide=0;R();   // sv() assigns the id and sends it to the cloud immediately
 const id=d._k;try{if(navigator.vibrate)navigator.vibrate([80,60,80])}catch(x){}
 const p=plug();if(p&&p.requestLocation){try{const r=await p.requestLocation();S.sosPerm=!!(r&&r.granted)}catch(x){}}
 battery().then(b=>{const it=byId(id);if(it&&b>=0){it.bat=b;sv();R()}});
 getPos().then(pos=>{if(pos){setFix(id,pos);R()}});
 startSharing(id)}
function sosCat(c){const it=mine();if(!it)return;it.cat=c;sv();R()}
function sosSafe(){const it=mine();if(!it||!confirm("Tell your teachers you are safe now? Location sharing will stop."))return;it.safe=true;sv();stopSharing();R()}
async function sosResume(){const it=mine();if(it)await startSharing(it._k);R()}
async function sosEnable(){const p=plug();if(!p)return;try{let r=await p.requestLocation();if(p.requestNotifications)r=await p.requestNotifications();S.sosPerm=!!(r&&r.granted)}catch(x){}try{const s=await p.locationState();S.sosPerm=!!s.granted}catch(x){}R()}

function sosCardTop(){if(S.r!="student")return"";const m=mine(),p=plug();
 if(p&&S.sosPerm===undefined){S.sosPerm=null;p.locationState().then(r=>{S.sosPerm=!!r.granted;R()}).catch(()=>{S.sosPerm=true})}
 if(m)return`<div class="sosr" onclick="S.sosHide=0;R()">🚨 SOS is active — tap to open</div>`;
 return`<div class="card sosc"><div class="sosrow"><div><b>Emergency?</b><small class="mut">Press and hold the red button for 3 seconds to alert your teachers with your location.</small></div><button class="soshold" id="soshold" onpointerdown="sosHoldStart(event)" onpointerup="sosHoldEnd()" onpointercancel="sosHoldEnd()" onpointerleave="sosHoldEnd()" oncontextmenu="return false"><span id="soshl">SOS<br>Help</span></button></div>${p&&S.sosPerm===false?`<button class="g" style="margin-top:8px" onclick="sosEnable()">📍 Allow location &amp; notifications for SOS</button>`:""}</div>`}

function sosOverlay(){if(S.r!="student")return"";const m=mine(),l=lastMine();
 if(m&&!S.sosHide){const fix=m.lat!=null;
  return`<div class="sosov"><div class="sosin"><div class="sospulse">🚨</div><h2>SOS sent</h2><p>Your teachers have been alerted. Stay where you are if it is safe.</p>
  <div class="sosst"><div>✅ Teachers alerted <small class="mut">(live)</small></div><div>${fix?`✅ Sharing live location ${m.acc?"±"+m.acc+" m":""} <small class="mut" data-ut="${m.ut}">${ago(m.ut)}</small>`:"⏳ Getting your location…"}</div><div>🔋 Battery ${m.bat>=0&&m.bat!=null?m.bat+"%":"–"}</div>${m.safe?"<div>🙂 You told them you are safe</div>":""}</div>
  <b>What is happening?</b><div class="soscats">${CATS.map(c=>`<button class="soscat ${m.cat==c[0]?"on":""}" style="--cc:${c[2]}" onclick="sosCat('${c[0]}')">${c[1]} ${c[0]}</button>`).join("")}</div>
  <div class="chips"><button onclick="sosCall('112')">📞 Call 112</button>${m.safe?"":`<button class="g" onclick="sosSafe()">✅ I’m safe now</button>`}<button class="g" onclick="S.sosHide=1;R()">Hide</button></div>
  ${sharing||m.safe?"":`<button style="width:100%;margin-top:8px" onclick="sosResume()">📍 Resume sharing my location</button>`}
  <small class="mut">Location sharing continues until your teacher closes the emergency. A notification shows while it is on.</small></div></div>`}
 if(l&&l.status=="resolved"&&!(S.sosAck||{})[l._k]&&Date.now()-(l.rt||0)<6*3600e3)
  return`<div class="sosov ok"><div class="sosin"><div class="sospulse">✅</div><h2>Emergency closed</h2><p>${e(l.byn||"Your teacher")} marked this emergency as resolved.</p><button onclick="(S.sosAck=S.sosAck||{})['${l._k}']=1;R()">OK</button></div></div>`;
 return""}

// ---------- staff
const sosCount=()=>isStaff()?act().length:0;
function sosBanner(){const n=sosCount();return n?`<div class="sosbar" onclick="sosGo()"><b>🚨 ${n} Active Emergenc${n>1?"ies":"y"}</b><span>Tap to open the Emergency Feed</span></div>`:""}
function sosGo(){const i=TABS[S.r].indexOf("Emergency");if(i>=0){S.t=i;R();scrollTo(0,0)}}
const num=n=>String(n||"").replace(/[^0-9+]/g,"");
function sosCall(n){n=num(n);if(!n)return;const p=plug();if(p&&p.dial)p.dial({number:n});else location.href="tel:"+n}
function sosMaps(id){const x=byId(id);if(!x||x.lat==null)return;const u=`https://www.google.com/maps/search/?api=1&query=${x.lat},${x.lng}`,p=plug();if(p&&p.openUrl)p.openUrl({url:u});else window.open(u,"_blank")}
function sosResolve(id){const x=byId(id);if(!x||!confirm("Mark this emergency as resolved? The student will be told it is closed."))return;
 x.status="resolved";x.by=S.u.id;x.byn=S.u.name||S.u.id;x.rt=Date.now();sv();S.sosOpen=null;S.msg="Emergency closed ✅";R()}
function sosFeedV(){if(!isStaff())return"";const A=act().sort((a,b)=>b.t0-a.t0),D=(db.sos||[]).filter(x=>x.status!="active").sort((a,b)=>(b.rt||0)-(a.rt||0)).slice(0,10);
 const card=x=>{const st=(db.students||[]).find(s=>s.id==x.sid)||{},cat=CATS.find(c=>c[0]==x.cat),open=S.sosOpen==x._k,ph=num(st.phone),pp=num(st.pp);
  return`<div class="card sosx"><div class="sosh"><b>${e(x.name)}</b><small class="mut">${e(x.cls||st.cls||"")}</small><span class="soscat on" style="--cc:${cat?cat[2]:"#94a3b8"}">${cat?cat[1]:"❗"} ${e(x.cat)}</span></div>
  <div class="sosm">⏱ Active <span data-t0="${x.t0}">${dur(x.t0)}</span> · 🔋 ${x.bat!=null&&x.bat>=0?x.bat+"%":"–"} · 🎯 ${x.acc?"±"+x.acc+" m":"waiting for GPS"} · updated <span data-ut="${x.ut}">${ago(x.ut)}</span>${x.safe?" · <b>🙂 student says safe</b>":""}</div>
  <div class="chips"><button onclick="S.sosOpen=${open?"null":`'${x._k}'`};R()">🗺️ ${open?"Hide":"View"} Live Map</button>${ph?`<button class="g" onclick="sosCall('${ph}')">📞 Call student</button>`:""}${pp?`<button class="g" onclick="sosCall('${pp}')">📞 Call parent</button>`:""}${x.lat!=null?`<button class="g" onclick="sosMaps('${x._k}')">Open in Maps</button>`:""}<button class="okb" onclick="sosResolve('${x._k}')">✔ Mark as Resolved</button></div>
  ${open?`<div class="smap">${miniMap({lat:x.lat,lng:x.lng,acc:x.acc,markers:[{lat:x.lat,lng:x.lng,label:x.name,color:"#ef4444"}]})}<small class="mut">Updates about every 5 seconds while the student’s phone is online.</small></div>`:""}</div>`};
 return`<div class="card"><h3>🚨 Emergency Feed</h3><small class="mut">Active alerts appear here instantly. Teachers and the admin are alerted together.</small></div>
 ${A.map(card).join("")||`<div class="card"><b>✅ No active emergencies</b></div>`}
 ${D.length?`<div class="card"><h3>Recently closed</h3>${D.map(x=>`<div class="row nw"><span style="flex:3"><b>${e(x.name)}</b> · ${e(x.cat)} <small class="mut">${ago(x.rt)} · by ${e(x.byn||"")}</small></span></div>`).join("")}</div>`:""}`}

setInterval(()=>{document.querySelectorAll("[data-ut]").forEach(n=>n.textContent=ago(+n.dataset.ut));document.querySelectorAll("[data-t0]").forEach(n=>n.textContent=dur(+n.dataset.t0));
 if(sharing&&S.r=="student"&&!mine()){stopSharing();R()}},1000);
Object.assign(window,{sosHoldStart,sosHoldEnd,sosTrigger,sosCat,sosSafe,sosResume,sosEnable,sosCardTop,sosOverlay,sosBanner,sosGo,sosCall,sosMaps,sosResolve,sosFeedV,sosCount,miniMap,SGA_CATS:CATS});
})();
