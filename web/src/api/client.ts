import type { Lang } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const TOKEN_KEY = "lupira_token";

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}
export function setToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // storage unavailable (private mode) — session just won't persist
  }
}

export class ApiRequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  lang?: Lang;
  /** for the one-off case (resetPassword) where the token comes from an
   * email link, not the logged-in session */
  tokenOverride?: string;
  skipAuth?: boolean;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, lang, tokenOverride, skipAuth } = options;

  const url = new URL(BASE_URL.replace(/\/$/, "") + path);
  if (lang) url.searchParams.set("lang", lang);

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = tokenOverride ?? (skipAuth ? null : getToken());
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const message = (payload && payload.error) || `Request failed (${res.status})`;
    throw new ApiRequestError(message, res.status);
  }

  return payload as T;
}
