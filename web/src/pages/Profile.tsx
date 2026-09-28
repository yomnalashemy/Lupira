import * as React from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, deleteAccount as apiDeleteAccount } from "../api/auth";
import { ApiRequestError } from "../api/client";
import { editProfile } from "../api/profile";
import { AppNav } from "../components/AppNav";
import { Button, Card, Field, FormError, Input, Select } from "../components/ui/Field";
import { COUNTRIES, ETHNICITIES, GENDERS } from "../data/profileOptions";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";

export default function Profile() {
  const { lang } = useLang();
  const { user, refreshProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    username: user?.username ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    gender: user?.gender ?? "",
    country: user?.country ?? "",
    DateOfBirth: user?.DateOfBirth ? user.DateOfBirth.slice(0, 10) : "",
    ethnicity: user?.ethnicity ?? "",
  });
  const [profileMsg, setProfileMsg] = React.useState<{ ok: boolean; text: string } | null>(null);
  const [profileLoading, setProfileLoading] = React.useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileLoading(true);
    try {
      const res = await editProfile(form, lang);
      await refreshProfile(lang);
      setProfileMsg({ ok: true, text: res.message });
    } catch (err) {
      setProfileMsg({ ok: false, text: err instanceof ApiRequestError ? err.message : t(lang, "somethingWentWrong") });
    } finally {
      setProfileLoading(false);
    }
  };

  const [pw, setPw] = React.useState({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
  const [pwMsg, setPwMsg] = React.useState<{ ok: boolean; text: string } | null>(null);
  const [pwLoading, setPwLoading] = React.useState(false);

  const onChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    setPwLoading(true);
    try {
      const res = await changePassword(pw.oldPassword, pw.newPassword, pw.confirmNewPassword, lang);
      setPwMsg({ ok: true, text: res.message });
      setPw({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err) {
      setPwMsg({ ok: false, text: err instanceof ApiRequestError ? err.message : t(lang, "somethingWentWrong") });
    } finally {
      setPwLoading(false);
    }
  };

  const [deleting, setDeleting] = React.useState(false);
  const onDeleteAccount = async () => {
    if (!confirm(t(lang, "confirmDeleteAccount"))) return;
    setDeleting(true);
    try {
      await apiDeleteAccount(lang);
      logout();
      navigate("/login");
    } catch {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AppNav />
      <main className="mx-auto flex max-w-lg flex-col gap-6 px-4 py-14">
        <p className="font-serif text-[22px] text-[var(--ink)]">{t(lang, "profileTitle")}</p>

        <Card>
          <form onSubmit={onSaveProfile} className="flex flex-col gap-4">
            {profileMsg && (
              <p className="text-[13px]" style={{ color: profileMsg.ok ? "var(--good)" : "var(--critical)" }}>
                {profileMsg.text}
              </p>
            )}
            <Field label={t(lang, "username")}>
              <Input value={form.username} onChange={update("username")} />
            </Field>
            <Field label={t(lang, "phoneNumber")}>
              <Input type="tel" value={form.phoneNumber} onChange={update("phoneNumber")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t(lang, "gender")}>
                <Select value={form.gender} onChange={update("gender")}>
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={t(lang, "dateOfBirth")}>
                <Input type="date" value={form.DateOfBirth} onChange={update("DateOfBirth")} />
              </Field>
            </div>
            <Field label={t(lang, "country")}>
              <Select value={form.country} onChange={update("country")}>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={t(lang, "ethnicity")}>
              <Select value={form.ethnicity} onChange={update("ethnicity")}>
                {ETHNICITIES.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </Select>
            </Field>
            <Button type="submit" loading={profileLoading}>
              {t(lang, "saveChanges")}
            </Button>
          </form>
        </Card>

        <Card>
          <p className="mb-4 font-serif text-[17px] text-[var(--ink)]">{t(lang, "changePassword")}</p>
          <form onSubmit={onChangePassword} className="flex flex-col gap-4">
            <FormError message={pwMsg && !pwMsg.ok ? pwMsg.text : null} />
            {pwMsg?.ok && <p className="text-[13px] text-[var(--good)]">{pwMsg.text}</p>}
            <Field label={t(lang, "oldPassword")}>
              <Input
                type="password"
                required
                value={pw.oldPassword}
                onChange={(e) => setPw((p) => ({ ...p, oldPassword: e.target.value }))}
                autoComplete="current-password"
              />
            </Field>
            <Field label={t(lang, "newPassword")}>
              <Input
                type="password"
                required
                value={pw.newPassword}
                onChange={(e) => setPw((p) => ({ ...p, newPassword: e.target.value }))}
                autoComplete="new-password"
              />
            </Field>
            <Field label={t(lang, "confirmPassword")}>
              <Input
                type="password"
                required
                value={pw.confirmNewPassword}
                onChange={(e) => setPw((p) => ({ ...p, confirmNewPassword: e.target.value }))}
                autoComplete="new-password"
              />
            </Field>
            <Button type="submit" loading={pwLoading}>
              {t(lang, "changePassword")}
            </Button>
          </form>
        </Card>

        <Card className="border-[var(--critical)]/30">
          <p className="mb-3 font-serif text-[17px] text-[var(--critical)]">{t(lang, "dangerZone")}</p>
          <Button variant="danger" onClick={onDeleteAccount} loading={deleting}>
            {t(lang, "deleteAccount")}
          </Button>
        </Card>
      </main>
    </div>
  );
}
