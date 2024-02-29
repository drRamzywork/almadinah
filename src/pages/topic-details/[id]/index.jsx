import HeaderSection from '@/components/Home/HeaderSection'
import TopicDetailsHeader from '@/components/Home/Topic/TopicDetails/TopicDetailsHeader'
import Navbar from '@/components/Navbar'
import React from 'react'
import styles from './index.module.scss'
const TopicDetails = ({ dataStaticWords,
  dataMainTopic,
  dataAllLangs,
  dataContentDetails,
  dataSubTopic,
  dataSubCategory,
  dataDrobTopic }) => {
  console.log(dataContentDetails, 'dataContentDetails')



  return (
    <>
      <Navbar cName={'absolute_nav'} dataDrobTopic={dataDrobTopic} />
      <TopicDetailsHeader dataContentDetails={dataContentDetails} dataStaticWords={dataStaticWords} />

    </>
  )
}


export default TopicDetails




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


  const responseMainTopic = await fetch(`https://api.almadinah.io/api/Contents/GetContents?topicId=${dataContentDetails.currentContent.topicIdFk}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`);
  const dataMainTopic = await responseMainTopic.json();



  const responseDrobTopic = await fetch(
    `https://api.almadinah.io/api/Contents/GetContents?topicId=${2}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`
  );
  const dataDrobTopic = await responseDrobTopic.json();


  return {
    props: {
      dataStaticWords,
      dataMainTopic,
      dataAllLangs,
      dataContentDetails,
      dataDrobTopic
    },
  };
}

