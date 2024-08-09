"use client";
import Image from "next/legacy/image";
import React, { useState, useEffect } from "react";
import ProgressBar from "react-progressbar";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 0; // Reset to 0% when reaching 100%
        }
        return prevProgress + 1; // Increment the progress value
      });
    }, 50); // Adjust this value to change the speed of the animation

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="h-screen bg-white fixed w-full top-0 left-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <Image src="/loader.png" alt="Logo" className="mb-4" width={60} height={40} />
        <div className="w-64 my-5">
          <ProgressBar
            completed={progress}
           // bgColor="#2e519e" // Updated color
            height="6px" // Change the height of the progress bar
          //  isLabelVisible={true} // Display percentage label
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
