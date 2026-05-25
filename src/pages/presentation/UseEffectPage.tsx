import { CodeBlock } from "../../components/CodeBlock";
import { ContentSection } from "../../components/common/ContentSection";
import { Pitfalls } from "../../components/common/Pitfalls";
import { Prose } from "../../components/common/Prose";
import { UseEffectDemo } from "../../components/demos/UseEffectDemo";
import { CodeSnippets } from "../../data/code";
import "../../styles/demo.css";

export default function UseEffectPage() {
  return (
    <div className="w-full grid overflow-y-auto p-[80px_60px_120px] max-w-6xl page-anim">
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
