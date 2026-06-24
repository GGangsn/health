# RPE Bulk PWA deploy

## GitHub Pages

1. Create a new GitHub repository.
2. Upload every file in this folder to the repository root:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `manifest.json`
   - `sw.js`
   - `.nojekyll`
   - `icons/icon.svg`
3. In GitHub, open `Settings` -> `Pages`.
4. Set `Deploy from a branch`.
5. Select branch `main` and folder `/root`.
6. Open the HTTPS URL GitHub gives you.
7. On iPhone Safari, use `Share` -> `Add to Home Screen`.

## Updating

Replace the same files in the repository, then refresh the iPhone app.
If the old screen remains, delete Safari site data for the deployed domain and open it again.

## Data

Workout logs are stored in the browser's LocalStorage for the exact domain.
`localhost` data and deployed-site data are separate.
