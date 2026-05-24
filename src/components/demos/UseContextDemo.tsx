import { createContext, useContext, useState } from "react";
import { Button } from "../common/Button";

type ThemeKey = keyof typeof themes;

const ThemeContext = createContext<ThemeKey>("warm");

const themes = {
  warm: {
    bg: "#1d160d",
    fg: "#f5ead6",
    accent: "oklch(0.78 0.13 60)",
    label: "Warm",
  },
  cool: {
    bg: "#0e1518",
    fg: "#e0eef2",
    accent: "oklch(0.78 0.10 200)",
    label: "Cool",
  },
  pulp: {
    bg: "#1a0a18",
    fg: "#f5dff0",
    accent: "oklch(0.78 0.16 320)",
    label: "Pulp",
  },
};

function ThemedCard() {
  const themeKey = useContext(ThemeContext);
  const t = themes[themeKey];
  return (
    <div
      className="rounded-lg py-4 px-4.5 text-xs flex flex-col gap-2.5 min-w-[200px]"
      style={{
        background: t.bg,
        color: t.fg,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex justify-between text-[11px] opacity-55 tracking-widest uppercase">
        <span>themed card</span>
        <span>{t.label}</span>
      </div>
      <div className={`h-1.5 rounded-full`} style={{ background: t.accent }} />
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const themeKey = useContext(ThemeContext);
  const t = themes[themeKey];
  return (
    <button
      style={{
        background: t.accent,
        color: t.bg,
        border: "none",
        borderRadius: 6,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "var(--font-sans)",
        cursor: "pointer",
      }}
    >
      action ↗
    </button>
  );
}

export function UseContextDemo() {
  const [theme, setTheme] = useState<ThemeKey>("warm");
  return (
    <ThemeContext value={theme}>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-1.5">
          {(Object.keys(themes) as ThemeKey[]).map((k) => (
            <Button
              key={k}
              variant={k === theme ? "accent" : "ghost"}
              onClick={() => setTheme(k)}
            >
              {themes[k].label.toLowerCase()}
            </Button>
          ))}
        </div>
        <div className="flex gap-3.5 flex-wrap justify-center">
          <ThemedCard />
          <ThemedCard />
          <ThemedCard />
        </div>
        <p className="text-xs m-0 text-faint">
          Three cards, zero prop drilling. Each subscribes to the same context.
        </p>
      </div>
    </ThemeContext>
  );
}
