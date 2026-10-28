# SG Astra

Coaching-institute app for admin, teachers, students and parents.

## Put it online (GitHub Pages)
1. Create a new GitHub repository (public).
2. Upload everything from this folder, keeping the folders (`css`, `js`, `icons`, `.github/workflows`).
   - Phone tip: use **Add file → Create new file** and type the path (for example `.github/workflows/deploy.yml`), then paste the file’s text.
3. Open **Settings → Pages**, set **Source** to **GitHub Actions**.
4. Push to the `main` branch. The **Actions** tab runs "Deploy SG Astra" and shows your link: `https://YOUR-NAME.github.io/REPO-NAME/`.
5. Open the link on a phone and choose **Add to Home Screen** to install the app with the SG heart icon.

## Where each file goes
Upload every file into the main folder of the repository — no folders needed. Then create the workflow with **Add file → Create new file**, name it `.github/workflows/deploy.yml`, and paste the contents of `deploy.yml`.

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
