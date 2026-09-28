import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { ApiRequestError } from "../api/client";
import { AuthLayout } from "../components/AuthLayout";
import { Button, Field, FormError, Input, Select } from "../components/ui/Field";
import { COUNTRIES, ETHNICITIES, GENDERS } from "../data/profileOptions";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";

const initialForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  gender: "",
  country: "",
  DateOfBirth: "",
  ethnicity: "",
};

export default function Signup() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [form, setForm] = React.useState(initialForm);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(form, lang);
      navigate("/verify-pending");
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : t(lang, "somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={t(lang, "signup")}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormError message={error} />
        <Field label={t(lang, "username")}>
          <Input required minLength={5} maxLength={50} value={form.username} onChange={update("username")} />
        </Field>
        <Field label={t(lang, "email")}>
          <Input type="email" required value={form.email} onChange={update("email")} autoComplete="email" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t(lang, "password")}>
            <Input type="password" required value={form.password} onChange={update("password")} autoComplete="new-password" />
          </Field>
          <Field label={t(lang, "confirmPassword")}>
            <Input
              type="password"
              required
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              autoComplete="new-password"
            />
          </Field>
        </div>
        <p className="-mt-2 text-[11.5px] text-[var(--faint)]">
          8+ characters, upper &amp; lower case, a number, and a symbol.
        </p>

        <Field label={t(lang, "phoneNumber")}>
          <Input type="tel" required placeholder="+20 1XX XXX XXXX" value={form.phoneNumber} onChange={update("phoneNumber")} />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label={t(lang, "gender")}>
            <Select required value={form.gender} onChange={update("gender")}>
              <option value="">{t(lang, "selectPlaceholder")}</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t(lang, "dateOfBirth")}>
            <Input type="date" required value={form.DateOfBirth} onChange={update("DateOfBirth")} />
          </Field>
        </div>

        <Field label={t(lang, "country")}>
          <Select required value={form.country} onChange={update("country")}>
            <option value="">{t(lang, "selectPlaceholder")}</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>

        <Field label={t(lang, "ethnicity")}>
          <Select required value={form.ethnicity} onChange={update("ethnicity")}>
            <option value="">{t(lang, "selectPlaceholder")}</option>
            {ETHNICITIES.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </Select>
        </Field>

        <Button type="submit" loading={loading} className="mt-2">
          {t(lang, "signup")}
        </Button>
      </form>

      <p className="mt-6 text-center text-[13px] text-[var(--muted)]">
        {t(lang, "haveAccount")}{" "}
        <Link to="/login" className="font-semibold text-[var(--accent)]">
          {t(lang, "login")}
        </Link>
      </p>
    </AuthLayout>
  );
}
