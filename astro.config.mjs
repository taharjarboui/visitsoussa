// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.visitsoussa.com',
  // Tout le site reste statique ; seul /api/contact tourne côté serveur (fonction Vercel).
  adapter: vercel(),
  integrations: [sitemap()],
  // La racine renvoie vers la langue par défaut (redirection 302 côté Vercel).
  redirects: { '/': { status: 302, destination: '/fr/' } },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'ar'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
  // Variables lues à l'exécution par /api/contact. À définir dans Vercel (Settings → Environment Variables)
  // et, pour tester en local, dans un fichier .env (jamais commité).
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM: envField.string({ context: 'server', access: 'secret', default: 'Visit Soussa <onboarding@resend.dev>' }),
    },
  },
  vite: { plugins: [tailwindcss()] },
});
