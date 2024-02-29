import React from 'react'
import styles from './index.module.scss'
import { motion } from 'framer-motion'
import Map from '@/components/Home/Map'
import HederPages from '@/components/HeaderPages'
import Head from 'next/head'

const Details = ({ dataAllLangs, dataContentDetails, dataMainTopic }) => {

  const icon = dataContentDetails.currentContent.icon;
  const features = dataContentDetails.currentContent.relatedFeatures;
  return (
    <>
      <Head>
        <title>{dataMainTopic[0]?.parentName}</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="description" content="المدينة" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="المدينة" />
        <meta property="og:description" content="المدينة" />
        <meta property="og:image" content="/assets/images/dark_logo.png" />
        <meta property="og:url" content="https://almadinah.io/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="المدينة" />
        <meta name="twitter:description" content="المدينة" />
        <meta name="twitter:image" content="/assets/images/dark_logo.png" />
      </Head>

      <HederPages dataContentDetails={dataContentDetails.currentContent} dataAllLangs={dataAllLangs} icon={icon} parentName={dataContentDetails.
        currentContent.name} categoryName={dataMainTopic[0]?.parentName} />

      <section id='details' className={styles.details}>
        <div className="container p-3">
          <div className={styles.sec_container}>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}


              className={styles.desc_container}>
              <p>
                {dataContentDetails.currentContent.description}
              </p>
            </motion.div>

            <div className={styles.boxes_container}>
              {features &&
                features.map((f, idx) =>
                  <div className={styles.box} key={idx}>
                    <div className={styles.icon_container}>
                      <img src={f.icon} alt={f.name} />
                    </div>
                    <p>{f.name}</p>
                  </div>
                )

              }
            </div>

            <div className={styles.text_container}>
              {dataContentDetails?.currentContent?.descriptionBigList?.map((item, index) => {
                // Use a switch statement if you have a limited set of tags
                // or use React.createElement if you have many different tags.
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

            </div>





          </div>
        </div>
      </section>

      {dataContentDetails.currentContent.lat !== null &&
        <section id='map_location'>
          <Map dataContentDetails={dataContentDetails.currentContent} />
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
    `https://api.almadinah.io/api/Settings/GetAllLanguages?pagenum=1&pagesize=50`
  );
  const dataAllLangs = await responseAllLangs?.json();

  const responseStaticWords = await fetch(`https://api.almadinah.io/api/Settings/GetStaticWords?lang=${langId}`);
  const dataStaticWords = await responseStaticWords.json();

  // Fetch main topics with the initial topicId

  const responseContentDetails = await fetch(`https://api.almadinah.io/api/Contents/GetContentDetails?contentId=${params.id}&lang=${langId}&suggestions=0`);
  const dataContentDetails = await responseContentDetails.json();


  const responseMainTopic = await fetch(`https://api.almadinah.io/api/Contents/GetContents?topicId=${dataContentDetails.currentContent.topicIdFk}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=true`);
  const dataMainTopic = await responseMainTopic.json();



  // dataContentDetails.currentContent.topicIdFk
  return {
    props: {
      dataStaticWords,
      dataMainTopic,
      dataAllLangs,
      dataContentDetails
    },
  };
}
