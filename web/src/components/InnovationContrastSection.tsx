import { useEffect, useRef, useState } from 'react';

type Stage = 'idle' | 'playing' | 'fading' | 'statement';

const FLOATING_MARKS = [
  { top: '15%', left: '10%', size: 'text-6xl', delay: '0s', duration: '6s' },
  { top: '70%', left: '18%', size: 'text-4xl', delay: '0.8s', duration: '7s' },
  { top: '25%', left: '85%', size: 'text-5xl', delay: '1.4s', duration: '5.5s' },
  { top: '80%', left: '80%', size: 'text-7xl', delay: '0.4s', duration: '6.5s' },
  { top: '10%', left: '55%', size: 'text-3xl', delay: '2s', duration: '7.5s' },
  { top: '60%', left: '50%', size: 'text-5xl', delay: '1s', duration: '6s' },
];

const SIDES = [
  {
    key: 'autostadt',
    label: 'Autostadt',
    tagline: 'Engineered for change.',
    video: 'autostadt.mp4',
  },
  {
    key: 'marktplatz',
    label: 'Stadtmitte',
    tagline: 'Designed to stay the same.',
    video: 'marktplatz-comparison.mp4',
  },
];

function VideoPanel({
  video,
  label,
  tagline,
  videoRef,
}: {
  video: string;
  label: string;
  tagline: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a]">
      {!failed && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={`${import.meta.env.BASE_URL}assets/${video}`} type="video/mp4" />
        </video>
      )}
      {failed && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
          <p className="font-mono text-xs tracking-[2px] text-neutral-500 uppercase">Footage pending</p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      <div className="absolute bottom-6 left-6 right-6">
        <p className="font-mono text-xs tracking-[2px] text-orange-500 uppercase mb-1">{label}</p>
        <p className="text-white text-base sm:text-lg font-medium">{tagline}</p>
      </div>
    </div>
  );
}

export function InnovationContrastSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const autostadtRef = useRef<HTMLVideoElement>(null);
  const marktplatzRef = useRef<HTMLVideoElement>(null);
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
            setStage('playing');

            const videos = [autostadtRef.current, marktplatzRef.current].filter(
              (v): v is HTMLVideoElement => v !== null,
            );
            Promise.all(
              videos.map(
                (v) =>
                  new Promise<void>((resolve) => {
                    if (v.readyState >= 2) resolve();
                    else v.addEventListener('loadeddata', () => resolve(), { once: true });
                  }),
              ),
            ).then(() => {
              for (const v of videos) {
                v.currentTime = 0;
              }
              for (const v of videos) {
                v.play().catch(() => {});
              }
            });
          }
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (stage === 'idle') return;
    const timers: number[] = [];

    if (stage === 'playing') {
      timers.push(window.setTimeout(() => setStage('fading'), 9000));
    }
    if (stage === 'fading') {
      timers.push(window.setTimeout(() => setStage('statement'), 1500));
    }

    return () => timers.forEach(clearTimeout);
  }, [stage]);

  const showBlackout = stage === 'fading' || stage === 'statement';
  const showStatement = stage === 'statement';

  return (
    <section ref={sectionRef} className="relative z-[2] w-full min-h-screen flex flex-col">
      <div className="px-6 pt-24 pb-10 max-w-4xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-3">// Innovation, contained</p>
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
          One city. Contrasting environments.
        </h2>
      </div>

      <div className="relative flex-1 grid md:grid-cols-2 min-h-[70vh]">
        {SIDES.map((side) => (
          <VideoPanel
            key={side.key}
            video={side.video}
            label={side.label}
            tagline={side.tagline}
            videoRef={side.key === 'autostadt' ? autostadtRef : marktplatzRef}
          />
        ))}

        <div
          className={`absolute inset-0 bg-black transition-opacity duration-[1500ms] pointer-events-none ${
            showBlackout ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 transition-opacity duration-700 pointer-events-none ${
            showStatement ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {FLOATING_MARKS.map((mark, i) => (
            <span
              key={i}
              className={`absolute font-bold text-orange-500/70 animate-float-mark ${mark.size}`}
              style={{ top: mark.top, left: mark.left, animationDelay: mark.delay, animationDuration: mark.duration }}
            >
              ?
            </span>
          ))}
          <p className="relative text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white text-center max-w-2xl">
            Why does innovation stop here?
          </p>
        </div>
      </div>
    </section>
  );
}
