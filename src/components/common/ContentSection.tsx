import type { ReactNode } from "react";

interface ContentSectionProps {
  index: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export const ContentSection = ({
  index,
  title,
  description,
  children,
}: ContentSectionProps) => {
  return (
    <section className="w-full mt-14">
      <div className="flex items-baseline gap-3.5 mb-3.5 pb-3 border-b border-border">
        <span className="text-xs text-fg-faint">{index}</span>
        <h2 className="text-lg font-medium tracking-[-0.01em] m-0">{title}</h2>
      </div>
      {description && (
        <p className="text-fg-dim mb-3.5 max-w-2xl text-pretty">
          {description}
        </p>
      )}
      {children}
    </section>
  );
};
