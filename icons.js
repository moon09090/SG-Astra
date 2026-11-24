// Professional vector icons for every tab (duotone, animated). Falls back to the old emoji if a name is unknown.
(()=>{
const P={
home:'<path d="M3 11.4 12 4l9 7.4"/><path class="f" d="M5.5 10v10h13V10L12 4.6z"/><path d="M10 20v-5.5h4V20"/>',
users:'<circle class="f" cx="9" cy="8" r="3.3"/><path d="M3 20c0-3.5 2.7-5.7 6-5.7s6 2.2 6 5.7"/><circle class="f" cx="17.3" cy="9" r="2.4"/><path d="M17.2 14.4c2.4.2 3.8 1.9 3.8 4.3"/>',
cap:'<path class="f" d="M2.5 9.5 12 5l9.5 4.5L12 14z"/><path d="M6.5 11.8V16c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4.2"/><path d="M21.5 9.5V15"/>',
card:'<rect class="f" x="2.5" y="5.5" width="19" height="13" rx="2.6"/><path d="M2.5 10h19"/><path d="M6.5 15h4"/>',
bell:'<path class="f" d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.6a2 2 0 0 0 4 0"/>',
chart:'<path d="M4 4v16h16"/><rect class="f" x="7.5" y="11" width="3" height="6" rx="1"/><rect class="f" x="12.5" y="7" width="3" height="10" rx="1"/><rect class="f" x="17.4" y="13" width="2.6" height="4" rx="1"/>',
books:'<rect class="f" x="4" y="4" width="5" height="16" rx="1.3"/><path d="M9 6.5l5.2-1.3 3.8 14.5-5.3 1.3z" class="f"/><path d="M4 8.5h5"/>',
cal:'<rect class="f" x="3.5" y="5" width="17" height="15.5" rx="2.6"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8 14h2M12 14h2M8 17h2"/>',
palette:'<path class="f" d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-1 1.5-2.1-.6-1.3.2-2.4 1.6-2.4h1.7a3.2 3.2 0 0 0 3.2-3.2C20 7.7 16.4 3.5 12 3.5z"/><circle cx="8" cy="11" r="1.1"/><circle cx="11" cy="7.6" r="1.1"/><circle cx="15.2" cy="8.4" r="1.1"/>',
spark:'<path class="f" d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
grid:'<rect class="f" x="3.5" y="3.5" width="7.5" height="9" rx="2"/><rect class="f" x="13" y="3.5" width="7.5" height="5.5" rx="2"/><rect class="f" x="13" y="11" width="7.5" height="9.5" rx="2"/><rect class="f" x="3.5" y="14.5" width="7.5" height="6" rx="2"/>',
note:'<rect class="f" x="5" y="3.5" width="12.5" height="17" rx="2.3"/><path d="M8.5 8h6M8.5 11.5h6M8.5 15h3"/><path d="m16 18.3 5-5 1.6 1.6-5 5-2.3.7z"/>',
clip:'<rect class="f" x="5" y="4.5" width="14" height="16.5" rx="2.4"/><path d="M9 4.5v-1h6v1"/><path d="m8.8 13 2.2 2.2 4.2-4.4"/>',
check:'<circle class="f" cx="12" cy="12" r="8.8"/><path d="m8 12.4 2.7 2.7 5.5-5.7"/>',
trend:'<path d="M3.5 17 9 11.5l3.5 3.5L20.5 7"/><path d="M15 7h5.5v5.5"/>',
target:'<circle class="f" cx="12" cy="12" r="8.8"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>',
help:'<path class="f" d="M4 5.5h16v10.5H9.5L5 20v-4H4z"/><path d="M9.8 9.4a2.2 2.2 0 0 1 4.2.8c0 1.5-2 1.6-2 3"/><path d="M12 14.6v.1"/>',
gift:'<rect class="f" x="3.5" y="9" width="17" height="4" rx="1.2"/><path d="M5 13v7.5h14V13"/><path d="M12 9v11.5"/><path d="M12 9C11 5.6 7 5.2 7 7.6 7 8.9 9.5 9 12 9zm0 0c1-3.4 5-3.8 5-1.4C17 8.9 14.5 9 12 9z"/>',
trophy:'<path class="f" d="M8 4.5h8v5a4 4 0 0 1-8 0z"/><path d="M8 6.5H4.5c0 3 1.5 4.2 3.7 4.5M16 6.5h3.5c0 3-1.5 4.2-3.7 4.5"/><path d="M12 13.5V17M8.5 20.5h7"/><path d="M9.5 17h5v3.5h-5z"/>',
cloud:'<path class="f" d="M7 18.5a4.5 4.5 0 0 1-.6-8.9A6 6 0 0 1 18 8.8a4.2 4.2 0 0 1-.5 9.7z"/><path d="M12 11.2V17m-2.6-2.6L12 11.8l2.6 2.6"/>',
bolt:'<path class="f" d="M13 2.5 5 13.5h6l-1 8 8-11h-6z"/>',
search:'<circle class="f" cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>',
star:'<rect class="f" x="3.5" y="5" width="17" height="15.5" rx="2.6"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="m12 11.6 1.1 2.3 2.5.3-1.8 1.7.5 2.5-2.3-1.2-2.3 1.2.5-2.5-1.8-1.7 2.5-.3z"/>',
pulse:'<path d="M3 12h4l2.5-6 4 12 2.5-6H21"/>',
list:'<path d="M9.5 6.5H20M9.5 12H20M9.5 17.5H20"/><path d="m3.8 6.4 1.4 1.4 2.4-2.6M3.8 12l1.4 1.4L7.6 10.8M3.8 17.6l1.4 1.4 2.4-2.6"/>',
tools:'<rect class="f" x="3" y="8" width="18" height="12" rx="2.6"/><path d="M8.5 8V6.2a1.7 1.7 0 0 1 1.7-1.7h3.6a1.7 1.7 0 0 1 1.7 1.7V8"/><path d="M3 13.5h18"/><path d="M10.5 13.5v2h3v-2"/>',
history:'<path d="M3.8 12a8.2 8.2 0 1 1 2.4 5.8"/><path d="M3.5 7v5h5"/><path d="M12 7.5V12l3 2"/>',
sun:'<circle class="f" cx="12" cy="12" r="4"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>',
repeat:'<path d="M17 3.5 20.5 7 17 10.5"/><path d="M3.5 12v-2a3 3 0 0 1 3-3h14"/><path d="M7 20.5 3.5 17 7 13.5"/><path d="M20.5 12v2a3 3 0 0 1-3 3h-14"/>',
flag:'<path d="M5 21V4"/><path class="f" d="M5 4.5h12l-2.2 3.7L17 12H5z"/>',
sticky:'<path class="f" d="M5 4.5h14v10.5l-4.5 4.5H5z"/><path d="M14.5 19.5V15H19"/><path d="M8.5 9h7M8.5 12.5h4"/>',
layers:'<path class="f" d="m12 3.5 9 4.7-9 4.7-9-4.7z"/><path d="m3 12.3 9 4.7 9-4.7"/><path d="m3 16.2 9 4.7 9-4.7"/>',
play:'<path class="f" d="M8 5.5v13l11-6.5z"/>',
abc:'<path d="M3.5 19 8 6l4.5 13M5.2 14.5h5.6"/><circle cx="17.2" cy="15.2" r="3.2" class="f"/><path d="M20.4 12v7"/>',
openbook:'<path class="f" d="M12 6.5C10 4.8 6.5 4.3 3.5 5v13c3-.7 6.5-.2 8.5 1.5 2-1.7 5.5-2.2 8.5-1.5V5c-3-.7-6.5-.2-8.5 1.5z"/><path d="M12 6.5v13"/>',
pencil:'<path class="f" d="M4 20l1-4.2L16 4.8a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19z"/><path d="m14.5 6.5 3 3"/>',
chat:'<path class="f" d="M4 5h16v11H9.5L5 20v-4H4z"/><path d="M8 9h8M8 12h5"/>',
dict:'<rect class="f" x="5" y="3.5" width="14" height="17" rx="2.2"/><path d="M9 8h6M9 11.5h6"/><circle cx="12" cy="16" r="1.4"/>',
siren:'<path class="f" d="M7 18v-6a5 5 0 0 1 10 0v6z"/><path d="M5 21h14M12 2.8v2M4.6 6l1.4 1.4M19.4 6 18 7.4M10 12a2 2 0 0 1 2-2"/>',
shield:'<path class="f" d="M12 3 4.5 6v5.5c0 4.6 3 8 7.5 9.5 4.5-1.5 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2.2 2.2 4.3-4.4"/>',
code:'<path d="m8.5 7.5-5 4.5 5 4.5M15.5 7.5l5 4.5-5 4.5M13.5 5 10.5 19"/>'
};
const MAP={Home:"home",Dashboard:"grid",Teachers:"users",Students:"cap",Pay:"card",Notice:"bell",Reports:"chart",Library:"books",Timetable:"cal",Theme:"palette",AI:"spark",Batches:"users",Homework:"note",Tests:"clip",Attend:"check",Progress:"trend","Weak Topics":"target",Doubts:"help",Refer:"gift",Leaders:"trophy",Backup:"cloud",Automation:"bolt",Search:"search",Events:"star",Activity:"pulse",Planner:"list",Toolkit:"tools",History:"history",Today:"sun",Zones:"grid",Routine:"repeat",Goals:"flag",Notes:"sticky",Cards:"layers",Start:"play",Alphabet:"abc",Vocabulary:"openbook",Grammar:"pencil",Phrases:"chat",Reading:"books",Dictionary:"dict",Practice:"clip",Lab:"code",Safety:"shield",Emergency:"siren"};
const sprite='<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">'+Object.keys(P).map(k=>`<symbol id="i-${k}" viewBox="0 0 24 24">${P[k]}</symbol>`).join("")+'</svg>';
function mount(){if(document.getElementById("sgaSprite")||!document.body)return;const d=document.createElement("div");d.id="sgaSprite";d.innerHTML=sprite;document.body.prepend(d)}
function tabIco(n){const k=MAP[n];return k?`<svg class="ti" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${k}"/></svg>`:null}
mount();document.addEventListener("DOMContentLoaded",mount);
window.tabIco=n=>tabIco(n)||((window.IC&&IC[n])||"•");window.SGA_ICONS={names:Object.keys(MAP),symbols:Object.keys(P)};
})();
