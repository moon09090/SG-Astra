#!/bin/sh
# OPTIONAL. Raises the app to Capacitor 8 (targets Android 16 / API 36, which Google Play now requires).
# Run it inside the SG-Astra folder on a SEPARATE branch:  git checkout -b api36
set -e
[ -f package.json ] && [ -f patch_line.py ] || { echo "Run inside the SG-Astra folder"; exit 1; }
sed -i 's/\("@capacitor\/[a-z]*": \)"[^"]*"/\1"^8.0.0"/' package.json
sed -i 's#com.chaquo.python:gradle:16.1.0#com.chaquo.python:gradle:17.0.0#' patch_line.py
grep -n "@capacitor" package.json
grep -n "chaquo.python:gradle" patch_line.py
grep -q "node-version: 22" .github/workflows/android.yml && echo "workflow: Node 22 OK" || echo "!! set node-version: 22 in .github/workflows/android.yml"
grep -q "java-version: 21" .github/workflows/android.yml && echo "workflow: Java 21 OK" || echo "!! set java-version: 21 in .github/workflows/android.yml"
echo "Now: git add -A && git commit -m 'Upgrade to Capacitor 8 (API 36)' && git push origin api36   (add api36 to the workflow branches)"
