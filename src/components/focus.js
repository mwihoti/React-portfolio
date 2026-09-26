'use client';

import React from 'react';
import { FaArrowRight, FaCode, FaRobot, FaTools } from 'react-icons/fa';
import { SiBitcoin, SiCardano } from 'react-icons/si';
import { Reveal, SectionHeader, AvalancheIcon, MidnightIcon } from './ui';

// `stage` is deliberately honest: it tells visitors how deep I am in each area.
const ecosystems = [
  { Icon: SiBitcoin, name: 'Bitcoin', stage: 'Learning & contributing', text: 'Rust tooling, wallets from scratch, Lightning, and Code Orange meetups.' },
  { Icon: SiCardano, name: 'Cardano', stage: 'Building', text: 'DApps with Plutus, Aiken and Mesh SDK; merged PRs to IntersectMBO and the Foundation.' },
  { Icon: AvalancheIcon, name: 'Avalanche', stage: 'Building', text: 'Public apps on Avalanche and a Team1 Africa collaborator.' },
  { Icon: MidnightIcon, name: 'Midnight', stage: 'Exploring', text: 'Zero-knowledge privacy layers for credentials and data.' },
  { Icon: FaRobot, name: 'AI automation', stage: 'Building', text: 'Agents, bots and workflows. Also studying technical AI safety.' },
  { Icon: FaCode, name: 'Full-stack', stage: 'Daily', text: 'End-to-end products: web, APIs, databases and admin tools.' },
  { Icon: FaTools, name: 'Developer tools', stage: 'Building', text: 'Tools that make open-source contribution less intimidating.' },
];

const help = [
  { title: 'Payments', text: 'Stripe, M-Pesa, PayPal or on-chain payments, wired into your product end to end.' },
  { title: 'AI features', text: 'Chatbots, semantic search and RAG pipelines on OpenAI, Groq, Gemini or LLaMA.' },
  { title: 'Blockchain integration', text: 'Wallets, signing and transactions across Bitcoin, Cardano, EVM, Solana and Starknet.' },
  { title: 'Smart contracts', text: 'Solidity, Plutus, Aiken, Cairo and Clarity: written, tested and deployed with care.' },
  { title: 'Agentic automation', text: 'AI agents, scheduled jobs and bot infrastructure that keep running after the demo.' },
  { title: 'Working in your repo', text: "I contribute to Bitcoin and Cardano codebases, so I'm used to shipping inside someone else's code." },
];

const stack = [
  { group: 'Interfaces', items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tailwind', 'HTML & CSS'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { group: 'Systems', items: ['Rust', 'Haskell', 'C++', 'Elixir (learning)'] },
  { group: 'Chains', items: ['Bitcoin & Lightning', 'Cardano (Plutus, Aiken, Mesh)', 'Stacks (Clarity)', 'Starknet (Cairo, Dojo)', 'EVM (Solidity)', 'Solana'] },
  { group: 'Delivery', items: ['Docker', 'Linux', 'Nginx', 'Git', 'CI/CD', 'Vim'] },
];

export default function Focus() {
  return (
    <section id="focus" aria-labelledby="focus-title" className="border-t border-line py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="focus-title"
          eyebrow="Ecosystems & engineering focus"
          title={
            <>
              Where I spend <span className="italic text-accent">my time.</span>
            </>
          }
          intro="I'd rather tell you where I'm deep and where I'm still learning than hand you a wall of logos."
        />

        <Reveal as="ul" className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {ecosystems.map(({ Icon, name, stage, text }) => (
            <li key={name} className="flex gap-4 bg-surface p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/30 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">{name}</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{stage}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
          <li className="flex flex-col justify-center bg-surface p-5">
            <p className="text-sm text-muted">Working in one of these?</p>
            <a href="#contact" className="link-arrow mt-2">
              Let&apos;s talk <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </li>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h3 className="font-serif text-2xl font-semibold text-ink">How I can help</h3>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {help.map(({ title, text }) => (
                <div key={title} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-mono text-sm text-accent">{title}</dt>
                  <dd className="text-sm leading-relaxed text-muted">{text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="font-serif text-2xl font-semibold text-ink">Tools I reach for</h3>
            <p className="mt-2 text-sm text-muted">
              Picked for the job and the team, not to fill a badge wall.
            </p>
            <dl className="mt-6 space-y-5">
              {stack.map(({ group, items }) => (
                <div key={group}>
                  <dt className="eyebrow !text-[11px] !text-faint">{group}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span key={item} className="chip !text-xs !text-ink/80">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
