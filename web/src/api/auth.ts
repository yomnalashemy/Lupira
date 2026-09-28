import { apiRequest } from "./client";
import type { CompleteProfilePayload, Lang, LoginResponse, SignupPayload } from "./types";

export function signup(payload: SignupPayload, lang: Lang) {
  return apiRequest<{ success: true; message: string; pendingVerification: true }>("/api/auth/signup", {
    method: "POST",
    body: payload,
    lang,
    skipAuth: true,
  });
}

export function login(email: string, password: string, lang: Lang) {
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: { email, password },
    lang,
    skipAuth: true,
  });
}

export function logout(lang: Lang) {
  return apiRequest<{ success: true; message: string }>("/api/auth/logout", { method: "POST", lang });
}

export function forgotPassword(email: string, lang: Lang) {
  return apiRequest<{ success: true; message: string }>("/api/auth/password/forgot", {
    method: "POST",
    body: { email },
    lang,
    skipAuth: true,
  });
}

/** token comes from the email link's ?token=, not the logged-in session */
export function resetPassword(token: string, newPassword: string, confirmNewPassword: string, lang: Lang) {
  return apiRequest<{ success: true; message: string }>("/api/auth/password/reset", {
    method: "POST",
    body: { newPassword, confirmNewPassword },
    lang,
    tokenOverride: token,
  });
}

export function changePassword(oldPassword: string, newPassword: string, confirmNewPassword: string, lang: Lang) {
  return apiRequest<{ success: true; message: string }>("/api/auth/password", {
    method: "PATCH",
    body: { oldPassword, newPassword, confirmNewPassword },
    lang,
  });
}

export function deleteAccount(lang: Lang) {
  return apiRequest<{ success: true; message: string }>("/api/auth/delete", { method: "DELETE", lang });
}

export function loginWithGoogle(idToken: string) {
  return apiRequest<{ success: true; token: string; user: unknown }>("/api/auth/google/login", {
    method: "POST",
    body: { token: idToken },
    skipAuth: true,
  });
}

export function signUpWithGoogle(idToken: string) {
  return apiRequest<{ success: true; message: string; token: string }>("/api/auth/google/signup", {
    method: "POST",
    body: { token: idToken },
    skipAuth: true,
  });
}

/** the temp token from signUpWithGoogle/Facebook, not a real session yet */
export function completeProfile(tempToken: string, payload: CompleteProfilePayload) {
  return apiRequest<{ success: true; token: string; user: unknown }>("/api/auth/complete-profile", {
    method: "POST",
    body: payload,
    tokenOverride: tempToken,
  });
}
