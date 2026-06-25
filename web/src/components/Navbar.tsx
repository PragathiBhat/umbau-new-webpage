import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
      <div className="flex flex-row gap-3 items-center">
        <span className="text-[21px] sm:text-[26px] tracking-tight text-white font-medium select-none">
          UMBAU&reg;
        </span>
      </div>

      <button
        className="flex flex-col gap-[5px] z-20"
        onClick={() => setIsMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-[2px] bg-white transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
          }`}
        />
        <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
        <span
          className={`w-6 h-[2px] bg-white transition-all duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
          }`}
        />
      </button>

      <div
        className={`fixed inset-0 z-[9] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 text-2xl text-white transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <a href="#simulation" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-400 transition-colors">
          Simulation
        </a>
        <a
          href="https://phyllis0001.github.io/Video-Webpage/#/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMenuOpen(false)}
          className="hover:text-orange-400 transition-colors"
        >
          Virtual Walkthrough
        </a>
      </div>
    </header>
  );
}
