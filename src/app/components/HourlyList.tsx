"use client";
import React from "react";

type Props = {
  data: any;
  unit: "C" | "F";
};

const HourlyList = ({ data, unit }: Props) => {
  const day = data?.forecast?.forecastday?.[0];
  if (!day?.hour) return null;

  const nowHour = new Date(data.location.localtime.replace(" ", "T")).getHours();

  return (
    <div className="flex flex-col gap-2">
      {day.hour.map((h: any, i: number) => {
        const hour = new Date(h.time.replace(" ", "T")).getHours();
        const isNow = hour === nowHour;
        const rain = h.chance_of_rain || 0;
        return (
          <div
            key={i}
            className={`flex items-center gap-3 md:gap-[14px] rounded-[11px] px-[14px] py-[13px] ${
              isNow ? "bg-[#17253A]" : "bg-[#101B2B]"
            }`}
          >
            <span className={`text-[14px] w-[52px] shrink-0 ${isNow ? "font-semibold" : ""}`}>
              {h.time.split(" ")[1]}
            </span>
            <span className="text-[13px] text-[#C6D5E8] flex-1 min-w-0 truncate">
              {h.condition.text}
            </span>
            <span
              className="text-[12px] w-[60px] shrink-0 text-right md:text-left"
              style={{ color: rain >= 60 ? "#F2B54B" : "#9FC6F0" }}
            >
              ฝน {rain}%
            </span>
            <span className="text-[16px] font-medium w-[46px] text-right shrink-0">
              {Math.round(unit === "C" ? h.temp_c : h.temp_f)}°
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyList;
