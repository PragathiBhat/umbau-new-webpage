import { Reveal } from './Reveal';

const STATS = [
  {
    label: 'Population',
    value: '129,560',
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
      </>
    ),
  },
  {
    label: 'Factory robots',
    value: '5,000',
    icon: (
      <>
        <rect x="7" y="8" width="10" height="9" rx="2" />
        <circle cx="9.5" cy="12.5" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="12.5" r="0.8" fill="currentColor" stroke="none" />
        <path d="M12 8V5" />
        <circle cx="12" cy="4" r="1" />
        <path d="M4 13h3M17 13h3" />
      </>
    ),
  },
  {
    label: 'GDP / capita',
    value: '€92,600',
    icon: <path d="M3 17l5-6 4 3 4-7 5 6" />,
  },
  {
    label: 'VW employees',
    value: '65,000',
    icon: (
      <>
        <rect x="3" y="7" width="18" height="12" rx="1.5" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </>
    ),
  },
];

export function StatsSection() {
  return (
    <section id="the-city" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <h3 className="text-2xl md:text-3xl font-semibold uppercase text-white tracking-tight mb-8">The observation</h3>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-3">// The city</p>
      </Reveal>
      <Reveal delay={0.15}>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-12 max-w-2xl">
          A city built entirely around one factory.
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="border border-white/10 rounded-2xl p-6 h-full bg-white/5 hover:border-[#4F8FC2]/40 transition-colors text-center">
              <svg viewBox="0 0 24 24" className="w-10 h-10 mb-4 mx-auto stroke-orange-500 text-orange-500 fill-none stroke-[1.4]">
                {s.icon}
              </svg>
              <div className="text-2xl font-semibold text-white tracking-tight">{s.value}</div>
              <div className="font-mono text-[11px] tracking-[1.5px] text-neutral-400 uppercase mt-2">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
