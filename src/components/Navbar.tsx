import { useState, useEffect } from 'react';

interface NavbarProps {
  onContactClick?: () => void;
}

export function Navbar({ onContactClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Esc or resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent scrolling when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 w-full z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center"
      >
        {/* Logo (left) */}
        <div id="nav-logo" className="flex flex-row items-center gap-2.5 sm:gap-3">
          <img
            id="nav-logo-img"
            src="/jahail_logo.jpg"
            alt="Jahail logo"
            className="w-7 h-7 sm:w-8 sm:h-8 object-cover rounded-full border border-white/20 shadow-sm select-none"
            referrerPolicy="no-referrer"
          />
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white select-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Jahail®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none leading-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <div
          id="desktop-nav-links"
          className="hidden md:flex flex-row text-[23px] text-white items-center"
        >
          <a
            id="nav-link-labs"
            href="#labs"
            className="hover:opacity-60 transition-opacity"
          >
            Labs
          </a>
          <span>,&nbsp;</span>
          <a
            id="nav-link-studio"
            href="#studio"
            className="hover:opacity-60 transition-opacity"
          >
            Studio
          </a>
          <span>,&nbsp;</span>
          <a
            id="nav-link-openings"
            href="#openings"
            className="hover:opacity-60 transition-opacity"
          >
            Openings
          </a>
          <span>,&nbsp;</span>
          <a
            id="nav-link-shop"
            href="#shop"
            className="hover:opacity-60 transition-opacity"
          >
            Shop
          </a>
        </div>

        {/* Desktop CTA (right, hidden below md) */}
        <div id="desktop-nav-cta" className="hidden md:block">
          <a
            id="nav-cta-button"
            href="#contact"
            onClick={onContactClick}
            className="text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          id="mobile-hamburger-btn"
          type="button"
          onClick={toggleMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          className="md:hidden flex flex-col gap-[5px] justify-center items-center p-2 relative z-20 cursor-pointer focus:outline-none"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay (z-index: 9) */}
      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center px-8 gap-8 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <a
          id="mobile-nav-labs"
          href="#labs"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[32px] font-medium text-white hover:opacity-70 transition-opacity"
        >
          Labs
        </a>
        <a
          id="mobile-nav-studio"
          href="#studio"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[32px] font-medium text-white hover:opacity-70 transition-opacity"
        >
          Studio
        </a>
        <a
          id="mobile-nav-openings"
          href="#openings"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[32px] font-medium text-white hover:opacity-70 transition-opacity"
        >
          Openings
        </a>
        <a
          id="mobile-nav-shop"
          href="#shop"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[32px] font-medium text-white hover:opacity-70 transition-opacity"
        >
          Shop
        </a>
        <div className="pt-2">
          <a
            id="mobile-nav-cta"
            href="#contact"
            onClick={() => {
              setMobileMenuOpen(false);
              onContactClick?.();
            }}
            className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
