/** @type {import('next').NextConfig} */
const nextConfig = {
  // Statische export: next build schrijft een volledige site naar out/
  // die GitHub Pages rechtstreeks kan serveren. Geen Node-server nodig.
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Verplicht bij output: 'export' — er is geen server om beelden te optimaliseren.
    unoptimized: true,
  },
  // Let op: de vroegere headers()-blok (X-Frame-Options, Referrer-Policy,
  // Permissions-Policy en Cache-Control voor /img en /video) is verwijderd.
  // Een statische host zoals GitHub Pages kan geen eigen responseheaders zetten,
  // dus Next negeert die configuratie bij een export.
};

export default nextConfig;
