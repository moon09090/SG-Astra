# Build step: gives the app a native voice (Android text-to-speech). Called from patch_fb.py.
import os, re
APP = "android/app"
jd = APP + "/src/main/java/com/sgastra/app/"
assert os.path.isdir(jd), "run after patch_line.py"
open(jd + "LinePlugin.java", "w").write(open("LinePlugin.java.txt").read())
mp = APP + "/src/main/AndroidManifest.xml"
t = open(mp).read()
if "TTS_SERVICE" not in t:
    q = '<queries><intent><action android:name="android.intent.action.TTS_SERVICE" /></intent></queries>\n    '
    t = re.sub(r"<application\b", q + "<application", t, count=1)
    open(mp, "w").write(t)
print("Native voice added")
