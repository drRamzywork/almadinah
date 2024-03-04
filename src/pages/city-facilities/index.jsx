import HeaderSection from '@/components/Home/HeaderSection'
import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import PalmTree from '@/svgs/PalmTree'
import Calendar from '@/svgs/Calendar'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from 'next/router'

const CityFacilities = () => {
  const router = useRouter();
  const getRandomWidth = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


  return (
    <>
      <HeaderSection />

      <section id='city_facilities' className={styles.city_facilities}>
        <div className="container">
          <div className={styles.sec_container}>
            <div className={styles.filter_container}>
              <Swiper
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                  },
                  400: {
                    slidesPerView: 2,
                  },
                  414: {
                    slidesPerView: 2,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },


                }}





                dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}
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
            </div>

            <div className={styles.boxes_container}>

              {Array.from({ length: 50 }).map((_, index) => (


                <div
                  className={styles.box} key={index}>
                  <div className={styles.img_container}>
                    <Image src={'/assets/images/place.png'} width={233} height={166} />
                  </div>
                  <div className={styles.title}>
                    <h5>الخندق </h5>

                  </div>

                  <div className={styles.desc}>
                    وجهة سياحية متكاملة تحتضن عددًا من المهرجانات والفعاليات والأنشطة، وتربط الزائر بأعظم المعالم الإسلامية والتاريخية في المدينة المنوّرة.
                  </div>

                </div>
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

export default CityFacilities