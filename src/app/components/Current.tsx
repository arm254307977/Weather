"use client";
import React from "react";
import * as currenntDateFunction from "@/app/service/currentDate";

type Props = {
  data: any;
  unit: "C" | "F";
};

const Current = ({ data, unit }: Props) => {
  const w = data?.data;
  if (!w?.current) return null;

  const current = w.current;
  const today = w.forecast?.forecastday?.[0];
  const astro = today?.astro;
  const t = (c: number, f: number) => Math.round(unit === "C" ? c : f);
  const [, time] = (w.location?.localtime || " ").split(" ");

  return (
    <div className="bg-gradient-to-b from-[#18304A] to-[#141F31] border border-[#24334A] rounded-[14px] p-6 md:p-[26px] flex flex-col gap-5">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-[2px] min-w-0">
          <span className="text-[19px] font-semibold truncate">{w.location.name}</span>
          <span className="text-[13px] text-[#8AA0BE]">
            {w.location.country} · {currenntDateFunction.getCurrentDate()} {time}
          </span>
        </div>
        <span className="text-[12px] px-[10px] py-[5px] rounded-full bg-[#1E3550] text-[#9FC6F0] shrink-0">
          ตอนนี้
        </span>
      </div>

      <div className="flex items-end gap-5 flex-wrap">
        <div className="text-[84px] md:text-[104px] leading-[0.86] font-light tracking-tight">
          {t(current.temp_c, current.temp_f)}
          <span className="text-[40px] font-normal text-[#9FB4CE]">°</span>
        </div>
        <div className="flex flex-col gap-[6px] pb-[10px]">
          <span className="text-[16px]">{current.condition.text}</span>
          <span className="text-[14px] text-[#8AA0BE]">
            รู้สึกเหมือน {t(current.feelslike_c, current.feelslike_f)}°
          </span>
          {today && (
            <span className="text-[14px] text-[#8AA0BE]">
              สูงสุด {t(today.day.maxtemp_c, today.day.maxtemp_f)}° · ต่ำสุด{" "}
              {t(today.day.mintemp_c, today.day.mintemp_f)}°
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-[10px] flex-wrap">
        <div className="flex-1 min-w-[110px] bg-[#101B2B] rounded-[10px] px-[14px] py-3 flex flex-col gap-1">
          <span className="text-[11px] text-[#7D93B2]">พระอาทิตย์ขึ้น</span>
          <span className="text-[17px] font-semibold">{astro?.sunrise || "–"}</span>
        </div>
        <div className="flex-1 min-w-[110px] bg-[#101B2B] rounded-[10px] px-[14px] py-3 flex flex-col gap-1">
          <span className="text-[11px] text-[#7D93B2]">พระอาทิตย์ตก</span>
          <span className="text-[17px] font-semibold">{astro?.sunset || "–"}</span>
        </div>
        <div className="flex-1 min-w-[110px] bg-[#101B2B] rounded-[10px] px-[14px] py-3 flex flex-col gap-1">
          <span className="text-[11px] text-[#7D93B2]">โอกาสฝน</span>
          <span className="text-[17px] font-semibold">
            {today?.day?.daily_chance_of_rain ?? 0}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Current;
