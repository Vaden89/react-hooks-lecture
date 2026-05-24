import { useEffect, useReducer, useRef, useState } from "react";

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

export function UseEffectDemo() {
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
