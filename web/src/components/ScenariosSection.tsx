import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reveal } from './Reveal';

const SCENARIOS = [
  {
    key: 'playground',
    label: 'Playground',
    time: '09:00 — 15:00',
    config: 'Play landscape',
    modules: 24,
    robots: [['KMP 1500P', 'Delivering'], ['KR210 Arm', 'Assembling'], ['KR210 Gantry', 'Standby']],
    detail:
      'AMRs scan the site and analyse occupancy. As more children arrive, the system deploys additional play modules — scaling from a handful of stations at low traffic to a full landscape at peak.',
  },
  {
    key: 'event',
    label: 'Event Space',
    time: '18:00 — 23:00',
    config: 'Performance arena',
    modules: 36,
    robots: [['KMP 1500P', 'Delivering'], ['KR210 Arm', 'Assembling'], ['KR210 Gantry', 'Deploying']],
    detail:
      '16:00 — AMRs retrieve stage segments. 17:00 — Arm assembles the circular stage. 17:30 — Gantry deploys the canopy. 18:00 — Arena ready, event begins.',
  },
  {
    key: 'market',
    label: 'Market',
    time: '08:00 — 14:00',
    config: 'Vendor grid',
    modules: 42,
    robots: [['KMP 1500P', 'Delivering'], ['KR210 Arm', 'Assembling'], ['KR210 Gantry', 'Canopy']],
    detail:
      '05:00 — AMRs retrieve from south storage. 06:00 — Stalls placed at grid coordinates. 07:00 — Arm assembles counters. 08:00 — Market opens, city wakes.',
  },
];

export function ScenariosSection() {
  const [active, setActive] = useState(SCENARIOS[0].key);
  const scenario = SCENARIOS.find((s) => s.key === active)!;

  return (
    <section id="the-scenarios" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-3">07 — Three scenarios. One plaza.</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-10 max-w-2xl">
          Same plaza. Same robots. Same bricks.
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
                    ? 'bg-[#2C5C88] text-white shadow-md shadow-black/20'
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
          className="grid md:grid-cols-2 gap-8 border border-white/10 rounded-2xl p-8 bg-white/5"
        >
          <div>
            <div className="font-mono text-xs text-neutral-500 uppercase mb-1">Status</div>
            <div className="text-sm text-[#7FB3DE] font-medium mb-4">● Active</div>

            <div className="font-mono text-xs text-neutral-400 leading-7">
              <p>Time window: <span className="text-white">{scenario.time}</span></p>
              <p>Configuration: <span className="text-white">{scenario.config}</span></p>
              <p>Modules deployed: <span className="text-white">{scenario.modules}</span></p>
            </div>

            <div className="font-mono text-xs text-neutral-400 leading-7 mt-4 border-t border-white/10 pt-4">
              {scenario.robots.map(([name, status]) => (
                <div key={name} className="flex justify-between">
                  <span>◈ {name}</span>
                  <span className="text-white">{status}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-xs text-neutral-500 uppercase mb-2">Sequence</div>
            <p className="text-sm text-neutral-400 leading-6">{scenario.detail}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <Reveal delay={0.2} className="text-center mt-16">
        <p className="text-lg text-neutral-400">Same plaza. Same robots. Same bricks.</p>
        <p className="text-3xl md:text-5xl font-semibold text-[#4F8FC2] mt-2">Infinite city.</p>
      </Reveal>
    </section>
  );
}
