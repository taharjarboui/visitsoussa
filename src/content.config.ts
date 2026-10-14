import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Chaque collection est rangée par langue : src/content/<collection>/<fr|en|ar>/<slug>.md
// L'identifiant d'une entrée est donc "fr/ribat", "en/ribat", etc.

const lieux = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lieux' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['patrimoine', 'religieux', 'musee', 'plage', 'quartier', 'nature']),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().optional(),
    hours: z.string().optional(),
    price: z.string().optional(),
    duration: z.string().optional(),
    unesco: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiences' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['balade', 'plage', 'gastronomie', 'famille', 'shopping', 'culture', 'sport']),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    duration: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const evenements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/evenements' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    dateStart: z.coerce.date().optional(),
    dateEnd: z.coerce.date().optional(),
    period: z.string().optional(), // ex. "Chaque été, juillet–août" quand les dates ne sont pas fixées
    place: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    website: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const pratique = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pratique' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.enum(['route', 'map', 'book', 'car', 'phone', 'sun']).default('book'),
    order: z.number().default(100),
  }),
});

// Rubrique « Sousse Business » : informations pour les professionnels (hors menu principal).
const business = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/business' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['investir', 'congres', 'travailler', 'reseau']),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    address: z.string().optional(),
    website: z.string().url().optional(),
    order: z.number().default(100),
  }),
});

// « Sousse au fil du temps » : un lieu par fichier, avec sa série de photos de la plus ancienne à la plus récente.
// Une photo n'est publiée qu'avec une source (credit) et une licence vérifiées.
const memoire = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/memoire' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    lat: z.number(),
    lng: z.number(),
    lieu: z.string().optional(), // slug de la fiche lieu liée
    order: z.number().default(100),
    photos: z.array(z.object({
      src: z.string(),
      date: z.string(), // libellé affiché, ex. "Vers 1905"
      year: z.number(), // sert à l'ordre de la série
      legende: z.string(),
      credit: z.string(),
      licence: z.string(),
    })).min(1),
  }),
});

// La frise « Histoire de Sousse » (/fr/decouvrir/histoire) : une entrée par période.
const histoire = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/histoire' }),
  schema: z.object({
    title: z.string(),
    period: z.string(), // libellé affiché, ex. "IXe siècle av. J.-C."
    year: z.number(), // année de début, négative avant J.-C. ; sert à l'ordre de la frise
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    lieux: z.array(z.string()).default([]), // slugs des fiches lieux liées
  }),
});

export const collections = { lieux, experiences, evenements, pratique, histoire, business, memoire };
