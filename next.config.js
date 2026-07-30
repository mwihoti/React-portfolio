/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Consolidate the legacy alias onto the canonical domain so search
      // engines index one site. Only fires if the old domain is an alias
      // of this same Vercel project.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'mwihoti-portfolio.vercel.app' }],
        destination: 'https://danieled-portfolio.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
