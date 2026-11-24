"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaCommentDots } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { EMAIL } from "../data/site";
import { DISTANCE, DURATION, EASE, TRANSITION, presence } from "../lib/motion";
import { useReduceMotion } from "./motion";

// Motion notes (micro-interaction + accessible-animation skills):
//  - Panel grows out of its trigger corner (origin bottom-right): 200ms
//    ease-out in, 150ms ease-in out. Reduced motion: 150ms fade.
//  - New messages fade up 8px; messages already there when the panel opens
//    don't replay. Reduced motion: short fade.
//  - Typing dots pulse in opacity only (a loading indicator, Tier 3: kept).
//  - Press feedback on buttons is a small scale, dropped under reduced motion.

const markdownComponents = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-accent">{children}</strong>
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
      className="text-accent underline hover:text-accent"
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
          isUser ? "bg-accent" : "bg-raised"
        }`}
      >
        {isUser ? (
          <FaUser className="w-3 h-3 text-accent-ink" />
        ) : (
          <FaRobot className="w-3 h-3 text-accent" />
        )}
      </div>
      <div
        className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
          isUser
            ? "bg-accent text-accent-ink rounded-tr-none"
            : "bg-raised text-ink rounded-tl-none"
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
          <span className="inline-block w-1 h-3.5 bg-accent ml-0.5 animate-pulse align-middle" />
        )}
      </div>
    </div>
  );
}

// Opacity-only wave instead of a bounce: still reads as "working", carries no
// movement, so it stays on under reduced motion like any loading indicator.
// Purely visual: the state is announced by the panel's persistent live
// region (see `liveMsg`), which exists before the indicator mounts.
const TYPING_DOT = {
  animate: { opacity: [0.3, 1, 0.3] },
  transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
};

function TypingIndicator() {
  return (
    <div className="flex gap-2 mb-3" aria-hidden="true">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-raised flex items-center justify-center">
        <FaRobot className="w-3 h-3 text-accent" />
      </div>
      <div
        className="bg-raised rounded-xl rounded-tl-none px-3 py-2.5 flex gap-1 items-center"
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 bg-accent rounded-full"
            initial={{ opacity: 0.3 }}
            animate={TYPING_DOT.animate}
            transition={{ ...TYPING_DOT.transition, delay: i * 0.18 }}
          />
        ))}
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
        "Hi! I'm an AI assistant that knows Daniel's work. Ask about his projects, skills or availability. And if you'd rather talk to the actual human, his email is " + EMAIL + ".",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // Status line for screen readers. The live region stays mounted while the
  // panel is open, so changes to this text are reliably announced; the
  // streamed reply itself is not a live region (it would read out every chunk).
  const [liveMsg, setLiveMsg] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const reduce = useReduceMotion();

  useEffect(() => {
    // Smooth scrolling is vestibular motion: jump instead when reduced.
    bottomRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [messages, loading, reduce]);

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
    setLiveMsg("Assistant is typing");

    // Add empty streaming message placeholder
    setMessages([...history, { role: "assistant", content: "", streaming: true }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        fullContent += decoder.decode(value, { stream: true });
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
      setLiveMsg("Assistant replied");
    } catch (err) {
      console.error("ChatBot error:", err);
      const errMsg = `${err?.message || "Something went wrong"}. Try emailing ${EMAIL}`;
      setMessages([
        ...history,
        { role: "assistant", content: errMsg, streaming: false },
      ]);
      setLiveMsg("Assistant could not reply");
    } finally {
      setLoading(false);
    }
  };

  // Panel: scale/fade from the trigger corner. Mounts only after a click, so
  // varying `initial` with the reduced-motion flag is hydration-safe.
  const panelMotion = reduce
    ? presence("fade", { reduce: true })
    : {
        initial: { opacity: 0, y: DISTANCE.sm, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: DISTANCE.sm, scale: 0.96, transition: TRANSITION.exit },
        transition: TRANSITION.ui,
      };

  // New message bubbles.
  const messageMotion = reduce
    ? presence("fade", { reduce: true })
    : {
        initial: { opacity: 0, y: DISTANCE.sm },
        animate: { opacity: 1, y: 0 },
        transition: { duration: DURATION.moderate, ease: EASE.out },
      };

  const canSend = Boolean(input.trim()) && !loading;

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating button */}
      {/* Floating button. Hover/press scale is small and skipped under
          reduced motion (gesture props never reach the server HTML, so this
          can't cause a hydration mismatch). */}
      <motion.button
        onClick={() => {
          setOpen((o) => !o);
          setLiveMsg(""); // the region remounts empty with the panel
        }}
        whileHover={reduce ? undefined : { scale: 1.04 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
        transition={{ duration: DURATION.fast, ease: EASE.out }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent hover:bg-accent/85 shadow-lg shadow-black/30 grid place-items-center transition-colors"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        {/* Icons crossfade in place (stacked in one grid cell) with a small
            turn; initial={false} keeps the icon visible in the server HTML.
            Reduced motion: MotionConfig drops the turn, the fade remains. */}
        <AnimatePresence initial={false}>
          {open ? (
            <motion.span
              key="close"
              className="[grid-area:1/1] flex"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0, transition: TRANSITION.exit }}
            >
              <FaTimes className="w-5 h-5 text-accent-ink" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              className="[grid-area:1/1] flex"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0, transition: TRANSITION.exit }}
            >
              <FaCommentDots className="w-6 h-6 text-accent-ink" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            {...panelMotion}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-96 sm:w-96 flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-line origin-bottom-right"
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="bg-surface px-4 py-3 flex items-center gap-3 border-b border-line">
              <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center">
                <FaRobot className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">
                  Ask about Daniel
                </div>
                <div className="text-xs text-accent flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
                  AI assistant · not Daniel himself
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto bg-canvas p-4"
              style={{ minHeight: 0 }}
            >
              {/* initial={false}: the history present when the panel opens
                  arrives with the panel; only new bubbles animate. The empty
                  streaming placeholder shows as the typing indicator and is
                  replaced in place by the reply as it streams in (same key,
                  so it doesn't animate twice). */}
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div key={i} {...messageMotion}>
                    {msg.streaming && msg.content === "" ? (
                      <TypingIndicator />
                    ) : (
                      <Message msg={msg} />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
              <p className="sr-only" role="status" aria-live="polite">
                {liveMsg}
              </p>
            </div>

            {/* Suggested questions — show only at start */}
            {messages.length === 1 && (
              <div className="bg-canvas px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1 rounded-full border border-line text-accent hover:bg-accent/10 hover:border-accent/40 transition-[color,background-color,border-color,scale] duration-base ease-enter active:[scale:0.97] motion-reduce:active:[scale:1]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="bg-surface border-t border-line p-3 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about Daniel..."
                aria-label="Ask a question about Daniel"
                disabled={loading}
                className="flex-1 bg-canvas text-sm text-ink placeholder:text-faint rounded-lg px-3 py-2 border border-line focus:outline-none focus:border-accent transition-colors"
              />
              <motion.button
                whileTap={canSend && !reduce ? { scale: 0.92 } : undefined}
                transition={{ duration: DURATION.instant, ease: EASE.out }}
                onClick={() => send()}
                disabled={!canSend}
                aria-label="Send message"
                className="w-9 h-9 flex-shrink-0 rounded-lg bg-accent hover:bg-accent/85 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <FaPaperPlane className="w-3.5 h-3.5 text-accent-ink" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
