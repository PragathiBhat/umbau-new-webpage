import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ParticleBackground } from '../components/ParticleBackground';
import { HudCorners } from '../components/HudCorners';
import { SectionLabel } from '../components/SectionLabel';

// The full "digital twin scan" opening (particle site formation + ROBONEXUS
// wordmark + narrated voiceover + video-mosaic reveal) from the
// ROBONEXUS-OPENING repo, embedded as-is via iframe rather than ported into
// React — it's a self-contained, already-tuned Three.js/WebGL scene with its
// own audio EQ pipeline and animation timeline, and re-implementing that here
// would risk breaking the tuning for no benefit.
const OPENING_SRC = `${import.meta.env.BASE_URL}assets/robonexus-opening/index.html`;

// Safety net only — the opening drives its own pacing (flight, formation,
// hold, video-mosaic reveal) and we advance the instant its narration audio
// fires 'ended'. This fallback only fires if that never happens (asset
// failed to load, autoplay blocked with no fallback gesture, etc.).
const FALLBACK_DURATION_MS = 90_000;

function IntroOverlay({ onSkip, onDone }: { onSkip: () => void; onDone: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = setTimeout(onDone, FALLBACK_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onDone]);

  function handleIframeLoad() {
    const audio = iframeRef.current?.contentDocument?.getElementById('narration');
    if (audio instanceof HTMLAudioElement) {
      audio.addEventListener('ended', onDone, { once: true });
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      <iframe
        ref={iframeRef}
        src={OPENING_SRC}
        onLoad={handleIframeLoad}
        title="Robonexus opening sequence"
        className="absolute inset-0 w-full h-full border-0"
        allow="autoplay"
      />

      <button
        type="button"
        onClick={onSkip}
        className="absolute bottom-8 right-8 z-10 flex items-center gap-2 border border-sci-green/40 bg-black/60 px-4 py-2 font-mono text-xs tracking-[2px] uppercase text-sci-green hover:bg-sci-green/10 hover:border-sci-green transition-colors cursor-pointer"
      >
        Skip intro
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]">
          <path d="M5 5l7 7-7 7M13 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

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
  const [showIntro, setShowIntro] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = CATEGORIES.flatMap((c) => c.scenarios).find((s) => s.id === selectedId);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-white font-sans antialiased overflow-x-hidden">
      {showIntro && <IntroOverlay onSkip={() => setShowIntro(false)} onDone={() => setShowIntro(false)} />}

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

        <div className="grid sm:grid-cols-3 gap-5">
          {[0, 1].flatMap((row) =>
            CATEGORIES.map((c) => {
              const s = c.scenarios[row];
              const isSelected = s.id === selectedId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedId(s.id)}
                  aria-pressed={isSelected}
                  className={`group relative flex flex-col border p-8 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-sci-green bg-sci-green/10 shadow-[0_0_24px_rgba(46,255,77,0.15)]'
                      : 'border-sci-green/20 bg-white/5 hover:border-sci-green/60 hover:bg-sci-green/5'
                  }`}
                >
                  <HudCorners />
                  <p
                    className={`font-mono text-[11px] tracking-[3px] uppercase mb-3 ${
                      isSelected ? 'text-sci-green' : 'text-sci-green/60'
                    }`}
                  >
                    {c.category}
                  </p>
                  <h3
                    className={`font-orbitron text-xl font-bold uppercase tracking-wide transition-colors ${
                      isSelected ? 'text-sci-green text-glow-green' : 'text-white group-hover:text-sci-green'
                    }`}
                  >
                    {s.label}
                  </h3>
                  {isSelected && (
                    <span className="absolute top-4 right-4 w-2 h-2 bg-sci-green shadow-[0_0_6px_#2eff4d] animate-pulse" />
                  )}
                </button>
              );
            }),
          )}
        </div>

        <div
          className={`mt-8 flex items-center justify-between gap-4 border border-sci-green/30 bg-black/40 px-6 py-4 transition-opacity duration-300 ${
            selected ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <p className="font-mono text-xs sm:text-sm tracking-[2px] uppercase text-neutral-300">
            Selected: <span className="text-sci-green">{selected?.label ?? ''}</span>
          </p>
          <button
            type="button"
            disabled={!selected}
            className="flex items-center gap-2 border border-sci-green/40 px-5 py-2.5 font-mono text-xs tracking-[2px] uppercase text-sci-green hover:bg-sci-green/10 hover:border-sci-green transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Enter scenario
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
