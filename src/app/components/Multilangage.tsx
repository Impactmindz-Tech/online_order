"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { getFromLocalStorage, removeFromLocalStorage, setInLocalStorage } from "../utills/LocalStorageUtills";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../store/slice/ProductSlice";

import AOS from "aos";
import "aos/dist/aos.css";

const Multilangage: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<string | null>(null);
  // TypeScript type for the event
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setInLocalStorage("lang", selectedLanguage); // Store the selected language in localStorage
    i18n.changeLanguage(selectedLanguage); // Change the language in i18n
  };

  useEffect(() => {
    const savedLanguage = getFromLocalStorage("lang") || "en";
    i18n.changeLanguage(savedLanguage);
    dispatch(resetCart());
    localStorage.removeItem("location");
    localStorage.removeItem("categoryProduct");
    localStorage.removeItem("cartBreakfast");
    localStorage.removeItem("cartLunch");
    localStorage.removeItem("categorySelection");
    localStorage.removeItem("cartDinner");
    localStorage.removeItem("categorySelection");
  }, []);

  useEffect(() => {
    if (localStorage?.getItem("lang")) {
      setLang(localStorage.getItem("lang"));
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      once: true, // Trigger animation only once
    });
  }, []);

  return (
    <div className="absolute right-5 top-5 p-2 rounded-lg shadow-lg border border-gray-300 sm:right-2 sm:p-0 sm:top-4" data-aos="fade-down">
      <select value={i18n.language} onChange={changeLanguage} aria-label="Select Language" className="p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:p-1">
        <option value="en" defaultChecked={lang === '"en"' ? true : false}>
          English
        </option>
        <option value="he" defaultChecked={lang === '"he"' ? true : false}>
          עִברִית
        </option>
        <option value="ru" defaultChecked={lang === '"ru"' ? true : false}>
          Русский
        </option>
      </select>
    </div>
  );
};

export default Multilangage;
