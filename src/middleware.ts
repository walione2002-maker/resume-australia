import { NextRequest, NextResponse } from 'next/server';

/**
 * Security Middleware — Generates a cryptographic nonce on every request
 * and attaches a strict Content-Security-Policy header to the response.
 *
 * This prevents XSS attacks by ensuring only scripts with a valid nonce
 * (generated server-side per request) are allowed to execute.
 */
export function middleware(request: NextRequest) {
  // Generate a unique nonce for this request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Build a strict Content-Security-Policy
  // -----------------------------------------------------------------------
  // default-src 'self'         — Only allow resources from our own origin
  // script-src  'nonce-...'    — Only allow scripts with our nonce (blocks injected scripts)
  //             'strict-dynamic' — Trust scripts loaded by already-trusted scripts (Next.js chunks)
  // style-src   'self' 'unsafe-inline' — Required for Tailwind/CSS-in-JS/next-themes
  // img-src     'self' blob: data: — Allow images from our origin, blobs (canvas), and data URIs
  // font-src    'self' https://fonts.gstatic.com — Our fonts + Google Fonts
  // connect-src 'self' ...     — Allowed API endpoints (Firebase, Gemini AI, Vercel)
  // frame-src   'self' ...     — Firebase auth popup
  // object-src  'none'         — Block Flash/Java embeds entirely
  // base-uri    'self'         — Prevent base-tag hijacking
  // form-action 'self'         — Forms can only submit to our own origin
  // frame-ancestors 'none'     — Prevent clickjacking (no one can iframe us)
  // -----------------------------------------------------------------------
  const cspDirectives = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' blob: data: https://*.googleusercontent.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://generativelanguage.googleapis.com https://vitals.vercel-insights.com https://va.vercel-scripts.com`,
    `frame-src 'self' https://*.firebaseapp.com https://accounts.google.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ];

  const cspHeader = cspDirectives.join('; ');

  // Clone the request headers and inject the nonce so Next.js can use it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  // Build the response with modified headers
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Attach the CSP header to the response
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

// Run middleware on all routes except static assets and internal Next.js routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, icon.png (browser icons)
     * - manifest.webmanifest (PWA manifest)
     */
    {
      source: '/((?!_next/static|_next/image|favicon\\.ico|icon\\.png|manifest\\.webmanifest).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
