import type { Lang } from "../data/strings";

export default function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex rounded-full border border-[var(--line)] bg-[var(--surface)] p-0.5">
      {(["en", "ar"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          className="rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors"
          style={{
            background: lang === l ? "var(--accent)" : "transparent",
            color: lang === l ? "var(--accent-ink)" : "var(--muted)",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
