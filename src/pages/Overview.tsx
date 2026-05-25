import { Link } from "react-router";
import { HookCard } from "../components/common/HookCard";
import { routePath } from "../data/route";
import { Button } from "../components/common/Button";

export default function OverviewPage() {
  return (
    <div className="grid overflow-y-auto page-anim p-[80px_60px_120px] max-w-6xl">
      <div className="grid grid-cols-3 gap-16 items-end border-b border-border pb-16">
        <div className="col-span-2">
          <div className="text-xs  tracking-[0.16em] uppercase text-accent mb-5 flex items-center gap-2.5 landing__text__1">
            A lecture by Isaac Shosanya · React Hooks and Routing
          </div>
          <h1 className="text-[84px] font-medium tracking-tighter leading-[90%] mb-6">
            Hooks,{" "}
            <em className="italic font-normal text-accent">up&nbsp;close</em>
          </h1>
          <p className="text-lg text-fg-dim mb-8">
            A working tour of the React hooks toolkit — every entry has a live
            demo, the code that runs it, and the pitfalls worth remembering.
            Built as the companion my lecture rise.
          </p>
          <div className="flex gap-3">
            <Link to="/use-effect">
              <Button variant="accent">Start the tour →</Button>
            </Link>
            <Link to="/use-optimistic">
              <Button variant="ghost">Skip to React 19</Button>
            </Link>
          </div>
        </div>
        {/*<aside className="landing__sidecard">
          <h4>Session card</h4>
          <dl>
            <dt>Speaker</dt>
            <dd>Vlad</dd>
            <dt>Length</dt>
            <dd>~45 min + Q&amp;A</dd>
            <dt>Topics</dt>
            <dd>9 hooks, 2 patterns</dd>
            <dt>Demos</dt>
            <dd>9 interactive</dd>
            <dt>React</dt>
            <dd>18.3 · 19</dd>
            <dt>Stack</dt>
            <dd>Hooks · Suspense · Actions</dd>
          </dl>
        </aside>*/}
      </div>

      <div className="grid grid-cols-3 gap-3.5 mt-12 ">
        <div className="landing__cardlabel">— Foundations</div>
        {routePath
          .filter((h) => h.cat === "foundation")
          .map((h, i) => (
            <HookCard key={h.id} hook={h} idx={i + 1} />
          ))}

        <div className="landing__cardlabel">— State management</div>
        {routePath
          .filter((h) => h.cat === "state")
          .map((h, i) => (
            <HookCard key={h.id} hook={h} idx={i + 1} />
          ))}

        <div className="landing__cardlabel">— React 19 &amp; async</div>
        {routePath
          .filter((h) => h.cat === "react19")
          .map((h, i) => (
            <HookCard key={h.id} hook={h} idx={i + 1} />
          ))}

        <div className="landing__cardlabel">— Class activity</div>
        {routePath
          .filter((h) => h.cat === "activity")
          .map((h, i) => (
            <HookCard key={h.id} hook={h} idx={i + 1} />
          ))}
      </div>
    </div>
  );
}
