import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Disclaimer from "./components/Disclaimer";
import HistoryView from "./components/HistoryView";
import IntroCard from "./components/IntroCard";
import LangToggle from "./components/LangToggle";
import Questionnaire from "./components/Questionnaire";
import ResultCard from "./components/ResultCard";
import StackView from "./components/StackView";
import { QUESTIONS } from "./data/questions";
import { t, type Lang } from "./data/strings";
import { buildAnswer, scoreAnswers, type Answer, type ResultData } from "./lib/scoring";
import { clearHistory, loadHistory, saveHistoryEntry, type HistoryEntry } from "./lib/storage";

type Tab = "assess" | "history" | "stack";
type AssessStage = "intro" | "quiz" | "result";

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [tab, setTab] = useState<Tab>("assess");
  const [stage, setStage] = useState<AssessStage>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(Answer | undefined)[]>(() => Array(QUESTIONS.length).fill(undefined));
  const [result, setResult] = useState<ResultData | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());

  useEffect(() => {
    document.body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  const handleAnswer = (optIndex: 0 | 1) => {
    const q = QUESTIONS[current];
    const next = [...answers];
    next[current] = buildAnswer(q, optIndex, lang);
    setAnswers(next);

    if (current < QUESTIONS.length - 1) {
      setTimeout(() => setCurrent((c) => c + 1), 180);
    } else {
      setTimeout(() => {
        const scored = scoreAnswers(next);
        setResult(scored);
        setHistory(saveHistoryEntry(scored));
        setStage("result");
      }, 180);
    }
  };

  const handleBack = () => setCurrent((c) => Math.max(0, c - 1));

  const handleRetake = () => {
    setAnswers(Array(QUESTIONS.length).fill(undefined));
    setCurrent(0);
    setResult(null);
    setStage("intro");
  };

  const handleClearAll = () => {
    clearHistory();
    setHistory([]);
  };

  const handleDeleteOne = (id: string) => {
    const next = history.filter((h) => h.id !== id);
    setHistory(next);
    try {
      localStorage.setItem("lupira-demo-history-v2", JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-4 px-4 py-5 sm:px-0">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className="grid size-9 shrink-0 place-items-center rounded-[10px] font-serif text-[18px] font-bold text-white"
            style={{ background: "linear-gradient(155deg, var(--accent), #5c1c36)" }}
          >
            L
          </div>
          <h1 className="font-serif text-[20px] font-semibold">Lupira</h1>
        </div>
        <LangToggle lang={lang} onChange={setLang} />
      </header>

      <Disclaimer lang={lang} />

      <div className="flex gap-1 rounded-[11px] border border-[var(--line)] bg-[var(--surface-2)] p-1">
        {(["assess", "history", "stack"] as const).map((tb) => (
          <button
            key={tb}
            type="button"
            onClick={() => setTab(tb)}
            className="flex-1 rounded-[8px] py-2 text-[13px] font-semibold transition-colors"
            style={{
              background: tab === tb ? "var(--surface)" : "transparent",
              color: tab === tb ? "var(--accent)" : "var(--muted)",
              boxShadow: tab === tb ? "0 1px 2px rgba(43,30,36,0.05), 0 10px 28px -14px rgba(43,30,36,0.22)" : "none",
            }}
          >
            {t(lang, tb === "assess" ? "tabAssess" : tb === "history" ? "tabHistory" : "tabStack")}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "assess" && (
          <motion.div key="assess" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {stage === "intro" && <IntroCard lang={lang} onStart={() => setStage("quiz")} />}
            {stage === "quiz" && (
              <Questionnaire lang={lang} current={current} answers={answers} onAnswer={handleAnswer} onBack={handleBack} />
            )}
            {stage === "result" && result && (
              <ResultCard lang={lang} result={result} onRetake={handleRetake} onViewHistory={() => setTab("history")} />
            )}
          </motion.div>
        )}

        {tab === "history" && (
          <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HistoryView lang={lang} history={history} onDelete={handleDeleteOne} onClearAll={handleClearAll} />
          </motion.div>
        )}

        {tab === "stack" && (
          <motion.div key="stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StackView lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
