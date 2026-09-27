import { TriangleAlert } from "lucide-react";
import { t, type Lang } from "../data/strings";

export default function Disclaimer({ lang }: { lang: Lang }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3.5 py-3 text-[13px] leading-snug text-[var(--ink-2)]">
      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" />
      <div>
        <strong className="text-[var(--ink)]">{t(lang, "disclaimerStrong")}</strong>{" "}
        {t(lang, "disclaimer")}
      </div>
    </div>
  );
}
