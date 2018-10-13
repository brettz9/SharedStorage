export const i18n = async function ({
  availableLocales: {
    defaultLocale = 'en-US',
    otherLocales = []
  },
  locales = navigator.languages || [navigator.language]
} = {
  availableLocales: {}
}) {
  const availableLocales = [defaultLocale, ...otherLocales];
  const localeName = locales.find((locale) => {
    return availableLocales.includes(locale);
  }) || defaultLocale;

  const result = await fetch(`_locales/${localeName}/messages.json`);
  const localeContent = await result.json();

  const _ = (key) => {
    return localeContent[key].message;
  };
  return _;
};
