// Runs Python (Pyodide) off the main thread so a runaway loop can be stopped.
let py = null, queue = [];
const dec = new TextDecoder();
self.onmessage = async ev => {
  const m = ev.data;
  if (m.type === "init") {
    try {
      importScripts(m.base + "pyodide.js");
      py = await loadPyodide({ indexURL: m.base });
      py.setStdout({ write: b => { postMessage({ t: "out", s: dec.decode(b) }); return b.length; } });
      py.setStderr({ write: b => { postMessage({ t: "err", s: dec.decode(b) }); return b.length; } });
      postMessage({ t: "ready" });
    } catch (e) { postMessage({ t: "fail", s: String(e) }); }
  } else if (m.type === "run") {
    queue = (m.stdin || []).filter((x, i, a) => x !== "" || i < a.length - 1);
    py.setStdin({ stdin: () => { if (!queue.length) return undefined; const s = queue.shift(); if (m.echo !== false) postMessage({ t: "out", s: s + "\n" }); return s; } });
    try {
      if (m.online) await py.loadPackagesFromImports(m.code);
      const g = py.globals.get("dict")();
      await py.runPythonAsync(m.code, { globals: g });
      g.destroy();
      postMessage({ t: "done" });
    } catch (e) { postMessage({ t: "error", s: String(e.message || e) }); }
  }
};
