import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content', 'writing');

// Posts are markdown files in content/writing/ with frontmatter:
//   title, date (YYYY-MM-DD), summary, tags, draft (optional).
// Drafts are visible in `npm run dev` but excluded from production builds.
export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        summary: data.summary ?? '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        draft: data.draft === true,
        content,
      };
    })
    .filter((post) => !post.draft || process.env.NODE_ENV === 'development')
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function formatPostDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
