import { Image } from "@nextui-org/react";
import React from "react";

type Props = {
  data: any;
};

const WeekForecast = ({ data }: Props) => {
  return (
    <div className="flex flex-wrap justify-center md:justify-end gap-8 w-full px-6 md:px-0">
      {data.forecast?.forecastday.map((day: any, index: number) => (
        <div
          key={index}
          className=" bg-white/20 p-2 text-center rounded-lg flex flex-col items-center backdrop-blur-sm w-[15rem] md:w-[10rem]"
        >
          <p>
            {new Date(day.date).toLocaleString("en-US", { weekday: "short", day: "numeric", month: "short" })}
          </p>
          <Image
            src={`https:${day.day.condition.icon}`}
            alt={day.day.condition.text}
          />
          <div>
            <p>H {day.day.maxtemp_c.toFixed()} °C</p>
            <p>L {day.day.mintemp_c.toFixed()} °C</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekForecast;
