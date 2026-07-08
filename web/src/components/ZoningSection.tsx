import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

const TEAL = '#09D8C7';
const GREEN = '#09BD27';

// Grid's actual rail-border extent within the plan image, as percentages (measured from the SVG's own coordinates).
const GRID_LEFT = 1.4;
const GRID_RIGHT = 98.6;
const GRID_TOP = 3.6;
const GRID_BOTTOM = 89.0;

// How far the dimension line sits outside the grid, and how far the extension lines poke past it.
const DIM_OFFSET = 22;
const DIM_EXT = 7;
const DIM_REACH = DIM_OFFSET + DIM_EXT;

const LEGEND_ITEMS = [
  {
    label: 'Market stalls',
    color: TEAL,
    swatchStyle: { background: 'rgba(9, 216, 199, 0.22)', border: `1px solid ${TEAL}` },
  },
  {
    label: 'Event space',
    color: TEAL,
    swatchStyle: {
      background:
        'repeating-linear-gradient(45deg, rgba(9,216,199,0.7) 0, rgba(9,216,199,0.7) 1px, transparent 1px, transparent 4px)',
      border: `1px solid ${TEAL}`,
    },
  },
  {
    label: 'Gantry system',
    color: GREEN,
    swatchStyle: { background: 'transparent', border: `2px solid ${GREEN}` },
  },
  {
    label: 'Storage',
    color: TEAL,
    swatchStyle: { background: 'transparent', border: `2px solid ${TEAL}` },
  },
  {
    label: 'Maze',
    color: TEAL,
    swatchStyle: {
      background: `linear-gradient(to bottom,
        transparent 0%, transparent 30%,
        ${TEAL} 30%, ${TEAL} 45%,
        transparent 45%, transparent 55%,
        ${TEAL} 55%, ${TEAL} 70%,
        transparent 70%, transparent 100%)`,
      border: 'none',
    },
  },
];

export function ZoningSection() {
  return (
    <section id="zoning" className="relative z-[2] w-full max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <SectionLabel>05 — Site zoning and movement logic</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-12 max-w-2xl">
          A grid designed for transformation.
        </h2>
      </Reveal>

      <Reveal>
        <div
          className="relative -mx-6 sm:-mx-10 lg:-mx-24 border-y border-sci-green/15 bg-black"
          style={{ paddingTop: DIM_REACH + 12, paddingLeft: DIM_REACH + 12 }}
        >
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}assets/robonexus-plan.svg`}
              alt="Full-length Robonexus grid plan showing playground, event and market scenarios with robots along the plaza"
              className="w-full block"
            />

            {/* width dimension: 84m — extension lines rise from the grid's top corners, dimension line sits above */}
            <div
              className="absolute w-px bg-white/80 pointer-events-none"
              style={{ left: `${GRID_LEFT}%`, top: `calc(${GRID_TOP}% - ${DIM_REACH}px)`, height: DIM_REACH }}
              aria-hidden="true"
            />
            <div
              className="absolute w-px bg-white/80 pointer-events-none"
              style={{ left: `${GRID_RIGHT}%`, top: `calc(${GRID_TOP}% - ${DIM_REACH}px)`, height: DIM_REACH }}
              aria-hidden="true"
            />
            <div
              className="absolute h-px bg-white/80 pointer-events-none"
              style={{
                left: `${GRID_LEFT}%`,
                right: `${100 - GRID_RIGHT}%`,
                top: `calc(${GRID_TOP}% - ${DIM_OFFSET}px)`,
              }}
              aria-hidden="true"
            />
            <span
              className="absolute font-mono text-[10px] sm:text-xs text-white bg-black px-1.5 tracking-wide pointer-events-none"
              style={{
                left: `${(GRID_LEFT + GRID_RIGHT) / 2}%`,
                top: `calc(${GRID_TOP}% - ${DIM_OFFSET}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              84 M
            </span>

            {/* depth dimension: 28m — extension lines reach left from the grid's left corners, dimension line sits to the left */}
            <div
              className="absolute h-px bg-white/80 pointer-events-none"
              style={{ top: `${GRID_TOP}%`, left: `calc(${GRID_LEFT}% - ${DIM_REACH}px)`, width: DIM_REACH }}
              aria-hidden="true"
            />
            <div
              className="absolute h-px bg-white/80 pointer-events-none"
              style={{ top: `${GRID_BOTTOM}%`, left: `calc(${GRID_LEFT}% - ${DIM_REACH}px)`, width: DIM_REACH }}
              aria-hidden="true"
            />
            <div
              className="absolute w-px bg-white/80 pointer-events-none"
              style={{
                top: `${GRID_TOP}%`,
                bottom: `${100 - GRID_BOTTOM}%`,
                left: `calc(${GRID_LEFT}% - ${DIM_OFFSET}px)`,
              }}
              aria-hidden="true"
            />
            <span
              className="absolute font-mono text-[10px] sm:text-xs text-white bg-black px-1.5 tracking-wide whitespace-nowrap pointer-events-none"
              style={{
                top: `${(GRID_TOP + GRID_BOTTOM) / 2}%`,
                left: `calc(${GRID_LEFT}% - ${DIM_OFFSET}px)`,
                transform: 'translate(-50%, -50%) rotate(-90deg)',
              }}
            >
              28 M
            </span>

            <div className="absolute right-3 bottom-3 sm:right-6 sm:bottom-4 flex flex-wrap justify-end gap-x-3 gap-y-1.5 pointer-events-none">
              {LEGEND_ITEMS.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[11px] uppercase tracking-wide"
                  style={{ color: item.color }}
                >
                  <span className="inline-block w-3 h-3 sm:w-3.5 sm:h-3.5 flex-none" style={item.swatchStyle} />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
