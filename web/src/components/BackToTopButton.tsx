import { useEffect, useState } from 'react';

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleClick() {
    const startY = window.scrollY;
    const duration = 1200;
    const startTime = performance.now();

    const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      window.scrollTo(0, startY * (1 - easeInOutQuad(progress)));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to starting point"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3 py-2 border border-sci-green/40 bg-black/60 backdrop-blur-sm font-mono text-[10px] tracking-[2px] uppercase text-sci-green hover:bg-sci-green/10 hover:border-sci-green transition-all duration-300 cursor-pointer ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      Back to start
    </button>
  );
}
