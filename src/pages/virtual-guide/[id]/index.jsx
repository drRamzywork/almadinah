import HederPages from '@/components/HeaderPages'
import Navbar from '@/components/Navbar'
import React from 'react'

const VirtualGuide = ({ dataContentDetailsGuide, dataContentDetails, dataAllLangs, parentName }) => {
  return (
    <>



      <Navbar />
      <HederPages dataContentDetailsGuide={dataContentDetailsGuide.currentContent} dataContentDetails={dataContentDetails.currentContent} dataAllLangs={dataAllLangs} parentName={dataContentDetails.
        currentContent.name} />


    </>
  )
}

export default VirtualGuide


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

  const responseContentDetails = await fetch(`https://api.almadinah.io/api/Contents/GetContentDetails?contentId=${params.id}&lang=${langId}&suggestions=0`);
  const dataContentDetails = await responseContentDetails.json();

  const responseContentDetailsGuide = await fetch(`https://api.almadinah.io/api/Contents/GetContentDetails?contentId=${params.id}&lang=${langId}&suggestions=0&video360=true&guide=true
  `);
  const dataContentDetailsGuide = await responseContentDetailsGuide.json();






  // dataContentDetails.currentContent.topicIdFk
  return {
    props: {
      dataStaticWords,
      dataAllLangs,
      dataContentDetails,
      dataContentDetailsGuide
    },
  };
}
