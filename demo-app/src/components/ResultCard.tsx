import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { t, type Lang } from "../data/strings";
import type { ResultData } from "../lib/scoring";

interface Props {
  lang: Lang;
  result: ResultData;
  onRetake: () => void;
  onViewHistory: () => void;
}

export default function ResultCard({ lang, result, onRetake, onViewHistory }: Props) {
  const [whyOpen, setWhyOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-8 text-center shadow-[0_1px_2px_rgba(43,30,36,0.05),0_10px_28px_-14px_rgba(43,30,36,0.22)]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="grid size-16 place-items-center rounded-full"
        style={{
          background: result.likely ? "color-mix(in srgb, var(--critical) 15%, transparent)" : "color-mix(in srgb, var(--good) 15%, transparent)",
          color: result.likely ? "var(--critical)" : "var(--good)",
        }}
      >
        {result.likely ? <TriangleAlert className="size-7" /> : <CircleCheck className="size-7" />}
      </motion.div>

      <h2 className="font-serif text-[22px] font-semibold">
        {t(lang, result.likely ? "resultLikelyTitle" : "resultClearTitle")}
      </h2>
      <p className="max-w-[42ch] text-[14px] text-[var(--muted)]">
        {t(lang, result.likely ? "resultLikelySub" : "resultClearSub")}
      </p>

      {result.flagged.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setWhyOpen((v) => !v)}
            className="mt-1.5 text-[12.5px] font-semibold text-[var(--accent)] underline decoration-dotted underline-offset-4"
          >
            {t(lang, "whyToggle")}
          </button>
          <AnimatePresence>
            {whyOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full overflow-hidden"
              >
                <div className="mt-1.5 flex flex-col gap-1.5">
                  {result.flagged.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex justify-between gap-2.5 rounded-[9px] bg-[var(--surface-2)] px-3 py-2 text-left text-[13px]"
                    >
                      <span className="text-[var(--muted)]">{f.domain}</span>
                      <span className="font-semibold">{f.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <div className="mt-2.5 flex gap-2.5">
        <button
          type="button"
          onClick={onRetake}
          className="rounded-[10px] border border-[var(--accent)] px-4 py-2.5 text-[13.5px] font-semibold text-[var(--accent)]"
        >
          {t(lang, "retake")}
        </button>
        <button
          type="button"
          onClick={onViewHistory}
          className="rounded-[10px] border border-[var(--line)] px-4 py-2.5 text-[13.5px] font-semibold text-[var(--ink-2)]"
        >
          {t(lang, "viewHistory")}
        </button>
      </div>
    </motion.div>
  );
}
