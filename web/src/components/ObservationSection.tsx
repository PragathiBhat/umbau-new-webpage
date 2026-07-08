import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { HudCorners } from './HudCorners';

export function ObservationSection() {
  return (
    <section id="observation" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <SectionLabel>02 — Scanning the city</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h3 className="text-white text-lg md:text-2xl font-medium mb-6">
          The most productive city in Germany.
          <br />
          The emptiest plaza in Wolfsburg.
        </h3>
      </Reveal>

      <div className="relative w-full aspect-video overflow-hidden bg-[#0a0a0a] border border-sci-cyan/20">
        <HudCorners color="cyan" size={4} />
        <video autoPlay muted loop playsInline preload="none" className="w-full h-full object-cover contrast-125 brightness-75">
          <source src={`${import.meta.env.BASE_URL}assets/scanning-city.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 top-[-10%] h-24 bg-gradient-to-b from-transparent via-sci-cyan/40 to-transparent animate-scan-line" />
        </div>
      </div>
    </section>
  );
}
