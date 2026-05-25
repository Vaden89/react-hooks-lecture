import { Component, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Button } from "../common/Button";

type ErrorBoundaryProps = {
  children: ReactNode;
  label: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    void error;
    void info;
    /* could log to telemetry */
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-w-[260px] flex-col gap-2.5 rounded-lg border border-dashed border-danger bg-danger/5 p-4 text-xs text-fg-dim">
          <div className="text-[10.5px] uppercase tracking-widest text-danger">
            fallback rendered
          </div>
          <div>
            The <code>{this.props.label}</code> widget threw. The rest of the
            page keeps running.
          </div>
          <div>
            <Button variant="ghost" onClick={this.reset}>
              try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function FragileWidget({
  shouldThrow,
  label,
}: {
  shouldThrow: boolean;
  label: string;
}) {
  if (shouldThrow) {
    throw new Error("FragileWidget: simulated render failure");
  }

  return (
    <div className="min-w-[260px] rounded-lg border border-border-strong bg-[#0a0a0a] p-4 text-xs text-fg-dim">
      <div className="text-[10.5px] uppercase tracking-widest text-ok">
        rendered ok
      </div>
      <div className="mt-2 text-fg">{label}</div>
      <div className="mt-1.5">everything green over here.</div>
    </div>
  );
}

export function ErrorBoundaryDemo() {
  const [boom, setBoom] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-3.5">
      <div className="flex flex-wrap justify-center gap-3.5">
        <ErrorBoundary label="UserList">
          <FragileWidget shouldThrow={boom} label="UserList widget" />
        </ErrorBoundary>
        <FragileWidget shouldThrow={false} label="Sidebar widget" />
      </div>

      <Button
        variant={boom ? "ghost" : "danger"}
        onClick={() => setBoom((isThrowing) => !isThrowing)}
      >
        {boom ? "stop throwing" : "throw inside the boundary"}
      </Button>

      <p className="m-0 max-w-[380px] text-center text-[11px] text-fg-faint">
        Only the wrapped child fails. The sibling widget keeps rendering - the
        page stays alive.
      </p>
    </div>
  );
}
