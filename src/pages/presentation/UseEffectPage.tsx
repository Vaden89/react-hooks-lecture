import { CodeBlock } from "../../components/CodeBlock";
import { ContentSection } from "../../components/common/ContentSection";
import { Pitfalls } from "../../components/common/Pitfalls";
import { Prose } from "../../components/common/Prose";
import { CodeSnippets } from "../../data/code";
import "../../styles/demo.css";
import { useEffect, useReducer, useRef, useState } from "react";

export default function UseEffectPage() {
  return (
    <div className="w-full grid h-dvh overflow-y-auto p-[80px_60px_120px] max-w-6xl page-anim">
      <div>
        <div className="text-xs tracking-widest uppercase text-accent">
          01 · Effect hook
        </div>
        <h1 className="font-medium -tracking-wide text-[44px] mb-4">
          The{" "}
          <code className="text-[0.85em] bg-elev border border-border-strong py-1 px-2.5 rounded-lg align-[0.1em]">
            useEffect
          </code>{" "}
          hook
        </h1>
        <p className="text-base text-fg-dim max-w-[64ch]  mb-2.5 text-pretty">
          Some work doesn't belong in render: opening a socket, syncing with the
          DOM, subscribing to an external store. <code>useEffect</code> is
          React's escape route for those side effects — it runs after commit,
          and tears itself down on the next pass.
        </p>
      </div>
      <ContentSection
        index="01.A"
        title="Live demo · Chat room"
        description="Switch rooms below. Watch how the cleanup function tears down the previous subscription before the new effect reconnects."
      >
        <div className="border border-border-strong rounded-lg bg-elev overflow-hidden grid grid-cols-1">
          <div className="flex items-center justify-between py-2.5 px-3.5 border-b border-border bg-[#131313] text-xs text-fg-dim demo__head">
            <div className="lights">
              <span />
              <span />
              <span />
            </div>
            <span>chat-room.jsx</span>
            <span className="chip">
              <span className="dot" />
              live
            </span>
          </div>
          <div className="p-7 min-h-[200px] flex items-center justify-center demo__body">
            <UseEffectDemo />
          </div>
        </div>
      </ContentSection>
      <ContentSection index="01.B" title="Anatomy">
        <CodeBlock
          filename="ChatRoom.jsx"
          code={CodeSnippets.find((s) => s.for === "useEffect")?.code ?? ""}
        />
        <Prose
          info={[
            {
              title: "Callback",
              content: "your effect's body. Runs after commit.",
            },
            {
              title: "Dependency array",
              content:
                "reactive values the effect reads. React re-runs when any of them changes.",
            },
            {
              title: "Cleanup",
              content:
                "the returned function. Runs before the next effect or on unmount. Tie up loose ends here.",
            },
          ]}
        />
      </ContentSection>
      <ContentSection index="01.C" title="Pitfalls">
        <Pitfalls
          cautions={[
            "You don't need an effect for everything. If it isn't a side effect, it doesn't belong here.",
            "For DOM measurement / layout work, prefer `useLayoutEffect` — it fires before paint.",
            "Don't run heavy computation inside an effect; memoize instead.",
          ]}
        />
      </ContentSection>
    </div>
  );
}

type LogKind = "ok" | "warn" | "err" | "dim";

interface LogEntry {
  line: string;
  kind: LogKind;
  t: number;
}

const HEARTBEAT_MESSAGES = ["ping", "heartbeat", "sync"] as const;

type ChatAction =
  | { type: "connect"; roomId: string; guestId: number }
  | { type: "append"; line: string; kind: LogKind }
  | { type: "disconnect"; roomId: string };

interface ChatState {
  log: LogEntry[];
  runCount: number;
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  const push = (line: string, kind: LogKind): ChatState => ({
    ...state,
    log: [
      ...state.log.slice(-5),
      { line, kind, t: Date.now() + Math.random() },
    ],
  });
  switch (action.type) {
    case "connect":
      return {
        runCount: state.runCount + 1,
        log: [
          ...state.log.slice(-5),
          {
            line: `▸ connecting to #${action.roomId}…`,
            kind: "warn",
            t: Date.now() + Math.random(),
          },
        ],
      };
    case "append":
      return push(action.line, action.kind);
    case "disconnect":
      return push(`✕ disconnecting from #${action.roomId}`, "err");
  }
}

function UseEffectDemo() {
  const [roomId, setRoomId] = useState("general");
  const [{ log, runCount }, dispatch] = useReducer(chatReducer, {
    log: [],
    runCount: 0,
  });
  const idRef = useRef(0);

  useEffect(() => {
    const id = ++idRef.current;
    const append = (line: string, kind: LogKind = "ok") =>
      dispatch({ type: "append", line, kind });

    dispatch({ type: "connect", roomId, guestId: id });

    const t1 = setTimeout(
      () => append(`✓ joined #${roomId} as guest-${id}`),
      380,
    );

    const t2 = setInterval(() => {
      const msg =
        HEARTBEAT_MESSAGES[
          Math.floor(Math.random() * HEARTBEAT_MESSAGES.length)
        ];
      append(`… ${msg} from #${roomId}`, "dim");
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearInterval(t2);
      dispatch({ type: "disconnect", roomId });
    };
  }, [roomId]);

  const rooms = ["general", "design", "react-19", "random"];

  return (
    <div style={{ width: "100%", maxWidth: 520 }}>
      <div
        style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}
      >
        {rooms.map((r) => (
          <button
            key={r}
            className={"btn " + (r === roomId ? "btn--accent" : "btn--ghost")}
            style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
            onClick={() => setRoomId(r)}
          >
            #{r}
          </button>
        ))}
      </div>
      <div
        style={{
          background: "#0a0a0a",
          border: "1px solid var(--border-strong)",
          borderRadius: 8,
          padding: "12px 14px",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          minHeight: 180,
          color: "var(--fg-dim)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            color: "var(--fg-faint)",
            fontSize: 10.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span>chat.log</span>
          <span>effect runs · {runCount}</span>
        </div>
        {log.length === 0 && (
          <div style={{ color: "var(--fg-faint)" }}>waiting…</div>
        )}
        {log.map((l) => (
          <div
            key={l.t}
            style={{
              color:
                l.kind === "err"
                  ? "var(--danger)"
                  : l.kind === "warn"
                    ? "var(--accent)"
                    : l.kind === "dim"
                      ? "var(--fg-faint)"
                      : "var(--ok)",
            }}
          >
            {l.line}
          </div>
        ))}
      </div>
      <p
        className="text-mono text-faint"
        style={{ fontSize: 11, marginTop: 10 }}
      >
        Each room switch triggers the cleanup, then re-runs the effect with the
        new <code>roomId</code>.
      </p>
    </div>
  );
}
