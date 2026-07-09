import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ParticleBackground } from '../components/ParticleBackground';
import { HudCorners } from '../components/HudCorners';
import { RadarRing } from '../components/RadarRing';
import { SectionLabel } from '../components/SectionLabel';
import { useTypewriter } from '../hooks/useTypewriter';
import { triggerScenarioMarker } from '../lib/robonexusSync';

// Drop the real intro video in as web/public/assets/explore-intro.mp4 — the
// intro will automatically play it and sync its duration to the video's
// actual length. Until that file exists, the video errors out immediately
// and the fallback timer below keeps the intro working as before.
const INTRO_VIDEO_SRC = `${import.meta.env.BASE_URL}assets/explore-intro.mp4`;
const FALLBACK_DURATION_MS = 3200;

function IntroOverlay({ onSkip, onDone }: { onSkip: () => void; onDone: () => void }) {
  const { displayed, done } = useTypewriter('INITIALIZING PLAZA INTERFACE', 28, 300);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoAvailable, setVideoAvailable] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If a real video loads, let it drive the intro's duration exactly.
    const handleCanPlay = () => setVideoAvailable(true);
    const handleEnded = () => onDone();
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onDone]);

  useEffect(() => {
    // No video (or it failed to load) — fall back to a fixed duration so the
    // intro never gets stuck waiting on a file that doesn't exist yet.
    if (videoAvailable) return;
    const timer = setTimeout(onDone, FALLBACK_DURATION_MS);
    return () => clearTimeout(timer);
  }, [videoAvailable, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] bg-blueprint-grid overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onError={() => setVideoAvailable(false)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoAvailable ? 'opacity-60' : 'opacity-0'
        }`}
      >
        <source src={INTRO_VIDEO_SRC} type="video/mp4" />
      </video>

      <RadarRing size={320} color="green" className="relative opacity-50" />
      <p className="relative font-mono text-sm sm:text-base tracking-[3px] text-sci-green uppercase text-glow-green">
        {displayed}
        {!done && <span className="inline-block w-[2px] h-[1em] bg-sci-green align-middle ml-[2px] animate-blink" />}
      </p>

      <button
        type="button"
        onClick={onSkip}
        className="absolute bottom-8 right-8 flex items-center gap-2 border border-sci-green/40 px-4 py-2 font-mono text-xs tracking-[2px] uppercase text-sci-green hover:bg-sci-green/10 hover:border-sci-green transition-colors cursor-pointer"
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
  const [activatedId, setActivatedId] = useState<string | null>(null);

  // Remotely selects the matching marker on the Robonexus floor plan (a
  // separate site -- see lib/robonexusSync.ts) and briefly marks this
  // button as activated, since the actual effect happens on whatever
  // device has the floor plan open, not on this screen.
  function handleActivate(id: string) {
    triggerScenarioMarker(id);
    setActivatedId(id);
    setTimeout(() => setActivatedId((cur) => (cur === id ? null : cur)), 2200);
  }

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

        <div className="grid sm:grid-cols-3 gap-5 flex-1">
          {[0, 1].flatMap((row) =>
            CATEGORIES.map((c) => {
              const s = c.scenarios[row];
              const isActivated = activatedId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleActivate(s.id)}
                  className={`group relative flex flex-col border transition-colors p-8 text-left cursor-pointer ${
                    isActivated
                      ? 'border-sci-green bg-sci-green/10'
                      : 'border-sci-green/20 bg-white/5 hover:border-sci-green/60 hover:bg-sci-green/5'
                  }`}
                >
                  <HudCorners />
                  <p className="font-mono text-[11px] tracking-[3px] text-sci-green/60 uppercase mb-3">
                    {c.category}
                  </p>
                  <h3 className="font-orbitron text-xl font-bold uppercase tracking-wide text-white group-hover:text-sci-green transition-colors">
                    {s.label}
                  </h3>
                  {isActivated && (
                    <p className="mt-3 font-mono text-[10px] tracking-[2px] text-sci-green uppercase">
                      Activated on floor plan
                    </p>
                  )}
                </button>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
