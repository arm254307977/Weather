"use client";
import React from "react";

type Props = {
  cities: { name: string; temp: number | null; condition?: string; aqi?: number | null }[];
  onSelectCity: (city: string) => void;
  activeCity: string;
};

const SavedCities = ({ cities, onSelectCity, activeCity }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {cities.map((c) => (
        <button
          key={c.name}
          onClick={() => onSelectCity(c.name)}
          className={`flex justify-between items-center text-left p-4 rounded-[11px] border transition-colors ${
            c.name === activeCity
              ? "bg-[#17253A] border-[#5AD1C8]"
              : "bg-[#141F31] border-[#24334A] hover:bg-[#17253A]"
          }`}
        >
          <span className="flex flex-col min-w-0">
            <span className="text-[15px] truncate">{c.name}</span>
            <span className="text-[12px] text-[#8AA0BE] truncate">
              {c.condition || "–"}
              {c.aqi !== null && c.aqi !== undefined ? ` · AQI ${c.aqi}` : ""}
            </span>
          </span>
          <span className="text-[20px] font-medium shrink-0">
            {c.temp !== null ? `${Math.round(c.temp)}°` : "–"}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SavedCities;
