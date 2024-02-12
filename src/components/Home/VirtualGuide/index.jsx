import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const VirtualGuide = () => {
  return (
    <section id='virtual_guide' className={styles.virtual_guide}>
      <div className={styles.shape}>
        <Image src='/assets/images/shape_BG.png' width={868} height={463} />
      </div>
      <div className="container">
        <div className={styles.sec_container}>

          <div className={styles.topics_container}>
            <div className={styles.guide}>
              <p>مرشدك الافتراضي</p>
            </div>
            <div className={`${styles.sec_title} sec_title`}>
              <h3>ماذا تريد أن تعرف عنه؟</h3>
            </div>

            <div className={styles.boxes_container}>

              <Swiper
                direction={'vertical'}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className={styles.swiper_container}
              >

                <SwiperSlide className={styles.swiper_slide_box}>
                  <div className={styles.box}>
                    <div className={styles.img_container}>
                      <Image src={'/assets/images/place.png'} width={233} height={166} />
                    </div>
                    <div className={styles.title}>
                      <h5>الخندق </h5>
                      <div className={styles.icon_container}>
                        <Image src={'/assets/svgs/guide_icon.svg'} width={233} height={166} />
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
                <SwiperSlide className={styles.swiper_slide_box}>
                  <div className={styles.box}>
                    <div className={styles.img_container}>
                      <Image src={'/assets/images/place.png'} width={233} height={166} />
                    </div>
                    <div className={styles.title}>
                      <h5>الخندق </h5>
                      <div className={styles.icon_container}>
                        <Image src={'/assets/svgs/guide_icon.svg'} width={233} height={166} />
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
                <SwiperSlide className={styles.swiper_slide_box}>
                  <div className={styles.box}>
                    <div className={styles.img_container}>
                      <Image src={'/assets/images/place.png'} width={233} height={166} />
                    </div>
                    <div className={styles.title}>
                      <h5>الخندق </h5>
                      <div className={styles.icon_container}>
                        <Image src={'/assets/svgs/guide_icon.svg'} width={233} height={166} />
                      </div>
                    </div>

                  </div>
                </SwiperSlide>




              </Swiper>


            </div>
          </div>


          <div className={styles.video_container}>
            <div className={styles.img_container}>

              <video
                muted
                loop
                autoPlay
                controls
              >
                <source src="https://amana-md.gov.sa/visitmadinah/Areas/27112023124504981.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

          </div>



        </div>
      </div>





    </section>
  )
}

export default VirtualGuide