// import Layout from "@/components/Layout";
// import "@/styles/globals.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { appWithTranslation } from "next-i18next";
// import { LanguageProvider } from "@/contexts/LanguageContext";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import { motion } from "framer-motion";

// function App({ Component, pageProps, dataStaticWords }) {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const handleStart = () => setIsLoading(true);
//     const handleComplete = () => setIsLoading(false);

//     router.events.on("routeChangeStart", handleStart);
//     router.events.on("routeChangeComplete", handleComplete);
//     router.events.on("routeChangeError", handleComplete);

//     return () => {
//       router.events.off("routeChangeStart", handleStart);
//       router.events.off("routeChangeComplete", handleComplete);
//       router.events.off("routeChangeError", handleComplete);
//     };
//   }, [router]);

//   return (
//     <>
//       {isLoading && (
//         <div className="loader">
//           <motion.div
//             initial={{ opacity: 0, scale: 0, x: -100 }}
//             animate={{ opacity: 1, scale: 1, x: 0 }}
//             exit={{ opacity: 0, scale: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Image
//               className={"logo"}
//               src={"/assets/images/dark_logo.png"}
//               width={118.64}
//               height={56}
//               quality={75}
//               priority={false}
//             />
//           </motion.div>
//         </div>
//       )}

//       <LanguageProvider>
//         <Layout dataStaticWords={dataStaticWords}>
//           <Component {...pageProps} />
//         </Layout>
//       </LanguageProvider>
//     </>
//   );
// }

// export default appWithTranslation(App);

import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { appWithTranslation } from "next-i18next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";

// Static import for the loader image
import loaderImage from "../public/assets/images/dark_logo.png";

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
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={loaderImage}
              alt="Loading..."
              width={118.64}
              height={56}
              quality={75}
              priority={true} // Set priority to true to preload the image
            />
          </motion.div>
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
