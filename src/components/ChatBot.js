"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";
import { Groq } from "groq-sdk";
import ReactMarkdown from "react-markdown";

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
1. IntersectMBO/lsm-tree — PR #818 merged: refactored Internal.Arena with DuplicateRecordFields, NoFieldSelectors, OverloadedRecordDot Haskell extensions. Production-grade LSM database used by the Cardano node.
2. Cardano Foundation/cardano-org — Added Kenya-specific CEX list; Docker containerisation for docs platform.
3. rust-bitcoin — Contributed to the foundational Rust Bitcoin library.
4. stx-labs/explorer — Contributed to a Bitcoin/Stacks blockchain explorer.

KEY PROJECTS:
1. LiteCert — Blockchain certificate verification on Cardano (Plutus + Mesh SDK). Live: certified-chain.vercel.app
2. Bitcoin Wallet Lab — secp256k1 + ECDSA + RFC 6979 from scratch in Rust. Testnet4 wallet. Live: wallet-lab.onrender.com
3. Open Wallet Standard — Multi-chain AI agent wallet (9 networks). Policy-gated signing. Live: open-wallet-standard.onrender.com
4. Memorabilia — On-chain Starknet game, gasless via AA, Telegram Mini App (@enter_memorabilia_musem_bot). Live: memorabilia-game.vercel.app

TELEGRAM BOTS (all live and public):
- @enter_memorabilia_musem_bot — Mini App entry point for the Memorabilia Starknet game (no wallet/gas needed to play).
- @danmwisecondbrainbot — Personal AI second-brain. Forward links/voice notes/ideas; recall later in natural language via LLM + vector store.
5. Daily Habit Hub — Fitness + Avalanche Web3 rewards. Live: daily-habit-hub.vercel.app
6. Computer Vision — Dual Python+Rust YOLO system, ONNX Runtime, NVIDIA Jetson edge deployment.
7. Cardano Quest — On-chain riddle game for CardanoHubNBO meetups. Live: riddlerequest26.cardanohubnbo.com
8. MuscleMind — Gym management with M-Pesa, Nairobi. Live: gymbuddy-s.vercel.app
9. AIAdvisory — LLaMA3 agents (AgriBot, LegalBot) on ICP for Kenyan farmers and citizens.
10. Bitcoin Dojo Cryptography — secp256k1, ECDSA, finite fields from scratch in Rust.

WORK EXPERIENCE:
- Blockchain Ambassador, Blockchain Centre NBO (Oct 2025–Present): Tech & Research (Cardano DApps, Next.js) + Events & Legal (technical support, video filming). Cardano Africa Tech Summit ambassador.
- Full-Stack Developer, Freelance (2024–Present): 10+ projects across Web3, AI, full-stack.
- Data Analyst & Engineer, FaithTech (Aug–Sep 2025): ETL pipelines, regex CSV processing, LaTeX PDF reports.
- Backend Developer Intern, HNG (Apr–Aug 2024): Node.js, Express, PostgreSQL. Stage 5 certified.
- Fullstack Developer, KejaSpace (May–Jul 2024): React, Node.js, RBAC, Tailwind redesign.
- Business Systems Administrator Intern, KTDA (May–Sep 2023): MS Dynamics NAV, SQL.

COMMUNITY & COMPETITIONS:
- Warnet: Wrath of Nalo (Feb 2026): Live Lightning Network attack simulation on Signet. Team Libra. Channel jamming, LND DoS exploits.
- CardanoHubNBO (Dec 2025–Present): Built Cardano Quest for Nairobi community meetups.
- CodeOrange Devs (2025–Present): Bitcoin Wallet Lab featured by community.
- Hedera Africa Hackathon (Oct 2025): Built echain on Hedera.
- Base East Africa Batch 2 Hackathon (2025): MVP on Base L2.

EDUCATION:
- BSc Business Information Technology, KCA University (2019–2023)
- Software Engineering, ALX Africa (2023–2024)
- Bitcoin Dojo tracks (2025–Present): Cryptography, Addresses & Encoding, Transactions

AVAILABILITY:
Open to freelance contracts, remote work worldwide, open source collaboration, blockchain and AI projects. Email: danielmwihoti@gmail.com`;

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const markdownComponents = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-teal-300">{children}</strong>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-4 mb-2 space-y-1">
      {children}
    </ol>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-4 mb-2 space-y-1">{children}</ul>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal-400 underline hover:text-teal-300"
    >
      {children}
    </a>
  ),
};

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={`flex gap-2 mb-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs ${
          isUser ? "bg-teal-600" : "bg-gray-700"
        }`}
      >
        {isUser ? (
          <FaUser className="w-3 h-3 text-white" />
        ) : (
          <FaRobot className="w-3 h-3 text-teal-400" />
        )}
      </div>
      <div
        className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
          isUser
            ? "bg-teal-600 text-white rounded-tr-none"
            : "bg-gray-700/80 text-gray-200 rounded-tl-none"
        }`}
      >
        {isUser ? (
          msg.content
        ) : (
          <ReactMarkdown components={markdownComponents}>
            {msg.content}
          </ReactMarkdown>
        )}
        {msg.streaming && (
          <span className="inline-block w-1 h-3.5 bg-teal-400 ml-0.5 animate-pulse align-middle" />
        )}
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
        <span
          className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}

const SUGGESTED = [
  "What are Daniel's main skills?",
  "Tell me about his Bitcoin work",
  "What projects has he built?",
  "Is he available for hire?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Daniel's portfolio assistant. Ask me anything about his skills, projects, experience, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const userMsg = { role: "user", content: userText };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    // Add empty streaming message placeholder
    const streamingMsg = { role: "assistant", content: "", streaming: true };
    setMessages([...history, streamingMsg]);

    try {
      const stream = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        max_tokens: 800,
        top_p: 1,
        stream: true,
        stop: null,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.map((m) => ({ role: m.role, content: m.content })),
        ],
      });

      let fullContent = "";

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || "";
        fullContent += delta;
        setMessages([
          ...history,
          { role: "assistant", content: fullContent, streaming: true },
        ]);
      }

      // Finalise — remove streaming cursor
      setMessages([
        ...history,
        { role: "assistant", content: fullContent, streaming: false },
      ]);
    } catch (err) {
      console.error("ChatBot error:", err);
      const detail =
        err?.error?.message ||
        err?.message ||
        err?.status ||
        JSON.stringify(err);
      const errMsg = !process.env.NEXT_PUBLIC_GROQ_API_KEY
        ? "Chatbot not configured. Please contact Daniel at danielmwihoti@gmail.com"
        : `Error: ${detail}. Try emailing danielmwihoti@gmail.com`;
      setMessages([
        ...history,
        { role: "assistant", content: errMsg, streaming: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FaTimes className="w-5 h-5 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
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
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="bg-gray-900 px-4 py-3 flex items-center gap-3 border-b border-gray-700/50">
              <div className="w-8 h-8 rounded-full bg-teal-600/20 border border-teal-500/40 flex items-center justify-center">
                <FaRobot className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Ask about Daniel
                </div>
                <div className="text-xs text-teal-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse inline-block" />
                  Powered by Groq · LLaMA 3.3 70B
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto bg-gray-800/95 p-4"
              style={{ minHeight: 0 }}
            >
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} />
              ))}
              {loading && messages[messages.length - 1]?.content === "" && (
                <TypingIndicator />
              )}
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
