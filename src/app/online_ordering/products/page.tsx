"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import onloadImg from "../../../assests/white_logo.png";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, addProduct, addToCart } from "@/app/store/slice/ProductSlice";
import CheckIcon from "@mui/icons-material/Check";
import { RootState } from "@/app/store/Store";
import { ProductsModels } from "@/app/modal/ProductModels";
import Link from "next/link";
import Loading from "@/app/components/loading/Loading";
import { useTranslation } from "react-i18next";
import "swiper/css/navigation";
import { getFromLocalStorage, setInLocalStorage } from "@/app/utills/LocalStorageUtills";
import "../../../i18n";
// import "swiper/css";

interface TranslatedCategory {
  Name: Record<string, string>;
  Category: Record<string, string>;
  id: string;
}

interface TranslatedProduct {
  Name: Record<string, string>;
  category: Record<string, string>;
  meal: Record<string, string>;
  id: string;
  ImageUrl: string;
}

type MealType = "breakfast" | "lunch" | "dinner";

interface SwiperSliderProps {
  params: { id: string };
}

const SwiperSlider: React.FC<SwiperSliderProps> = ({ params }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [categorySelection, setCategorySelection] = useState<Record<string, boolean>>({});
  const category = useSelector((state: RootState) => state.Product.category);
  const product = useSelector((state: RootState) => state.Product.products);
  const cart = useSelector((state: RootState) => state.Product.cart);
  const [swiper, setSwiper] = useState<any>(null);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const savedLanguage: any = getFromLocalStorage("lang") || "en";

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Categorydemo"));
      const categoryList: TranslatedCategory[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as TranslatedCategory;
        return {
          ...data,
          id: doc.id,
        };
      });

      const translatedData: any = categoryList.map((item) => ({
        ...item,
        Name: item.Name[i18n.language] || item.Name[savedLanguage as string] || "",
        Category: item.Category[i18n.language] || item.Category[savedLanguage as string] || "",
      }));

      dispatch(addCategory(translatedData));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Productsdemo"));
      const productList: TranslatedProduct[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as TranslatedProduct;
        return {
          ...data,
          id: doc.id,
        };
      });

      const translatedData: any = productList.map((item) => ({
        ...item,
        Name: item.Name[i18n.language] || item.Name[savedLanguage as string] || item.Name || "",
        category: item.category[i18n.language] || item.category[savedLanguage as string] || item.category || "",
        // meal: item.meal[i18n.language] || item.meal[savedLanguage as string] || item.meal || "",
      }));

      dispatch(addProduct(translatedData));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: ProductsModels) => {
    const mealType: MealType = product.meal.Name.toLowerCase() as MealType;
    dispatch(addToCart(product));
    setCategorySelection((prev) => {
      const updatedSelection = {
        ...prev,
        [product.category]: true,
      };
      setInLocalStorage("categorySelection", JSON.stringify(updatedSelection));
      return updatedSelection;
    });
  };

  const allCategoriesSelected = () => {
    const categorySet = new Set(category.map((cat) => cat.Name));
    console.log(category);
    const selectedSet = new Set(Object.keys(categorySelection));
    return categorySet.size === selectedSet.size;
  };

  const handleSlideChange = () => {
    if (swiper) {
      setIsLastSlide(swiper.activeIndex === swiper.slides.length - 1);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProduct();
    const storedSelection = getFromLocalStorage("categorySelection");
    if (storedSelection) {
      setCategorySelection(JSON.parse(storedSelection));
    }
  }, [i18n.language]);

  return (
    <>
      {loading && <Loading />}
      <section className="main-bg">
        <div className="page_width h-full">
          <div className="flex justify-center h-full p-10">
            <Image width={200} height={100} src={onloadImg} alt="onload img" />
          </div>

          <Swiper autoHeight={true} modules={[Pagination, Navigation]} navigation={true} pagination={{ clickable: true }} slidesPerView={1} onSwiper={(swiperInstance) => setSwiper(swiperInstance)} onSlideChange={handleSlideChange}>
            {category
              ?.filter((cat) => cat?.Category == getFromLocalStorage("categoryProduct"))
              .map((item) => {
                return (
                  <div className="mt-14">
                    <SwiperSlide key={`${item?.id}-cat`}>
                      <div className="text-center mt-10">
                        <h1 className="text-white text-4xl font-semibold">{item?.Name}</h1>
                        <p className="text-white">{t("choose")}</p>
                        <div className="flex flex-wrap gap-3">
                          {product
                            ?.filter((pro: ProductsModels) => pro.category == item?.Name)
                            .map((prodctItem: ProductsModels) => {
                              const mealType: MealType = prodctItem.meal.Name?.toLowerCase() as MealType;

                              const isActive = cart[mealType]?.some((cartItem: ProductsModels) => cartItem.id == prodctItem.id) ?? false;

                              return (
                                <div key={`${prodctItem?.id}-pro`} className={`flex flex-col w-[48%] cursor-pointer relative`} onClick={() => handleAddToCart(prodctItem)}>
                                  {isActive && (
                                    <div className="w-full h-full bg-[#9efeb98a] absolute flex items-center justify-center">
                                      <CheckIcon sx={{ width: "100px", fontSize: "80px", fill: "white" }} />
                                    </div>
                                  )}
                                  <Image width={349} height={50} className="w-[349px] h-[132px] object-cover" src={prodctItem?.ImageUrl} alt="" />
                                  <h1 className="text-black text-xl mt-4 font-semibold">{prodctItem?.Name}</h1>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </SwiperSlide>
                  </div>
                );
              })}
          </Swiper>
          {isLastSlide && (
            <div className="bg-[#2f52a0] p-4 mt-5">
              {allCategoriesSelected() ? (
                <Link href={"/online_ordering/summery"}>
                  <button className="w-full  text-center">{t("Order")}</button>
                </Link>
              ) : (
                <Link href={"/online_ordering/category"}>
                  <button className="w-full  text-center">{t("Next")}</button>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SwiperSlider;
