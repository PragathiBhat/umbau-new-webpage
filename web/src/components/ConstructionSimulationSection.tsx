import { useEffect, useRef } from 'react';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { HudCorners } from './HudCorners';

export function ConstructionSimulationSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => video.play().catch(() => {});

    tryPlay();

    const handleEnded = () => {
      video.currentTime = 0;
      tryPlay();
    };

    // Self-heal from any interruption (throttled background tab, stray pause, load hiccup)
    // so the loop never permanently stops.
    const handlePause = () => {
      if (!video.ended) tryPlay();
    };
    const handleVisibility = () => {
      if (!document.hidden) tryPlay();
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', tryPlay);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', tryPlay);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  function handleFullscreen() {
    videoRef.current?.requestFullscreen().catch(() => {});
  }

  return (
    <section id="simulation" className="relative z-[2] w-full min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <Reveal>
        <SectionLabel className="justify-center">// Simulation</SectionLabel>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-orbitron text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mb-12">
          Now let's see a simulation for construction.
        </h2>
      </Reveal>
      <Reveal delay={0.2} className="w-full max-w-4xl">
        <div className="relative w-full aspect-video overflow-hidden border border-sci-green/25 bg-black">
          <HudCorners />
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-contain"
          >
            <source src={`${import.meta.env.BASE_URL}assets/simulation-recording.mp4`} type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={handleFullscreen}
            aria-label="View fullscreen"
            className="absolute bottom-3 right-3 z-10 p-2 border border-sci-green/40 bg-black/60 text-sci-green hover:bg-sci-green/10 hover:border-sci-green transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2]">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>

          {/* vignette + fine scanline texture for a subtle CRT feel */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{
              backgroundImage: 'repeating-linear-gradient(to bottom, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)' }}
          />
        </div>
      </Reveal>
    </section>
  );
}
