import { Reveal } from './Reveal';

export function EndingSection() {
  return (
    <section id="ending" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-32">
      <div className="text-center">
        <Reveal>
          <p className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
            The factory never stops.
            <br />
            Neither should the city.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-16">
          <p className="text-lg font-semibold text-[#7FB3DE]">Project Umbau</p>
          <p className="font-mono text-xs tracking-[1.5px] text-neutral-500 uppercase mt-2">
            Marktplatz · Porschestrasse · Wolfsburg · 2026
          </p>
          <p className="font-mono text-xs text-neutral-400 leading-6 mt-6">
            Chin Yu Phyllis Yick
            <br />
            Mathan Kumar Mangaleshwaran
            <br />
            Pragathi Bhat Prakash
          </p>
          <p className="font-mono text-xs text-neutral-400 mt-4">Bauhaus-Universität Weimar</p>
        </Reveal>
      </div>
    </section>
  );
}
