import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/translation.json';
import arTranslations from './locales/ar/translation.json';

const initI18next = (lng: string = 'en') => {
  const i18nInstance = createInstance();
  i18nInstance.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    lng,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
  return i18nInstance;
};

export default initI18next;
