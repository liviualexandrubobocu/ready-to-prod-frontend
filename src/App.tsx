// Internal
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { ErrorBoundary } from "./utils/errors/ErrorBoundary";

// External
import { initReactI18next, useTranslation } from "react-i18next";
import i18n from "i18next";
import translationEn from "./utils/localization/en.json";

function App() {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: translationEn,
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
  const { t } = useTranslation();
  return (
    <ErrorBoundary fallback={<p>{t("error-boundary-message")}</p>}>
      <Navigation />
    </ErrorBoundary>
  );
}

export default App;
