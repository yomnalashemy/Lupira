import { apiRequest } from "./client";
import type { Lang, User } from "./types";

export function getProfile(lang: Lang) {
  return apiRequest<{ success: true; data: User }>("/api/users/profile", { lang });
}

export function editProfile(payload: Partial<User>, lang: Lang) {
  return apiRequest<{ success: true; message: string; data?: User }>("/api/users/profile", {
    method: "PUT",
    body: payload,
    lang,
  });
}
