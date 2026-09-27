import { motion } from "framer-motion";
import { X } from "lucide-react";
import { t, type Lang } from "../data/strings";
import type { HistoryEntry } from "../lib/storage";

interface Props {
  lang: Lang;
  history: HistoryEntry[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export default function HistoryView({ lang, history, onDelete, onClearAll }: Props) {
  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-10 text-center text-[13.5px] text-[var(--faint)]">
        {t(lang, "historyEmpty")}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
      <div className="flex flex-col">
        {history.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-3.5 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: entry.result.likely ? "var(--critical)" : "var(--good)" }}
              />
              <div>
                <div className="text-[13.5px] font-semibold">
                  {new Date(entry.date).toLocaleDateString(lang === "ar" ? "ar" : "en", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-[12px] text-[var(--faint)]">
                  {entry.result.count} {t(lang, "historyAnswers")}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onDelete(entry.id)}
              className="rounded-md p-1.5 text-[var(--faint)] hover:text-[var(--critical)]"
              aria-label="delete"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-end px-5 py-3">
        <button
          type="button"
          onClick={onClearAll}
          className="rounded-[9px] border border-[var(--line)] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--ink-2)]"
        >
          {t(lang, "clearAll")}
        </button>
      </div>
    </div>
  );
}
