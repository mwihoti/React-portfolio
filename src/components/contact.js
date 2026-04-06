import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { useTheme } from '../context/theme';

const contactLinks = [
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/mwihoti',
    href: 'https://github.com/mwihoti',
    color: 'hover:text-white',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'daniel-mwihoti',
    href: 'https://www.linkedin.com/in/daniel-mwihoti-3aaa652b9/',
    color: 'hover:text-blue-400',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'danielmwihoti@gmail.com',
    href: 'mailto:danielmwihoti@gmail.com',
    color: 'hover:text-teal-400',
  },
];

export default function Contact() {
  const darkTheme = useTheme();
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_09mdgfl', 'template_hxitikd', form.current, 'I59mHqfMF093XbTav')
      .then(() => {
        setStatus('success');
        form.current.reset();
      })
      .catch(() => setStatus('error'));
  };

  const inputClass =
    'w-full rounded-lg px-4 py-3 text-sm bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700/60 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-colors';

  return (
    <section
      id="contact"
      className={`py-20 ${darkTheme ? 'bg-[#0a0a0f]' : 'bg-gray-50'}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-teal-600 dark:text-teal-400 glow-teal">
            Get In Touch
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Open to collaborations, contracts, and interesting ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left panel — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col justify-between bg-white dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700/50 card-glow"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Let&apos;s build something together
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
                Whether it&apos;s a DApp, a Bitcoin tool, a fullstack product, or an open
                source collaboration &mdash; I&apos;m available. Drop a message or reach out
                directly.
              </p>

              <div className="space-y-4">
                {contactLinks.map(({ icon: Icon, label, value, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 text-gray-500 dark:text-gray-400 ${color} transition-colors group`}
                  >
                    <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700/50 group-hover:bg-teal-500/10 transition-colors">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{label}</div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700/50">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Based in Nairobi, Kenya &mdash; open to remote work worldwide.
              </p>
            </div>
          </motion.div>

          {/* Right panel — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-white dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700/50 card-glow"
          >
            {status === 'success' && (
              <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700/50 text-teal-700 dark:text-teal-300 rounded-lg text-sm">
                &#x2713; Message sent! I&apos;ll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 text-red-600 dark:text-red-400 rounded-lg text-sm">
                Something went wrong. Try emailing directly at danielmwihoti@gmail.com
              </div>
            )}

            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="you@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="6"
                  required
                  placeholder="Tell me about your project or idea..."
                  className={inputClass}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-colors shadow-lg shadow-teal-500/10"
              >
                <FaPaperPlane className="h-4 w-4" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
