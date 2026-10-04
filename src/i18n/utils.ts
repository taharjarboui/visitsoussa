import { ui, defaultLang, rtlLangs, sections, languages, type Lang, type UiKey, type SectionKey } from './ui';

export function isLang(value: string | undefined): value is Lang {
  return value !== undefined && value in languages;
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  return isLang(lang) ? lang : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function isRtl(lang: Lang) {
  return rtlLangs.includes(lang);
}

/** URL d'une section ("/fr/decouvrir") ou d'une fiche ("/fr/decouvrir/ribat"). */
export function sectionUrl(lang: Lang, section: SectionKey, slug?: string) {
  const base = `/${lang}/${sections[section].path[lang]}`;
  return slug ? `${base}/${slug}` : base;
}

export function homeUrl(lang: Lang) {
  return `/${lang}/`;
}

/** Retrouve la section à partir d'un segment d'URL dans une langue donnée. */
export function sectionFromPath(lang: Lang, segment: string): SectionKey | undefined {
  return (Object.keys(sections) as SectionKey[]).find((k) => sections[k].path[lang] === segment);
}

/** Sépare "fr/ribat" en { lang, slug }. */
export function splitId(id: string): { lang: Lang; slug: string } {
  const [lang, ...rest] = id.split('/');
  return { lang: isLang(lang) ? lang : defaultLang, slug: rest.join('/') };
}

export function formatDate(date: Date, lang: Lang) {
  const locale = lang === 'ar' ? 'ar-TN' : lang === 'en' ? 'en-GB' : 'fr-FR';
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}
