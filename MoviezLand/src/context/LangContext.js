import { useState, useCallback } from "react";

export const Lang = {
  en: { label: "English", dir: "ltr", defaultText: "Welcome" },
  ar: { label: "العربية", dir: "rtl", defaultText: "مرحباً" },
  fr: { label: "Français", dir: "ltr", defaultText: "Bienvenue" },
  es: { label: "Español", dir: "ltr", defaultText: "Bienvenido" },
};

export const useTranslation = (initialLang = "en") => {
  const validInitialLang = Lang[initialLang] ? initialLang : "en";
  const [lang, setLang] = useState(validInitialLang);
  const [text, setText] = useState(Lang[validInitialLang].defaultText);
  const [status, setStatus] = useState("idle");

  const updateLanguage = useCallback(async (newLang) => {
    const validNewLang = Lang[newLang] ? newLang : lang;
    setStatus("loading");

    try {
      setTimeout(() => {
        setText(Lang[validNewLang].defaultText);
        setLang(validNewLang);
        setStatus("success");
      }, 500);
    } catch (error) {
      console.error("Translation error:", error);
      setLang(validNewLang);
      setStatus("error");      setText(Lang[validNewLang].defaultText);

    }
  }, [lang]);

  return { lang, text, status, updateLanguage };
};
