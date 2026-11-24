// Push notifications (Firebase Cloud Messaging). Stays dormant until the build includes the push plugin
// (which happens automatically once google-services.json is in the repo).
(()=>{
const P=()=>{try{const c=window.Capacitor;return c&&c.isNativePlatform&&c.isNativePlatform()&&c.Plugins&&c.Plugins.PushNotifications||null}catch(x){return null}};
let started=false;
async function pushInit(){const p=P();if(started||!p||!window.Sync||!Sync.isOn()||!S.u)return;started=true;
 try{await p.createChannel({id:"sga_alerts",name:"Alerts",description:"Emergencies, unlock requests and attendance",importance:4,visibility:1,vibration:true})}catch(x){}
 try{const r=await p.requestPermissions();if(r.receive!=="granted"){started=false;return}
  p.addListener("registration",t=>{try{Sync.saveToken({tok:t.value,pid:S.u.id,role:S.r})}catch(x){}});
  p.addListener("pushNotificationActionPerformed",a=>{const d=(a&&a.notification&&a.notification.data)||{};const i=d.tab&&S.r&&TABS[S.r]?TABS[S.r].indexOf(d.tab):-1;if(i>=0){S.t=i;R()}});
  await p.register()}catch(x){started=false}}
window.pushInit=pushInit;window.pushReset=()=>{started=false};
})();
