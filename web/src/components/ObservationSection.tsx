import { useRef, useState } from 'react';
import { Reveal } from './Reveal';

const LOCATIONS = [
  'Marktplatz', 'Rathaus Wolfsburg', 'Stadtbibliothek', 'Alvar Aalto Kulturhaus',
  'Porschestrasse', 'VW Werk Nord', 'Schloss Wolfsburg', 'Allersee',
  'Autostadt', 'Hauptbahnhof', 'Planetarium', 'Theater Wolfsburg',
];
const COLS = 4, ROWS = 3;

export function ObservationSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tag, setTag] = useState<{ x: number; y: number; name: string } | null>(null);
  const lastCellRef = useRef(-1);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = wrapRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.min(COLS - 1, Math.max(0, Math.floor((x / rect.width) * COLS)));
    const row = Math.min(ROWS - 1, Math.max(0, Math.floor((y / rect.height) * ROWS)));
    const cellIdx = row * COLS + col;
    if (cellIdx !== lastCellRef.current) {
      lastCellRef.current = cellIdx;
    }
    setTag({ x: e.clientX - rect.left, y: e.clientY - rect.top, name: LOCATIONS[cellIdx % LOCATIONS.length] });
  }

  return (
    <section id="observation" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs tracking-[2px] text-neutral-400 uppercase mb-3">02 — Scanning the city</p>
      </Reveal>

      <div
        ref={wrapRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTag(null)}
        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0a0a0a] cursor-none"
      >
        <video autoPlay muted loop playsInline preload="none" className="w-full h-full object-cover grayscale contrast-125 brightness-75">
          <source src="/assets/scanning-wolfsburg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {tag && (
          <>
            <div
              className="absolute w-10 h-10 rounded-full border border-white/70 pointer-events-none"
              style={{ left: tag.x - 20, top: tag.y - 20 }}
            />
            <div
              className="absolute font-mono text-[11px] tracking-[1.5px] text-white bg-black/70 border border-white/30 rounded px-2 py-1 pointer-events-none whitespace-nowrap"
              style={{ left: tag.x + 24, top: tag.y - 10 }}
            >
              ◈ {tag.name}
            </div>
          </>
        )}

        <p className="absolute bottom-6 left-6 right-6 text-white text-lg md:text-2xl font-medium">
          The most productive city in Germany.
          <br />
          The emptiest plaza in Wolfsburg.
        </p>
      </div>
    </section>
  );
}
