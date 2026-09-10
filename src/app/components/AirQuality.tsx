"use client";
import React from "react";
import { aqiFromPm25, aqiLevel, aqiAdvice } from "@/app/function/aqi";

type Props = {
  data: any;
};

const POLLUTANTS: { key: string; label: string; max: number }[] = [
  { key: "pm2_5", label: "PM 2.5", max: 75 },
  { key: "pm10", label: "PM 10", max: 150 },
  { key: "o3", label: "O₃", max: 180 },
  { key: "no2", label: "NO₂", max: 100 },
  { key: "so2", label: "SO₂", max: 100 },
  { key: "co", label: "CO", max: 4000 },
];

const WeatherDetail = ({ data }: Props) => {
  const air = data?.current?.air_quality;
  if (!air) return null;

  const aqi = aqiFromPm25(air.pm2_5);
  const level = aqiLevel(aqi);
  const markerPos = Math.min(100, (aqi / 200) * 100);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gradient-to-b from-[#2F2716] to-[#141F31] border border-[#4A3A1C] rounded-[14px] p-5 md:p-6 flex flex-col gap-[10px]">
        <span className="text-[12px] text-[#D8C79A]">
          ดัชนีคุณภาพอากาศ · {data.location?.name}
        </span>
        <div className="flex items-end gap-3">
          <span className="text-[56px] md:text-[64px] leading-none font-light">{aqi}</span>
          <span className="text-[16px] font-semibold pb-2" style={{ color: level.color }}>
            {level.label}
          </span>
        </div>
        <span className="relative block h-[6px] rounded-full bg-gradient-to-r from-[#5AD1C8] via-[#F2B54B] to-[#F2705B]">
          <span
            className="absolute -top-[3px] w-3 h-3 rounded-full bg-[#E8EEF7] border-2 border-[#0B1220]"
            style={{ left: `${markerPos}%` }}
          />
        </span>
        <span className="text-[13px] text-[#C6D5E8] leading-relaxed">{aqiAdvice(aqi)}</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[14px]">
        {POLLUTANTS.map((p) => {
          const value = air[p.key];
          if (value === undefined) return null;
          const pct = Math.min(100, (value / p.max) * 100);
          const color = pct > 60 ? "#F2705B" : pct > 35 ? "#F2B54B" : "#5AD1C8";
          return (
            <div
              key={p.key}
              className="bg-[#141F31] border border-[#24334A] rounded-[11px] p-[14px] flex flex-col gap-2"
            >
              <span className="text-[12px] text-[#8AA0BE]">{p.label}</span>
              <span className="text-[22px] md:text-[24px] font-medium">
                {value >= 100 ? Math.round(value) : value.toFixed(1)}
                <span className="text-[12px] text-[#8AA0BE]"> µg/m³</span>
              </span>
              <span className="block h-1 rounded-full bg-[#22334A]">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${pct}%`, background: color }}
                />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherDetail;
