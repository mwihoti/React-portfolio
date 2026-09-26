// Every public project shown on the homepage. Projects with a `caseStudy`
// block are featured in the Case Studies section; the rest go in the grid.
// `writeup` is only linked when that /writing post is published.

export const FILTERS = ['All', 'Bitcoin', 'Web3', 'AI', 'Fullstack', 'Telegram', 'Game'];

export const projects = [
  {
    title: 'StackMate',
    kind: 'Builder marketplace on Bitcoin L2',
    ecosystem: 'Bitcoin · Stacks',
    status: 'Building',
    problem:
      'Stacks builders and founders need a trusted way to find co-builders, with partnerships verifiable on-chain rather than just word-of-mouth.',
    description:
      'Builder-partner marketplace on Bitcoin L2 (Stacks). Project owners post partner requests; builders browse, apply with a pitch, and get accepted — every key action (registration, application, acceptance, mutual endorsement) is anchored on-chain via four Clarity smart contracts on Stacks mainnet (Nakamoto epoch 3.4). Off-chain Postgres handles search and metadata; on-chain principals form the verifiable reputation trail.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Clarity', 'Stacks', '@stacks/connect', 'Neon Postgres', 'Drizzle ORM', 'Tailwind v4'],
    live: 'https://stack-mate.vercel.app',
    github: 'https://github.com/mwihoti/StackMate',
    category: ['Bitcoin', 'Web3', 'Fullstack'],
    image: '/projects/stackmate.jpg',
    featured: true,
    writeup: 'building-stackmate-on-stacks',
  },
  {
    title: 'Open Wallet Standard',
    kind: 'Multi-chain wallet for AI agents',
    ecosystem: 'AI · Multi-chain',
    status: 'OWS Hackathon',
    problem: 'AI agents need to sign blockchain transactions without ever exposing raw private keys.',
    description:
      'Multi-chain AI agent wallet supporting 9 chains (EVM, Solana, Bitcoin, Cosmos, XRPL+). Policy-gated signing tokens — AI agents never hold raw keys. Includes Solana + EVM signature verification and live testnet transactions.',
    tech: ['TypeScript', 'Rust', 'React', 'Solana', 'EVM', 'Bitcoin', 'Cosmos', 'XRPL'],
    live: 'https://open-wallet-standard.onrender.com',
    github: 'https://github.com/mwihoti/open-wallet-standard',
    category: ['Web3', 'AI', 'Bitcoin'],
    image: '/projects/open-wallet-standard.jpg',
    featured: true,
  },
  {
    title: 'Bitcoin Wallet Lab',
    kind: 'Bitcoin from first principles, in Rust',
    ecosystem: 'Bitcoin',
    problem:
      'Show exactly how Bitcoin works at every layer — from key generation to signed, broadcast transactions on testnet.',
    description:
      'Educational Bitcoin wallet on testnet4 built on what I learned from Bitcoin Dojo. Generate all three address types (P2PKH, Nested SegWit, Native SegWit) from a single key, receive testnet coins, build and sign a real transaction, then broadcast and watch it confirm on-chain. secp256k1 + ECDSA + RFC 6979 implemented from scratch in a vendored bitcoin_dojo crate. Includes signature malleability demo.',
    tech: ['Rust', 'Axum', 'Tokio', 'secp256k1', 'ECDSA', 'Docker'],
    live: 'https://wallet-lab.onrender.com',
    github: 'https://github.com/mwihoti/wallet_lab',
    category: ['Bitcoin'],
    image: '/projects/bitcoin-wallet-lab.jpg',
    featured: true,
  },
  {
    title: 'OmniCaption AI',
    kind: 'Multi-agent video intelligence',
    ecosystem: 'AI',
    status: 'AMD Hackathon',
    problem:
      'Most captioning systems only transcribe speech — accessibility and content teams need to know what actually happened in a video.',
    description:
      'Multi-agent video intelligence system built for the AMD Developer Hackathon ACT II. 13 specialised AI agents (scene detection, Whisper ASR, VLM vision understanding, emotion analysis, self-verification) collaborate to turn one video into captions in 4 styles, rich accessibility descriptions for blind users, an emotion timeline, highlights, memes, and platform-ready social posts.',
    tech: ['Python', 'TypeScript', 'React', 'FFmpeg', 'Whisper', 'Fireworks AI', 'ROCm', 'Docker'],
    live: 'https://omnicaptionai.fly.dev',
    github: 'https://github.com/mwihoti/OmniCaption-AI',
    category: ['AI', 'Fullstack'],
    image: '/projects/omnicaption-ai.jpg',
  },
  {
    title: 'Certified Chain',
    kind: 'Credential issuance on Cardano',
    ecosystem: 'Cardano · Midnight',
    problem:
      'Give institutions a tamper-proof way to issue, verify, and revoke credentials without a centralised authority.',
    description:
      'Blockchain credential-issuance platform on Cardano: certificate NFTs minted via Mesh SDK and Blockfrost, an Aiken on-chain revocation contract, and a zero-knowledge privacy layer (Midnight Network) so only hashes touch the chain. Certificate metadata is pinned to IPFS via Pinata; employers verify instantly via on-chain transaction hash.',
    tech: ['Next.js', 'TypeScript', 'Cardano', 'Mesh SDK', 'Aiken', 'Midnight Network', 'IPFS', 'Neon Postgres'],
    live: 'https://certified-chain.vercel.app',
    github: 'https://github.com/mwihoti/certified-chain',
    category: ['Web3'],
    image: '/projects/litecert.jpg',
  },
  {
    title: 'BobOpenSource',
    kind: 'AI guide for first-time contributors',
    ecosystem: 'AI · Developer tools',
    problem:
      'New contributors face unfamiliar repos with no map — which files matter, what could break, where to start.',
    description:
      'AI developer tool that analyzes a GitHub repo and issue, maps dependencies, and generates an implementation roadmap with code guidance and risk notes — plus an interactive "Ask Bob" Q&A over the analysis.',
    tech: ['Next.js', 'React', 'Node.js', 'GitHub API', 'Neon Postgres', 'Clerk'],
    live: 'https://bobopensource-live.vercel.app',
    category: ['AI', 'Fullstack'],
    image: '/projects/bobopensource.jpg',
  },
  {
    title: 'Memorabilia',
    kind: 'On-chain memory game on Starknet',
    ecosystem: 'Starknet',
    status: 'Telegram Mini App',
    problem:
      'Build a fully on-chain game for the Dojo Game Night hackathon, accessible via Telegram without crypto knowledge.',
    description:
      'Fully on-chain memory card matching game on Starknet, built for the Dojo Game Night hackathon. Playable as a Telegram Mini App (@enter_memorabilia_musem_bot) — no wallet or gas fees to start. Features Account Abstraction, gasless transactions, 3 eras, 15 levels, daily challenges, and NFT minting via Cartridge.',
    tech: ['TypeScript', 'Starknet', 'Dojo Engine', 'Cairo', 'Telegram Mini App'],
    live: 'https://memorabilia-game.vercel.app',
    github: 'https://github.com/mwihoti/memorabilia',
    telegram: 'https://t.me/enter_memorabilia_musem_bot',
    category: ['Web3', 'Game', 'Telegram'],
    image: '/projects/memorabilia.jpg',
  },
  {
    title: 'Daily Habit Hub',
    kind: 'Fitness accountability on Avalanche',
    ecosystem: 'Avalanche',
    problem:
      'Build exercise habits through daily accountability, community support, and on-chain proof of progress on Avalanche.',
    description:
      'Modern fitness tracking app combining social accountability with Web3 rewards. Daily check-ins across gym, running, cycling, yoga and more. Visual streak tracking, community feed, professional coaching connections, and $HABIT token rewards + "Proof of Progress" NFT minting on the Avalanche network.',
    tech: ['Next.js', 'Supabase', 'Avalanche', 'Wagmi', 'RainbowKit', 'TanStack Query', 'shadcn/ui'],
    live: 'https://daily-habit-hub.vercel.app',
    github: 'https://github.com/mwihoti/daily-habit-hub',
    category: ['Web3', 'Fullstack'],
    image: '/projects/daily-habit-hub.jpg',
  },
  {
    title: 'Computer Vision — Traffic & Attendance',
    kind: 'Edge inference in Python and Rust',
    ecosystem: 'AI · Computer vision',
    problem:
      'Real-time vehicle speed, traffic jam detection, and person tracking at the edge with zero cloud latency.',
    description:
      'Edge-native CV system for real-time traffic sensing and multi-class object counting. Dual-stack architecture: Python (Ultralytics + DeepFace for gender analysis) for prototyping, and Rust (ort/ONNX Runtime + OpenCV) for high-performance edge inference. Homography-based pixel-to-meter calibration for science-grade speed data. Designed to run on NVIDIA Jetson.',
    tech: ['Python', 'Rust', 'YOLO', 'ONNX Runtime', 'OpenCV', 'DeepFace'],
    github: 'https://github.com/mwihoti/computer_vision',
    category: ['AI'],
    image: '/projects/computer-vision.jpg',
  },
  {
    title: 'Bitcoin OSS Triage',
    kind: 'Daily open-source digest on Telegram',
    ecosystem: 'AI · Bitcoin',
    status: 'Live bot',
    problem:
      'Finding high-signal open-source contribution opportunities means trawling issue trackers by hand every day.',
    description:
      'Autonomous agent that scans GitHub repositories daily for good-first-issue, help-wanted, and bug labels, analyzes each with an LLM, and delivers a prioritized digest via Telegram. Built with Node.js, Gemini/Groq/Ollama, Airtable, and cron scheduling.',
    tech: ['Telegram Bot API', 'Node.js', 'LLM', 'Airtable', 'Cron'],
    github: 'https://github.com/mwihoti/danpersonalagent',
    telegram: 'https://t.me/btc_opensource_projects_bot',
    category: ['AI', 'Telegram', 'Bitcoin'],
  },
  {
    title: 'Second Brain',
    kind: 'Personal AI memory on Telegram',
    ecosystem: 'AI',
    status: 'Live bot',
    problem:
      'Capture ideas, links, and notes the moment they hit — recall them later in plain language.',
    description:
      'Personal AI second-brain on Telegram. Forward links, drop voice notes, jot ideas; ask questions in natural language and the bot retrieves with context. Built around an LLM + vector store so semantic search beats keyword grep.',
    tech: ['Telegram Bot API', 'LLM', 'Vector DB', 'Python'],
    telegram: 'https://t.me/danmwisecondbrainbot',
    category: ['AI', 'Telegram'],
  },
];
