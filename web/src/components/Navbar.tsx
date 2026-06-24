import { useState } from 'react';

const NAV_LINKS = ['The City', 'The Site', 'The Robots', 'The Scenarios'];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
      <div className="flex flex-row gap-3 items-center">
        <span className="text-[21px] sm:text-[26px] tracking-tight text-white font-medium select-none">
          UMBAU&reg;
        </span>
        <span className="text-[25px] sm:text-[30px] text-white select-none tracking-[-0.02em] font-medium leading-none mb-1">
          &#10033;
        </span>
      </div>

      <nav className="hidden md:flex text-[15px] text-neutral-300">
        {NAV_LINKS.map((link, i) => (
          <span key={link}>
            <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition-colors">
              {link}
            </a>
            {i < NAV_LINKS.length - 1 && <span className="opacity-40">,&nbsp;</span>}
          </span>
        ))}
      </nav>

      <a
        href="#ending"
        className="hidden md:inline text-[15px] text-white underline underline-offset-2 hover:opacity-70 transition-opacity"
      >
        Begin transmission
      </a>

      <button
        className="md:hidden flex flex-col gap-[5px] z-20"
        onClick={() => setIsMobileMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-[2px] bg-white transition-all duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
          }`}
        />
        <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
        <span
          className={`w-6 h-[2px] bg-white transition-all duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
          }`}
        />
      </button>

      <div
        className={`fixed inset-0 z-[9] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 text-2xl text-white transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link}
          </a>
        ))}
        <a href="#ending" onClick={() => setIsMobileMenuOpen(false)} className="underline underline-offset-2">
          Begin transmission
        </a>
      </div>
    </header>
  );
}
