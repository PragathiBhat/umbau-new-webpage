import { Reveal } from './Reveal';

export function QuestionSection() {
  return (
    <section id="question" className="relative z-[2] w-full max-w-4xl mx-auto px-6 py-32 text-center">
      <Reveal>
        <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-8">03 — The question</p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-3">
          If a city should be something,
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-12">
          can it still mean anything?
        </p>
      </Reveal>
      <Reveal delay={0.45}>
        <p className="text-3xl md:text-5xl font-semibold tracking-tight text-[#4F8FC2]">
          What if the factory came outside?
        </p>
      </Reveal>
    </section>
  );
}
