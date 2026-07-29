import Link from 'next/link';
import { FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { SITE_URL, GITHUB_URL, X_URL } from '../../src/data/site';
import { getAllPosts, formatPostDate } from '../../src/lib/posts';
import ThemeWrapper from '../../src/components/ThemeWrapper';
import Navbar from '../../src/components/navbar';
import Footer from '../../src/components/footer';

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
  const posts = getAllPosts();

  return (
    <ThemeWrapper>
      <div className="bg-white dark:bg-[#0a0a0f] transition-colors duration-300">
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] text-gray-800 dark:text-gray-200 pt-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-teal-600 dark:text-teal-400 glow-teal mb-4">
                Writing
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Essays, guides, and notes on Bitcoin, Cardano, Rust, AI tooling, and
                developer workflows.
              </p>
            </header>

            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 card-glow"
                >
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
                    {formatPostDate(post.date)}
                    {post.draft && (
                      <span className="ml-3 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 normal-case">
                        Draft
                      </span>
                    )}
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 rounded-full border border-teal-200 dark:border-teal-800/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/writing/${post.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium transition-colors"
                  >
                    Read the post
                    <FaArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </article>
              ))}

              {articles.map((article) => (
                <article
                  key={article.title}
                  className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 card-glow"
                >
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
                    {article.date}
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {article.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 rounded-full border border-teal-200 dark:border-teal-800/50"
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-teal-500 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 text-sm font-medium transition-colors"
                      >
                        <article.secondary.icon className="h-4 w-4" aria-hidden="true" />
                        {article.secondary.label}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500">
              More writing coming. Follow on{' '}
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 dark:text-teal-400 hover:underline"
              >
                X
              </a>{' '}
              or{' '}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 dark:text-teal-400 hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeWrapper>
  );
}
