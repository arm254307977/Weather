"use client";
import React from "react";

type Props = {
  onRetry?: () => void;
};

const ErrorApiPage = ({ onRetry }: Props) => {
  return (
    <div className="bg-[#0B1220] border border-[#24334A] rounded-xl p-8 flex flex-col justify-center items-center gap-3 text-center min-h-[300px]">
      <div className="w-12 h-12 rounded-full bg-[#2A1A16] border border-[#5C332A] flex items-center justify-center text-[#F2705B] text-[22px] font-semibold">
        !
      </div>
      <span className="text-[19px] font-semibold">เชื่อมต่อข้อมูลไม่สำเร็จ</span>
      <span className="text-[13px] text-[#8AA0BE] max-w-[380px] leading-relaxed">
        ไม่สามารถดึงข้อมูลจากบริการพยากรณ์อากาศได้ในขณะนี้ ลองใหม่อีกครั้ง
        หรือตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
      </span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-[6px] text-[13px] font-semibold bg-[#5AD1C8] text-[#062B29] rounded-full px-[22px] py-[10px]"
        >
          ลองใหม่
        </button>
      )}
    </div>
  );
};

export default ErrorApiPage;
