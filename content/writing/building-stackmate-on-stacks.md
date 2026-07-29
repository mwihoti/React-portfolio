---
title: "Building StackMate: a builder-partner marketplace on Bitcoin L2"
date: "2026-07-29"
summary: "Why I'm building StackMate on Stacks, and how four Clarity smart contracts anchor a verifiable builder reputation trail on-chain."
tags: ["Stacks", "Bitcoin", "Clarity", "Building in public"]
draft: true
---

Stacks builders and founders need a trusted way to find co-builders — with partnerships verifiable on-chain rather than just word-of-mouth. That's the problem StackMate is built to solve.

## What it does

Project owners post partner requests. Builders browse, apply with a pitch, and get accepted. Every key action — registration, application, acceptance, mutual endorsement — is anchored on-chain via four Clarity smart contracts on Stacks mainnet (Nakamoto epoch 3.4).

Off-chain Postgres handles search and metadata; on-chain principals form the verifiable reputation trail.

## Why on-chain reputation

TODO: explain why word-of-mouth reputation fails builders, and what on-chain endorsements change.

## The architecture

TODO: walk through the four Clarity contracts — what each one owns, and how the off-chain layer (Neon Postgres + Drizzle ORM) stays in sync.

## What I've learned so far

TODO: the hard parts — Clarity's post-conditions? Testing against mainnet? Indexing on-chain events?

## What's next

TODO: current status and roadmap.

---

*StackMate is live at [stack-mate.vercel.app](https://stack-mate.vercel.app) — code on [GitHub](https://github.com/mwihoti/StackMate).*
