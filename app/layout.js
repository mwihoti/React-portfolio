import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '../src/context/theme';
import '../src/index.css';
import '../src/App.css';
import '../src/components/floatingElements.css';

const SITE_URL = 'https://danieled-portfolio.vercel.app';
const SITE_TITLE = 'Daniel Mwihoti - Global Bitcoin, Cardano, AI and Rust Developer';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description:
    'Daniel Mwihoti is a global Bitcoin, Cardano, AI and Rust developer building blockchain systems, AI agents, smart contracts, and full-stack products for remote teams worldwide.',
  keywords: [
    'Daniel Mwihoti - Global Bitcoin, Cardano, AI and Rust Developer',
    'Daniel Mwihoti',
    'Mwihoti',
    'Mwihoti developer',
    'Mwihoti Bitcoin developer',
    'Mwihoti Cardano developer',
    'Mwihoti AI and Rust developer',
    'global blockchain developer',
    'remote blockchain developer',
    'remote AI developer',
    'remote Rust developer',
    'Daniel Edward Mwihoti',
    'Bitcoin developer',
    'Cardano developer',
    'AI and Rust developer',
    'Rust blockchain developer',
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
    title: SITE_TITLE,
    description:
      'Daniel Mwihoti is a global Bitcoin, Cardano, AI and Rust developer building blockchain systems, AI agents, smart contracts, and full-stack products for remote teams worldwide.',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@notstupiddev',
    creator: '@notstupiddev',
    title: SITE_TITLE,
    description:
      'Daniel Mwihoti is a global Bitcoin, Cardano, AI and Rust developer for remote teams worldwide.',
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
  alternateName: [
    'Daniel Mwihoti',
    'Mwihoti',
    'Mwihoti Developer',
    'Mwihoti Bitcoin Developer',
    'Mwihoti AI and Rust Developer',
    'Global Bitcoin Developer',
    'Remote Blockchain Developer',
  ],
  url: SITE_URL,
  image: `${SITE_URL}/me.jpg`,
  jobTitle: 'Global Bitcoin, Cardano, AI and Rust Developer',
  description:
    'Daniel Mwihoti is a global Bitcoin, Cardano, AI and Rust developer specializing in blockchain systems, AI agents, smart contracts, and open-source software for remote teams worldwide.',
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
    'https://danieled-portfolio.vercel.app',
    'https://mwihoti-portfolio.vercel.app',
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
