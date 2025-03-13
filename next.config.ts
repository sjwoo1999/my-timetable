import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export', // 정적 내보내기 활성화
  distDir: 'out',   // 출력 디렉토리 설정
};

export default nextConfig;