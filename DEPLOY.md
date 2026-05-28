# Kit Cyber 2026 — Site web

Publication éditoriale par Afifia Belabdoun · Édition 01 · 2026

## Déploiement sur Vercel

### Option 1 — Drag-and-drop (le plus simple)

1. Téléchargez ce dossier `dist/` en zip
2. Ouvrez https://vercel.com/new
3. Glissez le dossier décompressé dans la zone d'upload
4. Vercel détecte un site statique et déploie automatiquement
5. Vercel Analytics s'active tout seul (le script `/_vercel/insights/script.js` est déjà câblé dans `index.html`)

### Option 2 — Via Git

```bash
git init
git add .
git commit -m "Kit Cyber 2026 — Édition 01"
# Pousser sur GitHub puis importer le repo dans Vercel
```

### Option 3 — Via CLI

```bash
npm i -g vercel
vercel
```

## Structure

```
dist/
├── index.html           # Le site — responsive (mobile + desktop)
├── styles.css           # Styles de base (mobile-first)
├── desktop.css          # Styles desktop (≥1024px) + print
├── app.jsx              # Composants React (chargé via Babel CDN)
├── data.jsx             # Contenu : chapitres, lexique, ressources
├── vercel.json          # Configuration Vercel (headers PDF, cache)
└── downloads/
    ├── kit-cyber-mobile.pdf   # Version PDF vertical 9:16
    └── kit-cyber-desktop.pdf  # Version PDF A4 paysage
```

## Personnalisation

Le contenu vit dans **`data.jsx`** :
- `CHAPTERS` — les 7 chapitres et leurs actions
- `ERRORS` — les 12 pièges
- `GLOSSARY` — le lexique
- `RESOURCES` — les liens utiles

Pour éditer le manifeste, la couverture ou le hero, modifier directement `app.jsx`.

## Analytics

Vercel Analytics est activé par défaut une fois déployé. Le code suit :
- `pageview` — visites
- `section-view` — chaque section traversée à 50% du viewport
- `download-mobile` / `download-desktop` — clics sur les boutons de téléchargement

Les events apparaissent dans le dashboard Vercel → Analytics → Custom Events.

## Persistance utilisateur

Les cases cochées par l'utilisateur sont sauvegardées dans `localStorage` (clé `kit-cyber-checks-v1`). Pas de backend, pas de cookies, pas de tracking d'identité.

---

Libre de partage. Édition 01 · 2026.
