import Navbar from '../src/components/navbar';
import Profile from '../src/components/profile';
import CaseStudies from '../src/components/caseStudies';
import Work from '../src/components/work';
import Focus from '../src/components/focus';
import About from '../src/components/about';
import WritingPreview from '../src/components/writingPreview';
import Contact from '../src/components/contact';
import Footer from '../src/components/footer';
import ChatBot from '../src/components/ChatBot';
import { getAllPosts, formatPostDate } from '../src/lib/posts';
import { externalArticles } from '../src/data/articles';

// Order follows the case study's journey: who → proof → breadth → focus →
// person → thinking → action.
export default function Home() {
  const posts = getAllPosts();
  const writing = [
    ...posts.map((p) => ({
      title: p.title,
      summary: p.summary,
      date: formatPostDate(p.date),
      href: `/writing/${p.slug}`,
    })),
    ...externalArticles.map((a) => ({ ...a, external: true })),
  ].slice(0, 4);

  return (
    <>
      <Navbar />
      <main id="main">
        <Profile />
        <CaseStudies publishedSlugs={posts.map((p) => p.slug)} />
        <Work />
        <Focus />
        <About />
        {writing.length > 0 && <WritingPreview posts={writing} />}
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
