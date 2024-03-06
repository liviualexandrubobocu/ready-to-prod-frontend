// Internal
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { ErrorBoundary } from "./utils/errors/ErrorBoundary";
import translationEn from "./utils/localization/en.json";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

// External
import { initReactI18next, useTranslation } from "react-i18next";
import i18n from "i18next";
import { msalConfig } from "./infrastructure/auth.config";

const msalInstance = new PublicClientApplication(msalConfig);

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
      <MsalProvider instance={msalInstance}>
        <Navigation />
      </MsalProvider>
    </ErrorBoundary>
  );
}

export default App;
