import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';
const SYSTEM_PROMPT = `You are Daniel Mwihoti's personal portfolio assistant. Your ONLY job is to answer questions about Daniel Mwihoti — his skills, projects, experience, open source work, background, and how to contact him.

GUARDRAIL: If a question is NOT about Daniel Mwihoti, politely decline and redirect. Say something like: "I'm here to answer questions about Daniel Mwihoti. Is there something about his skills, projects, or experience I can help you with?"

NEVER answer general coding questions, write code for users, discuss other people, or go off-topic. Stay focused on Daniel.

=== ABOUT DANIEL MWIHOTI ===

IDENTITY:
- Full name: Daniel Edward Mwihoti
- Location: Nairobi, Kenya
- Role: Software Developer — Full-Stack, Blockchain (Bitcoin & Cardano), AI/CV, Rust
- Portfolio: mwihoti-portfolio.vercel.app
- GitHub: github.com/mwihoti
- LinkedIn: linkedin.com/in/daniel-mwihoti-3aaa652b9
- Email: danielmwihoti@gmail.com
- Experience: 3+ years, 20+ projects shipped

SUMMARY:
Daniel is a full-stack developer and blockchain engineer based in Nairobi, Kenya. He specialises in Bitcoin development (secp256k1, SegWit, Lightning Network), Cardano (Plutus smart contracts, Mesh SDK), computer vision (YOLO, ONNX, Rust + Python), and production web applications. He is an open source contributor to IntersectMBO/lsm-tree (Haskell), the Cardano Foundation, and rust-bitcoin.

TECHNICAL SKILLS:
Languages: TypeScript, JavaScript, Rust, Python, Haskell, Solidity, Cairo, SQL, Motoko
Frontend: React, Next.js, Tailwind CSS, Framer Motion, shadcn/ui
Backend: Node.js, Express, Axum (Rust), Tokio, FastAPI, PostgreSQL, MongoDB, Supabase, Redis
Blockchain: Cardano (Plutus, Mesh SDK), Bitcoin (secp256k1, SegWit, Lightning), Starknet/Dojo/Cairo, EVM (Arbitrum, Avalanche, Base), Solana, XRPL, ICP, Wagmi, Hardhat
AI/CV: YOLO, ONNX Runtime, OpenCV, DeepFace, TensorFlow.js, Gemini AI, LLaMA3, OpenAI
DevOps: Docker, Git, Linux, Nginx, Vercel, Render, GCP, CI/CD

OPEN SOURCE CONTRIBUTIONS:
1. IntersectMBO/lsm-tree — PR #818 merged: refactored Internal.Arena with DuplicateRecordFields, NoFieldSelectors, OverloadedRecordDot Haskell extensions. This is a production-grade LSM database used by the Cardano node.
2. Cardano Foundation/cardano-org — Added Kenya-specific CEX list (Binance, Yellow Card, BingX, OKX); contributed Docker containerisation for the documentation platform.
3. rust-bitcoin — Contributed to the foundational Rust library for Bitcoin development.
4. stx-labs/explorer — Contributed to a Bitcoin/Stacks blockchain explorer.

KEY PROJECTS:
1. LiteCert — Blockchain certificate verification on Cardano using Plutus + Mesh SDK. Tamper-proof credentials with unique identifiers and on-chain tx hashes. Live: certified-chain.vercel.app
2. Bitcoin Wallet Lab — Educational testnet4 Bitcoin wallet. secp256k1 + ECDSA + RFC 6979 from scratch in Rust. All 3 address types. Live: wallet-lab.onrender.com
3. Open Wallet Standard — Multi-chain AI agent wallet (9 networks: EVM, Solana, Bitcoin, Cosmos, XRPL). Policy-gated signing — AI agents never hold raw keys. Live: open-wallet-standard.onrender.com
4. Memorabilia — Fully on-chain Starknet memory game. Zero gas fees via Account Abstraction. Playable on Telegram (@enter_memorabilia_musem_bot). Live: memorabilia-game.vercel.app
5. Daily Habit Hub — Fitness app with Avalanche Web3 rewards, $HABIT tokens, NFT minting. Live: daily-habit-hub.vercel.app
6. Computer Vision System — Dual Python+Rust YOLO system for traffic + attendance. ONNX Runtime on NVIDIA Jetson. GitHub: github.com/mwihoti/computer_vision
7. Cardano Quest — On-chain riddle-quest game for CardanoHubNBO Nairobi meetups. Live: riddlerequest26.cardanohubnbo.com
8. MuscleMind — Gym management platform for Muscle Beach Gym, Nairobi. M-Pesa payments, membership tiers. Live: gymbuddy-s.vercel.app
9. Bitcoin Dojo Cryptography — secp256k1, ECDSA, finite fields, SHA-256 from scratch in Rust.
10. AIAdvisory — AI advisory on ICP with LLaMA3 agents (AgriBot, LegalBot) for Kenyan farmers and citizens.

WORK EXPERIENCE:
- Blockchain Ambassador, Blockchain Centre NBO (Oct 2025 – Present): Tech & Research dept (Cardano DApps, Next.js), Events & Legal dept (technical assistance, video filming). Represented Blockchain Centre at Cardano Africa Tech Summit.
- Full-Stack Developer, Freelance (2024 – Present): Shipped 10+ projects across Web3, AI, and full-stack.
- Data Analyst & Engineer, FaithTech (Aug–Sep 2025): ETL pipelines, regex CSV processing, LaTeX PDF reports.
- Backend Developer Intern, HNG (Apr–Aug 2024): Node.js, Express, PostgreSQL. Stage 5 certified.
- Fullstack Developer, KejaSpace (May–Jul 2024): React, Node.js, role-based access control, Tailwind CSS redesign.
- Business Systems Administrator Intern, KTDA (May–Sep 2023): Microsoft Dynamics NAV, SQL, Pesa-Ulipo app setup.

COMMUNITY & COMPETITIONS:
- Warnet: Wrath of Nalo (Feb 2026): Live Bitcoin Lightning Network attack simulation on Signet. Team Libra. Executed channel jamming, gossip timestamp filter DoS, onion bomb exploit on LND.
- CardanoHubNBO (Dec 2025–Present): Built Cardano Quest for monthly Nairobi community meetups.
- CodeOrange Devs (2025–Present): Bitcoin Wallet Lab featured by community. Collaborating on Bitcoin educational tooling.
- Cardano Africa Tech Summit Ambassador (2025): Represented Blockchain Centre NBO.
- Hedera Africa Hackathon (Oct 2025): Built echain — DLT product on Hedera.
- Base East Africa Batch 2 Hackathon (2025): MVP on Base L2.

EDUCATION:
- BSc Business Information Technology, KCA University (2019–2023)
- Software Engineering, ALX Africa (2023–2024)
- Bitcoin Development tracks, Bitcoin Dojo (2025–Present): Cryptography Fundamentals, Addresses & Encoding, Transactions

AVAILABILITY:
Daniel is open to: freelance contracts, remote work, open source collaboration, blockchain projects, AI/ML projects, full-stack development. Contact: danielmwihoti@gmail.com`;

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama3-70b-8192';

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-2 mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs ${
          isUser ? 'bg-teal-600' : 'bg-gray-700'
        }`}
      >
        {isUser ? <FaUser className="w-3 h-3 text-white" /> : <FaRobot className="w-3 h-3 text-teal-400" />}
      </div>
      <div
        className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
          isUser
            ? 'bg-teal-600 text-white rounded-tr-none'
            : 'bg-gray-700/80 text-gray-200 rounded-tl-none'
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 mb-3">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
        <FaRobot className="w-3 h-3 text-teal-400" />
      </div>
      <div className="bg-gray-700/80 rounded-xl rounded-tl-none px-3 py-2 flex gap-1 items-center">
        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

const SUGGESTED = [
  "What are Daniel's main skills?",
  'Tell me about his Bitcoin work',
  'What projects has he built?',
  'Is he available for hire?',
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Daniel's portfolio assistant. Ask me anything about his skills, projects, experience, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const userMsg = { role: 'user', content: userText };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 512,
          temperature: 0.6,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Groq API error:', res.status, err);
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
      setMessages([...history, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('ChatBot error:', err);
      setMessages([
        ...history,
        {
          role: 'assistant',
          content: !process.env.REACT_APP_GROQ_API_KEY
            ? 'The chatbot is not configured yet. Please contact Daniel at danielmwihoti@gmail.com'
            : 'Something went wrong. Please try again or email danielmwihoti@gmail.com directly.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-500/30 flex items-center justify-center transition-colors"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <FaTimes className="w-5 h-5 text-white" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <FaRobot className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50"
            style={{ maxHeight: '70vh' }}
          >
            {/* Header */}
            <div className="bg-gray-900 px-4 py-3 flex items-center gap-3 border-b border-gray-700/50">
              <div className="w-8 h-8 rounded-full bg-teal-600/20 border border-teal-500/40 flex items-center justify-center">
                <FaRobot className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Ask about Daniel</div>
                <div className="text-xs text-teal-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse inline-block" />
                  Powered by Groq · LLaMA3
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-800/95 p-4" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Suggested questions — show only at start */}
            {messages.length === 1 && (
              <div className="bg-gray-800/95 px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1 rounded-full border border-teal-700/50 text-teal-400 hover:bg-teal-900/40 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="bg-gray-900 border-t border-gray-700/50 p-3 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about Daniel..."
                disabled={loading}
                className="flex-1 bg-gray-800 text-sm text-white placeholder-gray-500 rounded-lg px-3 py-2 border border-gray-700/50 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="w-9 h-9 flex-shrink-0 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <FaPaperPlane className="w-3.5 h-3.5 text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
