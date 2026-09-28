export type Lang = "en" | "ar";

// Mirrors models/user.model.js exactly — gender/country/ethnicity are
// stored in English regardless of UI language; the backend translates
// on read via translateProfileFields.toArabicIfNeeded.
export interface User {
  _id: number;
  username: string;
  email: string;
  gender?: string;
  country?: string;
  DateOfBirth?: string;
  phoneNumber?: string;
  ethnicity?: string;
  authProvider: "local" | "google" | "facebook";
  isVerified: boolean;
  profileCompleted: boolean;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: string;
  country: string;
  DateOfBirth: string;
  ethnicity: string;
}

export interface CompleteProfilePayload {
  username: string;
  phoneNumber: string;
  gender: string;
  country: string;
  DateOfBirth: string;
  ethnicity: string;
}

export interface LoginResponse {
  success: true;
  message: string;
  data: { token: string; user: User };
}

export interface ApiError {
  error: string;
}

// controllers/diagnosis.controller.js getAllQuestions
export interface Question {
  _id: string;
  questionNumber: number;
  questionText: string;
  options: string[];
  explanation?: string;
}

export interface QuestionAnswer {
  questionNumber: number;
  answer: string;
}

export interface DiagnosisResult {
  result: string; // human-readable message, already translated server-side
  code: 0 | 1;
}

// controllers/diagnosis.controller.js getDetectionHistory
export interface HistoryEntry {
  id: string;
  date: string;
  result: 0 | 1;
  resultLabel: string;
  responses: { question: string; answer: string }[];
}
