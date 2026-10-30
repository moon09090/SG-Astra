/* SG Astra - animated background scenes (safe version). */
window.Scene = (function () {
  let raf = 0, cv = null;
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    if (cv && cv.parentNode) cv.parentNode.removeChild(cv);
    cv = null;
  }
  function start(t) {
    stop();
    try {
      const host = document.getElementById("fx");
      if (!host) return;
      cv = document.createElement("canvas");
      cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none";
      host.appendChild(cv);
      const ctx = cv.getContext("2d");
      const dots = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), r: 1 + Math.random() * 2, v: 0.0003 + Math.random() * 0.0006 }));
      const col = (t && t[4]) || "#ffffff";
      (function frame() {
        cv.width = innerWidth; cv.height = innerHeight;
        ctx.fillStyle = col; ctx.globalAlpha = 0.5;
        dots.forEach(d => {
          d.y -= d.v; if (d.y < 0) d.y = 1;
          ctx.beginPath(); ctx.arc(d.x * cv.width, d.y * cv.height, d.r, 0, 6.283); ctx.fill();
        });
        raf = requestAnimationFrame(frame);
      })();
    } catch (e) { /* never block the app */ }
  }
  return { start, stop };
})();
