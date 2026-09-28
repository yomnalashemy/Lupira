import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { deleteAllHistory, deleteHistoryEntry, getHistory } from "../api/diagnosis";
import { ApiRequestError } from "../api/client";
import { AppNav } from "../components/AppNav";
import { Card, FormError } from "../components/ui/Field";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";

export default function History() {
  const { lang } = useLang();
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["history", lang],
    queryFn: () => getHistory(lang),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["history"] });
  const deleteOne = useMutation({ mutationFn: (id: string) => deleteHistoryEntry(id, lang), onSuccess: invalidate });
  const deleteAll = useMutation({ mutationFn: () => deleteAllHistory(lang), onSuccess: invalidate });

  return (
    <div className="min-h-screen">
      <AppNav />
      <main className="mx-auto max-w-lg px-4 py-14">
        <div className="mb-6 flex items-center justify-between">
          <p className="font-serif text-[22px] text-[var(--ink)]">{t(lang, "historyTitle")}</p>
          {!!data?.history.length && (
            <button
              type="button"
              onClick={() => {
                if (confirm(t(lang, "confirmClearAll"))) deleteAll.mutate();
              }}
              className="text-[12.5px] text-[var(--critical)]"
            >
              {t(lang, "clearAll")}
            </button>
          )}
        </div>

        {isLoading && <p className="text-[var(--muted)]">{t(lang, "loading")}</p>}
        <FormError message={error instanceof ApiRequestError ? error.message : null} />

        {data?.history.length === 0 && <p className="text-[14px] text-[var(--muted)]">{t(lang, "historyEmpty")}</p>}

        <div className="flex flex-col gap-3">
          {data?.history.map((entry) => (
            <Card key={entry.id} className="flex items-center justify-between p-5">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: entry.result === 1 ? "var(--critical)" : "var(--good)" }}
                  />
                  <span className="text-[13.5px] font-semibold text-[var(--ink)]">
                    {new Date(entry.date).toLocaleDateString(lang === "ar" ? "ar" : "en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] text-[var(--faint)]">{entry.resultLabel}</p>
              </div>
              <button
                type="button"
                onClick={() => deleteOne.mutate(entry.id)}
                className="rounded-md p-1.5 text-[var(--faint)] hover:text-[var(--critical)]"
                aria-label={t(lang, "deleteEntry")}
              >
                <X className="size-4" />
              </button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
