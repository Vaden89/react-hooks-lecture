import { CodeBlock } from "../../components/CodeBlock";
import { ContentSection } from "../../components/common/ContentSection";
import { UseOptimisticDemo } from "../../components/demos/UseOptimisticDemo";
import { CodeSnippets } from "../../data/code";

export default function UseOptimisticPage() {
  return (
    <div className="w-full grid overflow-y-auto p-[80px_60px_120px] max-w-6xl page-anim">
      <div>
        <div className="text-xs tracking-widest uppercase text-accent">
          09 · React 19
        </div>
        <h1 className="font-medium -tracking-wide text-[44px] mb-4">
          The{" "}
          <code className="text-[0.85em] bg-elev border border-border-strong py-1 px-2.5 rounded-lg align-[0.1em]">
            useOptimistic
          </code>{" "}
          hook
        </h1>
        <p className="text-base text-fg-dim max-w-[64ch]  mb-2.5 text-pretty">
          Trivial actions feel instant when you assume the server will say yes.
          <code className="text-[0.85em] bg-elev border border-border-strong py-0.5 px-1.5 rounded-lg align-[0.1em]">
            useOptimistic
          </code>{" "}
          lets you show that "yes" immediately while the real request flies —
          and snap back cleanly if it fails.
        </p>
      </div>

      <ContentSection
        index="09.A"
        title="Live demo · Follow button"
        description=" Click Follow. The count and label flip instantly while the
        fake request takes 1.3s. Toggle 'simulate failure' and the optimistic
        state rolls back when the promise rejects."
      >
        <div className="border border-border-strong rounded-lg bg-elev overflow-hidden grid grid-cols-1">
          <div className="flex items-center justify-between py-2.5 px-3.5 border-b border-border bg-[#131313] text-xs text-fg-dim demo__head">
            <div className="lights">
              <span />
              <span />
              <span />
            </div>
            <span>follow-button.jsx</span>
            <span className="chip">
              <span className="dot" />
              live
            </span>
          </div>
          <div className="p-7 min-h-[200px] flex items-center justify-center demo__body">
            <UseOptimisticDemo />
          </div>
        </div>
      </ContentSection>

      <ContentSection index="09.B" title="Anatomy">
        <CodeBlock
          filename="follow.jsx"
          code={CodeSnippets.find((s) => s.for === "useOptimistic")?.code ?? ""}
        />
        <ul className="w-full list-disc text-fg-dim pl-4.5 my-2 mb-3.5">
          <li>
            <code>useOptimistic(baseState, reducerFn?)</code> returns a clone of{" "}
            <code>baseState</code> and a setter.
          </li>
          <li>
            The setter only affects the cloned value{" "}
            <em>during the current transition</em>.
          </li>
          <li>
            When the transition ends, the clone is reconciled with the latest{" "}
            <code>baseState</code> — so a failed request automatically reverts.
          </li>
          <li>
            You <strong>must</strong> dispatch inside a{" "}
            <code>startTransition</code> — otherwise React ignores the
            optimistic update.
          </li>
        </ul>
      </ContentSection>
    </div>
  );
}
