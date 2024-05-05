import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
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



const HederPages = ({ dataContentDetails, dataContentDetailsGuide, icon, dataAllLangs, categoryName, parentName, dir, dataStaticWords, parentID
}) => {
  const images1 = icon?.includes(',') ? icon.split(',') : [icon];
  const router = useRouter();
  const [showAudio, setShowAudio] = useState(false)
  const [showGuide, setShowGuide] = useState(false)

  const audioRef = useRef(null);
  const guideRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (audioRef.current && !audioRef.current.contains(event.target)) {
        setShowAudio(false);
      }
      if (guideRef.current && !guideRef.current.contains(event.target)) {
        setShowGuide(false);
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener on cleanup
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);




  const textLayerColor = parentID === 20 && "linear-gradient(180deg,rgb(55, 122, 138,0),rgb(55, 122, 138,.94) 81.5%, #377A8A)"
    || parentID === 1 && "linear-gradient(180deg,rgb(56, 57, 105,0),rgb(56, 57, 105,.94) 81.5%,#383969)"
    || parentID === 13 && "linear-gradient(180deg,rgb(211, 193, 189,0),rgb(211, 193, 189,.94) 81.5%, #D3C1BD)"
    || parentID === 6 | 7 && 'linear-gradient(180deg,rgb(80, 81, 127,0),rgb(80, 81, 127,.94) 81.5%, #50517F)'



  return (

    <header className={'header_details'} id={styles.inner_header} dir={dir} >
      <Navbar dataAllLangs={dataAllLangs} dir={dir} />
      {router.pathname !== '/virtual-guide' &&
        <div className={styles.details_image}>
          <Swiper
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

          <div className={styles.layer} style={{ background: textLayerColor }} />
        </div>
      }

      <div className={`container ${styles.banner}`}>
        <div className={styles.banner_container}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={styles.right_side}>
            <div className={styles.main_title2}>
              {categoryName &&

                <p>{categoryName}</p>
              }

              <h2>
                {parentName && parentName}
              </h2>


            </div>


            {/* {
              !router.pathname.includes('/virtual-guide') &&
              dataContentDetails.tourGuide !== null &&
              <div className={styles.icons_container}>
                <Link href={'#'} className={`${styles.icon} ${showAudio ? styles.active : ''}`} onClick={() => setShowAudio(prev => !prev)}>
                  <Microphone />
                  <p className={styles.guide}>
                    {dataStaticWords.voiceRecord}
                  </p>



                </Link>

                <Link href={'#'}
                  className={`${styles.icon} ${showGuide ? styles.active : ''}`}
                  onClick={() => setShowGuide(prev => !prev)}>
                  <Guide />
                  <p className={styles.guide} >
                    {dataStaticWords.guideVirtual}
                  </p>
                </Link>

              </div>

            } */}




          </motion.div>

          {showAudio &&
            <motion.div
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className={styles.audio}
              ref={audioRef}
            >

              <audio autoPlay controls src={dataContentDetailsGuide.sound}>
                Your browser does not support the audio element.
              </audio>



            </motion.div>

          }


          {showGuide &&
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              ref={guideRef}
              className={styles.video}>




              <figure data-delay="250" data-cues="fadeIn" className="rounded mt-n21 mt-lg-n23 mb-16 mb-md-18 position-relative">
                <a data-glightbox href={dataContentDetailsGuide.tourGuide} className="btn btn-circle btn-white btn-play ripple mx-auto position-absolute" style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3
                }}>
                  <i className="icn-caret-right" />
                </a>

                <video
                  controls
                  loop
                  autoPlay
                  playsInline
                  src={dataContentDetailsGuide.tourGuide} poster="/assets/photos/movie3.jpg" className="w-100 rounded caption-overlay d-block" />
              </figure>

            </motion.div>

          }

        </div>
      </div>




    </header>

  )
}

export default HederPages