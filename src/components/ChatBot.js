"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaCommentDots } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { EMAIL } from "../data/site";

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

function TypingIndicator() {
  return (
    <div className="flex gap-2 mb-3">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-raised flex items-center justify-center">
        <FaRobot className="w-3 h-3 text-accent" />
      </div>
      <div className="bg-raised rounded-xl rounded-tl-none px-3 py-2 flex gap-1 items-center">
        <span
          className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"
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
        "Hi! I'm an AI assistant that knows Daniel's work. Ask about his projects, skills or availability. And if you'd rather talk to the actual human, his email is " + EMAIL + ".",
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
    } catch (err) {
      console.error("ChatBot error:", err);
      const errMsg = `${err?.message || "Something went wrong"}. Try emailing ${EMAIL}`;
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
        className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent hover:bg-accent/85 shadow-lg shadow-black/30 flex items-center justify-center transition-colors"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FaTimes className="w-5 h-5 text-accent-ink" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-96 sm:w-96 flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-line"
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
              <div className="bg-canvas px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1 rounded-full border border-line text-accent hover:bg-accent/10 transition-colors"
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
                whileTap={{ scale: 0.9 }}
                onClick={() => send()}
                disabled={!input.trim() || loading}
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
