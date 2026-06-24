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
        <rect x="4" y="9" width="16" height="11" rx="1.5" />
        <path d="M8 9V6a4 4 0 0 1 8 0v3" />
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
  {
    label: 'Public space robots',
    value: '0',
    icon: (
      <>
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <circle cx="12" cy="17" r="0.6" />
      </>
    ),
  },
  {
    label: 'Efficiency rating',
    value: '0%',
    icon: (
      <>
        <path d="M3 12a9 9 0 1 1 9 9" />
        <path d="M12 7v5l4 2" />
      </>
    ),
  },
];

export function StatsSection() {
  return (
    <section id="the-city" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-3">// The city</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-12 max-w-2xl">
          A city built entirely around one factory.
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="border border-white/10 rounded-2xl p-6 h-full bg-white/5 hover:border-[#4F8FC2]/40 transition-colors">
              <svg viewBox="0 0 24 24" className="w-6 h-6 mb-4 stroke-[#4F8FC2] fill-none stroke-[1.6]">
                {s.icon}
              </svg>
              <div className="text-2xl font-semibold text-white tracking-tight">{s.value}</div>
              <div className="font-mono text-[11px] tracking-[1.5px] text-neutral-400 uppercase mt-2">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-12">
        <div className="border-t border-white/10 pt-8">
          <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-2">// Transmission incoming</p>
          <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">The observation</h3>
        </div>
      </Reveal>
    </section>
  );
}
