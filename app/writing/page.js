import Link from 'next/link';
import { FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { SITE_URL, GITHUB_URL, X_URL } from '../../src/data/site';
import { getAllPosts, formatPostDate } from '../../src/lib/posts';
import { externalArticles } from '../../src/data/articles';
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

function Tags({ tags }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag} className="chip">
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-16">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <header className="mb-14 border-l-2 border-accent pl-5">
            <p className="eyebrow mb-3">Writing &amp; notes</p>
            <h1 className="font-serif text-5xl font-semibold tracking-tight text-ink">
              Notes from <span className="italic text-accent">the workbench.</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Essays, guides and build logs on Bitcoin, Cardano, Rust, AI tooling and developer
              workflows. Mostly written so I remember how I did something, then shared in case it
              helps you too.
            </p>
          </header>

          <div className="divide-y divide-line border-y border-line">
            {posts.map((post) => (
              <article key={post.slug} className="py-8">
                <p className="font-mono text-xs text-faint">
                  {formatPostDate(post.date)}
                  {post.draft && (
                    <span className="ml-3 rounded-md bg-amber-500/15 px-2 py-0.5 text-amber-600 dark:text-amber-300">
                      Draft
                    </span>
                  )}
                </p>
                <h2 className="mt-2 font-serif text-3xl font-semibold leading-snug text-ink">
                  <Link href={`/writing/${post.slug}`} className="hover:text-accent">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{post.summary}</p>
                <Tags tags={post.tags} />
                <Link href={`/writing/${post.slug}`} className="link-arrow mt-5">
                  Read the post <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </article>
            ))}

            {externalArticles.map((article) => (
              <article key={article.title} className="py-8">
                <p className="font-mono text-xs text-faint">{article.date}</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold leading-snug text-ink">
                  <a href={article.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {article.title}
                  </a>
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{article.summary}</p>
                <Tags tags={article.tags} />
                <div className="mt-5 flex flex-wrap gap-6">
                  <a href={article.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    <FaGithub className="h-3.5 w-3.5" aria-hidden="true" /> Read on GitHub
                  </a>
                  {article.linkedin && (
                    <a
                      href={article.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-sm text-muted hover:text-ink"
                    >
                      <FaLinkedin className="h-3.5 w-3.5" aria-hidden="true" /> LinkedIn post
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted">
            More on the way. Follow along on{' '}
            <a href={X_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              X
            </a>{' '}
            or{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              GitHub
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
