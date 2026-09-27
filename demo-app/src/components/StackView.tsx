import { motion } from "framer-motion";
import { STACK } from "../data/stack";
import { t, type Lang } from "../data/strings";

export default function StackView({ lang }: { lang: Lang }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-6">
      <div>
        <h2 className="font-serif text-[19px] font-semibold">{t(lang, "stackTitle")}</h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{t(lang, "stackBody")}</p>
      </div>

      <div className="flex flex-col gap-4">
        {STACK.map((group, gi) => (
          <div key={group.title.en}>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[var(--faint)]">
              {group.title[lang]}
            </div>
            <div className="flex flex-col gap-1.5">
              {group.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: lang === "ar" ? 10 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (gi * group.items.length + i) * 0.05, duration: 0.25 }}
                  className="flex items-center justify-between gap-3 rounded-[10px] bg-[var(--surface-2)] px-3.5 py-2.5"
                >
                  <span className="font-mono text-[13px] font-medium">{item.name}</span>
                  <span className="text-right text-[12px] text-[var(--muted)]">{item.role[lang]}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
