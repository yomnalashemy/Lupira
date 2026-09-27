import type { Lang } from "./strings";

export interface StackItem {
  name: string;
  role: { en: string; ar: string };
}

export interface StackGroup {
  title: { en: string; ar: string };
  items: StackItem[];
}

// The real stack, pulled straight from each service's own dependency
// manifest (Lupira's package.json, AI/requirements.txt) — not a generic
// "tools I know" list.
export const STACK: StackGroup[] = [
  {
    title: { en: "Client", ar: "الواجهة" },
    items: [
      { name: "Flutter", role: { en: "the real mobile app", ar: "التطبيق الحقيقي للهاتف" } },
      { name: "React + TypeScript", role: { en: "this demo, running in your browser", ar: "هذا العرض، يعمل في متصفحك" } },
    ],
  },
  {
    title: { en: "API", ar: "الخادم" },
    items: [
      { name: "Node.js / Express", role: { en: "auth, questions, diagnosis routes", ar: "التوثيق، الأسئلة، مسارات التشخيص" } },
      { name: "MongoDB / Mongoose", role: { en: "users, questions, diagnosis history", ar: "المستخدمون، الأسئلة، سجل التشخيص" } },
      { name: "JWT + Passport", role: { en: "session auth, Google/Facebook login", ar: "توثيق الجلسة، تسجيل الدخول عبر جوجل/فيسبوك" } },
      { name: "Bull + Redis", role: { en: "background email/queue jobs", ar: "مهام البريد الخلفية" } },
    ],
  },
  {
    title: { en: "AI model", ar: "نموذج الذكاء الاصطناعي" },
    items: [
      { name: "Python / FastAPI", role: { en: "standalone prediction service", ar: "خدمة تنبؤ مستقلة" } },
      { name: "scikit-learn (SVM)", role: { en: "trained on 24 clinical criteria", ar: "مدرّب على 24 معيارًا سريريًا" } },
    ],
  },
];

export function stackLangKey<T extends { en: string; ar: string }>(field: T, lang: Lang): string {
  return field[lang];
}
