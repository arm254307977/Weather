"use client";
import { useEffect, useState } from "react";

// nextui-org
import { NextUIProvider } from "@nextui-org/react";

// Framer motion
import { motion} from "framer-motion";

// type
import { DataWeatherState, initialDataWeatherState } from "./type/type";

// Function
import * as functionForecast from "@/app/function/functionHomePage";
import * as functionFramerMotion from "@/app/function/motion";

// Component
import InputCityAutocomplete from "./components/AutoCP";
import WeekForecast from "./components/WeekForecast";
import WeatherDetail from "./components/AirQuality";
import LoadingPage from "./components/LoadingPage";
import ErrorApiPage from "./components/ErrorApiPage";
import Current from "./components/Current";

export default function Home() {
  const [dataState, setDataState] = useState<DataWeatherState>(
    initialDataWeatherState
  );

  useEffect(() => {
    functionForecast.getDataForecast(dataState, setDataState);
  }, []);

  return (
    <NextUIProvider>
      <motion.div
        {...functionFramerMotion.pageAnimetion}
        style={{
          backgroundImage: `url(${dataState.imageBG})`,
        }}
        className="h-fit min-h-screen bg-cover bg-fixed"
      >
        {/* input and logo  */}
        <motion.div
          {...functionFramerMotion.navAnimetion}
          className="flex flex-col z-10 md:flex-row justify-between items-center p-12 md:sticky md:top-0 md:drop-shadow-lg bg-white/10 backdrop-blur-sm"
        >
          <InputCityAutocomplete
            setDataState={setDataState}
            dataState={dataState}
          />
          <motion.h1
            {...functionFramerMotion.headerAnimetion}
            className="mb-8 md:mb-0 text-white text-xl font-bold py-2 px-4 order-1"
          >
            Weather App ;)
          </motion.h1>
        </motion.div>

        {/* section  */}
        <div className="flex flex-col mx-6 md:mx-12">
          {dataState.isLoading ? (
            <LoadingPage />
          ) : dataState.data === "api error" ? (
            <ErrorApiPage />
          ) : (
            dataState.data.current && (
              <motion.div {...functionFramerMotion.changeCountry}>
                <div className="flex flex-col items-center md:items-start md:flex-row py-12">
                  <Current data={dataState} />
                  <WeekForecast data={dataState.data} />
                </div>
                <div>
                  <WeatherDetail data={dataState.data} />
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </NextUIProvider>
  );
}
