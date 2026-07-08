export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
      <div className="flex flex-col gap-1 select-none">
        <div className="flex flex-row gap-2.5 items-center">
          <span className="w-2 h-2 bg-sci-green shadow-[0_0_8px_#3dffa0] animate-pulse" aria-hidden="true" />
          <span className="font-orbitron text-[19px] sm:text-[23px] tracking-[2px] text-white font-bold">
            UMBAU
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[3px] text-sci-green/70 uppercase pl-[18px]">
          Sys // Wolfsburg
        </span>
      </div>
    </header>
  );
}
