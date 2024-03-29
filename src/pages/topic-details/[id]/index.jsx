import TopicDetailsHeader from '@/components/Home/Topic/TopicDetails/TopicDetailsHeader';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const TopicDetails = ({ dataStaticWords,
  dataContentDetails,
  dir,
  dataDrobTopic }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    < >
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} dir={dir} cName={'absolute_nav'} dataDrobTopic={dataDrobTopic} />
      <TopicDetailsHeader isOpen={isOpen} setIsOpen={setIsOpen} dir={dir} dataContentDetails={dataContentDetails} dataStaticWords={dataStaticWords} />
    </>
  )
}


export default TopicDetails




export async function getServerSideProps({ params, locale }) {
  const languagesConfig = require("../../../../public/locales/languagesDetails.json");
  const langId = languagesConfig.filter((lang) => lang.shortCut === locale)[0].id;

  const responseAllLangs = await fetch(
    `https://api.visitmadinahsa.com/api/Settings/GetAllLanguages?pagenum=1&pagesize=50`
  );
  const dataAllLangs = await responseAllLangs?.json();

  const responseStaticWords = await fetch(`https://api.visitmadinahsa.com/api/Settings/GetStaticWords?lang=${langId}`);
  const dataStaticWords = await responseStaticWords.json();

  const responseContentDetails = await fetch(`https://api.visitmadinahsa.com/api/Contents/GetContentDetails?contentId=${params.id}&lang=${langId}&suggestions=0&video360=false&guide=false`);
  const dataContentDetails = await responseContentDetails.json();


  const responseMainTopic = await fetch(`https://api.visitmadinahsa.com/api/Contents/GetContents?topicId=${dataContentDetails.currentContent.topicIdFk}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`);
  const dataMainTopic = await responseMainTopic.json();



  const responseDrobTopic = await fetch(
    `https://api.visitmadinahsa.com/api/Contents/GetContents?topicId=${2}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`
  );
  const dataDrobTopic = await responseDrobTopic.json();

  const res = await fetch(
    "https://api.visitmadinahsa.com/api/Settings/GetAllLanguages?pagenum=1&pagesize=50"
  );
  const languages = await res.json();

  const currentLanguage = languages?.find((lang) => lang?.shortCut === locale);
  const dir = currentLanguage?.isRtl ? "rtl" : "ltr";

  return {
    props: {
      dataStaticWords,
      dataMainTopic,
      dataAllLangs,
      dataContentDetails,
      dataDrobTopic,
      dir,
    },
  };
}

