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

  function pregQuote (str) {
    // http://kevin.vanzonneveld.net
    // eslint-disable-next-line no-useless-escape
    return str.replace(/[.\\+*?[^\]$()\{\}=!<>|:-]/gu, '\\$&');
  }

  // Todo: Replace this with better formatter
  const _ = (key, formatObj) => {
    let {message} = localeContent[key];
    if (formatObj) {
      Object.entries(formatObj).forEach(([name, value]) => {
        message = message.replace(
          new RegExp(`\\{${pregQuote(name)}\\}`, 'gu'),
          value
        );
      });
    }
    return message;
  };
  return _;
};
