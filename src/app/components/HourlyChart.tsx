"use client";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  data: any;
  unit: "C" | "F";
};

const HourlyChart = ({ data, unit }: Props) => {
  const day = data?.forecast?.forecastday?.[0];
  if (!day?.hour) return null;

  const nowHour = new Date(data.location.localtime.replace(" ", "T")).getHours();
  const hours = day.hour.filter((h: any) => new Date(h.time.replace(" ", "T")).getHours() >= nowHour).slice(0, 12);
  const list = hours.length >= 6 ? hours : day.hour.slice(-12);

  const temps = list.map((h: any) => (unit === "C" ? h.temp_c : h.temp_f));
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const span = max - min || 1;

  const W = 1030;
  const H = 168;
  const step = W / list.length;
  const x = (i: number) => step * i + step / 2;
  const y = (t: number) => 30 + (1 - (t - min) / span) * 54;

  const points = list.map((h: any, i: number) => `${x(i)},${y(temps[i])}`).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: 0.12, ease: "easeOut" }}
      className="bg-[#141F31] border border-[#24334A] rounded-[14px] px-5 py-5 md:px-6 flex flex-col gap-[14px]"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
        <span className="text-[15px] font-semibold">อุณหภูมิรายชั่วโมง</span>
        <span className="text-[12px] text-[#8AA0BE]">เส้นทึบ = อุณหภูมิ · แท่ง = โอกาสฝน</span>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="block min-w-[720px] w-full h-[168px]">
          <g stroke="#22334A" strokeWidth="1">
            <line x1="0" y1="20" x2={W} y2="20" />
            <line x1="0" y1="70" x2={W} y2="70" />
            <line x1="0" y1="120" x2={W} y2="120" />
          </g>
          <g fill="#1E3550">
            {list.map((h: any, i: number) => {
              const rain = h.chance_of_rain || 0;
              const barH = Math.max(4, (rain / 100) * 72);
              return <rect key={i} x={x(i) - 13} y={120 - barH} width="26" height={barH} rx="3" />;
            })}
          </g>
          <polyline points={points} fill="none" stroke="#5AD1C8" strokeWidth="2.5" strokeLinejoin="round" />
          <g fill="#0B1220" stroke="#5AD1C8" strokeWidth="2">
            {list.map((h: any, i: number) => (
              <circle key={i} cx={x(i)} cy={y(temps[i])} r="4" />
            ))}
          </g>
          <g fill="#E8EEF7" fontSize="13">
            {list.map((h: any, i: number) => (
              <text key={i} x={x(i)} y={y(temps[i]) - 14} textAnchor="middle">
                {Math.round(temps[i])}°
              </text>
            ))}
          </g>
          <g fill="#7D93B2" fontSize="12">
            {list.map((h: any, i: number) => (
              <text key={i} x={x(i)} y="146" textAnchor="middle">
                {h.time.split(" ")[1]}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </motion.div>
  );
};

export default HourlyChart;
