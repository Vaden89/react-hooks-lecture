import "./index.css";
import { StrictMode } from "react";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";
import { PresentationLayout } from "./components/layout/PresentationLayout.tsx";
import UseEffectPage from "./pages/presentation/UseEffectPage.tsx";
import OverviewPage from "./pages/Overview.tsx";
import { UseRefPage } from "./pages/presentation/UseRefPage.tsx";
import UseContextPage from "./pages/presentation/UseContextPage.tsx";
import CustomHooksPage from "./pages/presentation/CustomHooksPage.tsx";
import UseReducerPage from "./pages/presentation/UseReducerPage.tsx";
import ErrorBoundaryPage from "./pages/presentation/ErrorBoundaryPage.tsx";
import UseHookPage from "./pages/presentation/UseHookPage.tsx";
import UseActionStatePage from "./pages/presentation/UseActionStatePage.tsx";
import UseOptimisticPage from "./pages/presentation/UseOptimisticPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: PresentationLayout,
    children: [
      { index: true, Component: OverviewPage },
      { path: "/use-ref", Component: UseRefPage },
      { path: "/use-hook", Component: UseHookPage },
      { path: "/use-effect", Component: UseEffectPage },
      { path: "/use-context", Component: UseContextPage },
      { path: "/use-reducer", Component: UseReducerPage },
      { path: "/custom-hooks", Component: CustomHooksPage },
      { path: "/error-boundary", Component: ErrorBoundaryPage },
      { path: "/use-optimistic", Component: UseOptimisticPage },
      { path: "/use-action-state", Component: UseActionStatePage },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
