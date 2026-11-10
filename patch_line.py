import os, re, glob, shutil
A = "android"; APP = A + "/app"; J = "app__src__main__java__"
for f in glob.glob("compiler/" + J + "*.kt"):
    parts = os.path.basename(f)[len(J):].split("__")
    d = os.path.join(APP, "src/main/java", *parts)
    os.makedirs(os.path.dirname(d), exist_ok=True); shutil.copy(f, d)
os.makedirs(APP + "/src/main/python", exist_ok=True)
shutil.copy("compiler/app__src__main__python__line_runner.py", APP + "/src/main/python/line_runner.py")

def edit(p, fn):
    t = open(p).read(); open(p, "w").write(fn(t))

def root(t):
    t = t.replace("repositories {", 'repositories {\n        maven { url "https://chaquo.com/maven" }')
    return t.replace("dependencies {", "dependencies {\n        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:2.0.20'\n        classpath 'org.jetbrains.kotlin:compose-compiler-gradle-plugin:2.0.20'\n        classpath 'com.chaquo.python:gradle:16.1.0'", 1)
edit(A + "/build.gradle", root)

def app(t):
    t = re.sub(r"apply plugin: 'com.android.application'", "apply plugin: 'com.android.application'\napply plugin: 'org.jetbrains.kotlin.android'\napply plugin: 'org.jetbrains.kotlin.plugin.compose'\napply plugin: 'com.chaquo.python'", t, count=1)
    t = t.replace("android {", "android {\n    buildFeatures { compose true }", 1)
    t = t.replace("defaultConfig {", "defaultConfig {\n        ndk { abiFilters 'arm64-v8a', 'x86_64' }", 1)
    return t + """
chaquopy {
    defaultConfig {
        version = "3.12"
        pip {
            install "numpy"
            install "pandas"
            install "matplotlib"
            install "requests"
            install "sympy"
            install "rich"
        }
    }
}
dependencies {
    implementation platform('androidx.compose:compose-bom:2024.09.02')
    implementation 'androidx.core:core-ktx:1.13.1'
    implementation 'androidx.activity:activity-compose:1.9.2'
    implementation 'androidx.lifecycle:lifecycle-viewmodel-compose:2.8.6'
    implementation 'androidx.compose.ui:ui'
    implementation 'androidx.compose.material3:material3'
    implementation 'androidx.compose.material:material-icons-extended'
    implementation 'androidx.security:security-crypto:1.1.0-alpha06'
    implementation 'com.squareup.okhttp3:okhttp:4.12.0'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1'
}
"""
edit(APP + "/build.gradle", app)
edit(A + "/variables.gradle", lambda t: re.sub(r"minSdkVersion\s*=\s*\d+", "minSdkVersion = 26", t))
open(A + "/gradle.properties", "a").write("\norg.gradle.jvmargs=-Xmx3g -Dfile.encoding=UTF-8\n")

def man(t):
    t = re.sub(r"<application\b", '<application android:name="com.line.ide.LineApp"', t, count=1)
    return t.replace("</application>", '<activity android:name="com.line.ide.MainActivity" android:exported="false" android:windowSoftInputMode="adjustResize" android:theme="@android:style/Theme.Material.NoActionBar" />\n    </application>')
edit(APP + "/src/main/AndroidManifest.xml", man)

jd = APP + "/src/main/java/com/sgastra/app/"
os.makedirs(jd, exist_ok=True)
open(jd + "MainActivity.java", "w").write("""package com.sgastra.app;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
public class MainActivity extends BridgeActivity {
    @Override public void onCreate(Bundle b) { registerPlugin(LinePlugin.class); super.onCreate(b); }
}
""")
open(jd + "LinePlugin.java", "w").write("""package com.sgastra.app;
import android.content.Intent;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
@CapacitorPlugin(name = "LineIde")
public class LinePlugin extends Plugin {
    @PluginMethod public void open(PluginCall call) {
        Intent i = new Intent();
        i.setClassName(getContext(), "com.line.ide.MainActivity");
        getActivity().startActivity(i);
        call.resolve();
    }
}
""")
print("Line IDE patched")
