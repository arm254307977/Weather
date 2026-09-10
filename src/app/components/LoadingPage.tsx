"use client";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      <div className="flex flex-col gap-[10px]">
        <span className="block w-[180px] h-4 rounded-md bg-[#1A2739]" />
        <span className="block w-[120px] h-14 rounded-[10px] bg-[#1A2739]" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="block h-[124px] rounded-[10px] bg-[#162335]" />
        ))}
      </div>
      <span className="block h-[200px] rounded-[14px] bg-[#141F31]" />
      <span className="text-[13px] text-[#8AA0BE]">กำลังโหลดข้อมูลอากาศ…</span>
    </div>
  );
};

export default LoadingPage;
