"use client";
import React  from "react";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { getFromLocalStorage, removeFromLocalStorage, setInLocalStorage } from "../utills/LocalStorageUtills";
import { useEffect } from "react";
const Multilangage: React.FC = () => {
  const { t, i18n } = useTranslation();

  // TypeScript type for the event
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setInLocalStorage('lang', selectedLanguage); // Store the selected language in localStorage
    i18n.changeLanguage(selectedLanguage); // Change the language in i18n
  };

  useEffect(() => {
    const savedLanguage = getFromLocalStorage('lang') || 'en';
    i18n.changeLanguage(savedLanguage);
    localStorage.clear();
  }, []);
  return (
    <div className="absolute right-5 top-5 p-2 rounded-lg shadow-lg border border-gray-300">
    <select
      value={i18n.language}
      onChange={changeLanguage}
      aria-label="Select Language"
      className="p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="en">English</option>
      <option value="he">Hebrew</option>
      <option value="ru">Russian</option>
    </select>
  </div>
  );
};

export default Multilangage;
