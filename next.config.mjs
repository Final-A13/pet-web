import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "encrypted-tbn0.gstatic.com",
        protocol: "https"
      },
      {
        hostname: "eoxrihspempkfnxziwzd.supabase.co",
        protocol: "https"
      },
      {
        hostname: "www.animal.go.kr",
        protocol: "http"
      }
    ],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,        // HTTP 응답 압축 활성화
  poweredByHeader: false,  // X-Powered-By 헤더 제거
  productionBrowserSourceMaps: false,  // 프로덕션 소스맵 비활성화
  // 큰 패키지 최적화
  optimizePackageImports: [
    'date-fns',
    'react-icons',
    '@nextui-org/react'
  ],

  webpack: (config, { dev, isServer }) => {
    // CSS 최적화를 위한 설정
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
      };
    }

    // AVIF 이미지 최적화
    config.module.rules.push({
      test: /\.(avif)$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 1024, // 1KB 이하는 인라인화
        },
      },
    });

    return config;
  },

  async headers() {
    return [
      {
        source: "/api/message",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0"
          }
        ]
      },
      {
        source: '/:path.{jpg,jpeg,png,gif,webp,mp4,svg,avif}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            // 이미 압축된 파일은 추가 압축하지 않음
            key: 'Content-Encoding',
            value: 'none'
          }
        ],
      },
      {
        source: '/:path.{js,css}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            // 브라우저 지원에 따라 압축 방식 선택
            key: 'Vary',
            value: 'Accept-Encoding'  
          },
        ]
      },   
    ];
  }
};

const pwaConfig = {
  dest: "public"
  // disable: process.env.NODE_ENV === 'development',  // 개발 환경에서 PWA를 테스트하려면 이 줄을 주석 처리하세요
};

export default withPWA(pwaConfig)(nextConfig);