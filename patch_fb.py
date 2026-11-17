# Runs during the GitHub build (called from patch_line.py): bundles the Firebase SDK into the app.
import subprocess, os
out = "android/app/src/main/assets/public"
assert os.path.isdir(out), "run after cap sync"
subprocess.run(["npx", "--no-install", "esbuild", "fb-entry.mjs", "--bundle", "--minify", "--format=iife", "--outfile=" + out + "/fb.js"], check=True)
print("Firebase bundled into the app")
