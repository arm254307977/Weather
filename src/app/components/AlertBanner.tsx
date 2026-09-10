"use client";
import React from "react";

type Props = {
  alerts: any[];
  onOpen?: () => void;
  compact?: boolean;
};

const AlertBanner = ({ alerts, onOpen, compact = true }: Props) => {
  if (!alerts || alerts.length === 0) return null;
  const a = alerts[0];

  if (compact) {
    return (
      <button
        onClick={onOpen}
        className="w-full text-left flex flex-col md:flex-row md:items-center gap-2 md:gap-[14px] bg-[#2A1A16] border border-[#5C332A] border-l-4 border-l-[#F2705B] rounded-[10px] px-[18px] py-[14px]"
      >
        <span className="text-[12px] font-bold text-[#F2705B] tracking-[0.06em] shrink-0">
          แจ้งเตือน
        </span>
        <span className="text-[14px] text-[#F3D9D3] flex-1">
          {a.headline || a.event}
        </span>
        <span className="text-[13px] text-[#C08A7E] shrink-0">ดูรายละเอียด</span>
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {alerts.map((item: any, i: number) => (
        <div
          key={i}
          className="bg-[#2A1A16] border border-[#5C332A] border-l-4 border-l-[#F2705B] rounded-xl p-[18px] flex flex-col gap-[10px]"
        >
          <span className="text-[12px] font-bold text-[#F2705B] tracking-[0.06em]">
            ระดับ: {item.severity || "เตือนภัย"}
          </span>
          <span className="text-[17px] font-semibold">{item.event || item.headline}</span>
          {item.desc && (
            <span className="text-[13px] text-[#F3D9D3] leading-relaxed whitespace-pre-line">
              {item.desc}
            </span>
          )}
          <span className="text-[12px] text-[#C08A7E]">
            ที่มา: {item.areas || "ประกาศทางการ"}
            {item.effective ? ` · ออก ${new Date(item.effective).toLocaleString("th-TH", { hour: "2-digit", minute: "2-digit" })} น.` : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;
