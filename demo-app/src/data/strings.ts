export type Lang = "en" | "ar";

export const STR = {
  en: {
    disclaimerStrong: "Not a diagnostic tool.",
    disclaimer:
      "This mini demo mirrors the real Lupira flow — plain-language questions about symptoms and lab results, translated by the same kind of model into a lupus-likelihood result — for portfolio purposes only.",
    tabAssess: "Assessment",
    tabHistory: "History",
    tabStack: "Stack",
    introTitle: "A quick symptom check",
    introBody:
      "Ten short questions about symptoms and lab results, each with a plain-language explanation. Your answers are translated into a lupus-likelihood result, the same way the real app's model works.",
    introStart: "Start assessment",
    progressHint: "Answer to continue",
    explainToggle: "What does this mean?",
    back: "Back",
    whyToggle: "See what stood out",
    retake: "Retake",
    viewHistory: "View history",
    clearAll: "Clear all",
    resultLikelyTitle: "Lupus signs detected",
    resultLikelySub:
      "Several of your answers line up with patterns the model flags — share this with a rheumatologist.",
    resultClearTitle: "You're all clear",
    resultClearSub: "Nothing in your answers matched the patterns the model looks for right now.",
    historyEmpty: "No assessments yet — run one from the Assessment tab.",
    historyAnswers: "answers",
    stackTitle: "What's actually running this",
    stackBody:
      "The real Lupira: a Flutter app talking to a Node/Express + MongoDB backend, which calls out to a standalone Python service serving a scikit-learn SVM trained on 24 clinical criteria. This demo is the same question set and scoring logic, ported to React, running fully client-side.",
  },
  ar: {
    disclaimerStrong: "ليست أداة تشخيص.",
    disclaimer:
      "هذا العرض المصغر يحاكي تدفق Lupira الحقيقي — أسئلة بلغة بسيطة عن الأعراض ونتائج التحاليل، تتم ترجمتها بواسطة نفس نوع النموذج إلى نتيجة احتمالية للذئبة — لأغراض العرض فقط.",
    tabAssess: "التقييم",
    tabHistory: "السجل",
    tabStack: "التقنيات",
    introTitle: "فحص سريع للأعراض",
    introBody:
      "عشرة أسئلة قصيرة عن الأعراض ونتائج التحاليل، مع شرح مبسط لكل سؤال. تُترجم إجاباتك إلى نتيجة احتمالية للذئبة، بنفس طريقة عمل نموذج التطبيق الحقيقي.",
    introStart: "ابدأ التقييم",
    progressHint: "أجب للمتابعة",
    explainToggle: "ماذا يعني هذا؟",
    back: "رجوع",
    whyToggle: "ما الذي برز في إجاباتك",
    retake: "إعادة",
    viewHistory: "عرض السجل",
    clearAll: "مسح الكل",
    resultLikelyTitle: "تم رصد مؤشرات للذئبة",
    resultLikelySub: "عدة إجابات تتوافق مع أنماط يرصدها النموذج — شاركي هذا مع طبيب روماتيزم.",
    resultClearTitle: "لا توجد مؤشرات",
    resultClearSub: "لم تتطابق إجاباتك مع الأنماط التي يبحث عنها النموذج حاليًا.",
    historyEmpty: "لا توجد تقييمات بعد — ابدئي واحدًا من تبويب التقييم.",
    historyAnswers: "إجابة",
    stackTitle: "ما الذي يُشغّل هذا فعليًا",
    stackBody:
      "تطبيق Lupira الحقيقي: تطبيق Flutter يتواصل مع خادم Node/Express وقاعدة بيانات MongoDB، والذي يستدعي خدمة Python مستقلة تُشغّل نموذج SVM من scikit-learn مدرّبًا على 24 معيارًا سريريًا. هذا العرض يستخدم نفس الأسئلة ومنطق التقييم، منقولًا إلى React، ويعمل بالكامل من طرف المتصفح.",
  },
} satisfies Record<Lang, Record<string, string>>;

export function t(lang: Lang, key: keyof (typeof STR)["en"]): string {
  return STR[lang][key] ?? STR.en[key];
}
