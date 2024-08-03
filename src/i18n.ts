import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Back: "Back",
        welcome: "Hello, welcome",
        choose: "Choose One",
      },
    },
    he: {
      translation: {
        Back: "वापस जाओ",
        welcome: "नमस्ते, स्वागत है",
        choose: "एक का चयन करें",
      },
    },
    ru: {
      translation: {
        Back: "خلف",
        welcome: "مرحبًا، أهلا بك",
        choose: "اختر واحدًا",
      },
    },
  },
  lng: savedLanguage, // Set the initial language from localStorage
  fallbackLng: savedLanguage,
  interpolation: {
    escapeValue: false, // React already safes from XSS
  },
});

export default i18n;
