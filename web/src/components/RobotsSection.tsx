import { useState } from 'react';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { HudCorners } from './HudCorners';

const ROBOTS = [
  {
    name: 'AGV',
    model: 'KUKA KMP 1500P',
    tag: 'Logistics',
    accent: {
      tint: 'bg-sci-green/10',
      pill: 'bg-sci-green text-black',
      glow: 'group-hover:border-sci-green/60',
      corner: 'green' as const,
    },
    fn: 'Navigates the grid autonomously. Delivers, positions and retrieves every modular element on schedule.',
    image: 'amr-robot.png',
    jitterDelay: '0s',
  },
  {
    name: 'Gantry',
    model: 'KR210 Gantry',
    tag: 'Structure',
    accent: {
      tint: 'bg-sci-cyan/10',
      pill: 'bg-sci-cyan text-black',
      glow: 'group-hover:border-sci-cyan/60',
      corner: 'cyan' as const,
    },
    fn: 'Spans the full plaza width. Lifts and installs large-scale structures — canopies, stages and overhead rigs.',
    image: 'gantry-robot.png',
    jitterDelay: '0.6s',
  },
  {
    name: 'Arm',
    model: 'KR210 R2700-2',
    tag: 'Assembly',
    accent: {
      tint: 'bg-sci-amber/10',
      pill: 'bg-sci-amber text-black',
      glow: 'group-hover:border-sci-amber/60',
      corner: 'green' as const,
    },
    fn: 'Mounted on the AGV. Picks, places and connects modular units — the building hand of the system.',
    image: 'arm-robot.png',
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
              className={`group relative overflow-hidden border border-white/10 bg-white/5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 cursor-pointer ${r.accent.glow}`}
            >
              <HudCorners color={r.accent.corner} />
              <div className={`relative h-48 sm:h-56 flex items-center justify-center overflow-hidden ${r.accent.tint}`}>
                {r.image && (
                  <img
                    src={`${import.meta.env.BASE_URL}assets/${r.image}`}
                    alt={`${r.name} robot`}
                    className="w-full h-full object-contain p-6 animate-robot-jitter group-hover:[animation-play-state:paused] group-hover:scale-110 transition-transform duration-300"
                    style={{ animationDelay: r.jitterDelay }}
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-orbitron text-3xl font-extrabold uppercase text-white tracking-tight">{r.name}</h3>
                <p className="font-mono text-sm text-sci-amber mt-1">{r.model}</p>
                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs font-semibold uppercase tracking-wide ${r.accent.pill}`}
                >
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
            <span className="px-4 py-2 border border-sci-cyan/40 text-sci-cyan">Gantry</span>
            <span className="text-sci-green/40">&rarr;</span>
            <span className="px-4 py-2 border border-sci-amber/40 text-sci-amber">Arm</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
