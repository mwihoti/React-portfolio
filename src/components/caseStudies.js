'use client';

import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { SiBitcoin, SiCardano } from 'react-icons/si';
import { projects } from '../data/projects';
import { GITHUB_URL } from '../data/site';
import { Reveal, AvalancheIcon, MidnightIcon } from './ui';

const featured = projects.filter((p) => p.featured);

const ecosystemIcons = [
  { Icon: SiBitcoin, label: 'Bitcoin' },
  { Icon: SiCardano, label: 'Cardano' },
  { Icon: AvalancheIcon, label: 'Avalanche' },
  { Icon: MidnightIcon, label: 'Midnight' },
];

function CaseStudy({ project, index, hasWriteup }) {
  return (
    <Reveal as="article" delay={index * 0.05} className="panel panel-hover overflow-hidden">
      {project.image && (
        <div className="relative aspect-[2/1] border-b border-line">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-top"
          />
        </div>
      )}

      <div className="flex flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-ink">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.kind}</p>
          </div>
          <span className="shrink-0 font-mono text-xs text-accent">{project.ecosystem}</span>
        </div>

        <dl className="mt-5 grid gap-5 text-[15px] leading-relaxed md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <dt className="eyebrow !text-[11px] !text-faint">The problem</dt>
            <dd className="mt-1 text-ink">{project.problem}</dd>
          </div>
          <div>
            <dt className="eyebrow !text-[11px] !text-faint">What I built</dt>
            <dd className="mt-1 text-muted">{project.description}</dd>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
          {project.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="link-arrow">
              <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" /> Live site
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-muted hover:text-ink"
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" /> GitHub
            </a>
          )}
          {hasWriteup && (
            <NextLink href={`/writing/${project.writeup}`} className="link-arrow ml-auto">
              Read the write-up <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </NextLink>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function CaseStudies({ publishedSlugs = [] }) {
  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="border-t border-line py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.34fr_0.66fr] lg:px-8">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="border-l-2 border-accent pl-5">
            <p className="eyebrow mb-3">Case studies</p>
            <h2 id="case-studies-title" className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-ink">
              Things I&apos;ve <span className="italic text-accent">built</span>, and why.
            </h2>
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted">
            A few projects I&apos;m proudest of, across Bitcoin, Cardano, Avalanche and AI. Each
            one starts with the problem, because that&apos;s where I start too.
          </p>

          <ul className="mt-8 flex gap-2" aria-label="Ecosystems I build in">
            {ecosystemIcons.map(({ Icon, label }) => (
              <li
                key={label}
                title={label}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-line text-accent"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </li>
            ))}
          </ul>

          <div className="panel mt-8 p-5">
            <p className="eyebrow !text-[11px]">Why build in public?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              It keeps me accountable, makes the work easy to review, and helps other people
              learn. Issues, ideas and pull requests are welcome on{' '}
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                any of my repos
              </a>
              .
            </p>
          </div>
        </Reveal>

        <div className="space-y-6">
          {featured.map((project, i) => (
            <CaseStudy
              key={project.title}
              project={project}
              index={i}
              hasWriteup={Boolean(project.writeup && publishedSlugs.includes(project.writeup))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
