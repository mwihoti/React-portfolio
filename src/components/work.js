'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { FaArrowUp, FaExternalLinkAlt, FaGithub, FaSearch, FaTelegramPlane, FaCode } from 'react-icons/fa';
import { FILTERS, projects } from '../data/projects';
import { GITHUB_URL } from '../data/site';
import { Reveal, SectionHeader } from './ui';

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

function ProjectCard({ project }) {
  return (
    <article className="panel panel-hover flex h-full flex-col overflow-hidden">
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
          <a href="#case-studies" className="link-arrow mt-4 text-xs">
            <FaArrowUp className="h-3 w-3" aria-hidden="true" /> Full case study above
          </a>
        ) : (
          <details className="group mt-4 text-sm">
            <summary className="cursor-pointer list-none font-mono text-xs text-faint hover:text-ink [&::-webkit-details-marker]:hidden">
              <span className="inline-block transition-transform group-open:rotate-90">›</span> How it works
            </summary>
            <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Stack">
              {project.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 font-mono text-xs">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
                <FaGithub className="h-3.5 w-3.5" aria-hidden="true" /> Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
                <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" /> Live
              </a>
            )}
            {project.telegram && (
              <a href={project.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
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
