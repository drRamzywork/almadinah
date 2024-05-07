import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

const SwiperSection = ({ topics, dir, dataStaticWords }) => {

  const breakpoints = {
    300: {
      slidesPerView: 1.5,
      spaceBetween: 24,
    },
    400: {
      slidesPerView: 1.5,
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
      slidesPerView: 4.4,
      spaceBetween: 24,
    },
    1300: {
      slidesPerView: 4.4,
      spaceBetween: 24,
    },
  }

  const masjedData = topics?.filter((topic) => topic.id === 20)[0];


  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Check on mount if it's mobile
    window.addEventListener('resize', checkMobile); // Add resize listener

    return () => {
      window.removeEventListener('resize', checkMobile); // Cleanup listener
    };
  }, []);


  return (
    <>
      <section dir={dir} className={styles.masjid_an_nabawy} id='masjid_an_nabawy'>

        <div className={styles.section_container}>
          <div className="container">

            <div className={`${styles.sec_title} sec_title`}>
              <h3>{dataStaticWords.discover} {masjedData.name}</h3>

              <Link href={'/topic/20'} className={styles.arrow_container}>
                <IoIosArrowBack />
              </Link>
            </div>
          </div>
          <div className={styles.swiper_section}>

            {isMobile ? <Swiper
              modules={[Navigation, EffectCoverflow]}
              breakpoints={breakpoints}
              dir={dir}
              centeredSlides={true}
              initialSlide={1}
              effect="coverflow"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
              }}
              className={styles.swiper}
            >
              {masjedData.contents?.map((image, index) => (
                <SwiperSlide key={index}>
                  <Link href={`/details/${image.id}`}>

                    <div className={styles.img_container}>

                      <img src={image.icon.split(',')[0]} alt={image.name} />
                    </div>
                    <div className={styles.title}>
                      <p>{image.name}</p>


                    </div>
                  </Link>

                </SwiperSlide>
              ))}
            </Swiper> : <Swiper
              modules={[Navigation, EffectCoverflow]}
              breakpoints={breakpoints}
              dir={dir}
              // centeredSlides={true}
              // initialSlide={1}
              // // effect="coverflow"
              // coverflowEffect={{
              //   rotate: 0,
              //   stretch: 0,
              //   depth: 100,
              //   modifier: 2,
              //   slideShadows: false,
              // }}
              pagination={{
                clickable: true,
              }}
              className={styles.swiper}
            >
              {masjedData.contents?.map((image, index) => (
                <SwiperSlide key={index}>
                  <Link href={`/details/${image.id}`}>

                    <div className={styles.img_container}>

                      <img src={image.icon.split(',')[0]} alt={image.name} />
                    </div>
                    <div className={styles.title}>
                      <p>{image.name}</p>


                    </div>
                  </Link>

                </SwiperSlide>
              ))}
            </Swiper>}



          </div>
        </div>

      </section>
    </>
  );
}

export default SwiperSection;
