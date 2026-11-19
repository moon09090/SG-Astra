#!/bin/sh
# Run inside the SG-Astra repo (on the ui-upgrade branch) after unzipping this package over it.
set -e
[ -f sw.js ] && [ -f patch_line.py ] || { echo "Run this inside the SG-Astra folder"; exit 1; }
grep -q 'voice.js' sw.js || sed -i 's/"state.js", /"state.js", "fb.js", "sync.js", /;s/"hub.js", /"hub.js", "aitools.js", "voice.js", "icons.js", "glass.js", /' sw.js
sed -i 's/sg-astra-v[0-9]*/sg-astra-v9/' sw.js
grep -q patch_fb patch_line.py || printf '\nexec(open("patch_fb.py").read())\n' >> patch_line.py
for f in .github/workflows/android.yml android.yml; do
  [ -f "$f" ] && sed -i 's/branches: \[main, line-ide\]/branches: [main, line-ide, ui-upgrade]/' "$f"
done
rm -f apply.sh
echo "Done. Now: git add -A && git commit -m 'Voice, icons, saving, tools' && git push origin ui-upgrade"
