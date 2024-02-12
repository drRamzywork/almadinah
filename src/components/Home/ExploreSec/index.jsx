import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ExploreSec = () => {
  return (
    <section id='explore' className={styles.explore}>
      <div className="container">
        <div className={`${styles.sec_title}  sec_title`}>
          <h3>استكشف المدينة المنورة</h3>

          <div className={styles.icon_container}>
            <Image width={208.76} height={209.51} src='/assets/svgs/Safe_Icon.svg' />
          </div>
        </div>
        <div className={styles.boxes_container}>
          <Swiper
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              400: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              414: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              640: {
                slidesPerView: 1,
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
              <div className={styles.box}>
                <div className={styles.background_image}>
                  <Image width={208.76} height={209.51} src='/assets/images/roads.png' />
                </div>

                <div className={styles.icon_container}>
                  <Image width={208.76} height={209.51} src='/assets/svgs/location_flag.svg' />
                </div>

                <div className={styles.title}>
                  <h5>دروب المدينة</h5>
                </div>

                <div className={styles.desc}>
                  <p>جولات معدة بعناية وفق اهتماماتك واحتياجاتك.</p>
                </div>

              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide_box}>

              <div className={styles.box}>
                <div className={styles.background_image}>
                  <Image width={208.76} height={209.51} src='/assets/images/Bage_middle.png' />
                </div>

                <div className={styles.icon_container}>
                  <Image width={208.76} height={209.51} src='/assets/svgs/castle_icon_purble.svg' />
                </div>

                <div className={styles.title}>
                  <h5>معالم المدينة</h5>
                </div>

                <div className={styles.desc}>
                  <p>زر أشهر معالم المدينة التاريخية والحديثة</p>
                </div>

              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide_box}>

              <div className={styles.box}>
                <div className={styles.background_image}>
                  <Image width={208.76} height={209.51} src='/assets/images/Bage_Left.png' />
                </div>

                <div className={styles.icon_container}>
                  <Image width={208.76} height={209.51} src='/assets/svgs/Vector_icon.svg' />
                </div>

                <div className={styles.title}>
                  <h5>مرافق المدينة</h5>
                </div>

                <div className={styles.desc}>
                  <p>استمتع بزيارة عدة مرافق متنوعة</p>
                </div>

              </div>
            </SwiperSlide>
          </Swiper>





        </div>

      </div>
    </section>
  )
}

export default ExploreSec