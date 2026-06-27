import type { NextConfig } from "next";

// ---------------------------------------------------------------------------
// Content-Security-Policy
// ---------------------------------------------------------------------------
// Next.js requires 'unsafe-inline' and 'unsafe-eval' for hydration/hot-reload.
// Even so, this CSP still provides strong protection:
//   • Blocks loading scripts from ANY external domain (only 'self' is allowed)
//   • Restricts where the browser can send data (connect-src)
//   • Blocks Flash/Java embeds (object-src 'none')
//   • Prevents form-action hijacking
//   • Prevents base-tag hijacking
// ---------------------------------------------------------------------------
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' blob: data: https://*.googleusercontent.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://generativelanguage.googleapis.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ');

const securityHeaders = [
  // Strict Content-Security-Policy
  { key: 'Content-Security-Policy', value: cspDirectives },
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
  // Enable DNS prefetching for performance
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

