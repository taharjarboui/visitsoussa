import { getCollection, type CollectionKey, type CollectionEntry } from 'astro:content';
import { languages, type Lang, type SectionKey } from '../i18n/ui';
import { splitId, sectionUrl, homeUrl } from '../i18n/utils';

/** Entrées d'une collection pour une langue, triées par `order` puis titre. */
export async function entriesFor<C extends CollectionKey>(collection: C, lang: Lang) {
  const all = await getCollection(collection, (e) => splitId(e.id).lang === lang);
  return all.sort((a, b) => (a.data.order - b.data.order) || a.data.title.localeCompare(b.data.title));
}

/** Les URL d'une même fiche dans chaque langue où elle existe (pour hreflang et le sélecteur de langue). */
export async function ficheAlternates(collection: CollectionKey, section: SectionKey, slug: string) {
  const siblings = await getCollection(collection, (e) => splitId(e.id).slug === slug);
  const alternates: Partial<Record<Lang, string>> = {};
  for (const e of siblings) alternates[splitId(e.id).lang] = sectionUrl(splitId(e.id).lang, section, slug);
  return alternates;
}

export function sectionAlternates(section: SectionKey) {
  const alternates: Partial<Record<Lang, string>> = {};
  for (const l of Object.keys(languages) as Lang[]) alternates[l] = sectionUrl(l, section);
  return alternates;
}

export function homeAlternates() {
  const alternates: Partial<Record<Lang, string>> = {};
  for (const l of Object.keys(languages) as Lang[]) alternates[l] = homeUrl(l);
  return alternates;
}

export type Lieu = CollectionEntry<'lieux'>;
export type Experience = CollectionEntry<'experiences'>;
export type Evenement = CollectionEntry<'evenements'>;
