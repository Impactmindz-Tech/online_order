import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getFromLocalStorage } from "./app/utills/LocalStorageUtills";

const savedLanguage = getFromLocalStorage("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcomeHeading: "Welcome, To Our Meals Ordering System",
        buildOffer: "Build and Order you own meals",
        Lets_Start: "Let’s Start",
        AutoComplete: "Select location",
        IRatherusemyName: "I Rather use my Name",
        sowhere: "So Where Are you at?",
        Continue: "Continue",
        Back: "Back",
        welcome: "Hello, welcome",
        choose: "Choose One",
        Order: "Order",
        Next: "Next",
        Tomorrow: "Tomorrow",
        AutoCompleteInput: "Enter the Name",
        TheRestofthisWeek: "The Rest of this Week",
        AllMyStaying: "All My Staying",
        ApproveandSendIt: "Approve and Send It",
        Home: "Home",
        location: "The Location",
        categoryList: "Category List",
        orderSuccess: "Order placed Successfully",
        nextBtn: "Next Slide",
      },
    },
    he: {
      translation: {
        welcomeHeading: "ברוכים הבאים, למערכת הזמנת הארוחות שלנו",
        buildOffer: "בנה והזמין ארוחות משלך",
        sowhere: "אז איפה אתה?",
        Continue: "לְהַמשִׁיך",
        AutoComplete: "תבחר מיקום",
        Lets_Start: "Давайте начнем",
        IRatherusemyName: "אני מעדיף להשתמש בשם שלי",
        Back: "חזור",
        welcome: "नमस्ते, स्वागत है",
        choose: "תבחר אחד",
        Next: "הַבָּא",
        Order: "להזמין",
        AutoCompleteInput: "הזן את השם",
        Tomorrow: "מָחָר",
        TheRestofthisWeek: "שאר השבוע",
        AllMyStaying: "כל השהות שלי",
        ApproveandSendIt: "אשר ושלח אותו",
        Home: "בית",
        location: "המיקום",
        categoryList: "רשימת קטגוריות",
        orderSuccess: "ההזמנה בוצעה בהצלחה",
        nextBtn: "השקופית הבאה",
      },
    },
    ru: {
      translation: {
        welcomeHeading: "Джон Джонс Сейсон и его сын Сэнсэй.",
        buildOffer: "Создавайте и заказывайте себе еду",
        sowhere: "Итак, где ты?",
        Continue: "Продолжать",
        AutoComplete: "выберите местоположение",
        Lets_Start: "Давайте начнем",
        IRatherusemyName: "Я предпочитаю использовать свое имя",
        Back: "خلف",
        welcome: "مرحبًا، أهلا بك",
        choose: "Выбери один",
        Order: "Заказ",
        Next: "Следующий",
        AutoCompleteInput: "Введите имя",
        Tomorrow: "Завтра",
        TheRestofthisWeek: "Остаток этой недели",
        AllMyStaying: "Все мое пребывание",
        ApproveandSendIt: "Одобрить и отправить",
        Home: "Дом",
        location: "Местонахождение",
        categoryList: "Список категорий",
        orderSuccess: "Заказ успешно размещен",
        nextBtn: "Следующий слайд",
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
