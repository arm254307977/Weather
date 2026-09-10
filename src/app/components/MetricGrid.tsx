"use client";
import React from "react";
import { motion } from "framer-motion";
import { aqiFromPm25, aqiLevel, uvLevel } from "@/app/function/aqi";

type Props = {
  data: any;
  unit: "C" | "F";
};

const Card = ({ children, index }: { children: React.ReactNode; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.24, delay: index * 0.05, ease: "easeOut" }}
    className="bg-[#141F31] border border-[#24334A] rounded-xl p-[18px] flex flex-col justify-between gap-3 min-h-[124px]"
  >
    {children}
  </motion.div>
);

const MetricGrid = ({ data, unit }: Props) => {
  const current = data?.current;
  if (!current) return null;

  const feels = Math.round(unit === "C" ? current.feelslike_c : current.feelslike_f);
  const temp = Math.round(unit === "C" ? current.temp_c : current.temp_f);
  const diff = feels - temp;
  const pm25 = current.air_quality?.pm2_5;
  const aqi = pm25 !== undefined ? aqiFromPm25(pm25) : null;
  const aqiInfo = aqi !== null ? aqiLevel(aqi) : null;
  const uv = uvLevel(current.uv);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-[14px]">
      <Card index={0}>
        <span className="text-[12px] text-[#8AA0BE]">รู้สึกเหมือน</span>
        <span className="text-[28px] md:text-[32px] font-medium">{feels}°</span>
        <span className="text-[12px] text-[#F2B54B]">
          {diff === 0 ? "ใกล้เคียงค่าจริง" : `${diff > 0 ? "ร้อน" : "เย็น"}กว่าค่าจริง ${Math.abs(diff)}°`}
        </span>
      </Card>

      <Card index={1}>
        <span className="text-[12px] text-[#8AA0BE]">ความชื้น</span>
        <span className="text-[28px] md:text-[32px] font-medium">{current.humidity}%</span>
        <span className="block h-[5px] rounded-full bg-[#22334A] overflow-hidden">
          <span className="block h-full bg-[#5AD1C8]" style={{ width: `${current.humidity}%` }} />
        </span>
      </Card>

      <Card index={2}>
        <span className="text-[12px] text-[#8AA0BE]">ลม</span>
        <span className="text-[28px] md:text-[32px] font-medium">
          {Math.round(current.wind_kph)}
          <span className="text-[14px] text-[#8AA0BE]"> กม./ชม.</span>
        </span>
        <span className="text-[12px] text-[#8AA0BE]">ทิศ {current.wind_dir}</span>
      </Card>

      <Card index={3}>
        <span className="text-[12px] text-[#8AA0BE]">ดัชนี UV</span>
        <span className="text-[28px] md:text-[32px] font-medium">{current.uv}</span>
        <span className="text-[12px] font-semibold" style={{ color: uv.color }}>
          {uv.label}
        </span>
      </Card>

      {aqi !== null && aqiInfo && (
        <Card index={4}>
          <span className="text-[12px] text-[#8AA0BE]">คุณภาพอากาศ (AQI)</span>
          <span className="text-[28px] md:text-[32px] font-medium">{aqi}</span>
          <span className="text-[12px] font-semibold" style={{ color: aqiInfo.color }}>
            {aqiInfo.label}
          </span>
        </Card>
      )}

      {pm25 !== undefined && (
        <Card index={5}>
          <span className="text-[12px] text-[#8AA0BE]">PM 2.5</span>
          <span className="text-[28px] md:text-[32px] font-medium">
            {pm25.toFixed(1)}
            <span className="text-[13px] text-[#8AA0BE]"> µg/m³</span>
          </span>
          <span className="text-[12px] text-[#8AA0BE]">เกณฑ์ WHO 15 µg/m³</span>
        </Card>
      )}
    </div>
  );
};

export default MetricGrid;
