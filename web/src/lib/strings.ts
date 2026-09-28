import type { Lang } from "../api/types";

export const STR = {
  en: {
    appName: "Lupira",
    tagline: "Early lupus-risk screening, backed by a real model.",

    navHome: "Home",
    navHistory: "History",
    navProfile: "Profile",
    navLogout: "Log out",

    // auth
    login: "Log in",
    signup: "Sign up",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    continueWithGoogle: "Continue with Google",
    continueWithFacebook: "Continue with Facebook",
    orDivider: "or",

    username: "Username",
    phoneNumber: "Phone number",
    gender: "Gender",
    country: "Country",
    dateOfBirth: "Date of birth",
    ethnicity: "Ethnicity",
    selectPlaceholder: "Select...",

    verifyPendingTitle: "Check your email",
    verifyPendingBody: "We sent a verification link to your inbox. Click it to activate your account, then come back here to log in.",
    backToLogin: "Back to log in",

    completeProfileTitle: "One more step",
    completeProfileBody: "We just need a few more details to finish setting up your account.",

    forgotTitle: "Reset your password",
    forgotBody: "Enter your email and we'll send you a link to reset your password.",
    sendResetLink: "Send reset link",
    resetSentTitle: "Check your email",
    resetSentBody: "If an account exists for that email, a reset link is on its way.",

    resetTitle: "Choose a new password",
    resetInvalidLink: "This reset link is invalid or has expired. Request a new one.",
    resetSuccess: "Password updated. You can log in with your new password now.",
    setNewPassword: "Set new password",

    // dashboard
    dashboardGreeting: "Hi",
    dashboardBody: "Run a quick symptom check, or look back at what you've already submitted.",
    startAssessment: "Start assessment",
    viewHistory: "View history",

    // assessment
    assessmentTitle: "Symptom check",
    assessmentDisclaimer: "This isn't a diagnosis — it's a screening tool. Always follow up with a rheumatologist.",
    questionOf: "Question",
    of: "of",
    next: "Next",
    back: "Back",
    submit: "Submit",
    resultLikelyTitle: "Signs detected",
    resultClearTitle: "No signs detected",
    retake: "Retake assessment",

    // history
    historyTitle: "Your history",
    historyEmpty: "No assessments yet.",
    deleteEntry: "Delete",
    clearAll: "Clear all",
    confirmClearAll: "Delete your entire history? This can't be undone.",

    // profile
    profileTitle: "Profile",
    editProfile: "Edit profile",
    saveChanges: "Save changes",
    changePassword: "Change password",
    oldPassword: "Current password",
    newPassword: "New password",
    dangerZone: "Danger zone",
    deleteAccount: "Delete account",
    confirmDeleteAccount: "This permanently deletes your account and history. Are you sure?",

    // common
    loading: "Loading...",
    somethingWentWrong: "Something went wrong.",
    required: "Required",
    notFoundTitle: "Page not found",
    notFoundBody: "That page doesn't exist.",
    goHome: "Go home",
  },
  ar: {
    appName: "لوبيرا",
    tagline: "فحص مبكر لاحتمالية الإصابة بالذئبة، مدعوم بنموذج حقيقي.",

    navHome: "الرئيسية",
    navHistory: "السجل",
    navProfile: "الملف الشخصي",
    navLogout: "تسجيل الخروج",

    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    noAccount: "ليس لديك حساب؟",
    haveAccount: "لديك حساب بالفعل؟",
    continueWithGoogle: "المتابعة عبر جوجل",
    continueWithFacebook: "المتابعة عبر فيسبوك",
    orDivider: "أو",

    username: "اسم المستخدم",
    phoneNumber: "رقم الهاتف",
    gender: "الجنس",
    country: "الدولة",
    dateOfBirth: "تاريخ الميلاد",
    ethnicity: "العرق",
    selectPlaceholder: "اختر...",

    verifyPendingTitle: "تحققي من بريدك الإلكتروني",
    verifyPendingBody: "أرسلنا رابط تحقق إلى بريدك. اضغطي عليه لتفعيل حسابك، ثم عودي إلى هنا لتسجيل الدخول.",
    backToLogin: "العودة لتسجيل الدخول",

    completeProfileTitle: "خطوة أخيرة",
    completeProfileBody: "نحتاج بعض التفاصيل الإضافية لإكمال إعداد حسابك.",

    forgotTitle: "إعادة تعيين كلمة المرور",
    forgotBody: "أدخلي بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.",
    sendResetLink: "إرسال رابط إعادة التعيين",
    resetSentTitle: "تحققي من بريدك الإلكتروني",
    resetSentBody: "إذا كان هناك حساب مرتبط بهذا البريد، فرابط إعادة التعيين في الطريق.",

    resetTitle: "اختاري كلمة مرور جديدة",
    resetInvalidLink: "رابط إعادة التعيين غير صالح أو منتهي الصلاحية. اطلبي رابطًا جديدًا.",
    resetSuccess: "تم تحديث كلمة المرور. يمكنك تسجيل الدخول بكلمة المرور الجديدة الآن.",
    setNewPassword: "تعيين كلمة مرور جديدة",

    dashboardGreeting: "مرحبًا",
    dashboardBody: "أجري فحصًا سريعًا للأعراض، أو راجعي ما قمتِ بإرساله سابقًا.",
    startAssessment: "بدء التقييم",
    viewHistory: "عرض السجل",

    assessmentTitle: "فحص الأعراض",
    assessmentDisclaimer: "هذا ليس تشخيصًا — إنه أداة فحص أولي. تابعي دائمًا مع طبيب روماتيزم.",
    questionOf: "سؤال",
    of: "من",
    next: "التالي",
    back: "رجوع",
    submit: "إرسال",
    resultLikelyTitle: "تم رصد مؤشرات",
    resultClearTitle: "لم يتم رصد مؤشرات",
    retake: "إعادة التقييم",

    historyTitle: "سجلك",
    historyEmpty: "لا توجد تقييمات بعد.",
    deleteEntry: "حذف",
    clearAll: "مسح الكل",
    confirmClearAll: "حذف سجلك بالكامل؟ لا يمكن التراجع عن هذا.",

    profileTitle: "الملف الشخصي",
    editProfile: "تعديل الملف الشخصي",
    saveChanges: "حفظ التغييرات",
    changePassword: "تغيير كلمة المرور",
    oldPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    dangerZone: "منطقة الخطر",
    deleteAccount: "حذف الحساب",
    confirmDeleteAccount: "سيؤدي هذا إلى حذف حسابك وسجلك نهائيًا. هل أنت متأكدة؟",

    loading: "جارٍ التحميل...",
    somethingWentWrong: "حدث خطأ ما.",
    required: "مطلوب",
    notFoundTitle: "الصفحة غير موجودة",
    notFoundBody: "هذه الصفحة غير موجودة.",
    goHome: "العودة للرئيسية",
  },
} satisfies Record<Lang, Record<string, string>>;

export function t(lang: Lang, key: keyof (typeof STR)["en"]): string {
  return STR[lang][key] ?? STR.en[key];
}
