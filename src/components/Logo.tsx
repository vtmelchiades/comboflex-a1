export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-500 text-white shadow-sm">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 17h5l3-10h8" />
          <circle cx="4" cy="17" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="20" cy="7" r="1.5" fill="currentColor" stroke="none" />
          <path d="M9 17l3 3" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block text-lg font-black tracking-tight ${light ? "text-white" : "text-steel-900"}`}>
          COMBO<span className="text-brand-500">FLEX</span>
        </span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.22em] ${light ? "text-steel-300" : "text-steel-500"}`}>
          Metalúrgica
        </span>
      </span>
    </span>
  );
}
