import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { QUESTIONS } from "../data/questions";
import { t, type Lang } from "../data/strings";
import type { Answer } from "../lib/scoring";

interface Props {
  lang: Lang;
  current: number;
  answers: (Answer | undefined)[];
  onAnswer: (optIndex: 0 | 1) => void;
  onBack: () => void;
}

export default function Questionnaire({ lang, current, answers, onAnswer, onBack }: Props) {
  const [explainOpen, setExplainOpen] = useState(false);
  useEffect(() => setExplainOpen(false), [current]);
  const q = QUESTIONS[current];
  const selected = answers[current]?.optIndex;
  const progress = ((current + (selected !== undefined ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(43,30,36,0.05),0_10px_28px_-14px_rgba(43,30,36,0.22)]">
      <div className="px-5 pt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-2)]">
          <motion.div
            className="h-full rounded-full bg-[var(--accent)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[11.5px] text-[var(--faint)]">
          <span className="font-mono tabular-nums">
            {current + 1} / {QUESTIONS.length}
          </span>
          <span>{t(lang, "progressHint")}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: lang === "ar" ? -16 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: lang === "ar" ? 16 : -16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex flex-col gap-4 px-6 pb-6 pt-5"
        >
          <div className="text-[11px] font-bold uppercase tracking-wide text-[var(--accent)]">
            {q.domain[lang]}
          </div>
          <div className="font-serif text-[19px] font-semibold leading-snug">{q.text[lang]}</div>

          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onAnswer(i as 0 | 1)}
                  className="flex items-center justify-between rounded-[11px] border-[1.5px] px-4 py-3.5 text-left text-[14.5px] font-medium transition-colors"
                  style={{
                    borderColor: isSelected ? "var(--accent)" : "var(--line)",
                    background: isSelected ? "var(--accent-wash)" : "var(--surface)",
                  }}
                >
                  {opt[lang]}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setExplainOpen((v) => !v)}
            className="flex items-center gap-1 self-start text-[12.5px] text-[var(--muted)] underline decoration-dotted underline-offset-4"
          >
            {t(lang, "explainToggle")}
            <ChevronDown className={`size-3.5 transition-transform ${explainOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {explainOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-[10px] bg-[var(--surface-2)] px-3.5 py-2.5 text-[13px] leading-relaxed text-[var(--ink-2)]">
                  {q.explain[lang]}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between border-t border-[var(--line)] px-6 py-3.5">
        <button
          type="button"
          onClick={onBack}
          disabled={current === 0}
          className="rounded-[10px] border border-[var(--line)] px-4 py-2 text-[13.5px] font-semibold text-[var(--ink-2)] disabled:opacity-40"
        >
          {t(lang, "back")}
        </button>
        <span />
      </div>
    </div>
  );
}
