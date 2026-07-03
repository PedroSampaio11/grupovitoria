export function TopBar() {
  return (
    <div className="fixed top-0 inset-x-0 z-[110] h-9 md:h-10 bg-slate-950 border-b border-[#EC223D]/30">
      <div className="h-full w-full flex items-center justify-center px-4">
        <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.12em] md:tracking-[0.15em] text-white text-center">
          Precisamos te entender, para te atender.
        </p>
      </div>
    </div>
  );
}
