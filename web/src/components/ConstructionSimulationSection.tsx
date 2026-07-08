import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { HudCorners } from './HudCorners';

export function ConstructionSimulationSection() {
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
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              filter: 'grayscale(0.7) sepia(0.6) hue-rotate(75deg) saturate(2.2) brightness(0.95) contrast(1.1)',
            }}
          >
            <source src={`${import.meta.env.BASE_URL}assets/configuration.mp4`} type="video/mp4" />
          </video>

          {/* matrix-style scanline sweep */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-x-0 top-[-10%] h-24 bg-gradient-to-b from-transparent via-sci-green/15 to-transparent animate-scan-line" />
          </div>

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
