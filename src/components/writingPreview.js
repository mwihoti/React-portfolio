'use client';

import React from 'react';
import NextLink from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { Reveal, SectionHeader } from './ui';

// `posts` is passed in from the server page (src/lib/posts.js reads the filesystem).
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
            All writing <FaArrowRight className="h-3 w-3" aria-hidden="true" />
          </NextLink>
        </SectionHeader>

        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.href} delay={i * 0.05}>
              <article className="panel panel-hover group relative flex h-full flex-col p-6">
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
                <p className="link-arrow mt-auto pt-5 group-hover:underline">
                  {post.external ? 'Read on GitHub' : 'Read the post'} <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
