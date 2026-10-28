# SG Astra

Coaching-institute app for admin, teachers, students and parents.

## Get the Android app (APK)
1. Upload every file in this folder to the main folder of a GitHub repository (it can be private).
2. Create `.github/workflows/android.yml` (Add file → Create new file, type that name) and paste the contents of `android.yml`.
3. Open the **Actions** tab → **Build Android APK** → **Run workflow**. It takes about 5–8 minutes.
4. When it shows a green tick, open the repository’s **Releases** section → **SG Astra for Android** → download `SG-Astra.apk`.
5. Open the file on your Android phone and allow “Install unknown apps” when asked.

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
