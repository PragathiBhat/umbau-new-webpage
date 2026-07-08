import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function VisionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0.2]);

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
    >
      <motion.h3
        style={{ scale, opacity }}
        className="font-orbitron text-4xl md:text-6xl font-bold uppercase text-sci-green tracking-tight mb-10 text-glow-green"
      >
        The vision
      </motion.h3>
      <motion.h2
        style={{ scale, opacity }}
        className="text-2xl md:text-4xl font-bold tracking-tight text-white max-w-3xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
      >
        Repurpose factory robots as urban creators.
      </motion.h2>
    </section>
  );
}
