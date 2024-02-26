import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/router'
import { motion } from 'framer-motion';
import Link from 'next/link'
import Microphone from '@/svgs/Microphone'
import Guide from '@/svgs/Guide'

// Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../Home/HeaderSection/index.module.scss';
import Navbar from '../Navbar';



const HederPages = ({ icon, dataAllLangs, categoryName, parentName }) => {
  const images1 = icon?.includes(',') ? icon.split(',') : [icon];


  return (
    <header className={'header_details'} id={styles.inner_header}>
      <Navbar dataAllLangs={dataAllLangs} />

      <div className={styles.details_image}>




        <Swiper
          // centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          effect={'fade'}
          spaceBetween={30}

          modules={[Autoplay, Pagination, Navigation, EffectFade]}

          className="mySwiper"
        >
          {images1?.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container">
        <div className={styles.banner_container}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={styles.right_side}>
            <div className={styles.main_title}>

              <p>{categoryName}</p>

              <h2>
                {parentName && parentName}
              </h2>


            </div>

            <div className={styles.icons_container}>
              <Link href={'#'} className={styles.icon}>
                <Microphone />
                <p className={styles.guide}>
                  التسجيل الصوتي
                </p>
              </Link>

              <Link href={'#'} className={styles.icon}>
                <Guide />
                <p className={styles.guide}>
                  المرشد الافتراضي
                </p>
              </Link>


            </div>
          </motion.div>

        </div>
      </div>


      <div className={`${styles.top_cloud_right} `}>
        <Image src={'/assets/bannerImgs/cloud2.png'} width={1440} height={413} />

      </div>

      < div className={styles.lines}>
        <Image src={'/assets/bannerImgs/Lines.svg'} width={8169.95} height={2105.82} />

      </div>

      <div className={styles.cloud}>
        <Image src={'/assets/bannerImgs/cloud2.png'} width={1440} height={413} />
      </div>

    </header>
  )
}

export default HederPages