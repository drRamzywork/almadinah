import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, } from 'swiper/react';
import styles from '../../TopicDetails/TopicDetailsHeader/index.module.scss';
import { motion } from 'framer-motion';
import { Mousewheel, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import Microphone from '@/svgs/Microphone';
import Gallery from '@/svgs/Gallery';
import Threehundred from '@/svgs/Threehundred';
import { IoIosClose } from 'react-icons/io';
import Marquee from 'react-fast-marquee';

const Header = ({ dataContentDetails, dataStaticWords, dir, parentID }) => {
  const fullscreenSwiperRef = useRef(null);
  const currentContent = dataContentDetails.currentContent;
  const wheelREf = useRef(null);
  const features = currentContent.relatedFeatures;

  const [showAudio, setShowAudio] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [show360, setShow360] = useState(false)
  // Refs for the containers
  const audioRef = useRef(null);
  const guideRef = useRef(null);

  // Steps control
  const details = dataContentDetails.currentContent;

  // images control
  const [activeImage, setActiveImage] = useState(null);

  // images control 2
  const [activeImageUrl, setActiveImageUrl] = useState(null);
  const [isFullscreenSwiperOpen, setIsFullscreenSwiperOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const toggleActive = (imageUrl) => {
    const index = details?.icon?.split(',').findIndex((url) => url === imageUrl);
    setActiveImageIndex(index); // Set the index of the active image
    setActiveImageUrl(imageUrl); // Set the active image URL
    setIsFullscreenSwiperOpen(!isFullscreenSwiperOpen); // Toggle visibility of the fullscreen Swiper
  };


  useEffect(() => {
    function handleClickOutsideBoxes(event) {
      if (audioRef.current && !audioRef.current.contains(event.target)) {
        setShowAudio(false);
      }


      if (guideRef.current && !guideRef.current.contains(event.target)) {
        setShowGuide(false);
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutsideBoxes);

    // Remove event listener on cleanup
    return () => document.removeEventListener('mousedown', handleClickOutsideBoxes);
  }, []);


  const textLayerColor = parentID === 20 && "linear-gradient(180deg,rgb(55, 122, 138,0),rgb(55, 122, 138,.94) 81.5%, #377A8A)"
    || parentID === 1 && "linear-gradient(180deg,rgb(56, 57, 105,0),rgb(56, 57, 105,.94) 81.5%,#383969)"
    || parentID === 13 && "linear-gradient(180deg,rgb(211, 193, 189,0),rgb(211, 193, 189,.94) 81.5%, #D3C1BD)"
    || parentID === 6 | 7 && 'linear-gradient(180deg,rgb(80, 81, 127,0),rgb(80, 81, 127,.94) 81.5%, #50517F)'


  console.log(dir, "dirssss")
  return (
    <header dir={dir} className={`${styles.topic_details_header} ${styles.topic_details_header2}`} id='topic_details_header'>

      <div className={styles.swiper_container}>
        {details.icon !== null &&
          <motion.div
            className={styles.main_image_slider}>
            <motion.img initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{ duration: 1 }}
              src={details?.icon?.includes(',') ? details?.icon?.split(',')[0] : details?.icon} alt=""
            />

            <div className={styles.layer} style={{ background: textLayerColor }} />
          </motion.div>
        }


        <div className={styles.sec_container2}>
          <div className="container">
            <div className={styles.slideContent2}>
              <div className={styles.text_container}>

                <div className={styles.features_container}>

                  {details.tourGuide !== null &&
                    <div className={`${styles.guide_video} ${showGuide ? styles.active : ''}`} >
                      <div className={styles.icon} onClick={() => setShowGuide(prev => !prev)}>
                        <img src="/assets/images/guide.png" alt="" />
                        <p className={styles.guide} >
                          {dataStaticWords.guideVirtual}
                        </p>
                      </div>
                    </div>
                  }
                  {details?.sound !== null &&
                    <div className={`${styles.audio_container} ${showAudio ? styles.active : ''}`} >
                      <div className={styles.icon} onClick={() => setShowAudio(prev => !prev)}>
                        <Microphone />
                        <p className={styles.guide}>
                          {dataStaticWords.voiceRecord}
                        </p>
                      </div>
                    </div>
                  }

                  {details?.icon !== null &&
                    <div className={styles.gallery} onClick={() => setIsFullscreenSwiperOpen(true)}>
                      <div className={styles.icon}>
                        <Gallery />

                      </div>
                    </div>
                  }

                  {details?.video !== null &&
                    <div className={styles.three_hundred} onClick={() => setShow360(true)}>
                      <div className={styles.icon}>
                        <Threehundred />
                      </div>

                    </div>
                  }


                </div>

                {showAudio &&
                  <motion.div
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.audio}>

                    <audio
                      autoPlay
                      controls src={details?.sound}
                      ref={audioRef}
                    >
                      Your browser does not support the audio element.
                    </audio>


                  </motion.div>
                }



                {showGuide &&
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={styles.video}>
                    <video
                      ref={guideRef}
                      autoPlay controls src={details.tourGuide}>
                      Your browser does not support the audio element.
                    </video>

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

                    <div className={styles.arrow_container} style={{ transform: dir === "ltr" && "rotate(180deg)" }}>
                      <IoIosArrowBack />
                    </div>
                  </Link>




                </div>

                <div className={`mt-3 ${styles.boxes_container}`}>
                  {features &&
                    features.slice(0, 6).map((f, idx) =>
                      <div className={styles.box} key={idx}>
                        <div className={styles.icon_container}>
                          <img src={f.icon} alt={f.name} />
                        </div>

                        <p style={{ overflow: 'hidden' }}>
                          {
                            f.name.split(' ').length > 3 ? (
                              <Marquee pauseOnHover={false} speed={16}>
                                {f.name}
                              </Marquee>
                            ) : (
                              <span>{f.name}</span>
                            )
                          }
                        </p>
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
      </div >



      {isFullscreenSwiperOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.gallery_Image}
          id='gallery_Image'


        >

          <Swiper
            key={`fullscreen-swiper-${isFullscreenSwiperOpen}`}
            spaceBetween={16}
            slidesPerView={1}
            initialSlide={activeImageIndex}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            className="gallery_Image"
            dir={dir}
            centeredSlides={true}
          >

            {details?.icon?.split(',').map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <img src={imageUrl} alt='' />
                <div className={styles.close_icon} onClick={() => setIsFullscreenSwiperOpen(false)}>
                  <IoIosClose />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}

      {show360 &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.gallery_Image}
          id='gallery_Image'


        >
          <iframe width="100%" height="100%" allowfullscreen="true" allow="accelerometer; magnetometer; gyroscope" src={details.video}></iframe>

          <div className={styles.close_icon} onClick={() => setShow360(false)}>
            <IoIosClose />
          </div>
        </motion.div>
      }

    </header >
  )
}

export default Header