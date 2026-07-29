import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { FaArrowLeft } from 'react-icons/fa';
import { getAllPosts, getPostBySlug, formatPostDate } from '../../../src/lib/posts';
import { SITE_URL } from '../../../src/data/site';
import ThemeWrapper from '../../../src/components/ThemeWrapper';
import Navbar from '../../../src/components/navbar';
import Footer from '../../../src/components/footer';

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
    <ThemeWrapper>
      <div className="bg-white dark:bg-[#0a0a0f] transition-colors duration-300">
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] text-gray-800 dark:text-gray-200 pt-16">
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400 hover:underline mb-10"
            >
              <FaArrowLeft className="h-3 w-3" aria-hidden="true" />
              All writing
            </Link>

            <header className="mb-10">
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
                {formatPostDate(post.date)}
                {post.draft && (
                  <span className="ml-3 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 normal-case">
                    Draft — only visible in dev
                  </span>
                )}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-xs bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 rounded-full border border-teal-200 dark:border-teal-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="prose prose-gray dark:prose-invert max-w-none prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-headings:scroll-mt-24">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </article>
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </div>
    </ThemeWrapper>
  );
}
