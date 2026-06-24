import { motion } from 'motion/react';
import { useTypewriter } from '../hooks/useTypewriter';

export function TitleSection() {
  const { displayed, done } = useTypewriter('PROJECT UMBAU');

  return (
    <section id="top" className="relative z-[2] w-full min-h-screen flex flex-col">
      <main className="w-full max-w-7xl mx-auto px-6 py-16 flex-1 flex flex-col justify-end pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-4">Our purpose:</p>
          <h1 className="text-5xl md:text-6xl lg:text-[88px] font-semibold tracking-tight text-white leading-[1.02] mb-6 select-none">
            {displayed}
            {!done && <span className="inline-block w-[3px] h-[0.9em] bg-white align-middle ml-[3px] animate-blink" />}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-300 max-w-xl mb-10"
        >
          How to shift a city built for one purpose.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase"
        >
          ▼ Scroll to begin
        </motion.div>
      </main>
    </section>
  );
}
