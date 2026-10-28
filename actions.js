function addP(k){const id=cl(v("i1"));if(!id||!v("i2"))return;if(db.teachers.concat(db.students).some(x=>x.id==id)||id=="1888"){S.msg="ID already used";return R()}
db[k].push(k=="teachers"?{id,name:v("i2"),phone:v("i3")}:{id,name:v("i2"),phone:v("i3"),pp:v("i4"),cls:v("i5")});sv();S.msg="Added "+id;R()}
function del(k,id){db[k]=db[k].filter(x=>x.id!=id);sv();R()}
function addFee(){const a=+v("f2");if(!a)return;db.fees.push({sid:v("f1"),amt:a,note:v("f3"),paid:0});sv();R()}
function addS(b){const s=document.getElementById("s_"+b).value;if(s){db.batches.find(x=>x.id==b).sids.push(s);sv();R()}}
function addHW(){if(!v("h2")||!v("h1"))return;db.hw.push({id:uid(),bid:v("h1"),title:v("h2"),due:v("h3"),max:+v("h4")||10,sub:{}});sv();R()}
function score(w,s,x){const h=db.hw.find(q=>q.id==w);h.sub[s]=Object.assign(h.sub[s]||{},{score:+x});sv()}
function done(w){const h=db.hw.find(q=>q.id==w);h.sub=h.sub||{};h.sub[S.u.id]=Object.assign(h.sub[S.u.id]||{},{done:1});sv();R()}
function manual(){const qs=v("m3").split("\n").map(l=>l.split("|").map(x=>x.trim())).filter(p=>p.length>=6).map(p=>({q:p[0],o:p.slice(1,5),a:(+p[5]||1)-1}));if(!qs.length||!v("m1")){S.msg="Use the format: Question|A|B|C|D|1-4";return R()}db.tests.push({id:uid(),bid:v("m1"),title:v("m2")||"Test",qs,res:{}});sv();S.msg="Test published";R()}
async function ai(p){if(!db.set.key)throw 0;const r=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+db.set.key},body:JSON.stringify({model:db.set.model,messages:[{role:"user",content:p}]})});const j=await r.json();return j.choices[0].message.content}
async function gen(){const c=v("g2"),s=v("g3"),ch=v("g4"),l=v("g5"),n=+v("g6")||5,ty=v("g7"),b=v("g1");let qs,note="AI generated";
try{const t=await ai(`Create ${n} ${ty} questions for Class ${c} ${s}, chapter "${ch}", level ${l}. Reply ONLY with a JSON array: [{"q":"...","o":["A","B","C","D"],"a":0}] where a is the correct option index. For Assertion-Reason use the standard 4 options; for Case Study embed the case text in q.`);qs=JSON.parse(t.match(/\[[\s\S]*\]/)[0])}catch(x){S.msg="AI could not generate questions. Ask the admin to check the OpenRouter key and model under AI, or create the test manually.";return R()}
S.gen={qs,bid:b,title:`${s} · ${ch} (${l})`,note};R()}
function pub(){const g=S.gen;db.tests.push({id:uid(),bid:g.bid,title:g.title,qs:g.qs,res:{}});S.gen=null;sv();S.msg="Test published";R()}
function submitT(id){const x=db.tests.find(q=>q.id==id);let sc=0;x.qs.forEach((q,i)=>{if(document.querySelector(`input[name=q${i}]:checked`)?.value==q.a)sc++});x.res[S.u.id]=sc;S.take=null;sv();S.msg=`Score: ${sc}/${x.qs.length}`;R()}
async function doubt(){const q=v("d1");if(!q)return;let a;try{a=await ai("Explain simply for a school student: "+q)}catch(x){a="AI answer unavailable here—your teacher will reply."}db.doubts.push({sid:S.u.id,q,a});sv();R()}
function wa(p,m){window.open("https://wa.me/"+(String(p).length==10?"91":"")+String(p).replace(/\D/g,"")+"?text="+encodeURIComponent(m),"_blank")}
function notice(){const t=v("n2");if(!t)return;const by=S.r=="admin"?"Admin":u_().name,k=v("n1")||"all";db.ann.push({t,by,d:today()});sv();try{Notification.requestPermission().then(p=>p=="granted"&&new Notification("SG Astra",{body:t}))}catch(x){}
let st=db.students;if(S.r=="teacher")st=k=="all"?db.students.filter(s=>myBatches(s.id).some(b=>b.tid==S.u.id)):db.students.filter(s=>db.batches.find(b=>b.id==k)?.sids.includes(s.id));
S.wa=st.map(s=>[s.phone,s.name,"📢 SG Astra: "+t]);S.msg="Posted in the app. Send via WhatsApp below.";R()}
