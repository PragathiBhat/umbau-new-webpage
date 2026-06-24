import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const LOOP_FADE_SECONDS = 0.4;

export function VisionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'center center'] });

  const scale = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.25;

    function handleTimeUpdate(this: HTMLVideoElement) {
      if (!this.duration || !isFinite(this.duration)) return;
      const timeFromEnd = this.duration - this.currentTime;
      const fade =
        timeFromEnd < LOOP_FADE_SECONDS
          ? timeFromEnd / LOOP_FADE_SECONDS
          : Math.min(1, this.currentTime / LOOP_FADE_SECONDS);
      this.style.opacity = String(0.5 * Math.max(0, Math.min(1, fade)));
    }

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${import.meta.env.BASE_URL}assets/robots-bg.mp4`} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0a0a0a]/35" />
      <div className="absolute inset-x-0 top-0 h-40 sm:h-56 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 sm:h-56 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      <motion.h3
        style={{ scale, opacity }}
        className="text-4xl md:text-6xl font-semibold uppercase text-orange-500 tracking-tight mb-10"
      >
        The vision
      </motion.h3>
      <motion.h2
        style={{ scale, opacity }}
        className="text-2xl md:text-4xl font-semibold tracking-tight text-white max-w-3xl mx-auto"
      >
        Repurpose factory robots as urban creators.
      </motion.h2>
    </section>
  );
}
