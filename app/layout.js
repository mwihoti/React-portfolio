import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '../src/context/theme';
import '../src/index.css';
import '../src/App.css';
import '../src/components/floatingElements.css';

const SITE_URL = 'https://mwihoti-portfolio.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Daniel Mwihoti — Software, AI & Blockchain Developer',
  description:
    'Daniel Mwihoti — software, AI, and blockchain developer based in Nairobi, Kenya. Building with Rust, Python, Next.js, Elixir, and ML. Open-source contributor available for remote work.',
  keywords: [
    'Daniel Mwihoti',
    'software developer',
    'blockchain developer',
    'AI developer',
    'fullstack developer',
    'Rust developer',
    'Python',
    'Next.js',
    'Elixir',
    'machine learning',
    'open source',
    'Nairobi',
    'Kenya',
    'remote',
  ],
  authors: [{ name: 'Daniel Edward Mwihoti' }],
  creator: 'Daniel Edward Mwihoti',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Daniel Mwihoti — Portfolio',
    title: 'Daniel Mwihoti — Software, AI & Blockchain Developer',
    description:
      'Software, AI, and blockchain developer based in Nairobi, Kenya. Rust, Python, Next.js, Elixir, ML. Open-source contributor available for remote work.',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Daniel Mwihoti — Software, AI & Blockchain Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@notstupiddev',
    creator: '@notstupiddev',
    title: 'Daniel Mwihoti — Software, AI & Blockchain Developer',
    description:
      'Software, AI, and blockchain developer based in Nairobi, Kenya. Rust, Python, Next.js, Elixir, ML.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'CNcBfPg_S6_K7_rt2o_I2Gw7-wq9rYehF0vOoLmCpu4',
  },
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Daniel Edward Mwihoti',
  alternateName: ['Daniel Mwihoti', 'Mwihoti'],
  url: SITE_URL,
  image: `${SITE_URL}/me.jpg`,
  jobTitle: 'Software, AI & Blockchain Developer',
  description:
    'Software, AI, and blockchain developer specializing in Rust, Python, Next.js, Elixir, and machine learning. Open-source contributor.',
  knowsAbout: [
    'Rust',
    'Python',
    'Next.js',
    'Elixir',
    'Machine Learning',
    'AI Integration',
    'Blockchain Development',
    'Fullstack Development',
    'Open Source',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  nationality: 'Kenyan',
  sameAs: [
    'https://github.com/mwihoti',
    'https://www.linkedin.com/in/daniel-mwihoti-3aaa652b9/',
    'https://x.com/notstupiddev',
    'https://x.com/mwihotii',
    'https://daily-habit-hub.vercel.app/',
    'https://t.me/enter_memorabilia_musem_bot',
    'https://t.me/danmwisecondbrainbot',
  ],
};

const author = { '@type': 'Person', name: 'Daniel Edward Mwihoti', url: SITE_URL };

const botsGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Memorabilia (Telegram Mini App)',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Telegram',
      url: 'https://t.me/enter_memorabilia_musem_bot',
      description:
        'Telegram Mini App for the Memorabilia memory-card game on Starknet. Account Abstraction handles wallet creation; gameplay is gasless.',
      author,
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Second Brain Bot',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Telegram',
      url: 'https://t.me/danmwisecondbrainbot',
      description:
        'Personal AI second-brain on Telegram. Capture links, voice notes, and ideas; recall later in natural language.',
      author,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(botsGraph) }}
        />
      </body>
    </html>
  );
}
