import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";

export function ProtectedRoute() {
  const { user, initializing } = useAuth();
  const { lang } = useLang();

  if (initializing) {
    return <div className="flex min-h-screen items-center justify-center text-[var(--muted)]">{t(lang, "loading")}</div>;
  }
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
