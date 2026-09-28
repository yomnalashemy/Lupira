import * as React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/auth";
import { ApiRequestError } from "../api/client";
import { AuthLayout } from "../components/AuthLayout";
import { Button, Field, FormError, Input } from "../components/ui/Field";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";

export default function ResetPassword() {
  const { lang } = useLang();
  const [params] = useSearchParams();
  const token = params.get("token");

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  if (!token) {
    return (
      <AuthLayout title={t(lang, "resetTitle")}>
        <FormError message={t(lang, "resetInvalidLink")} />
        <Link to="/forgot-password" className="mt-6 inline-block text-[13px] font-semibold text-[var(--accent)]">
          {t(lang, "forgotPassword")}
        </Link>
      </AuthLayout>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await resetPassword(token, newPassword, confirmNewPassword, lang);
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : t(lang, "somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <AuthLayout title={t(lang, "resetTitle")}>
        <p className="text-[14px] leading-relaxed text-[var(--good)]">{t(lang, "resetSuccess")}</p>
        <Link to="/login" className="mt-6 inline-block text-[13px] font-semibold text-[var(--accent)]">
          {t(lang, "login")}
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t(lang, "resetTitle")}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormError message={error} />
        <Field label={t(lang, "newPassword")}>
          <Input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
        </Field>
        <Field label={t(lang, "confirmPassword")}>
          <Input
            type="password"
            required
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            autoComplete="new-password"
          />
        </Field>
        <Button type="submit" loading={loading}>
          {t(lang, "setNewPassword")}
        </Button>
      </form>
    </AuthLayout>
  );
}
