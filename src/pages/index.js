import Head from "next/head";
import Image from "next/image";
import LandingPage from "@/components/LandingPage";
import { useLanguages } from "@/contexts/LanguageContext";
import { useRouter } from "next/router";

export default function Home({
  topics,
  dataDrobTopic,
  dataLandmarksTopic,
  dataFacilitiesTopic,
  dataStaticWords,
}) {
  const router = useRouter();

  console.log(router.locale, "Localesss");
  return (
    <>
      <Head>
        <title>المدينة</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingPage
        dataStaticWords={dataStaticWords}
        topics={topics}
        dataDrobTopic={dataDrobTopic}
        dataLandmarksTopic={dataLandmarksTopic}
        dataFacilitiesTopic={dataFacilitiesTopic}
      />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const langId = locale || 1;

  const apiUrl = `https://api.almadinah.io/api/Topics/GetMainTopics?lang=${langId}&ContentSamplesToReturn=6&pagenum=1&pagesize=50`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const responseStaticWords = await fetch(
    `https://api.almadinah.io/api/Settings/GetStaticWords?lang=${langId}`
  );
  const dataStaticWords = await responseStaticWords.json();

  const responseDrobTopic = await fetch(
    `https://api.almadinah.io/api/Contents/GetContents?topicId=${2}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`
  );
  const dataDrobTopic = await responseDrobTopic.json();

  const responseLandmarksTopic = await fetch(
    `https://api.almadinah.io/api/Contents/GetContents?topicId=8&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`
  );
  const dataLandmarksTopic = await responseLandmarksTopic.json();

  const responseFacilitiesTopic = await fetch(
    `https://api.almadinah.io/api/Contents/GetContents?topicId=14&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`
  );
  const dataFacilitiesTopic = await responseFacilitiesTopic?.json();

  return {
    props: {
      topics: data,
      dataDrobTopic,
      dataLandmarksTopic,
      dataFacilitiesTopic,
      dataStaticWords,
    },
  };
}
