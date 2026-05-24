import { Link } from "react-router";

export function HookCard({ hook, idx }: { hook: any; idx: number }) {
  return (
    <Link
      to={hook.path}
      className="border border-border-strong rounded-lg bg-elev p-5 flex flex-col gap-3 min-h-[168px] relative overflow-hidden hcard"
    >
      <div className="flex justify-between items-start">
        <span className="text-xs text-accent tracking-widest">
          {String(idx).padStart(2, "0")}
        </span>
      </div>
      <span className="absolute top-[18px] right-[18px] text-fg-faint hcard__arrow">
        ↗
      </span>
      <div className="text-base font-medium -tracking-wider text-fg">
        {hook.title}
      </div>
      <div className="text-[13px] text-fg-dim mt-auto">{hook.tagline}</div>
    </Link>
  );
}
