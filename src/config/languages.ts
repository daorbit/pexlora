export type SiteLanguage = { code: string; label: string; native: string; flag: string };

export const DEFAULT_LANGUAGE = "en";

export const languages: SiteLanguage[] = [
  { code: "en", label: "English", native: "English", flag: "us" },
  { code: "hi", label: "Hindi", native: "हिन्दी", flag: "in" },
  { code: "bn", label: "Bengali", native: "বাংলা", flag: "in" },
  { code: "ta", label: "Tamil", native: "தமிழ்", flag: "in" },
  { code: "te", label: "Telugu", native: "తెలుగు", flag: "in" },
  { code: "mr", label: "Marathi", native: "मराठी", flag: "in" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી", flag: "in" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ", flag: "in" },
  { code: "ml", label: "Malayalam", native: "മലയാളം", flag: "in" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "in" },
  { code: "ur", label: "Urdu", native: "اردو", flag: "pk" },
  { code: "es", label: "Spanish", native: "Español", flag: "es" },
  { code: "pt", label: "Portuguese", native: "Português", flag: "br" },
  { code: "fr", label: "French", native: "Français", flag: "fr" },
  { code: "de", label: "German", native: "Deutsch", flag: "de" },
  { code: "it", label: "Italian", native: "Italiano", flag: "it" },
  { code: "id", label: "Indonesian", native: "Bahasa Indonesia", flag: "id" },
  { code: "ms", label: "Malay", native: "Bahasa Melayu", flag: "my" },
  { code: "tl", label: "Filipino", native: "Filipino", flag: "ph" },
  { code: "vi", label: "Vietnamese", native: "Tiếng Việt", flag: "vn" },
  { code: "th", label: "Thai", native: "ไทย", flag: "th" },
  { code: "tr", label: "Turkish", native: "Türkçe", flag: "tr" },
  { code: "ru", label: "Russian", native: "Русский", flag: "ru" },
  { code: "ar", label: "Arabic", native: "العربية", flag: "sa" },
  { code: "ja", label: "Japanese", native: "日本語", flag: "jp" },
  { code: "ko", label: "Korean", native: "한국어", flag: "kr" },
  { code: "zh-CN", label: "Chinese (Simplified)", native: "简体中文", flag: "cn" },
];

export const FLAG_CDN = "https://flagcdn.com";
