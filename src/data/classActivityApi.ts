export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  accent: string;
};

export type AddToCartResult = {
  ok: true;
  message: string;
  productId: string;
  quantity: number;
};

export const starterProducts: Product[] = [
  {
    id: "keyboard",
    name: "Compact keyboard",
    description: "Low-profile keys for focused desk work.",
    price: 84,
    accent: "oklch(0.78 0.13 60)",
  },
  {
    id: "notebook",
    name: "Project notebook",
    description: "Dot-grid pages for plans, bugs, and sketches.",
    price: 18,
    accent: "oklch(0.78 0.1 200)",
  },
  {
    id: "lamp",
    name: "Desk lamp",
    description: "Warm adjustable light for late debugging.",
    price: 46,
    accent: "oklch(0.78 0.13 150)",
  },
];

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export async function fetchProducts() {
  await wait(900);
  return starterProducts.map((product) => ({ ...product }));
}

export async function addToCart(productId: string, quantity = 1) {
  await wait(700);

  const product = starterProducts.find((item) => item.id === productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return {
    ok: true,
    message: `${product.name} added to cart`,
    productId,
    quantity,
  } satisfies AddToCartResult;
}
