import { useEffect, useRef } from 'react';

const CARDS = [
  { num: '01', word: 'Responsive', subtitle: "Shaping space around people's needs." },
  { num: '02', word: 'Alive', subtitle: 'Constantly changing, never standing still.' },
  { num: '03', word: 'Playful', subtitle: 'Inviting curiosity, joy, and discovery.' },
];

export function FixedCardsSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;

    function tick() {
      const trigger = triggerRef.current!;
      const fixed = fixedRef.current!;
      const rect = trigger.getBoundingClientRect();
      const triggerTop = rect.top + window.scrollY;
      const triggerHeight = rect.height;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const start = triggerTop - vh * 0.5;
      const end = triggerTop + triggerHeight - vh * 1.6;
      const range = end - start;
      let progress = range > 0 ? (scrollY - start) / range : 0;
      progress = Math.max(0, Math.min(1, progress));

      const isActive = scrollY >= start - vh * 0.2 && scrollY <= end + vh * 0.3;
      const fadeIn = Math.min(1, Math.max(0, (scrollY - (start - vh * 0.2)) / (vh * 0.2)));
      const fadeOut = Math.min(1, Math.max(0, (end + vh * 0.3 - scrollY) / (vh * 0.3)));
      const containerOpacity = isActive ? Math.min(fadeIn, fadeOut) : 0;

      fixed.style.opacity = String(containerOpacity);
      fixed.style.pointerEvents = containerOpacity > 0.1 ? 'auto' : 'none';

      const step = 1 / CARDS.length;
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const wordStart = i * step * 0.85;
        const wordEnd = wordStart + step;
        const wordProgress = Math.max(0, Math.min(1, (progress - wordStart) / (wordEnd - wordStart)));
        el.style.opacity = String(wordProgress);
        el.style.transform = `translateY(${(1 - wordProgress) * 24}px)`;
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div ref={fixedRef} className="fixed inset-0 z-[4] px-6 flex items-center justify-center opacity-0">
        <div className="flex flex-col items-stretch w-[min(92vw,460px)] bg-black/45 backdrop-blur-[2px] px-6 py-4 -mx-6">
          {CARDS.map((c, i) => (
            <div key={c.word} className="contents">
              <div
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="relative border-l-2 border-sci-green/60 pl-6 py-5 text-left"
              >
                <p className="font-mono text-[11px] tracking-[4px] text-sci-green uppercase mb-2 text-glow-green">
                  {c.num}
                </p>
                <h3 className="font-orbitron text-2xl sm:text-3xl font-semibold uppercase text-white leading-none tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {c.word}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-neutral-100">{c.subtitle}</p>
              </div>
              {i < CARDS.length - 1 && (
                <div className="pl-6 py-2" aria-hidden="true">
                  <span className="block w-px h-6 bg-sci-green/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[80vh]" />
      <div ref={triggerRef} className="h-[200vh]" />
    </>
  );
}
