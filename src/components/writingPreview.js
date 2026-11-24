'use client';

import React from 'react';
import NextLink from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { SectionHeader } from './ui';
import { Stagger, StaggerItem } from './motion';

// `posts` is passed in from the server page (src/lib/posts.js reads the filesystem).
//
// Motion: cards reveal in sequence when the grid scrolls into view. On hover
// (or keyboard focus on the card's link) the card border warms and lifts 2px
// (.panel-hover), the "Read" underline fades in and its arrow nudges 3px.
// Reduced motion: 150ms fades, border/underline color only, no lift or nudge.
// The arrow's focus nudge comes from the shared `.group:has(:focus-visible)
// .arrow-nudge` rule in src/index.css.
const UNDERLINE_FOCUS = 'group-has-[:focus-visible]:[text-decoration-color:currentColor]';
export default function WritingPreview({ posts = [] }) {
  return (
    <section id="writing" aria-labelledby="writing-title" className="border-t border-line py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="writing-title"
          eyebrow="Writing & notes"
          title={
            <>
              Notes from <span className="italic text-accent">the workbench.</span>
            </>
          }
          intro="Guides and build logs. Mostly written so I remember how I did something, then shared in case it helps you too."
        >
          <NextLink href="/writing" className="link-arrow">
            All writing <FaArrowRight className="arrow-nudge h-3 w-3" aria-hidden="true" />
          </NextLink>
        </SectionHeader>

        <Stagger className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <StaggerItem
              as="article"
              key={post.href}
              className="panel panel-hover group relative flex h-full flex-col p-6"
            >
              <p className="font-mono text-xs text-faint">{post.date}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-ink">
                {post.external ? (
                  <a href={post.href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                    {post.title}
                  </a>
                ) : (
                  <NextLink href={post.href} className="after:absolute after:inset-0">
                    {post.title}
                  </NextLink>
                )}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{post.summary}</p>
              <p className={`link-arrow mt-auto pt-5 group-hover:underline ${UNDERLINE_FOCUS}`}>
                {post.external ? 'Read on GitHub' : 'Read the post'}{' '}
                <FaArrowRight className="arrow-nudge h-3 w-3" aria-hidden="true" />
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
