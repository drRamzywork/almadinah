import React from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Microphone from '@/svgs/Microphone';
import Gallery from '@/svgs/Gallery';
import Threehundred from '@/svgs/Threehundred';
import { FaArrowLeftLong } from 'react-icons/fa6'

const TopicDetailsHeader = () => {
  const router = useRouter();
  return (

    <>
      <section id='topic_details_header' className={styles.topic_details_header}>
        <div className="container">
          <div className="sec_container">

            <div className="swiper_container">


              <Swiper
                direction={'vertical'}
                pagination={{
                  clickable: true,
                }}
                slidesPerView={2.3}
                spaceBetween={16}

                className={styles.swiper_container}
              >
                <SwiperSlide
                  className={styles.swiper_slide_box} >
                  <div className="d-flex ">
                    <div
                      className={`${styles.box} `} >
                      <div className={styles.img_container}>
                        <Image src={'/assets/images/place.png'} width={233} height={166} />
                      </div>

                    </div>
                  </div>
                </SwiperSlide>







              </Swiper>

            </div>

            <div className="details_container">
              <div className="icons_container"></div>

              <div className="title">
                <h4>مسجد الميقات</h4>
                <div className="more_btn">
                  <p>المزيد</p>
                  <FaArrowLeftLong />
                </div>
              </div>

              <div className="desc">
                <p>أول مسجد بني في الإسلام، وضع حجر أساسه نبينا بيديه الشريفتين، ورفع بنيانه المهاجرون والأنصار، وبيَّن الله فضله بقرآن يُتلى إلى يوم الدين ﴿لَمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَى مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَنْ تَقُومَ فِيهِ﴾.[التوبة : 108]</p>
              </div>
            </div>
          </div>

        </div>

      </section>

    </>
  )
}

export default TopicDetailsHeader