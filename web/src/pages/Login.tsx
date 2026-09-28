import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { ApiRequestError } from "../api/client";
import { AuthLayout } from "../components/AuthLayout";
import { Button, Field, FormError, Input } from "../components/ui/Field";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";

export default function Login() {
  const { lang } = useLang();
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(email, password, lang);
      loginWithToken(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : t(lang, "somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={t(lang, "login")}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormError message={error} />
        <Field label={t(lang, "email")}>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </Field>
        <Field label={t(lang, "password")}>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Field>
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-[12.5px] text-[var(--accent)]">
            {t(lang, "forgotPassword")}
          </Link>
        </div>
        <Button type="submit" loading={loading}>
          {t(lang, "login")}
        </Button>
      </form>

      <p className="mt-6 text-center text-[13px] text-[var(--muted)]">
        {t(lang, "noAccount")}{" "}
        <Link to="/signup" className="font-semibold text-[var(--accent)]">
          {t(lang, "signup")}
        </Link>
      </p>
    </AuthLayout>
  );
}
