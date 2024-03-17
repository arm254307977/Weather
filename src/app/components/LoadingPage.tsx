"use client";
import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
// Framer motion
import { motion } from "framer-motion";

// Function
import * as functionFramerMotion from "@/app/function/motion";

type Props = {};

const LoadingPage = (props: Props) => {
  return (
    <motion.div
      {...functionFramerMotion.changeCountry}
      className="h-screen flex flex-col absolute inset-0 z-10 bg-gray-600/40 items-center justify-center"
    >
      <div>
        <Player
          autoplay
          loop
          speed={2.5}
          className="opacity-60 w-64 drop-shadow-md"
          src="https://lottie.host/7e2ffe30-3c25-45f7-8914-4e9fe54869fb/lpQWHZTrAY.json"
        />
      </div>
      <div className="mt-[-1.5rem]">
        <Player
          autoplay
          loop
          className="opacity-60 w-32 drop-shadow-md"
          src="https://lottie.host/910c7169-b01f-4750-8312-0ccdb59f7ce4/b0A7Kw9ARH.json"
        />
      </div>
    </motion.div>
  );
};

export default LoadingPage;
