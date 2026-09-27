import type { ResultData } from "./scoring";

export interface HistoryEntry {
  id: string;
  date: string;
  result: ResultData;
}

const STORE_KEY = "lupira-demo-history-v2";

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveHistoryEntry(result: ResultData): HistoryEntry[] {
  const entry: HistoryEntry = { id: crypto.randomUUID(), date: new Date().toISOString(), result };
  const next = [entry, ...loadHistory()];
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private mode, quota) — keep going in-memory only
  }
  return next;
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORE_KEY);
  } catch {
    // ignore
  }
}
