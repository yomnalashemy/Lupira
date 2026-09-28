import { useQuery, useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { submitDiagnosis } from "../api/diagnosis";
import { getQuestions } from "../api/diagnosis";
import { ApiRequestError } from "../api/client";
import { AppNav } from "../components/AppNav";
import { Button, Card, FormError } from "../components/ui/Field";
import { useLang } from "../context/LangContext";
import { t } from "../lib/strings";
import type { DiagnosisResult } from "../api/types";

// Question 20 (renal biopsy class) only applies when Q19 (was a biopsy
// performed) is answered "Yes" — mirrors the same conditional the real
// backend enforces in submitResponsesAndDiagnose, kept in sync here so
// the form doesn't ask for — or require — a question that doesn't apply.
const CONDITIONAL_QUESTION = 20;
const TRIGGER_QUESTION = 19;
const TRIGGER_VALUES = ["Yes", "نعم"];

export default function Assessment() {
  const { lang } = useLang();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["questions", lang],
    queryFn: () => getQuestions(lang),
  });

  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [current, setCurrent] = React.useState(0);
  const [result, setResult] = React.useState<DiagnosisResult | null>(null);

  const submit = useMutation({
    mutationFn: (responses: { questionNumber: number; answer: string }[]) => submitDiagnosis(responses, lang),
    onSuccess: (res) => setResult(res.data),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <AppNav />
        <p className="p-10 text-center text-[var(--muted)]">{t(lang, "loading")}</p>
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="min-h-screen">
        <AppNav />
        <div className="p-10">
          <FormError message={error instanceof ApiRequestError ? error.message : t(lang, "somethingWentWrong")} />
        </div>
      </div>
    );
  }

  const questions = data.questions
    .slice()
    .sort((a, b) => a.questionNumber - b.questionNumber)
    .filter((q) => q.questionNumber !== CONDITIONAL_QUESTION || TRIGGER_VALUES.includes(answers[TRIGGER_QUESTION]));

  if (result) {
    const likely = result.code === 1;
    return (
      <div className="min-h-screen">
        <AppNav />
        <main className="mx-auto max-w-lg px-4 py-16 text-center">
          <Card>
            <p
              className="font-serif text-2xl"
              style={{ color: likely ? "var(--critical)" : "var(--good)" }}
            >
              {t(lang, likely ? "resultLikelyTitle" : "resultClearTitle")}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-2)]">{result.result}</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setResult(null);
                  setAnswers({});
                  setCurrent(0);
                }}
              >
                {t(lang, "retake")}
              </Button>
              <Button onClick={() => navigate("/history")}>{t(lang, "viewHistory")}</Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  const q = questions[current];
  const isLast = current === questions.length - 1;

  const answer = (option: string) => {
    setAnswers((a) => ({ ...a, [q.questionNumber]: option }));
  };

  const onNext = () => {
    if (isLast) {
      const responses = questions
        .filter((qq) => answers[qq.questionNumber] !== undefined)
        .map((qq) => ({ questionNumber: qq.questionNumber, answer: answers[qq.questionNumber] }));
      submit.mutate(responses);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  return (
    <div className="min-h-screen">
      <AppNav />
      <main className="mx-auto max-w-lg px-4 py-14">
        <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-[var(--faint)]">
          {t(lang, "questionOf")} {current + 1} {t(lang, "of")} {questions.length}
        </p>
        <div className="mb-6 h-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        <Card>
          <FormError message={submit.error instanceof ApiRequestError ? submit.error.message : null} />
          <p className="font-serif text-[19px] leading-snug text-[var(--ink)]">{q.questionText}</p>
          {q.explanation && <p className="mt-2 text-[13px] text-[var(--muted)]">{q.explanation}</p>}

          <div className="mt-5 flex flex-col gap-2">
            {q.options.map((opt) => {
              const selected = answers[q.questionNumber] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => answer(opt)}
                  className="rounded-[10px] border-[1.5px] px-4 py-3 text-left text-[14.5px] font-medium [[dir=rtl]_&]:text-right"
                  style={{
                    borderColor: selected ? "var(--accent)" : "var(--line)",
                    background: selected ? "var(--accent-wash)" : "var(--surface)",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
              {t(lang, "back")}
            </Button>
            <Button onClick={onNext} disabled={answers[q.questionNumber] === undefined} loading={submit.isPending}>
              {isLast ? t(lang, "submit") : t(lang, "next")}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
