"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaCopy,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";
import { EMAIL, CAL_URL, GITHUB_URL, LINKEDIN_URL, LOCATION } from "../data/site";
import { Reveal } from "./ui";
import { DrawPath, useReduceMotion } from "./motion";
import { DURATION, EASE, TRANSITION, presence } from "../lib/motion";

// Motion in this section (micro-interaction + accessible-animation skills):
//  - tabs: the active "pill" slides between tabs (shared layoutId, transform
//    only); panels cross-fade (opacity only, quick exit so tabs feel instant);
//  - fields: border + soft focus ring ease in, and the label turns accent while
//    its field has focus;
//  - submit: label/icon swap Send message -> Sending… + spinner, same button,
//    so the eye tracks one object; the arrow nudges on hover;
//  - error: slides in a few px (role="alert" kept); success: form fades out,
//    the confirmation fades up, its check draws on, and focus moves to it;
//  - copy email: "Copy" rolls to "Copied" inside the existing live region.
// Reduced motion: MotionConfig drops the y shifts and the pill slide; what is
// left is short opacity fades, color changes, and the (pulsing) spinner.

// Small in-place label swap (button text, copy state). Every element using it
// either renders through <AnimatePresence initial={false}> or mounts after an
// interaction, so `initial` never applies to server-rendered markup.
const LABEL_SWAP = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE.out } },
  exit: { opacity: 0, y: -4, transition: { duration: DURATION.instant, ease: EASE.in } },
};

// Tab panels: opacity only, fast exit (mode="wait" waits for it).
const PANEL_FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DURATION.base, ease: EASE.out } },
  exit: { opacity: 0, transition: { duration: DURATION.instant, ease: EASE.in } },
};

function Spinner() {
  // Loading indicator (Tier 3, kept): spins normally, pulses with reduced motion.
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 motion-safe:animate-spin motion-reduce:animate-pulse"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// Confirmation shown after a successful send. It mounts only after the user
// submits, and takes focus so keyboard and screen-reader users land on it
// instead of on <body> (the submit button they were on has just unmounted).
function SentMessage({ onReset, reduce }) {
  const heading = useRef(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);

  return (
    <motion.div className="flex flex-col items-center py-16 text-center" {...presence("fadeUp", { reduce })}>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <DrawPath d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" delay={0.15} duration={0.4} />
        </svg>
      </span>
      <p ref={heading} tabIndex={-1} className="mt-4 font-serif text-2xl text-ink outline-none">
        Thanks, got it.
      </p>
      <p className="mt-2 max-w-sm text-sm text-muted">
        I&apos;ll read it properly and reply to the email you gave.
      </p>
      <button onClick={onReset} className="link-arrow mt-6">
        Send another
      </button>
    </motion.div>
  );
}

const TABS = [
  { id: "call", label: "Book a call", icon: FaCalendarAlt },
  { id: "message", label: "Send a message", icon: FaPaperPlane },
];

export default function Contact() {
  const [tab, setTab] = useState("call");
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error' | null
  const [copied, setCopied] = useState(false);
  const form = useRef();
  const refocusForm = useRef(false);
  const reduce = useReduceMotion();
  const sending = status === "sending";

  // "Send another": once the fresh form has mounted, put focus back in it.
  const focusOnMount = (el) => {
    if (el && refocusForm.current) {
      refocusForm.current = false;
      el.focus();
    }
  };
  const sendAnother = () => {
    refocusForm.current = true;
    setStatus(null);
  };

  const copyEmail = () => {
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm("service_sx21psz", "template_d3c28hq", form.current, {
        publicKey: "I59mHqfMF093XbTav",
      })
      .then(() => {
        setStatus("success");
        form.current?.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setStatus("error");
      });
  };

  const inputClass =
    "w-full rounded-lg border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 transition-[border-color,box-shadow] duration-base ease-enter";
  // Wrap each field in a `group` so its label can follow the field's focus.
  const labelClass =
    "mb-1.5 block font-mono text-xs text-muted transition-colors duration-base ease-enter group-focus-within:text-accent";

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="flex flex-col">
            <p className="font-mono text-accent" aria-hidden="true">&gt;</p>
            <h2 id="contact-title" className="mt-2 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-ink">
              Let&apos;s build something <span className="italic text-accent">useful.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Tell me what you&apos;re building and where it&apos;s stuck. A rough idea is fine,
              and so is a half-broken repo. Messages come straight to my inbox.
            </p>

            <div className="mt-8 space-y-3">
              <button
                onClick={copyEmail}
                className="panel panel-hover flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-label={`Copy email address ${EMAIL}`}
              >
                <span>
                  <span className="block font-mono text-xs text-faint">Email</span>
                  <span className="text-ink">{EMAIL}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent" aria-live="polite">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={copied ? "copied" : "copy"} className="inline-flex items-center gap-1.5" {...LABEL_SWAP}>
                      {copied ? (
                        <>
                          <FaCheck className="h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <FaCopy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>
              <div className="grid grid-cols-2 gap-3">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="panel panel-hover flex items-center gap-3 px-5 py-4 text-sm text-ink">
                  <FaGithub className="h-4 w-4 text-muted" aria-hidden="true" /> GitHub
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="panel panel-hover flex items-center gap-3 px-5 py-4 text-sm text-ink">
                  <FaLinkedin className="h-4 w-4 text-muted" aria-hidden="true" /> LinkedIn
                </a>
              </div>
            </div>

            <p className="mt-auto pt-8 font-mono text-xs text-faint">
              Based in {LOCATION} (EAT, UTC+3). Happy to work across time zones.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="panel p-2 sm:p-3">
            <div className="flex gap-1 rounded-lg bg-raised p-1" role="tablist" aria-label="How to reach me">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={tab === id}
                  aria-controls={`panel-${id}`}
                  onClick={() => setTab(id)}
                  className={`relative flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 font-mono text-sm transition-colors duration-base ease-enter ${
                    tab === id ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {tab === id && (
                    // Slides to the newly selected tab (A -> B move, transform only).
                    <motion.span
                      layoutId="contact-tab-indicator"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-md bg-surface shadow-sm"
                      transition={TRANSITION.move}
                    />
                  )}
                  <Icon className="relative h-3.5 w-3.5" aria-hidden="true" />
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {tab === "call" && (
                <motion.div key="call" id="panel-call" role="tabpanel" aria-labelledby="tab-call" className="p-3 sm:p-4" {...PANEL_FADE}>
                  <p className="mb-4 text-sm text-muted">
                    15 minutes to talk through your idea. No pitch, no obligation.
                  </p>
                  <div className="overflow-hidden rounded-lg border border-line" style={{ height: "min(630px, 75vh)" }}>
                    <iframe
                      src={`${CAL_URL}?embed=true&embedType=inline`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      loading="lazy"
                      title="Schedule a call with Daniel"
                    />
                  </div>
                  <p className="mt-3 text-center text-xs text-faint">
                    Calendar not loading?{" "}
                    <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-accent link-underline">
                      Open it on cal.com
                    </a>
                    .
                  </p>
                </motion.div>
              )}

              {tab === "message" && (
                <motion.div key="message" id="panel-message" role="tabpanel" aria-labelledby="tab-message" className="p-3 sm:p-4" {...PANEL_FADE}>
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "success" ? (
                      <SentMessage key="success" onReset={sendAnother} reduce={reduce} />
                    ) : (
                      <motion.form
                        key="form"
                        ref={form}
                        onSubmit={sendEmail}
                        className="space-y-5"
                        {...presence("fade", { reduce })}
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="group">
                            <label htmlFor="contact-name" className={labelClass}>
                              Your name
                            </label>
                            <input
                              ref={focusOnMount}
                              id="contact-name"
                              type="text"
                              name="from_name"
                              required
                              autoComplete="name"
                              className={inputClass}
                            />
                          </div>
                          <div className="group">
                            <label htmlFor="contact-email" className={labelClass}>
                              Your email
                            </label>
                            {/* EmailJS template reads the sender's address from `to_name` */}
                            <input id="contact-email" type="email" name="to_name" required autoComplete="email" className={inputClass} />
                          </div>
                        </div>
                        <div className="group">
                          <label htmlFor="contact-message" className={labelClass}>
                            What are you working on?
                          </label>
                          <textarea
                            id="contact-message"
                            name="message"
                            rows="8"
                            required
                            placeholder="What you're building, what's blocking you, and what a good outcome looks like."
                            className={inputClass}
                          />
                        </div>

                        <AnimatePresence initial={false}>
                          {status === "error" && (
                            <motion.p
                              key="error"
                              className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300"
                              role="alert"
                              {...presence("fadeDown", { reduce })}
                            >
                              That didn&apos;t send, sorry. Please email me directly at{" "}
                              <a href={`mailto:${EMAIL}`} className="underline">
                                {EMAIL}
                              </a>
                              .
                            </motion.p>
                          )}
                        </AnimatePresence>

                        <button type="submit" disabled={sending} className="btn-primary w-full disabled:cursor-wait disabled:opacity-60">
                          {/* One button, two states: the label and icon swap in place. */}
                          <AnimatePresence mode="wait" initial={false}>
                            {sending ? (
                              <motion.span key="sending" className="inline-flex items-center gap-2" {...LABEL_SWAP}>
                                Sending… <Spinner />
                              </motion.span>
                            ) : (
                              <motion.span key="idle" className="inline-flex items-center gap-2" {...LABEL_SWAP}>
                                Send message
                                <FaArrowRight className="arrow-nudge h-3.5 w-3.5" aria-hidden="true" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
