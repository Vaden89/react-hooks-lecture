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
];
