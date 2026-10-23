# Déploiement sur Cloudflare

Le site est construit avec l'adaptateur `@astrojs/cloudflare` (branche `cloudflare`). Les pages sont statiques ; seule `/api/contact` tourne dans un Cloudflare Worker. Pas de KV ni de Cloudflare Images : `session: false` et `imageService: 'passthrough'` dans `astro.config.mjs`.

## 1. Créer le projet

Cloudflare → **Workers & Pages** → **Create** → **Import a repository** → `taharjarboui/visitsoussa`.

| Réglage | Valeur |
|---|---|
| Project name | `visit-soussa` (doit correspondre au `name` du `package.json`) |
| Production branch | `cloudflare` pour le test ; `main` une fois la branche fusionnée |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |
| Root directory | `/` |

La version de Node est fixée par `.node-version` (Astro 7 exige Node ≥ 22.23).

## 2. Variables du formulaire de contact

Projet → **Settings** → **Variables and Secrets**, type **Secret** :

- `RESEND_API_KEY` : clé Resend (idéalement une clé propre à ce site) ;
- `CONTACT_TO` : adresse(s) de réception, séparées par des virgules ;
- `CONTACT_FROM` : `Visit Soussa <noreply@visitsoussa.com>`.

Relancer un déploiement après les avoir ajoutées.

## 3. Tester sur l'adresse `*.workers.dev`

Avant de toucher au DNS : accueil, `/` → `/fr/`, une fiche, la page « Sousse au fil du temps », les trois langues, une 404, et un vrai envoi du formulaire.

## 4. Basculer le domaine

Un domaine personnalisé sur un Worker exige que le DNS soit géré par Cloudflare. Le domaine reste enregistré (et payé) chez OVH ; seuls les serveurs DNS changent.

1. Cloudflare → **Add a domain** → `visitsoussa.com`, offre Free. Cloudflare importe les enregistrements existants : vérifier que les enregistrements Resend (`resend._domainkey`, `send`, `_dmarc`) et les éventuels MX sont bien repris, sinon l'envoi d'e-mails casse.
2. Chez OVH → domaine → **Serveurs DNS** → remplacer par les deux serveurs indiqués par Cloudflare. Propagation : de quelques minutes à 24 h.
3. Fusionner `cloudflare` dans `main`, puis régler la Production branch sur `main`.
4. Projet → **Settings** → **Domains & Routes** → ajouter `www.visitsoussa.com` et `visitsoussa.com` (Cloudflare remplace les enregistrements Vercel).
5. Redirection `visitsoussa.com` → `www` : règle **Rules → Redirect Rules** (aujourd'hui faite par Vercel).
6. Une fois le site servi par Cloudflare, déconnecter le projet Vercel pour éviter deux déploiements.
