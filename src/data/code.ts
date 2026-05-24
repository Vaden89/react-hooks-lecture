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
];
