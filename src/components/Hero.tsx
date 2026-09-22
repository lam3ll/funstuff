import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTypewriter } from '../hooks/useTypewriter';

interface HeroProps {
  onActionClick?: (actionLabel: string) => void;
}

export function Hero({ onActionClick }: HeroProps) {
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Typewriter effect
  const { displayed, done } = useTypewriter(
    'Glad you stopped in. Good taste tends to find us. Now, what are we building?',
    38,
    600
  );

  // Action pill buttons become visible 400ms after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async () => {
    const email = 'brucewrld3@gmail.com';
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        throw new Error('Clipboard API not supported');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for restricted iframe contexts
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const pillButtons = [
    { id: 'pill-pitch', label: 'Pitch us an idea' },
    { id: 'pill-work', label: 'Come work here' },
    { id: 'pill-hello', label: 'Send a brief hello' },
    { id: 'pill-operate', label: 'See how we operate' },
  ];

  return (
    <section
      id="hero-section"
      className="relative z-[1] w-full h-screen bg-black text-white flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden select-none"
    >
      {/* Hero Content Container */}
      <motion.div
        id="hero-content-container"
        className="max-w-xl relative z-10"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* 1. Blurred intro label */}
        <motion.div
          id="hero-blurred-intro"
          className="pointer-events-none select-none mb-5 sm:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#fff',
            filter: 'blur(4px)',
          }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Jahail's Adaptive Response Interface Agent
        </motion.div>

        {/* 2. Typewriter text */}
        <motion.p
          id="hero-typewriter-paragraph"
          className="text-white mb-5 sm:mb-6 select-text"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          {displayed}
          {!done && (
            <span
              id="hero-typewriter-cursor"
              className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-cursor-blink"
              aria-hidden="true"
            />
          )}
        </motion.p>

        {/* 3. Action pill buttons */}
        <div
          id="hero-action-pills-container"
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: buttonsVisible ? 1 : 0,
            transform: buttonsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* 4 white pill buttons */}
          {pillButtons.map((btn) => (
            <button
              key={btn.id}
              id={btn.id}
              type="button"
              onClick={() => onActionClick?.(btn.label)}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {btn.label}
            </button>
          ))}

          {/* 1 outline pill button */}
          <button
            id="pill-reach-us"
            type="button"
            onClick={handleCopyEmail}
            title="Click to copy email address"
            className="relative inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer group"
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1">
                brucewrld3@gmail.com
              </span>
            </span>

            {/* Small 12x12 copy icon (inline SVG of two overlapping rectangles) */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block shrink-0"
              aria-hidden="true"
            >
              <rect
                x="3.5"
                y="3.5"
                width="6.5"
                height="6.5"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M8.5 3.5V2a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>

            {/* Subtle Copied badge */}
            {copied && (
              <span
                id="copy-status-badge"
                className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[11px] bg-white text-black rounded font-medium shadow-md pointer-events-none"
              >
                Copied!
              </span>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
