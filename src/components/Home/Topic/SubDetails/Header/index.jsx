import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../../TopicDetails/TopicDetailsHeader/index.module.scss';
import { motion } from 'framer-motion';
import { Mousewheel, Pagination, } from 'swiper/modules';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/router';
import Microphone from '@/svgs/Microphone';
import Gallery from '@/svgs/Gallery';
import Threehundred from '@/svgs/Threehundred';
import { IoIosClose } from 'react-icons/io';

const Header = ({ dataContentDetails, dataStaticWords, }) => {
  const router = useRouter();
  const currentContent = dataContentDetails.currentContent;
  const [currentIndex, setCurrentIndex] = useState(0)
  const stepsData = currentContent.drobSteps;
  const swiperRef = useRef(null);
  const wheelREf = useRef(null);
  const features = currentContent.relatedFeatures;


  const [showAudio, setShowAudio] = useState(false)
  const [showGuide, setShowGuide] = useState(false)








  // Steps control

  const details = dataContentDetails.currentContent;


  // images control

  const [activeImage, setActiveImage] = useState(null);

  const toggleActive = (imageUrl) => {
    setActiveImage(activeImage === imageUrl ? null : imageUrl);
  };

  return (
    <header className={`${styles.topic_details_header} ${styles.topic_details_header2}`} id='topic_details_header'>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={styles.swiper_container}
      >
        {details.icon !== null &&
          <motion.div


            className={styles.main_image_slider}>
            <motion.img initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              src={details?.icon?.includes(',') ? details?.icon?.split(',')[0] : details?.icon} alt="" />
          </motion.div>
        }


        <div className={styles.sec_container2}>
          <div className="container">
            <div className={styles.slideContent2}>
              <div className={styles.text_container}>

                <div className={styles.features_container}>
                  <div className={styles.guide_video}>


                    <Link href={'#'} className={styles.icon} onClick={() => setShowGuide(prev => !prev)}>

                      <img src="/assets/images/guide.png" alt="" />

                      <p className={styles.guide} >
                        المرشد الافتراضي
                      </p>



                    </Link>
                  </div>

                  <div className={styles.audio_container}>
                    <Link href={'#'} className={styles.icon} onClick={() => setShowAudio(prev => !prev)}>
                      <Microphone />
                      <p className={styles.guide}>
                        التسجيل الصوتي
                      </p>



                    </Link>
                  </div>

                  <div className={styles.gallery}>
                    <div className={styles.icon}>
                      <Gallery />

                    </div>
                  </div>
                  <div className={styles.three_hundred}>
                    <div className={styles.icon}>

                      <Threehundred />
                    </div>

                  </div>
                </div>

                {showAudio &&
                  <motion.div
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.audio}>

                    <audio controls src={details?.sound}>
                      Your browser does not support the audio element.
                    </audio>

                    <div className={styles.close_icon} onClick={() => setShowAudio(false)}>
                      <IoIosClose />
                    </div>

                  </motion.div>
                }



                {showGuide &&
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={styles.video}>
                    <video controls src={details.tourGuide}>
                      Your browser does not support the audio element.
                    </video>
                    <div className={styles.close_icon} onClick={() => setShowGuide(false)}>
                      <IoIosClose />
                    </div>
                  </motion.div>
                }


                <div className={styles.title}>
                  <h2>{details.name}</h2>
                </div>


                <div className={styles.middle_box2}>


                  <div className={styles.desc}>
                    <p>
                      {details.description}
                    </p>
                  </div>



                  <Link href={`/details/${details.id}`} className={styles.btn_container}>
                    <p>{dataStaticWords.more}</p>

                    <div className={styles.arrow_container}>
                      <IoIosArrowBack />
                    </div>
                  </Link>




                </div>



                <div className={`mt-3 ${styles.boxes_container}`}>
                  {features &&
                    features.map((f, idx) =>
                      <div className={styles.box} key={idx}>
                        <div className={styles.icon_container}>
                          <img src={f.icon} alt={f.name} />
                        </div>
                        {/* <p>{f.name}</p> */}
                      </div>
                    )
                  }

                </div>

              </div>



              <div className={styles.details_container}>
                <div id="vertical_swiper" className={styles.vertical_swiper}>
                  <div className={styles.boxes_container}>
                    <Swiper
                      direction={'vertical'}
                      ref={wheelREf}
                      slidesPerView={3.1}
                      spaceBetween={16}
                      mousewheel={true}
                      modules={[Mousewheel, Pagination,]}

                      className={styles.swiper_container}

                    >
                      {details?.icon?.split(',').map((imageUrl, index) => (
                        <SwiperSlide key={index} className={styles.swiper_slide_box}>
                          <div className={styles.img_container} onClick={() => toggleActive(imageUrl)}>
                            <img src={imageUrl} alt={`Image ${index + 1}`} />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>



                  </div>
                </div>

              </div>
              {
                activeImage && (
                  <div className={styles.fullScreenImage} onClick={() => setActiveImage(null)}>
                    <img src={activeImage} alt="Expanded view" />
                  </div>
                )
              }

            </div>
          </div>
        </div>
      </motion.div >

    </header >
  )
}

export default Header