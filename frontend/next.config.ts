import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Cấu hình cho phép next/image tải ảnh từ bên ngoài
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Cho phép tất cả các đường dẫn con từ domain này
      },
    ],
    // Hoặc cách cũ đơn giản hơn (nhưng ít bảo mật hơn):
    // domains: ['placehold.co'],
  },
};

export default nextConfig;