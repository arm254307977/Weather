import React from "react";
import * as currenntDateFunction from "@/app/service/currentDate";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import locationPin from "@/app/assets/json/locationPin.json";

type Props = {
  data: any;
};

const Current = ({ data }: Props) => {
  const currentDate = currenntDateFunction.getCurrentDate();
  const dataWeather = data.data ? data.data : null;
  const weatherIcon = data.data.current
    ? data.data.current.condition.icon
    : null;

  return (
    <div className="flex flex-col mb-12 md:mb-0 items-start gap-2 md:w-1/2">
      <div className="flex items-center">
        <div>
          <h1 className="text-3xl text-white drop-shadow-md">Today</h1>
          <p className="text-white">{currentDate}</p>
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
      </div>
      <div>
        <p className="text-5xl text-white drop-shadow-md">
          {dataWeather.current.temp_c.toFixed()}
          <span className="text-3xl">°C</span>
        </p>
        <span className="text-white drop-shadow-md">
          {dataWeather.current.condition.text}
        </span>
        <div className="flex items-center gap-2 shadow-md bg-white py-2 px-4 rounded-lg text-gray-600">
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
        </div>
      </div>
    </div>
  );
};

export default Current;
