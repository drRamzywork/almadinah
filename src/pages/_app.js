import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { appWithTranslation } from "next-i18next";
import { LanguageProvider } from "@/contexts/LanguageContext";

function App({ Component, pageProps, dataStaticWords }) {
  return (
    <LanguageProvider>
      <Layout dataStaticWords={dataStaticWords}>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  );
}

export default appWithTranslation(App);
