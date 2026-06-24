import { Reveal } from './Reveal';

const REASONS = [
  {
    num: '01',
    title: 'It is already struggling and the city knows it',
    body: 'Empty pavements, low footfall, and declining retail have left the city struggling.',
  },
  {
    num: '02',
    title: 'Already car-free — more freedom',
    body: 'No traffic or barriers. The fully pedestrianized plaza allows uninterrupted robot access and makes the space easier to reprogram.',
  },
  {
    num: '03',
    title: 'The symbolic spine of the city',
    body: 'City hall, civic buildings, and the main shopping axis are all here. If robots reshape Wolfsburg, this is where the change will be most visible.',
  },
  {
    num: '04',
    title: 'It connects factory to city',
    body: "The street links the station to the VW factory, making the factory's presence visible in the city instead of hidden behind fences.",
  },
];

export function SiteSection() {
  return (
    <section id="the-site" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-3">04 — Target location acquired</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-12 max-w-2xl">
          Marktplatz, Porschestrasse.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10 items-start mb-16">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <img src="/assets/target-location.jpg" alt="Marktplatz Wolfsburg site plan" className="w-full block" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="font-mono text-sm text-neutral-400 leading-7 pt-2">
            <p className="text-white font-medium mb-2">Marktplatz · Porschestrasse · Wolfsburg</p>
            <p>Lat: <span className="text-white">52.4227° N</span> / Lng: <span className="text-white">10.7865° E</span></p>
            <p>Footprint: <span className="text-white">80 × 25m</span> / Area: <span className="text-white">2,000m²</span></p>
          </div>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {REASONS.map((r, i) => (
          <Reveal key={r.num} delay={i * 0.08}>
            <div className="border border-white/10 rounded-2xl p-6 h-full bg-white/5">
              <div className="font-mono text-xs text-neutral-500 mb-2">{r.num}</div>
              <h3 className="text-base font-semibold text-white mb-2">{r.title}</h3>
              <p className="text-sm text-neutral-400 leading-6">{r.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
