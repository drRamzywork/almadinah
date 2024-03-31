import Head from "next/head";
import Image from "next/image";
import LandingPage from "@/components/LandingPage";
import nookies from "nookies";

export default function Home({
  topics,
  dataDrobTopic,
  dataLandmarksTopic,
  dataFacilitiesTopic,
  dataStaticWords,
  dataAllLangs,
  dir,
  dataMapData,
}) {
  const foods = topics.filter((topic) => topic.id === 7)[0];
  const industries = topics.filter((topic) => topic.id === 6)[0];

  return (
    <>
      <Head>
        <title>{dataStaticWords.siteName}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={dataStaticWords.aboutText} />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={dataStaticWords.siteName} />
        <meta property="og:description" content={dataStaticWords.aboutText} />
        <meta property="og:url" content="https://almadinah-five.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://almadinah-five.vercel.app/assets/images/dark_logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dataStaticWords.siteName} />
        <meta name="twitter:description" content={dataStaticWords.aboutText} />
        <meta
          name="twitter:image"
          content="https://almadinah-five.vercel.app/assets/images/dark_logo.png"
        />
      </Head>

      <LandingPage
        dataStaticWords={dataStaticWords}
        topics={topics}
        dataDrobTopic={dataDrobTopic}
        dataLandmarksTopic={dataLandmarksTopic}
        dataFacilitiesTopic={dataFacilitiesTopic}
        dataAllLangs={dataAllLangs}
        foods={foods}
        industries={industries}
        dir={dir}
        dataMapData={dataMapData}
      />
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const languagesConfig = require("../../public/locales/languagesDetails.json");
  const langId = languagesConfig.filter((lang) => lang.shortCut === locale)[0]
    .id;

  const apiUrl = `https://api.visitmadinahsa.com/api/Topics/GetMainTopics?lang=${langId}&ContentSamplesToReturn=6&pagenum=1&pagesize=50`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const responseStaticWords = await fetch(
    `https://api.visitmadinahsa.com/api/Settings/GetStaticWords?lang=${langId}`
  );
  const dataStaticWords = await responseStaticWords.json();

  const responseDrobTopic = await fetch(
    `https://api.visitmadinahsa.com/api/Contents/GetContents?topicId=${2}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`
  );
  const dataDrobTopic = await responseDrobTopic.json();

  const responseMapData = await fetch(
    `https://api.visitmadinahsa.com/api/Contents/GetContents?lang=${langId}&pagenum=1&pagesize=50&withLatLng=true`
  );
  const dataMapData = await responseMapData.json();

  const responseLandmarksTopic = await fetch(
    `https://api.visitmadinahsa.com/api/Contents/GetContents?topicId=8&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`
  );
  const dataLandmarksTopic = await responseLandmarksTopic.json();

  const responseFacilitiesTopic = await fetch(
    `https://api.visitmadinahsa.com/api/Contents/GetContents?topicId=14&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`
  );
  const dataFacilitiesTopic = await responseFacilitiesTopic?.json();

  const responseAllLangs = await fetch(
    `https://api.visitmadinahsa.com/api/Settings/GetAllLanguages?pagenum=1&pagesize=50`
  );
  const dataAllLangs = await responseAllLangs?.json();

  const res = await fetch(
    "https://api.visitmadinahsa.com/api/Settings/GetAllLanguages?pagenum=1&pagesize=50"
  );
  const languages = await res.json();

  const currentLanguage = languages.find((lang) => lang.shortCut === locale);
  const dir = currentLanguage?.isRtl ? "rtl" : "ltr";

  const responseSubCategory = await fetch(
    `https://api.visitmadinahsa.com/api/Topics/GetSubCategories?topicId=${1}&lang=${langId}&ContentSamplesToReturn=0&pagenum=1&pagesize=50`
  );
  const dataSubCategory = await responseSubCategory.json();

  return {
    props: {
      topics: data,
      dataDrobTopic,
      dataLandmarksTopic,
      dataFacilitiesTopic,
      dataStaticWords,
      dataAllLangs,
      dir,
      dataSubCategory,
      dataMapData,
    },
  };
}
