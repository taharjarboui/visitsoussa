# Visit Soussa — site

Site vitrine de Sousse. Astro + Tailwind CSS, statique, trilingue (FR / EN / AR).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # génère dist/
npm run preview    # teste le build
```

## Où est quoi

| Dossier | Rôle |
|---|---|
| `src/content/<collection>/<fr|en|ar>/*.md` | Le contenu : une fiche = un fichier Markdown avec un en-tête (titre, résumé, catégorie, GPS…). Le même nom de fichier dans `fr/`, `en/`, `ar/` relie les versions d'une fiche. |
| `src/content.config.ts` | Les champs autorisés pour chaque collection (lieux, experiences, evenements, pratique). |
| `src/i18n/ui.ts` | Les textes de l'interface dans les trois langues, et les segments d'URL par langue. |
| `src/pages/[lang]/` | Les gabarits : accueil, listes de rubrique, fiche. |
| `src/components/` | Header, Footer, Card, Map (Leaflet), SectionHeading. |
| `src/styles/global.css` | Palette, typographie, arc outrepassé. |
| `public/images/` | Images optimisées pour le web (1600 px max). Les originaux restent dans `../sources/`. |

## Ajouter une fiche

1. Copier un fichier existant de la bonne collection, par ex. `src/content/lieux/fr/ribat.md`.
2. Renommer (le nom devient l'URL : `grande-mosquee.md` → `/fr/decouvrir/grande-mosquee`).
3. Remplir l'en-tête et le texte. `featured: true` la fait apparaître sur l'accueil.
4. Pour la version anglaise, créer le fichier du même nom dans `en/`.

## Déploiement

Hébergé sur Vercel : chaque push sur `main` redéploie (commande `npm run build`). Domaine `www.visitsoussa.com`, DNS gérés chez OVH. La redirection `/` → `/fr/` est définie dans `astro.config.mjs` (`redirects`).

Le site est statique, sauf `/api/contact` ([src/pages/api/contact.ts](src/pages/api/contact.ts)) : une fonction Vercel qui reçoit le formulaire de contact et l'envoie par e-mail via Resend. Elle lit trois variables d'environnement, à définir dans Vercel → Settings → Environment Variables (voir `.env.example`) :

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Clé API Resend (secrète) |
| `CONTACT_TO` | Adresse(s) qui reçoivent les messages |
| `CONTACT_FROM` | Expéditeur ; par défaut `onboarding@resend.dev`, à remplacer par `contact@visitsoussa.com` une fois le domaine vérifié dans Resend |

Pour tester le formulaire en local : copier `.env.example` en `.env` et le remplir.
