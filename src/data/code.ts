export const CodeSnippets = [
  {
    for: "useEffect",
    code: `import { useEffect } from "react";

function ChatRoom({ roomId }) {
    useEffect(() => {
        const connection = createConnection(roomId);
        connection.connect();

        // Cleanup: runs before next effect or on unmount
        return () => {
            connection.disconnect();
        };
    }, [roomId]); // Dependency array
}`,
  },
  {
    for: "useRef",
    code: `function RefDemo() {
  const containerRef = useRef(null);
  const counterRef = useRef(0);

  function handleClick() {
    counterRef.current = counterRef.current + 1;
  }

  return (
    <div ref={containerRef}>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}`,
  },
  {
    for: "useContext",
    code: `import { createContext, useState } from "react";

const ThemeContext = createContext("light");

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}`,
  },
  {
    for: "useContext2",
    code: `import { useContext } from "react";
import { ThemeContext } from "src/providers/ThemeProvider";

function Button() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ backgroundColor: theme === "dark" ? "black" : "white" }}>
      Click me
    </button>
  );
}`,
  },
];
