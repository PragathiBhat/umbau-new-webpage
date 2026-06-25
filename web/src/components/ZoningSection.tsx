import { useRef, useState } from 'react';
import { Reveal } from './Reveal';

const ZOOM_FOCAL_POINT = { x: 72, y: 40 };
const ZOOM_SCALE = 2.2;

export function ZoningSection() {
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);

  function clampPan(x: number, y: number) {
    const frame = frameRef.current;
    if (!frame) return { x, y };
    const maxX = (frame.clientWidth * (ZOOM_SCALE - 1)) / 2;
    const maxY = (frame.clientHeight * (ZOOM_SCALE - 1)) / 2;
    return { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
  }

  function applyTransform(x: number, y: number) {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = `scale(${ZOOM_SCALE}) translate(${x / ZOOM_SCALE}px, ${y / ZOOM_SCALE}px)`;
  }

  function handlePointerDown(e: React.PointerEvent<HTMLImageElement>) {
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLImageElement>) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const next = clampPan(dragRef.current.panX + dx, dragRef.current.panY + dy);
    applyTransform(next.x, next.y);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLImageElement>) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan(clampPan(dragRef.current.panX + dx, dragRef.current.panY + dy));
    dragRef.current = null;
  }

  function openZoom() {
    setPan({ x: 0, y: 0 });
    setZoomed(true);
  }

  return (
    <section id="zoning" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-3">05 — Site zoning and movement logic</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-12 max-w-2xl">
          Eight by eight. Every robot knows its lane.
        </h2>
      </Reveal>

      <Reveal>
        <div className="mb-4 -mx-6 sm:-mx-10 lg:-mx-24 overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}assets/cad-zoning-plan.jpg`}
            alt="CAD site zoning plan showing playground, event and market zones along Porschestrasse"
            onDoubleClick={openZoom}
            className="w-full block cursor-zoom-in"
            style={{
              maskImage: 'radial-gradient(ellipse closest-side at center, black 35%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse closest-side at center, black 35%, transparent 100%)',
            }}
          />
        </div>
        <p className="font-mono text-[11px] tracking-[1.5px] text-neutral-500 uppercase text-center mb-16">
          Double-click to zoom into the build site
        </p>
      </Reveal>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          onDoubleClick={() => setZoomed(false)}
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute top-6 right-6 font-mono text-xs tracking-[1.5px] text-white uppercase border border-white/30 rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
          >
            ✕ Close
          </button>
          <div ref={frameRef} className="w-[90vw] h-[90vh] overflow-hidden rounded-2xl border border-white/10">
            <img
              ref={imgRef}
              src={`${import.meta.env.BASE_URL}assets/cad-zoning-plan.jpg`}
              alt="Zoomed view of the build site within the CAD zoning plan"
              className="w-full h-full object-cover cursor-grab active:cursor-grabbing touch-none select-none will-change-transform"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                transform: `scale(${ZOOM_SCALE}) translate(${pan.x / ZOOM_SCALE}px, ${pan.y / ZOOM_SCALE}px)`,
                transformOrigin: `${ZOOM_FOCAL_POINT.x}% ${ZOOM_FOCAL_POINT.y}%`,
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
