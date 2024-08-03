"use client"
import React, { useEffect, useState } from "react";
import onloadImg from "../../assests/Screenshot 2024-07-26 101943.png";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "../../i18n";

const Onload = () => {
  const { t } = useTranslation();
  return (
    <section className="hero_section">
      <div className="page_width h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="mt-4">
            <Image className="mx-auto" width={200} height={1080} src={onloadImg} alt="onload img" />
            <div className="pt-10">
              <h1 className="text-[#2F52A0] text-4xl font-bold">{t("welcomeHeading")}</h1>
            </div>
          </div>
          <div>
            <h2 className="text-[#2F52A0] font-medium text-center">{t("buildOffer")}</h2>
            <Link href={"/online_ordering"} className="pt-8">
              <button className="bg-[#2F52A0] py-4 w-full text-white font-semibold text-xl">{t("Lets_Start")}</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Onload;
