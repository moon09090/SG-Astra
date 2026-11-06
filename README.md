# SG Astra

Coaching-institute app for admin, teachers, students and parents.

## Android app for the Play Store (AAB) and phone (APK)
1. Upload every file in this folder to the main folder of a **private** GitHub repository.
2. In the repository open **Settings → Secrets and variables → Actions → New repository secret**. Name it `KEYSTORE_PASSWORD` and set a strong password you will remember. Write it down — you need it for every future update.
3. Create `.github/workflows/android.yml` (Add file → Create new file) and paste the contents of `android.yml`.
4. Open **Actions → Build Android (APK and AAB) → Run workflow**. The first run also creates your upload key (`upload-keystore.jks`) inside the repository.
5. When it turns green, open **Releases → SG Astra for Android**: `SG-Astra.aab` is the Play Store file, `SG-Astra.apk` installs on a phone.
6. In Play Console, turn on **Play App Signing** when you upload the first `.aab`. Then a lost upload key can be reset by Google.

Every new run raises the version number automatically, so each `.aab` can be uploaded as an update.

## SG Language Lab (AI teacher)
A separate world panel on the login screen. An AI teacher builds a zero-to-hero roadmap (A0 to C2) for any language, teaches each lesson, chats with you and speaks out loud. The 11 built-in offline courses, practice and the pronunciation lab are still inside. It needs an OpenRouter key (Profile); progress stays on the device.

## Line Python Lab
A second world panel: a code editor with highlighting, real Python 3 (Pyodide, bundled in the app), input support, files, 8 lessons and an AI assistant (Explain, Fix, Improve, Ask).

## First run
Open the app → **Admin** → ID `1888`. Add teachers and students (you choose each person’s unique ID), set your UPI ID, then share the IDs. Teachers create batches, homework and tests; parents log in with their child’s student ID.

## Files
- `index.html` – page shell
- `css/style.css` – themes, layouts, animations
- `js/state.js` – themes, data, helpers · `js/core.js` – login, rendering · `js/views.js` – screens
- `js/actions.js` – add/save actions, AI, WhatsApp · `js/features.js` – dashboards, library, automation
- `js/extras.js` – activity history, planner, menu · `js/boot.js` – start-up
- `sw.js`, `manifest.webmanifest`, `icons/` – installable app and icon
- `.github/workflows/deploy.yml` – automatic publishing

## Good to know
- Data is saved in each person's own browser. Sharing data between devices needs a backend (for example Firebase or Supabase).
- AI features work on GitHub Pages once the admin adds an OpenRouter key under AI. The key is stored only in that browser.
- WhatsApp messages open ready to send; fully automatic sending needs the WhatsApp Business API.
