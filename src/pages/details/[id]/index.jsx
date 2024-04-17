import React from 'react'
import styles from './index.module.scss'
import { motion } from 'framer-motion'
import Map from '@/components/Home/Map'
import HederPages from '@/components/HeaderPages'
import Head from 'next/head'
import Marquee from "react-fast-marquee";


import dynamic from 'next/dynamic';
import { useState } from 'react'



const MapWithNoSSR = dynamic(() => import('@/components/Home/Map'), {
  ssr: false,
});

const Details = ({ dataAllLangs, dataContentDetails, dataMainTopic, dataContentDetailsGuide, dir, dataStaticWords }) => {
  const icon = dataContentDetails.currentContent.icon;
  const features = dataContentDetails.currentContent.relatedFeatures;
  const images1 = icon?.includes(',') ? icon.split(',') : [icon];

  console.log(dataContentDetails, "dataContentDetails")

  const [elementsData, setElementsData] = useState(dataContentDetails.currentContent.descriptionList);

  const renderElements = () => {
    return elementsData.map((item, index) => {
      const props = { className: 'dynamic-class' };
      if (item.url) props.href = item.url; // Adding href attribute for 'a' tags

      return React.createElement(
        item.tagName,
        { ...props, key: index }, // Add a key for list items
        item.tagContent
      );
    });
  };

  console.log(dataContentDetails.currentContent, "dataContentDetails.currentContent")


  return (
    <>
      <Head>
        <title>{dataContentDetails.currentContent.name}</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="description" content={dataContentDetails.currentContent.name} />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={dataContentDetails.currentContent.name} />
        <meta property="og:description" content={dataContentDetails.currentContent.name} />
        <meta property="og:image" content={images1} />
        <meta property="og:url" content="https://visitmadinahsa.com/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dataContentDetails.currentContent.name} />
        <meta name="twitter:description" content={dataContentDetails.currentContent.name} />
        <meta name="twitter:image" content={images1} />
      </Head>

      <HederPages
        parentID={dataMainTopic.length > 0 ? dataMainTopic[0].parentId : dataContentDetails.mainTopicId}
        dataStaticWords={dataStaticWords} dir={dir} dataContentDetailsGuide={dataContentDetailsGuide.currentContent} dataContentDetails={dataContentDetails.currentContent} dataAllLangs={dataAllLangs} icon={icon} parentName={dataContentDetails.
          currentContent.name} categoryName={dataMainTopic[0]?.parentName} />



      <section dir={dir} id='details' className={styles.details}>
        <div className="container p-3">
          <div className={styles.sec_container}>


            <div className={styles.text_container}>

              {dataContentDetails?.currentContent?.descriptionBigList?.map((item, index) => {
                switch (item.tagName) {
                  case 'h4':
                    return <motion.h4
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }} key={index}>{item.tagContent}</motion.h4>;
                  case 'p':
                    return <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 1 }}
                      transition={{ duration: 1 }} key={index}>{item.tagContent}</motion.p>;
                  case 'span':
                    return <span key={index}>{` `}{item.tagContent}{` `}</span>;
                  case 'li':
                    return <li key={index}>{` `}{item.tagContent}{` `}</li>;
                  // Add more cases for different tags if needed.
                  default:
                    return <span key={index}>Unknown tag</span>;
                }
              })}


              <div style={{ textAlign: 'center' }}>


                {renderElements()}
              </div>

            </div>

          </div>
        </div>
      </section>

      {dataContentDetails.currentContent.lat !== null &&
        <section id='map_location'>
          <MapWithNoSSR dataContentDetails={dataContentDetails.currentContent} />
        </section>
      }

    </>
  )
}

export default Details


export async function getServerSideProps({ params, locale }) {
  const languagesConfig = require("../../../../public/locales/languagesDetails.json");
  const langId = languagesConfig.filter((lang) => lang.shortCut === locale)[0].id;
  // languagesConfig[locale]?.id ||
  const responseAllLangs = await fetch(
    `https://api.visitmadinahsa.com/api/Settings/GetAllLanguages?pagenum=1&pagesize=50`
  );
  const dataAllLangs = await responseAllLangs?.json();

  const responseStaticWords = await fetch(`https://api.visitmadinahsa.com/api/Settings/GetStaticWords?lang=${langId}`);
  const dataStaticWords = await responseStaticWords.json();

  // Fetch main topics with the initial topicId

  const responseContentDetails = await fetch(`https://api.visitmadinahsa.com/api/Contents/GetContentDetails?contentId=${params.id}&lang=${langId}&suggestions=0`);
  const dataContentDetails = await responseContentDetails.json();

  const responseContentDetailsGuide = await fetch(`https://api.visitmadinahsa.com/api/Contents/GetContentDetails?contentId=${params.id}&lang=${langId}&suggestions=0&video360=true&guide=true
  `);
  const dataContentDetailsGuide = await responseContentDetailsGuide.json();


  const responseMainTopic = await fetch(`https://api.visitmadinahsa.com/api/Contents/GetContents?topicId=${dataContentDetails.currentContent.topicIdFk}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=true`);
  const dataMainTopic = await responseMainTopic.json();


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
      dataContentDetailsGuide,
      dir
    },
  };
}
