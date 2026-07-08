import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { HudCorners } from './HudCorners';

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
        <SectionLabel>07 — Live interactions in the plaza</SectionLabel>
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
                className={`px-4 py-2 font-mono text-sm uppercase tracking-wide transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-sci-green text-black shadow-[0_0_16px_rgba(61,255,160,0.4)]'
                    : 'bg-white/5 text-neutral-300 border border-sci-green/20 hover:border-sci-green/50 hover:text-white'
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
          className="relative w-full aspect-video overflow-hidden border border-sci-green/25 bg-[#0a0a0a]"
        >
          <HudCorners size={4} />
          <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
            <source src={`${import.meta.env.BASE_URL}assets/${scenario.video}`} type="video/mp4" />
          </video>
          <div className="absolute top-3 left-4 font-mono text-[11px] tracking-[2px] text-sci-green/80 uppercase pointer-events-none">
            [ {scenario.label} scenario ]
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
