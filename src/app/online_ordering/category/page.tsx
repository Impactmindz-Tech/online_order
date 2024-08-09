"use client";

import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import CategoryModels from "@/app/modal/CategoryModels";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/Store";
import CheckIcon from "@mui/icons-material/Check";
import Loading from "@/app/components/loading/Loading";
import { useTranslation } from "react-i18next";
import { getFromLocalStorage, setInLocalStorage } from "@/app/utills/LocalStorageUtills";
import { useRouter } from "next/navigation";
import onloadImg from "../../../assests/white_logo.png";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const Category: React.FC = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<CategoryModels[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const cart = useSelector((state: RootState) => state.Product.cart);
  const products = useSelector((state: RootState) => state.Product.products);
  const savedLanguage = getFromLocalStorage("lang") || "en";
  const [lang, setLang] = useState(false);

  const mealTypeMapping: { [key: string]: string } = {
    "ארוחת בוקר": "breakfast",
    "ארוחת צהריים": "lunch",
    "אֲרוּחַת עֶרֶב": "dinner",
    завтрак: "breakfast",
    обед: "lunch",
    ужин: "dinner",
    breakfast: "breakfast",
    lunch: "lunch",
    dinner: "dinner",
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Mealsdemo"));
      const categoryList: CategoryModels[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<CategoryModels, "id">;
        return {
          ...data,
          id: doc.id,
        } as CategoryModels;
      });

      const translatedData: CategoryModels[] = categoryList.map((item) => ({
        ...item,
        Name: item.Name[i18n.language as any] || item.Name[savedLanguage as any] || "",
      }));
      setCategories(translatedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMealTypeFromId = (id: string): string => {
    const mealType = categories?.find((cat) => cat?.id === id)?.Name?.toLowerCase();
    return mealType || id;
  };

  const isCategoryComplete = (mealType: string) => {
    const mappedMealType = getMealTypeFromId(mealType);
    const englishMealType = mealTypeMapping[mappedMealType] || mappedMealType;
    const selectedProducts = cart?.[englishMealType as keyof typeof cart] || [];

    if (products?.length === 0) {
      return selectedProducts.length > 0;
    }

    const categoryProducts = products?.filter((product) => mealTypeMapping[product.meal.Name.toLowerCase()] === englishMealType);

    if (categoryProducts?.length === 0) {
      return selectedProducts?.length > 0;
    }

    const categories = Array.from(new Set(categoryProducts.map((product) => product.category)));
    const selectedCategories = Array.from(new Set(selectedProducts.map((product) => product.category)));

    const isComplete = categories?.length > 0 && categories.every((category) => selectedCategories.includes(category));

    return isComplete;
  };

  useEffect(() => {
    fetchCategory();
  }, [i18n.language, products, cart]);

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

  const handleNavigate = (item: CategoryModels) => {
    setInLocalStorage("categoryProduct", item?.Name);
    router.push("/online_ordering/products");
  };

  return (
    <>
      {loading && <Loading />}
      <section className="main-bg">
        <div className="page_width h-full">
          <div className="h-full">
            <div className="flex justify-center h-full p-10">
              <Link href={"/"}>
                {" "}
                <Image width={200} height={100} src={onloadImg} alt="onload img" />
              </Link>
            </div>
            <div className="flex  items-center justify-between">
              <Link href={"/online_ordering"} className={` ${lang ? "flex justify-end" : ""}`}>
                <button className={`text-[#fff] bg-[#ded4c4] p-3 rounded-xl font-bold ${lang ? "rtl" : ""}`}>{t("Back")}</button>
              </Link>
              <div className={`flex-1  font-bold text-white text-xl ${lang ? "rtl" : "text-center"}`}>
                <h1>{t("categoryList")}</h1>
              </div>
            </div>
            {categories?.map((item) => {
              const mealType = item.id;
              const isComplete = isCategoryComplete(mealType);
              return (
                <div className="flex flex-col gap-5 py-5" key={item?.id} data-aos="flip-right">
                  <div className="w-full h-[185px] relative cursor-pointer" onClick={() => handleNavigate(item)}>
                    <div className={`bg-[#00000083] absolute top-0 w-full h-full left-0 rounded-lg productShadow`}></div>
                    <Image className="object-cover w-full h-full rounded-lg " src={item?.ImageUrl} alt="category image" layout="fill" priority />
                    <p className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-xl  text-white font-bold ${lang ? "rtl" : ""} textShadows`}>{item?.Name} </p>
                    {isComplete && (
                      <div className="absolute top-0 left-0 w-full h-full bg-[#9efeb98a] flex items-center justify-center z-10 rounded-lg">
                        <CheckIcon style={{ fontSize: 80, color: "white" }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;