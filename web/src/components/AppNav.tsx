import { Link, useNavigate } from "react-router-dom";
import { logout as apiLogout } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";

export function AppNav() {
  const { lang, setLang } = useLang();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await apiLogout(lang);
    } catch {
      // logging out client-side regardless — the server has nothing
      // stateful to invalidate (bearer tokens, no session store)
    }
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link to="/" className="font-serif text-lg font-semibold text-[var(--accent)]">
          Lupira
        </Link>
        <nav className="flex items-center gap-5 text-[13px]">
          <Link to="/" className="text-[var(--ink-2)] hover:text-[var(--accent)]">
            {t(lang, "navHome")}
          </Link>
          <Link to="/history" className="text-[var(--ink-2)] hover:text-[var(--accent)]">
            {t(lang, "navHistory")}
          </Link>
          <Link to="/profile" className="text-[var(--ink-2)] hover:text-[var(--accent)]">
            {t(lang, "navProfile")}
          </Link>
          <div className="flex rounded-full border border-[var(--line)] p-0.5">
            {(["en", "ar"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className="rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase"
                style={{
                  background: lang === l ? "var(--accent)" : "transparent",
                  color: lang === l ? "var(--accent-ink)" : "var(--muted)",
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <button type="button" onClick={onLogout} className="text-[var(--faint)] hover:text-[var(--critical)]">
            {t(lang, "navLogout")}
          </button>
        </nav>
      </div>
    </header>
  );
}
