"use client";
import sky from "@/app/assets/images/sky.jpg";
import { useEffect, useState } from "react";
import { DataWeatherState, initialDataWeatherState } from "./type/type";
import * as functionForecast from "@/app/function/functionHomePage";
import LoadingPage from "./components/LoadingPage";
import ErrorApiPage from "./components/ErrorApiPage";
import Current from "./components/Current";
import { NextUIProvider } from "@nextui-org/react";
import InputCityAutocomplete from "./components/AutoCP";
import WeekForecast from "./components/WeekForecast";
import WeatherDetail from "./components/WeatherDetail";

export default function Home() {
  const [dataState, setDataState] = useState<DataWeatherState>(
    initialDataWeatherState
  );

  useEffect(() => {
    functionForecast.getDataForecast(dataState, setDataState);
  }, []);

  return (
    <NextUIProvider>
      <div
        style={{ backgroundImage: `url(${sky.src})` }}
        className="h-fit min-h-screen bg-cover bg-scrol"
      >
        {/* input and logo  */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12 md:sticky md:top-0 md:drop-shadow-lg bg-white/10 backdrop-blur-sm">
          <InputCityAutocomplete
            setDataState={setDataState}
            dataState={dataState}
          />
          <h1 className="mb-8 md:mb-0 text-white text-xl font-bold py-2 px-4 order-1">
            Weather App ;)
          </h1>
        </div>

        {/* section  */}
        <div className="flex flex-col mx-6 md:mx-12">
          {dataState.isLoading ? (
            <LoadingPage />
          ) : dataState.data === "api error" ? (
            <ErrorApiPage />
          ) : (
            dataState.data.current && (
              <div>
                <div className="flex flex-col items-center md:items-start md:flex-row py-12">
                  <Current data={dataState} />
                  <WeekForecast data={dataState.data} />
                </div>
                <div>
                  <WeatherDetail data={dataState.data} />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </NextUIProvider>
  );
}
