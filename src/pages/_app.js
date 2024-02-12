import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
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
        <meta
          property="og:image"
          content="https://zamakanweb1.suwa.io/logo_mobile_footer.png"
        />
        <meta property="og:url" content="https://zamakanweb1.suwa.io" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="المدينة" />
        <meta name="twitter:description" content="المدينة" />
        <meta
          name="twitter:image"
          content="https://zamakanweb1.suwa.io/logo_mobile_footer.png"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
