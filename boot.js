setInterval(()=>{const c=document.getElementById("clk");if(c)c.textContent=new Date().toLocaleTimeString()},1000);
setInterval(()=>{if(S.r&&["Home","Dashboard","Progress"].includes(TABS[S.r][S.t])&&!document.activeElement?.matches("input,textarea,select")){document.body.classList.add("nr");R0();setTimeout(()=>document.body.classList.remove("nr"),80)}},15000);
R();
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
