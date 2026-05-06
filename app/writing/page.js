import Link from 'next/link';
import { FaGithub, FaLinkedin, FaArrowLeft } from 'react-icons/fa';

const SITE_URL = 'https://mwihoti-portfolio.vercel.app';

export const metadata = {
  title: 'Writing — Daniel Mwihoti',
  description:
    'Essays, guides, and notes by Daniel Mwihoti on Bitcoin, Cardano, Rust, AI tooling, and developer workflows.',
  alternates: {
    canonical: '/writing',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/writing`,
    title: 'Writing — Daniel Mwihoti',
    description:
      'Essays, guides, and notes on Bitcoin, Cardano, Rust, AI tooling, and developer workflows.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing — Daniel Mwihoti',
    description:
      'Essays, guides, and notes on Bitcoin, Cardano, Rust, AI tooling, and developer workflows.',
    images: ['/og-image.jpg'],
  },
};

const articles = [
  {
    title: 'How to Use Claude Code for Free',
    summary:
      'A practical guide showing developers how to set up and use Claude Code without paying for it. Covers installation, configuration, and the workflows I use day-to-day.',
    date: 'May 2026',
    tags: ['Claude Code', 'AI tooling', 'Developer workflow'],
    primary: {
      label: 'Read on GitHub',
      href: 'https://github.com/mwihoti/claudecodesetup/blob/main/claudecodesetup.md',
      icon: FaGithub,
    },
    secondary: {
      label: 'LinkedIn post',
      href: 'https://www.linkedin.com/feed/update/urn:li:activity:7457146497004965890/',
      icon: FaLinkedin,
    },
  },
];

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors mb-10"
        >
          <FaArrowLeft className="h-3 w-3" aria-hidden="true" />
          Back to portfolio
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-400 glow-teal mb-4">
            Writing
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Essays, guides, and notes on Bitcoin, Cardano, Rust, AI tooling, and
            developer workflows.
          </p>
        </header>

        <div className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.title}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 card-glow"
            >
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                {article.date}
              </p>
              <h2 className="text-2xl font-bold text-white mb-3">{article.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-4">{article.summary}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-xs bg-teal-900/40 text-teal-300 rounded-full border border-teal-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={article.primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium transition-colors"
                >
                  <article.primary.icon className="h-4 w-4" aria-hidden="true" />
                  {article.primary.label}
                </a>
                {article.secondary && (
                  <a
                    href={article.secondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 hover:border-teal-500 text-gray-300 hover:text-teal-400 text-sm font-medium transition-colors"
                  >
                    <article.secondary.icon className="h-4 w-4" aria-hidden="true" />
                    {article.secondary.label}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-800 text-sm text-gray-500">
          More writing coming. Follow on{' '}
          <a
            href="https://x.com/notstupiddev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:underline"
          >
            X
          </a>{' '}
          or{' '}
          <a
            href="https://github.com/mwihoti"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:underline"
          >
            GitHub
          </a>
          .
        </footer>
      </div>
    </main>
  );
}
