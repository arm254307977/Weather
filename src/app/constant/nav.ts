export type ViewKey = "home" | "hourly" | "air" | "saved" | "alerts";

export const NAV_ITEMS: { key: ViewKey; label: string }[] = [
    { key: "home", label: "หน้าหลัก" },
    { key: "hourly", label: "รายชั่วโมง" },
    { key: "air", label: "คุณภาพอากาศ" },
    { key: "saved", label: "เมืองที่บันทึกไว้" },
    { key: "alerts", label: "แจ้งเตือน" },
];

export const DEFAULT_SAVED_CITIES = ["Chiang Mai", "Phuket", "Tokyo", "London"];
