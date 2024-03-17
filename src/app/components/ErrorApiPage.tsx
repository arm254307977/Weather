"use client";
import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import iconNotFoundPage from "@/app/assets/json/iconPageNotFound.json";

// Framer motion
import { motion } from "framer-motion";

// Function
import * as functionFramerMotion from "@/app/function/motion";

type Props = {};

const ErrorApiPage = (props: Props) => {
  return (
    <motion.div
      {...functionFramerMotion.changeCountry}
      className="my-8 md:my-20 mx-6 flex flex-col justify-center items-center"
    >
      <header className="drop-shadow-md max-w-2xl text-center mb-5">
        <h1 className="text-md md:text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          No matching locations found
        </h1>
        <p className="mt-2 text-xs md:text-sm font-semibold text-gray-600">
          Please enter the correct location name.
        </p>
      </header>
      <Player
        autoplay
        loop
        speed={2.5}
        className="drop-shadow-md max-w-52"
        src={iconNotFoundPage}
      />
    </motion.div>
  );
};

export default ErrorApiPage;
