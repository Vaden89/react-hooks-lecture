import { CodeBlock } from "../../components/CodeBlock";
import { ContentSection } from "../../components/common/ContentSection";
import { Pitfalls } from "../../components/common/Pitfalls";
import { UseRefDemo } from "../../components/demos/UseRefDemo";
import { CodeSnippets } from "../../data/code";

export function UseRefPage() {
  return (
    <div className="w-full grid h-dvh overflow-y-auto p-[80px_60px_120px] max-w-6xl page-anim">
      <div>
        <div className="text-xs tracking-widest uppercase text-accent">
          01 · Ref hook
        </div>
        <h1 className="font-medium -tracking-wide text-[44px] mb-4">
          The{" "}
          <code className="text-[0.85em] bg-elev border border-border-strong py-1 px-2.5 rounded-lg align-[0.1em]">
            useRef
          </code>{" "}
          hook
        </h1>
        <p className="text-base text-fg-dim max-w-[64ch]  mb-2.5 text-pretty">
          An escape hatch from React's reactive lifecycle. Refs hold a mutable
          slot that survives re-renders but doesn't cause them — perfect for DOM
          nodes, timer ids, and any value you want to remember without
          repainting the screen.
        </p>
      </div>

      <ContentSection
        index="02.A"
        title="Live demo · Silent vs. reactive"
        description="Both tiles count clicks. Only the right one triggers a re-render —
        so only it stays in sync with the screen."
      >
        <div className="border border-border-strong rounded-lg bg-elev overflow-hidden grid grid-cols-1">
          <div className="flex items-center justify-between py-2.5 px-3.5 border-b border-border bg-[#131313] text-xs text-fg-dim demo__head">
            <div className="lights">
              <span />
              <span />
              <span />
            </div>
            <span>ref-demo.jsx</span>
            <span className="chip">
              <span className="dot" />
              live
            </span>
          </div>
          <div className="p-7 min-h-[200px] flex items-center justify-center demo__body">
            <UseRefDemo />
          </div>
        </div>
      </ContentSection>

      <ContentSection index="01.B" title="Anatomy">
        <CodeBlock
          filename="ChatRoom.jsx"
          code={CodeSnippets.find((s) => s.for === "useRef")?.code ?? ""}
        />
        <ul className="w-full list-disc text-fg-dim pl-4.5 my-2 mb-3.5">
          <li>
            <code>useRef(initial)</code> returns{" "}
            <code>{`{ current: initial }`}</code>. Read / write via{" "}
            <code>.current</code>.
          </li>
          <li>
            Pass it to a DOM element's <code>ref</code> prop to grab the
            underlying node.
          </li>
          <li>
            Mutating <code>.current</code> does <strong>not</strong> trigger a
            re-render.
          </li>
        </ul>
      </ContentSection>

      <ContentSection index="01.C" title="Pitfalls">
        <Pitfalls
          cautions={[
            <p>
              Do not read or write{" "}
              <code className="text-[0.86em] bg-elev border border-border rounded text-fg py-0.5 px-1">
                ref.current
              </code>{" "}
              during rendering. It makes the component impure and breaks
              concurrent React.
            </p>,
            "Only touch refs inside effects or event handlers.",
          ]}
        />
      </ContentSection>
    </div>
  );
}
