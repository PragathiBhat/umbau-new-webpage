import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reveal } from './Reveal';

const SCENARIOS = [
  { key: 'playground', label: 'Playground', video: 'playground.mp4' },
  { key: 'event', label: 'Event Space', video: 'event-space.mp4' },
  { key: 'market', label: 'Market', video: 'market.mp4' },
];

export function ScenariosSection() {
  const [active, setActive] = useState(SCENARIOS[0].key);
  const scenario = SCENARIOS.find((s) => s.key === active)!;

  return (
    <section id="the-scenarios" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-3">07 — Live interactions in the plaza</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-10 max-w-2xl">
          Three identities. One adaptive infrastructure.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="flex flex-wrap gap-3 mb-8">
          {SCENARIOS.map((s) => {
            const isActive = s.key === active;
            return (
              <motion.button
                key={s.key}
                onClick={() => setActive(s.key)}
                whileTap={{ scale: 0.96 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-black/20'
                    : 'bg-white/5 text-neutral-300 border border-white/10 hover:bg-white/10'
                }`}
              >
                {s.label}
              </motion.button>
            );
          })}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]"
        >
          <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
            <source src={`${import.meta.env.BASE_URL}assets/${scenario.video}`} type="video/mp4" />
          </video>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
