import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>المدينة</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="المدينة" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="المدينة" />
        <meta property="og:description" content="المدينة" />
        <meta property="og:image" content="/assets/images/dark_logo.png" />
        <meta property="og:url" content="https://almadinah.io/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="المدينة" />
        <meta name="twitter:description" content="المدينة" />
        <meta name="twitter:image" content="/assets/images/dark_logo.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(App);
