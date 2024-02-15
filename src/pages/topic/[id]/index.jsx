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

const Topic = ({ dataMainTopic }) => {
  const getRandomWidth = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <>

      <HeaderSection parentName={dataMainTopic[0]?.parentName} />
      <section id='city_facilities' className={styles.city_facilities}>
        <div className="container">
          <div className={styles.sec_container}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
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
                dir={`rtl`}
                className={styles.swiper_container}
              >
                <SwiperSlide className={styles.swiper_slide_box}>

                  <div className={`${styles.box} ${styles.active}`}>
                    <div className={styles.title}>
                      <p>الكل</p>
                    </div>
                  </div>

                </SwiperSlide>

                <SwiperSlide className={styles.swiper_slide_box}>
                  <div className={styles.box}>
                    <div className={styles.icon_container}>
                      <PalmTree />
                    </div>
                    <div className={styles.title}>
                      <p>متنزهات ومماشي</p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className={styles.swiper_slide_box}>
                  <div className={styles.box}>
                    <div className={styles.icon_container}>
                      <Calendar />
                    </div>
                    <div className={styles.title}>
                      <p>تجارب وفعاليات</p>
                    </div>
                  </div>
                </SwiperSlide>

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
                  <Link href='topic:id'>
                    <div className={styles.img_container}>
                      <Image src={topic.icon} width={233} height={166} />
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

              {Array.from({ length: 50 }).map((_, index) => (
                <div
                  className={styles.box} key={index}
                  style={{
                    width: `164px`,
                    height: `${getRandomWidth(140, 240)}px`, // Set the height for all boxes
                  }}>
                  <div className={styles.img_container}>
                    {/* <Image src={'/assets/images/place.png'} width={233} height={166} />
                     */}
                    <Image src="/assets/images/place.png" layout="fill" objectFit="cover" />

                  </div>
                  <div className={styles.title}>
                    <h5>الخندق </h5>

                  </div>


                </div>
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


export async function getStaticProps({ params }) {


  const responseMainTopic = await fetch(`https://api.almadinah.io/api/Contents/GetContents?topicId=${params.id}&lang=2&pagenum=1&pagesize=50&withLatLng=false`);
  const dataMainTopic = await responseMainTopic.json();
  return {
    props: {
      dataMainTopic,

    },
  };
}


