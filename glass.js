// Glass Horizon helpers: keep every sideways scroller (dock, card rows, chips) where the user left it
// when the screen redraws, and only re-centre the dock when the active tab actually changes.
(()=>{
const SEL=".hdock,.grid,.chips,.ainav,.aiex,.aitbw";
let lastSig="",lastActive=-1,touchT=0;
const sig=()=>[S.r,S.t,S.ht,S.pl,S.pc,S.am,S.pcb].join("|");
addEventListener("touchstart",()=>{touchT=Date.now()},{passive:true});
addEventListener("pointerdown",()=>{touchT=Date.now()},{passive:true});
const center=smooth=>{const d=document.querySelector(".hdock"),o=d&&d.querySelector(".hi.on");if(!o)return;
 d.scrollTo({left:o.offsetLeft-d.clientWidth/2+o.clientWidth/2,behavior:smooth?"smooth":"auto"})};
const R0o=window.R0;
if(typeof R0o=="function")window.R0=function(){
 const before=[...document.querySelectorAll(SEL)].map(e=>({c:e.className,l:e.scrollLeft})),same=lastSig===sig();
 const out=R0o.apply(this,arguments);
 [...document.querySelectorAll(SEL)].forEach((e,i)=>{const b=before[i];if(b&&b.c===e.className&&(same||e.classList.contains("hdock")))e.scrollLeft=b.l});
 const a=document.querySelector(".hdock .hi.on"),idx=a?[...a.parentNode.children].indexOf(a):-1;
 if(idx!==lastActive){center(lastActive>=0);lastActive=idx}
 lastSig=sig();return out};
addEventListener("load",()=>center(false));
})();
