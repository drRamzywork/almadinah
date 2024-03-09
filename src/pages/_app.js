import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { appWithTranslation, useTranslation } from "next-i18next";
import { LanguageProvider } from "@/contexts/LanguageContext";

function App({ Component, pageProps }) {
  const { i18n } = useTranslation();

  return (
    <LanguageProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  );
}

export default appWithTranslation(App);
