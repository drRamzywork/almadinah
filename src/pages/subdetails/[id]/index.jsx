import HeaderSection from '@/components/Home/HeaderSection'
import TopicDetailsHeader from '@/components/Home/Topic/TopicDetails/TopicDetailsHeader'
import Navbar from '@/components/Navbar'
import React from 'react'
import styles from '../../topic-details/[id]/index.module.scss'
import Head from 'next/head'
import Header from '@/components/Home/Topic/SubDetails/Header'

const Subdetails = (
  { dataStaticWords,
    dataMainTopic,
    dataAllLangs,
    dataContentDetails,
    dataContentDetailsGuide,
    dataDrobTopic }
) => {

  return (
    <>
      {/* <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}
      {/* parentName={ } */}
      <Navbar cName={'absolute_nav'} dataDrobTopic={dataDrobTopic} parentName={dataMainTopic[0].parentName} />
      <Header dataContentDetails={dataContentDetails} dataStaticWords={dataStaticWords} dataContentDetailsGuide={dataContentDetailsGuide} />

    </>
  )
}

export default Subdetails





export async function getServerSideProps({ params, locale }) {
  const languagesConfig = require("../../../../public/locales/languagesDetails.json");
  const langId = languagesConfig.filter((lang) => lang.shortCut === locale)[0].id;
  // languagesConfig[locale]?.id ||
  const responseAllLangs = await fetch(
    `https://api.almadinah.io/api/Settings/GetAllLanguages?pagenum=1&pagesize=50`
  );
  const dataAllLangs = await responseAllLangs?.json();

  const responseStaticWords = await fetch(`https://api.almadinah.io/api/Settings/GetStaticWords?lang=${langId}`);
  const dataStaticWords = await responseStaticWords.json();

  // Fetch main topics with the initial topicId

  const responseContentDetails = await fetch(`https://api.almadinah.io/api/Contents/GetContentDetails?contentId=${params.id}&lang=${langId}&suggestions=0&video360=false&guide=false`);
  const dataContentDetails = await responseContentDetails.json();





  const responseDrobTopic = await fetch(
    `https://api.almadinah.io/api/Contents/GetContents?topicId=${1}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`
  );
  const dataDrobTopic = await responseDrobTopic.json();


  const responseContentDetailsGuide = await fetch(`https://api.almadinah.io/api/Contents/GetContentDetails?contentId=${params.id}&lang=${langId}&suggestions=0&video360=true&guide=true
  `);
  const dataContentDetailsGuide = await responseContentDetailsGuide.json();




  const responseMainTopic = await fetch(`https://api.almadinah.io/api/Contents/GetContents?topicId=${dataContentDetails.currentContent.topicIdFk}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=true`);
  const dataMainTopic = await responseMainTopic.json();




  return {
    props: {
      dataStaticWords,
      dataMainTopic,
      dataAllLangs,
      dataContentDetails,
      dataDrobTopic,
      dataContentDetailsGuide
    },
  };
}

