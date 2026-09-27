export interface Question {
  domain: { en: string; ar: string };
  text: { en: string; ar: string };
  options: [
    { en: string; ar: string; flag: boolean },
    { en: string; ar: string; flag: boolean },
  ];
  explain: { en: string; ar: string };
}

// Ten of the real app's 27 criteria — same domains the EULAR/ACR-mapped
// model in `AI/app.py` scores on (Model_p11.pkl, 24 features), trimmed to
// an illustrative subset for a mini demo. Not the live model — see the
// disclaimer in App.tsx.
export const QUESTIONS: Question[] = [
  {
    domain: { en: "Entry criterion", ar: "معيار الدخول" },
    text: {
      en: "What is the result of your ANA (anti-nuclear antibody) lab test?",
      ar: "ما هي نتيجة الفحص المخبري للأجسام المضادة للنواة (ANA)؟",
    },
    options: [
      { en: "Positive", ar: "إيجابي", flag: true },
      { en: "Negative", ar: "سلبي", flag: false },
    ],
    explain: {
      en: "A blood test for antibodies in your blood — a titer greater than 1:80 counts as positive.",
      ar: "اختبار دم للأجسام المضادة — إذا كانت النسبة أكبر من 1:80 فالنتيجة إيجابية.",
    },
  },
  {
    domain: { en: "Constitutional", ar: "أعراض عامة" },
    text: {
      en: "Have you had unexplained, recurring fever above 38°C?",
      ar: "هل أُصبت بحمى متكررة غير مبررة فوق 38 درجة مئوية؟",
    },
    options: [
      { en: "Yes", ar: "نعم", flag: true },
      { en: "No", ar: "لا", flag: false },
    ],
    explain: {
      en: "Fevers without an obvious infection can signal an overactive immune system.",
      ar: "الحمى بدون عدوى واضحة قد تشير إلى فرط نشاط الجهاز المناعي.",
    },
  },
  {
    domain: { en: "Hematologic", ar: "أمراض الدم" },
    text: {
      en: "On a recent complete blood count (CBC), was your white blood cell count low?",
      ar: "في آخر تعداد دم كامل (CBC)، هل كان تعداد خلايا الدم البيضاء منخفضًا؟",
    },
    options: [
      { en: "Low", ar: "منخفض", flag: true },
      { en: "Normal", ar: "طبيعي", flag: false },
    ],
    explain: {
      en: "Leukopenia — a low white cell count — can happen when the immune system attacks its own cells.",
      ar: "نقص الكريات البيضاء يعني انخفاض عددها بسبب هجوم المناعة على خلاياها.",
    },
  },
  {
    domain: { en: "Mucocutaneous", ar: "الجلد والأغشية" },
    text: {
      en: "Have you noticed unusual hair loss, with the scalp looking otherwise normal?",
      ar: "هل لاحظت تساقطًا غير معتاد للشعر مع بقاء فروة الرأس طبيعية؟",
    },
    options: [
      { en: "Yes", ar: "نعم", flag: true },
      { en: "No", ar: "لا", flag: false },
    ],
    explain: {
      en: "This kind of hair loss can occur when lupus affects the hair follicles — it often grows back.",
      ar: "يحدث هذا النوع عندما يؤثر المرض على بصيلات الشعر، وغالبًا ما ينمو الشعر مجددًا.",
    },
  },
  {
    domain: { en: "Mucocutaneous", ar: "الجلد والأغشية" },
    text: {
      en: "Have you had painful sores in your mouth, especially on the palate?",
      ar: "هل عانيت من تقرحات مؤلمة في الفم، خاصة في سقف الحلق؟",
    },
    options: [
      { en: "Yes", ar: "نعم", flag: true },
      { en: "No", ar: "لا", flag: false },
    ],
    explain: {
      en: "These are painful mouth ulcers that can appear during a flare.",
      ar: "تقرحات مؤلمة قد تظهر في الفم خلال نوبة المرض.",
    },
  },
  {
    domain: { en: "Mucocutaneous", ar: "الجلد والأغشية" },
    text: {
      en: "Have you noticed a rash across your cheeks and nose — sometimes called a butterfly rash?",
      ar: "هل لاحظت طفحًا جلديًا على خديك وأنفك يُعرف بطفح الفراشة؟",
    },
    options: [
      { en: "Yes", ar: "نعم", flag: true },
      { en: "No", ar: "لا", flag: false },
    ],
    explain: {
      en: "A distinctive rash across the cheeks and bridge of the nose, shaped like a butterfly.",
      ar: "طفح جلدي مميز يظهر على الخدين وجسر الأنف على شكل فراشة.",
    },
  },
  {
    domain: { en: "Musculoskeletal", ar: "العضلات والمفاصل" },
    text: {
      en: "Do you have joint pain or swelling that moves from one joint to another?",
      ar: "هل تعانين من ألم أو تورم في المفاصل ينتقل من مفصل لآخر؟",
    },
    options: [
      { en: "Yes", ar: "نعم", flag: true },
      { en: "No", ar: "لا", flag: false },
    ],
    explain: {
      en: "Lupus often causes joint pain and swelling that migrates between joints.",
      ar: "غالبًا ما يسبب المرض ألمًا وتورمًا في المفاصل ينتقل بينها.",
    },
  },
  {
    domain: { en: "Serosal", ar: "الأغشية المصلية" },
    text: {
      en: "Have you had chest pain that gets worse when you breathe in?",
      ar: "هل شعرت بألم في الصدر يزداد عند الشهيق؟",
    },
    options: [
      { en: "Yes", ar: "نعم", flag: true },
      { en: "No", ar: "لا", flag: false },
    ],
    explain: {
      en: "This can point to inflammation of the lining around the lungs.",
      ar: "قد يشير هذا لالتهاب في الغشاء المحيط بالرئتين.",
    },
  },
  {
    domain: { en: "Renal", ar: "الكلى" },
    text: {
      en: "On a urine test, was your protein level high?",
      ar: "في تحليل البول، هل كانت نسبة البروتين مرتفعة؟",
    },
    options: [
      { en: "High", ar: "مرتفع", flag: true },
      { en: "Normal", ar: "طبيعي", flag: false },
    ],
    explain: {
      en: "Protein leaking into urine can be an early sign of kidney involvement.",
      ar: "تسرب البروتين إلى البول قد يكون علامة مبكرة على تأثر الكلى.",
    },
  },
  {
    domain: { en: "Immunologic", ar: "المناعة" },
    text: {
      en: "Has a blood test ever come back positive for anti-dsDNA antibodies?",
      ar: "هل أظهر تحليل دم سابق نتيجة إيجابية للأجسام المضادة لـ dsDNA؟",
    },
    options: [
      { en: "Yes", ar: "نعم", flag: true },
      { en: "No", ar: "لا", flag: false },
    ],
    explain: {
      en: "These antibodies are highly specific to lupus when present.",
      ar: "هذه الأجسام المضادة مرتبطة بدقة عالية بمرض الذئبة عند وجودها.",
    },
  },
];
