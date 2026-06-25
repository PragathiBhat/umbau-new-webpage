import { Reveal } from './Reveal';

export function ConstructionSimulationSection() {
  return (
    <section id="simulation" className="relative z-[2] w-full min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <Reveal>
        <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-6">// Simulation</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mb-12">
          Now let's see a simulation for construction.
        </h2>
      </Reveal>
      <Reveal delay={0.2} className="w-full max-w-4xl">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls
            className="absolute inset-0 w-full h-full object-contain"
          >
            <source src={`${import.meta.env.BASE_URL}assets/configuration.mp4`} type="video/mp4" />
          </video>
        </div>
      </Reveal>
    </section>
  );
}
