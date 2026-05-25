import { Component, Suspense, use, useMemo, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Button } from "../common/Button";

type Product = {
  id: string;
  name: string;
  price: string;
  tag: string;
};

type DemoErrorBoundaryProps = {
  children: ReactNode;
  onReset: () => void;
};

type DemoErrorBoundaryState = {
  error: Error | null;
};

const SAMPLE_PRODUCTS: Product[] = [
  { id: "p_01", name: "Wireless headphones", price: "$129", tag: "audio" },
  { id: "p_02", name: "Mechanical keyboard", price: "$214", tag: "desktop" },
  { id: "p_03", name: 'OLED display 27"', price: "$899", tag: "desktop" },
  { id: "p_04", name: "Linear actuator desk", price: "$649", tag: "desktop" },
  { id: "p_05", name: "Compact microphone", price: "$179", tag: "audio" },
];

function fetchProducts({ shouldFail = false }: { shouldFail?: boolean } = {}) {
  return new Promise<Product[]>((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Network unreachable"));
        return;
      }

      resolve(SAMPLE_PRODUCTS);
    }, 1100);
  });
}

class DemoErrorBoundary extends Component<
  DemoErrorBoundaryProps,
  DemoErrorBoundaryState
> {
  state: DemoErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): DemoErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    void error;
    void info;
    /* could log to telemetry */
  }

  reset = () => {
    this.setState({ error: null });
    this.props.onReset();
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col gap-2.5 rounded-lg border border-dashed border-danger bg-danger/5 p-4 text-xs text-fg-dim">
          <div className="text-[10.5px] uppercase tracking-widest text-danger">
            failed to fetch products
          </div>
          <div>{this.state.error.message}</div>
          <div>
            <Button variant="ghost" onClick={this.reset}>
              retry
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function ProductList({ promise }: { promise: Promise<Product[]> }) {
  const products = use(promise);

  return (
    <div className="grid gap-1.5">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between rounded-md border border-border-strong bg-[#0a0a0a] px-3 py-2.5 text-xs"
        >
          <div>
            <div className="text-fg">{product.name}</div>
            <div className="text-[10.5px] text-fg-faint">
              {product.tag} · {product.id}
            </div>
          </div>
          <div className="text-accent">{product.price}</div>
        </div>
      ))}
    </div>
  );
}

function LoadingFallback() {
  const rowClasses = [
    "opacity-100",
    "opacity-90",
    "opacity-80",
    "opacity-70",
    "opacity-60",
  ];

  return (
    <div className="grid gap-1.5">
      {rowClasses.map((opacity, index) => (
        <div
          key={index}
          className={`h-[50px] animate-pulse rounded-md bg-elev-2 ${opacity}`}
        />
      ))}
    </div>
  );
}

export function UseHookDemo() {
  const [request, setRequest] = useState({ id: 0, shouldFail: false });

  const productsPromise = useMemo(
    () => fetchProducts({ shouldFail: request.shouldFail }),
    [request],
  );

  const reload = (shouldFail = false) => {
    setRequest((current) => ({
      id: current.id + 1,
      shouldFail,
    }));
  };

  return (
    <div className="grid w-full max-w-[540px] gap-3.5">
      <div className="flex flex-wrap gap-2">
        <Button variant="accent" onClick={() => reload(false)}>
          reload products
        </Button>
        <Button variant="ghost" onClick={() => reload(true)}>
          simulate failure
        </Button>
      </div>

      <div className="rounded-lg border border-border-strong bg-elev p-3.5">
        <DemoErrorBoundary onReset={() => reload(false)}>
          <Suspense fallback={<LoadingFallback />}>
            <ProductList promise={productsPromise} />
          </Suspense>
        </DemoErrorBoundary>
      </div>

      <p className="m-0 text-xs text-fg-dim">
        The child reads a promise with <code>use</code>. Suspense owns the
        loading state, and the boundary owns rejected promises.
      </p>
    </div>
  );
}
