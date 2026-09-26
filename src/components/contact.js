"use client";

import { useState, useRef } from "react";
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

const TABS = [
  { id: "call", label: "Book a call", icon: FaCalendarAlt },
  { id: "message", label: "Send a message", icon: FaPaperPlane },
];

export default function Contact() {
  const [tab, setTab] = useState("call");
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error' | null
  const [copied, setCopied] = useState(false);
  const form = useRef();

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
    "w-full rounded-lg border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none transition-colors";
  const labelClass = "mb-1.5 block font-mono text-xs text-muted";

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
                  {copied ? (
                    <>
                      <FaCheck className="h-3 w-3" /> Copied
                    </>
                  ) : (
                    <>
                      <FaCopy className="h-3 w-3" /> Copy
                    </>
                  )}
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
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 font-mono text-sm transition-colors ${
                    tab === id ? "bg-surface text-accent shadow-sm" : "text-muted hover:text-ink"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>

            {tab === "call" && (
              <div id="panel-call" role="tabpanel" aria-labelledby="tab-call" className="p-3 sm:p-4">
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
                  <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Open it on cal.com
                  </a>
                  .
                </p>
              </div>
            )}

            {tab === "message" && (
              <div id="panel-message" role="tabpanel" aria-labelledby="tab-message" className="p-3 sm:p-4">
                {status === "success" ? (
                  <div className="flex flex-col items-center py-16 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <FaCheck className="h-5 w-5" />
                    </span>
                    <p className="mt-4 font-serif text-2xl text-ink">Thanks, got it.</p>
                    <p className="mt-2 max-w-sm text-sm text-muted">
                      I&apos;ll read it properly and reply to the email you gave.
                    </p>
                    <button onClick={() => setStatus(null)} className="link-arrow mt-6">
                      Send another
                    </button>
                  </div>
                ) : (
                  <form ref={form} onSubmit={sendEmail} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className={labelClass}>
                          Your name
                        </label>
                        <input id="contact-name" type="text" name="from_name" required autoComplete="name" className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className={labelClass}>
                          Your email
                        </label>
                        {/* EmailJS template reads the sender's address from `to_name` */}
                        <input id="contact-email" type="email" name="to_name" required autoComplete="email" className={inputClass} />
                      </div>
                    </div>
                    <div>
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

                    {status === "error" && (
                      <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300" role="alert">
                        That didn&apos;t send, sorry. Please email me directly at{" "}
                        <a href={`mailto:${EMAIL}`} className="underline">
                          {EMAIL}
                        </a>
                        .
                      </p>
                    )}

                    <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
                      {status === "sending" ? "Sending…" : "Send message"}
                      <FaArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
