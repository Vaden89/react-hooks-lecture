import "../../styles/button.css";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "default" | "ghost" | "accent" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  default: "",
  ghost: "btn--ghost",
  accent: "btn--accent",
  danger: "btn--danger",
};

export const Button = ({
  variant = "default",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={["btn", variantClass[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};
