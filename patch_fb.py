# Runs during the GitHub build (called from patch_line.py): bundles Firebase and adds the native voice.
import subprocess, os

def sh(cmd):
    print("$", cmd)
    if not os.environ.get("SGA_DRY"):
        subprocess.run(cmd, shell=True, check=True)

out = "android/app/src/main/assets/public"
assert os.path.isdir(out), "run after cap sync"
# Optional push notifications: only when google-services.json has been added to the repo.
if os.path.isfile("google-services.json"):
    import json, shutil
    major = "7"
    try:
        major = json.load(open("node_modules/@capacitor/core/package.json"))["version"].split(".")[0]
    except Exception:
        pass
    sh("npm install --no-save --no-audit --no-fund @capacitor/push-notifications@^%s.0.0 esbuild@0.25.0 firebase@11.10.0" % major)
    shutil.copy("google-services.json", "android/app/google-services.json")
    sh("npx cap sync android")
    print("Push notifications enabled")
else:
    print("google-services.json not found: push notifications stay off")
if not (os.path.isdir("node_modules/esbuild") and os.path.isdir("node_modules/firebase")):
    sh("npm install --no-save --no-audit --no-fund esbuild@0.25.0 firebase@11.10.0")
sh("npx --no-install esbuild fb-entry.mjs --bundle --minify --format=iife --outfile=" + out + "/fb.js")
assert os.environ.get("SGA_DRY") or os.path.isfile(out + "/fb.js"), "fb.js was not created"
print("Firebase bundled into the app")
exec(open("patch_voice.py").read())
