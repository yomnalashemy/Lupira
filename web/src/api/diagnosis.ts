import { apiRequest } from "./client";
import type { DiagnosisResult, HistoryEntry, Lang, Question, QuestionAnswer } from "./types";

export function getQuestions(lang: Lang) {
  return apiRequest<{ success: true; questions: Question[] }>("/api/diagnosis/questions", { lang });
}

export function submitDiagnosis(responses: QuestionAnswer[], lang: Lang) {
  return apiRequest<{ success: true; message: string; data: DiagnosisResult }>("/api/diagnosis/detection", {
    method: "POST",
    body: { responses },
    lang,
  });
}

export function getHistory(lang: Lang) {
  return apiRequest<{ success: true; history: HistoryEntry[] }>("/api/diagnosis/history", { lang });
}

export function deleteHistoryEntry(id: string, lang: Lang) {
  return apiRequest<{ success: true; message: string }>(`/api/diagnosis/history/${id}`, {
    method: "DELETE",
    lang,
  });
}

export function deleteAllHistory(lang: Lang) {
  return apiRequest<{ success: true; message: string }>("/api/diagnosis/history", { method: "DELETE", lang });
}
