export function RadarRing({
  size = 320,
  color = 'green',
  className = '',
}: {
  size?: number;
  color?: 'green' | 'cyan';
  className?: string;
}) {
  const c = color === 'cyan' ? 'border-sci-cyan' : 'border-sci-green';

  return (
    <div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className={`absolute inset-0 rounded-full border border-dashed ${c}/25 animate-radar-spin`} />
      <div className={`absolute inset-[14%] rounded-full border border-dashed ${c}/15 animate-radar-spin-reverse`} />
      <div className={`absolute inset-[38%] rounded-full border ${c}/20`} />
      <div className={`absolute left-1/2 top-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${color === 'cyan' ? 'bg-sci-cyan' : 'bg-sci-green'}`} />
    </div>
  );
}
