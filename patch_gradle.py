# Makes the Android project use your upload key and a new version number on every build.
import os, re
p = "android/app/build.gradle"
t = open(p).read()
vc = os.environ.get("VC", "1")
t = re.sub(r"versionCode\s*=?\s*\d+", "versionCode " + vc, t, count=1)
t = re.sub(r'versionName\s*=?\s*"[^"]*"', 'versionName "1.0.' + vc + '"', t, count=1)
signing = '''signingConfigs {
        release {
            storeFile file(System.getenv("KS_PATH"))
            storePassword System.getenv("KS_PASS")
            keyAlias "upload"
            keyPassword System.getenv("KS_PASS")
        }
    }
    '''
head, tail = t.split("buildTypes {", 1)
tail = re.sub(r"release\s*\{", lambda m: m.group(0) + "\n            signingConfig signingConfigs.release", tail, count=1)
open(p, "w").write(head + signing + "buildTypes {" + tail)
print("build.gradle patched, versionCode", vc)
