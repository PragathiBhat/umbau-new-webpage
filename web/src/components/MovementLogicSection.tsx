import { Reveal } from './Reveal';

const RULES = [
  {
    num: '01',
    title: 'AMRs move on fixed lanes',
    body: 'AMR units travel along Porschestrasse and the perimeter — never diagonally, never through the build zones.',
  },
  {
    num: '02',
    title: 'The gantry owns the overhead layer',
    body: 'The gantry spans the full site from above. It never shares floor space with the AMRs — collision is geometrically impossible.',
  },
  {
    num: '03',
    title: 'The arm stays within the core',
    body: 'Mounted on the gantry, the arm only operates inside the active build zone — it never travels independently across the site.',
  },
  {
    num: '04',
    title: 'Zones reconfigure, lanes don’t',
    body: 'What each zone becomes changes per scenario — playground, event, market. The lane structure underneath never moves.',
  },
];

export function MovementLogicSection() {
  return (
    <section className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <div className="grid sm:grid-cols-2 gap-4">
        {RULES.map((r, i) => (
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
