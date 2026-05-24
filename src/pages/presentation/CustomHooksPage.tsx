import { CodeBlock } from "../../components/CodeBlock";
import { ContentSection } from "../../components/common/ContentSection";
import { Pitfalls } from "../../components/common/Pitfalls";
import { CustomHooksDemo } from "../../components/demos/CustomHooksDemo";
import { CodeSnippets } from "../../data/code";

export default function CustomHooksPage() {
  return (
    <div className="w-full grid h-dvh overflow-y-auto p-[80px_60px_120px] max-w-6xl page-anim">
      <div>
        <div className="text-xs tracking-widest uppercase text-accent">
          03 · Composition
        </div>
        <h1 className="font-medium -tracking-wide text-[44px] mb-2">
          Custom hooks
        </h1>
        <p className="text-base text-fg-dim max-w-[64ch]  mb-2.5 text-pretty">
          A custom hook is just a function — but one that's allowed to call
          other hooks. That tiny rule unlocks reusable, composable, stateful
          logic that you can lift out of components and share across the
          codebase.
        </p>
      </div>

      <ContentSection
        index="04.A"
        title="Live demo · useDebounce"
        description="Tune the delay slider and watch how the 'API calls' counter only ticks
        up after the input has been quiet for that interval."
      >
        <div className="border border-border-strong rounded-lg bg-elev overflow-hidden grid grid-cols-1">
          <div className="flex items-center justify-between py-2.5 px-3.5 border-b border-border bg-[#131313] text-xs text-fg-dim demo__head">
            <div className="lights">
              <span />
              <span />
              <span />
            </div>
            <span>use-debounce.jsx</span>
            <span className="chip">
              <span className="dot" />
              live
            </span>
          </div>
          <div className="p-7 min-h-[200px] flex items-center justify-center demo__body">
            <CustomHooksDemo />
          </div>
        </div>
      </ContentSection>

      <ContentSection index="04.B" title="Anatomy">
        <CodeBlock
          filename="useDebounce.js"
          code={CodeSnippets.find((s) => s.for === "useDebounce")?.code ?? ""}
        />
        <ul className="w-full list-disc text-fg-dim pl-4.5 my-2 mb-3.5">
          <li>
            Names must start with <code>use</code> — that's how React's linter
            knows to apply hook rules.
          </li>
          <li>
            Custom hooks return values, not JSX. They can return anything:
            primitive, array, object, callback.
          </li>
          <li>
            Each call has its own isolated state — calling{" "}
            <code>useDebounce</code> twice means two independent timers.
          </li>
        </ul>
      </ContentSection>

      <ContentSection index="04.C" title="When to reach for one">
        <Pitfalls
          cautions={[
            "Don't extract a custom hook for every duplicated state pair. The bar is 'this logic is non-trivial and used in more than 1 place'.",
            "Premature extraction adds indirection without earning re-use.",
          ]}
        />
      </ContentSection>
    </div>
  );
}
