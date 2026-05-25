import { useActionState } from "react";
import { Button } from "../common/Button";

type LoginInputs = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
};

type LoginState = {
  inputs: LoginInputs;
  data: User | null;
  message: string | null;
  error: string | null;
};

const initialState: LoginState = {
  inputs: { email: "", password: "" },
  data: null,
  message: null,
  error: null,
};

function fakeLogin(email: string, password: string) {
  return new Promise<{ user: User }>((resolve, reject) => {
    window.setTimeout(() => {
      if (!email || !email.includes("@")) {
        reject(new Error("Enter a valid email address"));
        return;
      }

      if (password.length < 6) {
        reject(new Error("Password must be at least 6 characters"));
        return;
      }

      if (email === "isaac@test.com" && password === "testing") {
        resolve({ user: { name: "Demo User", email } });
        return;
      }

      reject(new Error("Invalid credentials. Try isaac@test.com / testing"));
    }, 900);
  });
}

async function formAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const inputs = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  try {
    const { user } = await fakeLogin(inputs.email, inputs.password);

    return {
      inputs,
      data: user,
      message: `Welcome back, ${user.name}.`,
      error: null,
    };
  } catch (error) {
    return {
      inputs,
      data: null,
      message: null,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

function createToken(email: string) {
  const tokenSeed = Array.from(email).reduce(
    (total, char) => total + char.charCodeAt(0),
    0,
  );

  return `tok_${tokenSeed.toString(36).padStart(8, "0")}`;
}

export function UseActionStateDemo() {
  const [state, action, isPending] = useActionState(formAction, initialState);

  if (state.data) {
    return (
      <div className="flex min-w-[280px] flex-col gap-2 rounded-lg border border-ok bg-ok/5 p-[18px] text-xs text-fg-dim">
        <div className="text-[10.5px] uppercase tracking-widest text-ok">
          signed in
        </div>
        <div className="text-fg">{state.message}</div>
        <div>
          session token:{" "}
          <span className="text-accent">{createToken(state.data.email)}</span>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="grid w-full max-w-[360px] gap-3.5">
      <div className="grid gap-1.5">
        <label
          htmlFor="login-email"
          className="text-[11px] uppercase tracking-widest text-fg-faint"
        >
          email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="isaac@test.com"
          defaultValue={state.inputs.email}
        />
      </div>

      <div className="grid gap-1.5">
        <label
          htmlFor="login-password"
          className="text-[11px] uppercase tracking-widest text-fg-faint"
        >
          password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="testing"
          defaultValue={state.inputs.password}
        />
      </div>

      {state.error ? (
        <div className="rounded-md border border-danger bg-danger/5 px-3 py-2 text-xs text-danger">
          {state.error}
        </div>
      ) : (
        <div className="rounded-md border border-border bg-elev px-3 py-2 text-xs text-fg-faint">
          Try isaac@test.com / testing
        </div>
      )}

      <div className="w-full flex items-center justify-between gap-3">
        <Button
          className="w-full"
          type="submit"
          variant="accent"
          disabled={isPending}
        >
          {isPending ? "signing in..." : "sign in"}
        </Button>
      </div>
    </form>
  );
}
