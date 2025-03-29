import { useSelector } from "react-redux";
import translations from "../translations";

export const useTranslation = () => {
  const currentLanguage = useSelector((state) => state.language.value);

  const t = (key) => {
    if (!translations[currentLanguage] || !translations[currentLanguage][key]) {
      return translations.en[key] || key;
    }
    return translations[currentLanguage][key];
  };

  return { t, currentLanguage };
};
