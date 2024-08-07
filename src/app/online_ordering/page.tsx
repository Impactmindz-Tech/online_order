"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import location_imgs from "../../assests/test.png";
import alert_img from "../../assests/aleert.png";
import onloadImg from "../../assests/white_logo.png";
import SearchComponent from "../components/SearchComponent/SearchComponent";
import { getFromLocalStorage, removeFromLocalStorage, setInLocalStorage } from "../utills/LocalStorageUtills";
// import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../i18n";
import AOS from "aos";
import "aos/dist/aos.css";

const OnlineOrdering: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [lang, setLang] = useState(false);
  const [selectPosition, setSelectPosition] = useState<any>(null);
  const [showinput, setshowinput] = useState(false);
  const [inputvalue, setinputvalue] = useState("");
  let body = {
    Name: inputvalue,
    location: selectPosition,
  };

  const handleRoute = () => {
    if (selectPosition || inputvalue.trim() !== "") {
      router.push("/online_ordering/category");
    } else {
      alert("Please select a location or enter your name");
    }
  };
  useEffect(() => {
    if (getFromLocalStorage("lang") === "he") {
      setLang(true);
    } else {
      setLang(false);
    }
  }, [getFromLocalStorage("lang")]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  const handleInputText = (e) => {
    setInLocalStorage("location", body);

    setinputvalue(e.target.value);
    setInLocalStorage("username", e.target.value);
    removeFromLocalStorage("place");
  };

  useEffect(() => {
    let defaultUsername = getFromLocalStorage("username");
    setinputvalue(defaultUsername);
  }, []);
  return (
    <section className="main-bg">
      <div className="page_width">
        <div data-aos="fade-right">
          <div className="flex justify-center h-full p-10 sm:p-4">
            <Link href={"/"}>
              {" "}
              <Image width={200} height={100} src={onloadImg} alt="onload img" />
            </Link>
          </div>

          <div className="" data-aos="fade-down">
            <h1 className={`text-[#fff] text-4xl font-bold textShadow sm:text-sm ${lang ? "rtl" : ""}`}>{t("sowhere")}</h1>
          </div>
          <div className="text-center pt-14 sm:pt-2">
            <div className="text-center flex justify-center">
              <Image width={100} height={100} src={alert_img} alt="onload img" />
            </div>
            <div className="bg-[#ded4c4] text-center pt-5 rounded-xl">
              <SearchComponent selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
            </div>
            <p role="button" className={`text-[#5663FF] text-xl font-bold text-center pt-3 sm:text-sm  ${lang ? "rtl" : ""}`} onClick={() => setshowinput(!showinput)}>
              {t("IRatherusemyName")}
            </p>
            {showinput && <input type="text" value={inputvalue} placeholder={t("AutoCompleteInput")} className={`p-3  sm:text-sm outline-none bg-[#ded4c4] border border-[#aba397] w-[96%] m-auto text-black rounded-lg mt-2 ${lang ? "rtl" : ""} sm:w-full `} onChange={handleInputText} />}
          </div>
          <div className="flex justify-center py-8 pt-32 sm:pt-8">
            <Image width={200} height={200} src={location_imgs} alt="onload img" className="mx-auto sm:m-0 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" priority />
          </div>
          {/* <Link href={"/online_ordering/category"}> */}
          <button className={`bg-[#2F52A0] py-4 w-full text-white font-semibold text-xl rounded-xl sm:text-sm sm:my-2 textShadow ${lang ? "rtl" : ""}`} onClick={handleRoute}>
            {t("Continue")}
          </button>
          {/* </Link> */}
        </div>
      </div>
    </section>
  );
};

export default OnlineOrdering;
