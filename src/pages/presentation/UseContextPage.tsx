import { CodeBlock } from "../../components/CodeBlock";
import { ContentSection } from "../../components/common/ContentSection";
import { UseContextDemo } from "../../components/demos/UseContextDemo";
import { CodeSnippets } from "../../data/code";

export default function UseContextPage() {
  return (
    <div className="w-full grid h-dvh overflow-y-auto p-[80px_60px_120px] max-w-6xl page-anim">
      <div>
        <div className="text-xs tracking-widest uppercase text-accent">
          03 · Context hook
        </div>
        <h1 className="font-medium -tracking-wide text-[44px] mb-4">
          The{" "}
          <code className="text-[0.85em] bg-elev border border-border-strong py-1 px-2.5 rounded-lg align-[0.1em]">
            useContext
          </code>{" "}
          hook
        </h1>
        <p className="text-base text-fg-dim max-w-[64ch]  mb-2.5 text-pretty">
          Shared state without prop drilling. Wrap a subtree in a Provider, and
          any descendant can read the current value — perfect for theming, auth,
          locale, or any app-wide setting that touches many components.
        </p>
      </div>

      <ContentSection
        index="03.A"
        title="Live demo · Theme"
        description="One ThemeContext.Provider at the top. Three nested cards
        and their buttons all read the current theme via useContext"
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
            <UseContextDemo />
          </div>
        </div>
      </ContentSection>

      <ContentSection index="03.B" title="Creating a context">
        <CodeBlock
          filename="ThemeProvider.jsx"
          code={CodeSnippets.find((s) => s.for === "useContext")?.code ?? ""}
        />
      </ContentSection>
      <ContentSection index="03.B" title="Creating a context">
        <CodeBlock
          filename="Button.jsx"
          code={CodeSnippets.find((s) => s.for === "useContext2")?.code ?? ""}
        />
        <ul className="w-full list-disc text-fg-dim pl-4.5 my-2 mb-3.5">
          <li>
            A consumer must live <em>inside</em> a matching Provider — otherwise
            it gets the default value passed to <code>createContext</code>.
          </li>
          <li>
            When the Provider's <code>value</code> changes, every subscribed
            descendant re-renders.
          </li>
          <li>
            For wide, frequently-changing state, split contexts so the surface
            re-render stays small.
          </li>
        </ul>
      </ContentSection>
    </div>
  );
}
