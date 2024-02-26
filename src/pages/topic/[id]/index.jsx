import HeaderSection from '@/components/Home/HeaderSection'
import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import PalmTree from '@/svgs/PalmTree'
import Calendar from '@/svgs/Calendar'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Topic = ({ dataMainTopic, dataSubTopic, dataSubCategory, dataStaticWords }) => {
  const router = useRouter();
  const getRandomWidth = (min, max) => Math.floor(Math.random() * (max - min + 40)) + min;
  // const mergedTopics = dataMainTopic.concat(dataSubTopic);

  return (
    <>
      <Head>
        <title>{dataSubTopic[0]?.parentName}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <HeaderSection parentName={dataMainTopic[0]?.parentName} />

      <section id='city_facilities' className={styles.city_facilities} dir={router.locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container">
          <div className={styles.sec_container}>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }} className={styles.filter_container}>
              <Swiper
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  400: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  414: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                }}
                dir={router.locale === 'ar' ? 'rtl' : 'ltr'}
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

            <div className={styles.boxes_container}>

              {dataMainTopic.map((topic, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}

                  key={index}
                  className={styles.box}>
                  <Link href={`/details/${topic.id}`}>
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
                <Link href={`/details/${topic.id}`}
                  className={styles.box} key={index}
                  style={{
                    width: `164px`,
                    height: `${getRandomWidth(144, 340)}px`,
                  }}>
                  {console.log(topic.id, "topic")}
                  <div className={styles.img_container}>
                    {/* <Image src={'/assets/images/place.png'} width={233} height={166} />
                     */}
                    {/* <Image src="/assets/images/place.png" /> */}
                    <Image src={topic.icon.includes(',') ? topic.icon.split(',')[0] : topic.icon} layout="fill" objectFit="cover"

                    />

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

  return {
    props: {
      dataMainTopic,
      dataSubTopic,
      dataSubCategory,
      dataStaticWords
      // dataSubCategory is not included here since it's only used conditionally
    },
  };
}



