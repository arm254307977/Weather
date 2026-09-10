"use client";
import React from "react";
import { WiDayCloudy } from "react-icons/wi";
import { NAV_ITEMS, ViewKey } from "@/app/constant/nav";

type Props = {
  view: ViewKey;
  setView: (v: ViewKey) => void;
  savedCities: { name: string; temp: number | null }[];
  onSelectCity: (city: string) => void;
  alertCount: number;
  updatedAt: string;
};

const Sidebar = ({ view, setView, savedCities, onSelectCity, alertCount, updatedAt }: Props) => {
  return (
    <aside className="hidden md:flex w-[248px] shrink-0 flex-col gap-7 bg-[#0E1826] border-r border-[#1D2A3D] p-[26px_18px] h-screen sticky top-0">
      <div className="flex items-center gap-[10px] px-2">
        <div className="w-8 h-8 rounded-[9px] bg-[#5AD1C8] flex items-center justify-center text-[#062B29]" aria-label="Weather App">
          <WiDayCloudy size={25} aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold">อากาศวันนี้</span>
          <span className="text-[11px] text-[#7D93B2]">อัปเดต {updatedAt || "--:--"}</span>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = view === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`flex items-center justify-between px-3 py-[11px] rounded-[10px] text-[14px] text-left transition-colors ${
                active ? "bg-[#17253A] font-semibold text-[#E8EEF7]" : "text-[#8AA0BE] hover:bg-[#101B2B]"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`w-[6px] h-[6px] rounded-full ${active ? "bg-[#5AD1C8]" : "bg-[#33465F]"}`} />
                {item.label}
              </span>
              {item.key === "alerts" && alertCount > 0 && (
                <span className="text-[11px] font-semibold bg-[#F2705B] text-[#2A0B06] rounded-full px-[7px] py-[2px]">
                  {alertCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="h-px bg-[#1D2A3D]" />

      <div className="flex flex-col gap-3">
        <div className="text-[11px] tracking-[0.1em] text-[#68809F] px-3">เมืองที่บันทึกไว้</div>
        <div className="flex flex-col gap-[6px]">
          {savedCities.map((c) => (
            <button
              key={c.name}
              onClick={() => onSelectCity(c.name)}
              className="flex justify-between items-center px-3 py-[9px] rounded-[9px] bg-[#101B2B] text-[13px] hover:bg-[#17253A] transition-colors"
            >
              <span className="text-[#C6D5E8]">{c.name}</span>
              <span className="font-semibold">{c.temp !== null ? `${Math.round(c.temp)}°` : "–"}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-[#1D2A3D] pt-4 px-3 text-[11px] text-[#68809F] leading-relaxed">
        <div className="text-[#C6D5E8]">พัฒนาโดย Apisit Janpalee</div>
        <div>
          ข้อมูลอากาศโดย <a href="https://www.weatherapi.com/" target="_blank" rel="noreferrer" className="hover:text-[#5AD1C8]">WeatherAPI.com</a>
        </div>
        <div>
          ค้นหาสถานที่โดย <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="hover:text-[#5AD1C8]">Open-Meteo</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
