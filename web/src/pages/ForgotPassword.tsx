import * as React from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/auth";
import { ApiRequestError } from "../api/client";
import { AuthLayout } from "../components/AuthLayout";
import { Button, Field, FormError, Input } from "../components/ui/Field";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";

export default function ForgotPassword() {
  const { lang } = useLang();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await forgotPassword(email, lang);
      setSent(true);
    } catch (err) {
      // Deliberately still show "check your email" even on a 404 (the
      // backend's forgotPassword returns one for unknown emails) — a
      // password-reset form that confirms whether an email is registered
      // is a real account-enumeration issue, not a UX nicety.
      if (err instanceof ApiRequestError && err.status === 404) {
        setSent(true);
      } else {
        setError(err instanceof ApiRequestError ? err.message : t(lang, "somethingWentWrong"));
      }
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout title={t(lang, "resetSentTitle")}>
        <p className="text-[14px] leading-relaxed text-[var(--ink-2)]">{t(lang, "resetSentBody")}</p>
        <Link to="/login" className="mt-6 inline-block text-[13px] font-semibold text-[var(--accent)]">
          {t(lang, "backToLogin")}
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t(lang, "forgotTitle")} subtitle={t(lang, "forgotBody")}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormError message={error} />
        <Field label={t(lang, "email")}>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </Field>
        <Button type="submit" loading={loading}>
          {t(lang, "sendResetLink")}
        </Button>
      </form>
    </AuthLayout>
  );
}
