import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { t, type Lang } from "../data/strings";

export default function IntroCard({ lang, onStart }: { lang: Lang; onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-7 py-8 text-center shadow-[0_1px_2px_rgba(43,30,36,0.05),0_10px_28px_-14px_rgba(43,30,36,0.22)]"
    >
      <div className="grid size-14 place-items-center rounded-2xl bg-[var(--accent-wash)] text-[var(--accent)]">
        <Stethoscope className="size-6" />
      </div>
      <h2 className="font-serif text-[22px] font-semibold">{t(lang, "introTitle")}</h2>
      <p className="max-w-[44ch] text-[14px] leading-relaxed text-[var(--muted)]">{t(lang, "introBody")}</p>
      <button
        type="button"
        onClick={onStart}
        className="rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-[14px] font-semibold text-[var(--accent-ink)] transition-opacity hover:opacity-90"
      >
        {t(lang, "introStart")}
      </button>
    </motion.div>
  );
}
