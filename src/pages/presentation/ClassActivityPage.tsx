import { ClassActivity } from "../../components/ClassActivity";
import { CodeBlock } from "../../components/CodeBlock";
import { ContentSection } from "../../components/common/ContentSection";
import { Prose } from "../../components/common/Prose";
import "../../styles/demo.css";

export default function ClassActivityPage() {
  return (
    <div className="w-full grid overflow-y-auto p-[80px_60px_120px] max-w-6xl page-anim">
      <div>
        <div className="text-xs tracking-widest uppercase text-accent">
          10 · Class activity
        </div>
        <h1 className="font-medium tracking-tight text-[44px] mb-4">
          Optimistic cart activity
        </h1>
        <p className="text-base text-fg-dim max-w-[68ch] mb-2.5 text-pretty">
          Students will turn this starter screen into a small product catalog:
          fetch the products, render them, and add items to the cart with an
          optimistic UI while the fake request is pending.
        </p>
      </div>
      <ContentSection
        index="10.A"
        title="Starter UI"
        description="This surface is intentionally not wired up. The buttons and panels show the target shape; the class will add the state, context, actions, and optimistic update."
      >
        <div className="border border-border-strong rounded-lg bg-elev overflow-hidden grid grid-cols-1">
          <div className="flex items-center justify-between py-2.5 px-3.5 border-b border-border bg-[#131313] text-xs text-fg-dim demo__head">
            <div className="lights">
              <span />
              <span />
              <span />
            </div>
            <span>optimistic-cart.jsx</span>
            <span className="chip">
              <span className="dot" />
              starter
            </span>
          </div>

          <div className="demo__body">
            <ClassActivity />
          </div>
        </div>
      </ContentSection>
      <ContentSection index="10.B" title="Student task">
        <Prose
          info={[
            {
              title: "Fetch products",
              content:
                "Call fetchProducts, keep loading and error states, then render the returned product list instead of the starter preview.",
              completed: true,
              footnote:
                "The catalog calls fetchProducts on mount, renders loading and error states, and can reload the fake API.",
            },
            {
              title: "Create cart context",
              content:
                "Use createContext and useContext so the cart counter can update from anywhere in the catalog.",
              completed: true,
              footnote:
                "CartProvider owns the confirmed count while CartBadge and the action handler read it through useContext.",
            },
            {
              title: "Handle add action",
              content:
                "Use useActionState around a form action that calls addToCart and returns a success or error message.",
              footnote:
                "Each product submits the shared useActionState action, which calls addToCart and returns success or error feedback.",
            },

            {
              title: "Make it optimistic",
              content:
                "Use useOptimistic so the cart count increments immediately, then reconciles with the confirmed request.",
              completed: true,
              footnote:
                "useOptimistic increments the visible cart count immediately, then reconciles with the confirmed count after the request settles.",
            },
          ]}
        />
      </ContentSection>

      <ContentSection
        index="10.C"
        title="Fake API"
        description="These functions are exported from the class activity API file. They behave like network requests without needing a backend."
      >
        <CodeBlock filename="classActivityApi.ts" code={activityStarterCode} />
      </ContentSection>
    </div>
  );
}

const activityStarterCode = `export async function fetchProducts() {
  await wait(900);
  return starterProducts.map((product) => ({ ...product }));
}

export async function addToCart(productId, quantity = 1) {
  await wait(700);

  const product = starterProducts.find((item) => item.id === productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return {
    ok: true,
    message: \`\${product.name} added to cart\`,
    productId,
    quantity,
  };
}`;
