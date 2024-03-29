import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './index.module.scss';
import { motion } from 'framer-motion';
import { Mousewheel, Pagination, Navigation, FreeMode } from 'swiper/modules';
import { FaLocationDot } from "react-icons/fa6";
import ArrowDown from '@/svgs/ArrowDown';
import { Alarm } from '@/svgs/Alarm';
import Mouse from '@/svgs/Mouse';
import Link from 'next/link';
import { IoIosArrowBack, IoIosClose } from 'react-icons/io';
import Marquee from "react-fast-marquee";
import GallerySwiper from '../../GallerySwiper';

const TopicDetailsHeader = ({ dataContentDetails, dataStaticWords, dir, isOpen, setIsOpen }) => {
  const currentContent = dataContentDetails.currentContent;
  const [currentIndex, setCurrentIndex] = useState(0)
  const stepsData = currentContent.drobSteps;
  const swiperRef = useRef(null);
  const wheelREf = useRef(null);


  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);

  };

  useEffect(() => {
    const swiper = swiperRef.current.swiper
    if (swiperRef.current && swiper) {
      if (swiper.realIndex === 0) {
        swiper.disable()

      } else {
        swiper.enable()
      }
    }

  }, [currentIndex])

  const handleSlideControls = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.enable()
      swiperRef.current.swiper.slideTo(1)
    }
  }






  // Steps control
  const firstStep = stepsData !== null ? stepsData[0] : dataContentDetails.currentContent;
  const lastStep = stepsData !== null ? stepsData[stepsData.length - 1] : [];
  const stepsDataFiltred = stepsData !== null ? stepsData.filter((step) => step !== lastStep) : [];

  const features = currentContent.relatedFeatures;

  // images control
  const [activeImage, setActiveImage] = useState(null);

  const toggleActive = (imageUrl) => {
    setActiveImage(activeImage === imageUrl ? null : imageUrl);
  };



  const pagination = {
    clickable: true,

    renderBullet: function (index, className) {
      // ${placeNameStr ? `<div class='text'>${placeNameStr}</div>` : ''}

      const placeNameStr = stepsData[index] && stepsData[index].placeName ? stepsData[index].placeName : '';
      return `
      <span class="${className}">
        <p>${index !== currentIndex ? index !== stepsData.length - 1 ? index : '' : ''}</p>
      </span >
      `;
    },
  };


  // fullscreen image gallery Swiper control

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreenSwiperOpen, setIsFullscreenSwiperOpen] = useState(false);

  const toggleActiveImage = (imageUrl) => {
    const index = currentContent?.icon?.split(',').findIndex((url) => url === imageUrl);
    setActiveImageIndex(index);
    setIsFullscreenSwiperOpen(!isFullscreenSwiperOpen);
    setActiveImage(activeImage === imageUrl ? null : imageUrl);
    setIsOpen(true)

  };

  return (
    <header dir={dir} className={styles.topic_details_header} id='topic_details_header'>
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        pagination={pagination}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
        onSlideChange={(swiper) => handleSlideChange(swiper)}
        ref={swiperRef}
        id='swiperSteps'
      >
        <SwiperSlide >
          <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.5 }}
            className={styles.swiper_container}
          >
            {firstStep.image !== null &&
              <div className={styles.main_image_slider}>
                <img src={currentContent.icon.includes(',') ? currentContent.icon.split(',')[0] : currentContent.icon} alt="" />
              </div>
            }

            <div className={styles.sec_container}>
              <div className="container d-flex h-100">
                <div className={styles.slideContent}>
                  <div className={styles.text_container}>
                    <div className={styles.title}>
                      <h2>{currentContent.name}</h2>
                    </div>

                    <div className={styles.boxes_container}>
                      {features &&
                        features.map((f, idx) =>
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
                    <div className={styles.middle_box}>
                      <div className={styles.icon_container} >
                        <FaLocationDot />
                      </div>

                      <div className={styles.start} >
                        <p>{dataStaticWords.startoftour}</p>

                      </div>

                      <div className={styles.box_desc}>
                        <p> {firstStep.name}</p>
                      </div>


                      <button className={styles.btn_container}
                        onClick={handleSlideControls}
                      >
                        <p>{firstStep.stepName}</p>
                      </button>

                      <div className={styles.arrow_container}
                        onClick={handleSlideControls}
                      >
                        <ArrowDown />
                      </div>
                    </div>
                  </div>



                  <div className={styles.details_container}>
                    <div className={styles.hours}>
                      <div className={styles.icon_container}>
                        <Alarm />

                      </div>

                      <p>
                        {dataContentDetails.currentContent.tourHours <= 1 && (`${dataContentDetails.currentContent.tourHours} ${dataStaticWords.hour} `)}
                        {dataContentDetails.currentContent.tourHours > 1 && (`${dataContentDetails.currentContent.tourHours} ${dataStaticWords.hours} `)}
                      </p>

                    </div>

                    <div id="vertical_swiper" className={styles.vertical_swiper}>

                      <div className={styles.boxes_container}>
                        <Swiper
                          direction={'vertical'}
                          ref={wheelREf}
                          pagination={{
                            clickable: true,
                          }}
                          slidesPerView={3.1}
                          spaceBetween={16}
                          mousewheel={true}
                          modules={[Mousewheel, FreeMode]}
                          freeMode={true}
                          className={styles.swiper_container}>

                          {firstStep?.image?.split(',').map((imageUrl, index) => (
                            <SwiperSlide key={index} className={styles.swiper_slide_box}>
                              <div className={styles.img_container} onClick={() => toggleActiveImage(imageUrl)}>
                                <img src={imageUrl} alt={`Image ${index + 1} `} />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>

                      </div>
                    </div>
                  </div>



                  {/* 
                  {activeImage && (
                      <div className={styles.fullScreenImage} onClick={() => setActiveImage(null)}>
                        <img src={activeImage} alt="Expanded view" />
                      </div>
                    )
                  } */}

                </div>
              </div>
            </div>



            {isOpen &&
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

                  {firstStep?.image?.split(',').map((url, index) => (
                    <SwiperSlide key={index}>
                      <img src={url} alt='' />
                      <div className={styles.close_icon} >
                        <IoIosClose />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>

            }


          </motion.div>
        </SwiperSlide>


        {stepsDataFiltred.map((step, index) => {
          return (
            <SwiperSlide key={step.id}>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={styles.swiper_container}
              >
                {step.image !== null &&
                  <motion.div className={styles.main_image_slider}>
                    <motion.img initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      src={step?.image?.includes(',') ? step?.image?.split(',')[0] : step?.image} alt="" />
                  </motion.div>
                }

                {isOpen &&
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

                      {step?.image?.split(',').map((url, index) => (
                        <SwiperSlide key={index}>
                          <img src={url} alt='' />
                          <div className={styles.close_icon} >
                            <IoIosClose />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </motion.div>

                }

                <div className={styles.sec_container}>
                  <div className="container d-flex h-100">
                    <div className={styles.slideContent}>
                      <div className={styles.text_container}>
                        <div className={styles.title}>
                          <h2>{step.placeName}</h2>
                        </div>

                        <div className={styles.middle_box2}>


                          <div className={styles.desc}>


                          </div>



                          <div className={styles.info_container}>

                            <Link href={`/details/${step.linkContentId} `} className={styles.btn_container}>
                              <p>{dataStaticWords.more}</p>

                              <div className={styles.arrow_container}>
                                <IoIosArrowBack />
                              </div>
                            </Link>


                            <div className={styles.desc2}>

                              <p>
                                {step.name}
                              </p>

                            </div>

                            <div className={styles.mouse_container}>
                              <Mouse />
                            </div>

                            <button className={styles.btn_container}>
                              <p>{dataStaticWords.pull}</p>
                            </button>


                            <span className={styles.arrow_container}>
                              <ArrowDown />
                            </span>
                          </div>

                        </div>




                      </div>



                      <div className={styles.details_container}>
                        <div className={styles.hours}>
                          <div className={styles.icon_container}>
                            <Alarm />

                          </div>

                          <p>
                            {step.tourHours <= 1 && (`${step.tourHours} ${dataStaticWords.hour} `)}
                            {step.tourHours > 1 && (`${step.tourHours} ${dataStaticWords.hours} `)}
                            {step.totalMinutes && (`${step.totalMinutes} ${dataStaticWords.minute} `)}
                          </p>
                        </div>

                        <div id="vertical_swiper" className={styles.vertical_swiper}>
                          <div className={styles.boxes_container}>
                            <Swiper

                              freeMode={true}
                              direction={'vertical'}
                              ref={wheelREf} // Make sure the ref name matches what you've defined
                              pagination={{
                                clickable: true,
                              }}
                              slidesPerView={5}
                              spaceBetween={16}
                              mousewheel={true}
                              modules={[Mousewheel, FreeMode]}
                              scrollbar={{
                                el: '.swiper-scrollbar',
                                draggable: true,
                                hide: true,
                              }}
                              className={styles.swiper_container}
                            >

                              {step?.image?.split(',').map((imageUrl, index) => (
                                <SwiperSlide key={index} className={styles.swiper_slide_box}>
                                  <div className={styles.img_container} onClick={() => toggleActiveImage(imageUrl)}>
                                    <img src={imageUrl} alt={`Image ${index + 1} `} />
                                  </div>
                                </SwiperSlide>
                              ))}
                            </Swiper>



                          </div>
                        </div>

                      </div>
                      {
                        activeImage && (
                          <>
                            {/* <div className={styles.fullScreenImage} onClick={() => setActiveImage(null)}>
                              <img src={activeImage} alt="Expanded view" />
                            </div> */}

                            {/* 
                            <GallerySwiper activeImageIndex={activeImageIndex} dir={dir} imageUrls={allImageUrls} isFullscreenSwiperOpen={isFullscreenSwiperOpen} /> */}

                          </>

                        )
                      }

                    </div>
                  </div>
                </div>

              </motion.div >
            </SwiperSlide >
          )
        })}

      </Swiper >

    </header >

  );
};

export default TopicDetailsHeader;