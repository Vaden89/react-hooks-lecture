import "./index.css";
import { StrictMode } from "react";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";
import { PresentationLayout } from "./components/layout/PresentationLayout.tsx";
import UseEffectPage from "./pages/presentation/UseEffectPage.tsx";
import OverviewPage from "./pages/Overview.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: PresentationLayout,
    children: [
      { index: true, Component: OverviewPage },
      { path: "/use-effect", Component: UseEffectPage },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
