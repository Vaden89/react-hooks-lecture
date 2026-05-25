import { useReducer, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../common/Button";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type TaskAction =
  | { type: "add"; text: string }
  | { type: "toggle"; id: number }
  | { type: "delete"; id: number }
  | { type: "clear" };

const SEED: Task[] = [
  { id: 1, text: "Draft the talk outline", done: true },
  { id: 2, text: "Build the demo site", done: false },
  { id: 3, text: "Practise the React 19 bits", done: false },
];

function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "add":
      return [
        ...tasks,
        { id: Date.now() + Math.random(), text: action.text, done: false },
      ];
    case "toggle":
      return tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task,
      );
    case "delete":
      return tasks.filter((task) => task.id !== action.id);
    case "clear":
      return tasks.filter((task) => !task.done);
    default:
      return tasks;
  }
}

function formatAction(action: TaskAction) {
  if (action.type === "add") {
    return `{type: 'add', text: '${action.text}'}`;
  }

  if (action.type === "toggle" || action.type === "delete") {
    return `{type: '${action.type}', id: ...}`;
  }

  return "{type: 'clear'}";
}

export function UseReducerDemo() {
  const [tasks, dispatch] = useReducer(taskReducer, SEED);
  const [draft, setDraft] = useState("");
  const [lastAction, setLastAction] = useState<TaskAction | null>(null);

  const send = (action: TaskAction) => {
    setLastAction(action);
    dispatch(action);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = draft.trim();
    if (!text) return;

    send({ type: "add", text });
    setDraft("");
  };

  return (
    <div className="grid w-full max-w-[540px] gap-3.5">
      <form onSubmit={submit} className="flex gap-2">
        <input
          placeholder="new task..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <Button type="submit" variant="accent">
          add
        </Button>
      </form>

      <div className="min-h-[160px] rounded-lg border border-border-strong bg-[#0a0a0a] p-1.5">
        {tasks.length === 0 && (
          <div className="p-[18px] text-xs text-fg-faint">
            no tasks - dispatch{" "}
            <code className="text-accent">{`{type: 'add'}`}</code>
          </div>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px]"
          >
            <button
              type="button"
              aria-label={task.done ? "Mark task incomplete" : "Mark task done"}
              onClick={() => send({ type: "toggle", id: task.id })}
              className={`grid size-4 cursor-pointer place-items-center rounded border-[1.5px] p-0 ${
                task.done
                  ? "border-accent bg-accent text-[#1a1407]"
                  : "border-fg-faint bg-transparent text-transparent"
              }`}
            >
              {task.done ? (
                <span className="text-[11px] leading-none">✓</span>
              ) : null}
            </button>

            <span
              className={`flex-1 ${
                task.done ? "text-fg-faint line-through" : "text-fg"
              }`}
            >
              {task.text}
            </span>

            <button
              type="button"
              onClick={() => send({ type: "delete", id: task.id })}
              className="cursor-pointer border-0 bg-transparent p-0 text-sm text-fg-faint transition-colors hover:text-fg"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => send({ type: "clear" })}>
          clear completed
        </Button>
        <div className="text-[11px] text-fg-faint">
          last dispatch:{" "}
          {lastAction ? (
            <span className="text-accent">{formatAction(lastAction)}</span>
          ) : (
            <span>-</span>
          )}
        </div>
      </div>
    </div>
  );
}
