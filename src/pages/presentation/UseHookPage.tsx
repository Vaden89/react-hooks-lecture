import { CodeBlock } from "../../components/CodeBlock";
import { ContentSection } from "../../components/common/ContentSection";
import { UseHookDemo } from "../../components/demos/UseHookDemo";
import { CodeSnippets } from "../../data/code";

export default function UseHookPage() {
  return (
    <div className="w-full grid overflow-y-auto p-[80px_60px_120px] max-w-6xl page-anim">
      <div>
        <div className="text-xs tracking-widest uppercase text-accent">
          07 · React 19
        </div>
        <h1 className="font-medium -tracking-wide text-[44px] mb-4">
          The{" "}
          <code className="text-[0.85em] bg-elev border border-border-strong py-1 px-2.5 rounded-lg align-[0.1em]">
            use
          </code>{" "}
          hook
        </h1>
        <p className="text-base text-fg-dim max-w-[64ch]  mb-2.5 text-pretty">
          New in React 19.{" "}
          <code className="text-[0.85em] bg-elev border border-border-strong py-0.5 px-1.5 rounded-lg align-[0.1em]">
            use
          </code>{" "}
          reads a promise (or a context) inline during render. Loading states
          are handed off to Suspense; errors are handed off to ErrorBoundary. No
          more useStateuseEffect + manual <em>isLoading</em> ceremony.
        </p>
      </div>

      <ContentSection
        index="07.A"
        title="Live demo · Product list"
        description="A fetchProducts() promise is read by use(). While it's pending, Suspense shows the shimmer. If it rejects, the ErrorBoundary catches it."
      >
        <div className="border border-border-strong rounded-lg bg-elev overflow-hidden grid grid-cols-1">
          <div className="flex items-center justify-between py-2.5 px-3.5 border-b border-border bg-[#131313] text-xs text-fg-dim demo__head">
            <div className="lights">
              <span />
              <span />
              <span />
            </div>
            <span>product-list.jsx</span>
            <span className="chip">
              <span className="dot" />
              live
            </span>
          </div>
          <div className="p-7 min-h-[200px] flex items-center justify-center demo__body">
            <UseHookDemo />
          </div>
        </div>
      </ContentSection>

      <ContentSection index="07.B" title="Anatomy">
        <CodeBlock
          filename="App.jsx"
          code={CodeSnippets.find((s) => s.for === "use")?.code ?? ""}
        />
        <ul className="w-full list-disc text-fg-dim pl-4.5 my-2 mb-3.5">
          <li>
            <code>use()</code> takes a promise (or a context) and suspends the
            component until it resolves.
          </li>
          <li>
            Loading UI lives in the nearest <code>&lt;Suspense&gt;</code>{" "}
            boundary.
          </li>
          <li>
            Rejected promises bubble up to the nearest{" "}
            <code>&lt;ErrorBoundary&gt;</code>.
          </li>
          <li>
            Unlike other hooks, <code>use</code> can be called conditionally —
            inside an <code>if</code> or a loop.
          </li>
        </ul>
      </ContentSection>
    </div>
  );
}
