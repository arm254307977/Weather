"use client";
import React from "react";

type Props = {
  data: any;
  unit: "C" | "F";
};

const WeekForecast = ({ data, unit }: Props) => {
  const days = data?.forecast?.forecastday;
  if (!days) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
      {days.map((day: any, index: number) => {
        const d = new Date(day.date);
        const isToday = index === 0;
        return (
          <div
            key={index}
            className={`rounded-xl p-[14px] flex flex-col gap-2 items-center border ${
              isToday ? "bg-[#141F31] border-[#24334A]" : "bg-[#101B2B] border-[#1D2A3D]"
            }`}
          >
            <span className={`text-[13px] font-semibold ${isToday ? "text-[#5AD1C8]" : ""}`}>
              {isToday ? "วันนี้" : d.toLocaleDateString("th-TH", { weekday: "short" })}
            </span>
            <span className="text-[12px] text-[#8AA0BE]">
              {d.toLocaleDateString("th-TH", { day: "numeric", month: "short" })}
            </span>
            <span className="text-[20px] font-medium">
              {Math.round(unit === "C" ? day.day.maxtemp_c : day.day.maxtemp_f)}°
            </span>
            <span className="text-[13px] text-[#8AA0BE]">
              {Math.round(unit === "C" ? day.day.mintemp_c : day.day.mintemp_f)}°
            </span>
            <span className="text-[12px] text-[#9FC6F0]">
              ฝน {day.day.daily_chance_of_rain ?? 0}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default WeekForecast;
