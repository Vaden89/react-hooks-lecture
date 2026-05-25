import { starterProducts } from "../data/classActivityApi";
import { Button } from "./common/Button";

export function ClassActivity() {
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
          <Button variant="ghost" disabled>
            Load products
          </Button>
          <div className="rounded-lg border border-border-strong bg-bg px-3 py-2 text-sm">
            Cart <span className="text-accent">0</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {starterProducts.map((product) => (
          <article
            key={product.id}
            className="min-h-[220px] rounded-lg border border-border-strong bg-[#0a0a0a] p-4 flex flex-col"
          >
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
            <div className="mt-auto flex items-center justify-between pt-5">
              <span className="text-sm text-accent">${product.price}</span>
              <Button variant="accent" disabled>
                Add
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-lg border border-border-strong bg-[#0a0a0a] p-4">
        <div className="text-[10px] uppercase tracking-widest text-fg-faint">
          action state
        </div>
        <p className="mt-1 text-sm text-fg-dim">
          No request has run yet. Show pending, success, and error feedback here
          after wiring <code>useActionState</code>.
        </p>
      </div>
    </div>
  );
}
