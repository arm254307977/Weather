// สรุปคุณภาพอากาศเป็นตัวเลขเดียว (US AQI จาก PM2.5)
const BREAKPOINTS: [number, number, number, number][] = [
    [0, 12, 0, 50],
    [12.1, 35.4, 51, 100],
    [35.5, 55.4, 101, 150],
    [55.5, 150.4, 151, 200],
    [150.5, 250.4, 201, 300],
    [250.5, 500.4, 301, 500],
];

export const aqiFromPm25 = (pm25: number): number => {
    if (pm25 === undefined || pm25 === null || isNaN(pm25)) return 0;
    for (const [cLow, cHigh, iLow, iHigh] of BREAKPOINTS) {
        if (pm25 <= cHigh) {
            return Math.round(((iHigh - iLow) / (cHigh - cLow)) * (pm25 - cLow) + iLow);
        }
    }
    return 500;
};

export const aqiLevel = (aqi: number): { label: string; color: string } => {
    if (aqi <= 50) return { label: "ดี", color: "#5AD1C8" };
    if (aqi <= 100) return { label: "ปานกลาง", color: "#F2B54B" };
    if (aqi <= 150) return { label: "มีผลต่อกลุ่มเสี่ยง", color: "#F2705B" };
    if (aqi <= 200) return { label: "มีผลต่อสุขภาพ", color: "#F2705B" };
    return { label: "อันตราย", color: "#D2436B" };
};

export const aqiAdvice = (aqi: number): string => {
    if (aqi <= 50) return "อากาศดี ทำกิจกรรมกลางแจ้งได้ตามปกติ";
    if (aqi <= 100) return "กลุ่มเสี่ยงควรลดกิจกรรมกลางแจ้งช่วงบ่าย และสวมหน้ากากเมื่ออยู่ริมถนน";
    if (aqi <= 150) return "กลุ่มเสี่ยงควรเลี่ยงกิจกรรมกลางแจ้ง คนทั่วไปควรลดเวลาอยู่นอกอาคาร";
    return "ควรงดกิจกรรมกลางแจ้ง และสวมหน้ากากป้องกันฝุ่นเมื่อออกนอกอาคาร";
};

export const uvLevel = (uv: number): { label: string; color: string } => {
    if (uv <= 2) return { label: "ต่ำ", color: "#5AD1C8" };
    if (uv <= 5) return { label: "ปานกลาง", color: "#9FC6F0" };
    if (uv <= 7) return { label: "สูง", color: "#F2B54B" };
    if (uv <= 10) return { label: "สูงมาก", color: "#F2705B" };
    return { label: "อันตราย", color: "#D2436B" };
};
