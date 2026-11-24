'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { FaArrowUp, FaExternalLinkAlt, FaGithub, FaSearch, FaTelegramPlane, FaCode } from 'react-icons/fa';
import { FILTERS, projects } from '../data/projects';
import { GITHUB_URL } from '../data/site';
import { SectionHeader } from './ui';
import { Reveal, useReduceMotion } from './motion';
import { DISTANCE, DURATION, EASE, STAGGER, TRANSITION, VIEWPORT, presence } from '../lib/motion';

// Motion notes (see .claude/skills: micro-interaction, 60fps-animation,
// accessible-animation):
// - Filter buttons share one sliding "pill" (framer layoutId) so the eye
//   follows the selection from button to button.
// - The grid animates filtering: cards that leave fade out quickly and are
//   popped out of flow (AnimatePresence mode="popLayout"), the remaining cards
//   slide to their new cells (layout="position": transform only, so text and
//   borders never stretch), and new cards fade in.
// - On first load each card still reveals on scroll, exactly as before.
// - Reduced motion: MotionConfig (src/context/theme.js) snaps every layout move
//   and the pill; what remains is a 150ms opacity fade (Tier 2). Colors and
//   focus rings are untouched (Tier 3).

// Link underline that fades in on hover/focus (color only, wrap-safe); same
// behavior as .link-arrow without its font/size. Arbitrary property so the
// color transition doesn't override anything else on the element.
const FADE_UNDERLINE =
  'underline decoration-transparent underline-offset-4 [transition-property:color,text-decoration-color] duration-base ease-enter hover:decoration-current focus-visible:decoration-current';

// "How it works" disclosure. The native <details> stays in charge of open/close
// (keyboard, find-in-page, no-JS all keep working); its content just fades and
// rises 8px when it opens. Transform/opacity only, so opening never animates
// layout. CSS-only, so it also works before hydration. Reduced motion: a 150ms
// fade with no movement. Closing is instant, as the platform does it.
const DISCLOSURE_ENTER =
  'motion-safe:group-open:animate-[fade-up_300ms_cubic-bezier(0.22,1,0.36,1)_backwards] motion-reduce:group-open:animate-[fade-in_150ms_linear_backwards]';

function matches(project, query) {
  if (!query) return true;
  const haystack = [project.title, project.kind, project.problem, project.description, ...project.tech]
    .join(' ')
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

// The card itself is not a link (it holds several links and a <details>), so
// hover only warms the border; a lift would suggest a click target.
function ProjectCard({ project }) {
  return (
    <article className="panel panel-hover no-lift flex h-full flex-col overflow-hidden">
      {project.image ? (
        <div className="relative aspect-[16/9] border-b border-line">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center border-b border-line bg-raised">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-accent/40 text-accent">
            {project.telegram ? <FaTelegramPlane className="h-6 w-6" /> : <FaCode className="h-6 w-6" />}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
          {project.status && (
            <span className="shrink-0 rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
              {project.status}
            </span>
          )}
        </div>
        <p className="mt-0.5 font-mono text-xs text-accent">{project.kind}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.problem}</p>

        {project.featured ? (
          <a href="#case-studies" className="group/up link-arrow mt-4 text-xs">
            <FaArrowUp
              className="h-3 w-3 motion-safe:transition-[translate] motion-safe:duration-base motion-safe:ease-enter motion-safe:group-hover/up:[translate:0_-2px] motion-safe:group-focus-visible/up:[translate:0_-2px]"
              aria-hidden="true"
            />{' '}
            Full case study above
          </a>
        ) : (
          <details className="group mt-4 text-sm">
            <summary className="cursor-pointer list-none font-mono text-xs text-faint transition-colors duration-base ease-enter hover:text-ink [&::-webkit-details-marker]:hidden">
              <span className="inline-block transition-transform duration-base ease-enter group-open:rotate-90">
                ›
              </span>{' '}
              How it works
            </summary>
            <div className={DISCLOSURE_ENTER}>
              <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Stack">
                {project.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        )}

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 font-mono text-xs">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition-colors duration-base ease-enter hover:text-ink">
                <FaGithub className="h-3.5 w-3.5" aria-hidden="true" /> Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-accent ${FADE_UNDERLINE}`}>
                <FaExternalLinkAlt className="arrow-nudge-up h-3 w-3" aria-hidden="true" /> Live
              </a>
            )}
            {project.telegram && (
              <a href={project.telegram} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-accent ${FADE_UNDERLINE}`}>
                <FaTelegramPlane className="h-3.5 w-3.5" aria-hidden="true" /> Open in Telegram
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const visible = useMemo(
    () =>
      projects.filter(
        (p) => (filter === 'All' || p.category.includes(filter)) && matches(p, query.trim())
      ),
    [filter, query]
  );

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="projects-title"
          eyebrow="All projects"
          title={
            <>
              Public projects. <span className="italic text-accent">Open source first.</span>
            </>
          }
          intro="Everything I've shipped in the open, from hackathon builds to bots I use every day. Search it, filter it, poke at the code."
        >
          <label className="relative block w-full md:w-72">
            <span className="sr-only">Search projects</span>
            <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: Rust, Cardano, agents…"
              className="w-full rounded-lg border border-line bg-surface py-2.5 pl-10 pr-3 font-mono text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            />
          </label>
        </SectionHeader>

        <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by topic">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-lg border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                filter === f
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-line text-muted hover:border-accent/50 hover:text-ink'
              }`}
            >
              {f}
            </button>
          ))}
          <p className="ml-auto font-mono text-xs text-faint" aria-live="polite">
            {visible.length} of {projects.length}
          </p>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project, i) => (
              <Reveal key={project.title} delay={Math.min(i, 5) * 0.04} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="panel p-10 text-center">
            <p className="text-ink">Nothing here matches &ldquo;{query}&rdquo;.</p>
            <p className="mt-2 text-sm text-muted">
              Try a different word, or{' '}
              <button
                onClick={() => {
                  setQuery('');
                  setFilter('All');
                }}
                className="text-accent hover:underline"
              >
                show everything
              </button>
              .
            </p>
          </div>
        )}

        <div className="panel mt-10 flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <p className="font-mono text-sm text-muted">
            <span className="text-accent">&gt;_</span> There&apos;s more on GitHub: experiments, forks, half-finished ideas.
          </p>
          <a href={`${GITHUB_URL}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2">
            <FaGithub className="h-4 w-4" aria-hidden="true" /> Browse repos
          </a>
        </div>
      </div>
    </section>
  );
}
