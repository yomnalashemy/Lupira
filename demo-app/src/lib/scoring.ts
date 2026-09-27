import type { Question } from "../data/questions";
import type { Lang } from "../data/strings";

export interface Answer {
  optIndex: 0 | 1;
  flag: boolean;
  domain: string;
  label: string;
}

export interface ResultData {
  likely: boolean;
  flagged: { domain: string; label: string }[];
  count: number;
}

// Ported verbatim from the original demo's threshold: 3+ flagged answers
// out of 10 reads as "likely" — kept identical so the result behavior
// doesn't quietly drift between the old and new demo.
const LIKELY_THRESHOLD = 3;

export function scoreAnswers(answers: (Answer | undefined)[]): ResultData {
  const flagged = answers.filter((a): a is Answer => !!a?.flag);
  return {
    likely: flagged.length >= LIKELY_THRESHOLD,
    flagged: flagged.map((a) => ({ domain: a.domain, label: a.label })),
    count: flagged.length,
  };
}

export function buildAnswer(question: Question, optIndex: 0 | 1, lang: Lang): Answer {
  const opt = question.options[optIndex];
  return {
    optIndex,
    flag: opt.flag,
    domain: question.domain.en,
    label: opt[lang],
  };
}
