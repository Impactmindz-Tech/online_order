"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import location_imgs from "../../assests/test.png";
import alert_img from "../../assests/aleert.png";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
interface PlaceLocation {
  city: string;
  country: string;
  near_by: string;
  pincode: number;
  placename: string;
  state: string;
  town: string;
  id: string; // This will be added when fetching the document ID from Firestore
}

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
  const [places, setPlaces] = useState<PlaceLocation[]>([]);
  const { t } = useTranslation();
  const router = useRouter();
  const [lang, setLang] = useState(false);
  const [selectPosition, setSelectPosition] = useState(getFromLocalStorage("place") || null);
  const [showinput, setshowinput] = useState(false);
  const [inputvalue, setinputvalue] = useState(getFromLocalStorage("username") || null);
  let body = {
    Name: inputvalue,
    location: selectPosition,
  };

  const handleRoute = () => {
    if (getFromLocalStorage("place") == null && getFromLocalStorage("username") == null) {
      alert("Please select a location or enter your name");
    } else {
      router.push("/online_ordering/category");
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

  const handleInputText = (e: any) => {
    setInLocalStorage("location", body);
    setinputvalue(e.target.value);
    setInLocalStorage("username", e.target.value);
    removeFromLocalStorage("place");
  };

  useEffect(() => {
    const savedPlace = getFromLocalStorage("place");
    if (savedPlace) {
      removeFromLocalStorage("username");
      setinputvalue("");
      setshowinput(false);
    } else {
      const defaultUsername = getFromLocalStorage("username");
      setinputvalue(defaultUsername);
    }
  }, []);

  useEffect(() => {
    const username = getFromLocalStorage("username");
    setshowinput(!!username);
  }, []);

  useEffect(() => {
    if (getFromLocalStorage("place")) {
      setshowinput(false);
      setinputvalue("");
    }
  }, [selectPosition]);
  const fetchPlaces = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Places"));
      const placesList: PlaceLocation[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as PlaceLocation;
        return {
          ...data,
          id: doc.id,
        };
      });
      setPlaces(placesList); // Update the state with fetched places
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlaces();
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
            <div className="bg-[#ded4c4] text-center py-5 rounded-xl">
              <SearchComponent selectPosition={selectPosition} setSelectPosition={setSelectPosition} places={places} />
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
          <button className={`bg-[#2F52A0] py-4 w-full text-white font-semibold text-xl rounded-xl sm:text-sm sm:my-2  z-50 textShadow ${lang ? "rtl" : ""}`} onClick={handleRoute}>
            {t("Continue")}
          </button>
          {/* </Link> */}
        </div>
      </div>
    </section>
  );
};

export default OnlineOrdering;
