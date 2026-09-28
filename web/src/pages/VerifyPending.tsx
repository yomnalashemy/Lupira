import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";

export default function VerifyPending() {
  const { lang } = useLang();
  return (
    <AuthLayout title={t(lang, "verifyPendingTitle")}>
      <p className="text-[14px] leading-relaxed text-[var(--ink-2)]">{t(lang, "verifyPendingBody")}</p>
      <Link to="/login" className="mt-6 inline-block text-[13px] font-semibold text-[var(--accent)]">
        {t(lang, "backToLogin")}
      </Link>
    </AuthLayout>
  );
}
