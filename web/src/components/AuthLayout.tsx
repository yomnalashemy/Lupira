import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { Card } from "./ui/Field";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const { lang, setLang } = useLang();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 flex w-full max-w-md items-center justify-between">
        <Link to="/" className="font-serif text-xl font-semibold text-[var(--accent)]">
          Lupira
        </Link>
        <div className="flex rounded-full border border-[var(--line)] bg-[var(--surface)] p-0.5">
          {(["en", "ar"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className="rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase"
              style={{
                background: lang === l ? "var(--accent)" : "transparent",
                color: lang === l ? "var(--accent-ink)" : "var(--muted)",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <Card className="w-full max-w-md">
        <h1 className="font-serif text-[22px] font-semibold text-[var(--ink)]">{title}</h1>
        {subtitle && <p className="mt-1.5 text-[13.5px] text-[var(--muted)]">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </Card>
    </div>
  );
}
