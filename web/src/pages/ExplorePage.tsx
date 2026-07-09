import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ParticleBackground } from '../components/ParticleBackground';
import { HudCorners } from '../components/HudCorners';
import { SectionLabel } from '../components/SectionLabel';
import { triggerDisplayReload, triggerScenarioMarker } from '../lib/robonexusSync';

const CATEGORIES = [
  {
    category: 'Market',
    scenarios: [
      { label: 'Market Scenario 1', id: 'market-1' },
      { label: 'Market Scenario 2', id: 'market-2' },
    ],
  },
  {
    category: 'Event',
    scenarios: [
      { label: 'Event Scenario 1', id: 'event-1' },
      { label: 'Event Scenario 2', id: 'event-2' },
    ],
  },
  {
    category: 'Playground',
    scenarios: [
      { label: 'Playground Scenario 1', id: 'playground-1' },
      { label: 'Playground Scenario 2', id: 'playground-2' },
    ],
  },
];

export function ExplorePage() {
  useEffect(() => {
    // Fires once on landing here — not on leaving. Nothing happens to the
    // display when navigating away from this page.
    triggerDisplayReload();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-white font-sans antialiased overflow-x-hidden">
      <div className="fixed inset-0 z-[1] bg-blueprint-grid pointer-events-none" aria-hidden="true" />
      <ParticleBackground />

      <div className="relative z-[2] max-w-6xl mx-auto px-6 py-16 sm:py-24 min-h-screen flex flex-col">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[2px] uppercase text-sci-green/70 hover:text-sci-green transition-colors w-fit mb-12"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to site
        </Link>

        <SectionLabel>// Robot plaza</SectionLabel>
        <h1 className="font-orbitron text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Explore the robot plaza.
        </h1>
        <p className="text-neutral-400 max-w-xl mb-14">
          Select a scenario to step into the plaza and see how the robots reshape it.
        </p>

        <div className="grid sm:grid-cols-3 gap-5 flex-1">
          {[0, 1].flatMap((row) =>
            CATEGORIES.map((c) => {
              const s = c.scenarios[row];
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => triggerScenarioMarker(s.id)}
                  className="group relative flex flex-col border border-sci-green/20 bg-white/5 hover:border-sci-green/60 hover:bg-sci-green/5 transition-colors p-8 text-left cursor-pointer"
                >
                  <HudCorners />
                  <p className="font-mono text-[11px] tracking-[3px] text-sci-green/60 uppercase mb-3">
                    {c.category}
                  </p>
                  <h3 className="font-orbitron text-xl font-bold uppercase tracking-wide text-white group-hover:text-sci-green transition-colors">
                    {s.label}
                  </h3>
                </button>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
