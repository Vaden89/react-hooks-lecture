import {
  addToCart,
  fetchProducts,
  type Product,
} from "../data/classActivityApi";
import { Button } from "./common/Button";
import {
  createContext,
  useActionState,
  useCallback,
  useContext,
  useEffect,
  useOptimistic,
  useState,
  type ReactNode,
} from "react";

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
};

type AddItemState = {
  status: "idle" | "success" | "error";
  message: string;
  productId: string | null;
  quantity: number;
};

type CartContextValue = {
  count: number;
  addOptimisticItem: (quantity: number) => void;
  confirmItem: (quantity: number) => void;
};

const initialProductsState: ProductsState = {
  products: [],
  isLoading: true,
  error: null,
};

const initialAddItemState: AddItemState = {
  status: "idle",
  message: "No request has run yet. Add an item to see action feedback.",
  productId: null,
  quantity: 0,
};

const CartContext = createContext<CartContextValue | null>(null);

function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return cart;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}

function addCartQuantity(count: number, quantity: number) {
  return count + quantity;
}

function CartProvider({ children }: { children: ReactNode }) {
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [optimisticCount, addOptimisticItem] = useOptimistic(
    confirmedCount,
    addCartQuantity,
  );

  const confirmItem = (quantity: number) => {
    setConfirmedCount((count) => count + quantity);
  };

  return (
    <CartContext
      value={{ count: optimisticCount, addOptimisticItem, confirmItem }}
    >
      {children}
    </CartContext>
  );
}

export function ClassActivity() {
  return (
    <CartProvider>
      <ProductCatalog />
    </CartProvider>
  );
}

function ProductCatalog() {
  const { addOptimisticItem, confirmItem } = useCart();
  const [productsState, setProductsState] =
    useState<ProductsState>(initialProductsState);
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setProductsState((state) => ({
      ...state,
      isLoading: true,
      error: null,
    }));

    try {
      const products = await fetchProducts();

      setProductsState({
        products,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setProductsState((state) => ({
        ...state,
        isLoading: false,
        error: getErrorMessage(error),
      }));
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const addItemAction = async (
    _previousState: AddItemState,
    formData: FormData,
  ): Promise<AddItemState> => {
    const productId = String(formData.get("productId") ?? "");
    const quantity = Number(formData.get("quantity") ?? 1);
    const product = productsState.products.find((item) => item.id === productId);

    if (!product) {
      setPendingProductId(null);

      return {
        status: "error",
        message: "Pick a product before adding to the cart.",
        productId,
        quantity,
      };
    }

    addOptimisticItem(quantity);

    try {
      const result = await addToCart(product.id, quantity);
      confirmItem(result.quantity);

      return {
        status: "success",
        message: result.message,
        productId: result.productId,
        quantity: result.quantity,
      };
    } catch (error) {
      return {
        status: "error",
        message: getErrorMessage(error),
        productId,
        quantity,
      };
    } finally {
      setPendingProductId(null);
    }
  };

  const [actionState, formAction, isAdding] = useActionState(
    addItemAction,
    initialAddItemState,
  );

  const pendingProduct = productsState.products.find(
    (product) => product.id === pendingProductId,
  );

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-4 rounded-lg border border-border-strong bg-[#0a0a0a] p-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-fg-faint">
            shop lab
          </div>
          <div className="text-xl font-medium tracking-[-0.02em]">
            React hooks supply desk
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            disabled={productsState.isLoading}
            onClick={() => void loadProducts()}
          >
            {productsState.isLoading ? "Loading..." : "Reload products"}
          </Button>
          <CartBadge />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {productsState.isLoading ? (
          <LoadingProducts />
        ) : productsState.error ? (
          <ProductsError
            message={productsState.error}
            onRetry={() => void loadProducts()}
          />
        ) : (
          productsState.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              formAction={formAction}
              isAdding={isAdding}
              isPending={pendingProductId === product.id}
              onSubmit={() => setPendingProductId(product.id)}
            />
          ))
        )}
      </div>

      <ActionStatePanel
        state={actionState}
        isPending={isAdding}
        pendingProductName={pendingProduct?.name}
      />
    </div>
  );
}

function CartBadge() {
  const { count } = useCart();

  return (
    <div className="rounded-lg border border-border-strong bg-bg px-3 py-2 text-sm">
      Cart <span className="text-accent">{count}</span>
    </div>
  );
}

function LoadingProducts() {
  return Array.from({ length: 3 }).map((_, index) => (
    <article
      key={index}
      className="min-h-55 rounded-lg border border-border-strong bg-[#0a0a0a] p-4"
    >
      <div className="mb-4 h-16 rounded-lg border border-border bg-elev" />
      <div className="h-4 w-3/4 rounded bg-elev" />
      <div className="mt-3 h-3 w-full rounded bg-elev" />
      <div className="mt-2 h-3 w-2/3 rounded bg-elev" />
      <div className="mt-10 h-9 rounded bg-elev" />
    </article>
  ));
}

function ProductsError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="col-span-3 rounded-lg border border-danger bg-danger/5 p-4 text-sm text-danger">
      <div className="font-medium">Products failed to load.</div>
      <p className="mb-3 mt-1 text-xs text-danger">{message}</p>
      <Button variant="danger" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

function ProductCard({
  product,
  formAction,
  isAdding,
  isPending,
  onSubmit,
}: {
  product: Product;
  formAction: (formData: FormData) => void;
  isAdding: boolean;
  isPending: boolean;
  onSubmit: () => void;
}) {
  return (
    <article className="min-h-55 rounded-lg border border-border-strong bg-[#0a0a0a] p-4 flex flex-col">
      <div
        className="mb-4 h-16 rounded-lg border border-border"
        style={{
          background: `linear-gradient(135deg, ${product.accent}, #171717 72%)`,
        }}
      />
      <h3 className="text-base font-medium tracking-[-0.01em]">
        {product.name}
      </h3>
      <p className="mt-1 text-xs text-fg-dim">{product.description}</p>

      <form
        action={formAction}
        className="mt-auto flex items-center justify-between pt-5"
        onSubmit={onSubmit}
      >
        <input type="hidden" name="productId" value={product.id} />
        <input type="hidden" name="quantity" value="1" />
        <span className="text-sm text-accent">${product.price}</span>
        <Button type="submit" variant="accent" disabled={isAdding}>
          {isPending ? "Adding..." : "Add"}
        </Button>
      </form>
    </article>
  );
}

function ActionStatePanel({
  state,
  isPending,
  pendingProductName,
}: {
  state: AddItemState;
  isPending: boolean;
  pendingProductName?: string;
}) {
  const statusClass = isPending
    ? "border-accent bg-accent/5 text-accent"
    : state.status === "success"
      ? "border-ok bg-ok/5 text-ok"
      : state.status === "error"
        ? "border-danger bg-danger/5 text-danger"
        : "border-border-strong bg-[#0a0a0a] text-fg-dim";

  const message = isPending
    ? `Adding ${pendingProductName ?? "item"}...`
    : state.message;

  return (
    <div className={`rounded-lg border p-4 ${statusClass}`}>
      <div className="text-[10px] uppercase tracking-widest text-fg-faint">
        action state
      </div>
      <p className="mt-1 text-sm">{message}</p>
      {state.status === "success" && !isPending && (
        <p className="mt-1 text-[11px] text-fg-dim">
          Confirmed quantity: {state.quantity}
        </p>
      )}
    </div>
  );
}
