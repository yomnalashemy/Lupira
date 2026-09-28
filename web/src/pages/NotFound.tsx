import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";

export default function NotFound() {
  const { lang } = useLang();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
      <p className="font-serif text-2xl text-[var(--ink)]">{t(lang, "notFoundTitle")}</p>
      <p className="text-[14px] text-[var(--muted)]">{t(lang, "notFoundBody")}</p>
      <Link to="/" className="mt-2 text-[13px] font-semibold text-[var(--accent)]">
        {t(lang, "goHome")}
      </Link>
    </div>
  );
}
