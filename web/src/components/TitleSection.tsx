import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTypewriter } from '../hooks/useTypewriter';
import { RadarRing } from './RadarRing';
import { getResponsiveCardsScrollTarget } from './FixedCardsSection';

export function TitleSection() {
  const { displayed, done } = useTypewriter('ROBONEXUS');

  function handleScrollDown() {
    const target = getResponsiveCardsScrollTarget();
    const startY = window.scrollY;
    const distance = (target ?? startY + window.innerHeight * 0.92) - startY;
    const duration = 1600;
    const startTime = performance.now();

    const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      window.scrollTo(0, startY + distance * easeInOutQuad(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  return (
    <section id="top" className="relative z-[2] w-full min-h-screen flex flex-col overflow-hidden">
      <RadarRing
        size={480}
        color="green"
        className="hidden md:block right-[-120px] top-1/2 -translate-y-1/2 opacity-40"
      />

      <main className="w-full max-w-7xl mx-auto px-6 py-16 flex-1 flex flex-col justify-end pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-orbitron text-4xl md:text-6xl lg:text-[80px] font-bold uppercase tracking-tight text-white leading-[1.02] mb-6 select-none">
            {displayed}
            {!done && (
              <span className="inline-block w-[3px] h-[0.9em] bg-sci-green align-middle ml-[3px] animate-blink" />
            )}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-300 max-w-xl mb-10"
        >
          An interactive urban system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            type="button"
            onClick={handleScrollDown}
            className="group flex items-center gap-2.5 border border-sci-green/40 px-5 py-3 font-mono text-xs tracking-[2px] uppercase text-sci-green hover:bg-sci-green/10 hover:border-sci-green transition-colors cursor-pointer"
          >
            <span className="inline-block w-1.5 h-1.5 bg-sci-green shadow-[0_0_6px_#2eff4d] animate-pulse" />
            Scroll to view website
          </button>

          <Link
            to="/explore"
            className="group flex items-center gap-2.5 border border-sci-cyan/40 px-5 py-3 font-mono text-xs tracking-[2px] uppercase text-sci-cyan hover:bg-sci-cyan/10 hover:border-sci-cyan transition-colors cursor-pointer"
          >
            <span className="inline-block w-1.5 h-1.5 bg-sci-cyan shadow-[0_0_6px_#2be3ff]" />
            Explore the robot plaza
          </Link>
        </motion.div>
      </main>
    </section>
  );
}
