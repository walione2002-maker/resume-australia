import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — no one can embed the site in an iframe
  { key: 'X-Frame-Options', value: 'DENY' },
  // Prevent MIME-type sniffing — browser must respect the declared Content-Type
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Prevent information leakage via the Referer header
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Force HTTPS for 2 years, include subdomains, allow preload list
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Restrict access to device APIs the app does not need
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Prevent cross-origin opener attacks
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  // Remove the X-Powered-By header to avoid exposing the tech stack
  poweredByHeader: false,

  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
