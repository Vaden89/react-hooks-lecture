import { useState, type ReactNode, createContext } from "react";

const PageHeaderContext = createContext<
  | {
      pageTitle: string;
      setPageTitle: (title: string) => void;
    }
  | undefined
>(undefined);

export const PageHeaderProvider = ({ children }: { children: ReactNode }) => {
  const [pageTitle, setPageTitle] = useState("");

  return (
    <PageHeaderContext value={{ pageTitle, setPageTitle }}>
      {children}
    </PageHeaderContext>
  );
};
