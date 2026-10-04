// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://visitsoussa.com',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'ar'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
  vite: { plugins: [tailwindcss()] },
});
