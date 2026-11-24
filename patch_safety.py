# Build step: installs the SOS location service and declares the Android permissions it needs.
import os, re
APP = "android/app"
jd = APP + "/src/main/java/com/sgastra/app/"
assert os.path.isdir(jd), "run after patch_line.py"
open(jd + "SosService.java", "w").write(open("SosService.java.txt").read())
mp = APP + "/src/main/AndroidManifest.xml"
t = open(mp).read()
perms = ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION", "FOREGROUND_SERVICE", "FOREGROUND_SERVICE_LOCATION", "POST_NOTIFICATIONS"]
add = "".join('<uses-permission android:name="android.permission.%s" />\n    ' % p for p in perms if p not in t)
if add:
    t = re.sub(r"<application\b", add + "<application", t, count=1)
if "SosService" not in t:
    t = t.replace("</application>", '<service android:name=".SosService" android:exported="false" android:foregroundServiceType="location" />\n    </application>')
open(mp, "w").write(t)
assert "SosService" in t and "ACCESS_FINE_LOCATION" in t
print("SOS service and permissions added")
