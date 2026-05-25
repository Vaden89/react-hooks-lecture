import { useOptimistic, useState, useTransition } from "react";
import { Button } from "../common/Button";

type Profile = {
  followerCount: number;
  isFollowing: boolean;
};

type OptimisticAction = {
  type: "follow" | "unfollow";
};

type LogEntry = {
  id: number;
  line: string;
  kind: "warn" | "ok" | "err";
};

const initialProfile: Profile = {
  followerCount: 12483,
  isFollowing: false,
};

function updateProfile(state: Profile, action: OptimisticAction): Profile {
  switch (action.type) {
    case "follow":
      return {
        ...state,
        isFollowing: true,
        followerCount: state.followerCount + 1,
      };
    case "unfollow":
      return {
        ...state,
        isFollowing: false,
        followerCount: state.followerCount - 1,
      };
  }
}

function fakeApiCall({ shouldFail = false }: { shouldFail?: boolean } = {}) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Network error"));
        return;
      }

      resolve();
    }, 1300);
  });
}

export function UseOptimisticDemo() {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [isPending, startTransition] = useTransition();
  const [profile, setProfile] = useState(initialProfile);
  const [simulateFail, setSimulateFail] = useState(false);
  const [optimistic, addOptimistic] = useOptimistic(profile, updateProfile);

  const append = (line: string, kind: LogEntry["kind"]) => {
    setLog((currentLog) =>
      [{ line, kind, id: Date.now() + Math.random() }, ...currentLog].slice(
        0,
        5,
      ),
    );
  };

  const handleToggle = () => {
    const type = optimistic.isFollowing ? "unfollow" : "follow";

    startTransition(async () => {
      addOptimistic({ type });
      append(`optimistic: ${type}`, "warn");

      try {
        await fakeApiCall({ shouldFail: simulateFail });
        setProfile((currentProfile) => updateProfile(currentProfile, { type }));
        append(`confirmed: ${type}`, "ok");
      } catch {
        append("failed - reverting", "err");
      }
    });
  };

  return (
    <div className="grid w-full max-w-[480px] gap-3.5">
      <div className="flex items-center gap-3.5 rounded-lg border border-border-strong bg-[#0a0a0a] p-[18px]">
        <div className="size-12 shrink-0 rounded-full bg-[conic-gradient(from_220deg,oklch(0.78_0.13_60),oklch(0.78_0.10_320),oklch(0.78_0.13_60))]" />

        <div className="flex-1">
          <div className="font-medium text-fg">@dan_abramov</div>
          <div className="text-xs text-fg-dim">
            <span className="text-fg">
              {optimistic.followerCount.toLocaleString()}
            </span>{" "}
            followers
          </div>
        </div>

        <Button
          variant={optimistic.isFollowing ? "ghost" : "accent"}
          onClick={handleToggle}
          disabled={isPending}
        >
          {optimistic.isFollowing ? "Following" : "Follow"}
        </Button>
      </div>

      <div className="w-full flex cursor-pointer items-center gap-2.5 pl-2 text-xs text-fg-dim">
        <input
          type="checkbox"
          checked={simulateFail}
          onChange={(event) => setSimulateFail(event.target.checked)}
          className="w-4 p-0 accent-accent"
        />
        <span className="w-fit">
          simulate network failure - watch the UI snap back
        </span>
      </div>

      <div className="min-h-[110px] rounded-lg border border-border-strong bg-[#0a0a0a] p-3 text-[11.5px]">
        <div className="mb-1.5 text-[10px] uppercase tracking-widest text-fg-faint">
          event log
        </div>

        {log.length === 0 && (
          <div className="text-fg-faint">click follow to see events</div>
        )}

        {log.map((entry) => (
          <div
            key={entry.id}
            className={
              entry.kind === "err"
                ? "text-danger"
                : entry.kind === "warn"
                  ? "text-accent"
                  : "text-ok"
            }
          >
            {entry.line}
          </div>
        ))}
      </div>
    </div>
  );
}
