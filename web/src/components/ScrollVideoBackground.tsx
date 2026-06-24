import { useEffect, useRef } from 'react';

const VIDEO_URL = '/assets/scanning-wolfsburg.mp4';

export function ScrollVideoBackground({ fadeZoneId }: { fadeZoneId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const framesReadyRef = useRef(false);
  const lastFrameIndexRef = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const video = videoRef.current!;
    const container = containerRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    let videoSeeking = false;
    let cancelled = false;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      lastFrameIndexRef.current = -1;
    }

    function getProgress() {
      const zone = document.getElementById(fadeZoneId);
      if (!zone) return { scrub: 0, fade: 1 };
      const rect = zone.getBoundingClientRect();
      const zoneTop = rect.top + window.scrollY;
      const zoneHeight = rect.height;
      const vh = window.innerHeight;
      const scrub = Math.max(0, Math.min(1, (window.scrollY - zoneTop) / Math.max(1, zoneHeight - vh)));
      const fadeStart = zoneTop + zoneHeight - vh * 0.6;
      const fadeEnd = zoneTop + zoneHeight;
      const fade = 1 - Math.max(0, Math.min(1, (window.scrollY - fadeStart) / Math.max(1, fadeEnd - fadeStart)));
      return { scrub, fade };
    }

    function drawFrame(frame: ImageBitmap | HTMLVideoElement, fw: number, fh: number) {
      const cw = canvas.width, ch = canvas.height;
      const s = Math.max(cw / fw, ch / fh);
      const dw = fw * s, dh = fh * s;
      ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }

    function tick() {
      const { scrub, fade } = getProgress();
      container.style.opacity = String(fade);

      const frames = framesRef.current;
      if (framesReadyRef.current && frames.length > 0) {
        const idx = Math.round(scrub * (frames.length - 1));
        if (idx !== lastFrameIndexRef.current) {
          lastFrameIndexRef.current = idx;
          const f = frames[idx];
          if (f) drawFrame(f, f.width, f.height);
        }
      } else if (video.duration && isFinite(video.duration) && video.readyState >= 1) {
        const target = scrub * video.duration;
        if (!videoSeeking && Math.abs(video.currentTime - target) > 0.05) {
          videoSeeking = true;
          video.currentTime = target;
        }
      }
      raf = requestAnimationFrame(tick);
    }

    async function extractFrames() {
      try {
        const response = await fetch(VIDEO_URL);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const probe = document.createElement('video');
        probe.muted = true;
        probe.playsInline = true;
        probe.preload = 'auto';
        probe.src = objectUrl;

        await new Promise<void>((resolve, reject) => {
          probe.onloadedmetadata = () => resolve();
          probe.onerror = () => reject();
          setTimeout(() => reject(), 15000);
        });

        const scale = Math.min(1, 960 / probe.videoWidth);
        const w = Math.round(probe.videoWidth * scale);
        const h = Math.round(probe.videoHeight * scale);
        const frameCount = Math.max(24, Math.min(80, Math.round(probe.duration * 12)));
        const bitmaps: ImageBitmap[] = [];

        for (let i = 0; i < frameCount; i++) {
          if (cancelled) break;
          const time = (i / (frameCount - 1)) * (probe.duration - 0.05);
          probe.currentTime = time;
          await new Promise<void>((resolve, reject) => {
            const onSeeked = () => {
              probe.removeEventListener('seeked', onSeeked);
              resolve();
            };
            probe.addEventListener('seeked', onSeeked);
            setTimeout(() => {
              probe.removeEventListener('seeked', onSeeked);
              reject();
            }, 3000);
          }).catch(() => {});
          const bitmap = await createImageBitmap(probe, { resizeWidth: w, resizeHeight: h });
          bitmaps.push(bitmap);
        }

        if (!cancelled && bitmaps.length > 0) {
          framesRef.current = bitmaps;
          framesReadyRef.current = true;
        }
        URL.revokeObjectURL(objectUrl);
      } catch {
        // falls back to direct video seeking in tick()
      }
    }

    video.addEventListener('seeked', () => {
      videoSeeking = false;
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    raf = requestAnimationFrame(tick);
    extractFrames();

    return () => {
      cancelled = true;
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(raf);
    };
  }, [fadeZoneId]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 bg-[#0a0a0a]" style={{ opacity: 1 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-[0.45]" />
      <video ref={videoRef} muted playsInline preload="auto" className="hidden">
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
    </div>
  );
}
