import { useEffect, useRef } from 'react';

export function EndingSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    function tick() {
      const trigger = triggerRef.current!;
      const fixed = fixedRef.current!;
      const text = textRef.current!;
      const credits = creditsRef.current!;
      const bg = bgRef.current!;
      const grid = gridRef.current!;
      const vignette = vignetteRef.current!;

      const rect = trigger.getBoundingClientRect();
      const triggerTop = rect.top + window.scrollY;
      const triggerHeight = rect.height;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const start = triggerTop;
      const end = triggerTop + triggerHeight - vh;
      const range = Math.max(1, end - start);
      const progress = Math.max(0, Math.min(1, (scrollY - start) / range));

      const fadeIn = Math.max(0, Math.min(1, (scrollY - (start - vh * 0.1)) / (vh * 0.1)));
      const isWithinRange = scrollY >= start - vh * 0.1;
      fixed.style.opacity = isWithinRange ? String(fadeIn) : '0';
      fixed.style.pointerEvents = 'none';

      const blur = progress < 0.4 ? 28 * (1 - progress / 0.4) : 0;
      const textOpacity = Math.min(1, progress / 0.2);

      text.style.filter = `blur(${blur}px)`;
      text.style.opacity = String(textOpacity);

      const creditsOpacity = Math.max(0, Math.min(1, (progress - 0.55) / 0.25));
      credits.style.opacity = String(creditsOpacity);
      credits.style.transform = `translateY(${(1 - creditsOpacity) * 16}px)`;

      const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t);
      const c1 = [10, 10, 10];
      const c2 = [26, 13, 13];
      const c3 = [42, 15, 10];
      const bgRgb = progress < 0.5 ? mix(c1, c2, progress / 0.5) : mix(c2, c3, (progress - 0.5) / 0.5);
      bg.style.backgroundColor = `rgb(${bgRgb[0]}, ${bgRgb[1]}, ${bgRgb[2]})`;
      grid.style.opacity = String(Math.min(0.3, (progress / 0.5) * 0.3));
      vignette.style.opacity = String(progress > 0.6 ? ((progress - 0.6) / 0.4) * 0.7 : 0);

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div
        ref={fixedRef}
        className="fixed inset-0 z-[2] w-full h-screen flex flex-col items-center justify-center px-6 overflow-hidden opacity-0"
      >
        <div ref={bgRef} className="absolute inset-0" style={{ backgroundColor: '#0a0a0a' }} />
        <div
          ref={gridRef}
          className="absolute inset-0"
          style={{
            opacity: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          ref={vignetteRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0, background: 'radial-gradient(ellipse at center, transparent 35%, #000 100%)' }}
        />
        <p
          ref={textRef}
          className="relative text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white text-center max-w-4xl leading-tight"
        >
          Wolfsburg built the world's cars. It's time to build its own city.
        </p>
        <div ref={creditsRef} className="relative text-center mt-12 opacity-0">
          <p className="text-lg font-semibold text-orange-400">Project Umbau</p>
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
        </div>
      </div>

      <div ref={triggerRef} className="h-[250vh]" />
    </>
  );
}
