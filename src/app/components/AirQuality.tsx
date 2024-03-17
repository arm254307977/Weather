import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import windSpeed from "@/app/assets/json/windSpeed.json";
import mask from "@/app/assets/json/mask.json";
import industrial from "@/app/assets/json/industrial-plant.json";
import earth from "@/app/assets/json/earth.json";
import car from "@/app/assets/json/car.json";
import industry from "@/app/assets/json/industry.json";
import dust from "@/app/assets/json/dust.json";

// Framer motion
import { AnimatePresence, motion } from "framer-motion";

// Function
import * as functionFramerMotion from "@/app/function/motion";

type Props = {
  data: any;
};

const WeatherDetail = ({ data }: Props) => {
  return (
    <div className="pb-10">
      <motion.h1
        {...functionFramerMotion.headerAirAnimetion}
        className="mb-4 text-2xl text-center md:text-start text-white drop-shadow-md font-bold"
      >
        Air quality
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          {...functionFramerMotion.cardAirLeftAnimation}
          className=" bg-white/50 max-h-28 p-4 flex items-center justify-around gap-6 rounded-xl shadow-md"
        >
          <div className="text-lg flex flex-col gap-4">
            <h3 className="text-xl drop-shadow-md font-semibold">PM 2.5</h3>
            <h3>{data.current.air_quality.pm2_5} µg./m3</h3>
          </div>
          <Player
            autoplay
            loop
            speed={0.5}
            className="drop-shadow-md w-24"
            src={mask}
          />
        </motion.div>
        <motion.div
          {...functionFramerMotion.cardAirRightAnimation}
          className=" bg-white/50 p-4 max-h-28 flex items-center justify-around gap-6 rounded-xl shadow-md"
        >
          <div className="text-lg flex flex-col gap-4">
            <h3 className="text-xl drop-shadow-md font-semibold">PM 10</h3>
            <h3>{data.current.air_quality.pm10} µg/m³</h3>
          </div>
          <Player
            autoplay
            loop
            speed={0.5}
            className="drop-shadow-md w-32"
            src={dust}
          />
        </motion.div>
        <motion.div
          {...functionFramerMotion.cardAirLeftAnimation}
          className=" bg-white/50 p-4 max-h-28 flex items-center justify-around gap-6 rounded-xl shadow-md"
        >
          <div className="text-lg flex flex-col gap-4">
            <h3 className="text-xl drop-shadow-md font-semibold">CO gas</h3>
            <h3>{data.current.air_quality.co} µg/m³</h3>
          </div>
          <Player
            autoplay
            speed={0.5}
            loop
            className="drop-shadow-md w-28"
            src={industry}
          />
        </motion.div>
        <motion.div
          {...functionFramerMotion.cardAirRightAnimation}
          className=" bg-white/50 p-4 max-h-28 flex items-center justify-around gap-6 rounded-xl shadow-md"
        >
          <div className="text-lg flex flex-col gap-4">
            <h3 className="text-xl drop-shadow-md font-semibold">NO2 gas</h3>
            <h3>{data.current.air_quality.no2} µg/m³</h3>
          </div>
          <Player
            autoplay
            loop
            speed={0.5}
            className="drop-shadow-md w-32"
            src={car}
          />
        </motion.div>
        <motion.div
          {...functionFramerMotion.cardAirLeftAnimation}
          className=" bg-white/50 p-4 max-h-28 flex items-center justify-around gap-6 rounded-xl shadow-md"
        >
          <div className="text-lg flex flex-col gap-4">
            <h3 className="text-xl drop-shadow-md font-semibold">O3 gas</h3>
            <h3>{data.current.air_quality.o3} µg/m³</h3>
          </div>
          <Player
            autoplay
            loop
            speed={0.5}
            className="drop-shadow-md w-32"
            src={earth}
          />
        </motion.div>
        <motion.div
          {...functionFramerMotion.cardAirRightAnimation}
          className=" bg-white/50 p-4 max-h-28 flex items-center justify-around gap-6 rounded-xl shadow-md"
        >
          <div className="text-lg flex flex-col gap-4">
            <h3 className="text-xl drop-shadow-md font-semibold">SO2 gas</h3>
            <h3>{data.current.air_quality.so2} µg/m³</h3>
          </div>
          <Player
            autoplay
            loop
            className="drop-shadow-md w-32"
            src={industrial}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherDetail;
