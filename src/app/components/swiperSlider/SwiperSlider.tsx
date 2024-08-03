"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import onloadImg from "../../../assests/white_logo.png";
import Image from "next/image";
import Link from "next/link";

const SwiperSlider = () => {
  return (
    <section className="main-bg">
      <div className="page_width h-full">
        <div className="flex justify-center h-full p-10">
          <Image width={200} height={100} src={onloadImg} alt="onload img" />
        </div>
        <div className="">
          <button className="text-[#fff] bg-[#ded4c4] p-3 rounded-xl font-bold">Back</button>
        </div>
        <Swiper slidesPerView={1}>
          <SwiperSlide>
            <div className="text-center">
              <h1 className="text-white text-4xl font-semibold">Cereal Type</h1>
              <p className="text-white">Choose One</p>
              <div className="flex flex-wrap gap-3 pt-14">
                <div className="flex flex-col w-[48%]">
                  <img className="w-full" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
                <div className="flex flex-col w-[48%]">
                  <img className="" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
                <div className="flex flex-col w-[48%]">
                  <img className="" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
              </div>
            </div>
            {/* <img src="https://themewagon.github.io/delfood/images/slider-img3.png" alt="" /> */}
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              <h1 className="text-white text-4xl font-semibold">Cereal Type</h1>
              <p className="text-white">Choose One</p>
              <div className="flex flex-wrap gap-3 pt-14">
                <div className="flex flex-col w-[48%]">
                  <img className="w-full" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
                <div className="flex flex-col w-[48%]">
                  <img className="" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
                <div className="flex flex-col w-[48%]">
                  <img className="" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
              </div>
            </div>
            <Link href={"/online_ordering/category"}>
              <button className="bg-[#2F52A0] py-4 w-full text-white font-semibold text-xl">Next</button>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              <h1 className="text-white text-4xl font-semibold">Cereal Type</h1>
              <p className="text-white">Choose One</p>
              <div className="flex flex-wrap gap-3 pt-14">
                <div className="flex flex-col w-[48%]">
                  <img className="w-full" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
                <div className="flex flex-col w-[48%]">
                  <img className="" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
                <div className="flex flex-col w-[48%]">
                  <img className="" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
              </div>
            </div>
            <Link href={"/online_ordering/category"}>
              <button className="bg-[#2F52A0] py-4 w-full text-white font-semibold text-xl">Next</button>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              <h1 className="text-white text-4xl font-semibold">Cereal Type</h1>
              <p className="text-white">Choose One</p>
              <div className="flex flex-wrap gap-3 pt-14">
                <div className="flex flex-col w-[48%]">
                  <img className="w-full" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
                <div className="flex flex-col w-[48%]">
                  <img className="" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
                <div className="flex flex-col w-[48%]">
                  <img className="" src="https://static.vecteezy.com/system/resources/thumbnails/017/340/364/small_2x/white-cup-of-tea-png.png" alt="" />
                  <h1 className="text-black text-4xl font-semibold">Tea</h1>
                </div>
              </div>
            </div>
            <Link href={"/online_ordering/category"}>
              <button className="bg-[#2F52A0] py-4 w-full text-white font-semibold text-xl">Next</button>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default SwiperSlider;
