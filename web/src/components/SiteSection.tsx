import { useEffect, useRef } from 'react';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { HudCorners } from './HudCorners';

const LOOP_FADE_SECONDS = 0.5;
const FAST_START_SECONDS = 3;
const FAST_RATE = 1.4;
const SLOW_RATE = 0.35;

const REASONS = [
  {
    num: '01',
    title: 'It is already struggling and the city knows it',
    body: 'Empty pavements, low footfall, and declining retail have left the city struggling.',
  },
  {
    num: '02',
    title: 'Already car-free, more freedom',
    body: 'No traffic or barriers. The fully pedestrianized plaza allows uninterrupted robot access and makes the space easier to reprogram.',
  },
  {
    num: '03',
    title: 'The symbolic spine of the city',
    body: 'City hall, civic buildings, and the main shopping axis are all here. If robots reshape Wolfsburg, this is where the change will be most visible.',
  },
  {
    num: '04',
    title: 'It connects factory to city',
    body: "The street links the station to the VW factory, making the factory's presence visible in the city instead of hidden behind fences.",
  },
];

export function SiteSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = FAST_RATE;

    const handleTimeUpdate = () => {
      if (!video.duration || !isFinite(video.duration)) return;

      const desiredRate = video.currentTime < FAST_START_SECONDS ? FAST_RATE : SLOW_RATE;
      if (video.playbackRate !== desiredRate) video.playbackRate = desiredRate;

      const timeFromEnd = video.duration - video.currentTime;
      const fade =
        timeFromEnd < LOOP_FADE_SECONDS
          ? timeFromEnd / LOOP_FADE_SECONDS
          : Math.min(1, video.currentTime / LOOP_FADE_SECONDS);
      video.style.opacity = String(Math.max(0, Math.min(1, fade)));
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <section id="the-site" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <SectionLabel>04 — Target location acquired</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-12 max-w-2xl">
          Marktplatz, Porschestrasse.
        </h2>
      </Reveal>

      <div className="flex flex-col items-center mb-16">
        <Reveal className="w-full max-w-4xl">
          <div className="relative overflow-hidden border border-sci-green/20 bg-[#0a0a0a] aspect-video">
            <HudCorners />
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={`${import.meta.env.BASE_URL}assets/site-zoom.mp4`} type="video/mp4" />
            </video>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 text-center">
          <div className="font-mono text-sm text-neutral-400 leading-7">
            <p className="text-sci-green mb-2 tracking-wide">Marktplatz · Porschestrasse · Wolfsburg</p>
            <p>Lat: <span className="text-white">52.4227° N</span> / Lng: <span className="text-white">10.7865° E</span></p>
            <p>Footprint: <span className="text-white">84 × 28m</span> / Area: <span className="text-white">2,353m²</span></p>
          </div>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {REASONS.map((r, i) => (
          <Reveal key={r.num} delay={i * 0.08}>
            <div className="relative border border-sci-green/15 p-6 h-full bg-white/5 hover:border-sci-green/40 transition-colors">
              <HudCorners size={2.5} />
              <div className="font-mono text-xs text-sci-green/70 mb-2">[{r.num}]</div>
              <h3 className="text-base font-semibold text-white mb-2">{r.title}</h3>
              <p className="text-sm text-neutral-400 leading-6">{r.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
