export function HudCorners({ color = 'green', size = 3 }: { color?: 'green' | 'cyan'; size?: number }) {
  const c = color === 'cyan' ? 'border-sci-cyan/70' : 'border-sci-green/70';
  const s = `${size * 4}px`;

  return (
    <>
      <span
        className={`pointer-events-none absolute -top-px -left-px border-t-2 border-l-2 ${c}`}
        style={{ width: s, height: s }}
        aria-hidden="true"
      />
      <span
        className={`pointer-events-none absolute -top-px -right-px border-t-2 border-r-2 ${c}`}
        style={{ width: s, height: s }}
        aria-hidden="true"
      />
      <span
        className={`pointer-events-none absolute -bottom-px -left-px border-b-2 border-l-2 ${c}`}
        style={{ width: s, height: s }}
        aria-hidden="true"
      />
      <span
        className={`pointer-events-none absolute -bottom-px -right-px border-b-2 border-r-2 ${c}`}
        style={{ width: s, height: s }}
        aria-hidden="true"
      />
    </>
  );
}
