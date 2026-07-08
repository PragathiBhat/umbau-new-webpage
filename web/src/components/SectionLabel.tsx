import type { ReactNode } from 'react';

export function SectionLabel({
  children,
  color = 'green',
  className = '',
}: {
  children: ReactNode;
  color?: 'green' | 'cyan';
  className?: string;
}) {
  const dot = color === 'cyan' ? 'bg-sci-cyan shadow-[0_0_6px_#2be3ff]' : 'bg-sci-green shadow-[0_0_6px_#2eff4d]';
  const text = color === 'cyan' ? 'text-sci-cyan/90' : 'text-sci-green/90';

  return (
    <p className={`font-mono text-xs tracking-[3px] uppercase mb-3 flex items-center gap-2.5 ${text} ${className}`}>
      <span className={`inline-block w-1.5 h-1.5 ${dot}`} aria-hidden="true" />
      {children}
    </p>
  );
}
