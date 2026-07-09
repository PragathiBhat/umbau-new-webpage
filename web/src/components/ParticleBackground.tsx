import { useEffect, useRef } from 'react';
import { subscribeToScenarioActivity } from '../lib/robonexusSync';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  cyan: boolean;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstRef = useRef(0);

  useEffect(() => {
    return subscribeToScenarioActivity(() => {
      burstRef.current = 1;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let particles: Particle[] = [];
    let raf = 0;

    function createParticles() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 16000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          size: Math.random() * 2.2 + 0.8,
          opacity: Math.random() * 0.4 + 0.15,
          cyan: Math.random() < 0.25,
        });
      }
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }

    function animate() {
      const burst = burstRef.current;
      const speedBoost = 1 + burst * 3;
      const sizeBoost = 1 + burst * 0.9;
      const opacityBoost = 1 + burst * 2.2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx * speedBoost;
        p.y += p.vy * speedBoost;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * sizeBoost, 0, Math.PI * 2);
        const opacity = Math.min(1, p.opacity * opacityBoost);
        ctx.fillStyle = p.cyan ? `rgba(43,227,255,${opacity})` : `rgba(46,255,77,${opacity})`;
        ctx.fill();
      }

      // Decays back to 0 over roughly a second and a half.
      burstRef.current *= 0.965;
      if (burstRef.current < 0.01) burstRef.current = 0;

      raf = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[3]"
    />
  );
}
