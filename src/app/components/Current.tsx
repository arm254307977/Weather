import React from "react";
import * as currenntDateFunction from "@/app/service/currentDate";
import Image from "next/image";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import locationPin from "@/app/assets/json/locationPin.json";

// Framer motion
import { motion, useScroll, useTransform } from "framer-motion";

// Function
import * as functionFramerMotion from "@/app/function/motion";

type Props = {
  data: any;
};

const Current = ({ data }: Props) => {

  const currentDate = currenntDateFunction.getCurrentDate();
  const dataWeather = data.data ? data.data : null;
  const weatherIcon = data.data.current
    ? data.data.current.condition.icon
    : null;
  const [, time] = data.data.location?.localtime.split(" ");

  return (
    <motion.div
      className="flex flex-col mb-12 md:mb-0 items-start gap-2 md:w-1/2"
    >
      <motion.div
        {...functionFramerMotion.currentText1Animetion}
        className="flex items-center gap-2"
      >
        <div>
          <div className="flex items-end justify-between">
            <h1 className="text-3xl text-white drop-shadow-md">Today</h1>
            <span className="text-md text-white drop-shadow-md">{time}</span>
          </div>
          <p className="text-white text-lg">{currentDate}</p>
        </div>
        {weatherIcon && (
          <div>
            <Image
              src={`https:${weatherIcon}`}
              alt={dataWeather.current.condition.text}
              width={50}
              height={50}
            />
          </div>
        )}
      </motion.div>
      <div>
        <motion.p
          {...functionFramerMotion.currentText1Animetion}
          className="text-5xl text-white drop-shadow-md"
        >
          {dataWeather.current.temp_c.toFixed()}
          <span className="text-3xl">°C</span>
        </motion.p>
        <motion.span
          {...functionFramerMotion.currentText1Animetion}
          className="text-white drop-shadow-md"
        >
          {dataWeather.current.condition.text}
        </motion.span>
        <motion.div
          {...functionFramerMotion.currentText2Animetion}
          className="flex items-center gap-2 shadow-md mt-2 bg-white py-2 px-4 rounded-lg text-gray-600"
        >
          <span className=" mt-[-0.5rem] ml-[-0.5rem]">
            <Player
              autoplay
              loop
              className="drop-shadow-md max-w-52 w-8"
              src={locationPin}
            />
          </span>
          <p>
            {dataWeather.location.name}, {dataWeather.location.country}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Current;
