// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://www.visitsoussa.com',
  // Tout le site reste statique ; seul /api/contact tourne côté serveur (Cloudflare Worker).
  // Photos servies telles quelles depuis public/ et pas de sessions : ni Cloudflare Images ni KV à provisionner.
  adapter: cloudflare({ imageService: 'passthrough' }),
  session: false,
  integrations: [sitemap()],
  // La racine renvoie vers la langue par défaut (redirection 302 côté Cloudflare).
  redirects: { '/': { status: 302, destination: '/fr/' } },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'ar'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
  // Variables lues à l'exécution par /api/contact. À définir dans Cloudflare (Worker → Settings → Variables and Secrets)
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
