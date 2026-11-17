#!/bin/sh
# Run inside the SG-Astra repo, on the ui-upgrade branch, after unzipping this package over it.
set -e
[ -f package.json ] && [ -f sw.js ] && [ -f patch_line.py ] || { echo "Run this inside the SG-Astra folder"; exit 1; }
grep -q '"firebase"' package.json || sed -i 's/"pyodide": "0.26.4"/"pyodide": "0.26.4",\n    "firebase": "^11.10.0",\n    "esbuild": "^0.25.0"/' package.json
grep -q '"firebase"' package.json || { echo "package.json edit failed"; exit 1; }
grep -q 'sync.js' sw.js || sed -i 's/"state.js", /"state.js", "fb.js", "sync.js", /' sw.js
grep -q aitools.js sw.js || sed -i 's/"hub.js", /"hub.js", "aitools.js", "glass.js", /' sw.js
sed -i 's/sg-astra-v[0-9]*/sg-astra-v7/' sw.js
grep -q patch_fb patch_line.py || echo 'exec(open("patch_fb.py").read())' >> patch_line.py
for f in .github/workflows/android.yml android.yml; do
  [ -f "$f" ] && sed -i 's/branches: \[main, line-ide\]/branches: [main, line-ide, ui-upgrade]/' "$f"
done
grep -q ui-upgrade .github/workflows/android.yml || echo "NOTE: add ui-upgrade to the workflow branches by hand"
rm -f apply.sh
echo "Done. Now: git add -A && git commit -m 'Firebase realtime sync' && git push origin ui-upgrade"
