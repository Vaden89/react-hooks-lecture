import { CodeBlock } from "../../components/CodeBlock";
import { ContentSection } from "../../components/common/ContentSection";
import { Prose } from "../../components/common/Prose";
import { UseActionStateDemo } from "../../components/demos/UseActionStateDemo";
import { CodeSnippets } from "../../data/code";

export default function UseActionStatePage() {
  return (
    <div className="w-full grid overflow-y-auto p-[80px_60px_120px] max-w-6xl page-anim">
      <div>
        <div className="text-xs tracking-widest uppercase text-accent">
          08 · React 19
        </div>
        <h1 className="font-medium -tracking-wide text-[44px] mb-4">
          The{" "}
          <code className="text-[0.85em] bg-elev border border-border-strong py-1 px-2.5 rounded-lg align-[0.1em]">
            useActionState
          </code>{" "}
          hook
        </h1>
        <p className="text-base text-fg-dim max-w-[64ch]  mb-2.5 text-pretty">
          Like{" "}
          <code className="text-[0.85em] bg-elev border border-border-strong py-0.5 px-1.5 rounded-lg align-[0.1em]">
            useReducer
          </code>{" "}
          , but for async work.{" "}
          <code className="text-[0.85em] bg-elev border border-border-strong py-0.5 px-1.5 rounded-lg align-[0.1em]">
            useActionState
          </code>
          ties a form (or any action) to a piece of state and tracks its pending
          status for you — no more juggling isLoading, error, and input flags in
          parallel.
        </p>
      </div>

      <ContentSection
        index="08.A"
        title="Live demo · Sign-in form"
        description="The submit handler is a plain async function. React tracks the
        promise and exposes isPending the returned object becomes the next state."
      >
        <div className="border border-border-strong rounded-lg bg-elev overflow-hidden grid grid-cols-1">
          <div className="flex items-center justify-between py-2.5 px-3.5 border-b border-border bg-[#131313] text-xs text-fg-dim demo__head">
            <div className="lights">
              <span />
              <span />
              <span />
            </div>
            <span>login-form.jsx</span>
            <span className="chip">
              <span className="dot" />
              live
            </span>
          </div>
          <div className="p-7 min-h-[200px] flex items-center justify-center demo__body">
            <UseActionStateDemo />
          </div>
        </div>
      </ContentSection>

      <ContentSection index="08.B" title="Anatomy · simple action">
        <CodeBlock
          filename="counter.jsx"
          code={
            CodeSnippets.find((s) => s.for === "useActionState")?.code ?? ""
          }
        />
      </ContentSection>

      <ContentSection index="07.B" title="Anatomy">
        <CodeBlock
          filename="login.jsx"
          code={
            CodeSnippets.find((s) => s.for === "useActionState2")?.code ?? ""
          }
        />

        <Prose
          info={[
            {
              title: "One source of truth",
              content:
                "Inputs, success data, errors and pending all live in state",
            },
            {
              title: "Automatic loading state",
              content:
                "React watches the returned promise, no manual setLoading calls.",
            },
            {
              title: "Native form integration.",
              content:
                "Pass the returned action straight to <form action={action}/> and read inputs from formData.",
            },
            {
              title: "Resilient state.",
              content:
                "When validation fails, return inputs back so React repopulates the fields.",
            },
          ]}
        />
      </ContentSection>
    </div>
  );
}
