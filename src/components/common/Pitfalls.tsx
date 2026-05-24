export const Pitfalls = ({ cautions }: { cautions: string[] }) => {
  return (
    <div className="border border-border-strong border-l border-l-accent bg-elev rounded-lg py-4 px-4.5 mt-3 flex gap-3.5">
      <span className="text-[11px] text-accent tracking-[0.16em] shrink-0 pt-1">
        ⚠ AVOID
      </span>
      <div className="flex flex-col gap-1">
        {cautions.map((caution, index) => (
          <p className="text-fg-dim text-[13px]" key={index}>
            {caution}
          </p>
        ))}
      </div>
    </div>
  );
};
