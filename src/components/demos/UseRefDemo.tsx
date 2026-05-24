import { useRef, useState } from "react";
import { Button } from "../common/Button";

export function UseRefDemo() {
  const [renders, setRenders] = useState(0);
  const countRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [stateCount, setStateCount] = useState(0);

  return (
    <div className="grid w-full max-w-[540px] gap-3.5">
      <div className="grid grid-cols-2 gap-3">
        <Tile
          label="useRef counter"
          hint="no re-render"
          value={countRef.current}
          accent
          onIncrement={() => {
            countRef.current += 1;
          }}
        />
        <Tile
          label="useState counter"
          hint={`renders: ${renders}`}
          value={stateCount}
          onIncrement={() => {
            setStateCount((c) => c + 1);
            setRenders((r) => r + 1);
          }}
        />
      </div>
      <div className="border border-border-strong bg-[#0a0a0a] rounded-lg flex p-3.5 gap-2.5 items-center">
        <input
          ref={inputRef}
          className="flex-1"
          placeholder="click 'focus' →"
        />
        <Button
          variant="ghost"
          onClick={() => inputRef.current && inputRef.current.focus()}
        >
          focus
        </Button>
      </div>
      <p className="text-fg-faint text-xs m-0">
        Top-left increments silently — only a state change repaints the screen.
        Click "focus" to see a ref grabbing the DOM node directly.
      </p>
    </div>
  );
}

function Tile({
  label,
  hint,
  value,
  onIncrement,
  accent,
}: {
  label: string;
  hint: string;
  value: number;
  onIncrement: () => void;
  accent?: boolean;
}) {
  return (
    <div className="border border-border-strong bg-[#0a0a0a] rounded-lg flex flex-col gap-2 p-3.5 min-h-[150px] justify-between">
      <div className="flex justify-between text-[11px] text-fg-faint tracking-widest uppercase">
        <span>{label}</span>
        <span className={accent ? "text-accent" : "text-fg-faint"}>{hint}</span>
      </div>
      <div className={`text-3xl ${accent ? "text-accent" : "text-fg"}`}>
        {value}
      </div>
      <Button variant="ghost" onClick={onIncrement}>
        +1
      </Button>
    </div>
  );
}
