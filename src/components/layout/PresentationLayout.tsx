import "../../styles/sidebar.css";
import { Outlet } from "react-router";
import { routePath } from "../../data/route";
import { Link } from "react-router";
import { useLocation } from "react-router";

export const PresentationLayout = () => {
  const location = useLocation();

  const isLanding = location.pathname === "/";

  return (
    <main className="h-dvh overflow-hidden grid grid-cols-[250px_1fr]">
      <aside className="border-r border-border flex flex-col bg-[#0c0c0c]">
        <div className="px-5 py-6 cursor-pointer flex items-center gap-2.5 border-b border-border">
          <div className="sidebar__brand-mark"></div>
          <div className="flex flex-col">
            <span className="font-semibold text-[13px] -tracking-widest">
              React hooks
            </span>
            <span className="text-[11px] text-fg-dim">
              A Tour of React and it's hooks
            </span>
          </div>
        </div>
        <nav className="px-5 py-3 overflow-y-auto flex flex-col">
          <div className="text-[12px] uppercase text-fg-faint pt-3.5 px-3 mb-1">
            overview
          </div>
          <Link to={"/"} className={`nav-item ${isLanding ? "is-active" : ""}`}>
            <span className="text-xs text-fg-faint w-4.5">00</span>
            <span className="text-[12.5px]">Landing</span>
          </Link>

          <div className="text-[12px] uppercase text-fg-faint pt-3.5 px-3 mb-1">
            foundation
          </div>
          {routePath
            .filter((r) => r.cat === "foundation")
            .map((route, index) => {
              const isActive = route.path === location.pathname;
              return (
                <NavLink
                  hook={route}
                  active={isActive}
                  idx={index + 1}
                  key={route.path}
                />
              );
            })}

          <div className="text-[12px] uppercase text-fg-faint pt-3.5 px-3 mb-1">
            state management
          </div>
          {routePath
            .filter((r) => r.cat === "state")
            .map((route, index) => {
              const isActive = route.path === location.pathname;
              return (
                <NavLink
                  idx={index + 5}
                  hook={route}
                  active={isActive}
                  key={route.path}
                />
              );
            })}

          <div className="text-[12px] uppercase text-fg-faint pt-3.5 px-3 mb-1">
            react 19
          </div>
          {routePath
            .filter((r) => r.cat === "react19")
            .map((route, index) => {
              const isActive = route.path === location.pathname;

              return (
                <NavLink
                  idx={index + 7}
                  hook={route}
                  active={isActive}
                  key={route.path}
                />
              );
            })}
        </nav>
      </aside>
      <div className="overflow-y-auto scroll-smooth scrollbar">
        <header className="flex items-center py-4.5 px-10 border-b border-border sticky top-0 bg-[#0e0e0ee8] backdrop-blur-sm z-10 text-xs text-fg-dim">
          <div>
            <span className="text-fg">react-hooks</span>
            <i className="px-2 text-fg-faint">/</i>
            <span>
              {isLanding
                ? "overview"
                : (routePath.find((r) => r.path === location.pathname)?.title ??
                  "not found")}
            </span>
          </div>
        </header>
        <div className="px-2">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

function NavLink({
  hook,
  idx,
  active,
}: {
  hook: any;
  idx: number;
  active: boolean;
}) {
  return (
    <Link className={`nav-item ${active && "is-active"}`} to={hook.path}>
      <span className="text-xs text-fg-faint w-4.5">
        {String(idx).padStart(2, "0")}
      </span>
      <span className="text-[12.5px]">{hook.title}</span>
    </Link>
  );
}
