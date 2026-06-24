import { useEffect, useRef } from 'react';

const CARDS = [
  { word: 'Responsive', subtitle: "Shaping space around people's needs." },
  { word: 'Alive', subtitle: 'Constantly changing, never standing still.' },
  { word: 'Playful', subtitle: 'Inviting curiosity, joy, and discovery.' },
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
        <div className="flex flex-col items-center gap-8 sm:gap-10">
          {CARDS.map((c, i) => (
            <div key={c.word} className="contents">
              <div
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="w-[min(90vw,520px)] rounded-3xl bg-black/55 px-8 py-10 text-center"
              >
                <h3 className="font-display text-[clamp(2rem,9vw,4.5rem)] font-light uppercase text-white leading-none tracking-wide">
                  {c.word}
                </h3>
                <p className="mt-4 text-base sm:text-lg text-neutral-300">{c.subtitle}</p>
              </div>
              {i < CARDS.length - 1 && (
                <span className="w-2.5 h-2.5 rounded-full bg-white/70" aria-hidden="true" />
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
