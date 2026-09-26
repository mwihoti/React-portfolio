'use client';

import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { NOW, PROOF_POINTS } from '../data/site';
import { Reveal, SectionHeader } from './ui';
import Experience from './experience';
import ContributionGraph from './ContributionGraph';
import GitHubStats from './GitHubStats';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="about-title"
          eyebrow="About"
          title={
            <>
              The person behind <span className="italic text-accent">the commits.</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              <span className="text-ink">I&apos;m Daniel, a Nairobi-based engineer who likes doing hard things.</span>{' '}
              I started out as a curious IT student and kept pulling the thread: full-stack web
              systems first, then smart contracts, then AI automation and blockchain products.
            </p>
            <p>
              Most of my work now happens in the open. I build with Bitcoin, Cardano, Rust,
              Python, React and Next.js, and I send pull requests to the projects I depend on.
              Away from the editor you&apos;ll find me at Code Orange and local developer meetups,
              or helping out with Team1 Africa.
            </p>
            <p>
              If you have a product to ship or a feature that&apos;s stuck, I&apos;d like to hear
              about it.{' '}
              <a href="#contact" className="link-arrow text-base">
                Say hello <FaArrowRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </p>

            <div className="panel !mt-10 p-6">
              <p className="eyebrow">Now</p>
              <dl className="mt-4 space-y-3 text-base">
                {NOW.map(({ label, text, href }) => (
                  <div key={label} className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                    <dt className="font-mono text-sm text-faint">{label}</dt>
                    <dd className="text-ink">
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
                          {text}
                        </a>
                      ) : (
                        text
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col items-center lg:items-end">
            <figure className="w-full max-w-[300px]">
              <div className="panel overflow-hidden p-2">
                {/* Native portrait video (608x1080), framed 9:16 */}
                <div className="relative aspect-[9/16] overflow-hidden rounded-lg">
                  <video
                    controls
                    preload="none"
                    poster="/video-poster.jpg"
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src="/intro-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-faint">
                A short hello, in my own words.
              </figcaption>
            </figure>

            <dl className="mt-8 grid w-full max-w-[300px] grid-cols-3 gap-2 text-center">
              {PROOF_POINTS.map(({ value, label }) => (
                <div key={label} className="panel px-2 py-3">
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="block font-serif text-2xl font-semibold text-accent">{value}</span>
                    <span className="mt-1 block text-[11px] leading-tight text-muted">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <h3 className="font-serif text-2xl font-semibold text-ink">What I&apos;ve been up to</h3>
          <p className="mt-2 mb-6 text-sm text-muted">Work, open source and community, most recent first.</p>
          <Experience />
        </Reveal>

        <Reveal className="panel mt-16 p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-mono text-sm text-ink">GitHub activity</h3>
            <GitHubStats />
          </div>
          <ContributionGraph />
        </Reveal>
      </div>
    </section>
  );
}
