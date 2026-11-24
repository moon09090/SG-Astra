# Build step: gives the app a native voice (Android text-to-speech). Called from patch_fb.py.
import os, re
APP = "android/app"
jd = APP + "/src/main/java/com/sgastra/app/"
assert os.path.isdir(jd), "run after patch_line.py"
open(jd + "LinePlugin.java", "w").write(open("LinePlugin.java.txt").read())
mp = APP + "/src/main/AndroidManifest.xml"
t = open(mp).read()
# The app does not record audio, so drop the microphone permissions the old workflow step added.
t = re.sub(r'\s*<uses-permission android:name="android\.permission\.(RECORD_AUDIO|MODIFY_AUDIO_SETTINGS)"\s*/>', "", t)
open(mp, "w").write(t)
if "TTS_SERVICE" not in t:
    q = '<queries><intent><action android:name="android.intent.action.TTS_SERVICE" /></intent></queries>\n    '
    t = re.sub(r"<application\b", q + "<application", t, count=1)
    open(mp, "w").write(t)
assert "RECORD_AUDIO" not in open(mp).read()
print("Native voice added, microphone permission removed")
exec(open("patch_safety.py").read())
