"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import onloadImg from "../../../assests/white_logo.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/Store";
import { ProductsModels } from "@/app/modal/ProductModels";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { useRouter } from "next/navigation";
import { resetCart } from "@/app/store/slice/ProductSlice";
import { getFromLocalStorage, removeFromLocalStorage } from "@/app/utills/LocalStorageUtills";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import AOS from "aos";
import "aos/dist/aos.css";

const ViewMeals: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [langText, setLangText] = useState<string | null>(null);
  const [lang, setLang] = useState(false);
  const [location, setLocation] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({
    Tomorrow: false,
    Week: false,
    Staying: false,
  });

  const mealData = useSelector((state: RootState) => state.Product.cart);

  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setSelectedOptions({
      Tomorrow: false,
      Week: false,
      Staying: false,
      [name]: true,
    });
  };

  // Handle form submission

  const handleSubmit = async () => {
    let locations: { Name: string; location: string | null };
    if (getFromLocalStorage("place")) {
      locations = {
        Name: "Null",
        location: JSON.parse(`${getFromLocalStorage("place")}`),
      };
    } else {
      locations = {
        Name: `${getFromLocalStorage("username")}`,
        location: null,
      };
    }

    try {
      await setDoc(doc(db, "Orders", Date.now().toString()), {
        schedule: selectedOptions,
        summary: mealData,
        location: locations,
      });
      router.push("/online_ordering/thankyou");
      dispatch(resetCart());
      removeFromLocalStorage("location");
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (localStorage?.getItem("lang")) {
      setLangText(localStorage.getItem("lang"));
    }
  }, []);

  useEffect(() => {
    if (getFromLocalStorage("lang") === "he") {
      setLang(true);
    } else {
      setLang(false);
    }
    if (getFromLocalStorage("place")) {
      let place = JSON.parse(getFromLocalStorage("place"));
      setLocation(place.placename);
    } else {
      setLocation(getFromLocalStorage("username"));
    }
  }, []);

  return (
    <section className="main-bg">
      <div className="page_width h-full" data-aos="fade-down">
        <div className="flex justify-center h-full p-10">
          <Link href={"/"}>
            <Image width={200} height={100} src={onloadImg} alt="onload img" />
          </Link>
        </div>
        <div className={`${lang ? "flex justify-end" : ""}`}>
          <Link href={"/online_ordering/category"}>
            <button className={`text-[#fff] bg-[#ded4c4] p-3 rounded-xl font-bold  ${lang ? "rtl" : ""}`}> {t("Back")}</button>
          </Link>
        </div>

        {mealData && Object.keys(mealData)?.length > 0 ? (
          Object.keys(mealData).map((mealType) => (
            <div key={mealType} className={`pt-5 capitalize font-semibold text-black ${lang ? "rtl" : ""}`}>
              {mealType === "breakfast" && <h1 className=" text-xl">{langText === '"ru"' ? "Завтрак" : langText === '"he"' ? "ארוחת בוקר" : "Breakfast"}</h1>}
              {mealType === "lunch" && <h1 className=" text-xl">{langText === '"ru"' ? "обед" : langText === '"he"' ? "ארוחת צהריים " : "lunch"}</h1>}
              {mealType === "dinner" && <h1 className=" text-xl">{langText === '"ru"' ? "ужин" : langText === '"he"' ? "אֲרוּחַת עֶרֶב" : "dinner"}</h1>}
              {mealData[mealType as keyof typeof mealData]?.length > 0 ? (
                mealData[mealType as keyof typeof mealData].map((item: ProductsModels) => (
                  <div key={item.id} className="pt-3">
                    <p className={`text-white  ${lang ? "rtl" : ""}`}>{item.Name}</p>
                  </div>
                ))
              ) : (
                <p className="text-white">No items available.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-white">No meals available.</p>
        )}

        <div className="pt-10 ">
          <h1 className={`bg-[#eadecf] p-3 pl-6 rounded-lg  ${lang ? "rtl" : ""}`}>{location}</h1>
          <div className="pt-5">
            <label className={`custom-checkbox ${lang ? "flex justify-end" : ""}`}>
              <input type="checkbox" name="Tomorrow" id="Tomorrow" checked={selectedOptions.Tomorrow} onChange={handleCheckboxChange} />
              <span className="checkmark"></span>
              <span className={`label-text  ${lang ? "rtl" : ""}`}> {t("Tomorrow")}</span>
            </label>
          </div>
          <div className="pt-5">
            <label className={`custom-checkbox ${lang ? "flex justify-end" : ""}`} htmlFor="Week">
              <input type="checkbox" name="Week" id="Week" checked={selectedOptions.Week} onChange={handleCheckboxChange} />
              <span className="checkmark"></span>
              <span className={`label-text  ${lang ? "rtl" : ""}`}> {t("TheRestofthisWeek")}</span>
            </label>
          </div>
          <div className="pt-5">
            <label className={`custom-checkbox ${lang ? "flex justify-end" : ""}`} htmlFor="Staying">
              <input type="checkbox" name="Staying" id="Staying" checked={selectedOptions.Staying} onChange={handleCheckboxChange} />
              <span className="checkmark"></span>
              <span className={`label-text  ${lang ? "rtl" : ""}`}> {t("AllMyStaying")}</span>
            </label>
          </div>

          <button className={`bg-[#5663ff] py-4 w-full text-white font-semibold text-xl mt-10 rounded-xl textShadow mb-2  ${lang ? "rtl" : ""}`} onClick={handleSubmit}>
            {t("ApproveandSendIt")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewMeals;
