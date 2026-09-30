import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import * as Localization from 'expo-localization';
import en from "../i18n/en.json"
import pt from "../i18n/pt.json"

const deviceLocale = Localization.getLocales()[0]?.languageCode ?? 'en';

i18n.use(initReactI18next).init(
{
    compatibilityJSON: 'v4',
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    lng: deviceLocale,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
export default i18n;