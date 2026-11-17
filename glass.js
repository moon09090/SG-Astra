// Keeps the active tab of the horizontal glass dock centred as screens change.
(()=>{const c=()=>{const d=document.querySelector(".hdock"),o=d&&d.querySelector(".hi.on");if(o)d.scrollLeft=o.offsetLeft-d.clientWidth/2+o.clientWidth/2};
 let q=0;new MutationObserver(()=>{cancelAnimationFrame(q);q=requestAnimationFrame(c)}).observe(document.body,{childList:true,subtree:true});
 window.addEventListener("load",c)})();
