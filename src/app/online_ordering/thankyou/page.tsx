"use client";
import React, { useEffect, useState } from "react";
import onloadImg from "../../../assests/Screenshot 2024-07-26 101943.png";
import complete from "../../../assests/complete.png";
import Image from "next/image";
import Link from "next/link";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import AOS from "aos";
import "aos/dist/aos.css";
import { getFromLocalStorage } from "@/app/utills/LocalStorageUtills";
const Thankyou = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState(false);

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
      <div className="page_width h-full">
        <div className="flex flex-col justify-between h-full" data-aos="fade-down">
          <div className="mt-4 h-full">
            <Link href={"/"}>
              {" "}
              <Image className="mx-auto" width={200} height={1080} src={onloadImg} alt="onload img" />
            </Link>

            <div className="pt-10 h-full flex   items-center justify-center sm:pt-4 relative z-40">
              <h1 className={`text-[#2F52A0] text-2xl font-bold absolute top-[30vh] left-0 w-full sm:top-[20vh] ${lang ? "rtl" : "text-center"}`}>{t("orderSuccess")}</h1>
              <Image className="mx-auto  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" width={200} height={1080} src={complete} alt="onload img" />
            </div>
          </div>
          <div className="z-50">
            <Link href={"/"} className="pt-8">
              <button className={`bg-[#2F52A0] z-50 py-4 w-full text-white font-semibold text-xl rounded-xl textShadow mb-2  ${lang ? "rtl" : ""}`}>{t("Home")}</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Thankyou;
