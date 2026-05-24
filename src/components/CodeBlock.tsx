import "../styles/code.css";
import { useState } from "react";

// I have no idea how any of this works

const KEYWORDS = new Set([
  "import",
  "from",
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "switch",
  "case",
  "default",
  "break",
  "throw",
  "new",
  "async",
  "await",
  "try",
  "catch",
  "finally",
  "export",
  "class",
  "extends",
  "this",
  "typeof",
]);

function tokenize(src) {
  // Combined regex of token kinds, evaluated in priority order.
  const re =
    /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_$][\w$]*\b)|(=>|[{}()\[\];,.<>+\-*/%=!?:&|])/g;
  const out = [];
  let last = 0;
  let m;
  while ((m = re.exec(src)) !== null) {
    if (m.index > last) out.push({ t: "txt", v: src.slice(last, m.index) });
    if (m[1] || m[2]) out.push({ t: "com", v: m[0] });
    else if (m[3]) out.push({ t: "str", v: m[0] });
    else if (m[4]) out.push({ t: "num", v: m[0] });
    else if (m[5]) {
      if (KEYWORDS.has(m[5])) out.push({ t: "kw", v: m[5] });
      else if (/^[A-Z]/.test(m[5])) out.push({ t: "jsx", v: m[5] });
      else out.push({ t: "fn", v: m[5] });
    } else if (m[6]) out.push({ t: "punc", v: m[0] });
    last = re.lastIndex;
  }
  if (last < src.length) out.push({ t: "txt", v: src.slice(last) });
  return out;
}

export function CodeBlock({
  code,
  lang = "jsx",
  filename,
}: {
  code: string;
  lang?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);
  const trimmed = code.replace(/^\n+/, "").replace(/\n+$/, "");
  const tokens = tokenize(trimmed);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed);
      setCopied(true);
      setTimeout(() => setCopied(false), 1100);
    } catch (e) {
      /* ignore */
      console.log("an error occurred", e);
    }
  };

  return (
    <div className="border border-border rounded-lg bg-[#0a0a0a] mt-4.5 overflow-hidden">
      <div className="flex items-center justify-between py-2 px-3.5 border-b border-border text-xs text-fg-dim">
        <span>
          <span className="text-accent">{lang}</span>
          {filename ? ` · ${filename}` : ""}
        </span>
        <button
          className="bg-transparent border border-border-strong rounded text-fg-dim text-[11px] py-1 px-2 transition-all duration-150 ease-in-out cursor-pointer hover:text-fg hover:border-fg-faint"
          onClick={handleCopy}
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="m-0 py-4.5 px-5 overflow-x-auto text-[12.5px] leading-[165%] text-[#d6d2c8]">
        <code className="bg-transparent border-none p-0 text-inherit">
          {tokens.map((tok, i) =>
            tok.t === "txt" ? (
              tok.v
            ) : (
              <span key={i} className={`tok-${tok.t}`}>
                {tok.v}
              </span>
            ),
          )}
        </code>
      </pre>
    </div>
  );
}
