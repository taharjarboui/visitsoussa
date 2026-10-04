# Visit Soussa — consignes pour Claude Code

Site vitrine pour promouvoir Sousse (Tunisie) auprès des touristes. Objectif : donner envie de venir et faciliter le séjour.

## Rôle attendu
Développeur full-stack **et** copywriter touristique. Les textes doivent être précis (dates, lieux vérifiés), chaleureux, sans superlatifs creux. En cas de doute sur un fait historique, le signaler avec « (à confirmer) » plutôt que d'inventer.

## Stack
Astro (statique) + Tailwind CSS v4 (tokens dans `src/styles/global.css`, pas de `tailwind.config`) + Leaflet/OSM. Pas de framework UI (pas de React) sauf besoin réel. Contenu en Markdown dans `src/content/`, validé par `src/content.config.ts`.

## Multilingue
Trois langues : `fr` (défaut), `en`, `ar` (RTL). Tout texte d'interface passe par `src/i18n/ui.ts`, jamais en dur dans les composants. Les URL sont préfixées par la langue (`/fr/…`) ; les segments de rubrique sont définis dans `sections` de `ui.ts`. Utiliser les propriétés logiques CSS (`ps-`, `ms-`, `start-`) pour que l'arabe fonctionne.

## Design
Palette « Méditerranée sousienne » tirée du logo et des portes de la médina : sarcelle `mer-700` (principal), soleil `soleil-500` (appels à l'action), sable, fond chaux. Titres en Fraunces, corps en Figtree, arabe en Noto Naskh Arabic. Signature visuelle : l'arc outrepassé (`.arch`, `.arch-sm`) sur les photos. Pas de cartes à ombre grise, pas d'étiquettes en capitales, pas d'animations d'apparition.

## Conventions
- Une fiche = un fichier `src/content/<collection>/<lang>/<slug>.md` ; même slug dans chaque langue.
- Images dans `public/images/`, 1600 px max, JPEG ou WebP. Les originaux sont dans `../sources/` (hors dépôt).
- Vérifier `npm run build` avant de livrer.
- Chaque fiche lieu/événement génère du JSON-LD Schema.org (voir `[slug].astro`).

## Prochaines étapes connues
Photos haute résolution à fournir, rubrique Manger & boire, CMS Sanity (plus tard), déploiement Cloudflare Pages, formulaire de contact.

## État du projet (4 octobre 2026)

Le squelette a été créé dans une session Claude (chat) puis déposé ici. Ce qui existe et fonctionne (`npm run build` passe, 45 pages) :
- Accueil, 4 rubriques, gabarit de fiche, 404, sélecteur de langue, hreflang, sitemap, JSON-LD.
- 19 fiches FR (9 lieux, 4 expériences, 3 événements, 3 pratiques), 6 EN, 3 AR. Beaucoup de champs sont marqués « (à confirmer) » : horaires, tarifs, dates de festivals.
- 4 photos basse résolution dans `public/images/` (kobba, boujaafar, oliviers, remparts) : des placeholders, à remplacer par des photos haute résolution.
- Dépôt Git : https://github.com/taharjarboui/visitsoussa (branche `main`).
- Pas encore : déploiement, CMS, rubrique « Manger & boire », formulaire de contact, analytics.

## Décisions prises
- WordPress abandonné (v1 trop lente à construire). Hébergement cible : Cloudflare Pages, OVH gardé pour le domaine seulement.
- Contenu en Markdown d'abord ; Sanity (CMS headless) plus tard, quand un contributeur non technique devra publier. Les gabarits passent par les collections Astro, donc la bascule ne touchera que `content.config.ts`.
- Références : organisation inspirée de visitdubai.com/fr, composants inspirés du thème GoTravel, identité visuelle tirée de la médina (portes bleues de Sidi Bouraoui) et du logo.
- Les associations (ESS, Tennis Club, Réseau Entreprendre…) vont dans le pied de page comme partenaires, pas dans le menu principal.

## Prochaines étapes, dans l'ordre
1. ~~`git init`, premier commit, dépôt GitHub~~ : fait le 4 octobre 2026 (`taharjarboui/visitsoussa`).
2. Connecter Cloudflare Pages (build `npm run build`, dossier `dist/`) pour une première URL.
3. Vérifier et compléter les fiches FR (horaires, tarifs, dates), puis les traductions EN/AR.
4. Photos haute résolution (2000 px min), WebP, dans `public/images/`.
5. Rubrique « Manger & boire » (nouvelle collection `restaurants` ou extension de `experiences`).
6. Formulaire de contact (Netlify Forms / Formspree), Plausible, puis Sanity.

## Matériaux hors dépôt
`../sources/` contient le site map, la mindmap, les docx d'origine, les logos et les photos originales. Ne pas les copier dans le dépôt.
