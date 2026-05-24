import { useEffect, useReducer, useState } from "react";

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const FAKE_INDEX = [
  "useEffect",
  "useState",
  "useReducer",
  "useMemo",
  "useCallback",
  "useRef",
  "useContext",
  "useLayoutEffect",
  "useImperativeHandle",
  "useId",
  "useSyncExternalStore",
  "useDeferredValue",
  "useTransition",
  "useOptimistic",
  "useActionState",
  "useFormStatus",
  "use",
];

export function CustomHooksDemo() {
  const [query, setQuery] = useState("");
  const [delay, setDelay] = useState(400);
  const debounced = useDebounce(query, delay);
  const [searches, setSearches] = useReducer((p) => p + 1, 0);

  useEffect(() => {
    if (debounced.trim() === "") return;
    setSearches();
  }, [debounced]);

  const results = debounced
    ? FAKE_INDEX.filter((h) =>
        h.toLowerCase().includes(debounced.toLowerCase()),
      )
    : [];

  return (
    <div className="w-full grid max-w-[540px] gap-3.5">
      <input
        className="input"
        placeholder="search the hook catalogue…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex items-center gap-2.5">
        <span className="text-faint text-[11px] tracking-widest uppercase">
          delay
        </span>
        <input
          type="range"
          min="0"
          max="1200"
          step="50"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="flex-1 accent-accent"
        />
        <span className="text-xs text-fg w-[56px]">{delay}ms</span>
      </div>
      <div className="bg-[#0a0a0a] border border-border-strong rounded-lg p-3.5 min-h-[130px] text-xs">
        <div className="flex justify-between mb-2.5 text-[11px] text-fg-faint tracking-widest uppercase">
          <span>api calls fired</span>
          <span>{searches}</span>
        </div>
        {results.length === 0 && (
          <div className="text-fg-faint">
            {query ? "waiting for debounce…" : "type to search"}
          </div>
        )}
        {results.map((r) => (
          <div key={r} className="py-0.5 text-fg">
            <span className="text-accent">→</span> {r}
          </div>
        ))}
      </div>
      <p className="m-0 text-fg-dim text-[11px]">
        Keystrokes are noisy.{" "}
        <code className="bg-elev border border-border py-0 px-1 rounded-sm">
          useDebounce
        </code>{" "}
        coalesces them — only the last value after the delay triggers a
        "search".
      </p>
    </div>
  );
}
