import { CodeBlock } from "../../components/CodeBlock";
import { ContentSection } from "../../components/common/ContentSection";
import { Pitfalls } from "../../components/common/Pitfalls";
import { ErrorBoundaryDemo } from "../../components/demos/ErrorBoundaryDemo";
import { CodeSnippets } from "../../data/code";

export default function ErrorBoundaryPage() {
  return (
    <div className="w-full grid overflow-y-auto p-[80px_60px_120px] max-w-6xl page-anim">
      <div>
        <div className="text-xs tracking-widest uppercase text-accent">
          05 · Resilience
        </div>
        <h1 className="font-medium -tracking-wide text-[44px] mb-4">
          Error boundaries
        </h1>
        <p className="text-base text-fg-dim max-w-[64ch]  mb-2.5 text-pretty">
          <code className="text-[0.85em] bg-elev border border-border-strong py-0.5 px-1.5 rounded-lg align-[0.1em]">
            try/catch
          </code>{" "}
          works inside functions, but it can't catch errors thrown during
          rendering. Error boundaries are the React-shaped equivalent, they wrap
          a subtree and let it fail gracefully without bringing down the whole
          app.
        </p>
      </div>

      <ContentSection
        index="06.A"
        title="Live demo · Contained failure"
        description="Two siblings. One is wrapped in an ErrorBoundary the
        other isn't. Hit the button to make the wrapped child throw, only
        its tile flips to the fallback."
      >
        <div className="border border-border-strong rounded-lg bg-elev overflow-hidden grid grid-cols-1">
          <div className="flex items-center justify-between py-2.5 px-3.5 border-b border-border bg-[#131313] text-xs text-fg-dim demo__head">
            <div className="lights">
              <span />
              <span />
              <span />
            </div>
            <span>error-boundary.jsx</span>
            <span className="chip">
              <span className="dot" />
              live
            </span>
          </div>
          <div className="p-7 min-h-[200px] flex items-center justify-center demo__body">
            <ErrorBoundaryDemo />
          </div>
        </div>
      </ContentSection>

      <ContentSection index="06.B" title="Anatomy">
        <CodeBlock
          filename="App.jsx"
          code={CodeSnippets.find((s) => s.for === "errorBoundary")?.code ?? ""}
        />
        <ul className="w-full list-disc text-fg-dim pl-4.5 my-2 mb-3.5">
          <li>
            Only errors thrown <em>inside the wrapped subtree during render</em>{" "}
            are caught.
          </li>
          <li>
            Wrap an <code>ErrorBoundary</code> around the top of your app as a
            safety net, and around feature islands you want to fail
            independently.
          </li>
          <li>
            The boundary itself doesn't know <em>which</em> error happened —
            pass a richer fallback component if you want to expose details.
          </li>
        </ul>
      </ContentSection>

      <ContentSection index="05.C" title="Pitfalls">
        <Pitfalls
          cautions={[
            <li className="list-none">
              Boundaries miss errors inside event handlers, async callbacks, and
              code outside React's render pass — wrap those in{" "}
              <code>try/catch</code> as usual.
            </li>,
            "Server-rendered errors are caught only if the boundary is itself client-rendered or hydrated.",
          ]}
        />
      </ContentSection>
    </div>
  );
}
