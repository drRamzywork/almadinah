import HeaderSection from '@/components/Home/HeaderSection'
import React from 'react'
import styles from '../../topic/[id]/index.module.scss'
import Image from 'next/image'
import { Swiper, SwiperSlide, } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { FreeMode } from 'swiper/modules';

export default function SearchPage({ dataMainTopic, dir, dataAllLangs, dataStaticWords }) {
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

  const routerID = Number(router.query.id);

  function stripHtml(html) {
    return html.replace(/<[^>]*>?/gm, '');
  }




  return (
    <>

      <Head>
        <title>{router.query.search}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <HeaderSection dataStaticWords={dataStaticWords} dir={dir} parentName={router.query.search} dataAllLangs={dataAllLangs} />

      <section id='city_facilities' className={styles.city_facilities} dir={dir}>
        <div className="container">
          <div className={styles.sec_container}>



            <div className={styles.boxes_container}>
              {dataMainTopic.map((topic, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}

                  key={index}
                  className={styles.box}>





                  <Link href={
                    routerID === 2
                      ? `/topic-details/${topic.id}`
                      : (routerID === 1 || routerID === 13
                        ? `/subdetails/${topic.id}`
                        : `/details/${topic.id}`
                      )
                  }>
                    <div className={styles.img_container}>
                      <Image src={topic.icon.includes(',') ? topic.icon.split(',')[0] : topic.icon} width={233} height={166} />
                    </div>
                    <div className={styles.title}>
                      <h5>{topic.name} </h5>

                    </div>

                    <div className={styles.desc}>

                      {stripHtml(topic.translatedDesc)}

                    </div>
                  </Link>

                </motion.div>
              ))}
            </div>


            <div className={styles.boxes_container_mobile}>
              {dataMainTopic.map((topic, index) => (
                <Link href={
                  routerID === 2
                    ? `/topic-details/${topic.id}`
                    : (routerID === 1 || routerID === 13
                      ? `/subdetails/${topic.id}`
                      : `/details/${topic.id}`
                    )
                }
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
  );
}

export async function getServerSideProps(context) {
  const locale = context.locale;


  const res = await fetch(
    "https://api.visitmadinahsa.com/api/Settings/GetAllLanguages?pagenum=1&pagesize=50"
  );

  const languagesConfig = require("../../../../public/locales/languagesDetails.json");
  const langId = languagesConfig.filter((lang) => lang.shortCut === locale)[0].id;
  const languages = await res.json();

  const currentLanguage = languages?.find((lang) => lang?.shortCut === locale);
  const dir = currentLanguage?.isRtl ? "rtl" : "ltr";



  const resTopics = await fetch(`https://api.visitmadinahsa.com/api/Contents/GetContents?lang=${langId}&pagenum=1&pagesize=50&withLatLng=false&search=${context.query.search}`);
  const dataMainTopic = await resTopics.json();

  const responseStaticWords = await fetch(`https://api.visitmadinahsa.com/api/Settings/GetStaticWords?lang=${langId}`);
  const dataStaticWords = await responseStaticWords.json();

  return {
    props: {
      dataMainTopic,
      dir,
      dataAllLangs: languages,
      dataStaticWords
    }
  };
}