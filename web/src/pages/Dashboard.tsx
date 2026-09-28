import { Link } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { Card } from "../components/ui/Field";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";

export default function Dashboard() {
  const { lang } = useLang();
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <AppNav />
      <main className="mx-auto max-w-3xl px-4 py-14">
        <p className="font-serif text-[26px] text-[var(--ink)]">
          {t(lang, "dashboardGreeting")}, {user?.username}.
        </p>
        <p className="mt-2 max-w-md text-[14px] text-[var(--muted)]">{t(lang, "dashboardBody")}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link to="/assessment">
            <Card className="h-full transition-transform hover:-translate-y-0.5">
              <p className="font-serif text-lg text-[var(--ink)]">{t(lang, "startAssessment")}</p>
              <p className="mt-1 text-[13px] text-[var(--muted)]">{t(lang, "assessmentDisclaimer")}</p>
            </Card>
          </Link>
          <Link to="/history">
            <Card className="h-full transition-transform hover:-translate-y-0.5">
              <p className="font-serif text-lg text-[var(--ink)]">{t(lang, "viewHistory")}</p>
              <p className="mt-1 text-[13px] text-[var(--muted)]">{t(lang, "historyTitle")}</p>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
