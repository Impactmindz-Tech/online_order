"use client";
import React, { useEffect, useState } from "react";
import onloadImg from "../../assests/Screenshot 2024-07-26 101943.png";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "../../i18n";
import AOS from "aos";
import "aos/dist/aos.css";
import { getFromLocalStorage } from "../utills/LocalStorageUtills";

const Onload = () => {
  const [lang, setLang] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);
  useEffect(() => {
    if (getFromLocalStorage("lang") === "he") {
      setLang(true);
    } else {
      setLang(false);
    }
  }, [getFromLocalStorage("lang")]);

  return (
    <section className="hero_section">
      <div className="page_width h-full" data-aos="fade-down">
        <div className="flex flex-col justify-between h-full pb-2">
          <div className="mt-4">
            <Link href={"/"}>
              <Image className="mx-auto sm:m-0 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" width={200} height={1080} src={onloadImg} alt="onload img" />
            </Link>
            <div className="pt-10">
              <h1 className={`text-[#2F52A0] text-4xl font-bold titleHeading ${lang ? "rtl   " : ""}`}>{t("welcomeHeading")}</h1>
            </div>
          </div>
          <div>
            <h2 className={`text-white font-medium text-center pb-4 textShadow ${lang ? "rtl" : ""}`}>{t("buildOffer")}</h2>
            <Link href={"/online_ordering"} className="pt-8">
              <button className={`bg-[#2F52A0] py-4 w-full text-white font-semibold text-xl rounded-xl textShadow ${lang ? "rtl" : ""}`}>{t("Lets_Start")}</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Onload;
