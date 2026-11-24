import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { FaArrowLeft } from 'react-icons/fa';
import { getAllPosts, getPostBySlug, formatPostDate } from '../../../src/lib/posts';
import { SITE_URL } from '../../../src/data/site';
import Navbar from '../../../src/components/navbar';
import Footer from '../../../src/components/footer';
import ReadingProgressArticle from '../../../src/components/ReadingProgress';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Daniel Mwihoti`,
    description: post.summary,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/writing/${post.slug}`,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: ['Daniel Edward Mwihoti'],
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: ['/og-image.jpg'],
    },
  };
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    url: `${SITE_URL}/writing/${post.slug}`,
    author: { '@type': 'Person', name: 'Daniel Edward Mwihoti', url: SITE_URL },
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-16">
        {/* Client wrapper: renders this <article> plus the reading-progress bar. */}
        <ReadingProgressArticle className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <Link href="/writing" className="link-arrow mb-10">
            <FaArrowLeft className="arrow-nudge-back h-3 w-3" aria-hidden="true" />
            All writing
          </Link>

          {/* Header reveal: CSS-only fade-up on mount (plays before hydration,
              no JS needed), staggered date -> title -> tags. Reduced motion:
              a 150ms fade with no delays. */}
          <header className="mb-12 mt-10 border-b border-line pb-10">
            <p className="animate-fade-up font-mono text-xs text-faint">
              {formatPostDate(post.date)} · Daniel Mwihoti
              {post.draft && (
                <span className="ml-3 rounded-md bg-amber-500/15 px-2 py-0.5 text-amber-600 dark:text-amber-300">
                  Draft — only visible in dev
                </span>
              )}
            </p>
            <h1 className="mt-3 animate-fade-up font-serif text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl [animation-delay:80ms] motion-reduce:[animation-delay:0ms]">
              {post.title}
            </h1>
            <ul
              className="mt-5 flex animate-fade-up flex-wrap gap-1.5 [animation-delay:160ms] motion-reduce:[animation-delay:0ms]"
              aria-label="Tags"
            >
              {post.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          </header>

          {/* Body: opacity-only fade after the header (no transform on a large
              area). Links get a faint accent underline that strengthens on
              hover/focus (color-only, Tier 3). */}
          <div className="prose prose-lg max-w-none animate-fade-in dark:prose-invert prose-headings:font-serif prose-headings:scroll-mt-24 prose-a:text-accent prose-a:decoration-accent/40 prose-a:underline-offset-4 prose-a:transition-colors prose-a:duration-base prose-a:ease-enter hover:prose-a:decoration-current focus-visible:prose-a:decoration-current prose-code:font-mono [animation-delay:240ms] motion-reduce:[animation-delay:0ms]">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </ReadingProgressArticle>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
