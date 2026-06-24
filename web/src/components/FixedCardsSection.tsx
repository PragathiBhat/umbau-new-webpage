import { useEffect, useRef } from 'react';

const CARDS = [
  {
    title: 'Scan the city',
    body: 'AMRs read the plaza in real time — occupancy, footfall, the event schedule — and decide what the space needs next.',
  },
  {
    title: 'Deploy the robots',
    body: 'AMR, gantry and arm move as one system: delivering, spanning and assembling modules without a single human hand.',
  },
  {
    title: 'Reshape the plaza',
    body: 'The same bricks become a playground at nine, an arena at six, and a market at dawn — on demand, every day.',
  },
];

export function FixedCardsSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    function tick() {
      const trigger = triggerRef.current!;
      const fixed = fixedRef.current!;
      const grid = gridRef.current!;
      const rect = trigger.getBoundingClientRect();
      const triggerTop = rect.top + window.scrollY;
      const triggerHeight = rect.height;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const start = triggerTop - vh * 0.5;
      const end = triggerTop + triggerHeight - vh * 0.3;
      const range = end - start;
      let progress = range > 0 ? (scrollY - start) / range : 0;
      progress = Math.max(0, Math.min(1, progress));

      const isActive = scrollY >= start - vh * 0.2 && scrollY <= end + vh * 0.3;
      const fadeIn = Math.min(1, Math.max(0, (scrollY - (start - vh * 0.2)) / (vh * 0.2)));
      const fadeOut = Math.min(1, Math.max(0, (end + vh * 0.3 - scrollY) / (vh * 0.3)));
      const containerOpacity = isActive ? Math.min(fadeIn, fadeOut) : 0;

      fixed.style.opacity = String(containerOpacity);
      fixed.style.pointerEvents = containerOpacity > 0.1 ? 'auto' : 'none';

      const isMobile = window.innerWidth < 768;
      const revealPct = progress * 130;
      const mask = isMobile
        ? `linear-gradient(to bottom, black ${revealPct}%, transparent ${revealPct + 20}%)`
        : `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`;
      grid.style.maskImage = mask;
      grid.style.webkitMaskImage = mask;

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div ref={fixedRef} className="fixed bottom-0 left-0 right-0 z-[4] px-6 sm:px-10 py-12 opacity-0">
        <div ref={gridRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARDS.map((c) => (
            <div key={c.title}>
              <h3 className="text-2xl font-bold text-white mb-3">{c.title}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div ref={triggerRef} className="h-[200vh]" />
    </>
  );
}
