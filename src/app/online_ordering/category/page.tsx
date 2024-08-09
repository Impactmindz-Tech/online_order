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
  const [loading, setLoading] = useState<boolean>(true);
  const cart = useSelector((state: RootState) => state.Product.cart);
  const products = useSelector((state: RootState) => state.Product.products);
  const savedLanguage = typeof window !== "undefined" ? getFromLocalStorage("lang") || "en" : "en";
  const [lang, setLang] = useState<boolean>(false);

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
      console.error("Error fetching categories:", error);
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
      return selectedProducts?.length > 0;
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
    if (savedLanguage === "he") {
      setLang(true);
    } else {
      setLang(false);
    }
  }, [savedLanguage]);

  const handleNavigate = (item: CategoryModels) => {
    setInLocalStorage("categoryProduct", item?.Name);
    router.push("/online_ordering/products");
  };

  return (
    <>
      {loading && <Loading />}
      <section className="main-bg">
        
      </section>
    </>
  );
};

export default Category;
