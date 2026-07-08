import { useEffect, useRef, useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { Reveal } from './Reveal';

const FLOATING_MARKS = [
  { top: '15%', left: '8%', size: 'text-4xl', delay: '0s', duration: '6s' },
  { top: '60%', left: '15%', size: 'text-3xl', delay: '0.8s', duration: '7s' },
  { top: '20%', left: '88%', size: 'text-4xl', delay: '1.4s', duration: '5.5s' },
  { top: '65%', left: '85%', size: 'text-5xl', delay: '0.4s', duration: '6.5s' },
  { top: '10%', left: '50%', size: 'text-2xl', delay: '2s', duration: '7.5s' },
];

const SIDES = [
  {
    key: 'autostadt',
    label: 'Autostadt',
    tagline: 'Engineered for change.',
    video: 'robot-video.mp4',
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
        <p className="font-mono text-xs tracking-[2px] text-sci-green uppercase mb-1">{label}</p>
        <p className="text-white text-base sm:text-lg font-medium">{tagline}</p>
      </div>
    </div>
  );
}

export function InnovationContrastSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const autostadtRef = useRef<HTMLVideoElement>(null);
  const marktplatzRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;

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

  return (
    <section ref={sectionRef} className="relative z-[2] w-full min-h-screen flex flex-col">
      <div className="px-6 pt-24 pb-6 max-w-4xl mx-auto text-center">
        <SectionLabel className="justify-center">// Innovation, contained</SectionLabel>
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
          One city. Contrasting environments.
        </h2>
      </div>

      <div className="relative flex-1 grid md:grid-cols-2 min-h-0">
        {SIDES.map((side) => (
          <VideoPanel
            key={side.key}
            video={side.video}
            label={side.label}
            tagline={side.tagline}
            videoRef={side.key === 'autostadt' ? autostadtRef : marktplatzRef}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center justify-center px-6 py-8 sm:py-10 overflow-hidden">
        {FLOATING_MARKS.map((mark, i) => (
          <span
            key={i}
            className={`absolute font-bold font-orbitron text-sci-green/30 animate-float-mark pointer-events-none ${mark.size}`}
            style={{ top: mark.top, left: mark.left, animationDelay: mark.delay, animationDuration: mark.duration }}
            aria-hidden="true"
          >
            ?
          </span>
        ))}
        <Reveal className="relative w-full">
          <p className="font-orbitron text-[clamp(1.1rem,4.5vw,2.5rem)] font-semibold uppercase tracking-tight text-sci-green text-glow-green text-center whitespace-nowrap">
            Why does innovation stop here?
          </p>
        </Reveal>
      </div>
    </section>
  );
}
