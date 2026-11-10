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

## Admin-only controls
Only the admin (ID 1888) can change themes, layouts, the AI key and the Python engine mode. To give **every phone** the AI key, add the repository secret `OPENROUTER_API_KEY` (optional variables: `SGA_MODEL`, `SGA_THEME`, `SGA_LAYOUT`) before building. The key is baked into the app, so use a key with a spending limit.

## Panels for everyone
- **Language Academy** — any language from the alphabet up: sounds, 24 vocabulary topics, 16 grammar lessons, 14 phrase situations, graded reading, dictionary, flashcards, quizzes, dictation and voice output.
- **Line Python Lab** — big editor with an operator keyboard, full-screen output, 13 auto-tested coding challenges, 22 code snippets, lessons, real Python 3 offline.
- **Study Hub** — 220+ tools in 12 zones (Focus, Plan & Track, Learn & Revise, Creativity Studio, Imagination Lab, Routine & Habits, Mind & Wellbeing, Brain Games, Calculators, Reference, AI Helpers, Career & Money), plus a daily dashboard, routine builder, goals, notes and flashcards.
- **AI helper** — the 🤖 button in every panel answers doubts.

## Look and feel
56 themes (luxurious, elegant, simple, creative, some gently animated) and 12 vertical layouts. Only the admin can change them.

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
