// // pages/404.js

// import Link from "next/link";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import HeaderSection from "@/components/Home/HeaderSection";

// const NotFoundPage = ({ dataStaticWords }) => {
//   const router = useRouter();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.push("/");
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <HeaderSection
//         dataStaticWords={dataStaticWords}
//         dir={"ltr"}
//         parentName={"404 - Page Not Found"}
//       />

//       <div style={{ textAlign: "center", padding: "50px" }}>
//         <h1>
//           {" "}
//           <Link
//             href="/"
//             style={{
//               textDecoration: "underline !important",
//               fontWeight: "800",
//               color: "var(--main-green-color)",
//             }}
//           >
//             Go back to Home
//           </Link>
//         </h1>
//       </div>
//     </>
//   );
// };

// export default NotFoundPage;
// export async function getServerSideProps({ locale }) {
//   const languagesConfig = require("../../public/locales/languagesDetails.json");
//   const langId = languagesConfig.filter((lang) => lang.shortCut === locale)[0]
//     .id;

//   const responseStaticWords = await fetch(
//     `https://api.visitmadinahsa.com/api/Settings/GetStaticWords?lang=${langId}`
//   );
//   const dataStaticWords = await responseStaticWords.json();

//   return {
//     props: {
//       dataStaticWords,
//       dataAllLangs,
//       dir,
//     },
//   };
// }

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HeaderSection from "@/components/Home/HeaderSection";

const NotFoundPage = () => {
  const [dataStaticWords, setDataStaticWords] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const languagesConfig = require("../../public/locales/languagesDetails.json");
      const langId =
        languagesConfig.find((lang) => lang.shortCut === router.locale)?.id ||
        1;

      const response = await fetch(
        `https://api.visitmadinahsa.com/api/Settings/GetStaticWords?lang=${langId}`
      );
      const data = await response.json();
      setDataStaticWords(data);
    };

    fetchData();

    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <HeaderSection
        dataStaticWords={dataStaticWords}
        dir={"ltr"}
        parentName={"404 - Page Not Found"}
      />

      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>
          <Link
            href="/"
            style={{
              textDecoration: "underline",
              fontWeight: "800",
              color: "var(--main-green-color)",
            }}
          >
            Go back to Home
          </Link>
        </h1>
      </div>
    </>
  );
};

export default NotFoundPage;
