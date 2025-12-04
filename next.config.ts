import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  // SÉCURITÉ RENFORCÉE
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Empêche d'être mis dans une iframe
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Empêche le navigateur de deviner les types de fichiers
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Protège la vie privée des liens
          },
          {
             key: 'Strict-Transport-Security',
             value: 'max-age=63072000; includeSubDomains; preload' // Force le HTTPS
          }
        ],
      },
    ];
  },
};

export default nextConfig;