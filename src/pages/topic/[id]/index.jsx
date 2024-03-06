import HeaderSection from '@/components/Home/HeaderSection'
import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { Swiper, SwiperSlide, } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { FreeMode } from 'swiper/modules';





const Topic = ({ dataMainTopic, dataSubTopic, dataSubCategory, dataStaticWords, dataAllLangs, dir }) => {
  const router = useRouter();
  const getRandomWidth = (min, max) => Math.floor(Math.random() * (max - min + 40)) + min;
  const breakpoints = {
    300: {
      spaceBetween: 16,
    },
    400: {
      spaceBetween: 16,
    },
    607: {
      spaceBetween: 16,
    },
    700: {
      spaceBetween: 16,
    },
    1200: {
      spaceBetween: 24,
    },
    1300: {
      spaceBetween: 24,
    },



  }


  return (
    <>
      <Head>
        <title>{dataSubTopic[0]?.parentName}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <HeaderSection parentName={dataMainTopic[0]?.parentName} dataAllLangs={dataAllLangs} />

      <section id='city_facilities' className={styles.city_facilities} dir={dir}>
        <div className="container">
          <div className={styles.sec_container}>
            {dataSubCategory?.secondaryTopics.length > 0 &&
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }} className={styles.filter_container}>
                <Swiper
                  FreeMode={true}
                  modules={[FreeMode,]}

                  breakpoints={breakpoints}
                  dir={dir}
                  centeredSlides={false}
                  slidesPerView={'auto'}

                  className={styles.swiper_container}
                >

                  <SwiperSlide className={styles.swiper_slide_box}>

                    <div className={`${styles.box} ${styles.active}`}>
                      <div className={styles.title}>
                        <p>{dataStaticWords.displayAll}</p>
                      </div>
                    </div>

                  </SwiperSlide>
                  {

                    dataSubCategory?.secondaryTopics?.map((secTopic, index) =>
                      <SwiperSlide key={index} className={styles.swiper_slide_box}>
                        <Link href={`/subtopic/${secTopic.id}`} className={styles.box}>
                          <div className={styles.icon_container}>
                            <img src={secTopic.icon} alt={secTopic.name} />
                          </div>
                          <div className={styles.title}>
                            <p>{secTopic.name}</p>
                          </div>
                        </Link>
                      </SwiperSlide>


                    )}


                </Swiper>
              </motion.div>

            }

            <div className={styles.boxes_container}>

              {dataMainTopic.map((topic, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}

                  key={index}
                  className={styles.box}>
                  <Link href={Number(router.query.id) === 2 ? `/topic-details/${topic.id}` : (Number(router.query.id) === 1 || 13 ? `/subdetails/${topic.id}` : `/details/${topic.id}`)}>
                    <div className={styles.img_container}>
                      <Image src={topic.icon.includes(',') ? topic.icon.split(',')[0] : topic.icon} width={233} height={166} />
                    </div>
                    <div className={styles.title}>
                      <h5>{topic.name} </h5>

                    </div>

                    <div className={styles.desc}>
                      {topic.translatedDesc}
                    </div>
                  </Link>

                </motion.div>
              ))}

            </div>

            <div className={styles.boxes_container_mobile}>
              {dataMainTopic.map((topic, index) => (
                <Link href={Number(router.query.id) === 2 ? `/topic-details/${topic.id}` : (Number(router.query.id) === 1 || 13 ? `/subdetails/${topic.id}` : `/details/${topic.id}`)}
                  className={styles.box} key={index}
                  style={{
                    width: `100%`,
                    height: `${getRandomWidth(144, 340)}px`,
                  }}>
                  <div className={styles.img_container}>

                    <img src={topic.icon.includes(',') ? topic.icon.split(',')[0] : topic.icon} alt={`Image ${index}`} />

                  </div>
                  <div className={styles.title}>
                    <h5>{topic.name} </h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  )
}
export default Topic


export async function getStaticPaths() {
  const response = await fetch('https://api.almadinah.io/api/Topics/GetMainTopics?lang=2&ContentSamplesToReturn=0&pagenum=1&pagesize=50');
  const topics = await response.json();

  const paths = topics.map(topic => ({
    params: { id: topic.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}



export async function getStaticProps({ params, locale }) {
  const languagesConfig = require("../../../../public/locales/languagesDetails.json");
  const langId = languagesConfig.filter((lang) => lang.shortCut === locale)[0].id;

  const responseStaticWords = await fetch(
    `https://api.almadinah.io/api/Settings/GetStaticWords?lang=${langId}
    `
  );
  const dataStaticWords = await responseStaticWords.json();


  // Fetch main topics with the initial topicId
  let responseMainTopic = await fetch(`https://api.almadinah.io/api/Contents/GetContents?topicId=${params.id}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`);
  let dataMainTopic = await responseMainTopic.json();

  const responseSubCategory = await fetch(`https://api.almadinah.io/api/Topics/GetSubCategories?topicId=${params.id}&lang=${langId}&ContentSamplesToReturn=0&pagenum=1&pagesize=50`);
  const dataSubCategory = await responseSubCategory.json();
  // If dataMainTopic array is empty, fetch the subcategory to get a new topicId
  if (!dataMainTopic.length) { // Assuming dataMainTopic is an array and checking its length
    const responseSubCategory = await fetch(`https://api.almadinah.io/api/Topics/GetSubCategories?topicId=${params.id}&lang=${langId}&ContentSamplesToReturn=0&pagenum=1&pagesize=50`);
    const dataSubCategory = await responseSubCategory.json();

    // Check if secondaryTopics array is not empty and has an id
    if (dataSubCategory.secondaryTopics && dataSubCategory.secondaryTopics.length > 0) {
      const newTopicId = dataSubCategory.secondaryTopics[0].id;
      // Use the newTopicId to fetch main topics again
      responseMainTopic = await fetch(`https://api.almadinah.io/api/Contents/GetContents?topicId=${newTopicId}&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`);
      dataMainTopic = await responseMainTopic.json();
    }
  }

  // Fetch subtopics (assuming this is necessary regardless of the previous condition)
  const responseSubTopic = await fetch(`https://api.almadinah.io/api/Contents/GetContents?topicId=8&lang=${langId}&pagenum=1&pagesize=50&withLatLng=false`);
  const dataSubTopic = await responseSubTopic.json();



  const responseAllLangs = await fetch(
    `https://api.almadinah.io/api/Settings/GetAllLanguages?pagenum=1&pagesize=50`
  );
  const dataAllLangs = await responseAllLangs?.json();

  const res = await fetch(
    "https://api.almadinah.io/api/Settings/GetAllLanguages?pagenum=1&pagesize=50"
  );
  const languages = await res.json();

  const currentLanguage = languages?.find((lang) => lang?.shortCut === locale);
  const dir = currentLanguage?.isRtl ? "rtl" : "ltr";



  return {
    props: {
      dataMainTopic,
      dataSubTopic,
      dataSubCategory,
      dataStaticWords,
      dataAllLangs,
      dir
    },
  };
}



