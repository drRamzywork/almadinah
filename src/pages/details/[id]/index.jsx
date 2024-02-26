import React from 'react'
import styles from './index.module.scss'
import { motion } from 'framer-motion'
import Map from '@/components/Home/Map'
import HederPages from '@/components/HeaderPages'

const Details = ({ dataAllLangs, dataContentDetails, dataMainTopic }) => {

  const icon = dataContentDetails.currentContent.icon;
  return (
    <>

      <HederPages dataContentDetails={dataContentDetails.currentContent} dataAllLangs={dataAllLangs} icon={icon} parentName={dataContentDetails.
        currentContent.name} categoryName={dataMainTopic[0]?.parentName} />

      <section id='details' className={styles.details}>
        <div className="container-fluid p-3">
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
                  // Add more cases for different tags if needed.
                  default:
                    return <span key={index}>Unknown tag</span>;
                }
              })}

            </div>





          </div>
        </div>
      </section>

      <section id='map_location'>
        <Map dataContentDetails={dataContentDetails.currentContent} />
      </section>

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

  const responseContentDetails = await fetch(`https://api.almadinah.io/api/Contents/GetContentDetails?contentId=${params.id}&lang=${langId}&suggestions=0&video360=false&guide=false`);
  const dataContentDetails = await responseContentDetails.json();


  const responseMainTopic = await fetch(`https://api.almadinah.io/api/Contents/GetContents?topicId=${dataContentDetails.currentContent.topicIdFk}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`);
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
