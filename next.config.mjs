/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    // NOTE: script-src and style-src allow 'unsafe-inline' only because the
    // site uses inline scripts that cannot take a nonce in this static
    // setup: the pre-paint theme script in src/app/layout.tsx and the
    // JSON-LD blocks rendered with dangerouslySetInnerHTML. This weakens CSP
    // protection against XSS compared with a nonce or hash based policy, so
    // moving those inline scripts to nonces or hashes is a future hardening
    // step, not part of this change.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
