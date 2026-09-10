"use client";
import React from "react";
import { NAV_ITEMS, ViewKey } from "@/app/constant/nav";

type Props = {
  view: ViewKey;
  setView: (v: ViewKey) => void;
  alertCount: number;
};

const SHORT: Record<ViewKey, string> = {
  home: "หน้าหลัก",
  hourly: "รายชั่วโมง",
  air: "อากาศ",
  saved: "เมือง",
  alerts: "เตือน",
};

const MobileNav = ({ view, setView, alertCount }: Props) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex bg-[#0E1826]/95 backdrop-blur border-t border-[#1D2A3D] pb-[env(safe-area-inset-bottom)]">
      {NAV_ITEMS.map((item) => {
        const active = view === item.key;
        return (
          <button
            key={item.key}
            onClick={() => setView(item.key)}
            className={`relative flex-1 min-h-[56px] flex flex-col items-center justify-center gap-1 text-[11px] ${
              active ? "text-[#5AD1C8]" : "text-[#8AA0BE]"
            }`}
          >
            <span className={`w-[6px] h-[6px] rounded-full ${active ? "bg-[#5AD1C8]" : "bg-[#33465F]"}`} />
            {SHORT[item.key]}
            {item.key === "alerts" && alertCount > 0 && (
              <span className="absolute top-[10px] right-[22%] w-[7px] h-[7px] rounded-full bg-[#F2705B]" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default MobileNav;
