import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { appWithTranslation } from "next-i18next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
function App({ Component, pageProps, dataStaticWords }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      {isLoading && (
        <div className="loader">
          <Image
            className={"logo"}
            src={"/assets/images/dark_logo.png"}
            width={118.64}
            height={56}
          />
        </div>
      )}

      <LanguageProvider>
        <Layout dataStaticWords={dataStaticWords}>
          <Component {...pageProps} />
        </Layout>
      </LanguageProvider>
    </>
  );
}

export default appWithTranslation(App);
