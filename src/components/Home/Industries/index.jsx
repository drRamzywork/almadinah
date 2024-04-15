import React from 'react';
import styles from './index.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

const Industries = ({
  foods
  , industries,
  dataStaticWords,
  dir

}) => {
  const breakpoints = {
    300: {
      slidesPerView: 1.8,
      spaceBetween: 24,
    },
    400: {
      slidesPerView: 1.8,
      spaceBetween: 24,
    },
    607: {
      slidesPerView: 2.3,
      spaceBetween: 24,
    },
    700: {
      slidesPerView: 4.2,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 3.5,
      spaceBetween: 24,
    },
    1300: {
      slidesPerView: 4.2,
      spaceBetween: 24,
    },

  }

  return (
    <>
      <section id='foods' dir={dir} className={styles.foods}>
        <div className={styles.swiper_container}>

          <div className="container">

            <Link href={`/topic/${foods.id}`} className={styles.sec_header}>


              <div className={styles.title}>
                <div className={styles.img_container}>
                  <Image src={foods.icon} width={150} height={150} alt={foods.name} />
                </div>

                <h3 >{foods.name}</h3>
              </div>

              <div className={styles.see_all}>
                {/* <p style={{ color: foods.titlesColor }}>{dataStaticWords.displayAll}</p> */}

                <div className={styles.arrow_container}>
                  <IoIosArrowBack />
                </div>
              </div>

            </Link>

          </div >


          <Swiper
            breakpoints={breakpoints}
            dir={dir}
            centeredSlides={false}
            pagination={{
              clickable: true,
            }}
            className={styles.swiper}
          >
            {
              foods.contents.map((food, index) => (
                <SwiperSlide className={styles.swiper_slide_box} key={index}>
                  <Link href={`/details/${food.id}`} className={styles.box}>
                    <div className={styles.img_container}>
                      <img src={food.icon.includes(',') ? food.icon.split(',')[0] : food.icon} width={164.5} height={200} alt={food.name} />
                    </div>

                    <div className={styles.title}>
                      <h5>
                        {food.name}
                      </h5>
                    </div>
                  </Link>

                </SwiperSlide>
              ))
            }







          </Swiper>

        </div>






      </section >



      <section id='industries' dir={dir} className={styles.industries}>
        <div className={styles.swiper_container}>
          <div className="container">

            <Link href={`/topic/${industries.id}`} className={styles.sec_header}>


              <div className={styles.title}>
                <div className={styles.img_container}>
                  <Image src={industries.icon} width={150} height={150} alt={industries.name} />

                </div>
                <h3 >{industries.name}</h3>
              </div>

              <div className={styles.see_all}>
                {/* <p >{dataStaticWords.displayAll}</p> */}

                <div className={styles.arrow_container}>
                  <IoIosArrowBack />
                </div>
              </div>

            </Link>

          </div >


          <Swiper
            breakpoints={breakpoints}
            dir={dir}
            centeredSlides={false}
            pagination={{
              clickable: true,
            }}
            className={styles.swiper}
          >
            {
              industries.contents.map((industry, index) => (
                <SwiperSlide className={styles.swiper_slide_box} key={index}>
                  <Link href={`/details/${industry.id}`} className={styles.box}>
                    <div className={styles.img_container}>
                      <img src={industry.icon.includes(',') ? industry.icon.split(',')[0] : industry.icon} width={164.5} height={200} alt={industry.name} />
                    </div>

                    <div className={styles.title}>
                      <h5>
                        {industry.name}
                      </h5>
                    </div>
                  </Link>

                </SwiperSlide>
              ))
            }

          </Swiper>

        </div>
      </section >
    </>
  )
}

export default Industries