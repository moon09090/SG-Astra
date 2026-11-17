# Runs during the GitHub build (called from patch_line.py): bundles the Firebase SDK into the app.
import subprocess, os

def sh(cmd):
    subprocess.run(cmd, shell=True, check=True)

out = "android/app/src/main/assets/public"
assert os.path.isdir(out), "run after cap sync"
if not (os.path.isdir("node_modules/esbuild") and os.path.isdir("node_modules/firebase")):
    sh("npm install --no-save --no-audit --no-fund esbuild@0.25.0 firebase@11.10.0")
sh("npx --no-install esbuild fb-entry.mjs --bundle --minify --format=iife --outfile=" + out + "/fb.js")
assert os.path.isfile(out + "/fb.js"), "fb.js was not created"
print("Firebase bundled into the app")
