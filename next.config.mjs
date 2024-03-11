/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        //ทำให้อิมพอตรูปจากเว็บนี้มาใช้ได้ ถ้าอยากเพิ่มลิงค์อื่นก็เพิ่มต่อเลย
        remotePatterns: [
          { hostname: "cdn.weatherapi.com" }
        ],
      },
};

export default nextConfig;
