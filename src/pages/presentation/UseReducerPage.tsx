import { CodeBlock } from "../../components/CodeBlock";
import { ContentSection } from "../../components/common/ContentSection";
import { Pitfalls } from "../../components/common/Pitfalls";
import { UseReducerDemo } from "../../components/demos/UseReducerDemo";
import { CodeSnippets } from "../../data/code";

export default function UseReducerPage() {
  return (
    <div className="w-full grid overflow-y-auto p-[80px_60px_120px] max-w-6xl page-anim">
      <div>
        <div className="text-xs tracking-widest uppercase text-accent">
          05 · State hook
        </div>
        <h1 className="font-medium -tracking-wide text-[44px] mb-4">
          The{" "}
          <code className="text-[0.85em] bg-elev border border-border-strong py-1 px-2.5 rounded-lg align-[0.1em]">
            useReducer
          </code>{" "}
          hook
        </h1>
        <p className="text-base text-fg-dim max-w-[64ch]  mb-2.5 text-pretty">
          When updating state turns into a tangle of{" "}
          <code className="text-[0.85em] bg-elev border border-border-strong py-0.5 px-1.5 rounded-lg align-[0.1em]">
            setX
          </code>{" "}
          calls, a reducer lets you move the logic out of the component.
          Components stop describing <em>how</em> to update — they just dispatch{" "}
          <em>what happened</em>.
        </p>
      </div>

      <ContentSection
        index="05.A"
        title="Live demo · Task list"
        description="Three actions: add, toggle, delete.
        Watch the 'last dispatch' line, every interaction is one declarative action."
      >
        <div className="border border-border-strong rounded-lg bg-elev overflow-hidden grid grid-cols-1">
          <div className="flex items-center justify-between py-2.5 px-3.5 border-b border-border bg-[#131313] text-xs text-fg-dim demo__head">
            <div className="lights">
              <span />
              <span />
              <span />
            </div>
            <span>task-reducer.jsx</span>
            <span className="chip">
              <span className="dot" />
              live
            </span>
          </div>
          <div className="p-7 min-h-[200px] flex items-center justify-center demo__body">
            <UseReducerDemo />
          </div>
        </div>
      </ContentSection>

      <ContentSection index="05.B" title="Anatomy">
        <CodeBlock
          filename="task-reducer.jsx"
          code={CodeSnippets.find((s) => s.for === "useReducer")?.code ?? ""}
        />
        <ul className="w-full list-disc text-fg-dim pl-4.5 my-2 mb-3.5">
          <li>
            <code>useReducer(reducerFn, initialState)</code> returns{" "}
            <code>[state, dispatch]</code>.
          </li>
          <li>
            The reducer takes <code>(state, action)</code> and returns the next
            state — pure, predictable, testable.
          </li>
          <li>
            <code>dispatch(action)</code> is how components ask for an update.
            They never touch state directly.
          </li>
        </ul>
      </ContentSection>

      <ContentSection index="05.C" title="Pitfalls">
        <Pitfalls
          cautions={[
            "Not every piece of state needs a reducer. Reach for one when update logic gets in your way, not before.",
            "Every case must return the same shape. Forgetting return in a branch silently produces undefined state.",
          ]}
        />
      </ContentSection>
    </div>
  );
}
