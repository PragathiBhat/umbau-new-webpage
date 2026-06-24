import { useEffect, useRef, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

type Stage = 'idle' | 'line1' | 'line2' | 'locked' | 'statement' | 'done';

function TypedStatement({ onDone }: { onDone: () => void }) {
  const { displayed, done } = useTypewriter('WHAT IF THE FACTORY CAME OUTSIDE?', 35, 0);

  useEffect(() => {
    if (done) onDone();
  }, [done, onDone]);

  return (
    <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-orange-500">
      {displayed}
      {!done && (
        <span className="inline-block w-[3px] h-[0.8em] bg-orange-500 align-middle ml-[3px] animate-blink" />
      )}
    </h2>
  );
}

export function FactoryTransitionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>('idle');
  const startedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            setStage('line1');
          }
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (stage === 'idle' || stage === 'done') return;
    const timers: number[] = [];

    if (stage === 'line1') {
      timers.push(window.setTimeout(() => setStage('line2'), 900));
    }
    if (stage === 'line2') {
      timers.push(window.setTimeout(() => setStage('locked'), 900));
    }
    if (stage === 'locked') {
      timers.push(window.setTimeout(() => setStage('statement'), 1000));
    }

    return () => timers.forEach(clearTimeout);
  }, [stage]);

  useEffect(() => {
    const isLocked = stage === 'locked' || stage === 'statement';
    if (!isLocked) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [stage]);

  const showLine1 = stage !== 'idle';
  const showLine2 = stage === 'line2' || stage === 'locked' || stage === 'statement' || stage === 'done';
  const showStatement = stage === 'statement' || stage === 'done';

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] w-full min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="space-y-3 mb-16">
        <p
          className={`text-lg md:text-xl text-white transition-opacity duration-700 ${
            showLine1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          5,000 robots. All inside the factory.
        </p>
        <p
          className={`text-lg md:text-xl text-white transition-opacity duration-700 ${
            showLine2 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          The city outside: empty.
        </p>
      </div>

      <div className={`transition-opacity duration-700 ${showStatement ? 'opacity-100' : 'opacity-0'}`}>
        {showStatement && <TypedStatement onDone={() => setStage('done')} />}
      </div>
    </section>
  );
}
