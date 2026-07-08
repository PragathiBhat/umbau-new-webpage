import { useState } from 'react';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { HudCorners } from './HudCorners';

const ROBOTS = [
  {
    name: 'AGV',
    model: 'KUKA KMP 1500P',
    tag: 'Logistics',
    fn: 'Navigates the grid autonomously. Delivers, positions and retrieves every modular element on schedule.',
    image: 'robot-agv-line.svg',
    jitterDelay: '0s',
  },
  {
    name: 'Gantry',
    model: 'KR210 Gantry',
    tag: 'Structure',
    fn: 'Spans the full plaza width. Lifts and installs large-scale structures: canopies, stages and overhead rigs.',
    image: 'robot-gantry-line.svg',
    jitterDelay: '0.6s',
  },
  {
    name: 'Arm',
    model: 'KR210 R2700-2',
    tag: 'Assembly',
    fn: 'Mounted on the AGV. Picks, places and connects modular units, the building hand of the system.',
    image: 'robot-arm-line.svg',
    jitterDelay: '1.2s',
  },
];

export function RobotsSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="the-robots" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <SectionLabel className="justify-center">06 — The robots</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-orbitron text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-12 text-center">
          Bringing the plaza to life with robots.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {ROBOTS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.1}>
            <div
              onClick={() => setActive((cur) => (cur === r.name ? null : r.name))}
              className="group relative overflow-hidden border border-white/10 bg-white/5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 hover:border-sci-green/50 cursor-pointer"
            >
              <HudCorners color="green" />
              <div className="relative h-48 sm:h-56 flex items-center justify-center overflow-hidden bg-black/30 bg-blueprint-grid-fine">
                {r.image && (
                  <img
                    src={`${import.meta.env.BASE_URL}assets/${r.image}`}
                    alt={`${r.name} robot line drawing`}
                    className="w-full h-full object-contain p-8 animate-robot-jitter group-hover:[animation-play-state:paused] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(46,255,77,0.35)]"
                    style={{ animationDelay: r.jitterDelay }}
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-orbitron text-3xl font-extrabold uppercase text-white tracking-tight">{r.name}</h3>
                <p className="font-mono text-sm text-neutral-400 mt-1">{r.model}</p>
                <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold uppercase tracking-wide border border-sci-green/50 text-sci-green">
                  {r.tag}
                </span>
                <p className="font-mono text-[11px] tracking-[1.5px] text-neutral-500 uppercase mt-4">
                  {active === r.name ? 'Tap to hide ▲' : 'Tap to learn more ▼'}
                </p>
                {active === r.name && (
                  <p className="text-sm italic text-neutral-400 leading-6 mt-2">{r.fn}</p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <div className="text-center">
          <SectionLabel className="justify-center">The system hierarchy</SectionLabel>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-sm text-sci-green mt-3">
            <span className="px-4 py-2 border border-sci-green/40">AGV</span>
            <span className="text-sci-green/40">&rarr;</span>
            <span className="px-4 py-2 border border-sci-green/40">Gantry</span>
            <span className="text-sci-green/40">&rarr;</span>
            <span className="px-4 py-2 border border-sci-green/40">Arm</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
