// Voice playback: native Android text-to-speech inside the app, browser voice as a backup.
// Replaces speak() from ai.js (same signature: speak(text, langCode, rate, onEnd)).
(()=>{
const native=()=>{try{const c=window.Capacitor;const p=c&&c.Plugins&&c.Plugins.LineIde;return p&&p.speak&&c.isNativePlatform&&c.isNativePlatform()?p:null}catch(x){return null}};
const SCRIPTS=[[/[\u0900-\u097F]/,"hi-IN"],[/[\u0980-\u09FF]/,"bn-IN"],[/[\u0B80-\u0BFF]/,"ta-IN"],[/[\u0C00-\u0C7F]/,"te-IN"],[/[\u0600-\u06FF]/,"ar-SA"],[/[\u3040-\u30FF]/,"ja-JP"],[/[\uAC00-\uD7AF]/,"ko-KR"],[/[\u4E00-\u9FFF]/,"zh-CN"]];
const guess=t=>{for(const [r,c] of SCRIPTS)if(r.test(t))return c;return "en-US"};
const clean=t=>String(t==null?"":t).replace(/<[^>]*>/g," ").replace(/[*_`#>•▪◦]/g," ").replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu," ").replace(/\s{2,}/g," ").trim();
let ended=null,timer=0,hooked=false;
const done=()=>{clearTimeout(timer);const f=ended;ended=null;if(f)try{f()}catch(x){}};
const hook=p=>{if(hooked)return;hooked=true;try{const h=p.addListener&&p.addListener("ttsDone",done);if(h&&h.catch)h.catch(()=>{})}catch(x){}};
const say=m=>{S.msg=m;try{R()}catch(x){}};
const NOLANG=(lang)=>`There’s no ${lang} voice on this phone yet. <button class="g" onclick="voiceSettings()">Open voice settings</button> and install it under Text-to-speech.`;
function webSpeak(t,code,rate,cb){
 if(!("speechSynthesis" in window)||typeof SpeechSynthesisUtterance=="undefined"){say("Voice playback isn’t available on this device.");return false}
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang=code;u.rate=rate;if(cb)u.onend=cb;u.onerror=()=>{if(cb)cb()};speechSynthesis.speak(u);return true}catch(x){say("Voice playback isn’t available on this device.");return false}}
function speak(text,code,rate,cb){
 const t=clean(text);if(!t){if(cb)cb();return}
 const lang=code||guess(t),r=Math.min(1.6,Math.max(.4,rate||.9)),p=native();
 if(!p){webSpeak(t,lang,r,cb);return}
 hook(p);ended=cb||null;clearTimeout(timer);
 timer=setTimeout(done,Math.min(120000,3000+t.length*95/r));
 let q;try{q=p.speak({text:t,lang,rate:r})}catch(x){q=null}
 Promise.resolve(q).then(res=>{
  if(res&&res.ok===false){clearTimeout(timer);ended=null;
   if(res.reason=="lang"){say(NOLANG(lang));if(cb)cb()}
   else if(!webSpeak(t,lang,r,cb)&&cb)cb()}
 }).catch(()=>{clearTimeout(timer);ended=null;if(!webSpeak(t,lang,r,cb)&&cb)cb()})}
function stopSpeak(){clearTimeout(timer);ended=null;try{const p=native();if(p&&p.stop)p.stop();if("speechSynthesis" in window)speechSynthesis.cancel()}catch(x){}}
function voiceSettings(){try{const p=native();if(p&&p.voiceSettings)p.voiceSettings()}catch(x){}}
Object.assign(window,{speak,stopSpeak,voiceSettings});
})();
