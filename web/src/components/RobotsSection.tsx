import { Reveal } from './Reveal';

const ROBOTS = [
  {
    name: 'AMR',
    model: 'KUKA KMP 1500P',
    tag: 'Logistics',
    specs: [['Payload', '1,500 kg'], ['Navigation', 'Autonomous grid'], ['Operation', '24/7'], ['Grid movement', 'X-axis primary']],
    fn: 'Navigates the 8×8 plaza grid. Delivers modules to exact grid coordinates. Reads the event schedule autonomously. Multiple units on separate lanes — no collision possible.',
  },
  {
    name: 'Gantry',
    model: 'KR210 Gantry',
    tag: 'Structure',
    specs: [['Payload', '210 kg'], ['Span', 'Full plaza width'], ['Mount', 'Overhead rail'], ['Deployment', 'From above']],
    fn: 'Spans the entire plaza overhead. Deploys canopies, lighting rigs and large structural elements. The only robot that works from above.',
  },
  {
    name: 'Arm',
    model: 'KR210 R2700-2',
    tag: 'Assembly',
    specs: [['Payload', '210 kg'], ['Reach', '2,700 mm'], ['Mount', 'Gantry-mounted'], ['Precision', '±0.05 mm']],
    fn: 'Mounted on the gantry. Picks, places and connects modular units with surgical precision. The building hand of the system.',
  },
];

export function RobotsSection() {
  return (
    <section id="the-robots" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-3">05 — Deploying robot fleet</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-12 max-w-2xl">
          Three robots. One system.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {ROBOTS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.1}>
            <div className="border border-white/10 rounded-2xl p-6 h-full bg-white/5 hover:border-[#4F8FC2]/40 transition-colors">
              <h3 className="text-2xl font-semibold text-white">{r.name}</h3>
              <div className="font-mono text-xs text-neutral-500 mt-1">{r.model}</div>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium bg-[#2C5C88]/20 text-[#7FB3DE]">
                {r.tag}
              </span>
              <div className="font-mono text-xs text-neutral-400 leading-6 mt-5 space-y-1">
                {r.specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-white/10 pb-1">
                    <span>{k}</span>
                    <span className="text-white">{v}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-neutral-400 leading-6 mt-4">{r.fn}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <div className="text-center">
          <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-6">The system hierarchy</p>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-sm text-[#7FB3DE]">
            <span className="px-4 py-2 border border-[#4F8FC2]/40 rounded-full">AMR</span>
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
