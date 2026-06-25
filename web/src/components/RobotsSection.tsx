import { Reveal } from './Reveal';

const ROBOTS = [
  {
    name: 'AGV',
    model: 'KUKA KMP 1500P',
    tag: 'Logistics',
    accent: { tint: 'bg-emerald-900/50', pill: 'bg-emerald-500', glow: 'group-hover:border-emerald-500/50' },
    fn: 'Navigates the grid autonomously. Delivers, positions and retrieves every modular element on schedule.',
    image: 'amr-robot.png',
    jitterDelay: '0s',
  },
  {
    name: 'Gantry',
    model: 'KR210 Gantry',
    tag: 'Structure',
    accent: { tint: 'bg-slate-800/60', pill: 'bg-blue-500', glow: 'group-hover:border-blue-500/50' },
    fn: 'Spans the full plaza width. Lifts and installs large-scale structures — canopies, stages and overhead rigs.',
    image: 'gantry-robot.png',
    jitterDelay: '0.6s',
  },
  {
    name: 'Arm',
    model: 'KR210 R2700-2',
    tag: 'Assembly',
    accent: { tint: 'bg-orange-900/50', pill: 'bg-orange-500', glow: 'group-hover:border-orange-500/50' },
    fn: 'Mounted on the gantry. Picks, places and connects modular units — the building hand of the system.',
    image: 'arm-robot.png',
    jitterDelay: '1.2s',
  },
];

export function RobotsSection() {
  return (
    <section id="the-robots" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs tracking-[2px] text-orange-500 uppercase mb-3 text-center">06 — The robots</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-12 text-center">
          3 types. 3 distinct roles.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {ROBOTS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.1}>
            <div
              className={`group rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 ${r.accent.glow}`}
            >
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
                <h3 className="text-3xl font-extrabold uppercase text-white tracking-tight">{r.name}</h3>
                <p className="text-sm text-amber-400 mt-1">{r.model}</p>
                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide text-white ${r.accent.pill}`}
                >
                  {r.tag}
                </span>
                <p className="text-sm italic text-neutral-400 leading-6 mt-4">{r.fn}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <div className="text-center">
          <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-6">The system hierarchy</p>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-sm text-[#7FB3DE]">
            <span className="px-4 py-2 border border-[#4F8FC2]/40 rounded-full">AGV</span>
            <span className="text-neutral-500">&rarr;</span>
            <span className="px-4 py-2 border border-[#4F8FC2]/40 rounded-full">Gantry</span>
            <span className="text-neutral-500">&rarr;</span>
            <span className="px-4 py-2 border border-[#4F8FC2]/40 rounded-full">Arm</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
