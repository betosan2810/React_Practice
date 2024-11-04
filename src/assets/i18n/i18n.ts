import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import vi from '../locales/vi.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi }
  },
  lng: 'en', // ngôn ngữ mặc định
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // react-i18next xử lý XSS cho bạn
  }
});

export default i18n;
