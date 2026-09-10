"use client";
import React from "react";
import InputCityAutocomplete from "./AutoCP";
import * as typeValue from "@/app/type/type";

type Props = {
  dataState: typeValue.DataWeatherState;
  setDataState: React.Dispatch<React.SetStateAction<typeValue.DataWeatherState>>;
  unit: "C" | "F";
  setUnit: (u: "C" | "F") => void;
};

const TopBar = ({ dataState, setDataState, unit, setUnit }: Props) => {
  return (
    <div className="sticky top-0 z-20 flex items-center gap-4 md:gap-5 px-5 md:px-8 py-4 md:py-5 border-b border-[#1D2A3D] bg-[#0C1523]/95 backdrop-blur">
      <div className="flex-1 min-w-0">
        <InputCityAutocomplete dataState={dataState} setDataState={setDataState} />
      </div>
      <div className="flex gap-2 bg-[#162335] rounded-full p-1 shrink-0">
        {(["C", "F"] as const).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`text-[13px] px-4 py-[7px] rounded-full transition-colors ${
              unit === u ? "bg-[#5AD1C8] text-[#062B29] font-semibold" : "text-[#8AA0BE]"
            }`}
          >
            °{u}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
