import React from "react";
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen bg-[#00000063] fixed w-full top-0 left-0 flex items-center justify-center z-10">
      <FadeLoader />
    </div>
  );
};

export default Loading;
