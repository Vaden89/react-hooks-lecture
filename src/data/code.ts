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
  {
    for: "useDebounce",
    code: `function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
  },
  {
    for: "useReducer",
    code: `function taskReducer(tasks, action) {
switch (action.type) {
case "add":
  return [...tasks, { id: tasks.length, text: action.text, done: false }];
case "delete":
  return tasks.filter(t => t.id !== action.id);
default:
  throw new Error("Invalid action: " + action.type);
}
}

function MyComponent() {
const [tasks, dispatch] = useReducer(taskReducer, []);

function handleAdd(text) {
dispatch({ type: "add", text });
}
}`,
  },
  {
    for: "errorBoundary",
    code: `function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load…</div>}>
      <UserList />
    </ErrorBoundary>
  );
}`,
  },
  {
    for: "use",
    code: `function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load products…</div>}>
      <Suspense fallback={<div>Fetching products</div>}>
        <ProductList />
      </Suspense>
    </ErrorBoundary>
  );
}

function ProductList() {
  const products = use(fetchProducts());

  return (
    <div className="product-list">
      {products.map(p => <ProductCard key={p.id} {...p} />)}
    </div>
  );
}`,
  },
  {
    for: "useActionState",
    code: `async function counterAction(prevState, _) {
    return prevState + 1;
}

function CounterComponent() {
  const [count, action] = useActionState(counterAction, 0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={action}>increase</button>
    </div>
  );
}`,
  },
  {
    for: "useActionState2",
    code: `async function formAction(_, formData) {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const { data } = await api.post("/auth/login", rawData);
    return {
      inputs: rawData,
      data: data.data,
      message: data.message,
      error: null,
    };
  } catch (error) {
    return {
      inputs: rawData,
      message: "Something went wrong",
      error: error?.cause?.message ?? "Failed to login"
    };
  }
};

function LoginForm() {
  const [state, action, isPending] = useActionState(formAction, initialState);

  return (
    <form action={action}>
      <input name="email" type="email" defaultValue={state.inputs.email} />
      <input name="password" type="password" defaultValue={state.inputs.password} />
      <button type="submit">{isPending ? "loading…" : "Login"}</button>
    </form>
  );
}`,
  },
  {
    for: "useOptimistic",
    code: `function updaterFn(state, action) {
  switch (action.type) {
    case "follow":
      return { ...state, isFollowing: true, followerCount: state.followerCount + 1 };
    case "unfollow":
      return { ...state, isFollowing: false, followerCount: state.followerCount - 1 };
    default:
      return state;
  }
}

function Profile() {
  const [profileData, setProfileData] = useState({ followerCount: 200, isFollowing: false });
  const [_, startTransition] = useTransition();
  const [optimisticData, setOptimisticData] = useOptimistic(profileData, updaterFn);

  const handleFollow = () => {
    startTransition(async () => {
      setOptimisticData({ type: "follow" });
      await fakeApiCall(profileData);

      startTransition(() => {
        setProfileData({
          followerCount: profileData.followerCount + 1,
          isFollowing: !profileData.isFollowing
        });
      });
    });
  };
}`,
  },
];
